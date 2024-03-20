const NaverLogin = () => {
  const redirectUri = "http://localhost:3000/naver/oauth"; //Redirect URI
  const STATE = false;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    import.meta.env.VITE_NAVER_CLIENT_ID
  }&state=${STATE}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log(code);
  };

  return <button onClick={handleLogin}>네이버</button>;
};
export default NaverLogin;
