import localFont from "next/font/local";
import "./globals.css";

import { fetchStore } from "./utils/actions";
import { Metadata } from "next";
import { CartProvider } from "./components/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export async function generateMetadata(): Promise<Metadata> {
  const store = await fetchStore();

  return {
    title: store ? `${store.name} | ${store.description}` : "Feeef App",
    description: store?.description || "Default Description",
    icons: {
      icon: store?.logoUrl ? store.logoUrl : "/default-icon.png", // Fallback icon
    },
    openGraph: {
      images: store?.logoUrl
        ? [store.logoUrl]
        : [
            {
              url: "/default-image.png",
              width: 1200,
              height: 627,
              alt: "Default Image",
            },
          ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
