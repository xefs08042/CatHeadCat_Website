<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Axios from './components/axios.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    HelloWorld,
    Axios
  },
  setup () {
    const router = useRouter()
    const toPage1 = (() => {
      router.push('/page1')
    })
    const toPage2 = (() => {
      router.push('/page2')
    })
    const toHome = (() => {
      router.push('/home')
    })
    return {
      toHome,
      toPage1,
      toPage2
    }
  }
}
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  
}
</style>
