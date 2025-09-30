import { ActiveForm, LoginForm, SignupForm } from "@/lib/type";
import axios, { AxiosError } from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (data: LoginForm) => {
  return await axios
    .post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    })

}

export const signupApi = async (data: SignupForm) => {
  return await axios
    .post(`${API_URL}/auth/register`, data)
}

export const activateAccountApi = async (data: ActiveForm) => {
  return await axios
    .post(`${API_URL}/auth/check-code`, data)
}

export const resendCodeApi = async (id: string) => {
  return await axios
    .post(`${API_URL}/auth/resend-code`, { id })
}

export const forgetPassword = async (email: string) => {
  return await axios
    .post(`${API_URL}/auth/forget-password`, { email })
}

export const changePassword = async (id: string, codeId: string, password: string) => {
  return await axios
    .post(`${API_URL}/auth/change-password`, { id, codeId, password })
}

