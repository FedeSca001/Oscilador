<script setup>
// DOCUMENTACION DE OSCILADOR
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency
import Teclado from './components/Taclado.vue';
import { useFrecuenciaStore } from './stores/frecuencia';

// Obtiene las funciones del store
const { startOscillator, stopOscillator, incrementGanancia, decrementGanancia } = useFrecuenciaStore();

const keyFrequencyMap = {
  'a': 261.626, // Do (C)
  'w': 277.183, // Do sostenido (C#)
  's': 293.665, // Re (D)
  'e': 311.127, // Re sostenido (D#)
  'd': 329.628, // Mi (E)
  'f': 349.228, // Fa (F)
  't': 369.994, // Fa sostenido (F#)
  'g': 391.995, // Sol (G)
  'y': 415.305, // Sol sostenido (G#)
  'h': 440.000, // La (A)
  'u': 466.164, // La sostenido (A#)
  'j': 493.883, // Si (B)
};

document.addEventListener('keydown', (e) => {
  const frecuencia = keyFrequencyMap[e.key];

  if (e.key === '+') {
    incrementGanancia();
  } else if (e.key === '-') {
    decrementGanancia()
  } else if (frecuencia) {
    startOscillator(frecuencia);
  }
});


document.addEventListener('keyup', (e) => {
  const frecuencia = keyFrequencyMap[e.key];
  if (frecuencia) {
    stopOscillator(frecuencia);
  }
});
</script>

<template>
  <main>
    <Teclado/>
  </main>
</template>

<style scoped>

</style>
