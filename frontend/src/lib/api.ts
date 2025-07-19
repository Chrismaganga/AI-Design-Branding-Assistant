import type { 
  ApiResponse, 
  Brand, 
  GenerationRequest, 
  GenerationResponse, 
  User, 
  BrandKit,
  BusinessName,
  DomainSuggestion 
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout/', {
      method: 'POST',
    })
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me/')
  }

  // Brand endpoints
  async getBrands(): Promise<ApiResponse<Brand[]>> {
    return this.request('/brands/')
  }

  async getBrand(id: string): Promise<ApiResponse<Brand>> {
    return this.request(`/brands/${id}/`)
  }

  async createBrand(brand: Partial<Brand>): Promise<ApiResponse<Brand>> {
    return this.request('/brands/', {
      method: 'POST',
      body: JSON.stringify(brand),
    })
  }

  async updateBrand(id: string, updates: Partial<Brand>): Promise<ApiResponse<Brand>> {
    return this.request(`/brands/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  }

  async deleteBrand(id: string): Promise<ApiResponse<void>> {
    return this.request(`/brands/${id}/`, {
      method: 'DELETE',
    })
  }

  // Generation endpoints
  async generateContent(request: GenerationRequest): Promise<ApiResponse<GenerationResponse>> {
    return this.request('/generate/', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async getGenerationStatus(id: string): Promise<ApiResponse<GenerationResponse>> {
    return this.request(`/generate/${id}/status/`)
  }

  async getGenerations(): Promise<ApiResponse<GenerationResponse[]>> {
    return this.request('/generate/')
  }

  // Logo endpoints
  async generateLogo(prompt: string, style?: string): Promise<ApiResponse<GenerationResponse>> {
    return this.generateContent({
      type: 'logo',
      prompt,
      style,
    })
  }

  async downloadLogo(id: string, format: 'svg' | 'png'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/logos/${id}/download/?format=${format}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to download logo')
    }
    
    return response.blob()
  }

  // Slogan endpoints
  async generateSlogan(prompt: string, style?: string): Promise<ApiResponse<GenerationResponse>> {
    return this.generateContent({
      type: 'slogan',
      prompt,
      style,
    })
  }

  // Color palette endpoints
  async generateColors(industry: string, preferences?: Record<string, any>): Promise<ApiResponse<GenerationResponse>> {
    return this.generateContent({
      type: 'colors',
      prompt: `Generate color palette for ${industry} industry`,
      industry,
      preferences,
    })
  }

  // Domain endpoints
  async generateDomainSuggestions(businessName: string): Promise<ApiResponse<DomainSuggestion[]>> {
    return this.request('/domains/suggest/', {
      method: 'POST',
      body: JSON.stringify({ business_name: businessName }),
    })
  }

  async checkDomainAvailability(domain: string): Promise<ApiResponse<{ available: boolean; price?: number }>> {
    return this.request(`/domains/check/${domain}/`)
  }

  // Business name endpoints
  async generateBusinessNames(industry: string, keywords?: string[]): Promise<ApiResponse<BusinessName[]>> {
    return this.request('/business-names/generate/', {
      method: 'POST',
      body: JSON.stringify({ industry, keywords }),
    })
  }

  // Brand kit endpoints
  async getBrandKits(): Promise<ApiResponse<BrandKit[]>> {
    return this.request('/brand-kits/')
  }

  async purchaseBrandKit(id: string): Promise<ApiResponse<{ download_url: string }>> {
    return this.request(`/brand-kits/${id}/purchase/`, {
      method: 'POST',
    })
  }

  // Integration endpoints
  async connectIntegration(name: string, accessToken: string): Promise<ApiResponse<void>> {
    return this.request('/integrations/connect/', {
      method: 'POST',
      body: JSON.stringify({ name, access_token: accessToken }),
    })
  }

  async exportToCanva(brandId: string): Promise<ApiResponse<{ url: string }>> {
    return this.request(`/integrations/canva/export/${brandId}/`, {
      method: 'POST',
    })
  }

  async exportToFigma(brandId: string): Promise<ApiResponse<{ url: string }>> {
    return this.request(`/integrations/figma/export/${brandId}/`, {
      method: 'POST',
    })
  }

  // Payment endpoints
  async createCheckoutSession(priceId: string): Promise<ApiResponse<{ session_id: string; url: string }>> {
    return this.request('/payments/create-checkout-session/', {
      method: 'POST',
      body: JSON.stringify({ price_id: priceId }),
    })
  }

  async getSubscription(): Promise<ApiResponse<any>> {
    return this.request('/payments/subscription/')
  }
}

export const apiClient = new ApiClient(API_BASE_URL) 