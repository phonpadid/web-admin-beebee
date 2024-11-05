<script setup lang="ts">
import { ref, watch, defineExpose, onMounted } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { RolesShcema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";
import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";

const { create, update, getAll } = rolesStore();
const { getAllPer, statePermission } = permissionsStore();
const activeKeyPermission = ref(["1"]);
const open = ref<boolean>(false);
const item = ref<RolesEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);
const loadingPermissions = ref(false);

const form = ref();

const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
  permissions: [],
};

const rolesFormState = ref<RolesEntity>({ ...FormStateRoles });
const permissions = ref<PermissionsEntity[]>([]);

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
          await create(rolesFormState.value);
          notification.success({
            message: "Save Success",
            description: "ບັນທຶກສຳເລັດ",
          });
        }
        resetForm();
        open.value = false;
        await getAll();
      } catch (error) {
        notification.error({
          message: "Error",
          description: isEditMode.value ? "ອັບເດດຜິດພາດ" : "ບັນທຶກຜິດພາດ",
        });
        resetForm();
      } finally {
        loading.value = false;
        open.value = false;
      }
    })
    .catch((error: unknown) => {
      console.log("Validation error", error);
    });
};

const resetForm = () => {
  rolesFormState.value = { ...FormStateRoles };
  isEditMode.value = false;
};

const fetchPermissions = async () => {
  loadingPermissions.value = true;
  try {
    await getAllPer();
    permissions.value = statePermission.data.props || [];
  } catch (error) {
    console.error("Error loading permissions:", error);
  } finally {
    loadingPermissions.value = false;
  }
};

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });
watch(open, async (newOpen) => {
  if (newOpen) {
    resetForm();
    await fetchPermissions();
    if (item.value) {
      rolesFormState.value = { 
        ...item.value,
        permissions: Array.isArray(item.value.permissions)
          ? item.value.permissions.map((perm: PermissionsEntity) => perm.id)
          : [],
      };
      isEditMode.value = true;
    }
  }
});


onMounted(async () => {
  await fetchPermissions(); // Fetch permissions on initial load
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

    <a-collapse v-model:activeKey="activeKeyPermission" class="mt-8">
      <a-collapse-panel
        key="2"
        header="ກຳນົດສິດທີ່ໃຫ້ຜູ້ໃຊ້"
        name="permissions"
        class="w-full"
      >
        <div v-if="loadingPermissions">Loading permissions...</div>
        <a-checkbox-group
          v-else
          v-model:value="rolesFormState.permissions"
          class="flex flex-wrap gap-4"
        >
          <a-checkbox
            v-for="permission in permissions"
            :key="permission.id"
            :value="permission.id"
            :label="permission.name"
          >
            {{ permission.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>

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
