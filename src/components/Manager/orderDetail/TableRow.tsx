import TableHeader from "./TableHeader";

const TableRow = ({
  category,
  header,
  headerStyle,
  content,
  rowStyle,
}: {
  category: string;
  header?: boolean;
  headerStyle?: string;
  content: string | number;
  rowStyle?: string;
}) => {
  return (
    <div className={`${rowStyle && rowStyle} flex w-full items-center`}>
      <TableHeader
        category={category}
        header={header}
        cellStyle={headerStyle || ""}
      />
      <div className="px-[24px] flex shrink-0">{content}</div>
    </div>
  );
};
export default TableRow;
