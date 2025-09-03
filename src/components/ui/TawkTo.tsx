'use client';

import { useEffect } from 'react';

export default function TawkTo() {
  useEffect(() => {
    // Check if Tawk.to is already loaded
    if (window.Tawk_API) {
      return;
    }

    // Get credentials from environment variables
    const TAWK_TO_ID = process.env.NEXT_PUBLIC_TAWK_TO_ID;
    const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
    
    // Only load if credentials are provided
    if (!TAWK_TO_ID || !TAWK_WIDGET_ID) {
      console.warn('Tawk.to credentials not found. Please set NEXT_PUBLIC_TAWK_TO_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in .env.local');
      return;
    }

    // Minimal Tawk.to configuration
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Create the script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_TO_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Add the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Extend the Window interface to include Tawk.to types
declare global {
  interface Window {
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}
