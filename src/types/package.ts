import { Dispatch, SetStateAction } from "react";
import { Img } from "./img";
import { Schedule } from "./product";
import { TagCheckList } from "./tag";

export type PackageInfoProps = {
  name: string;
  summary: string;
  price: number;
  hashTag: string;
  page: string;
  country: string;
};

export interface PackageName {
  packageId: number | null;
  packageName: string;
}

export interface Package {
  packageId: number;
  packageName: string;
  summary: string;
  period: number;
  privacy: string;
  countryName?: string; // tag검색으로 받아오는 Package데이터의 country
  country?: string;
  price: number;
  hashTag: string;
  hotelInfo: string;
  regionInfo: string;
  terms: string;
  thumbnailList: Img[] | null;
  scheduleList?: Schedule[] | null;
  checkedTagList?: number[] | null;
}

export type PackageBoxGroupProps = {
  setTagSubmit: Dispatch<SetStateAction<boolean>>;
  tagSubmit: boolean;
  countryClick: string;
  tagCheckList: TagCheckList;
  setCountryClick: Dispatch<SetStateAction<string>>;
};
