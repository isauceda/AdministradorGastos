
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

import ProviderUsuario from "./Provider/ProviderUsuario";
import ProviderProducto from "./Provider/ProviderProducto";
import NavBar from "./Components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda Online",
  description: "Carrito de compras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ProviderUsuario>
          <ProviderProducto>
            <NavBar />
            {children}
          </ProviderProducto>
        </ProviderUsuario>
      </body>
    </html>
  );
}

