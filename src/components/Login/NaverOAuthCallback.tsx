import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseInstance } from "../../api/instance";
import { useSetRecoilState } from "recoil";
import { socialData, loginCheck } from "../../atom/atom";

const NaverOAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setNaverData = useSetRecoilState(socialData);
  const setLoginCheck = useSetRecoilState(loginCheck);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    baseInstance
      .post("/oauth/naver", {
        authorizationCode: code,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.accessToken) {
            console.log(res);
            setLoginCheck(true);
            window.localStorage.setItem("token", res.data.data.accessToken);
            window.localStorage.setItem("role", res.data.data.role);
            window.localStorage.setItem(
              "refreshToken",
              res.data.data.refreshToken
            );
            alert("로그인 완료!");
            navigate("/");
          } else {
            navigate("/easysignup");
            setNaverData(res.data.data);
          }
        }
      });
  }, [location]);

  return null;
};

export default NaverOAuthCallback;
