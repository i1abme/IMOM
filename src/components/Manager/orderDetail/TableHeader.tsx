const TableHeader = ({
  category,
  header,
  smallHeader,
  cellStyle,
}: {
  category: string;
  header?: boolean;
  smallHeader?: boolean;
  cellStyle?: string;
}) => {
  return (
    <div
      className={`${cellStyle ? cellStyle : ""} ${
        header ? "border-r border-sub-black bg-sub-black bg-opacity-[0.05]" : ""
      } ${
        smallHeader ? "bg-[#F5F5F4] w-[84px]" : ""
      } h-[40px] flex items-center justify-center shrink-0 bg-sub-black bg-opacity-[0.05] w-[165px]`}
    >
      <span>{category}</span>
    </div>
  );
};

export default TableHeader;
