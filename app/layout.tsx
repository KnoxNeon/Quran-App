import type { Metadata } from "next";
import "./globals.css";
import { FontSettingsProvider } from "@/lib/FontSettingsContext";

export const metadata: Metadata = {
  title: "Quran App",
  description: "A beautiful Quran reading application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster Google Fonts loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Three visually distinct Arabic fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <FontSettingsProvider>
          {children}
        </FontSettingsProvider>
      </body>
    </html>
  );
}
