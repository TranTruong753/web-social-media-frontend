import { FormState, SignupFormSchema } from "@/lib/definitions"
import { loginApi } from "@/services/authServices"
import { redirect } from "next/navigation"



export async function signup(
  state: FormState,
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

  try {
    await loginApi(values) // axios throw nếu lỗi
  } catch (err: any) {
    return {
      values,
      apiError: err.message || "Đăng nhập thất bại", // ✅ thống nhất errors
    }
  }

  return redirect("/")


}



