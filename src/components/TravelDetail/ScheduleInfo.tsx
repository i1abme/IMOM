import UiViewer from "../common/Editor/UiViewer";

type SchdeuleInfo = {
  info: string;
};
const ScheduleInfo = ({ info }: SchdeuleInfo) => {
  return (
    <div
      className="border-main-color border-[1px] rounded-[40px] w-[756px] min-h-[200px] py-[25px] px-[45px]
    max-xsm:w-full max-xsm:max-w-[342px] max-xsm:rounded-[22px] max-xsm:py-[30px] max-xsm:px-[16px]"
    >
      <UiViewer content={info} />
    </div>
  );
};

export default ScheduleInfo;
