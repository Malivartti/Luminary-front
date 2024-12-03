import NetworkStore from '@entities/network';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '../api';
import { EnvApi, EnvApiReqCreate, EnvApiReqUpdate, EnvModel, normalizeEnv, normalizeEnvs } from '../model';

type PrivateFields = '_envs' | '_env';

class EnvsStore {
  private _env: EnvModel | null = null;
  private _envs: EnvModel[] | null = [  
    {
      id: 1,
      title: 'Что такое JavaScript?',
      description: 'JavaScript — это язык программирования, используемый для создания интерактивных веб-страниц.',
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Основные типы данных в JavaScript',
      description: 'Основные типы данных в JavaScript включают Number, String, Boolean, null, undefined, Symbol, и BigInt.',
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Что такое переменная?',
      description: 'Переменная — это именованное место в памяти компьютера, где хранится значение.',
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: 'Как объявить переменную в JavaScript?',
      description: 'Переменные в JavaScript объявляются с помощью ключевых слов `var`, `let`, или `const`.',
      updatedAt: new Date(),
    },
    {
      id: 5,
      title: 'В чем разница между `let` и `const`?',
      description: '`let` объявляет переменную, значение которой может быть изменено, а `const` объявляет константу, значение которой неизменно после инициализации.',
      updatedAt: new Date(),
    },
    {
      id: 6,
      title: 'Что такое оператор присваивания?',
      description: 'Оператор присваивания (`=`) используется для присвоения значения переменной.',
      updatedAt: new Date(),
    },
    {
      id: 7,
      title: 'Что такое условный оператор `if`?',
      description: 'Условный оператор `if` выполняет блок кода только если условие истинно.',
      updatedAt: new Date(),
    },
    {
      id: 8,
      title: 'Что такое цикл `for`?',
      description: 'Цикл `for` повторяет блок кода определенное количество раз.',
      updatedAt: new Date(),
    },
    {
      id: 9,
      title: 'Что такое цикл `while`?',
      description: 'Цикл `while` повторяет блок кода пока условие истинно.',
      updatedAt: new Date(),
    },
    {
      id: 10,
      title: 'Что такое функция?',
      description: 'Функция — это блок кода, который выполняет определенную задачу.',
      updatedAt: new Date(),
    },
    {
      id: 11,
      title: 'Как объявить функцию в JavaScript?',
      description: 'Функция объявляется с помощью ключевого слова `function`, за которым следует имя функции, параметры в скобках и тело функции в фигурных скобках.',
      updatedAt: new Date(),
    },
    {
      id: 12,
      title: 'Что такое массив?',
      description: 'Массив — это упорядоченная коллекция элементов.',
      updatedAt: new Date(),
    },
    {
      id: 13,
      title: 'Как создать массив в JavaScript?',
      description: 'Массив создается с помощью квадратных скобок `[]`.',
      updatedAt: new Date(),
    },
    {
      id: 14,
      title: 'Что такое объект?',
      description: 'Объект — это неупорядоченная коллекция пар "ключ-значение".',
      updatedAt: new Date(),
    },
    {
      id: 15,
      title: 'Как создать объект в JavaScript?',
      description: 'Объект создается с помощью фигурных скобок `{}`.',
      updatedAt: new Date(),
    }
  ];
  readonly network = new NetworkStore();

  constructor() {
    makeObservable<EnvsStore, PrivateFields>(this, {
      _envs: observable,
      _env: observable,
      envs: computed,
      env: computed,
      getEnvs: action,
      getEnv: action,
      createEnv: action,
      updateEnv: action,
      deleteEnv: action,
    });
  }

  get envs(): EnvModel[] {
    return this._envs;
  }

  get env(): EnvModel {
    return this._env;
  }

  async getEnv(id: string | number) {
    this.network.loading();
    this._env = null;
    const url = endpoints.getOne(id);

    try {
      const res: AxiosResponse<EnvApi> = await axios.get(url);
      runInAction(() => {
        this._env = normalizeEnv(res.data);
        this.network.success();
      });
    } catch (e) {
      runInAction(() => {
        this.network.error('Не удалось получить окружение');
      });
      console.log(e);
    }
  }

  async getEnvs() {
    this.network.loading();
    this._envs = null;
    const url = endpoints.get();

    try {
      const res: AxiosResponse<EnvApi[]> = await axios.get(url);
      runInAction(() => {
        this._envs = normalizeEnvs(res.data);
        this.network.success();
      });
    } catch(e) {
      runInAction(() => {
        this.network.error('Не удалось получить окружения');
      });
      console.log(e);
    }
  }

  async createEnv(data: EnvApiReqCreate) {
    this.network.loading();
    this._env = null;
    const url = endpoints.create();

    try {
      await axios.post(url, {
        data,
      });
      this.network.success();
    } catch(e) {
      runInAction(() => {
        this.network.error('Не удалось создать окружение');
      });
      console.log(e);
    }
  }

  async updateEnv(id: string | number, data: EnvApiReqUpdate) {
    this.network.loading();
    this._env = null;
    const url = endpoints.update(id);

    try {
      await axios.put(url, {
        data,
      });
      this.network.success();
    } catch(e) {
      runInAction(() => {
        this.network.error('Не удалось обновить окружение');
      });
      console.log(e);
    }
  }

  async deleteEnv(id: string | number) {
    this.network.loading();
    this._env = null;
    const url = endpoints.delete(id);

    try {
      await axios.delete(url);
      runInAction(() => {
        this.network.success('Окружение успешно удалено');
      });
    } catch(e) {
      runInAction(() => {
        this.network.error('Не удалось удалить окружение');
      });
      console.log(e);
    }
  }
}

export default EnvsStore;
