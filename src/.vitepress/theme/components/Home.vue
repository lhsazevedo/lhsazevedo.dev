<template>
  <div class="page home">
    <header class="header-home animated">
      <span class="link">
        <img src="/images/avatar.jpg" alt="" class="selfie">
      </span>

      <h1 class="title">Lucas Azevedo</h1>
      <h2 class="description">Web Developer</h2>


      <SocialLinks />
    </header>

    <!-- <Nav /> -->
  </div>
</template>

<script setup>
import { usePageData } from 'vitepress';

import SocialLinks from './SocialLinks.vue'
import Nav from './Nav.vue'

const pageDataRef = usePageData();
pageDataRef.title = ""

</script>
