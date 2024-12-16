"use client";
import { useFormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function FormSubmit() {
  const router = useRouter();
  const {
    setChucVu,
    setLongText,
    setTen,
    // setXungHo,
    chucVu,
    longText,
    ten,
    // xungHo,
    anh,
  } = useFormContext();

  const [charCount, setCharCount] = useState(longText.length); // Đồng bộ ký tự ban đầu

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Cập nhật các state tương ứng
    switch (name) {
      case "ten":
        if (value.length <= 50) {
          setTen(value);
        }
        break;
      // case "xungHo":
      //   if (value.length <= 50) {
      //     setXungHo(value);
      //   }
      //   break;
      case "chucVu":
        if (value.length <= 50) {
          setChucVu(value);
        }
        break;
      case "longText":
        if (value.length <= 500) {
          setLongText(value);
          setCharCount(value.length); // Cập nhật số ký tự
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Biến để lưu thông báo lỗi
    let errorMessage = "";

    // Kiểm tra nếu các trường không được điền đầy đủ
    if (!ten) {
      errorMessage += "Tên là bắt buộc.\n";
    }
    // if (!xungHo) {
    //   errorMessage += "Xưng hô là bắt buộc.\n";
    // }
    if (!chucVu) {
      errorMessage += "Chức vụ là bắt buộc.\n";
    }
    if (!longText) {
      errorMessage += "Nội dung là bắt buộc.\n";
    }
    if (!anh) {
      errorMessage += "Ảnh là bắt buộc.\n";
    }

    // Nếu có lỗi, hiển thị thông báo lỗi và dừng việc submit
    if (errorMessage) {
      toast.error(errorMessage); // Hiển thị thông báo lỗi với react-hot-toast
      return;
    }

    // Lưu các giá trị vào sessionStorage
    sessionStorage.setItem("ten", ten);
    // sessionStorage.setItem("xungHo", xungHo);
    sessionStorage.setItem("chucVu", chucVu);
    sessionStorage.setItem("longText", longText);
    const data = JSON.stringify(anh);
    if (data.length < 5 * 1024 * 1024) {
      // kiểm tra xem dữ liệu có dưới 5MB không
      sessionStorage.setItem("anh", anh!);

      router.push(`/thu`);
    } else {
      toast.error("Ảnh quá lớn vui lòng chọn ảnh nhỏ hơn");
    }
  };

  return (
    <div className="absolute md:right-[6%] md:top-[36%] z-30 max-md:left-1/2 max-md:-translate-x-1/2 top-[42%] bg-white p-4 rounded shadow w-[80%] md:w-1/2 border">
      <form onSubmit={handleSubmit}>
        {/* Tên */}
        <div className="mb-3">
          <label htmlFor="ten" className="block text-sm font-medium mb-1">
            Tên
          </label>
          <input
            type="text"
            id="ten"
            name="ten"
            placeholder="Nhập tên"
            required
            value={ten}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 focus:ring focus:ring-red-300"
          />
        </div>

        {/* Xưng hô */}
        {/* <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Xưng hô</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="anh"
                name="xungHo"
                value="Anh"
                checked={xungHo === "Anh"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Anh
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="chi"
                name="xungHo"
                value="Chị"
                checked={xungHo === "Chị"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Chị
            </label>
          </div>
        </div> */}

        {/* Chức vụ */}
        <div className="mb-3">
          <label htmlFor="chucVu" className="block text-sm font-medium mb-1">
            Chức vụ
          </label>
          <input
            type="text"
            id="chucVu"
            name="chucVu"
            placeholder="Chức vụ"
            required
            value={chucVu}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 focus:ring focus:ring-red-300"
          />
        </div>

        {/* Nội dung */}
        <div className="mb-3">
          <label htmlFor="longText" className="block text-sm font-medium mb-1">
            Nội dung
          </label>
          <textarea
            id="longText"
            name="longText"
            rows={4}
            placeholder="Nội dung"
            required
            value={longText}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 focus:ring focus:ring-red-300"
          />
          <small className="text-gray-500 text-sm">{charCount}/500 kí tự</small>
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
        >
          Xem trước
        </button>
      </form>
    </div>
  );
}
