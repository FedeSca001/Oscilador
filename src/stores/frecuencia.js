import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
export const useFrecuenciaStore = defineStore('frecuencia', () => {
  let ganancia = ref( 0.5);
  let audioCtx = null;
  let oscillatorNode = null;
  let gainNode = null;
  let setOctava = ref(3);
  const startOscillator = (nota) => {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    oscillatorNode = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    if (!isNaN(nota) && isFinite(nota)) {
      oscillatorNode.frequency.setValueAtTime(nota*setOctava.value, audioCtx.currentTime);
    } else {
      console.error('Valor de frecuencia no válido:', nota);
      return;
    }

    gainNode.gain.setValueAtTime(ganancia.value, audioCtx.currentTime);

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillatorNode.start();
  };

  const stopOscillator = () => {
    if (oscillatorNode && oscillatorNode.state !== 'stopped') {
      oscillatorNode.stop();
      oscillatorNode.disconnect();
      oscillatorNode = null;
      gainNode.disconnect();
      gainNode = null;
    }
  };

  const octava = [
    { nota: 'do', frecuencia: 261.626 },
    { nota: 'doSostenido', frecuencia: 277.183 },
    { nota: 're', frecuencia: 293.665 },
    { nota: 'reSostenido', frecuencia: 311.127 },
    { nota: 'mi', frecuencia: 329.628 },
    { nota: 'fa', frecuencia: 349.228 },
    { nota: 'faSostenido', frecuencia: 369.994 },
    { nota: 'sol', frecuencia: 391.995 },
    { nota: 'solSostenido', frecuencia: 415.305 },
    { nota: 'la', frecuencia: 440.000 },
    { nota: 'laSostenido', frecuencia: 466.164 },
    { nota: 'si', frecuencia: 493.883 }
  ];

  const incrementOctava = ()=>{
    setOctava.value = setOctava.value * 2;
    console.log(setOctava.value);
  }
  const decrementOctava = ()=>{
    setOctava.value = setOctava.value / 2;
    console.log(setOctava.value);
  }
  return {
    ganancia,
    octava,
    startOscillator,
    stopOscillator,
    incrementOctava,
    decrementOctava,
  };
});
