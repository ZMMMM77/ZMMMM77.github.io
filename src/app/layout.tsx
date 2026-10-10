import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { profile, site } from "@/data/profile";
import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: profile.name || site.title,
    template: `%s | ${profile.name || site.title}`,
  },
  description: profile.description || site.description,
  openGraph: {
    title: profile.name || site.title,
    description: profile.description || site.description,
    url: site.url,
    type: "website",
  },
  robots: { index: site.allowIndexing, follow: site.allowIndexing },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="relative min-h-screen bg-background font-sans antialiased"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-background focus:p-3"
        >
          跳转到内容
        </a>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div
              className="page-texture pointer-events-none absolute inset-x-0 top-0 h-[100px]"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-2xl px-6 pt-12 pb-28 sm:pt-24">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
