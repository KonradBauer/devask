import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/Toast";
import { ToastProvider } from "@/lib/ToastContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pytania rekrutacyjne IT — Prawdziwe pytania z rozmów kwalifikacyjnych",
  description: "Przeglądaj setki prawdziwych pytań rekrutacyjnych IT według technologii.",
  metadataBase: new URL("https://it-interview-questions.vercel.app"),
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="pl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})()` }} />
        <Script
            async
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5212047673129858"
            crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-5212047673129858"/>
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
      <ToastProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastContainer />
      </ToastProvider>
      </body>
      </html>
  );
}