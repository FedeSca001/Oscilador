<script setup>
// DOCUMENTACION DE OSCILADOR
// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency
console.log('proyecto nuevo');
</script>

<template>
  <header>
    <h1>Bienvenidos a esta app de musica</h1>
  </header>
  <main>
    <h1>Hola mundo</h1>
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
