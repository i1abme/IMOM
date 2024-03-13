import { ReservationInfo } from "../../types/product";
import SectionTitle from "./SectionTitle";
import { RESERVATION_INFO_CATEGORIES } from "../../constants/productdata";

const ProductInfo = ({ info }: { info: ReservationInfo }) => {
  return (
    <section>
      <SectionTitle title="예약상품" />
      <div className="w-[664px] flex flex-wrap gap-y-[16px] p-[22px]">
        {info &&
          Object.entries(info).map(
            ([key, value]) =>
              key !== "productId" && (
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
              )
          )}
      </div>
    </section>
  );
};
export default ProductInfo;
