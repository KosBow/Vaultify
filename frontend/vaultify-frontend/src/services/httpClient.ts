import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

type ApiProblem = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
  traceId?: string;
};

export type ApiError = {
  message: string;
  status: number | null;
  errors: Record<string, string[]> | null;
  traceId: string | null;
};

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<ApiProblem>) => {
    const problem = error.response?.data;

    if (problem?.title) {
      const message =
        problem.detail ||
        problem.title ||
        "Unexpected server error";

      const apiError: ApiError = {
        message,
        status: problem.status ?? error.response?.status ?? null,
        errors: problem.errors ?? null,
        traceId: problem.traceId ?? null,
      };

      return Promise.reject(apiError);
    }

    const apiError: ApiError = {
      message: error.message || "Network error",
      status: error.response?.status ?? null,
      errors: null,
      traceId: null,
    };

    return Promise.reject(apiError);
  }
);