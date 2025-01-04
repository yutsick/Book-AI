import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoFont = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "500", "700"],
});

const poppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Book Tailor",
  description: "An AI-powered platform designed to help users effortlessly create personalized, full-length books.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interFont.variable} ${robotoFont.variable} ${poppinsFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
