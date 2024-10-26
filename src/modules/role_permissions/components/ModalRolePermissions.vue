<script setup lang="ts">
import { ref, watch } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { RolesPermissionsShcema } from "../schema/role.permissions.schema";
import { rolesPermissionsStore } from "../store/role.permissions.store";
import { notification } from "ant-design-vue";
import { RolesPermissionsEntity } from "../entity/role.permissions.entity";
import { dataPermissions } from "@/common/utils/utils/informaionPermissions";
import { dataRole } from "@/common/utils/utils/informationRoles";

const { create, update } = rolesPermissionsStore();

const open = ref<boolean>(false);
const item = ref<RolesPermissionsEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);

const form = ref();

const FormStateRolesPermission: RolesPermissionsEntity = {
  id: "",
  role_id: "",
  permission_id: "",
};

const rolesPermissionsFormState = ref<RolesPermissionsEntity>({
  ...FormStateRolesPermission,
});

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (isEditMode.value) {
          await update(rolesPermissionsFormState.value);
          notification.success({
            message: "Update Success",
            description: "ອັບເດດສຳເລັດ",
          });
        } else {
          rolesPermissionsFormState.value.id = nextId.value.toString();
          nextId.value += 1;
          await create(rolesPermissionsFormState.value);
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
  rolesPermissionsFormState.value = { ...FormStateRolesPermission };
  isEditMode.value = false;
};

let nextId = ref(1);

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });

watch(item, (newItem) => {
  if (newItem) {
    rolesPermissionsFormState.value = {
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
      :rules="RolesPermissionsShcema"
      :model="rolesPermissionsFormState"
    >
      <a-form-item class="form-item-centered" label="ເລືອກ Role" name="role_id">
        <a-select
          v-model:value="rolesPermissionsFormState.role_id"
          placeholder="ເລືອກRole"
        >
          <a-select-option
            v-for="data in dataRole"
            :key="data.id"
            :value="data.id"
          >
            {{ data.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        class="form-item-centered"
        label="ເລືອກPermissions"
        name="permission_id"
      >
        <a-select
          v-model:value="rolesPermissionsFormState.permission_id"
          placeholder="ເລືອກPermissions"
        >
          <a-select-option
            v-for="data in dataPermissions"
            :key="data.id"
            :value="data.id"
          >
            {{ data.name }}
          </a-select-option>
        </a-select>
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
