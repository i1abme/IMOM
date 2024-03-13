type ProductInfoProps = {
  info1: string | number;
  info2?: string | number;
};

const ProductInfo = ({ info1, info2 }: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-[20px] w-[690px]">
      <div>{info1}</div>
      {info2 && <div>{info2}</div>}
    </div>
  );
};

export default ProductInfo;
