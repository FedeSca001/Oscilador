<script setup>
  import { defineProps } from 'vue';
  import { useFrecuenciaStore } from '../stores/frecuencia';
  
  const props = defineProps({
    prop: {
      type: Number,
      required: true
    }
  });
  
  const frecuenciaStore = useFrecuenciaStore();
  const { startOscillator, stopOscillator } = frecuenciaStore;
  </script>

 <template>
    <div class="tecla"
      @mousedown="startOscillator(props.prop)"
      @mouseup="stopOscillator"
      @mouseleave="stopOscillator">
    </div>
  </template>

  <style scoped>

  </style>
  