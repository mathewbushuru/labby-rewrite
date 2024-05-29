export type UserType = {
  email: string;
  password: string;
  user_id: number;
};

export type NewUserType = {
  email: string;
  password: string;
  user_id?: number;
};
