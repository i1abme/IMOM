export const PRODUCT_INFO_CATEGORIES = [
  {
    label: "상품 핵심포인트",
    sectionId: "keyPoint",
  },
  {
    label: "포함/불포함",
    sectionId: "includedProduct",
  },
  {
    label: "예약 유의사항",
    sectionId: "reservationNotice",
  },
];

export const SCHEDULE_INFO_CATEGORIES = [
  {
    label: "일정안내",
    sectionId: "scheduleList",
  },
  {
    label: "호텔안내",
    sectionId: "hotelInfo",
  },
  {
    label: "지역정보",
    sectionId: "regionInfo",
  },
  {
    label: "여행약관",
    sectionId: "terms",
  },
];

export const RESERVATION_INFO_CATEGORIES = {
  packageName: "패키지명",
  period: "몇박 몇일",
  startDate: "출발일",
  endDate: "도착일",
  airline: "항공사",
};

export const PRICE_EXCEPTION = [
  {
    age: "성인",
    price: 0,
    surcharge: 0,
  },
  {
    age: "아동",
    price: 0,
    surcharge: 0,
  },
  {
    age: "유아",
    price: 0,
    surcharge: 0,
  },
];

export const MOBILE_PRODUCT_SUMMARY: { [key: string]: string }[] = [
  { key: "productCode", label: "상품번호" },
  { key: "startDate", label: "출발일시" },
  { key: "endDate", label: "도착일시" },
  { key: "airline", label: "항공" },
  { key: "minCount", label: "최소출발" },
];

export const AGE_GUIDE = {
  성인: "(만12세 이상)",
  아동: "(만2세 ~ 만12세 미만)",
  유아: "(만2세 미만)",
};
