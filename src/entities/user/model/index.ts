export type UserApi = {
  id: number;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

export type UserModel = {
  id: number;
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

export enum Role {
  admin = 'admin',
  user = 'user',
  guest = 'guest'
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
