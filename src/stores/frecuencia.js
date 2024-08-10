import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFrecuenciaStore = defineStore('frecuencia', () => {
  let ganancia = ref(0.3);
  let osciladorType = ref('sine');
  let audioCtx = null;
  let osciladores = {};
  let setOctava = ref(1);
  let frecuenciaActual = ref(0);
  let delayTime = ref(0);
  let releaseTime = ref(0.1); // En segundos
  let sustainTime = ref(0.1); // En segundos

  const startOscillator = (nota) => {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    const frecuencia = nota * setOctava.value;
    frecuenciaActual.value = frecuencia;
    if (osciladores[frecuencia]) {
      return;
    }

    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const delayNode = audioCtx.createDelay();
    const compressorNode = audioCtx.createDynamicsCompressor();

    oscillatorNode.type = osciladorType.value;
    oscillatorNode.frequency.setValueAtTime(frecuencia, audioCtx.currentTime);
    gainNode.gain.value = ganancia.value;
    delayNode.delayTime.value = delayTime.value;

    // Configurar el compresor
    compressorNode.threshold.setValueAtTime(-50, audioCtx.currentTime);
    compressorNode.knee.setValueAtTime(40, audioCtx.currentTime);
    compressorNode.ratio.setValueAtTime(12, audioCtx.currentTime);
    compressorNode.attack.setValueAtTime(0, audioCtx.currentTime);
    compressorNode.release.setValueAtTime(releaseTime.value, audioCtx.currentTime);

    // Conectar los nodos: Oscillator -> Gain -> Delay -> Compressor -> Destination
    oscillatorNode.connect(gainNode);
    gainNode.connect(delayNode);
    delayNode.connect(compressorNode);
    compressorNode.connect(audioCtx.destination);
    oscillatorNode.start();

    // Guardar los nodos en el objeto osciladores
    osciladores[frecuencia] = { oscillatorNode, gainNode, delayNode, compressorNode };
  };

  const stopOscillator = (nota) => {
    const frecuencia = nota * setOctava.value;
    const nodes = osciladores[frecuencia];
    if (nodes) {
      const currentTime = audioCtx.currentTime;

      // Manejar la rampa de ganancia y el tiempo de sostenimiento
      nodes.gainNode.gain.cancelScheduledValues(currentTime);
      nodes.gainNode.gain.setValueAtTime(nodes.gainNode.gain.value, currentTime);

      if (sustainTime.value > 0) {
        nodes.gainNode.gain.linearRampToValueAtTime(0, currentTime + sustainTime.value);
      }

      // Detener el oscilador después del tiempo de sustain
      setTimeout(() => {
        nodes.oscillatorNode.stop();
        nodes.oscillatorNode.disconnect();
        nodes.gainNode.disconnect();
        nodes.delayNode.disconnect();
        nodes.compressorNode.disconnect();

        delete osciladores[frecuencia];

        if (Object.keys(osciladores).length === 0) {
          audioCtx.close().then(() => {
            audioCtx = null;
            frecuenciaActual.value = 0;
          });
        }
      }, sustainTime.value * 1000);
    }
  };

  const setSustainTime = (value) => {
    sustainTime.value = value;
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

  const incrementOctava = () => {
    setOctava.value = setOctava.value * 2;
  };

  const decrementOctava = () => {
    setOctava.value = setOctava.value / 2;
  };

  const setOscilatorType = (inputString) => {
    osciladorType.value = inputString;
  };

  const setGanancia = (g) => {
    ganancia.value = g;
  };

  const incrementGanancia = () => {
    if (ganancia.value < 0.7) {
      ganancia.value = ganancia.value + 0.1;
    }
  };

  const decrementGanancia = () => {
    if (ganancia.value >= 0) {
      ganancia.value = ganancia.value - 0.1;
    }
  };

  const modificarRetardo = (n) => {
    delayTime.value = n;
  };

  const setReleaseTime = (value) => {
    releaseTime.value = value;
  };

  return {
    ganancia,
    incrementGanancia,
    decrementGanancia,
    octava,
    startOscillator,
    stopOscillator,
    incrementOctava,
    decrementOctava,
    setOscilatorType,
    setGanancia,
    osciladorType,
    frecuenciaActual,
    delayTime,
    modificarRetardo,
    releaseTime,
    setReleaseTime,
    sustainTime,
    setSustainTime
  };
});
