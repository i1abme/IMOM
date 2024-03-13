interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button className="absolute backBtn text-main-color font-bold">{`< ${label}`}</button>
  );
};
export default Button;
