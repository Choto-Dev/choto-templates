import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const fonts = {
  inter,
  geistSans,
  geistMono,
};

export type Fonts = typeof fonts;
export default fonts;
