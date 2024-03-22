import { travelerInfo } from "./reservation";

export interface PaymentData {
  orderId: string;
  amount: string | number;
  paymentKey: string;
  productId: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  totalCount: number;
  totalPrice: number;
  travelerInfoList: travelerInfo[];
  marketing: boolean;
}

export interface BalanceRequset {
  orderId: string;
  amount: string;
  paymentKey: string;
  imomOrderId: string;
}

export interface Failure {
  // 결제 실패시
  code: string; // 오류 타입
  message: string; // 에러 메세지
}

export interface CashReceipt {
  type: "소득공제" | "지출증빙"; // 현금 영수증 타입
  receiptKey: string; // 현금영수증의 키값
  issueNumber: string; // 현금영수증 발급 번호
  receiptUrl: string; // 현금영수증 확인 주소
  amount: number; // 현금영수증 처리된 금액
  taxFreeAmount: number; // 면세 처리된 금액
}

export interface CashReceipts extends CashReceipt {
  orderId: string; // 주문 번호
  orderName: string; // 구매 상품
  businessNumber: string; // 현금영수증을 발급한 사업자등록번호
  transactionType: "CONFIRM" | "CANCEL"; // 현금영수증 발급 종류
  issueStatus: "IN_PROGRESS" | "COMPLETED" | "FAILED"; // 현금영수증 발급 상태
  failure: Failure | null;
  customerIdentityNumber: string; //현금영수증 발급에 필요한 소비자 인증수단
  requestedAt: string; // 현금영수증 발급 혹은 취소를 요청 일시
}

export interface OrderedPaymentData {
  version: string; // Payment 객체의 응답 버전
  paymentKey: string; // 결제의 키 값
  type: "NORMAL" | "BILLING" | "BRANDPAY"; // 결제 타입 정보
  orderId: string; // 주문 ID
  orderName: string; // 구매상품
  mId: string; //상점아이디(MID)
  currency: string; // 결제할 때 사용한 통화
  method:
    | "카드"
    | "가상계좌"
    | "간편결제"
    | "휴대폰"
    | "계좌이체"
    | "문화상품권"
    | "도서문화상품권"
    | "게임문화상품권"; // 결제수단
  totalAmount: number; // 총 결제 금액
  balanceAmount: number; // 취소 가능한 금액
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED"; // 결제 상태
  requestedAt: string; // 결제 일시
  aapprovedAt: string; // 결제 승인 일시
  useEscrow: string; // 안전결제
  lastTransactionKey: string | null; // 마지막 거래 키값
  suppliedAmount: number; // 공급가액
  vat: number; // 부가세
  cultureExpense: boolean; //문화비 지출 여부
  taxFreeAmount: number; // 면세 금액
  taxExemptionAmount: number; // 과세 제외 결제금액
  cancels:
    | {
        // 취소시
        cancelAmount: number; // 결제 취소 금액
        cancelReason: string; // 결제 취소 이유
        taxFreeAmount: number; // 취소된 금액 중 면세 금액
        taxExemptionAmount: number; // 취소된 금액 중 과세 제외 금액
        refundableAmount: number; // 결제 취소후 환불 가능한 잔액
        easyPayDiscountAmount: number; // 적립식 결제수단에서 취소된 금액
        canceledAt: string; // 결제 취소 일시
        transactionKey: string; // 취소 건의 키값
        receiptKey: string | null; // 취소 건의 현금영수증 키값
      }[]
    | null;
  isPartialCancelable: boolean; // 부분취소 가능 금액
  card: {
    // 카드로 결제시
    amount: number; // 카드사에 요청한 결제 금액
    acquirerCode: string | null; // 카드 매입사 숫자 코드
    number: string; // 카드 번호
    installmentPlanMonths: number; // 할부 개월 수
    approveNo: string; // 카드사 승인 번호
    useCardPoint: boolean; // 카드사 포인트 사용 여부
    cardType: "신용" | "체크" | "기프트" | "미확인"; // 카드 종류 (해외카드 / 간편결제 시 미확인)
    ownerType: "개인" | "법인" | "미확인"; // 소유자 타입
    acquireStatus:
      | "READY"
      | "REQUESTED"
      | "COMPLETED"
      | "CANCEL_REQUESTED"
      | "CANCELED"; // 카드 결제의 매입 상태
    isInterestFree: boolean; // 무이자 할부 적용 여부
    interestPayer: "BUYER" | "CARD_COMPANY" | "MERCHANT" | null; //  할부 수수료를 부담하는 주체
  } | null;
  virtualAccount: {
    // 가상계좌로 결제시
    accountType: "일반" | "고정"; // 가상계좌 타입
    accountNumber: string; // 발급된 계좌 번호
    bankCode: string; // 가상계좌 은행 숫자 코드
    customerName: string; // 가상계좌를 발급한 구매자명
    dueDate: string; // 입금기한
    refundStatus:
      | "NONE"
      | "PENDING"
      | "FAILED"
      | "PARTIAL_FAILED"
      | "COMPLETED"; // 환불처리 상태
    expired: boolean; // 가상계좌 만료 여부
    settlementStatus: "INCOMPLETED" | "COMPLETED"; // 정산 상태
    refundReceiveAccount: {
      bankCode: string;
      accountNumber: string;
      holderName: string;
    };
  } | null;
  secret: string | null; //가상계좌 웹훅이 정상적인 요청인지 검증하는 값
  mobilePhone: {
    // 핸드폰 결제시
    customerMobilePhone: string; // 결제한 핸드폰 번호
    settlementStatus: "INCOMPLETED" | "COMPLETED"; // 정산 상태
    receiptUrl: "string"; // 휴대폰 결제 영수증 주소
  } | null;
  giftCertificate: {
    // 상품권 결제시
    approveNo: string; // 결제 승인 번호
    settlementStatus: "INCOMPLETED" | "COMPLETED"; // 정산 상태
  } | null;
  transfer: {
    // 계좌 이체시
    bankCode: string; // 은행 숫자 코드
    settlementStatus: "INCOMPLETED" | "COMPLETED"; // 정산상태
  } | null;
  receipt: {
    // 영수증 정보
    url: string; // 고객에게 제공할 수 있는 결제수단별 영수증 (카드 결제는 매출전표, 가상계좌는 무통장 거래 명세서, 계좌이체・휴대폰・상품권 결제는 결제 거래 내역 확인서)
  } | null;
  checkout: {
    // 결제창 정보
    url: string; // 결제창 주소
  } | null;
  easyPay: {
    // 간편결제 정보
    provider: string; // 간편결제사 코드
    amount: number; // 간편결제 서비스에 등록된 계좌 혹은 현금성 포인트로 결제한 금액
    discountAmount: number; // 간편결제 서비스의 적립 포인트나 쿠폰 등으로 즉시 할인된 금액
  } | null;
  country: string; // 결제한 국가
  failure: Failure | null;
  cashReceipt: CashReceipt | null;
  cashReceipts: CashReceipts | null;
  discount: {
    // 카드사의 즉시 할인 프로모션 정보
    amount: number; // 카드사의 즉시 할인 프로모션 금액
  } | null;
}
