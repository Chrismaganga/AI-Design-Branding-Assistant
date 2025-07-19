import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Brand, GenerationResponse, User, BrandKit } from '@/types'

interface BrandingState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // Brands state
  brands: Brand[]
  currentBrand: Brand | null
  
  // Generation state
  generations: GenerationResponse[]
  isGenerating: boolean
  
  // UI state
  isLoading: boolean
  error: string | null
  
  // Brand kits
  brandKits: BrandKit[]
  
  // Actions
  setUser: (user: User | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setBrands: (brands: Brand[]) => void
  addBrand: (brand: Brand) => void
  updateBrand: (id: string, updates: Partial<Brand>) => void
  deleteBrand: (id: string) => void
  setCurrentBrand: (brand: Brand | null) => void
  addGeneration: (generation: GenerationResponse) => void
  updateGeneration: (id: string, updates: Partial<GenerationResponse>) => void
  setGenerating: (isGenerating: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setBrandKits: (brandKits: BrandKit[]) => void
  clearError: () => void
}

export const useBrandingStore = create<BrandingState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        brands: [],
        currentBrand: null,
        generations: [],
        isGenerating: false,
        isLoading: false,
        error: null,
        brandKits: [],
        
        // Actions
        setUser: (user) => set({ user }),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setBrands: (brands) => set({ brands }),
        addBrand: (brand) => set((state) => ({ 
          brands: [...state.brands, brand] 
        })),
        updateBrand: (id, updates) => set((state) => ({
          brands: state.brands.map(brand => 
            brand.id === id ? { ...brand, ...updates } : brand
          ),
          currentBrand: state.currentBrand?.id === id 
            ? { ...state.currentBrand, ...updates }
            : state.currentBrand
        })),
        deleteBrand: (id) => set((state) => ({
          brands: state.brands.filter(brand => brand.id !== id),
          currentBrand: state.currentBrand?.id === id ? null : state.currentBrand
        })),
        setCurrentBrand: (brand) => set({ currentBrand: brand }),
        addGeneration: (generation) => set((state) => ({
          generations: [generation, ...state.generations]
        })),
        updateGeneration: (id, updates) => set((state) => ({
          generations: state.generations.map(gen =>
            gen.id === id ? { ...gen, ...updates } : gen
          )
        })),
        setGenerating: (isGenerating) => set({ isGenerating }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setBrandKits: (brandKits) => set({ brandKits }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'branding-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          brands: state.brands,
          currentBrand: state.currentBrand,
          brandKits: state.brandKits,
        }),
      }
    )
  )
) 