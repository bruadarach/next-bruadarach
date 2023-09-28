import {
  Inter,
  Open_Sans,
  Nunito_Sans,
  Roboto,
  Permanent_Marker,
  Croissant_One,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900", "1000"],
  variable: "--font-nunito-sans",
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-permanent-marker",
});

export const croissantOne = Croissant_One({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-croissant-one",
});
