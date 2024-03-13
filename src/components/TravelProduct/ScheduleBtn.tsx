type ScheduleBtnProps = {
  showSchedule: boolean;
  handleScheduleBtn: () => void;
};

const ScheduleBtn = ({ showSchedule, handleScheduleBtn }: ScheduleBtnProps) => {
  return (
    <button
      type="button"
      className="w-[173px] h-[37px] border-[1px] border-main-color text-[14px]"
      onClick={handleScheduleBtn}
    >
      {showSchedule ? "일정 확인 🔼" : "일정 확인  🔽"}
    </button>
  );
};
export default ScheduleBtn;
