import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./BlogBox.css";
import useGetMainPosts from "../../queries/posts/useGetMainPosts";

const BlogBox = () => {
  const { data, isPending, isError, error } = useGetMainPosts();

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
      slidesPerView={4}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="overflow-hidden w-[850px] px-[20px] py-[16px] h-[196px] bg-[#F5F5F5]"
    >
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.title}>
              <SwiperSlide className=" bg-white border-sub-gray border-[1px]">
                <a
                  href={item.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex justify-center items-center border-b-[1px] border-sub-gray h-[56px] p-[10px] overflow-hidden">
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
