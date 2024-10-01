import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";

import { Container, Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Lee Donson",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme>
          <Navbar />
          <main>
            <Container>{children}</Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
