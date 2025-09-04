'use client';

import { Product } from '@/types';

interface JsonLdSchemaProps {
  type?: 'website' | 'product' | 'localBusiness';
  product?: Product;
  pageDescription?: string;
}

export default function JsonLdSchema({ 
  type = 'website', 
  product, 
  pageDescription = 'Find quality used and refurbished laptops and accessories at affordable prices in Hanumangarh, Rajasthan. Free delivery to nearby districts including Sri Ganganagar, Bikaner, Churu, and Fazilka.'
}: JsonLdSchemaProps) {
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Shree Laptop Solutions",
    "description": "Quality used and refurbished laptops and accessories at affordable prices in Hanumangarh, Rajasthan",
    "url": "https://shreelaptop.shop",
    "logo": "https://shreelaptop.shop/logo.png",
    "image": "https://shreelaptop.shop/og-image.jpg",
    "telephone": "+917878224705",
    "email": "shreelaptop2285@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Central Park",
      "addressLocality": "Hanumangarh",
      "addressRegion": "Rajasthan",
      "postalCode": "335513",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.5798",
      "longitude": "74.3239"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Hanumangarh",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Sri Ganganagar",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Bikaner",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Churu",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Fazilka",
        "containedInPlace": {
          "@type": "State",
          "name": "Punjab"
        }
      },
      {
        "@type": "City",
        "name": "Pilibanga",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Rawatsar",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Sangaria",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Tibi",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      }
    ],
    "serviceType": [
      "Used Laptop Sales",
      "Refurbished Laptop Sales", 
      "Laptop Accessories",
      "Gaming Laptops",
      "Budget Laptops",
      "Laptop Repair",
      "Laptop Consultation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Laptop Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Used Laptops"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Refurbished Laptops"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "Gaming Laptops"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Laptop Accessories"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/shree_laptop_solution",
      "https://www.instagram.com/shree_laptop_solution",
      "https://wa.me/917878224705"
    ],
    "priceRange": "₹15,000 - ₹1,50,000",
    "paymentAccepted": ["Cash", "UPI", "Credit Card", "Debit Card", "EMI"],
    "currenciesAccepted": "INR"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shree Laptop Solutions",
    "url": "https://shreelaptop.shop",
    "description": pageDescription,
    "publisher": {
      "@type": "Organization",
      "name": "Shree Laptop Solutions",
      "url": "https://shreelaptop.shop"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shreelaptop.shop/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.specs,
    "image": product.images?.[0] || "https://shreelaptop.shop/placeholder-laptop.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Various"
    },
    "category": product.type === 'laptop' ? "Laptop" : "Laptop Accessory",
    "offers": {
      "@type": "Offer",
      "price": product.price.replace(/[^\d]/g, ''),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "Shree Laptop Solutions",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Central Park",
          "addressLocality": "Hanumangarh",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      },
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "condition": product.condition || "Used",
    "sku": product.id
  } : null;

  let schema;
  switch (type) {
    case 'product':
      schema = productSchema;
      break;
    case 'localBusiness':
      schema = baseSchema;
      break;
    case 'website':
    default:
      schema = websiteSchema;
      break;
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
