export interface Product {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
  category?: string;
  type: 'laptop' | 'accessory';
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'user';
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramHandle?: string;
  location: {
    lat: string;
    lng: string;
    placeId: string;
  };
} 