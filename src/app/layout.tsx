// Updated: app/layout.tsx (Server Component: Removed "use client" and hooks; metadata works)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout"; // New client wrapper for interactive parts

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pak Al-Shifa Medical Center",
  description: "Dashboard App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
