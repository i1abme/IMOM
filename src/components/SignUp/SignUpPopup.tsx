import "./signUpPopup.css";

type SignUpPopUpType = {
  message: string | undefined;
};

const SignUpPopup = ({ message }: SignUpPopUpType) => {
  return (
    <div className="flex justify-center items-center absolute -right-44">
      <img src="/X체크.svg" />
      <div className="balloon">{message ? message : "잘못 된 형식"}</div>
    </div>
  );
};

export default SignUpPopup;
