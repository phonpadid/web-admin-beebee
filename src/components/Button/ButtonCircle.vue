<script setup lang="ts">
defineProps<{
  bgColor: string;
  textColor: string;
  border?: string;
}>();
</script>
<template>
  <div :class="`${textColor} hover:${textColor} focus:${textColor}`">
    <a-button
      :class="`flex items-center justify-center ${bgColor} ${textColor} hover:${textColor} focus:${textColor}`"
      :shape="border ? border : 'circle'"
    >
      <template #icon>
        <slot name="icon" />
      </template>
    </a-button>
  </div>
</template>

<style scoped></style>
