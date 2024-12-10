"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FormContextType {
  anh: string | null;
  setAnh: Dispatch<SetStateAction<string | null>>;
  xungHo: string;
  setXungHo: Dispatch<SetStateAction<string>>;
  ten: string;
  setTen: Dispatch<SetStateAction<string>>;
  chucVu: string;
  setChucVu: Dispatch<SetStateAction<string>>;
  longText: string;
  setLongText: Dispatch<SetStateAction<string>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [anh, setAnh] = useState<string | null>(null);
  const [xungHo, setXungHo] = useState<string>("Anh");
  const [ten, setTen] = useState<string>("");
  const [chucVu, setChucVu] = useState<string>("");
  const [longText, setLongText] = useState<string>("");

  return (
    <FormContext.Provider
      value={{
        anh,
        setAnh,
        xungHo,
        setXungHo,
        ten,
        setTen,
        chucVu,
        setChucVu,
        longText,
        setLongText,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
