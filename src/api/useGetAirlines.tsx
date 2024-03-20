import { useEffect, useState } from "react";
import { baseInstance } from "./instance";

export const useGetAirlines = () => {
  const [airlines, setAirlines] = useState<string[]>([]);
  useEffect(() => {
    baseInstance
      .get("airlines")
      .then((res) => setAirlines(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return { airlines };
};
