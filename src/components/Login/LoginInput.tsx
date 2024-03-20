interface LoginInputProps {
  placeholder: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  value: string;
}

const LoginInput = ({
  placeholder,
  setState,
  name,
  value,
}: LoginInputProps) => {
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "핸드폰번호") {
      const phoneValue = value.replace(/\D/g, "");
      if (phoneValue.length <= 3) {
        setState(phoneValue);
      } else if (phoneValue.length <= 7) {
        setState(`${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`);
      } else {
        setState(
          `${phoneValue.slice(0, 3)}-${phoneValue.slice(
            3,
            7
          )}-${phoneValue.slice(7, 11)}`
        );
      }
    } else {
      setState(value);
    }
  };
  return (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={handleLoginChange}
      className="outline-none border font-medium border-main-color w-full text-sm rounded-full py-3 px-2 mb-[5px]"
      type={name === "비밀번호" ? "password" : "text"}
    />
  );
};

export default LoginInput;
