<script setup lang="ts">
import { ref, watch } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { TenantsShcema } from "../schema/tenants.schema";
import { tenantsStore } from "../store/tenants.store";
import { notification } from "ant-design-vue";
import { TenantsEntity } from "../entity/tenants.entity";

const { create, update } = tenantsStore();

const open = ref<boolean>(false);
const item = ref<TenantsEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);

const form = ref();

const FormStateTenants: TenantsEntity = {
  id: "",
  name: "",
  schema_name: "",
  domain: "",
};

const tenantsFormState = ref<TenantsEntity>({
  ...FormStateTenants,
});

const handleSubmit = async () => {
  try {
    await form.value.validate();

    loading.value = true;

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    if (isEditMode.value) {
      await update(tenantsFormState.value);
      notification.success({
        message: "Update Success",
        description: "ອັບເດດສຳເລັດ",
      });
    } else {
      tenantsFormState.value.id = nextId.value.toString();
      nextId.value += 1;
      await create(tenantsFormState.value);
      notification.success({
        message: "Save Success",
        description: "ບັນທຶກສຳເລັດ",
      });
    }

    resetForm();
  } catch (error) {
    notification.error({
      message: "Error",
      description: "ເກີດຂໍ້ຜິດພາດ",
    });
  } finally {
    loading.value = false;
    open.value = false;
  }
};

const resetForm = () => {
  tenantsFormState.value = { ...FormStateTenants };
  isEditMode.value = false;
};

let nextId = ref(1);

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });

watch(item, (newItem) => {
  if (newItem) {
    tenantsFormState.value = {
      ...newItem,
    };
    isEditMode.value = true;
    open.value = true;
  }
});
</script>

<template>
  <a-modal v-model:open="open" title="">
    <div class="flex text-xl font-bold">
      <Icon :icon="editIcon" class="mr-2 mt-1 bg-gray-200 rounded-md" />
      <p>{{ isEditMode ? "ແກ້ໄຂ" : "ເພີມ" }}</p>
    </div>
    <a-form
      layout="vertical"
      ref="form"
      :rules="TenantsShcema"
      :model="tenantsFormState"
    >
      <a-form-item class="form-item-centered" label="ຊື່" name="name">
        <a-input v-model:value="tenantsFormState.name" />
      </a-form-item>
      <a-form-item
        class="form-item-centered"
        label="ຊືໂຄ້ງສ້າງ"
        name="schema_name"
      >
        <a-input v-model:value="tenantsFormState.schema_name" />
      </a-form-item>
      <a-form-item class="form-item-centered" label="ໂດເມນ" name="domain">
        <a-input v-model:value="tenantsFormState.domain" />
      </a-form-item>
    </a-form>
    <template #footer>
      <button-default
        :disabled="loading"
        :isLoading="loading"
        bgColor="bg-black w-full flex justify-center font-bold"
        textColor="text-white"
        @click="handleSubmit"
      >
        <template #text>
          <span v-if="!loading">{{ isEditMode ? "ອັບເດດ" : "ເພີມ" }}</span>
        </template>
      </button-default>
    </template>
  </a-modal>
</template>

<style scoped></style>
