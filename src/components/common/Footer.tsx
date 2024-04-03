import Logo from "/public/logo.svg";
const Footer = () => {
  return (
    <footer
      className="h-[200px] bg-black bg-opacity-[0.01] flex justify-center 
    w-full shrink-0 items-center text-[12px] flex-grow-0 max-xsm:hidden"
    >
      <div className="flex justify-between w-[800px] items-center shrink-0">
        <div
          className="w-[224px] h-[70px] bg-center bg-cover flex shrink-0"
          style={{
            backgroundImage: `url(${Logo})`,
          }}
        />
        <div className="flex flex-col">
          <div className="flex flex-col shrink-0">
            <div className="flex gap-[24px]">
              <span>상호명</span>
              <span>주식회사 우리엘</span>
            </div>
            <div className="flex gap-[24px]">
              <span>대표자</span>
              <span>임영택</span>
            </div>
            <div className="flex gap-[24px]">
              <span>고객센터</span>
              <span>070-4151-9444</span>
            </div>
          </div>
          <div className="flex gap-[24px]">
            <span>통신 판매업 신고 번호</span>
            <span>2024-서울종로-0144</span>
          </div>
        </div>
        <div className="flex flex-col shrink-0">
          <div className="flex gap-[24px]">
            <span>사업자등록번호</span>
            <span>101-86-52896</span>
          </div>
          <div className="flex gap-[24px]">
            <span>사업장</span>
            <span>서울특별시 종로구 새문안로 91, 5층 514호</span>
          </div>
          <div className="flex gap-[24px]">
            <span>e-mail</span>
            <span>urieltour@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
