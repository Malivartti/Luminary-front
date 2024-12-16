import NetworkStore from '@entities/network';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '../api';
import { FileApi, FileApiReq, FileApiReqLoad, FileModel, normalizeFiles } from '../model';

type PrivateFields = '_files' | '_file'

class FilesStore {
  private _files: FileModel[] | null = null;
  private _file: FileModel | null = null;
  readonly network = new NetworkStore();

  constructor() {
    makeObservable<FilesStore, PrivateFields>(this, {
      _files: observable,
      _file: observable,
      files: computed,
      file: computed,
      getFiles: action,
      getFile: action,
      loadFile: action,
      // updateFile: action,
      // deleteFile: action,
    });
  }

  get files(): FileModel[] {
    return this._files;
  }

  get file(): FileModel {
    return this._file;
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

  async getFile(id: string | number, data: FileApiReq) {
    this.network.loading();
    const url = endpoints.getOne(id);

    try {
      const res: AxiosResponse<FileApi> = await axios.get(url, { data });
      runInAction(() => {
        this._file = res.data;
        this.network.success();
      });
    } catch (e) {
      runInAction(() => {
        this.network.error('Не удалось загрузить файл');
      });
      console.log(e);
    }
  }

  async loadFile(id: string | number, data: FileApiReqLoad) {
    this.network.loading();
    const url = endpoints.load(id);
    
    try {
      await axios.post(url, {
        data,
      });
      runInAction(() => {
        this.network.success();
      });
    } catch (e) {
      runInAction(() => {
        this.network.error('Не удалось выгрузить файл');
      });
      console.log(e);
    }
  }

}

export default FilesStore;
