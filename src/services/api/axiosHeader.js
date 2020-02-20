export default function axiosHeader(getState) {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
