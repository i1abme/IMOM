import { useEffect, useState } from "react";
import { baseInstance } from "./instance";

export const useGetContries = () => {
  const [countrys, setCountrys] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.get(`/countries`);
        setCountrys(response.data.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchData();
  }, []);
  return { countrys };
};
