import { useEffect, useState } from "react";
import { Img } from "../../types/img";

const Thumnails = ({ list }: { list: Img[] }) => {
  const [showImg, setShowImg] = useState("");
  const handleImg = (url: string) => {
    setShowImg(() => url);
  };

  useEffect(() => {
    if (list && list[0].imageUrl) {
      setShowImg(list[0].imageUrl);
    }
  }, [list]);

  return (
    <>
      <div className="flex flex-col gap-[16px] items-center">
        <img
          src={showImg}
          className="w-[434px] h-[239px] rounded-[40px] object-cover 
          max-xsm:max-w-[342px] max-xsm:max-h-[217] max-xsm:w-full max-xsm:rounded-[20px]"
          alt="여행지 이미지"
        />
        <div className="flex gap-[9px] flex-wrap max-xsm:mx-[16px] max-xsm:gap-[6px] max-xsm:max-w-[340px] w-[436px]">
          {list.map((item, idx) => (
            <button key={idx}>
              <img
                src={item.imageUrl ? item.imageUrl : ""}
                alt="여행지 이미지"
                className="w-[80px] h-[54px] rounded-[13px] object-cover max-xsm:w-[63px] max-xsm:h-[43px] max-xsm:rounded-[8px]"
                onClick={() => handleImg(item.imageUrl ? item.imageUrl : "")}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Thumnails;
