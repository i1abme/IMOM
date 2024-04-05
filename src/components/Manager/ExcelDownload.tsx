import { useRef } from "react";
import { CSVLink } from "react-csv";
import { OrderInfoData } from "../../types/manager";

const ExcelDownload = ({
  data,
  headers,
  title,
  className,
  fileName,
}: {
  data: OrderInfoData[];
  headers: { label: string; key: string }[];
  title: string;
  className?: string;
  fileName: string;
}) => {
  const csvLink = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={fileName}
      className={`${
        className
          ? className
          : "py-[2px] px-[12px] text-[12px] bg-sub-black bg-opacity-[0.05] shrink-0 border border-[#707070] h-fit"
      }`}
      ref={csvLink}
      target="_blank"
    >
      {title}
    </CSVLink>
  );
};
export default ExcelDownload;
