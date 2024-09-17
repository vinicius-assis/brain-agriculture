import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StoreProvider from "./StoreProvider";
import ConfirmRemoveModal from "./components/ConfirmRemoveModal";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brain Agriculture",
  description: "Designed and developed by Vinicius Assis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={montserrat.className}>
      <body className="bg-off-white">
        <StoreProvider>
          <Navbar />
          <ConfirmRemoveModal />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
