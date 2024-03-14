import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
// import useGetBanners from "../../queries/imgs/useGetBanners";

const Banner = () => {
  // const { data, isPending, isError, error } = useGetBanners();
  // console.log(data);

  // if (isPending) {
  //   return <div>로딩 중...</div>;
  // }

  // if (isError) {
  //   return <div>에러 발생: {error?.message}</div>;
  // }
  // if (!data) {
  //   return <div>데이터가 없습니다.</div>;
  // }
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
        {/* {data.map((item) => (
          <SwiperSlide
            className={`overflow-hiddenw w-full h-[400px] bg-cover bg-no-repeat`}
            key={item.imageUrl}
            data-imageurl={item.imageUrl}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          ></SwiperSlide>
        ))} */}
        <SwiperSlide
          className={`overflow-hiddenw w-full h-[400px] bg-cover bg-no-repeat bg-center`}
          key={`item1`}
          data-imageurl={`https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={`overflow-hiddenw w-full h-[400px] bg-cover bg-no-repeat bg-center`}
          key={`item2`}
          data-imageurl={`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=4621&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=4621&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        ></SwiperSlide>
        <SwiperSlide
          className={`overflow-hiddenw w-full h-[400px] bg-cover bg-no-repeat bg-center`}
          key={`item3`}
          data-imageurl={
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=5064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=5064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        ></SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
