'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoGenerator } from '@/components/branding/logo-generator'
import { SloganGenerator } from '@/components/branding/slogan-generator'
import { ColorGenerator } from '@/components/branding/color-generator'
import {
  Sparkles,
  Palette,
  MessageSquare,
  Globe,
  Building2,
  Download,
  Zap,
  Star,
  Users,
  TrendingUp
} from 'lucide-react'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI Logo Generation',
    description: 'Create stunning logos with AI-powered design tools',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: MessageSquare,
    title: 'Slogan Creation',
    description: 'Generate catchy taglines and brand messaging',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Palette,
    title: 'Color Palettes',
    description: 'Get professional color schemes for your brand',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Globe,
    title: 'Domain Suggestions',
    description: 'Find the perfect domain name for your business',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Building2,
    title: 'Business Names',
    description: 'Discover unique and memorable business names',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Download,
    title: 'Brand Kits',
    description: 'Download complete branding packages',
    color: 'from-yellow-500 to-orange-600'
  }
]

const STATS = [
  { label: 'Logos Generated', value: '10,000+', icon: Sparkles },
  { label: 'Happy Customers', value: '5,000+', icon: Users },
  { label: 'Brand Kits Sold', value: '2,500+', icon: Download },
  { label: 'Success Rate', value: '98%', icon: TrendingUp }
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'logo' | 'slogan' | 'colors'>('logo')

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'logo':
        return <LogoGenerator />
      case 'slogan':
        return <SloganGenerator />
      case 'colors':
        return <ColorGenerator />
      default:
        return <LogoGenerator />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Design & Branding
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Assistant
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Create professional logos, slogans, and brand identities with the power of AI.
              Transform your business with stunning designs in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Zap className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Star className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Brand
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From logos to color palettes, we provide all the tools you need to create a professional brand identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Your Brand Identity
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our powerful AI tools to build your brand
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeTab === 'logo' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('logo')}
                className="rounded-md"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Logo Generator
              </Button>
              <Button
                variant={activeTab === 'slogan' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('slogan')}
                className="rounded-md"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Slogan Generator
              </Button>
              <Button
                variant={activeTab === 'colors' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('colors')}
                className="rounded-md"
              >
                <Palette className="w-4 h-4 mr-2" />
                Color Generator
              </Button>
            </div>
          </div>

          {/* Active Component */}
          <div className="max-w-4xl mx-auto">
            {renderActiveComponent()}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of businesses that have already created stunning brand identities with our AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
