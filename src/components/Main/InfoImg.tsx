import { COUNTRY_INFO_IMG_DATA } from "../../constants/mapdata";

const InfoImg = ({
  showImg,
  viewSizeState,
}: {
  showImg: string | null;
  viewSizeState: string;
}) => {
  return (
    <img
      src={
        viewSizeState === "web"
          ? COUNTRY_INFO_IMG_DATA[showImg as keyof typeof COUNTRY_INFO_IMG_DATA]
              ?.web
          : COUNTRY_INFO_IMG_DATA[showImg as keyof typeof COUNTRY_INFO_IMG_DATA]
              ?.mobile
      }
      alt="country info"
      className={`absolute z-20 bottom-[1%] right-[18%] max-xsm:bottom-0 max-xsm:right-[0%] ${
        showImg === null ? "hidden" : "block"
      }`}
    />
  );
};
export default InfoImg;
