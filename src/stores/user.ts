import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    employeeId: 0,
    userName: '',
    name: '',
    orgName: '',
    employeeRole: '',
    noVacationDaysLeft: 0,
  }),

  getters: {
  },

  actions: {
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
