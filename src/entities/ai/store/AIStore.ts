import NetworkStore from '@entities/network';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '../api';
import { ContextApi, ContextModel, normalizeContext, normalizePrompt, PromptApi, PromptApiReq } from '../model';

type PrivateFields = '_context' | '_responce';

class AIStore {
  private _context: ContextModel[] | null = null;
  private _responce: string = '';
  readonly network = new NetworkStore();

  constructor() {
    makeObservable<AIStore, PrivateFields>(this, {
      _context: observable,
      _responce: observable,
      context: computed,
      getContext: action,
      generate: action,
      prompt: action,
    });
  }

  get context(): ContextModel[] {
    return this._context;
  }

  get responce() {
    return this._responce;
  }

  async generate(id: string | number, data: PromptApiReq) {
    this.network.loading();
    const url = endpoints.generate(id);

    try {
      const res: AxiosResponse<PromptApi> = await axios.post(url, {
        data,
      });
      runInAction(() => {
        this._responce = normalizePrompt(res.data).responce;
        this.network.success();
      });
    } catch (e) {
      runInAction(() => {
        this.network.error('Не удалось сгенерировать');
      });
      console.log(e);
    }
  }

  async prompt(id: string | number, data: PromptApiReq) {
    this.generate(id, data);
  }

  async getContext(id: string | number) {
    this.network.loading();
    const url = endpoints.getContext(id);

    try {
      const res: AxiosResponse<ContextApi[]> = await axios.get(url);
      runInAction(() => {
        this._context = normalizeContext(res.data);
        this.network.success('Контекст успешно получен');
      });
    } catch (e) {
      runInAction(() => {
        this.network.error('Не удалось получить контекст');
      });
      console.log(e);
    }
  }
}

export default AIStore;
