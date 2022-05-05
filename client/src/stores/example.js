import { defineStore } from 'pinia';

export const useExampleStore = defineStore({
  id: 'example',
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
