import { useState } from "react";
import useGetPaymentInfo from "../../../queries/orders/useGetPaymentInfo";
import ManagerTitle from "../../Manager/ManagerTitle";
import PaymentInfoBox from "./PaymentInfoBox";
import TableRow from "./TableRow";
import { amountFormat } from "../../../utils/amountFormat";
import AmountChangeHistory from "./AmountChangeHistory";
import { FluctuationInfos } from "../../../types/manager";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../../atom/atom";

const PaymentInfo = ({
  idList,
  role,
  changeHistory,
}: {
  idList: string[];
  role: string;
  changeHistory?: FluctuationInfos[];
}) => {
  const viewSizeState = useRecoilValue(viewSize);
  const { data, isError, errors } = useGetPaymentInfo(idList);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAmount = (amount: number) => {
    setTotalAmount((prev) => prev + amount);
  };

  if (isError) {
    errors?.map((error) => console.log(error?.message));
  }
  return (
    <div className="text-sub-black flex flex-col gap-[32px] text-[14px] max-xsm:gap-[4px]">
      {viewSizeState === "web" && (
        <ManagerTitle title="결제정보" style="mb-[12px]" />
      )}
      {viewSizeState === "mobile" && (
        <div className="text-[8px] tracking-[-0.4px] text-end">
          *해당 결제 정보를 클릭 하시면 상세정보를 보실 수 있습니다.
        </div>
      )}
      {data !== undefined &&
        data.map(
          (info, idx) =>
            info && (
              <PaymentInfoBox
                info={info}
                idx={idx}
                key={`info_${idx}`}
                handleAmount={handleAmount}
              />
            )
        )}
      {viewSizeState === "web" && (
        <TableRow
          category="총 결제 금액"
          header={true}
          content={`${amountFormat(totalAmount)} 원`}
          rowStyle="border-y border-sub-black"
        />
      )}
      {role === "admin" && (
        <AmountChangeHistory changeHistory={changeHistory} />
      )}
    </div>
  );
};
export default PaymentInfo;
