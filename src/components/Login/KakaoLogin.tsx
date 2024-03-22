const KakaoLogin = () => {
  const redirectUri = "http://localhost:3000/kakao/oauth"; //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <img
      className="h-1/2 w-1/2 mt-5 cursor-pointer"
      onClick={handleLogin}
      src="/kakao_login_large_narrow.png"
    />
  );
};
export default KakaoLogin;
