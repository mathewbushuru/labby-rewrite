export type BackendUserType = {
  email: string;
  user_id: number;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = BackendUserType & {
  message: string;
  jwtToken: string;
};

export type SignupRequestType = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
