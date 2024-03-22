import ManagerTitle from "../../Manager/ManagerTitle";
import TableRow from "../../Manager/orderDetail/TableRow";
import { amountFormat } from "../../../utils/amountFormat";

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
  return (
    <section className="text-sub-black text-[14px]">
      <ManagerTitle title="예약금/잔금" style="mb-[12px]" />
      <div>
        <div className="flex justify-between border-y border-sub-black">
          <TableRow
            category="총 금액"
            header={true}
            content={`${amountFormat(totalPrice)} 원`}
          />
          <TableRow
            category="예약금 / 잔금"
            header={false}
            content={`${amountFormat(payedPrice)} 원 / ${amountFormat(
              balance
            )} 원`}
          />
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
        flex justify-center items-center gap-[6px]"
          >
            <span>결제금액</span>
            <span className="text-[19px] text-main-color">
              {balance > 0 ? `${amountFormat(balance)} 원` : "0원"}
            </span>
            <button
              className="bg-main-color px-[14px] py-[4px] rounded-[20px] text-white text-[20px]"
              onClick={handlePayment}
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
