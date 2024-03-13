const Container = ({ containerStyle }: { containerStyle?: string }) => {
  return (
    <div
      className={`w-full h-auto flex flex-col py-[216px] ${
        containerStyle ?? containerStyle
      }`}
    ></div>
  );
};
export default Container;
