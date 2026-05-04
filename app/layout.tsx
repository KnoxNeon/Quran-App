import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontSettingsProvider } from "@/lib/FontSettingsContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "A beautiful Quran reading application",
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <FontSettingsProvider>
          {children}
        </FontSettingsProvider>
      </body>
    </html>
  );
}
