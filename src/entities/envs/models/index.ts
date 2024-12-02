export interface EnvApi {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
}

export interface EnvModel {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
}

export interface EnvApiReqCreate {
  title: string;
  description: string;
}

export interface EnvApiReqUpdate {
  title?: string;
  description?: string;
}

export const normalizeEnv = (raw: EnvApi): EnvModel => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  updatedAt: new Date(raw.updatedAt),
});

export const normalizeEnvs = (raw: EnvApi[]): EnvModel[] => (
  raw.map(normalizeEnv)
);
