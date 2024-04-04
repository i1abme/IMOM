import { PACKAGE_ICON_CATEGORIES } from "../../constants/packagedata";
import { Product } from "../../types/product";

const PackageIcon = ({ productInfo }: { productInfo: Product }) => {
  console.log(productInfo.flagCarrier);
  return (
    <div className="flex gap-[6px] my-[13px]">
      {Object.entries(PACKAGE_ICON_CATEGORIES).map(([key, value]) => (
        <div className="flex flex-col items-center" key={key}>
          <div
            className="w-[53px] h-[53px] border-[1px] rounded-[10px] max-xsm:w-[45px] max-xsm:h-[45px] bg-cover"
            style={{
              backgroundImage:
                productInfo[key as keyof Product] === 0
                  ? `url(${value[0]})`
                  : `url(${value[1]})`,
            }}
          />
          <span className="text-[10px] text-sub-black tracking-[-0.5px]">
            {value.label}
          </span>
        </div>
      ))}
    </div>
  );
};
export default PackageIcon;
