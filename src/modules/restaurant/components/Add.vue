<template>
    <a-modal v-model:open="open" title="Create Restaurant" :footer="null">
      <a-button @click="submitData">
        Add Item
      </a-button>
    </a-modal>
</template>

<script lang="ts" setup>
    import { ref, defineEmits } from 'vue';

    const open = ref<boolean>(false);
    defineExpose({ open });
    const emit = defineEmits<{ (e: 'onSuccess'): void; (e: 'onHide'): void }>();

    const submitData = async () => {
        console.log('Submit Data...');
        emit('onSuccess');
    }
</script>