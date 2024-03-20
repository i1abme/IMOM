import { useNavigate } from "react-router-dom";

interface ButtonProps {
  label: string;
  loc: string;
}

const Button = ({ label, loc }: ButtonProps) => {
  const navigation = useNavigate();
  return (
    <button
      className="absolute backBtn text-main-color font-bold"
      onClick={() => navigation(`/${loc}`)}
    >{`< ${label}`}</button>
  );
};
export default Button;
