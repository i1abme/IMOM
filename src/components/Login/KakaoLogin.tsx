const KakaoLogin = () => {
  const RestApiKey = "99b3ad892a94a312f662b534aef9be75";
  const redirectUri = "http://localhost:3000/oauth"; //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return <button onClick={handleLogin}>카카오</button>;
};
export default KakaoLogin;
