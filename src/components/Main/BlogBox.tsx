import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";
import "./BlogBox.css";
import useGetMainPosts from "../../queries/posts/useGetMainPosts";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";

const BlogBox = () => {
  const { data, isPending, isError, error } = useGetMainPosts();
  const viewSizeState = useRecoilValue(viewSize);

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return (
    <Swiper
      slidesPerView={viewSizeState === "web" ? 4 : "auto"}
      spaceBetween={viewSizeState === "web" ? 30 : 13}
      navigation={viewSizeState === "web" ? true : false}
      freeMode={viewSizeState === "web" ? false : true}
      modules={[Navigation, FreeMode]}
      className="overflow-hidden w-[850px] px-[20px] py-[16px] h-[196px] bg-[#F5F5F5] 
      max-xsm:bg-transparent max-xsm:max-w-[355px] max-xsm:h-fit max-xsm:p-0 max-xsm:w-full"
    >
      {data && (
        <ul>
          {data.map((item, idx) => (
            <li key={item.title}>
              <SwiperSlide
                key={`${item.title}_${idx}`}
                className={`bg-white border-sub-gray border-[1px] 
                max-xsm:w-[150px] max-xsm:h-[150px] max-xsm:border-main-color max-xsm:rounded-[20px]`}
              >
                <a
                  href={item.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="flex justify-center items-center border-b-[1px] border-sub-gray h-[56px] p-[10px] overflow-hidden 
                  max-xsm:border-main-color max-xsm:mx-[8px] max-xsm:text-[12px]"
                  >
                    <h2 className="ellipsis2">{item.title}</h2>
                  </div>
                  <div className="flex flex-col p-[10px] items-center gap-[6px]">
                    {/* <p className="text-[10px] text-sub-gray ellipsis4">
                      {item.content}
                    </p> */}
                    <span className="self-end text-[11px]">
                      {item.createdDate && item.createdDate}
                    </span>
                  </div>
                </a>
              </SwiperSlide>
            </li>
          ))}
        </ul>
      )}
    </Swiper>
  );
};
export default BlogBox;
