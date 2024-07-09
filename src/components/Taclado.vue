<script setup>
import { useFrecuenciaStore } from '../stores/frecuencia'
import { ref } from 'vue'
import Tecla from './Tecla.vue'
import SelectGain from './SelectGain.vue'

const frecuenciaStore = useFrecuenciaStore()
const freq = ref(frecuenciaStore.octava)
const selectedOscillatorType = ref(frecuenciaStore.osciladorType)

const changeOscillatorType = () => {
  frecuenciaStore.setOscilatorType(selectedOscillatorType.value)
}
</script>

<template>
  <div class="teclado-contenedor">
    <ul class="contenedor-notas">
      <li v-for="frecuencia in freq" :key="frecuencia.nota" class="nota-individual"
      @mousedown="frecuenciaStore.startOscillator(frecuencia.frecuencia)"
      @mouseup="frecuenciaStore.stopOscillator(frecuencia.frecuencia)"
      @mouseleave="frecuenciaStore.stopOscillator(frecuencia.frecuencia)">
        <Tecla v-if="frecuencia.nota.length < 4" class="nota-normal"/>
        <Tecla v-else class="nota-sostenida"/>
      </li>
    </ul>
      <div class="select-octava">
        <button class="bajar-octava" @click="frecuenciaStore.decrementOctava"><</button>
        <select class="oscillator-selector" v-model="selectedOscillatorType" @change="changeOscillatorType">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
        <button class="subir-octava" @click="frecuenciaStore.incrementOctava">></button>
        <SelectGain/>
      </div>
    </div>
  <div class="muestra-nota-contenedor">
    <p></p>
    <p class="muestra-nota">Frecuencia Sonando:<span>{{frecuenciaStore.frecuenciaActual.toFixed(2) }}hz</span></p>
  </div>
</template>

<style scoped>
.muestra-nota{
  padding: 3px;
  margin: 6px;
}
.muestra-nota span{
  font-size: 18pt;
  margin: 0 15px;
  color: greenyellow;
}
.muestra-nota-contenedor{
  transition: 0.5s;
  color: #fff;
}
.contenedor-notas {
  list-style: none;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: auto;
  padding: 1rem;
  background-color: #5e0101;
  border: 3px solid #5e0101;
  border-radius: 10px;
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
  left: -30px;
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

.oscillator-selector {
  padding: 0.5rem;
  border: 1px solid #5e0101;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
}

.oscillator-selector:focus {
  outline: none;
  border-color: #800303;
}
</style>
