import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { CategoryBtn } from "../../types/category";
const MbCategoryBtns = ({
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
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      className="overflow-hidden bg-transparent max-w-[355px] h-fit w-full ml-[16px]"
    >
      <div
        className={`${
          divStyle && divStyle
        } flex  border-main-color border-[1px] rounded-[20px] text-main-color items-center 
        border-none justify-start gap-[8px] w-full self-start
      `}
      >
        {category.map((item) => (
          <SwiperSlide
            key={item.sectionId}
            id={item.sectionId}
            className={`${btnStyle && btnStyle} ${
              active === item.sectionId
                ? "font-bold text-white bg-main-color"
                : "font-light text-[#606060] border-[0.5px] border-main-color"
            } text-[10px] tracking-[-0.5px]rounded-[8px] shrink-0 text-center items-center
              w-[100px] h-[29px] justify-center flex rounded-[8px]`}
            onClick={() => handleClick(item.sectionId)}
          >
            <span>{item.label}</span>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};
export default MbCategoryBtns;
