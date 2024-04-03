import { CategoryBtn } from "../../types/category";

const CategoryBtns = ({
  category,
  handleClick,
  active,
  divStyle,
  btnStyle,
}: {
  category: CategoryBtn[];
  handleClick: (id: string) => void;
  active: string;
  divStyle?: string;
  btnStyle?: string;
}) => {
  return (
    <div
      className={`${
        divStyle && divStyle
      } flex justify-between border-main-color border-[1px] rounded-[20px] 
      w-[765px] h-[56px] px-[25px] py-[21px] text-[14px] text-main-color items-center
      max-xsm:border-none max-xsm:justify-start max-xsm:gap-[8px] max-xsm:w-full max-xsm:p-0 
      max-xsm:px-[16px] max-xsm:h-fit
      `}
    >
      {category.map((item) => (
        <button
          key={item.sectionId}
          id={item.sectionId}
          className={`${btnStyle && btnStyle} ${
            active === item.sectionId
              ? "font-bold text-main-color max-xsm:font-bold max-xsm:text-white max-xsm:bg-main-color"
              : "text-sub-black text-opacity-[0.3] max-xsm:font-light max-xsm:text-[#606060] max-xsm:opacity-1 border-main-color max-xsm:border-[0.5px]"
          } max-xsm:text-[10px] max-xsm:tracking-[-0.5px] max-xsm:rounded-[8px]
          max-xsm:w-[100px] max-xsm:h-[29px]`}
          onClick={() => handleClick(item.sectionId)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
export default CategoryBtns;
