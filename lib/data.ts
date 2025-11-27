// Data fetching functions for the frontend
import { ApiResponse, Product, Service, Client, Testimonial, Category } from './types'

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}/api${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error)
    throw error
  }
}

// Products
export async function getProducts(params?: {
  category?: string
  featured?: boolean
  limit?: number
  search?: string
}): Promise<Product[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.category) searchParams.append('category', params.category)
  if (params?.featured) searchParams.append('featured', 'true')
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)

  const response = await fetchApi<Product[]>(`/products?${searchParams}`)
  return response.data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true, limit: 6 })
}

// Services
export async function getServices(params?: {
  category?: string
  featured?: boolean
  search?: string
}): Promise<Service[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.category) searchParams.append('category', params.category)
  if (params?.featured) searchParams.append('featured', 'true')
  if (params?.search) searchParams.append('search', params.search)

  const response = await fetchApi<Service[]>(`/services?${searchParams}`)
  return response.data || []
}

export async function getFeaturedServices(): Promise<Service[]> {
  return getServices({ featured: true })
}

// Clients
export async function getClients(featured?: boolean): Promise<Client[]> {
  const searchParams = new URLSearchParams()
  if (featured) searchParams.append('featured', 'true')

  const response = await fetchApi<Client[]>(`/clients?${searchParams}`)
  return response.data || []
}

export async function getFeaturedClients(): Promise<Client[]> {
  return getClients(true)
}

// Testimonials
export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  const searchParams = new URLSearchParams()
  if (featured) searchParams.append('featured', 'true')

  const response = await fetchApi<Testimonial[]>(`/testimonials?${searchParams}`)
  return response.data || []
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return getTestimonials(true)
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetchApi<Category[]>('/cms/categories')
  return response.data || []
}

// Settings (public only)
export async function getSettings(): Promise<Record<string, any>> {
  const response = await fetchApi<Record<string, any>>('/settings?public=true')
  return response.data || {}
}

// Submit inquiry
export async function submitInquiry(data: {
  type?: string
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  productId?: string
  serviceId?: string
}): Promise<any> {
  const response = await fetchApi('/inquiries', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response
}