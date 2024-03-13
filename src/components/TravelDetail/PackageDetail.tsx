import { Package } from "../../types/package";
import { Product } from "../../types/product";
import PackageInfo from "../common/PackageInfo";
import PackageIcon from "./PackageIcon";
import Thumnails from "./Thumnails";

const PackageDetail = ({
  packageInfo,
  productInfo,
}: {
  packageInfo: Package;
  productInfo: Product;
}) => {
  return (
    <>
      <div className="w-[750px] flex gap-[33px] mt-[38px]  border-b-[1px] border-main-color pb-[12px]">
        <Thumnails list={packageInfo.thumbnailList ?? []} />
        <div className="flex flex-col mt-[8px]">
          <PackageInfo
            country={packageInfo.country ?? packageInfo.countryName ?? ""}
            name={packageInfo.packageName}
            summary={packageInfo.summary}
            price={packageInfo.price}
            hashTag={packageInfo.hashTag}
            page="traveldetail"
          />
          <PackageIcon productInfo={productInfo} />
          <div className="flex gap-[7px] text-center">
            <span
              className={`w-[68px] py-[6px] text-[12px] rounded-[12px] 
            ${
              productInfo.productState === "예약 가능"
                ? "bg-main-color text-white"
                : "border-main-color border-[1px] text-sub-black opacity-[39%]"
            } `}
            >
              예약가능
            </span>
            <span
              className={`w-[68px] py-[6px] text-[12px] rounded-[12px] 
            ${
              productInfo.productState === "예약 마감"
                ? "bg-main-color text-white"
                : "border-main-color border-[1px] text-sub-black opacity-[39%]"
            } `}
            >
              예약마감
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PackageDetail;
