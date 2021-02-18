<template>
  <div id='app'>
    <Nav />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Nav from '@@/Nav'
export default {
  name: 'app',
  components: {
    Nav,
  }
}
</script>


<style>
#app{
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>