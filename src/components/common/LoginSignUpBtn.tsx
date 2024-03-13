interface LoginSignUpProps {
  label: string;
}

const LoginSignUpBtn = ({ label }: LoginSignUpProps) => {
  return (
    <button className="bg-main-color w-full rounded-full py-3 mt-5">
      <span className="text-white">{label}</span>
    </button>
  );
};

export default LoginSignUpBtn;
