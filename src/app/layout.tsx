import type { Metadata } from 'next';
import { Poppins, Montserrat, Raleway, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingAction from '@/components/ui/FloatingAction';
import TawkTo from '@/components/ui/TawkTo';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import { Providers } from './providers';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shree Laptop Solutions | Best Laptop Shop in Hanumangarh, Rajasthan | Used & Refurbished Laptops',
  description: 'Best laptop shop in Hanumangarh, Rajasthan. Quality used & refurbished laptops, gaming laptops, and accessories at affordable prices. Free delivery in Hanumangarh, Sri Ganganagar, Bikaner, Churu, and nearby districts.',
  keywords: 'laptop shop in Hanumangarh, buy laptop Hanumangarh, used laptop Hanumangarh, refurbished laptop Hanumangarh, gaming laptop Hanumangarh, laptop accessories Hanumangarh, हनुमानगढ़ में लैपटॉप खरीदें, budget laptops delivery in Bikaner, laptop shop Sri Ganganagar',
  openGraph: {
    title: 'Shree Laptop Solutions | Best Laptop Shop in Hanumangarh, Rajasthan',
    description: 'Best laptop shop in Hanumangarh, Rajasthan. Quality used & refurbished laptops at affordable prices with free delivery.',
    url: 'https://shreelaptop.shop',
    siteName: 'Shree Laptop Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://shreelaptop.shop/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shree Laptop Solutions - Best Laptop Shop in Hanumangarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Laptop Solutions | Best Laptop Shop in Hanumangarh, Rajasthan',
    description: 'Best laptop shop in Hanumangarh, Rajasthan. Quality used & refurbished laptops at affordable prices.',
    images: ['https://shreelaptop.shop/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://shreelaptop.shop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <head>
        <JsonLdSchema type="localBusiness" />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} ${raleway.variable} ${robotoMono.variable} font-poppins min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingAction />
          <TawkTo />
        </Providers>
      </body>
    </html>
  );
} 