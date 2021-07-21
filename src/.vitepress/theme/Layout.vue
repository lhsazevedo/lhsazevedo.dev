<template>
  <div class="min-h-screen">
    <div class="max-w-screen-md xl:max-w-screen-lg mx-auto xl:grid xl:grid-cols-7 pt-6 xl:pt-20 px-4">
      <!-- max-w-screen-md mx-auto px-4 pt-24 pb-6 -->
      <header class="space-y-3 xl:space-y-6 xl:fixed xl:col-span-2 xl:pr-2 mb-10">
        <!-- <div class=""> -->

          <div class="flex items-center xl:block">
            <a href="/" class="inline">
              <img src="/images/avatar.jpg" alt="" class="inline w-16 h-16 xl:w-20 xl:h-20 rounded-full">
            </a>

            <div class="ml-4 xl:ml-0 xl:mt-3">
              <div class="text-xl font-bold font-inter text-gray-800">Lucas Azevedo</div>
              <div class="text-gray-500">Software Developer</div>
            </div>
          </div>

          <div class="mt-4 ml-20 xl:ml-0 space-y-3">
            <a class="xl:block uppercase text-gray-600 hover:text-gray-800 text-xs font-bold tracking-widest pr-4" data-title="github.com/lhsazevedo" href="https://github.com/lhsazevedo" target="_blank">
              <span>Github</span>
            </a>

            <a class="xl:block uppercase text-gray-600 hover:text-gray-800 text-xs font-bold pr-4 tracking-widest" data-title="linkedin.com/in/lhsazevedo" href="https://www.linkedin.com/in/lhsazevedo" target="_blank">
              LinkedIn
            </a>

            <a class="xl:block uppercase text-gray-600 hover:text-gray-800 text-xs font-bold pr-4 tracking-widest" data-title="twitter.com/lhs_azevedo" href="https://twitter.com/lhs_azevedo" target="_blank">
              Twitter
            </a>
          </div>
        <!-- </div> -->
      </header>

      <main class="xl:col-start-3 xl:col-span-5">
        <Home v-if="isIndex" />
        <Article v-else-if="isPost" />
        <Content v-else />
      </main>
    </div>
    <!-- <div class="max-w-screen-sm mx-auto px-4">
      
      Olá
      <Nav />

      <Home v-if="enableHome" />
      
      <Icons />
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

// Components
import Home from './components/Home.vue'
import Article from './components/Article.vue'

const route = useRoute()
const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')
const isPost = computed(() => route.path.startsWith('/posts/'))

</script>
