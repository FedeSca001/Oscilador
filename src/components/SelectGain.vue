<script setup>
import { useFrecuenciaStore } from '../stores/frecuencia'
import { ref, onMounted, onUnmounted } from 'vue'

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
      <p>{{ (frecuenciaStore.ganancia * 10).toFixed(1) }}</p>
    </div>
  </template>

<style scoped>
.knob-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.knob {
  width: 50px;
  height: 50px;
  background-color: #5e0101;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
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
</style>