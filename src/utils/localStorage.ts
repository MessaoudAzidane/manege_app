

export const getAuthToken = (): any | null => {
  const token = localStorage.getItem('authToken') || "";
  return JSON.parse(token);
};

export const setAuthToken = (token: any): void => {
  localStorage.setItem('authToken', JSON.stringify(token));
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};