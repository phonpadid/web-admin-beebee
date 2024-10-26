<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps<{
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  border?: string;
  isLoading: boolean;
}>();
</script>

<template>
  <a-button
    :disabled="isLoading"
    :class="`flex items-center justify-center gap-2 border-none ${bgColor} ${textColor} ${hoverBgColor}`"
    :shape="border ? border : 'default'"
    size="large"
  >
    <template #icon>
      <slot name="icon" />
    </template>
    <template v-if="isLoading">
      <Icon icon="mdi-loading" class="animate-spin" />
      ກຳລັງໂຫລດ...
    </template>
    <template v-else>
      <slot name="text" />
    </template>
  </a-button>
</template>

<style scoped></style>
