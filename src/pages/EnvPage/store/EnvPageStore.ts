import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_sheet' | '_prompt';

class EnvPageStore {
  private _sheet: string = '';
  private _prompt: string = '';

  constructor() {
    makeObservable<EnvPageStore, PrivateFields>(this, {
      _sheet: observable,
      _prompt: observable,
      sheet: computed,
      prompt: computed,
      setSheet: action.bound,
      setPrompt: action.bound,
    });
  }

  get sheet(): string {
    return this._sheet;
  }

  get prompt(): string {
    return this._prompt;
  }

  setSheet(sheet: string): void {
    this._sheet = sheet;
  }

  setPrompt(prompt: string): void {
    this._prompt = prompt;
  }
}

export default EnvPageStore;
