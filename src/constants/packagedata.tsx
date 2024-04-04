import FlagCarrierTrue from "/public/flagCarrierTrue.svg";
import FlagCarrierFalse from "/public/flagCarrierFalse.svg";
import TourConductorTrue from "/public/tourConductorTrue.svg";
import TourConductorFalse from "/public/tourConductorFalse.svg";
import ShoppingTrue from "/public/shoppingTrue.svg";
import ShoppingFalse from "/public/shoppingFalse.svg";
import OptionalTourTrue from "/public/optionalTourTrue.svg";
import OptionalTourFalse from "/public/optionalTourFalse.svg";

export const PACKAGE_ICON_CATEGORIES = {
  flagCarrier: {
    0: FlagCarrierFalse,
    1: FlagCarrierTrue,
    label: "국적기",
  },
  tourConductor: {
    0: TourConductorFalse,
    1: TourConductorTrue,
    label: "인솔자",
  },
  shopping: {
    0: ShoppingFalse,
    1: ShoppingTrue,
    label: "쇼핑",
  },
  optionalTour: {
    0: OptionalTourFalse,
    1: OptionalTourTrue,
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
