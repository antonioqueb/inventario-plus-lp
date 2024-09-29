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
  title: "Servicios de Implementación ERP a Medida para tu Empresa",
  description: "Optimiza tus procesos empresariales con nuestros servicios de implementación ERP a medida. Diseñamos soluciones personalizadas que integran tecnología avanzada, mejorando la eficiencia operativa y facilitando la toma de decisiones. Confía en nuestros expertos para una transición fluida y un soporte continuo, adaptando el ERP a las necesidades específicas de tu negocio.",
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
