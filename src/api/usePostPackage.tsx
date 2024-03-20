import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { baseInstance } from "./instance";

type UsePostPackageProps = {
  data?: {
    countryName: string | null;
    privacy: string | null;
    saveState: string | null;
    periodOrder: number | null;
    offset: number;
    limit: number;
  };
  countrySelect: string | null;
  privacy: string | null;
  deleteActive: boolean;
  save: string | null;
  changeActive: boolean;
  copyActive: boolean;
  packagePeriod: boolean;
  setCopyActive: Dispatch<SetStateAction<boolean>>;
  offset: number;
};

type ResponseContent = {
  packageId: number;
  packageName: string;
  countryName: string;
  period: number;
  privacy: string;
  saveState: string;
};
export const usePostPackage = ({
  data,
  countrySelect,
  privacy,
  deleteActive,
  save,
  changeActive,
  copyActive,
  setCopyActive,
  packagePeriod,
  offset,
}: UsePostPackageProps) => {
  const [packageList, setPackageList] = useState<ResponseContent[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.post(`/packages`, data);
        setTotalPage(response.data.data.totalPages);
        setPackageList(response.data.data.content);
        setCopyActive(false);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchData();
  }, [
    countrySelect,
    privacy,
    deleteActive,
    save,
    changeActive,
    copyActive,
    packagePeriod,
    offset,
  ]);
  return { packageList, privacy, totalPage };
};
