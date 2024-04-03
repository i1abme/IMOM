const OrderDetailBtn = ({
  label,
  handleClick,
  style,
  role,
}: {
  label: string;
  style?: string;
  handleClick: (role?: string) => void;
  role?: string;
}) => {
  const handleBtnClick = () => {
    role ? handleClick(role) : handleClick();
  };

  return (
    <button
      className={`${
        style ? style : "py-[2px] px-[12px] text-[12px]"
      } flex border border-[#707070] bg-sub-black bg-opacity-[0.05] shrink-0`}
      onClick={handleBtnClick}
    >
      {label}
    </button>
  );
};
export default OrderDetailBtn;
