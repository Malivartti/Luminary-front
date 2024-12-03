export type UserApi = {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export type UserModel = {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export const normalizeUser = (raw: UserApi): UserModel => ({
  ...raw,
});

export type UserApiReqCreate = {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export type UserApiReqUpdate = {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export type UserApiReqLogin = {
  email: string;
  password: string;
}
