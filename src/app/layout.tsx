import "./globals.css";
import type { Metadata } from "next";
import {
  inter as inter,
  openSans as openSans,
  nunitoSans as nunitoSans,
  roboto as roboto,
  permanentMarker as permanentMarker,
  croissantOne as croissantOne,
} from "./fonts";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Bruadarach",
  description:
    "A full-stack website built with Next.js and MongoDB and offering functionalities such as OAuth authentication, CRUD operations, image upload, theme toggle, and responsive design.",
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
              <Analytics />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
