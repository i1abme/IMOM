const KakaoLogin = () => {
  const redirectUri = "http://localhost:3000/kakao/oauth"; //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log(code);
  };

  return <button onClick={handleLogin}>카카오</button>;
};
export default KakaoLogin;
