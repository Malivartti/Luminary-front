import { API_ENTRY_POINT } from '@shared/config/api';

export const endpoints = {
  generate: (id: string | number) => `${API_ENTRY_POINT}/api/v1/environments/${id}/generate`,
  prompt: (id: string | number) => `${API_ENTRY_POINT}/api/v1/environments/${id}/send-prompt`,
  dropContext: (id: string | number) => `${API_ENTRY_POINT}/api/v1/environments/${id}/drop`,
  getContext: (id: string | number) => `${API_ENTRY_POINT}/api/v1/environments/${id}/get-context`,
};