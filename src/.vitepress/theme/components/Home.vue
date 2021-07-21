<template>
  <ul>
    <li class="space-y-12" v-for="{ title, href, date, excerpt, image, description } of $site.customData.posts">
      <article class="space-y-4 xl:space-y-6">
        <a class="text-gray-900 block" :href="href">
          <img
            :src="'/img/blog/' + image"
            class="object-cover h-40 xl:h-80 w-full rounded-lg" 
            alt=""
          >
        </a>

        <div class="">
          <h2 class="text-xl xl:text-4xl xl:leading-10 font-bold tracking-tight">
            <a class="text-gray-900" :href="href">{{ title }}</a>
          </h2>

          <!-- <Date :date="date" /> -->
        </div>

        <div v-if="description" class="xl:text-lg max-w-none text-gray-500">
          <a :href="href">{{ description }}</a>
        </div>

        <div class="font-bold uppercase text-gray-600 hover:text-gray-800 text-xs tracking-widest">
          <a class="link" aria-label="read more" :href="href">Ler mais →</a>
        </div>
      </article>
    </li>
  </ul>
</template>

<script setup>
import Date from './Date.vue'

</script>
