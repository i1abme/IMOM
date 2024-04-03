import ManagerTitle from "../../Manager/ManagerTitle";
import TableRow from "./TableRow";
import { amountFormat } from "../../../utils/amountFormat";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../../atom/atom";
import SectionTitle from "../SectionTitle";

const OrderedAmount = ({
  totalPrice = 0,
  payedPrice = 0,
  balance = 0,
  handlePayment,
  role,
}: {
  totalPrice: number | undefined;
  payedPrice: number | undefined;
  balance: number | undefined;
  handlePayment?: () => void;
  role: string;
}) => {
  const viewSizeState = useRecoilValue(viewSize);
  return (
    <section className="text-sub-black text-[14px]">
      {viewSizeState === "web" ? (
        <ManagerTitle title={`예약금 / 잔금`} style="mb-[12px]" />
      ) : (
        <SectionTitle title={"결제예정금액"} titleStyle="max-xsm:text-[16px]" />
      )}
      <div className="max-xsm:flex flex-col items-center">
        <div
          className="flex justify-between border-y border-sub-black 
          max-xsm:w-full max-xsm:flex-col max-xsm:border-y-main-color 
          max-xsm:border-[0.5px] max-xsm:border-x-0 max-xsm:max-w-[200px] max-xsm:mt-[16px]
          "
        >
          <TableRow
            category="총 금액"
            header={viewSizeState === "web" ? true : false}
            content={`${amountFormat(totalPrice)} 원`}
            contentStyle="text-right"
          />
          <TableRow
            category={viewSizeState === "web" ? "예약금 / 잔금" : "예약금"}
            header={false}
            content={
              viewSizeState === "web"
                ? `${amountFormat(payedPrice)} 원 / ${amountFormat(balance)} 원`
                : `${amountFormat(payedPrice)} 원`
            }
            rowStyle="max-xsm:border-y-[0.5px] max-xsm:border-y-main-color"
          />
          {viewSizeState === "mobile" && (
            <>
              <TableRow
                category="잔금"
                header={false}
                content={`${amountFormat(balance)} 원`}
                rowStyle="border-b-[0.5px] max-xsm:border-y-main-color"
              />
              <TableRow
                category="결제금액"
                header={false}
                content={balance > 0 ? `${amountFormat(balance)} 원` : "0원"}
                rowStyle="border-t-[0.5px] max-xsm:border-y-main-color mt-[6px]"
              />
            </>
          )}
        </div>
        {role === "admin" ? (
          <div
            className="h-[60px] text-[13px] text-sub-black bg-sub-black bg-opacity-[0.04] 
        flex justify-center items-center gap-[6px]"
          >
            <span>{balance > 0 ? "남은 결제금액" : "환불 예정금액"}</span>
            <span className="text-[19px] text-main-color">
              {amountFormat(Math.abs(balance))} 원
            </span>
          </div>
        ) : (
          <div
            className="h-[60px] text-[13px] text-sub-black bg-sub-black bg-opacity-[0.04] 
        flex justify-center items-center gap-[6px] max-xsm:bg-transparent max-xsm:w-full max-xsm:flex-col
        max-xsm:h-fit max-xsm:mt-[6px]"
          >
            {viewSizeState === "web" && (
              <>
                <span>결제금액</span>
                <span className="text-[19px] text-main-color">
                  {balance > 0 ? `${amountFormat(balance)} 원` : "0원"}
                </span>
              </>
            )}
            <button
              className="bg-main-color px-[14px] py-[4px] rounded-[20px] text-white text-[20px] 
              disabled:bg-sub-black/[.3] max-xsm:px-[76px] max-xsm:py-[8px] max-xsm:text-[12px]
              max-xsm:font-medium"
              onClick={handlePayment}
              disabled={balance <= 0}
            >
              결제하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default OrderedAmount;
