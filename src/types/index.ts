export interface LaptopSpecs {
  // Processor
  processor?: string;
  processorGeneration?: string;
  processorCores?: number;
  processorSpeed?: string;
  
  // Memory
  ram?: string;
  ramType?: string;
  ramUpgradeable?: boolean;
  maxRam?: string;
  
  // Storage
  storage?: string;
  storageType?: 'SSD' | 'HDD' | 'SSD+HDD';
  storageUpgradeable?: boolean;
  additionalStorage?: string;
  
  // Graphics
  graphics?: string;
  graphicsType?: 'Integrated' | 'Dedicated';
  graphicsMemory?: string;
  
  // Display
  displaySize?: string;
  displayResolution?: string;
  displayType?: string;
  displayFeatures?: string[];
  
  // Connectivity
  ports?: string[];
  wireless?: string[];
  
  // Other
  operatingSystem?: string;
  battery?: string;
  weight?: string;
  dimensions?: string;
  color?: string;
  
  // Upgrade Options
  upgradeOptions?: {
    ram?: string[];
    storage?: string[];
    other?: string[];
  };
}

export interface FreeGift {
  id: string;
  name: string;
  description?: string;
  category: 'bag' | 'keyboard' | 'mouse' | 'keyguard' | 'mousepad' | 'stand' | 'cleaning' | 'airpods' | 'watch' | 'other';
  isDefault?: boolean;
}

export interface LaptopCondition {
  overall: 'excellent' | 'good' | 'poor';
  details: {
    scratches?: 'none' | 'minor' | 'moderate' | 'severe';
    dents?: 'none' | 'minor' | 'moderate' | 'severe';
    colorFading?: 'none' | 'slight' | 'moderate' | 'severe';
    screenCondition?: 'perfect' | 'good' | 'minor_issues' | 'major_issues';
    keyboardCondition?: 'perfect' | 'good' | 'minor_issues' | 'major_issues';
    batteryHealth?: 'excellent' | 'good' | 'fair' | 'poor';
    chargerIncluded?: boolean;
    boxIncluded?: boolean;
    warrantyRemaining?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  specs: string; // General specifications (backward compatibility)
  detailedSpecs?: LaptopSpecs; // Detailed specifications for laptops
  price: string;
  originalPrice?: string; // Original price before discount
  discount?: number; // Discount percentage (0-100)
  image: string; // Primary/main image (for backward compatibility)
  images?: string[]; // Array of all product images
  category?: string;
  type: 'laptop' | 'accessory';
  condition?: 'new' | 'used' | 'refurbished'; // Product condition
  laptopCondition?: LaptopCondition; // Detailed condition for laptops
  freeGifts?: FreeGift[]; // Free gifts included with laptops
  warranty?: string; // Warranty information
  availability?: 'in_stock' | 'out_of_stock' | 'limited'; // Stock status
  featured?: boolean; // Featured product flag
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