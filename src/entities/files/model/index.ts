export interface FileApi {
  file: File
}

export interface FileModel {
  file: File
}

export interface FileApiReqLoad {
  file: File
}

export interface FileApiReqUpdate {
  file: File
}

export const normalizeFile = (raw: FileApi): FileModel => ({
  file: raw.file,
});

export const normalizeFiles = (raw: FileApi[]): FileModel[] => (
  raw.map(normalizeFile)
);
