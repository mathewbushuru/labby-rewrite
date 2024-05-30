export type BackendUserType = {
  email: string;
  user_id: number;
  jwtToken: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
}
