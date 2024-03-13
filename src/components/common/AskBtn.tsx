import { Link } from "react-router-dom";

const AskBtn = () => {
  return (
    <div
      className="flex flex-col justify-center py-[8px] px-[12px] 
    h-[68px] border-[1px] border-main-color rounded-[15px]
    fixed right-[12vw] bg-white float-right mt-[216px] z-50"
    >
      <Link to={"./"}>
        <div>icon</div>
        <span className="text-[10px] text-main-color text-center">
          문의하기
        </span>
      </Link>
    </div>
  );
};
export default AskBtn;
