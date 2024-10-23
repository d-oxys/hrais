import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from "axios";
import { getSession } from "next-auth/react";
import { message } from "antd";

export interface HttpConfig {
  onExpiredToken?: (originalRequest: any) => void;
}

export type HttpMethodsType = "get" | "post" | "put" | "delete" | "patch";

export type HttpRequestConfig = AxiosRequestConfig & {
  method?: HttpMethodsType;
  url: string;
  data?: any;
  params?: any;
  headers?: any;
};

export type HttpResponse<T = any> = AxiosResponse<T>;

export type HeaderProperties = HeadersDefaults & {
  Authorization?: string;
};

export interface RequestCallback {
  onError?: (error: AxiosError) => void;
  onSuccess?: (res: AxiosResponse) => void;
}

export class Http {
  private readonly instance: AxiosInstance;

  constructor({ onExpiredToken = () => null }: HttpConfig = {}) {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.instance.interceptors.request.use(
      async (config) => {
        const session: any = await getSession();
        // console.log("session:", session);
        // console.log(session.accessToken);
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session?.accessToken}`;
        }

        if (typeof window === "undefined") {
          const { cookies } = await import("next/headers");
          const token = cookies().get("token");

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (typeof error.response.data?.message === "string") {
          message.error(error.response.data?.message);
        } else {
          let msg: string[] = [];
          for (const field in error.response.data?.message) {
            if (error.response.data?.message.hasOwnProperty(field)) {
              const messages = error.response.data?.message[field];
              messages.forEach((message: string) => {
                msg.push(message);
              });
            }
          }
          message.error(msg.join(", "));
        }
        return Promise.reject(error);
      }
    );
  }

  public async request(
    config: HttpRequestConfig,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    try {
      const axiosConfig: any = {
        method: config.method,
        url: config.url,
      };
      if (config.data) {
        axiosConfig.data = config.data;
      }
      if (config.params) {
        axiosConfig.params = config.params;
      }
      if (config.headers) {
        axiosConfig.headers = config.headers;
      }
      const response = await this.instance(axiosConfig);

      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (error: unknown) {
      if (onError && error instanceof AxiosError) {
        onError(error);
      }
      throw error;
    }
  }

  public async post(
    url: string,
    data: any,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "post",
      },
      { onSuccess, onError }
    );
  }

  public async put(
    url: string,
    data: any,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "put",
      },
      { onSuccess, onError }
    );
  }

  public async patch(
    url: string,
    data: any,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "patch",
      },
      { onSuccess, onError }
    );
  }

  public async remove(
    url: string,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        method: "delete",
      },
      { onSuccess, onError }
    );
  }

  public async get(
    url: string,
    params?: any,
    {
      onSuccess = () => null,
      onError = (error: AxiosError) => error,
    }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        params: { ...params },
        method: "get",
      },
      { onSuccess, onError }
    );
  }
}

export default Http;
