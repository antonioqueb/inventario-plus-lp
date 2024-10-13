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
  title: "GEC - Gestiones Empresariales de Campeche, S.C.",
  description: "GEC - Gestiones Empresariales de Campeche, S.C. es una empresa con sede en el estado de Campeche, México, que se dedica a proporcionar soluciones integrales de gestión administrativa y empresarial. Desde su fundación, GEC se ha posicionado como un aliado estratégico para empresas, emprendedores y organizaciones que buscan optimizar sus operaciones y alcanzar el éxito en un entorno competitivo. La misión de GEC es apoyar el crecimiento sostenible de las empresas campechanas mediante servicios personalizados que abarcan desde la consultoría administrativa hasta la implementación de soluciones contables, fiscales y legales. La empresa tiene como objetivo facilitar la toma de decisiones estratégicas y mejorar la eficiencia operativa de sus clientes, permitiendo que se concentren en su actividad principal mientras GEC se encarga de la gestión técnica y operativa.",
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
