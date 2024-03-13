interface ModalProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordEditModal = ({ setModalActive }: ModalProps) => {
  return (
    <div className="absolute centerPosition h-96 bg-main-color w-1/2 rounded-2xl ">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex justify-between">
          <div>현재 비밀번호</div>
          <input />
          <button>
            <span>인증</span>
          </button>
        </div>
        <div className="flex">
          <div>변경할 비밀번호</div>
          <input />
        </div>
        <div className="flex">
          <div>비밀번호 확인</div>
          <input />
        </div>
        <button>
          <span>변경하기</span>
        </button>
        <button>
          <span onClick={() => setModalActive(false)}>닫기</span>
        </button>
      </div>
    </div>
  );
};

export default PasswordEditModal;
