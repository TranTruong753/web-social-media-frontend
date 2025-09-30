
export type UserType = {
  username: string;
  password: string;
  email?: string;
  bio?: string;
  avatar?: string;
  birthDate?: Date;
  gender?: string;
  phone?: string;
  role: string;
  isActive?: boolean;
  isOnline?: boolean;
  isDeleted?: boolean;
  codeId: string;
  codeExpired: Date;
  tokenHash: string
}

export type LoginForm = {
  password: string;
  email: string;
}

export type ActiveForm = {
  id: string | null,
  codeId: string
}


export type SignupForm = {
  username: string;
  password: string;
  email: string;
  birthDate: string | Date | null;
  gender?: string;
  phone: string;
}

export interface InactiveAccountError {
  message: string;
  userId: string;
}

export interface ConflictExceptionSignUP {
  message: string;
  field: string;
}