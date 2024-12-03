import NetworkStore from '@entities/network';
import { action, computed, makeObservable, observable } from 'mobx';

import { UserApiReqCreate, UserApiReqLogin, UserApiReqUpdate, UserModel } from '../model';

type PrivateFields = '_user';

class UserStore {
  private _user: UserModel | null = null;
  readonly network = new NetworkStore();

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable,
      user: computed,
      isLogin: computed,
      getUser: action,
      createUser: action,
      updateUser: action,
      loginUser: action,
      logoutUser: action,
    });
  }

  get user(): UserModel {
    return this._user;
  }

  get isLogin(): boolean {
    return this._user !== null;
  }

  async getUser(): Promise<void> {

  }

  async createUser(data: UserApiReqCreate): Promise<void> {

  }

  async updateUser(data: UserApiReqUpdate): Promise<void> {

  }

  async loginUser(data: UserApiReqLogin): Promise<void> {

  }

  async logoutUser(): Promise<void> {

  }
}

export default UserStore;
