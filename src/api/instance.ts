import axios from "axios";

export const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    Refresh: window.localStorage.getItem("refreshToken"),
  },
});

// 토큰 갱신 함수
const getNewToken = async () => {
  try {
    await userInstance.patch(`/auth/reissue`).then((res) => {
      window.localStorage.setItem("refreshToken", res.headers.refreshToken); // 리프레시토큰도 재발급?
      window.localStorage.setItem("token", res.headers.accessToken);
    });
    return window.localStorage.getItem("token");
  } catch (error) {
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("token");
    throw new Error("Token refresh failed");
  }
};

userInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { config, response } = error;
    if (
      config.url === `/auth/reissue` ||
      response?.status !== 401 || // 추후 상태 코드수정 예정
      config.sent
    ) {
      return Promise.reject(error);
    }

    config.sent = true;
    const newToken = await getNewToken();
    if (newToken) {
      config.headers["Authorization"] = `Bearer ${newToken}`;
    }
    return userInstance(config);
  }
);
