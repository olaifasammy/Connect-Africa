/**
 * Central API Client for Connect Africa Frontend.
 * All backend API calls MUST go through this client.
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  const result = await response.json();
  
  // Enforce the mandatory response structure: { success: boolean, data: T }
  if (!result.success) {
      throw new Error(result.errors?.[0]?.message || 'Unknown API Error');
  }

  return result.data as T;
};
