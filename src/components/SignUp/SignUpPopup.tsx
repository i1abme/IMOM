import "./signUpPopup.css";

type SignUpPopUpType = {
  message: string | undefined;
};

const SignUpPopup = ({ message }: SignUpPopUpType) => {
  return (
    <div className="flex justify-center items-center absolute -right-64 max-xsm:right-0">
      <img src="/icon_cancel.svg" />
      <div className="balloon whitespace-nowrap max-xsm:hidden">
        {message ? message : "잘못 된 형식"}
      </div>
    </div>
  );
};

export default SignUpPopup;
