<template>
  <div class="wrapper-normal">
    <Home v-if="enableHome" />
    
    <Icons />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

// Components
import Home from './components/Home.vue'
import Icons from './components/Icons.vue'
import NavBar from './components/NavBar.vue'

// generic state
const route = useRoute()

const enableHome = computed(() => !!route.data.frontmatter.homepage)

</script>
