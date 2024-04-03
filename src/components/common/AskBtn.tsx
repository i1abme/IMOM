declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
const AskBtn = () => {
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
    <div className="h-[70px] w-[61.5px] fixed right-[12vw] bg-white float-right mt-[216px] z-50 bg-cover rounded-[12.2px] max-xsm:hidden">
      <button id="chat-channel-button" onClick={openChatChannel}>
        <img src="/icon_ask.svg" alt="카카오톡 채널 채팅하기 버튼" />
      </button>
    </div>
  );
};

export default AskBtn;
