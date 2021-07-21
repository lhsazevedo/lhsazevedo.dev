<template>
  <article class="space-y-20">
    <header class="space-y-6">
      <div>
        <div class="uppercase text-xs tracking-widest text-blue-500 font-bold mb-2">{{ data.category }}</div>
        <h1 class="text-3xl leading-9 font-extrabold text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:leading-14 xl:text-5xl"
        >{{ data.title }}</h1>
      </div>      

      <p class="text-xl text-gray-500">{{ data.description }}</p>

      <Date :date="date" />
    </header>

    <div>
      <img
        :src="'/img/blog/' + data.image"
        class="w-full rounded-lg" 
        alt=""
      >
    </div>

    <div>
      <!-- <Author /> -->
      <div class="">
        <Content class="prose lg:prose-xl max-w-none pb-8" />
      </div>

      <footer
        class="text-sm font-medium leading-5"
      >
        <div v-if="nextPost" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">Next Article</h2>
          <div class="link">
            <a :href="nextPost.href">{{ nextPost.title }}</a>
          </div>
        </div>
        <div v-if="prevPost" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-gray-500">Previous Article</h2>
          <div class="link">
            <a :href="prevPost.href">{{ prevPost.title }}</a>
          </div>
        </div>
        <div class="pt-8">
          <a class="link" href="/">← Back to the blog</a>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import Date from './Date.vue'
// import Author from './Author.vue'
import { computed } from 'vue'
import { useFrontmatter, useSiteData, usePageData, useRoute } from 'vitepress'

const data = useFrontmatter()
const route = useRoute()
const posts = useSiteData().value.customData.posts

function findCurrentIndex() {
  return posts.findIndex(p => p.href === route.path)
}

// use the customData date which contains pre-resolved date info
const date = computed(() => posts[findCurrentIndex()].date)
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>
