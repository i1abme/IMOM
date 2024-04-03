const TravelerCountBox = ({
  role,
  count,
  style,
}: {
  role: string;
  count: number;
  style?: string;
}) => {
  return (
    <div
      className={`${style} w-[151px] flex items-center justify-center 
      max-xsm:text-[10px] max-xsm:bg-transparent max-xsm:justify-start max-xsm:max-w-[136.5px]`}
    >
      <span
        className="max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px]
      max-xsm:max-w-[68px]"
      >
        {role}
      </span>
      <span className="ml-[34px]">{count}</span>
      <span className="font-light ml-[6px]">명</span>
    </div>
  );
};
export default TravelerCountBox;
