import { ContactInfo } from '@/types';
import * as supabaseService from './supabaseService';

// Default contact info - used if no data exists in Supabase
const defaultContactInfo: ContactInfo = {
  phone: '+917878224705',
  whatsapp: '917878224705',
  instagram: 'shree_laptop_solution',
  instagramHandle: '@shree_laptop_solution',
  location: {
    lat: '29.579836911114963',
    lng: '74.32385028723934',
    placeId: 'ChIJu2l2GQDQQDkRrJnTTe0EHpg',
  },
};

// Get contact information
export const getContactInfo = async (): Promise<ContactInfo> => {
  try {
    // Fetch from Supabase
    const contactInfo = await supabaseService.getContactInfo();
    
    // If no data exists, create the default contact info in Supabase
    if (!contactInfo) {
      await supabaseService.updateContactInfo(defaultContactInfo);
      return defaultContactInfo;
    }
    
    return contactInfo;
  } catch (error) {
    console.error('Error getting contact info:', error);
    // Fallback to default if there's an error
    return defaultContactInfo;
  }
};

// Update contact information (for admin use)
export const updateContactInfo = async (newContactInfo: ContactInfo): Promise<ContactInfo> => {
  try {
    // Update in Supabase
    return await supabaseService.updateContactInfo(newContactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    throw new Error('Failed to update contact information');
  }
}; 