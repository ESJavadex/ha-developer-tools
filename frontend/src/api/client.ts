import type { EntityState } from '../types/entity';

const API_BASE = '/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Entity endpoints
  async getStates(): Promise<EntityState[]> {
    return fetchApi<EntityState[]>('/states');
  },

  async getState(entityId: string): Promise<EntityState> {
    return fetchApi<EntityState>(`/states/${entityId}`);
  },

  // Service endpoints
  async getServices(): Promise<Record<string, unknown>> {
    return fetchApi('/services');
  },

  async callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown> {
    return fetchApi(`/services/${domain}/${service}`, {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  },

  // Config endpoints
  async getConfig(): Promise<Record<string, unknown>> {
    return fetchApi('/config');
  },

  // Events endpoints
  async getEvents(): Promise<unknown[]> {
    return fetchApi('/events');
  },

  // Health check
  async healthCheck(): Promise<{ status: string; service: string }> {
    return fetchApi('/');
  },
};
