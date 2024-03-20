interface ProductTitle {
  title: string;
  className: string;
}
const ProductTitle = ({ title, className }: ProductTitle) => {
  return (
    <div
      className={`w-40 flex bg-title-box justify-center items-center border-collapse border-black ${className}`}
    >
      {title}
    </div>
  );
};

export default ProductTitle;
