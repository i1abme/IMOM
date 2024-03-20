import IconAsk from "/public/icon_ask.svg";

const AskBtn = () => {
  return (
    <div
      className="h-[70px] w-[61.5px] fixed right-[12vw] bg-white float-right mt-[216px] z-50 bg-cover rounded-[12.2px]"
      style={{ backgroundImage: `url(${IconAsk})` }}
    ></div>
  );
};
export default AskBtn;
