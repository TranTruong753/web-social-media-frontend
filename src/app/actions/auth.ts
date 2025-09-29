import { FormState, SigninFormSchema } from "@/lib/definitions"
import {  sleep } from "@/lib/utils"
import {  loginApi } from "@/services/authServices"


export async function signin(
  _: FormState,
  formData: FormData
) {

  const values = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = SigninFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    }
  }

  try {
    await sleep(2000);
    const res = await loginApi(values) // axios throw nếu lỗi
    if (res?.status) {
      return {
        values,
        success: true,
        message: "Đăng nhập thành công!"
      };
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

// export async function signup(
//   _: any,
//   formData: FormData
// ) : Promise<SignupState>
//  {
//   const values = {
//     lastName: formData.get('lastName') as string,
//     firstName: formData.get('firstName') as string,
//     gender: formData.get('gender') as string,
//     phone: formData.get('phone') as string,
//     birthDate: formData.get('birthDate') as string ? parseDDMMYYYY(formData.get('birthDate') as string) : "",
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const validatedFields = SignupFormSchema.safeParse(values)

  
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       values,
//     }
//   }


//   const formatValues = {
//     username: `${values.lastName} ${values.firstName}`,
//     password: values.password,
//     email: values.email,
//     birthDate: values.birthDate,
//     gender: values.gender,
//     phone: values.phone,
//   }

//   const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//   try {
//     await sleep(2000);
//     const res = await signupApi(formatValues) // axios throw nếu lỗi
//     if (res?.status) {
//       console.log("res", res)
//       return {
//         values: { id: res.data.user.id, ...values },
//         success: true,
//         message: "Điền thông tin thành công!"
//       };
//     }
//     return { success: true, message: "CÓ lỗi gì đang xảy ra! chúng tôi sẽ khác phục sớm" };
//   } catch (err: any) {
//     return {
//       values,
//       success: false,
//       message: err.message || "Điền thông tin thất bại!", // ✅ thống nhất errors
//     }
//   }

// }

