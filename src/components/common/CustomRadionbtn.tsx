import { travelerInfo } from "../../types/reservation";
import "../Reservation/TravelerInfoForm.css";

const CustomRadioBtn = ({
  label,
  id,
  handleInput,
  checked,
  disabled,
  animation,
  role,
}: {
  label: string;
  id: string;
  handleInput: (id: keyof travelerInfo, value: string) => void;
  checked: boolean;
  disabled?: boolean;
  animation?: boolean;
  role?: string;
}) => {
  return (
    <div
      className={`flex items-center  ${
        disabled ? "cursor-default" : "cursor-pointer"
      }${animation && role === "대표1인" ? "animate" : ""}`}
      onClick={
        !disabled
          ? () => handleInput(id as keyof travelerInfo, label)
          : undefined
      }
    >
      <div
        className={`border-[1px] border-sub-black rounded-[9999px] 
                w-[13px] h-[13px] flex justify-center items-center
                 ${
                   checked && "border-[#007aff]"
                 } max-xsm:w-[10px] max-xsm:h-[10px]`}
      >
        {checked && (
          <div className="rounded-[9999px] w-[8px] h-[8px] bg-[#007aff] max-xsm:w-[6px] max-xsm:h-[6px]" />
        )}
      </div>
      <span className={`pl-[5px] max-xsm:text-[10px]`}>{label}</span>
    </div>
  );
};
export default CustomRadioBtn;
