import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseInstance } from "../../api/instance";
import { useSetRecoilState } from "recoil";
import { socialData } from "../../atom/atom";

const KakaoOAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setKaKaoData = useSetRecoilState(socialData);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    baseInstance
      .post("/oauth/kakao", {
        authorizationCode: code,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          if (res.data.data.accessToken) {
            window.localStorage.setItem("token", res.data.data.accessToken);
            window.localStorage.setItem(
              "refreshToken",
              res.data.data.refreshToken
            );
            alert("로그인 완료!");
            navigate("/");
          } else {
            navigate("/easysignup");
            setKaKaoData(res.data.data);
          }
        }
      });
  }, [location]);

  return null;
};

export default KakaoOAuthCallback;
