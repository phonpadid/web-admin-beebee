<template>
    <a-modal v-model:open="open" title="Edit Restaurant" :footer="null">
      <p>{{ props.data.name }}</p>
      <p>{{ props.data.agent_name }}</p>
      <p>{{ props.data.real_esate_number }}</p>
      <a-button @click="submitData">
        Edit Item
      </a-button>
    </a-modal>
</template>

<script lang="ts" setup>
    import { ref, defineEmits, defineProps } from 'vue';

    const open = ref<boolean>(false);
    defineExpose({ open });
    const emit = defineEmits<{ (e: 'onSuccess'): void; (e: 'onHide'): void }>();

    const props = defineProps<{
      data?: any
    }>()

    const submitData = async () => {
        console.log('Submit Data...');
        emit('onSuccess');
    }
</script>