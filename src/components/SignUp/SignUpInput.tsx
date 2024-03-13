import { ChangeEvent } from "react";
import { formatPhoneNum } from "../../hooks/formatPhoneNum";

interface SignUpInputProps {
  placeholder: string;
  title: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignUpInput = ({
  placeholder,
  title,
  onChange,
  name,
  value,
}: SignUpInputProps) => {
  return (
    <div className="flex justify-between w-full items-center pl-16 relative">
      <div>{title}</div>
      <input
        placeholder={placeholder}
        value={name === "phone" ? formatPhoneNum(value) : value}
        className="outline-none border font-medium border-main-color w-3/4 text-sm rounded-full py-3 pl-7 mb-[5px]"
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default SignUpInput;
