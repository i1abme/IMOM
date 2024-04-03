const SectionTitle = ({
  title,
  padding,
  titleStyle,
}: {
  title: string;
  padding?: boolean;
  titleStyle?: string;
}) => {
  return (
    <div className={`${!padding ? "pl-[8px]" : ""} flex flex-col self-start`}>
      <hr className="border-main-color w-[50px] border-[2px] max-xsm:border-none max-xsm:bg-main-color max-xsm:h-[3px]" />
      <h2
        className={`${titleStyle} text-main-color text-[20px] font-bold 
        max-xsm:font-medium max-xsm:text-sub-black max-xsm:text-[18px]`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
