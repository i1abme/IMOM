import MapImg from "../../../public/map.png";
const Map = () => {
  return (
    <div
      className="w-[850px] h-[425px] bg-main-color rounded-[40px] bg-center bg-cover border border-sub-gray border-opacity-[0.2] "
      style={{
        backgroundImage: `url(${MapImg})`,
      }}
    ></div>
  );
};
export default Map;
