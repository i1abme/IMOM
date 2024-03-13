import { useState } from "react";
import { Img } from "../../types/img";

const Thumnails = ({ list }: { list: Img[] }) => {
  // const [showImg, setShowImg] = useState(list[0].imageUrl);
  const [showImg, setShowImg] = useState(
    "https://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg"
  );
  const handleImg = (url: string) => {
    setShowImg(() => url);
  };
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <img
          src={showImg}
          className="w-[434px] h-[239px] rounded-[40px] object-cover "
        />

        <div className="flex gap-[9px]">
          {list.map((item, idx) => (
            <button key={idx}>
              <img
                src={
                  item.imageUrl
                    ? item.imageUrl
                    : "https://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg"
                }
                alt="여행지 이미지"
                className="w-[80px] h-[54px] rounded-[13px] object-cover"
                onClick={() =>
                  handleImg(
                    item.imageUrl
                      ? item.imageUrl
                      : "https://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg"
                  )
                }
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Thumnails;
