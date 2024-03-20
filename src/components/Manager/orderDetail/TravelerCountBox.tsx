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
    <div className={`${style} w-[151px] flex items-center justify-center`}>
      <span>{role}</span>
      <span className="ml-[34px]">{count}</span>
      <span className="font-light ml-[6px]">명</span>
    </div>
  );
};
export default TravelerCountBox;
