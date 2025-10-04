//-------------------------------------------- API query -----------------------------------------

import Axios, { AxiosResponse } from "axios";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3011";

const getAccessTokenSilent = async () => {
  //TODO: implement real auth
  return "******";
};

export async function serverAPIWithAuthPost<T = any>(
  endpoint: string,
  body: Record<string, unknown | undefined>
): Promise<AxiosResponse<T>> {
  const token = await getAccessTokenSilent();
  return Axios.post(endpoint, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function serverAPIWithAuthPut<T = any>(
  endpoint: string,
  body: Record<string, unknown | undefined>
): Promise<AxiosResponse<T>> {
  const token = await getAccessTokenSilent();
  return Axios.put(endpoint, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function serverAPIWithAuthDeleteNoBody<T = any>(endpoint: string): Promise<T> {
  const token = await getAccessTokenSilent();
  return Axios.delete(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function serverAPIWithAuthDelete<T = any>(
  endpoint: string,
  body: Record<string, unknown | undefined>
): Promise<AxiosResponse<T>> {
  const token = await getAccessTokenSilent();
  return Axios.delete(endpoint, {
    data: body,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function serverAPIwithAuthGet<T = any>(
  endpoint: string,
  query: Record<string, any>
): Promise<AxiosResponse<T>> {
  const token = await getAccessTokenSilent();
  const params = new URLSearchParams(query);
  return Axios.get(endpoint + "?" + params.toString(), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function serverAPIwithAuthGetNoQuery<T = any>(endpoint: string): Promise<AxiosResponse<T>> {
  // eslint-disable-next-line no-useless-catch
  const token = await getAccessTokenSilent();

  return Axios.get(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
