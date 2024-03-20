import { useRef } from "react";
import { CSVLink } from "react-csv";
import { OrdeInfoData } from "../../types/manager";

const ExcelDownload = ({
  data,
  headers,
}: {
  data: OrdeInfoData[];
  headers: { label: string; key: string }[];
}) => {
  const csvLink = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename="아이맘_주문목록.csv"
      className="py-[2px] px-[12px] text-[12px] bg-sub-black bg-opacity-[0.05] shrink-0 border border-[#707070] h-fit"
      ref={csvLink}
      target="_blank"
    >
      전체목록 다운로드
    </CSVLink>
  );
};
export default ExcelDownload;
