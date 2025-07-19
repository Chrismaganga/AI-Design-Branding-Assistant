'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useBrandingStore } from '@/store/branding-store'
import { apiClient } from '@/lib/api'
import { MessageSquare, Copy, Heart, Sparkles } from 'lucide-react'

const SLOGAN_STYLES = [
    { id: 'professional', name: 'Professional', description: 'Corporate and formal' },
    { id: 'casual', name: 'Casual', description: 'Friendly and approachable' },
    { id: 'creative', name: 'Creative', description: 'Artistic and unique' },
    { id: 'luxury', name: 'Luxury', description: 'Premium and exclusive' },
    { id: 'playful', name: 'Playful', description: 'Fun and energetic' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and direct' },
]

export function SloganGenerator() {
    const [prompt, setPrompt] = useState('')
    const [selectedStyle, setSelectedStyle] = useState('professional')
    const [generatedSlogans, setGeneratedSlogans] = useState<any[]>([])
    const [favorites, setFavorites] = useState<Set<string>>(new Set())

    const { isGenerating, setGenerating, setError } = useBrandingStore()

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please describe your brand or business')
            return
        }

        setGenerating(true)
        setError(null)

        try {
            const response = await apiClient.generateSlogan(prompt, selectedStyle)

            if (response.success && response.data) {
                setGeneratedSlogans(prev => [response.data, ...prev])
            } else {
                setError('Failed to generate slogans. Please try again.')
            }
        } catch (error) {
            setError('An error occurred while generating slogans')
        } finally {
            setGenerating(false)
        }
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        // You could add a toast notification here
    }

    const handleFavorite = (sloganId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(sloganId)) {
                newFavorites.delete(sloganId)
            } else {
                newFavorites.add(sloganId)
            }
            return newFavorites
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        AI Slogan Generator
                    </CardTitle>
                    <CardDescription>
                        Generate creative taglines and brand messaging that resonates with your audience
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="slogan-prompt" className="text-sm font-medium">
                            Describe your brand or business
                        </label>
                        <Input
                            id="slogan-prompt"
                            placeholder="e.g., A tech startup focused on sustainable energy solutions"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="h-20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tone</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {SLOGAN_STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`p-3 text-left rounded-lg border transition-colors ${selectedStyle === style.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{style.name}</div>
                                    <div className="text-xs text-gray-500">{style.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full"
                        size="lg"
                    >
                        {isGenerating ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Generating Slogans...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Slogans
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {generatedSlogans.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Generated Slogans</h3>
                    <div className="space-y-3">
                        {generatedSlogans.map((generation, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    {generation.result?.slogans?.map((slogan: any, sloganIndex: number) => (
                                        <div key={sloganIndex} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg mb-2">
                                            <div className="flex-1">
                                                <p className="text-lg font-medium mb-1">"{slogan.text}"</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="capitalize">{slogan.style}</span>
                                                    <span>•</span>
                                                    <span>{slogan.language}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleFavorite(slogan.id)}
                                                    className="p-2"
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${favorites.has(slogan.id)
                                                                ? 'fill-red-500 text-red-500'
                                                                : 'text-gray-400'
                                                            }`}
                                                    />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleCopy(slogan.text)}
                                                    className="p-2"
                                                >
                                                    <Copy className="w-4 h-4 text-gray-400" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {favorites.size > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            Favorite Slogans
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {Array.from(favorites).map((sloganId) => {
                                const slogan = generatedSlogans
                                    .flatMap(g => g.result?.slogans || [])
                                    .find(s => s.id === sloganId)

                                if (!slogan) return null

                                return (
                                    <div key={sloganId} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <p className="font-medium">"{slogan.text}"</p>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopy(slogan.text)}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
} 