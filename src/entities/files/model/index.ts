export interface FileApi {
  filename: string
}

export interface FileModel {
  filename: string
  file?: string
}

export interface FileApiReq {
  filename: string
}

export interface FileApiReqLoad {
  file: File
}

export interface FileApiReqUpdate {
  file: File
}

export const normalizeFile = (raw: FileApi): FileModel => ({
  ...raw,
});

export const normalizeFiles = (raw: FileApi[]): FileModel[] => (
  raw.map(normalizeFile)
);
