type ProductInfoProps = {
  info1: string | number;
  info2?: string | number;
};

const ProductInfo = ({ info1, info2 }: ProductInfoProps) => {
  return (
    <div
      className="flex flex-col gap-[20px] w-[690px] 
    max-xsm:w-full max-xsm:max-w-[342px] max-xsm:rounded-[22px] max-xsm:border-[0.5px] 
    max-xsm:border-main-color max-xsm:text-[12px] max-xsm:p-[20px] max-xsm:gap-[10px]"
    >
      {info2 && <span className="flex shrink-0"> 포함 </span>}
      <div
        className="flex flex-col shrink-0 gap-[20px] text-[14px] leading-[16px] 
      max-xsm:text-[12px] max-xsm:tracking-[-0.6px]"
      >
        {typeof info1 === "string" &&
          info1.split("<br>").map((content, idx) => (
            <p
              key={`${content}_${idx}`}
              className="flex flex-shrink-0 h-fit max-w-[690px]"
            >
              {content}
            </p>
          ))}
      </div>
      {info2 && (
        <>
          <span className="flex shrink-0"> 불포함 </span>
          <div
            className="flex flex-col shrink-0 gap-[20px] text-[14px] leading-[16px] 
          max-xsm:text-[12px] max-xsm:tracking-[-0.6px]"
          >
            {typeof info2 === "string" &&
              info2.split("<br>").map((content, idx) => (
                <p
                  key={`${content}_${idx}`}
                  className="flex flex-shrink-0 h-fit max-w-[690px]"
                >
                  {content}
                </p>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
