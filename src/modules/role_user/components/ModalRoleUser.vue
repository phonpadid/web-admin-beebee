<script setup lang="ts">
import { ref, watch } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { RolesUserShcema } from "../schema/role.user.schema";
import { rolesUserStore } from "../store/role.user.store";
import { notification } from "ant-design-vue";
import { RolesUserEntity } from "../entity/role.user.entity";
import { dataUser } from "@/utils/informationUser";
import { dataRole } from "@/utils/informationRoles";

const { create, update } = rolesUserStore();

const open = ref<boolean>(false);
const item = ref<RolesUserEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);

const form = ref();

const FormStateRolesUser: RolesUserEntity = {
  id: "",
  user_id: "",
  role_id: "",
};

const rolesUserFormState = ref<RolesUserEntity>({
  ...FormStateRolesUser,
});

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (isEditMode.value) {
          await update(rolesUserFormState.value);
          notification.success({
            message: "Update Success",
            description: "ອັບເດດສຳເລັດ",
          });
        } else {
          rolesUserFormState.value.id = nextId.value.toString();
          nextId.value += 1;
          await create(rolesUserFormState.value);
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
  rolesUserFormState.value = { ...FormStateRolesUser };
  isEditMode.value = false;
};

let nextId = ref(1);

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });

watch(item, (newItem) => {
  if (newItem) {
    rolesUserFormState.value = {
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
      :rules="RolesUserShcema"
      :model="rolesUserFormState"
    >
      <a-form-item
        class="form-item-centered"
        label="ເລືອກຜູ້ໃຊ້"
        name="user_id"
      >
        <a-select
          v-model:value="rolesUserFormState.user_id"
          placeholder="ເລືອກຜູ້ໃຊ້"
        >
          <a-select-option
            v-for="data in dataUser"
            :key="data.id"
            :value="data.id"
          >
            {{ data.name }}
          </a-select-option>
        </a-select> </a-form-item
      ><a-form-item
        class="form-item-centered"
        label="ເລືອກ Role"
        name="role_id"
      >
        <a-select
          v-model:value="rolesUserFormState.role_id"
          placeholder="ເລືອກROle"
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
