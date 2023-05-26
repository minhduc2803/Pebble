export type User = {
  id: number;
  fullName: string;
  email: string;
  token: string;
};

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};
