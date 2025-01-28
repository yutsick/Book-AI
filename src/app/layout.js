import { Inter, Poppins, Roboto, Anton } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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

const antonFont = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  title: "Book Tailor",
  description: "An AI-powered platform designed to help users effortlessly create personalized, full-length books.",
  
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${robotoFont.variable} ${poppinsFont.variable} ${antonFont.variable}`}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
