import { LoginForm } from "@/lib/type";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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