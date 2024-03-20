const ManagerTitle = ({ title, style }: { title: string; style?: string }) => {
  return (
    <h2 className={`${style} text-left text-main-color font-bold mb-9 text-xl`}>
      {title}
    </h2>
  );
};

export default ManagerTitle;
