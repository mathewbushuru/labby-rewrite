export type UserType = {
  userId: number;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type NewUserType = Omit<UserType, "userId" | "createdAt">;

export type UserLoginRequestType = {
  email: string;
  password: string;
};

export type UserLoginSuccessResponseType = Omit<UserType, "hashedPassword"> & {
  jwtToken: string;
  message: string;
};
