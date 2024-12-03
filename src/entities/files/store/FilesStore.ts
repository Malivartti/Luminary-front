import NetworkStore from '@entities/network';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '../api';
import { FileApi, FileModel, normalizeFiles } from '../model';

type PrivateFields = '_files' | '_localFiles' | '_file'

class FilesStore {
  private _files: FileModel[] | null = null;
  private _localFiles: File[] | null = null;
  private _file: FileModel | null = null;
  readonly network = new NetworkStore();

  constructor() {
    makeObservable<FilesStore, PrivateFields>(this, {
      _files: observable,
      _localFiles: observable,
      _file: observable,
      files: computed,
      file: computed,
      getFiles: action,
      // getFile: action,
      // loadFile: action,
      // updateFile: action,
      // deleteFile: action,
    });
  }

  get files(): FileModel[] {
    return this._files;
  }

  get localFiles(): File[] {
    return this._localFiles;
  }

  get file(): FileModel {
    return this._file;
  }

  setLocalFiles(localFiles: File[]): void {
    this._localFiles = [...this._localFiles, ...localFiles];
  }

  async getFiles(id: string | number) {
    this.network.loading();
    const url = endpoints.get(id);

    try {
      const res: AxiosResponse<FileApi[]> = await axios.get(url);
      runInAction(() => {
        this._files = normalizeFiles(res.data);
        this.network.success();
      });
    } catch(e) {
      runInAction(() => {
        this.network.error('Не удалось получить файлы');
      });
      console.log(e);
    }
  }

}

export default FilesStore;
