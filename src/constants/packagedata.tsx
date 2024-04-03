import flagCarrierTrue from "/public/flagCarrierTrue.svg";
import flagCarrierFalse from "/public/flagCarrierFalse.svg";
import tourConductorTrue from "/public/tourConductorTrue.svg";
import tourConductorFalse from "/public/tourConductorFalse.svg";
import shoppingTrue from "/public/shoppingTrue.svg";
import shoppingFalse from "/public/shoppingFalse.svg";
import optionalTourTrue from "/public/optionalTourTrue.svg";
import optionalTourFalse from "/public/optionalTourFalse.svg";

export const PACKAGE_ICON_CATEGORIES = {
  flagCarrier: {
    0: flagCarrierFalse,
    1: flagCarrierTrue,
    label: "국적기",
  },
  tourConductor: {
    0: tourConductorFalse,
    1: tourConductorTrue,
    label: "인솔자",
  },
  shopping: {
    0: shoppingFalse,
    1: shoppingTrue,
    label: "쇼핑",
  },
  optionalTour: {
    0: optionalTourFalse,
    1: optionalTourTrue,
    label: "선택관광",
  },
};

export const EMPTY_TABLE_DATA = {
  startDate: "",
  endDate: "",
  id: null,
  detail: null,
  productId: null,
  productCode: "",
  maxCount: null,
  nowCount: null,
  airline: "",
  price: null,
  productState: "",
};

export const EMPTY_MOBILE_TABLE_DATA = {
  startDate: null,
  endDate: null,
  id: null,
  detail: null,
  productId: null,
  productCode: "",
  maxCount: null,
  nowCount: null,
  airline: "",
  price: null,
  productState: "",
};
