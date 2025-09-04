import { supabase } from '@/lib/supabase'
import { Product, ContactInfo } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// ==================== STORAGE OPERATIONS ====================

/**
 * Upload an image to Supabase Storage
 */
export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    if (!file) {
      throw new Error('No file provided for upload')
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file')
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB')
    }

    const fileId = uuidv4()
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `products/${fileId}.${fileExtension}`

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error(
      'Failed to upload image: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    )
  }
}

/**
 * Delete an image from Supabase Storage
 */
export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    // Skip deletion for placeholder images or non-supabase URLs
    if (!imageUrl.includes('supabase')) {
      return
    }

    // Extract file path from URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const filePath = `products/${fileName}`

    // Delete file from Supabase Storage
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath])

    if (error) {
      console.error('Error deleting image:', error)
      throw new Error('Failed to delete image')
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}

// ==================== DATABASE OPERATIONS ====================

/**
 * Get all products from Supabase
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`)
    }

    return data.map(product => ({
      id: product.id,
      name: product.name,
      specs: product.specs,
      detailedSpecs: product.detailed_specs ? JSON.parse(product.detailed_specs) : undefined,
      price: product.price,
      originalPrice: product.original_price || undefined,
      discount: product.discount || undefined,
      image: product.image,
      images: product.images || undefined,
      category: product.category || undefined,
      type: product.type,
      condition: product.condition || undefined,
      warranty: product.warranty || undefined,
      availability: product.availability || undefined,
      featured: product.featured || false,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }))
  } catch (error) {
    console.error('Error getting products:', error)
    throw new Error('Failed to get products')
  }
}

/**
 * Get a product by ID from Supabase
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Product not found
      }
      throw new Error(`Failed to fetch product: ${error.message}`)
    }

    return {
      id: data.id,
      name: data.name,
      specs: data.specs,
      detailedSpecs: data.detailed_specs ? JSON.parse(data.detailed_specs) : undefined,
      price: data.price,
      originalPrice: data.original_price || undefined,
      discount: data.discount || undefined,
      image: data.image,
      images: data.images || undefined,
      category: data.category || undefined,
      type: data.type,
      condition: data.condition || undefined,
      laptopCondition: data.laptop_condition ? JSON.parse(data.laptop_condition) : undefined,
      freeGifts: data.free_gifts ? JSON.parse(data.free_gifts) : undefined,
      warranty: data.warranty || undefined,
      availability: data.availability || undefined,
      featured: data.featured || false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error('Error getting product:', error)
    throw new Error('Failed to get product')
  }
}

/**
 * Create a new product in Supabase
 */
export const createProduct = async (
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> => {
  try {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        specs: productData.specs,
        detailed_specs: productData.detailedSpecs ? JSON.stringify(productData.detailedSpecs) : null,
        price: productData.price,
        original_price: productData.originalPrice || null,
        discount: productData.discount || null,
        image: productData.image,
        images: productData.images || null,
        category: productData.category || null,
        type: productData.type,
        condition: productData.condition || null,
        laptop_condition: productData.laptopCondition ? JSON.stringify(productData.laptopCondition) : null,
        free_gifts: productData.freeGifts ? JSON.stringify(productData.freeGifts) : null,
        warranty: productData.warranty || null,
        availability: productData.availability || 'in_stock',
        featured: productData.featured || false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create product: ${error.message}`)
    }

    return {
      id: data.id,
      name: data.name,
      specs: data.specs,
      detailedSpecs: data.detailed_specs ? JSON.parse(data.detailed_specs) : undefined,
      price: data.price,
      originalPrice: data.original_price || undefined,
      discount: data.discount || undefined,
      image: data.image,
      images: data.images || undefined,
      category: data.category || undefined,
      type: data.type,
      condition: data.condition || undefined,
      laptopCondition: data.laptop_condition ? JSON.parse(data.laptop_condition) : undefined,
      freeGifts: data.free_gifts ? JSON.parse(data.free_gifts) : undefined,
      warranty: data.warranty || undefined,
      availability: data.availability || undefined,
      featured: data.featured || false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product')
  }
}

/**
 * Update a product in Supabase
 */
export const updateProduct = async (
  id: string,
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> => {
  try {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        specs: productData.specs,
        detailed_specs: productData.detailedSpecs ? JSON.stringify(productData.detailedSpecs) : null,
        price: productData.price,
        original_price: productData.originalPrice || null,
        discount: productData.discount || null,
        image: productData.image,
        images: productData.images || null,
        category: productData.category || null,
        type: productData.type,
        condition: productData.condition || null,
        laptop_condition: productData.laptopCondition ? JSON.stringify(productData.laptopCondition) : null,
        free_gifts: productData.freeGifts ? JSON.stringify(productData.freeGifts) : null,
        warranty: productData.warranty || null,
        availability: productData.availability || 'in_stock',
        featured: productData.featured || false,
        updated_at: now,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update product: ${error.message}`)
    }

    return {
      id: data.id,
      name: data.name,
      specs: data.specs,
      detailedSpecs: data.detailed_specs ? JSON.parse(data.detailed_specs) : undefined,
      price: data.price,
      originalPrice: data.original_price || undefined,
      discount: data.discount || undefined,
      image: data.image,
      images: data.images || undefined,
      category: data.category || undefined,
      type: data.type,
      condition: data.condition || undefined,
      laptopCondition: data.laptop_condition ? JSON.parse(data.laptop_condition) : undefined,
      freeGifts: data.free_gifts ? JSON.parse(data.free_gifts) : undefined,
      warranty: data.warranty || undefined,
      availability: data.availability || undefined,
      featured: data.featured || false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error('Error updating product:', error)
    throw new Error('Failed to update product')
  }
}

/**
 * Delete a product from Supabase
 */
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete product: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }
}

/**
 * Get contact information from Supabase
 */
export const getContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Contact info not found
      }
      throw new Error(`Failed to fetch contact info: ${error.message}`)
    }

    return {
      phone: data.phone,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      instagramHandle: data.instagram_handle || undefined,
      location: {
        lat: data.location_lat,
        lng: data.location_lng,
        placeId: data.location_place_id,
      },
    }
  } catch (error) {
    console.error('Error getting contact info:', error)
    throw new Error('Failed to get contact info')
  }
}

/**
 * Update contact information in Supabase
 */
export const updateContactInfo = async (
  contactData: ContactInfo
): Promise<ContactInfo> => {
  try {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('contact_info')
      .upsert({
        id: 'default', // Use a single row for contact info
        phone: contactData.phone,
        whatsapp: contactData.whatsapp,
        instagram: contactData.instagram,
        instagram_handle: contactData.instagramHandle || null,
        location_lat: contactData.location.lat,
        location_lng: contactData.location.lng,
        location_place_id: contactData.location.placeId,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update contact info: ${error.message}`)
    }

    return {
      phone: data.phone,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      instagramHandle: data.instagram_handle || undefined,
      location: {
        lat: data.location_lat,
        lng: data.location_lng,
        placeId: data.location_place_id,
      },
    }
  } catch (error) {
    console.error('Error updating contact info:', error)
    throw new Error('Failed to update contact info')
  }
}
