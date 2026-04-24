'use client';

import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NavigationSidebar } from "../components/layout/NavigationSidebar";

import { TopNavigationBar } from "../components/layout/TopNavigationBar";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Must run before any conditional return — same hook order every render.
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const publicRoutes = ['/login', '/register', '/verify', '/forgot-password', '/reset-password'];
  const isAuthPage = publicRoutes.some(route => pathname?.startsWith(route));

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-[#f0f2f5]" />
      </html>
    );
  }

  return (
    <html lang="en" className="light">
      <body className={`${roboto.variable} ${montserrat.variable} antialiased font-roboto bg-[#f4f6fb] text-slate-800`}>
        <QueryClientProvider client={queryClient}>
          {isAuthPage ? (
            <main className="w-full min-h-screen overflow-y-auto">
                {children}
            </main>
          ) : (
            <div className="flex w-full h-screen text-slate-900 bg-white overflow-hidden relative">
                <NavigationSidebar
                  mobileOpen={isMobileSidebarOpen}
                  onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#fafbfc]">
                    <TopNavigationBar onMenuClick={() => setIsMobileSidebarOpen(prev => !prev)} />
                    <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        {children}
                    </main>
                </div>
            </div>
          )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
