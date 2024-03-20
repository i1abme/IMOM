import ManagerTitle from "../../Manager/ManagerTitle";
import TableRow from "../../Manager/orderDetail/TableRow";
import { amountFormat } from "../../../utils/amountFormat";

const OrderedAmount = ({
  totalPrice = 0,
  payedPrice = 0,
  balance = 0,
}: {
  totalPrice: number | undefined;
  payedPrice: number | undefined;
  balance: number | undefined;
}) => {
  return (
    <section className="text-sub-black text-[14px]">
      <ManagerTitle title="예약금/잔금" style="mb-[12px]" />
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
    </section>
  );
};
export default OrderedAmount;
