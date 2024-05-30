export type UserType = {
  email: string;
  hashed_password: string;
  user_id: number;
};

export type NewUserType = {
  email: string;
  hashed_password: string;
  user_id?: number;
};
