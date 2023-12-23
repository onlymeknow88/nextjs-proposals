import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url, method, data, token, serverToken,
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const resCookie = await axios.get('/api/session');

    const x = JSON.parse(resCookie.data.x);

    const tokenCookies = JSON.parse(atob(x.tokens));

    if (tokenCookies) {
      const passportToken = tokenCookies;
      headers = {
        Authorization: `Bearer ${passportToken}`,
        'Content-Type': 'multipart/form-data',
      };
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: response.data.data,
    };
    return res;
  }

  const { length } = Object.keys(response.data);
  const res = {
    error: false,
    message: 'success',
    data: length > 1 ? response.data : response.data.data,
  };

  return res;
}
