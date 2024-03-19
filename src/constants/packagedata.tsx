import flagCarrierExist from "../../public/icon_check.svg";
import flagCarrierNotExist from "../../public/icon_ask.svg";

export const PACKAGE_ICON_CATEGORIES = {
  flagCarrier: {
    0: flagCarrierNotExist,
    1: flagCarrierExist,
  },
  tourConductor: {
    0: flagCarrierNotExist,
    1: flagCarrierExist,
  },
  shopping: {
    0: flagCarrierNotExist,
    1: flagCarrierExist,
  },
  optionalTour: {
    0: flagCarrierNotExist,
    1: flagCarrierExist,
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
