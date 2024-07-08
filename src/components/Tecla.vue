<script setup>
import { defineProps } from 'vue';
import { useFrecuenciaStore } from '../stores/frecuencia';

const props = defineProps({
  prop: {
    type: Number,
    required: true
  }
});

const frecuenciaStore = useFrecuenciaStore();
const { startOscillator, stopOscillator } = frecuenciaStore;
</script>

<template>
  <div class="tecla">
  </div>
</template>

<style scoped>
.tecla {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 150px;
  margin: 2px;
  background-color: #f0f0f0;
  border: 2px solid #5e0101;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.1s, transform 0.1s;
  cursor: pointer;
}

.tecla:hover {
  background-color: #9c0000;

  transform: scale(1.05);
}

.tecla:active {
  box-shadow: 0 9px 12px rgba(250, 108, 108, 0.719);
  transform: translateY(2px);
}
</style>
