'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useBrandingStore } from '@/store/branding-store'
import { apiClient } from '@/lib/api'
import { Palette, Download, RefreshCw, Sparkles } from 'lucide-react'

const LOGO_STYLES = [
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple designs' },
    { id: 'modern', name: 'Modern', description: 'Contemporary and sleek' },
    { id: 'vintage', name: 'Vintage', description: 'Classic and timeless' },
    { id: 'playful', name: 'Playful', description: 'Fun and energetic' },
    { id: 'professional', name: 'Professional', description: 'Corporate and formal' },
    { id: 'creative', name: 'Creative', description: 'Artistic and unique' },
]

export function LogoGenerator() {
    const [prompt, setPrompt] = useState('')
    const [selectedStyle, setSelectedStyle] = useState('modern')
    const [generatedLogos, setGeneratedLogos] = useState<any[]>([])

    const { isGenerating, setGenerating, setError } = useBrandingStore()

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a description for your logo')
            return
        }

        setGenerating(true)
        setError(null)

        try {
            const response = await apiClient.generateLogo(prompt, selectedStyle)

            if (response.success && response.data) {
                setGeneratedLogos(prev => [response.data, ...prev])
            } else {
                setError('Failed to generate logo. Please try again.')
            }
        } catch (error) {
            setError('An error occurred while generating your logo')
        } finally {
            setGenerating(false)
        }
    }

    const handleDownload = async (logoId: string, format: 'svg' | 'png') => {
        try {
            const blob = await apiClient.downloadLogo(logoId, format)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `logo.${format}`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            setError('Failed to download logo')
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        AI Logo Generator
                    </CardTitle>
                    <CardDescription>
                        Describe your brand and let AI create stunning logos for you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="prompt" className="text-sm font-medium">
                            Describe your logo
                        </label>
                        <Input
                            id="prompt"
                            placeholder="e.g., A modern tech company logo with blue and white colors, minimalist design"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="h-20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Style</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {LOGO_STYLES.map((style) => (
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
                                Generating Logo...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Logo
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {generatedLogos.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Generated Logos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {generatedLogos.map((logo, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                        {logo.result?.url ? (
                                            <img
                                                src={logo.result.url}
                                                alt="Generated logo"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="text-gray-400">Logo preview</div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDownload(logo.id, 'svg')}
                                            className="flex-1"
                                        >
                                            <Download className="w-4 h-4 mr-1" />
                                            SVG
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDownload(logo.id, 'png')}
                                            className="flex-1"
                                        >
                                            <Download className="w-4 h-4 mr-1" />
                                            PNG
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 