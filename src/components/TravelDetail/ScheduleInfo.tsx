type SchdeuleInfo = {
  info: string | HTMLElement;
};
const ScheduleInfo = ({ info }: SchdeuleInfo) => {
  return (
    <div className="border-main-color border-[1px] rounded-[40px] w-[756px] min-h-[200px] py-[25px] px-[45px]">
      {info && <div></div>}
    </div>
  );
};

export default ScheduleInfo;
