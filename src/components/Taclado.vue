<script setup>
import { useFrecuenciaStore } from '../stores/frecuencia'
import { ref } from 'vue'
import Tecla from './Tecla.vue'

const frecuenciaStore = useFrecuenciaStore()
const freq = ref (frecuenciaStore.octava)
</script>

<template>
  <h1>Teclado</h1>
  <ul class="contenedor-notas">
    <li v-for="frecuencia in freq " :key="freq.nota" class="nota-individual">
        <Tecla v-if="frecuencia.nota.length < 3" class="nota-normal" 
          :prop="frecuencia.frecuencia">{{ frecuencia.nota }}</Tecla>
        <Tecla v-else class="nota-sostenida" 
          :prop="frecuencia.frecuencia"/>
    </li>
  </ul>
  <div class="select-octava">
    <button class="bajar-octava" @click="frecuenciaStore.decrementOctava"><</button>
  --
    <button class="subir-octava" @click="frecuenciaStore.incrementOctava">></button>
  </div>
</template>

<style scoped>
.contenedor-notas {
  list-style: none;
  display: flex;
  flex-direction: row;
  position: relative;
  width: max-content;
  margin: auto;
  padding: 1rem;
  border: 2px solid #5e0101;
}

.nota-individual {
  position: relative;
}

.nota-normal {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 80px;
  height: 150px;
  background-color: rgb(255, 255, 255);
  border: 1px solid #000;
  z-index: 1;
}

.nota-sostenida {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 60px;
  height: 100px;
  background-color: black;
  border: 1px solid #000;
  position: absolute;
  left: -30px; /* Para ajustar la posición sobre la nota blanca */
  z-index: 2;
}

.select-octava {
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  border: 2px solid #5e0101;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 0.5rem;
}

.select-octava button {
  background-color: #5e0101;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.select-octava button:hover {
  background-color: #800303;
}

.select-octava span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
</style>