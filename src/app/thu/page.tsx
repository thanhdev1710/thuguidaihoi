"use client";
import html2canvas from "html2canvas-pro";
import { Camera, Laptop, Tablet, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isCamera, setIsCamera] = useState(false);
  const cameraRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm state để quản lý trạng thái loading
  // Khai báo state để lưu thông tin từ sessionStorage
  const [anh, setAnh] = useState<string | null>(null);
  const [chucVu, setChucVu] = useState<string | null>(null);
  const [longText, setLongText] = useState<string | null>(null);
  const [ten, setTen] = useState<string | null>(null);
  const [xungHo, setXungHo] = useState<string | null>(null);

  const handleCapture = async (width: number, height: number, name: string) => {
    setIsLoading(true); // Bật trạng thái loading

    if (cameraRef.current) {
      cameraRef.current.style.opacity = "0";
    }

    const originalWidth = window.innerWidth; // Lưu lại chiều rộng ban đầu của cửa sổ
    const originalHeight = window.innerHeight; // Lưu lại chiều cao ban đầu của cửa sổ
    const originalBodyWidth = document.body.style.width; // Lưu lại chiều rộng ban đầu của body
    const originalBodyHeight = document.body.style.height; // Lưu lại chiều cao ban đầu của body

    try {
      document.body.style.width = `${width}px`;
      document.body.style.height = `${height}px`;
      window.innerWidth = width;
      window.innerHeight = height;

      const canvas = await html2canvas(document.body, {
        scrollY: 0,
        useCORS: true,
        width,
        height,
      });

      const image = canvas.toDataURL("image/png");

      handleScreenShoot(image, name);
    } catch (error) {
      console.error("Chụp màn hình thất bại:", error);
    } finally {
      if (cameraRef.current) {
        cameraRef.current.style.opacity = "1";
      }
      document.body.style.width = originalBodyWidth;
      document.body.style.height = originalBodyHeight;
      window.innerWidth = originalWidth;
      window.innerHeight = originalHeight;

      setIsLoading(false); // Tắt trạng thái loading
      setIsCamera(false);
    }
  };

  const handleScreenShoot = (image: string, name: string) => {
    // Tạo Blob từ data URL
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: "image/png" });

    // Tạo một URL cho Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

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
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-red-600 border-t-4 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white md:size-[clamp(180px,24vw,260px)] rounded-full absolute md:top-[42%] md:left-[16%] border-4 border-red-600 size-[clamp(160px,50vw,240px)] top-[12%] max-md:left-1/2 max-md:-translate-x-1/2">
        <div className="w-full h-full border-4 border-red-400 rounded-full overflow-hidden relative">
          <Image
            width={300}
            height={300}
            src={anh}
            alt="Uploaded"
            className="w-full h-full object-cover absolute z-0"
          />
        </div>
      </div>

      <div className="absolute md:right-[6%] md:top-[36%] pacifico max-md:left-1/2 max-md:-translate-x-1/2 top-[42%] bg-white border-4 border-red-600 rounded-3xl shadow w-[80%] h-[360px] md:w-1/2 p-6 flex flex-col justify-between">
        <p className="capitalize">{longText}</p>
        <div className="flex items-center justify-between">
          <div ref={cameraRef}>
            {isCamera ? (
              <div className="flex flex-col items-start justify-start gap-2">
                <h3 className="font-sans font-bold">Chọn thiết bị chụp ảnh</h3>
                <div className="flex gap-2 flex-row-reverse">
                  <button
                    onClick={async () => {
                      await handleCapture(1100, 800, "desktop.png");
                    }}
                    className="rounded-full size-10 border flex items-center justify-center transition-all bg-red-400 duration-500 shadow hover:scale-110 hover:bg-red-600 text-white"
                  >
                    <Laptop />
                  </button>
                  <button
                    onClick={async () => {
                      await handleCapture(600, 1100, "mobile.png");
                    }}
                    className="rounded-full size-10 border flex items-center justify-center transition-all bg-orange-400 duration-500 shadow hover:scale-110 hover:bg-orange-600 text-white"
                  >
                    <Tablet />
                  </button>
                  <button
                    onClick={() => {
                      setIsCamera(false);
                    }}
                    className="rounded-full size-10 border flex items-center justify-center transition-all duration-500 shadow hover:scale-110 hover:bg-black hover:text-white"
                  >
                    <X />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsCamera(true);
                }}
                className="rounded-full size-10 border flex items-center justify-center transition-all duration-500 shadow hover:scale-110 hover:bg-black hover:text-white"
              >
                <Camera />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 text-orange-600">
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
      </div>
    </>
  );
}
