import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "../context/FormContext";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Pacifico } from "next/font/google";

export const metadata: Metadata = {
  title:
    "Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
  description:
    "Chuyên trang Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
  keywords:
    "Đại hội Đại biểu, Đảng bộ phường Hiệp Tân, nhiệm kỳ 2025-2030, Đại hội XV, sự kiện Đảng bộ, Việt Nam, hội nghị Đảng bộ",
  icons: {
    apple: "/images/icon.png",
  },
  openGraph: {
    url: "https://thuguidaihoidangbophuonghieptannhiemky2025-2030.vercel.app/",
    type: "website",
    title:
      "Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
    description:
      "Chuyên trang Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
    images: [
      {
        url: "https://i.ibb.co/FKmCwsd/28-C25688-E51-D-4409-9-F1-B-B66691805439.jpg",
        width: 1200,
        height: 630,
        alt: "Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
    description:
      "Chuyên trang Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
    images: [
      {
        url: "https://i.ibb.co/FKmCwsd/28-C25688-E51-D-4409-9-F1-B-B66691805439.jpg",
        width: 1200,
        height: 630,
        alt: "Đại hội Đại biểu Đảng bộ phường Hiệp Tân lần thứ XV, nhiệm kỳ 2025-2030",
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
          <main className="relative w-full text-black min-h-svh h-[900px] max-md:h-[1100px] overflow-hidden">
            <Image
              src="/images/bg.avif"
              alt="Ảnh nền"
              fill
              priority
              className="absolute w-full h-full  object-cover"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/topleft.avif"
              width={300}
              height={300}
              priority
              className="absolute top-0 left-0 w-[clamp(80px,10vw,200px)] h-auto"
            />
            <Image
              alt="Ảnh phụ"
              src="/images/topleft.avif"
              width={300}
              height={300}
              priority
              className="absolute top-0 right-0 w-[clamp(80px,10vw,200px)] h-auto scale-x-[-1]"
            />
            <Image
              alt="Ảnh thư gửi"
              src="/images/thugui.avif"
              width={400}
              height={400}
              priority
              className="absolute md:top-[16%] md:left-[16%] md:w-[23vw] w-[clamp(160px,46vw,200px)] left-[10%] top-[34%] h-auto"
            />
            <Image
              alt="Ảnh thư gửi"
              src="/images/chaomung.avif"
              width={600}
              height={600}
              priority
              className="absolute md:top-[12%] md:right-[12%] md:w-[46vw] top-6 max-md:left-1/2 max-md:-translate-x-1/2 w-[clamp(240px,80%,460px)] h-auto"
            />

            {children}
            <Image
              alt="Ảnh phụ"
              src="/images/bottomline.avif"
              width={1800}
              height={600}
              priority
              className="absolute bottom-0 left-0 w-full min-h-[300px] max-h-[500px] object-fill"
            />
          </main>
        </FormProvider>
        <Toaster />
      </body>
    </html>
  );
}
