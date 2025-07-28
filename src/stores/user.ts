import { defineStore, acceptHMRUpdate } from 'pinia';
import { authService } from '../api/services'
import type { UserProfile } from 'src/types/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserProfile | null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
  },

  actions: {
    async login(credentials: { username: string, password: string }) {
      const { userId, access_token } = await authService.login(credentials)
      localStorage.setItem('token', access_token)
      localStorage.setItem('userId', userId.toString())
      await this.fetchUserData(userId)
    },
    async fetchUserData(userId: number) {
      this.loading = true
      try {
        const userProfile: UserProfile  = await authService.getUserProfile(userId)
        this.user = userProfile
        this.isAuthenticated = true
      } catch(err){
        console.log('error ogged', err)
      }
      finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
