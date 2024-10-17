import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Gestpro Cloud - Soluciones en Punto de Venta (POS) en Campeche",
  description: "Gestpro Cloud ofrece soluciones personalizadas de Punto de Venta (POS) para negocios en Campeche. Nos especializamos en la implementación y personalización de sistemas que simplifican la gestión de inventarios, ventas y clientes, mejorando la eficiencia operativa de las empresas. Con nuestras soluciones, los comercios locales pueden tomar control de sus operaciones en tiempo real, optimizar procesos y aumentar la rentabilidad. Desde la integración con métodos de pago hasta la generación de reportes detallados, en Gestpro Cloud acompañamos a nuestros clientes con soporte continuo y mantenimiento especializado.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
