import { useEffect, useState } from "react";
import {
  CANCEL_CATEGORIES,
  CASHRECEIPTS_CATEGORIES,
  DETAIL_CATEGORIES,
  METHOD_CATEGORIES,
  PAYMENY_CATEGORIES,
  PAYMENY_STATUS,
} from "../../../constants/paymentdata";
import { OrderedPaymentData } from "../../../types/payment";
import TableRow from "./TableRow";
import { amountFormat } from "../../../utils/amountFormat";

const PaymentInfoBox = ({
  info,
  idx,
  handleAmount,
}: {
  info: OrderedPaymentData;
  idx: number;
  handleAmount: (amount: number) => void;
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    handleAmount(info.totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <section
      className="flex flex-col border-t border-sub-black cursor-pointer"
      key={`short_info_${idx}`}
    >
      <div onClick={handleClick}>
        {Object.entries(PAYMENY_CATEGORIES).map(([key, value]) => (
          <TableRow
            category={value}
            header={true}
            content={
              key === "status"
                ? PAYMENY_STATUS[
                    info[
                      key as keyof typeof info
                    ] as keyof typeof PAYMENY_STATUS
                  ]
                : (info[key as keyof typeof info] as string)
            }
            rowStyle="min-w-fit border-b border-sub-black"
            key={`${key}_${idx}`}
          />
        ))}
      </div>
      {showDetail && (
        <div className="border border-sub-black w-full p-[24px] cursor-auto">
          <div className="pb-[12px]">
            <h3 className="pb-[12px]">
              <strong>{info.method} 결제 정보</strong>
            </h3>
            {typeof info[
              METHOD_CATEGORIES[
                info.method as keyof typeof METHOD_CATEGORIES
              ] as keyof typeof info
            ] === "object" &&
              Object.entries(
                info[
                  METHOD_CATEGORIES[
                    info.method as keyof typeof METHOD_CATEGORIES
                  ] as keyof typeof info
                ] || {}
              ).map(
                ([key, value]) =>
                  DETAIL_CATEGORIES[key as keyof typeof DETAIL_CATEGORIES] && (
                    <div key={key} className="flex flex-shrink-0 gap-[8px]">
                      <span>
                        {
                          DETAIL_CATEGORIES[
                            key as keyof typeof DETAIL_CATEGORIES
                          ]
                        }
                      </span>
                      <span>:</span>
                      <span>{value}</span>
                    </div>
                  )
              )}
          </div>
          {info.method === "간편결제" && info.card && (
            <div>
              <h3 className="pb-[12px]">
                <strong>간편결제 카드 정보</strong>
              </h3>
              {Object.entries(info.card).map(
                ([key, value]) =>
                  DETAIL_CATEGORIES[key as keyof typeof DETAIL_CATEGORIES] && (
                    <div key={key} className="flex flex-shrink-0 gap-[8px]">
                      <span>
                        {
                          DETAIL_CATEGORIES[
                            key as keyof typeof DETAIL_CATEGORIES
                          ]
                        }
                      </span>
                      <span>:</span>
                      <span>
                        {value &&
                        (DETAIL_CATEGORIES[
                          key as keyof typeof DETAIL_CATEGORIES
                        ] === "결제금액" ||
                          DETAIL_CATEGORIES[
                            key as keyof typeof DETAIL_CATEGORIES
                          ] === "간편결제사 할인금액")
                          ? amountFormat(+value)
                          : value}
                      </span>
                    </div>
                  )
              )}
            </div>
          )}
          {info.cashReceipt && (
            <div>
              <h3 className="pb-[12px]">
                <strong>현금 영수증 정보</strong>
              </h3>
              {Object.entries(info.cashReceipt).map(
                ([key, value]) =>
                  CASHRECEIPTS_CATEGORIES[
                    key as keyof typeof CASHRECEIPTS_CATEGORIES
                  ] && (
                    <div key={key} className="flex flex-shrink-0 gap-[8px]">
                      <span>
                        {
                          CASHRECEIPTS_CATEGORIES[
                            key as keyof typeof CASHRECEIPTS_CATEGORIES
                          ]
                        }
                      </span>
                      <span>:</span>
                      <span>{value}</span>
                    </div>
                  )
              )}
            </div>
          )}
          {info.cancels && (
            <div>
              <h3 className="pb-[12px]">
                <strong>결제 취소 정보</strong>
              </h3>
              {info.cancels.map((cancelInfo) =>
                Object.entries(cancelInfo).map(
                  ([key, value]) =>
                    CANCEL_CATEGORIES[
                      key as keyof typeof CANCEL_CATEGORIES
                    ] && (
                      <div key={key} className="flex flex-shrink-0 gap-[8px]">
                        <span>
                          {
                            CANCEL_CATEGORIES[
                              key as keyof typeof CANCEL_CATEGORIES
                            ]
                          }
                        </span>
                        <span>:</span>
                        <span>{value}</span>
                      </div>
                    )
                )
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default PaymentInfoBox;
