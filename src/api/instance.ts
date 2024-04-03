import axios from "axios";

export const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

userInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers["Refresh"] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토큰 갱신 함수
const getNewToken = async () => {
  try {
    await userInstance
      .patch(
        "/auth/reissue",
        {},
        {
          headers: { Refresh: window.localStorage.getItem("refreshToken") },
        }
      )
      .then((res) => {
        console.log("refreshToken", res.headers.refreshToken);
        window.localStorage.setItem("refreshToken", res.headers.refreshToken); // 리프레시토큰도 재발급
        window.localStorage.setItem("token", res.headers.accessToken);
      });
    return window.localStorage.getItem("token");
  } catch (error) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("admin");
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
      config.url === "/auth/reissue" ||
      response?.data?.message !== "토큰 유효 시간이 만료되었습니다." ||
      config.retry
    ) {
      console.log(response);
      return Promise.reject(error);
    }

    config.retry = true;
    const newToken = await getNewToken();
    if (newToken) {
      config.headers["Authorization"] = `Bearer ${newToken}`;
    }
    return userInstance(config);
  }
);
