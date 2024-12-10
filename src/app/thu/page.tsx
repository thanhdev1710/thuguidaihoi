"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  // Khai báo state để lưu thông tin từ sessionStorage
  const [anh, setAnh] = useState<string | null>(null);
  const [chucVu, setChucVu] = useState<string | null>(null);
  const [longText, setLongText] = useState<string | null>(null);
  const [ten, setTen] = useState<string | null>(null);
  const [xungHo, setXungHo] = useState<string | null>(null);

  useEffect(() => {
    // Lấy thông tin từ sessionStorage khi trang được tải
    const storedAnh = sessionStorage.getItem("anh");
    const storedChucVu = sessionStorage.getItem("chucVu");
    const storedLongText = sessionStorage.getItem("longText");
    const storedTen = sessionStorage.getItem("ten");
    const storedXungHo = sessionStorage.getItem("xungHo");

    // Kiểm tra xem dữ liệu có tồn tại không
    if (
      storedAnh &&
      storedChucVu &&
      storedLongText &&
      storedTen &&
      storedXungHo
    ) {
      setAnh(storedAnh);
      setChucVu(storedChucVu);
      setLongText(storedLongText);
      setTen(storedTen);
      setXungHo(storedXungHo);
    } else {
      // Nếu có bất kỳ giá trị nào thiếu, điều hướng về trang chủ
      router.replace("/");
    }
  }, [router]);

  // Nếu thông tin chưa được tải, có thể hiển thị loading hoặc trả về trang chủ
  if (!anh || !chucVu || !longText || !ten || !xungHo) {
    return null; // Hoặc có thể hiển thị một thông báo loading
  }

  return (
    <>
      <div className="bg-white md:size-[clamp(180px,24vw,260px)] rounded-full absolute md:top-[42%] md:left-[16%] border-4 border-blue-600 size-[clamp(160px,50vw,240px)] top-[20%] max-md:left-1/2 max-md:-translate-x-1/2">
        <div className="w-full h-full border-4 border-blue-400 rounded-full overflow-hidden relative">
          <Image
            width={300}
            height={300}
            src={anh}
            alt="Uploaded"
            className="w-full h-full object-cover absolute z-0"
          />
        </div>
      </div>

      <div className="absolute md:right-[6%] md:top-[36%] pacifico max-md:left-1/2 max-md:-translate-x-1/2 top-[48%] bg-white border-4 border-blue-600 rounded-3xl shadow w-[80%] h-[360px] md:w-1/2 border p-6 flex flex-col justify-between">
        <p className="capitalize">{longText}</p>
        <div className="flex flex-col gap-1 items-end text-orange-600">
          <p className="flex gap-3 items-end ">
            <span className="text-sm">{xungHo}</span>
            <span className="text-xl font-bold">
              {ten
                .split(" ")
                .map((s) => s[0].toUpperCase() + s.slice(1))
                .join(" ")}
            </span>
          </p>
          <p className="text-sm">{chucVu}</p>
        </div>
      </div>
    </>
  );
}
