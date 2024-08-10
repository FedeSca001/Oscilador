<template>
    <div class="set-retardo-container">
      <label for="retardo-range">Retardo: {{ (frecuenciaStore.delayTime * 100).toFixed(0) }}%</label>
      <input
        id="retardo-range"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="localDelayTime"
        @input="updateDelayTime"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useFrecuenciaStore } from '../stores/frecuencia';
  
  const frecuenciaStore = useFrecuenciaStore();
  const localDelayTime = ref(frecuenciaStore.delayTime);
  
  const updateDelayTime = () => {
    frecuenciaStore.modificarRetardo(localDelayTime.value);
  };
  
  watch(
    () => frecuenciaStore.delayTime,
    (newVal) => {
      localDelayTime.value = newVal;
    }
  );
  </script>
  
  <style scoped>
  .set-retardo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }
  
  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  input[type="range"] {
    width: 100%;
    max-width: 300px;
    cursor: pointer;
    appearance: none; /* Remueve la apariencia por defecto */
  }
  
  /* Estilo para el track del slider */
  input[type="range"]::-webkit-slider-runnable-track {
    background-color: #ccc;
    height: 6px;
    border-radius: 3px;
  }
  
  input[type="range"]::-moz-range-track {
    background-color: #ccc;
    height: 6px;
    border-radius: 3px;
  }
  
  input[type="range"]::-ms-track {
    background-color: #ccc;
    height: 6px;
    border-radius: 3px;
    border-color: transparent;
    color: transparent;
  }
  
  /* Estilo para el thumb del slider */
  input[type="range"]::-webkit-slider-thumb {
    background-color: #5e0101;
    border: 2px solid #800303;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-top: -7px; /* Ajusta para centrar el thumb */
    appearance: none; /* Remueve el estilo por defecto en algunos navegadores */
  }
  
  input[type="range"]::-moz-range-thumb {
    background-color: #5e0101;
    border: 2px solid #800303;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  input[type="range"]::-ms-thumb {
    background-color: #5e0101;
    border: 2px solid #800303;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  input[type="range"]:focus {
    outline: none;
  }
  
  input[type="range"]::-ms-fill-lower {
    background: #ddd;
    border-radius: 3px;
  }
  
  input[type="range"]::-ms-fill-upper {
    background: #ddd;
    border-radius: 3px;
  }
  </style>
  