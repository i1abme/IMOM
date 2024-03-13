const CategoryBtns = ({
  category,
  handleClick,
  active,
}: {
  category: {
    label: string;
    sectionId: string;
  }[];
  handleClick: (id: string) => void;
  active: string;
}) => {
  return (
    <div
      className="flex justify-between border-main-color border-[1px] rounded-[20px] 
      w-[765px] h-[56px] px-[25px] py-[21px] text-[14px] text-main-color items-center"
    >
      {category.map((item) => (
        <button
          key={item.sectionId}
          id={item.sectionId}
          className={`${
            active === item.sectionId
              ? "font-bold text-main-color"
              : "text-sub-black opacity-[0.3]"
          }`}
          onClick={() => handleClick(item.sectionId)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
export default CategoryBtns;
