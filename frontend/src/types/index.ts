export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription?: Subscription
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due'
  currentPeriodEnd: string
  features: string[]
}

export interface Brand {
  id: string
  name: string
  description: string
  industry: string
  targetAudience: string
  colors: ColorPalette
  logo?: Logo
  slogans: Slogan[]
  domainSuggestions: DomainSuggestion[]
  createdAt: string
  updatedAt: string
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  background: string
}

export interface Logo {
  id: string
  url: string
  format: 'svg' | 'png' | 'jpg'
  style: string
  variations: LogoVariation[]
  createdAt: string
}

export interface LogoVariation {
  id: string
  url: string
  style: string
  format: 'svg' | 'png' | 'jpg'
}

export interface Slogan {
  id: string
  text: string
  style: 'professional' | 'casual' | 'creative' | 'luxury'
  language: string
  createdAt: string
}

export interface DomainSuggestion {
  id: string
  domain: string
  available: boolean
  price?: number
  registrar?: string
}

export interface BusinessName {
  id: string
  name: string
  available: boolean
  domain?: string
  trademark?: boolean
  createdAt: string
}

export interface BrandKit {
  id: string
  brandId: string
  name: string
  description: string
  price: number
  includes: string[]
  downloads: number
  createdAt: string
}

export interface GenerationRequest {
  type: 'logo' | 'slogan' | 'colors' | 'domain' | 'business-name'
  prompt: string
  style?: string
  industry?: string
  preferences?: Record<string, any>
}

export interface GenerationResponse {
  id: string
  type: string
  result: any
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface Integration {
  id: string
  name: 'canva' | 'figma' | 'printful'
  connected: boolean
  accessToken?: string
  lastSync?: string
}

export interface Payment {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  type: 'subscription' | 'one-time'
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} 