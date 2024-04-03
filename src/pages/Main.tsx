import Banner from "../components/Main/Banner";
import BlogBox from "../components/Main/BlogBox";
import FilterBox from "../components/Main/FilterBox";
import Map from "../components/Main/Map";
import SectionTitle from "../components/common/SectionTitle";

const Main = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center gap-[48px] max-xsm:gap-0">
      <Banner />
      <section
        className="flex items-center max-w-[850px] w-full gap-[24px] flex-col 
      max-xsm:max-w-[375px] max-xsm:gap-[8px] max-xsm:px-[16px] max-xsm:mt-[48px]"
      >
        <SectionTitle title={"어디로 가볼까요?"} />
        <Map />
      </section>
      <section
        className="flex items-center max-w-[850px] w-full gap-[8px] flex-col 
      max-xsm:max-w-[375px] max-xsm:px-[16px] max-xsm:mb-[48px]"
      >
        <SectionTitle title={"어떤 여행을 희망하세요?"} />
        <FilterBox />
      </section>
      <section
        className="flex items-center max-w-[850px] w-full gap-[20px] flex-col 
      max-xsm:max-w-[375px] max-xsm:gap-[8px] max-xsm:pl-[20px] "
      >
        <SectionTitle title={"여행박사의 mom편한 여행 꿀팁"} />
        <BlogBox />
      </section>
    </div>
  );
};

export default Main;
