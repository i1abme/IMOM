import SortIcon from "../../../public/icon_down.svg";
import { ManagerColumns, OrderList } from "../../types/manager";

const ManagerTable = ({
  data,
  columns,
  navigateId,
  handleTableRow,
  sortState,
}: {
  data: OrderList[];
  columns: ManagerColumns<OrderList>;
  navigateId: string;
  handleTableRow: (orderId: string) => void;
  sortState?: { [key: string]: number | null };
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-black">
      <thead className="bg-[rgba(0,0,0,0.1)] h-[45px] 2sm:h-[50px]">
        <tr>
          {columns.map((item) =>
            item.sortable ? (
              <th
                className="p-2 border border-black"
                key={item.key}
                onClick={item.onClick}
              >
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  {item.label}
                  <img
                    src={SortIcon}
                    className={`${
                      sortState && sortState[item.key] === 1
                        ? "rotate-180 transition-transform duration-300 ease-in-out"
                        : "rotate-0 transition-transform duration-300 ease-in-out"
                    }`}
                  />
                </span>
              </th>
            ) : (
              <th className="p-2 border border-black" key={item.key}>
                {item.label}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((list, idx) => (
          <tr
            className={`h-[45px] text-center whitespace-nowrap ${
              list[navigateId as keyof typeof list]
                ? "cursor-pointer"
                : "cursor-default"
            }`}
            key={`manager_${idx}`}
            onClick={() =>
              handleTableRow(`${list[navigateId as keyof typeof list]}` ?? "")
            }
          >
            {list &&
              columns.map((item) => (
                <td
                  className="border-black p-2 border"
                  key={
                    list[item.key as keyof typeof list]
                      ? list[item.key as keyof typeof list]
                      : `empty_${item.key}_${idx}`
                  }
                >
                  {item.render && list[item.key as keyof typeof list]
                    ? item.render(list[item.key as keyof typeof list])
                    : list[item.key as keyof typeof list]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ManagerTable;
