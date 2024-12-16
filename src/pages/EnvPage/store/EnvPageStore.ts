import aiStore from '@entities/ai';
import filesStore from '@entities/files';
import { Network } from 'inspector/promises';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_envId' | '_sheet' | '_prompt' | '_files' | '_isShowFiles' | '_isShowChat';

class EnvPageStore {
  private _envId: string | null = null;
  private _sheet: string = '';
  private _prompt: string = '';
  private _files: File[] = [];
  private _isShowFiles: boolean = false;
  private _isShowChat: boolean = false;

  constructor() {
    makeObservable<EnvPageStore, PrivateFields>(this, {
      _envId: observable,
      _sheet: observable,
      _prompt: observable,
      _files: observable,
      _isShowFiles: observable,
      _isShowChat: observable,
      envId: computed,
      sheet: computed,
      prompt: computed,
      files: computed,
      isShowFiles: computed,
      isShowChat: computed,
      isActiveTab: computed,
      setEnvId: action,
      setSheet: action.bound,
      setPrompt: action.bound,
      addFile: action,
      deleteFile: action,
      closeTabs: action,
      setIsShowFiles: action,
      setIsShowChat: action,
      sendPrompt: action,
      sendPromptInChat: action,
      loadFile: action,
      readFile: action,
      generate: action,
    });
  }

  get envId(): string {
    return this._envId;
  }

  get sheet(): string {
    return this._sheet;
  }

  get prompt(): string {
    return this._prompt;
  }

  get files(): File[] {
    return this._files;
  }

  get isShowFiles(): boolean {
    return this._isShowFiles;
  }

  get isShowChat(): boolean {
    return this._isShowChat;
  }

  get isActiveTab(): boolean {
    return this._isShowFiles || this._isShowChat;
  }

  setEnvId(envId: string): void {
    this._envId = envId;
  }

  setSheet(sheet: string): void {
    this._sheet = sheet;
  }

  setPrompt(prompt: string): void {
    this._prompt = prompt;
  }

  addFile(file: File): void {
    this._files = [...this._files, file];
  }

  deleteFile(name: string): void {
    this._files = this._files.filter(item => item.name !== name);
  }

  closeTabs() {
    this._isShowChat = false;
    this._isShowFiles = false;
  }

  setIsShowFiles(isShowFiles: boolean): void {
    if (isShowFiles === this._isShowFiles) {
      this._isShowFiles = false;
      return;
    }
    this.closeTabs();
    this._isShowFiles = isShowFiles;
  }

  setIsShowChat(isShowChat: boolean): void {
    if (isShowChat === this._isShowChat) {
      this._isShowChat = false;
      return;
    }
    this.closeTabs();
    this._isShowChat = isShowChat;
  }

  async sendPrompt(): Promise<void> {
    await aiStore.prompt(this._envId, {
      prompt: this._prompt,
    });
  }

  async sendPromptInChat(): Promise<void> {
    await this.sendPrompt();
    if (aiStore.network.isError) return;
    this._prompt = '';
    await aiStore.getContext(this._envId);
  }

  async loadFile(file: File): Promise<void> {
    this.addFile(file);
    await filesStore.loadFile(this._envId, { file: file });
  }

  async readFile(filename: string): Promise<void> {
    await filesStore.getFile(this.envId, { filename });
    if (filesStore.network.isError) return;
    this._sheet = filesStore.file.file;
  }

  async generate(): Promise<void> {
    aiStore.generate(this._envId, { prompt: '' });
  }
}

export default EnvPageStore;
