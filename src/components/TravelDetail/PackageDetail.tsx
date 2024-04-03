import { Package } from "../../types/package";
import { Product } from "../../types/product";
import { amountFormat } from "../../utils/amountFormat";
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
      <div
        className="w-[750px] flex gap-[33px] mt-[38px]  border-b-[1px] border-main-color pb-[12px]
      max-xsm:flex-col max-xsm:w-full max-xsm:mx-[16px] max-xsm:border-none max-xsm:pb-0"
      >
        <Thumnails list={packageInfo.thumbnailList ?? []} />
        <div className="flex flex-col mt-[8px]">
          <PackageInfo
            country={packageInfo.country ?? packageInfo.countryName ?? ""}
            name={packageInfo.packageName}
            summary={packageInfo.summary}
            price={
              packageInfo.price ? `${amountFormat(packageInfo.price)}` : "0"
            }
            hashTag={packageInfo.hashTag}
            page="traveldetail"
          />
          <div className="max-xsm:flex max-xsm:justify-between max-xsm:px-[20px] max-xsm:w-full max-xsm:items-end">
            <PackageIcon productInfo={productInfo} />
            <div className="flex gap-[7px] text-center max-xsm:flex-col">
              <span
                className={`w-[68px] py-[6px] text-[12px] rounded-[12px] tracking-[-0.6px] 
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
      </div>
    </>
  );
};
export default PackageDetail;
