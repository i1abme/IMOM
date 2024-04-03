import MapPin from "/public/map_pin.svg";
import { COUNTRY_IMG_DATA, COUNTRY_NAME } from "../../constants/mapdata";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";

const CountryImgs = ({
  handleMouseOver,
  handleMouseOut,
  country,
  labelStyle,
  signatureStyle,
  containerStyle,
  islabelFirst,
  showImg,
}: {
  handleMouseOver: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseOut: () => void;
  country: string;
  labelStyle?: string;
  signatureStyle?: string;
  containerStyle?: string;
  islabelFirst?: boolean;
  showImg: string | null;
}) => {
  const viewSizeState = useRecoilValue(viewSize);
  const navigate = useNavigate();
  const [mbLabelWidth, setMbLabelWidth] = useState(0);
  const [mbSignatureWidth, setMbSignatureWidth] = useState(0);

  useEffect(() => {
    const labelImg = new Image();
    labelImg.onload = () => {
      setMbLabelWidth(labelImg.width * 0.7); // label 이미지의 모바일너비 저장
    };
    labelImg.src =
      COUNTRY_IMG_DATA[country as keyof typeof COUNTRY_IMG_DATA].label;
    const signatureImg = new Image();
    signatureImg.onload = () => {
      setMbSignatureWidth(signatureImg.width * 0.7); // signature 이미지의 모바일너비 저장
    };
    signatureImg.src =
      COUNTRY_IMG_DATA[country as keyof typeof COUNTRY_IMG_DATA].signature;
  }, [country]);

  const handleCountryClick = () => {
    navigate(
      `/travelproduct/${COUNTRY_NAME[country as keyof typeof COUNTRY_NAME]}`
    );
  };
  return (
    <>
      <div
        className={`${containerStyle} flex items-center gap-[2px] absolute z-10 cursor-pointer p-[4px] select-none`}
        aria-label={country}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleCountryClick}
      >
        {islabelFirst && (
          <img
            src={
              COUNTRY_IMG_DATA[country as keyof typeof COUNTRY_IMG_DATA].label
            }
            alt={`${country}Label`}
            className={`${labelStyle} select-none`}
            style={{
              width: viewSizeState === "mobile" ? `${mbLabelWidth}px` : "auto",
            }}
          />
        )}
        <img
          src={MapPin}
          alt={`${country} map pin`}
          className="max-xsm:w-[8px] select-none"
        />
        {!islabelFirst && (
          <img
            src={
              COUNTRY_IMG_DATA[country as keyof typeof COUNTRY_IMG_DATA].label
            }
            alt={`${country}Label`}
            className={`${labelStyle} select-none`}
            style={{
              width: viewSizeState === "mobile" ? `${mbLabelWidth}px` : "auto",
            }}
          />
        )}
      </div>
      <img
        src={
          COUNTRY_IMG_DATA[country as keyof typeof COUNTRY_IMG_DATA].signature
        }
        alt={`${country}Signature`}
        className={`absolute ${signatureStyle} ${
          showImg !== country && "hidden"
        } select-none`}
        style={{
          width: viewSizeState === "mobile" ? `${mbSignatureWidth}px` : "auto",
        }}
      />
    </>
  );
};
export default CountryImgs;
