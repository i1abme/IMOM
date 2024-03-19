export const PAYMENT_TYPE = {
  NORMAL: "일반결제",
  BILLING: "자동결제",
  BRANDPAY: "브렌드페이",
};

export const PAYMENY_STATUS = {
  READY: "결제 인증 전",
  IN_PROGRESS: "결제 인증 완료",
  WAITING_FOR_DEPOSIT: "가상계좌 입금 전",
  DONE: "결제 승인",
  CANCELED: "결제 취소",
  PARTIAL_CANCELED: "부분 취소",
  ABORTED: "승인 실패",
  EXPIRED: "유효시간 지남",
};

export const PAYMENY_CATEGORIES = {
  approvedAt: "결제승인일시",
  orderId: "주문번호",
  method: "결제수단",
  totalAmount: "결제금액",
  status: "결제상태",
};

export const DETAIL_CATEGORIES = {
  customerName: "구매자명",
  amount: "결제금액",
  acquirerCode: "카드사 코드",
  approveNo: "카드사 승인번호",
  number: "카드번호",
  cardType: "카드종류",
  installmentPlanMonths: "할부개월",
  acquireStatus: "결제매입상태",
  accountType: "가상계좌타입",
  accountNumber: "발급된 계좌번호",
  bankCode: "은행 코드",
  dueDate: "입금기한",
  settlementStatus: "정산상태",
  refundStatus: "환불처리상태",
  customerMobilePhone: "핸드폰 번호",
  receiptUrl: "결제 영수증 주소",
  provider: "결제사 코드",
  discountAmount: "간편결제사 할인금액",
};

export const CANCEL_CATEGORIES = {
  cancelAmount: "취소금액",
  cancelReason: "취소이유",
  refundableAmount: "환불 가능한 잔액",
  canceledAt: "취소일시",
};

export const CASHRECEIPTS_CATEGORIES = {
  type: "타입",
  transactionType: "발급종류",
  requestedAt: "발급요청일시",
  issueStatus: "발급상태",
  issueNumber: "발급번호",
  amount: "처리금액",
  taxFreeAmount: "면세금액",
  receiptUrl: "확인주소",
};

export const METHOD_CATEGORIES = {
  카드: "card",
  가상계좌: "virtualAccount",
  간편결제: "easyPay",
  휴대폰: "mobilePhone",
  계좌이체: "transfer",
};

// export const CARD_CODES = {
//   "3K": "기업 BC",
//   "46": "광주은행",
//   "71": "롯데카드",
//   "30" : "KDB산업은행",
//   "31" : "KDB산업은행",
//   "51" : "삼성카드",
//   "38" : "새마을금고",

// };
