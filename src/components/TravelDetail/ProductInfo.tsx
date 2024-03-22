type ProductInfoProps = {
  info1: string | number;
  info2?: string | number;
};

const ProductInfo = ({ info1, info2 }: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-[20px] w-[690px]">
      {info2 && <span className="flex shrink-0"> 포함 </span>}
      <div className="flex shrink-0 gap-[20px]">{info1}</div>
      {info2 && (
        <>
          <span className="flex shrink-0"> 불포함 </span>
          <div className="flex shrink-0 gap-[20px]">{info2}</div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
