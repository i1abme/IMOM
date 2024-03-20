import Banner from "../components/Main/Banner";
import BlogBox from "../components/Main/BlogBox";
import FilterBox from "../components/Main/FilterBox";
import Map from "../components/Main/Map";
import SectionTitle from "../components/Main/SectionTitle";

const Main = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center gap-[48px] py-[216px] ">
      <Banner />
      <section className="flex items-start w-[850px] gap-[24px] flex-col">
        <SectionTitle title={"어디로 가볼까요?"} />
        <Map />
      </section>
      <section className="flex items-start w-[850px] gap-[8px] flex-col">
        <SectionTitle title={"어떤 여행을 희망하세요?"} />
        <FilterBox />
      </section>
      <section className="flex items-start w-[850px] gap-[20px] flex-col">
        <SectionTitle title={"여행박사의 mom편한 여행 꿀팁"} />
        <BlogBox />
      </section>
    </div>
  );
};

export default Main;
