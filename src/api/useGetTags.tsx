import { useEffect, useState } from "react";
import { baseInstance } from "./instance";
import { tagTitle } from "../constants/data";
import { useRecoilState } from "recoil";
import { tagFetchState } from "../atom/atom";

type UseGetProps = {
  params: string;
};
type TagItem = {
  tagId: number;
  tagContent: string;
};
export const useGetTags = ({ params }: UseGetProps) => {
  const [tagsData, setTagsData] = useState<{ [key: string]: TagItem[] }>({});
  const [fetchState, setFetchState] = useRecoilState(tagFetchState);
  const [tagLengths, setTagLengths] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.get(`/${params}`);
        setTagsData(response.data.data);
        const lengths: { [key: string]: boolean } = {};
        tagTitle.forEach((el) => {
          lengths[el.category] = response.data.data[el.category]?.length < 10;
        });
        setTagLengths(lengths);
        setFetchState(false);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchData();
  }, [fetchState]);
  return { tagsData, setFetchState, tagLengths };
};
