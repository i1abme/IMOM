import { useState } from "react";
import { baseInstance } from "./instance";

type UsePostPackageProps = {
  operation: string | null;
  ids: number[];
  changeActive: boolean;
  setChangeActive: React.Dispatch<React.SetStateAction<boolean>>;
  params: string;
};

export const useChangePackage = ({
  operation,
  ids,
  changeActive,
  setChangeActive,
  params,
}: UsePostPackageProps) => {
  const [packageUpdate, setPackageUpdate] = useState<number | null>(null);
  if (changeActive && ids.length !== 0) {
    const fetchData = async () => {
      try {
        const response = await baseInstance.post(`/${params}/batch-update`, {
          operation: operation,
          ids: ids,
        });
        setPackageUpdate(response.data.code);
        setChangeActive(false);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    fetchData();
  }

  return { packageUpdate };
};
