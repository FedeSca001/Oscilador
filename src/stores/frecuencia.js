import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const frecuencia = ref(0)

  return { frecuencia }
})
