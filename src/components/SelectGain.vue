<script setup>
import { useFrecuenciaStore } from '../stores/frecuencia'
import { onMounted, onUnmounted } from 'vue'

const frecuenciaStore = useFrecuenciaStore()

let startY = 0
let startGain = 0

const startDrag = (event) => {
  startY = event.clientY
  startGain = frecuenciaStore.ganancia
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event) => {
  const deltaY = startY - event.clientY
  const newGain = Math.min(Math.max(startGain + deltaY / 100, 0), 1)
  frecuenciaStore.setGanancia(newGain)
}

const stopDrag = () => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  document.addEventListener('mouseup', stopDrag)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
    <div class="knob-container">
      <div class="knob" @mousedown="startDrag"></div>
      <p class="number-gain">{{ (frecuenciaStore.ganancia * 10).toFixed(1) }}</p>
      <span>Ganancia</span>
    </div>
</template>

<style scoped>
.knob-container {
  background-color: #ffb8b8;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 1s;
}

.knob {
  width: 40px;
  height: 40px;
  background-color: #5e0101;
  border-radius: 50%;
  position: relative;
  transition: 0.5s;
  cursor: pointer;
}

.knob:hover {
    transform: scale(1.1);
    box-shadow: 3px 3px 9px 6px rgba(0, 0, 0, 0.152);
}

.knob::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  width: 4px;
  height: 15px;
  background-color: #fff;
  transform: translateX(-50%);
}
.number-gain{
    background-color: #5e0101;
    color: white;
    margin-top: 9px;
    margin-bottom: 0;
    border-radius: 6px;
    padding: 2px;
    min-width: 35px;
    text-align: center;
}
span{
  margin: 0 auto;
  padding: 0;
}
</style>