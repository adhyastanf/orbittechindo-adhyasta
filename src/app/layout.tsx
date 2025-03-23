import Navbar from '@/components/Layout/navbar';
import { ProvidersTanstack } from '@/components/tanstack-providers';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie Review Home Page',
  description: 'Movie Review page',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersTanstack>
          <Navbar />
          {children}
          <Toaster />
        </ProvidersTanstack>
      </body>
    </html>
  );
}
