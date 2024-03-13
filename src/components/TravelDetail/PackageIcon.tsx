import { PACKAGE_ICON_CATEGORIES } from "../../constants/packagedata";
import { Product } from "../../types/product";

const PackageIcon = ({ productInfo }: { productInfo: Product }) => {
  return (
    <div className="flex gap-[6px] my-[13px]">
      {Object.entries(PACKAGE_ICON_CATEGORIES).map(([key, value]) => (
        <div
          className="w-[53px] h-[53px] border-[1px] rounded-[10px]"
          key={key}
          style={{
            backgroundImage:
              productInfo[key as keyof Product] === 0
                ? `url(${value[0]})`
                : `url(${value[1]})`,
          }}
        ></div>
      ))}
    </div>
  );
};
export default PackageIcon;
