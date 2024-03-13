interface LoginInputProps {
  placeholder: string;
}

const LoginInput = ({ placeholder }: LoginInputProps) => {
  return (
    <input
      placeholder={placeholder}
      className="outline-none border font-medium border-main-color w-full text-sm rounded-full py-3 px-2 mb-[5px]"
    />
  );
};

export default LoginInput;
