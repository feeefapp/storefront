import localFont from "next/font/local";
import "./globals.css";

import { fetchStore } from "./utils/actions";
import { Metadata } from "next";
import { CartProvider } from "./components/context";

// have 4 weights
// bold: /app/fonts/expo_arabic/Expo Arabic Bold.ttf
// medium: /app/fonts/expo_arabic/Expo Arabic Medium.ttf
// light: /app/fonts/expo_arabic/Expo Arabic Light.ttf
// book: /app/fonts/expo_arabic/Expo Arabic Book.ttf
const expoArabic = localFont({
  src: [
    {
      path: "/fonts/expo_arabic/Expo Arabic Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/expo_arabic/Expo Arabic Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/expo_arabic/Expo Arabic Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/expo_arabic/Expo Arabic Book.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

// import alexendria from "next/font/alexendria";
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
      <body className={`${expoArabic.className} `}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
