import { Link } from "react-router-dom";
import Logo from "/public/sublogo.svg";
import IconAsk from "/public/icon_mb_ask.svg";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const MbHeader = () => {
  const openChatChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: "_ZeUTxl",
      });
    } else {
      console.error("Kakao SDK가 로드되지 않았습니다.");
    }
  };
  return (
    <div className="w-full h-[65px] bg-white fixed z-50 top-0 hidden max-xsm:flex items-center justify-center px-[20px]">
      <div className="flex justify-center items-center w-full">
        <Link to="/" className="w-[167px] h-[44px] flex">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <button
        id="chat-channel-button"
        onClick={openChatChannel}
        className="flex flex-col justify-center items-center shrink-0"
      >
        <img src={IconAsk} alt="askicon" className="w-[32px] h-[30px]" />
        <span className="text-[9px] text-sub-black">문의하기</span>
      </button>
    </div>
  );
};

export default MbHeader;
