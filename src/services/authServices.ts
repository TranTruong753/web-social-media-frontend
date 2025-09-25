import { ActiveForm, LoginForm, SignupForm } from "@/lib/type";
import axios, { AxiosError } from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (data: LoginForm) => {
  try {
    const res = await axios
      .post(`${API_URL}/auth/login`, data, {
        withCredentials: true,
      })

    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
    throw error
  }

}

export const signupApi = async (data: SignupForm) => {
  try {
    const res = await axios
      .post(`${API_URL}/auth/register`, data)

    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "register failed")
    }
    throw error
  }
}

export const activateAccountApi = async (data: ActiveForm) => {
  try {
    const res = await axios
      .post(`${API_URL}/auth/check-code`, data)

    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Activate failed")
    }
    throw error
  }
}

export const resendCodeApi = async (id: string) => {
  try {
    const res = await axios
      .post(`${API_URL}/auth/resend-code`, { id })

    return res
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Resend code failed")
    }
    throw error
  }
}

export const forgetPassword = async (email: string) => {
  return await axios
      .post(`${API_URL}/auth/forget-password`, { email })
}

export const changePassword = async (id : string, codeId : string, password : string) => {
    return await axios
      .post(`${API_URL}/auth/change-password`, { id, codeId, password })
}