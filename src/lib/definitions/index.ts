import { z } from 'zod'


export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    // .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim().min(1, { message: "Password is required." }),
})

export const ActivateFormSchema = z.object({
  codeId: z.string().trim().min(1, { message: "codeId is required." })
})

export const SendEmailFormSchema = z.object({
  email_forget: z.string().trim().min(1, { message: "Email is required." }).email({ message: 'Please enter a valid email.' }),
})

export const ChangePwFormSchema = z.object({
  password: z.string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
})


export const SignupFormSchema = z.object({
  lastName: z.string().trim().min(1, { message: "Last name is required." }),
  firstName: z.string().trim().min(1, { message: "First name is required." }),
  phone: z.string()
    .regex(/^0\d{9,10}$/, { message: "phone-valid" }),
  birthDate: z.date({
    message: "birthDate",
  }).max(new Date(), { message: "birthDate-max" })
    .refine(
      (date) => {
        const today = new Date();
        const minDate = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDate()
        );
        return date <= minDate;
      },
      { message: "birthDate-required" }
    ).
    nullable(),
  email: z.string().email({ message: 'email-valid' }).trim(),
  gender: z.string(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
})

export type FormSignUpType = z.infer<typeof SignupFormSchema>

export type FormSignInType = z.infer<typeof SigninFormSchema>

export type FormChangePwType = z.infer<typeof ChangePwFormSchema>

export type FormSendEmailType = z.infer<typeof SendEmailFormSchema>;

export type FormActivateType = z.infer<typeof ActivateFormSchema>;

export type FormState =
  | {
    errors?: {
      email?: string[];
      password?: string[];
    }
    value?: {
      email: string;
      password: string;
    }
    message?: string;
  }
  | undefined


type SignupSuccess = {
  success: true;
  message: string;
  values: { id: string;[key: string]: any };
  errors?: {
    lastName?: string[];
    firstName?: string[];
    gender?: string[];
    phone?: string[];
    birthDate?: string[];
    email?: string[];
    password?: string[];

  }
};

type SignupError = {
  success?: boolean;
  message?: string;
  values?: any;
  errors?: {
    lastName?: string[];
    firstName?: string[];
    gender?: string[];
    phone?: string[];
    birthDate?: string[];
    email?: string[];
    password?: string[];

  }
};

// export type SignupState = SignupSuccess | SignupError | undefined;


