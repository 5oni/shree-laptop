import type { Metadata } from 'next';
import { Poppins, Montserrat, Raleway, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingAction from '@/components/ui/FloatingAction';
import TawkTo from '@/components/ui/TawkTo';
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
  title: 'Shree Laptop Solutions | Quality Used & Refurbished Laptops in India',
  description: 'Find quality used and refurbished laptops and accessories at affordable prices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
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