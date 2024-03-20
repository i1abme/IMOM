import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import useGetBanners from "../../queries/imgs/useGetBanners";

const Banner = () => {
  const { data, isPending, isError, error } = useGetBanners();
  console.log(data);

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
    <div className="w-full max-w-[1280px] h-[400px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        // style={{
        //   "--swiper-pagination-color": "#fff",
        // }}
        // tailwind에서는 사용 불가, css로 사용가능
      >
        {data.map((item) => (
          <SwiperSlide
            className={`overflow-hiddenw w-full h-[400px] bg-cover bg-no-repeat`}
            key={item.imageUrl}
            data-imageurl={item.imageUrl}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;
