<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <a-button
    class="flex items-center justify-center tracking-wide font-medium p-1 bg-gradient-to-r from-blue-800 text-white border-none"
    type="primary"
  >
    <div class="flex px-2 font-medium">
      <icon
        class="mr-1 mt-0.5"
        icon="fluent:add-32-regular"
        width="20"
        height="18"
      />
      <slot name="label"></slot>
    </div>
  </a-button>
</template>

<style scoped></style>
