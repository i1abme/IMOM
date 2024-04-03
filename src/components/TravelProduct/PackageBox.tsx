import { useState } from "react";
import ScheduleBtn from "./ScheduleBtn";
import PackageInfo from "../common/PackageInfo";
import { Package } from "../../types/package";
import ProductInfoList from "./ProductInfoList";
import { motion } from "framer-motion";
import { amountFormat } from "../../utils/amountFormat";

const PackageBox = ({ packageData }: { packageData: Package }) => {
  const [showSchedule, setShowSchedule] = useState(false);

  const handleScheduleBtn = () => {
    setShowSchedule((prev) => !prev);
  };

  return (
    <section
      className="flex flex-col justify-center items-center gap-[20px] w-[755px]
    max-xsm:max-w-[375px] max-xsm:w-full max-xsm:gap-0"
    >
      <h1 className="text-main-color text-[20px] max-xsm:text-[14px] max-xsm:mb-[10px] max-xsm:mx-[16px]">
        <strong>{packageData.country || packageData.countryName}</strong>
        지역에서 우리 아이와 mom편한 여행 어떠세요?
      </h1>
      <div
        className="w-[755px] h-[400px] rounded-[40px] overflow-hidden 
      max-xsm:max-w-[342px] max-xsm:max-h-[217px] max-xsm:rounded-[20px] max-xsm:w-full max-xsm:mb-[17px] max-xsm:mx-[16px]"
      >
        {packageData.thumbnailList && (
          <img
            src={packageData.thumbnailList[0]?.imageUrl}
            alt="여행지 이미지"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <PackageInfo
        country={packageData.country ?? packageData.countryName ?? ""}
        name={packageData.packageName}
        summary={packageData.summary}
        price={amountFormat(packageData.price)}
        hashTag={packageData.hashTag}
        page="travelproduct"
      />
      <div className="flex flex-col items-center gap-[26px] max-xsm:mt-[14px] max-xsm:w-full">
        <ScheduleBtn
          showSchedule={showSchedule}
          handleScheduleBtn={handleScheduleBtn}
        />
        {showSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-[24px] w-full"
          >
            <ProductInfoList packageId={packageData.packageId} />
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default PackageBox;
