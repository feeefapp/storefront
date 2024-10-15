import { Alexandria } from "next/font/google";
import "./globals.css";

import { fetchStore } from "./utils/actions";
import { Metadata } from "next";
import { CartProvider } from "./components/context";
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

const alexandria = Alexandria({ subsets: ["arabic"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${alexandria.className} `}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
