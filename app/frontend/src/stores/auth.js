import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
  }),
  actions: {
    setTokens(accessToken, refreshToken = '') {
      this.accessToken = accessToken;
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        this.refreshToken = refreshToken;
        localStorage.setItem('refresh_token', refreshToken);
      }
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});
