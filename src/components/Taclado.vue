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
  color: white;
  border: 1px solid #000;
  position: absolute;
  left: -30px; /* Para ajustar la posición sobre la nota blanca */
  z-index: 2;
}

</style>