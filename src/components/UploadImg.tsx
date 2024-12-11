"use client";

import { useFormContext } from "@/context/FormContext";
import Image from "next/image";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function UploadImg() {
  const { anh: image, setAnh: setImage } = useFormContext();
  const refEditor = useRef<AvatarEditor | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái hiển thị editor
  const [scale, setScale] = useState(1.0); // Trạng thái scale ảnh

  // Xử lý khi người dùng chọn ảnh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (refEditor.current) {
      const canvas = refEditor.current.getImageScaledToCanvas(); // Lấy canvas đã cắt
      const croppedImage = canvas.toDataURL(); // Chuyển ảnh cắt thành base64
      setImage(croppedImage); // Lưu ảnh đã cắt
      setIsEditing(false); // Đóng editor
    }
  };

  // Hàm điều chỉnh zoom
  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value)); // Cập nhật mức độ scale
  };

  return (
    <>
      <div className="bg-white md:size-[clamp(180px,24vw,260px)] rounded-full absolute md:top-[42%] md:left-[16%] border-4 border-blue-600 size-[clamp(160px,50vw,240px)] top-[20%] max-md:left-1/2 max-md:-translate-x-1/2">
        <div className="w-full h-full border-4 border-blue-400 rounded-full overflow-hidden relative">
          <Image
            width={300}
            height={300}
            src={image || "/images/upload.webp"}
            alt="Uploaded"
            className={
              image
                ? "w-full h-full object-cover absolute z-0"
                : "w-1/2 h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }
          />

          <label
            htmlFor="upload"
            className="flex flex-col items-center w-full h-full cursor-pointer justify-center absolute z-10 transition-all duration-500 hover:bg-black/20"
          >
            <input
              required
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
      {isEditing && (
        <>
          <div className="absolute w-[80%] z-[80] top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-4 rounded-lg shadow-lg">
            <AvatarEditor
              ref={refEditor}
              image={image!}
              width={360}
              height={360}
              border={50}
              borderRadius={300}
              scale={scale} // Đặt scale tùy theo giá trị
              className="mx-auto"
            />
            <div className="mt-4 flex flex-col items-center gap-4">
              <div>
                <label htmlFor="zoom" className="text-sm">
                  Zoom
                </label>
                <input
                  id="zoom"
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-red-700 text-wrap">
                Nếu ảnh đã đúng vị trí, hãy nhấn &apos;Hủy&apos; để giữ nguyên
                ảnh rõ nét. Nếu cắt ảnh, chất lượng ảnh có thể bị giảm.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Huỷ
                </button>
                <button
                  onClick={handleCrop}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Cắt
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsEditing(false)}
            className="absolute top-0 left-0 h-full w-full bg-black/70 z-[60]"
          ></div>
        </>
      )}
    </>
  );
}
