import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "../context/FormContext";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Pacifico } from "next/font/google";

export const metadata: Metadata = {
  title:
    "Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh",
  description:
    "Chuyên trang thư gửi Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh lần thứ IX, nhiệm kỳ 2024 – 2029",
  keywords:
    "Đại hội Đại biểu, Hội Liên hiệp Thanh niên, Thành phố Hồ Chí Minh, thư gửi, đại biểu thanh niên, nhiệm kỳ 2024-2029, Đại hội IX, sự kiện thanh niên, Việt Nam, hội nghị thanh niên",
  icons: {
    apple: "/images/icon.webp",
    icon: [
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    url: "https://thuguidaihoi.vercel.app/",
    type: "website",
    title:
      "Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh",
    description:
      "Chuyên trang thư gửi Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh lần thứ IX, nhiệm kỳ 2024 – 2029",
    images: [
      {
        url: "https://i.ibb.co/Pgxy998/card.webp",
        width: 1200,
        height: 630,
        alt: "Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh",
    description:
      "Chuyên trang thư gửi Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh lần thứ IX, nhiệm kỳ 2024 – 2029",
    images: [
      {
        url: "https://i.ibb.co/Pgxy998/card.webp",
        width: 1200,
        height: 630,
        alt: "Đại hội Đại biểu Hội Liên hiệp Thanh niên Việt Nam - Thành phố Hồ Chí Minh",
      },
    ],
  },
};

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${pacifico.variable}`}>
        <FormProvider>
          <main className="relative w-full h-[860px] max-md:h-[1300px]">
            <Image
              src="/images/bg.webp"
              alt="Ảnh nền"
              fill
              className="absolute w-full h-full"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/topleft.webp"
              width={300}
              height={300}
              className="absolute top-0 left-0 w-[18vw] h-auto"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/topright.webp"
              width={300}
              height={300}
              className="absolute top-0 right-0 w-[18vw] h-auto"
            />
            <Image
              alt="Ảnh thư gửi"
              src="/images/thugui.webp"
              width={400}
              height={400}
              className="absolute md:top-[16%] md:left-[16%] md:w-[20vw] w-[clamp(160px,40vw,200px)] left-[10%] top-[40%] h-auto"
            />
            <Image
              alt="Ảnh thư gửi"
              src="/images/chaomung.webp"
              width={400}
              height={400}
              className="absolute md:top-[12%] md:right-[12%] md:w-[43vw] top-2 max-md:left-1/2 max-md:-translate-x-1/2 w-[70%] h-auto"
            />

            {children}

            <Image
              alt="Ảnh phụ"
              src="/images/bottomleft.webp"
              width={300}
              height={300}
              className="absolute bottom-0 left-0 w-[29vw] h-auto"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/bottomright.webp"
              width={300}
              height={300}
              className="absolute bottom-0 right-0 w-[29vw] h-auto"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/bottomline.webp"
              width={900}
              height={900}
              className="absolute bottom-0 left-0 w-full"
            />
          </main>
        </FormProvider>
        <Toaster />
      </body>
    </html>
  );
}
