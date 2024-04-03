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
      className={`${cellStyle} ${
        header ? "border-r border-sub-black bg-sub-black bg-opacity-[0.05]" : ""
      } ${
        smallHeader ? "bg-[#F5F5F4] w-[84px]" : ""
      } h-[40px] flex items-center justify-center shrink-0 bg-sub-black bg-opacity-[0.05] w-[165px] 
      max-xsm:text-[12px] max-xsm:bg-main-color/[.1] max-xsm:h-auto max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[6px]
      max-xsm:max-w-[70px] max-xsm:tracking-[-0.6px]`}
    >
      <span>{category}</span>
    </div>
  );
};

export default TableHeader;
