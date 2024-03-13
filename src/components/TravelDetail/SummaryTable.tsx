import { useState } from "react";
import Table from "../common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { SummaryTableInfo, SummaryTableProps } from "../../types/product";
import { dateFormat } from "../../utils/dateFormat";

const SummaryTable = ({
  productId,
  startDate,
  endDate,
  airline,
  minCount,
}: SummaryTableProps) => {
  const [data] = useState([
    {
      id: productId,
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
      airline: airline,
      minCount: minCount,
    },
  ]);

  const columnHelper = createColumnHelper<SummaryTableInfo>();
  const columns = [
    columnHelper.accessor("id", { header: "상품번호" }),
    columnHelper.accessor("startDate", { header: "출발일시" }),
    columnHelper.accessor("endDate", { header: "도착일시" }),
    columnHelper.accessor("airline", { header: "항공" }),
    columnHelper.accessor("minCount", { header: "최소출발" }),
  ];

  return (
    <Table
      data={data}
      columns={columns}
      tableStyle={"w-[460px] text-[10px] text-sub-black"}
      thStyle={"border-[1px] border-main-color p-[6px]"}
      tbodyStyle={"text-center"}
      tdStyle={"border-[1px] border-main-color p-[6px]"}
    />
  );
};
export default SummaryTable;
