<script setup lang="ts">
import { ref, watch } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { RolesShcema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";

const { create, update } = rolesStore();

const open = ref<boolean>(false);
const item = ref<RolesEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);

const form = ref();

const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
};

const rolesFormState = ref<RolesEntity>({
  ...FormStateRoles,
});

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (isEditMode.value) {
          await update(rolesFormState.value);
          notification.success({
            message: "Update Success",
            description: "ອັບເດດສຳເລັດ",
          });
        } else {
          rolesFormState.value.id = nextId.value.toString();
          nextId.value += 1;
          await create(rolesFormState.value);
          notification.success({
            message: "Save Success",
            description: "ບັນທຶກສຳເລັດ",
          });
          open.value = false;
        }
        resetForm();
        loading.value = false;
        open.value = false;
      } catch (success) {
        notification.success({
          message: "Success",
          description: isEditMode.value ? "ອັບເດດສຳເລັດ" : "ບັນທຶກສຳເລັດ",
        });
        open.value = false;
        resetForm();
        loading.value = false;
      }
    })
    .catch((error: unknown) => {
      console.log("error", error);
    });
};

const resetForm = () => {
  rolesFormState.value = { ...FormStateRoles };
  isEditMode.value = false;
};

let nextId = ref(1);

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });

watch(item, (newItem) => {
  if (newItem) {
    rolesFormState.value = {
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
      :rules="RolesShcema"
      :model="rolesFormState"
    >
      <a-form-item class="form-item-centered" label="ຊື່" name="name">
        <a-input v-model:value="rolesFormState.name" />
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
