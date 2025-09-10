import { FormState, SignupFormSchema } from "@/lib/definitions"
import { loginApi } from "@/services/authServices"
import { useNotifications } from "@toolpad/core";
import { error } from "console";
import { redirect } from "next/navigation"

const callApiLogin = (values: any) => {
  return setTimeout(async () => {
    try {
      const res = await loginApi(values) // axios throw nếu lỗi
      if (res?.status) {
        return { success: true, message: "Đăng nhập thành công!" };
      }

      return { success: true, message: "CÓ lỗi gì đang xảy ra! chúng tôi sẽ khác phục sớm" };


    } catch (err: any) {
      return {
        values,
        success: false,
        message: err.message || "Đăng nhập thất bại!", // ✅ thống nhất errors
      }
    }

  }, 5000);
}

export async function signup(
  _: FormState,
  formData: FormData
) {

  const values = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = SignupFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    }
  }
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  try {
    await sleep(2000);
    const res = await loginApi(values) // axios throw nếu lỗi
    if (res?.status) {
      return { success: true, message: "Đăng nhập thành công!" };
    }
    return { success: true, message: "CÓ lỗi gì đang xảy ra! chúng tôi sẽ khác phục sớm" };
  } catch (err: any) {
    return {
      values,
      success: false,
      message: err.message || "Đăng nhập thất bại!", // ✅ thống nhất errors
    }
  }




}



