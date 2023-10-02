import "./globals.css";
import type { Metadata } from "next";
import {
  inter,
  openSans,
  nunitoSans,
  roboto,
  permanentMarker,
  croissantOne,
} from "./fonts";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Blog | Bruadarach",
  description: "Full Stack Blog App with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${openSans.variable} ${nunitoSans.variable} ${roboto.variable} ${permanentMarker.variable} ${croissantOne.variable}`}
      >
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
