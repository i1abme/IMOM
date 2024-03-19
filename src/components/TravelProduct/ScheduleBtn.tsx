import IconDown from "/public/icon_down.svg";

const ScheduleBtn = ({
  showSchedule,
  handleScheduleBtn,
}: {
  showSchedule: boolean;
  handleScheduleBtn: () => void;
}) => {
  return (
    <button
      type="button"
      className="w-[173px] h-[37px] border-[1px] border-main-color text-[14px] flex items-center justify-center gap-[4px]"
      onClick={handleScheduleBtn}
    >
      <span>{showSchedule ? "일정 확인" : "일정 확인"}</span>
      <img
        src={IconDown}
        className={`${
          showSchedule
            ? "rotate-180 transition-transform duration-1000 ease-in-out"
            : "rotate-0 transition-transform duration-1000 ease-in-out"
        }`}
      />
    </button>
  );
};
export default ScheduleBtn;
