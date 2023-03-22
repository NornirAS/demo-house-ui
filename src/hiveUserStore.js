import { defineStore } from 'pinia'
import { reactive, toRefs, readonly, computed } from 'vue'

export const useHiveUserStore = defineStore('hiveUserStore', () => {
  const state = reactive({
    username: null,
    token: null,
  })

  const actions = {
    set(prop, value) {
      state[prop] = value
    },
  }

  const getters = {
    isAuth: computed(() => !!state.token),
  }

  return {
    ...toRefs(readonly(state)),
    ...actions,
    ...getters,
  }
})
