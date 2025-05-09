export type TUser = {
  _id: string;
  email: string;
  image: string;
  name: string;
  userName: string;
  phone: string;
  role: string;
};

export type UserState = {
  user: null | TUser;
  token: null | string;
};

export type TUpdateData = {
  name: string;
  phone: string;
  userName: string;
  image?: string;
};
