// export const $api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// $api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = APP_ROUTES.AUTH;
//     }
//     return Promise.reject(error);
//   }
// );

$api.defaults.headers.common["Accept"] = "application/json";

export const tokenName = "safe_road_token";

export const initApp = () => {
  const token = localStorage.getItem(tokenName);

  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   $api.defaults.headers.common["Accept-Language"] = "ru";
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
  $api.defaults.headers.common.Authorization = ``;
};
