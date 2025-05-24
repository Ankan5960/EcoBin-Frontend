import { ILoginRequest, ILoginResponse } from "@/pages/login-page/login.model";
import axios from "axios";

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  const res = await axios.post(
    `${import.meta.env.VITE_ECOBIN_AUTH_SERVICE}/user-auth/Auth/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};