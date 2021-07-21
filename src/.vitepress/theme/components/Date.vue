<template>
  <!-- <dl>
    <dt class="sr-only">Published on</dt> -->
    <!-- <dd class="text-base leading-6 font-medium text-gray-500"> -->
    <time
      class="block text-base font-medium text-gray-400"
      :datetime="getDateTime()"
    >{{ date.string }}</time>
    <!-- </dd> -->
  <!-- </dl> -->
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  /**
   * { time, string }
   */
  date: Object
})

function getDateTime() {
  return new Date(props.date.time).toISOString()
}
</script>
