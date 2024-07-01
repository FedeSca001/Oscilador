<script setup>
// DOCUMENTACION DE OSCILADOR
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency
// Importa el componente Teclado y el store useFrecuenciaStore
import Teclado from './components/Taclado.vue';
import { useFrecuenciaStore } from './stores/frecuencia';

// Obtiene la función startOscillator del store
const { startOscillator, stopOscillator } = useFrecuenciaStore();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a': // Do (C)
      startOscillator(261.626); // Frecuencia de Do (C)
      break;
    case 'w': // Do sostenido / Re bemol (C# / Db)
      startOscillator(277.183); // Frecuencia de Do sostenido (C# / Db)
      break;
    case 's': // Re (D)
      startOscillator(293.665); // Frecuencia de Re (D)
      break;
    case 'e': // Re sostenido / Mi bemol (D# / Eb)
      startOscillator(311.127); // Frecuencia de Re sostenido (D# / Eb)
      break;
    case 'd': // Mi (E)
      startOscillator(329.628); // Frecuencia de Mi (E)
      break;
    case 'f': // Fa (F)
      startOscillator(349.228); // Frecuencia de Fa (F)
      break;
    case 't': // Fa sostenido / Sol bemol (F# / Gb)
      startOscillator(369.994); // Frecuencia de Fa sostenido (F# / Gb)
      break;
    case 'g': // Sol (G)
      startOscillator(391.995); // Frecuencia de Sol (G)
      break;
    case 'y': // Sol sostenido / La bemol (G# / Ab)
      startOscillator(415.305); // Frecuencia de Sol sostenido (G# / Ab)
      break;
    case 'h': // La (A)
      startOscillator(440.000); // Frecuencia de La (A)
      break;
    case 'u': // La sostenido / Si bemol (A# / Bb)
      startOscillator(466.164); // Frecuencia de La sostenido (A# / Bb)
      break;
    case 'j': // Si (B)
      startOscillator(493.883); // Frecuencia de Si (B)
      break;
    default:
      break;
  }
});


document.addEventListener('keyup',stopOscillator)
</script>

<template >
  <main>
    <Teclado/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
