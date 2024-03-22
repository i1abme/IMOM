const NaverLogin = () => {
  const redirectUri = "http://localhost:3000/naver/oauth"; //Redirect URI
  const STATE = false;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    import.meta.env.VITE_NAVER_CLIENT_ID
  }&state=${STATE}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <img
      className="h-1/2 w-1/2 mt-5 cursor-pointer"
      src="/naverLogo.png"
      onClick={handleLogin}
    />
  );
};
export default NaverLogin;
