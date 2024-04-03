import WorldMap from "/public/worldmap.svg";
import WorldMapMb from "/public/worldmap_mb.svg";
import { useState } from "react";
import CountryImgs from "./CountryImgs";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";
import { COUNTRY_INFO_IMG_DATA } from "../../constants/mapdata";

const Map = () => {
  const viewSizeState = useRecoilValue(viewSize);
  const [showImg, setShowImg] = useState<string | null>(null);
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const ariaLabel = event.currentTarget.getAttribute("aria-label");
    console.log("aria-label:", ariaLabel);
    setShowImg(() => ariaLabel);
  };
  const handleMouseOut = () => {
    setShowImg(null);
  };

  return (
    <div className="relative max-xsm:pb-[50px]">
      <div
        className="w-[850px] h-[425px] bg-[#FFE2B4] rounded-[40px] border border-dashed border-main-color
    max-xsm:max-w-[342px] max-xsm:h-[217px] flex justify-center items-center relative select-none"
      >
        <img
          src={viewSizeState === "web" ? WorldMap : WorldMapMb}
          alt="worldmap"
          className="pb-[28px] max-xsm:pb-0 select-none"
        />
        <CountryImgs
          showImg={showImg}
          country="australia"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[67%] right-[19.8%] max-xsm:top-[68%] max-xsm:right-[27%]"
          containerStyle="top-[68%] right-[17.5%] flex-col max-xsm:top-[70%] max-xsm:right-[22%]"
        />
        <CountryImgs
          showImg={showImg}
          country="easternEurope"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[16%] right-[28.5%] max-xsm:top-[2%] max-xsm:right-[42%]"
          containerStyle="top-[26.5%] right-[31%] max-xsm:top-[14%] max-xsm:right-[42%]"
        />
        <CountryImgs
          showImg={showImg}
          country="franswiss"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[19.5%] right-[40%] max-xsm:top-[9%] max-xsm:right-[60%]"
          containerStyle="top-[29.5%] right-[40%] max-xsm:top-[22%] max-xsm:right-[58%]"
        />
        <CountryImgs
          showImg={showImg}
          country="italy"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[35%] right-[38.3%] max-xsm:top-[29%] max-xsm:right-[54%]"
          containerStyle="top-[36.3%] right-[44.2%] flex-col max-xsm:top-[30%] max-xsm:right-[65%]"
        />
        <CountryImgs
          showImg={showImg}
          country="japan"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[32.3%] right-[10%] max-xsm:top-[23%] max-xsm:right-[10%]"
          containerStyle="top-[38.8%] right-[14%] max-xsm:top-[32%] max-xsm:right-[15%]"
        />
        <CountryImgs
          showImg={showImg}
          country="newzealand"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[64.5%] right-[2.5%] max-xsm:top-[59%] max-xsm:right-[3.5%]"
          containerStyle="top-[76.5%] right-[2.5%] max-xsm:top-[73%] max-xsm:right-[3.5%] max-xsm:flex-col"
          islabelFirst={!(viewSizeState === "web")}
        />
        <CountryImgs
          showImg={showImg}
          country="southeastAsia"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[49.3%] right-[13.3%] max-xsm:top-[43%] max-xsm:right-[15%]"
          containerStyle="top-[56%] right-[18%] max-xsm:top-[54%] max-xsm:right-[21%]"
        />
        <CountryImgs
          showImg={showImg}
          country="spain"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[26.5%] right-[59.2%] max-xsm:top-[10%] max-xsm:right-[80%]"
          containerStyle="top-[37.5%] right-[51.6%] max-xsm:top-[30%] max-xsm:right-[78%]"
          islabelFirst={true}
        />
        <CountryImgs
          showImg={showImg}
          country="taiwan"
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          signatureStyle="top-[32%] right-[24%] max-xsm:top-[25%] max-xsm:right-[35.5%]"
          containerStyle="top-[43.8%] right-[21.8%] max-xsm:top-[40%] max-xsm:right-[29.5%]"
          islabelFirst={true}
        />
      </div>
      {showImg !== null && (
        <img
          src={
            viewSizeState === "web"
              ? COUNTRY_INFO_IMG_DATA[
                  showImg as keyof typeof COUNTRY_INFO_IMG_DATA
                ]?.web
              : COUNTRY_INFO_IMG_DATA[
                  showImg as keyof typeof COUNTRY_INFO_IMG_DATA
                ]?.mobile
          }
          alt="country info"
          className="absolute z-20 bottom-[1%] right-[18%] max-xsm:bottom-0 max-xsm:right-[0%]"
        />
      )}
    </div>
  );
};
export default Map;
