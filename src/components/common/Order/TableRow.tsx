import TableHeader from "./TableHeader";

const TableRow = ({
  category,
  header,
  headerStyle,
  content,
  rowStyle,
  contentStyle,
}: {
  category: string;
  header?: boolean;
  headerStyle?: string;
  content: string | number;
  rowStyle?: string;
  contentStyle?: string;
}) => {
  return (
    <div className={`${rowStyle && rowStyle} flex items-center w-full`}>
      <TableHeader
        category={category}
        header={header}
        cellStyle={headerStyle || ""}
      />
      <div
        className={`${contentStyle} px-[24px] flex shrink-0 max-xsm:text-[10px] max-xsm:px-[8px]`}
      >
        {content}
      </div>
    </div>
  );
};
export default TableRow;
