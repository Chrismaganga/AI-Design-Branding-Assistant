'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useBrandingStore } from '@/store/branding-store'
import { apiClient } from '@/lib/api'
import { Palette, Copy, Download, Sparkles } from 'lucide-react'

const INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Food & Beverage',
    'Travel',
    'Fashion',
    'Real Estate',
    'Entertainment',
    'Sports',
    'Non-profit',
    'Manufacturing',
    'Consulting',
    'Other'
]

const COLOR_PREFERENCES = [
    { id: 'warm', name: 'Warm', description: 'Reds, oranges, yellows' },
    { id: 'cool', name: 'Cool', description: 'Blues, greens, purples' },
    { id: 'neutral', name: 'Neutral', description: 'Grays, browns, beiges' },
    { id: 'bold', name: 'Bold', description: 'High contrast, vibrant' },
    { id: 'soft', name: 'Soft', description: 'Pastels, muted tones' },
    { id: 'monochrome', name: 'Monochrome', description: 'Single color variations' },
]

export function ColorGenerator() {
    const [industry, setIndustry] = useState('')
    const [selectedPreference, setSelectedPreference] = useState('cool')
    const [generatedPalettes, setGeneratedPalettes] = useState<any[]>([])

    const { isGenerating, setGenerating, setError } = useBrandingStore()

    const handleGenerate = async () => {
        if (!industry.trim()) {
            setError('Please select an industry')
            return
        }

        setGenerating(true)
        setError(null)

        try {
            const response = await apiClient.generateColors(industry, {
                preference: selectedPreference
            })

            if (response.success && response.data) {
                setGeneratedPalettes(prev => [response.data, ...prev])
            } else {
                setError('Failed to generate color palette. Please try again.')
            }
        } catch (error) {
            setError('An error occurred while generating color palette')
        } finally {
            setGenerating(false)
        }
    }

    const handleCopyColor = (color: string) => {
        navigator.clipboard.writeText(color)
        // You could add a toast notification here
    }

    const handleDownloadPalette = (palette: any) => {
        const colors = [
            palette.primary,
            palette.secondary,
            palette.accent,
            palette.neutral,
            palette.background
        ]

        const css = `/* Color Palette */
:root {
  --primary: ${palette.primary};
  --secondary: ${palette.secondary};
  --accent: ${palette.accent};
  --neutral: ${palette.neutral};
  --background: ${palette.background};
}`

        const blob = new Blob([css], { type: 'text/css' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'color-palette.css'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        AI Color Palette Generator
                    </CardTitle>
                    <CardDescription>
                        Generate professional color palettes tailored to your industry and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="industry" className="text-sm font-medium">
                            Industry
                        </label>
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an industry</option>
                            {INDUSTRIES.map((ind) => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Color Preference</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {COLOR_PREFERENCES.map((pref) => (
                                <button
                                    key={pref.id}
                                    onClick={() => setSelectedPreference(pref.id)}
                                    className={`p-3 text-left rounded-lg border transition-colors ${selectedPreference === pref.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{pref.name}</div>
                                    <div className="text-xs text-gray-500">{pref.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !industry.trim()}
                        className="w-full"
                        size="lg"
                    >
                        {isGenerating ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Generating Palette...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Color Palette
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {generatedPalettes.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Generated Color Palettes</h3>
                    <div className="space-y-4">
                        {generatedPalettes.map((palette, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                        {Object.entries(palette.result?.colors || {}).map(([name, color]) => (
                                            <div key={name} className="text-center">
                                                <div
                                                    className="w-full h-20 rounded-lg mb-2 border shadow-sm"
                                                    style={{ backgroundColor: color as string }}
                                                />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium capitalize">{name}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleCopyColor(color as string)}
                                                        className="p-1"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-gray-500 font-mono">{color}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDownloadPalette(palette.result)}
                                            className="flex-1"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download CSS
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                const colors = Object.values(palette.result?.colors || {})
                                                navigator.clipboard.writeText(colors.join('\n'))
                                            }}
                                            className="flex-1"
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy All Colors
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