
export type UserType = {
  username: string;
  password: string;
  email?: string;
  bio?: string;
  avatar?: string;
  birthDate?: Date;
  phone?: string;
  role: string;
  isActive?: boolean;
  isOnline?: boolean;
  isDeleted?: boolean;
  codeId: string;
  codeExpired: Date;
  tokenHash: string
}