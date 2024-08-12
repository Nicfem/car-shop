import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles";
import clsx from "clsx";
import { HeaderWidget } from "@/widgets/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-white")}>
        <HeaderWidget />
        <main className="container mx-auto px-20 mt-6">{children}</main>
      </body>
    </html>
  );
};
