export type UserType = {
  email: string;
  hashed_password: string;
  user_id: number;
};

export type NewUserType = {
  email: string;
  hashed_password: string;
};

export type UserLoginRequestType = {
  email: string;
  password: string;
};

export type UserLoginSuccessResponseType = Omit<UserType, "hashed_password"> & {
  jwtToken: string;
  message: string;
};
