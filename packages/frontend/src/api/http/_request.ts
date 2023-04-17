import {
  HeaderPlayerID,
  HeaderRoomNumber,
  IHttpResp,
  SERVER_BASE_URL,
} from "@werewolf/shared";
import axios, { AxiosRequestConfig } from "axios";
import { showDialog } from "../../signals/dialog";
import { getToken } from "../../utils/token";

export async function request<T = {}>(config: Partial<AxiosRequestConfig>) {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 60000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers[HeaderPlayerID] = token?.id;
      config.headers[HeaderRoomNumber] = token?.roomNumber;
      return config;
    },
    (err) => {
      console.error(err);
    }
  );

  const res = await instance<IHttpResp<T>>(config);

  let errorMsg: string | null = null;
  if (res.status !== 200) {
    // 请求本身状态码不是 200
    errorMsg = "网络错误";
  } else {
    const beData = res.data;
    if (!beData) {
      // 莫名其妙没得到数据？
      errorMsg = "服务器错误";
    } else {
      // 得到了后端数据，但是有后端发现了的问题
      if (beData.status !== 200) {
        errorMsg = beData.msg;
      }
    }
  }

  if (errorMsg !== null) {
    console.error(res);
    showDialog(errorMsg);
    return null;
  } else {
    return res.data.data;
  }
}
