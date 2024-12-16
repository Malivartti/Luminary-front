export interface EnvApi {
  id: number;
  name: string;
  description: string;
  user: number;
  createdAt: string;
  editedAt: string;
}

export interface EnvModel {
  id: number;
  title: string;
  description: string;
  createdAt: Date,
  updatedAt: Date;
}

export interface EnvApiReqCreate {
  name: string;
  description: string;
}

export interface EnvApiReqUpdate {
  name?: string;
  description?: string;
}

export const normalizeEnv = (raw: EnvApi): EnvModel => ({
  id: raw.id,
  title: raw.name,
  description: raw.description,
  createdAt: new Date(raw.createdAt),
  updatedAt: new Date(raw.editedAt),
});

export const normalizeEnvs = (raw: EnvApi[]): EnvModel[] => (
  raw.map(normalizeEnv)
);
