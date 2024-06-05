export type UserType = {
  email: string;
  hashed_password: string;
  user_id: number;
  firstName: string;
  lastName: string;
  created_at: string;
};

export type NewUserType = {
  email: string;
  hashed_password: string;
  firstName: string;
  lastName: string;
};

export type UserLoginRequestType = {
  email: string;
  password: string;
};

export type UserLoginSuccessResponseType = Omit<UserType, "hashed_password"> & {
  jwtToken: string;
  message: string;
};
