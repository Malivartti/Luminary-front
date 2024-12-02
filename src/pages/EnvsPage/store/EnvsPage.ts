import envsStore from '@entities/envs';
import { EnvApiReqCreate } from '@entities/envs/models';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_title' | '_titleError' | '_description' | '_isOpenModal'

class EnvsPageStore {
  private _title: string = '';
  private _titleError: string = '';
  private _description: string = '';
  private _isOpenModal: boolean = false;

  constructor() {
    makeObservable<EnvsPageStore, PrivateFields>(this, {
      _title: observable,
      _titleError: observable,
      _description: observable,
      _isOpenModal: observable,
      title: computed,
      titleError: computed,
      description: computed,
      isOpenModal: computed,
      isLoading: computed,
      setTitle: action.bound,
      setDescription: action.bound,
      setIsOpenModal: action.bound,
      validateTitle: action,
      validate: action,
    });
  }

  get title(): string {
    return this._title;
  }

  get titleError(): string {
    return this._titleError;
  }

  get description(): string {
    return this._description;
  }

  get isOpenModal(): boolean {
    return this._isOpenModal;
  }

  get isLoading(): boolean {
    return envsStore.isLoading;
  }

  setTitle(title: string): void {
    if (this._titleError) {
      this._titleError = '';
    }
    this._title = title;
  }

  setDescription(description: string): void {
    this._description = description;
  }

  setIsOpenModal(isOpenModal: boolean): void {
    this._isOpenModal = isOpenModal;
  }

  validateTitle(): boolean {
    if (!this._title.trim()) {
      this._titleError = 'Введите заголовок';
      return;
    }
    return true;
  }

  validate(): boolean {
    const isValidTitle = this.validateTitle();

    return isValidTitle;
  }

  async createEnv(): Promise<void> {
    if (!this.validate()) return;

    const data: EnvApiReqCreate = {
      title: this._title,
      description: this._description,
    };

    await envsStore.createEnv(data);
  }
}

export default EnvsPageStore;