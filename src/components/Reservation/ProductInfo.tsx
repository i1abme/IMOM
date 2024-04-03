import { ReservationInfo } from "../../types/product";
import SectionTitle from "./SectionTitle";
import { RESERVATION_INFO_CATEGORIES } from "../../constants/productdata";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";
import TableRow from "../common/Order/TableRow";

const ProductInfo = ({ info }: { info: ReservationInfo }) => {
  const viewSizeState = useRecoilValue(viewSize);
  return (
    <section>
      <SectionTitle title="예약상품" />
      <div
        className="w-[664px] flex flex-wrap gap-y-[16px] p-[22px]
        max-xsm:w-full max-xsm:gap-0 max-xsm:p-0 max-xsm:last:border-b-[0.5px] max-xsm:last:border-main-color max-xsm:mt-[6px]"
      >
        {info &&
          Object.entries(info).map(
            ([key, value]) =>
              key !== "productId" &&
              (viewSizeState === "web" ? (
                <div
                  className="min-w-[300px] gap-[26px] flex text-sub-black text-[14px]"
                  key={key}
                >
                  <span className="font-bold">
                    {
                      RESERVATION_INFO_CATEGORIES[
                        key as keyof typeof RESERVATION_INFO_CATEGORIES
                      ]
                    }
                  </span>
                  <span>{value}</span>
                </div>
              ) : (
                <TableRow
                  key={key}
                  category={
                    RESERVATION_INFO_CATEGORIES[
                      key as keyof typeof RESERVATION_INFO_CATEGORIES
                    ]
                  }
                  content={value}
                  rowStyle="border-t-[0.5px] border-main-color"
                />
              ))
          )}
      </div>
    </section>
  );
};
export default ProductInfo;
