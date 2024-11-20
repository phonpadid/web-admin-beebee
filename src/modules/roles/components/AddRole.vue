<script setup lang="ts">
import { ref, onMounted , reactive } from "vue";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { RolesSchema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { useRouter } from "vue-router";

// Loading state
const loading = ref(false);
const { create, getAll } = rolesStore();
const { getAllPer, statePermission } = permissionsStore();

// Form and UI states
const activeKeyPermission = ref(["2"]);
const loadingPermissions = ref(false);
const form = ref();
const { push } = useRouter()
// Default form state
const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
  permissions: [],
};

const rolesFormState = ref<RolesEntity>({ ...FormStateRoles });
const msgErrors = reactive<any>({});

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        await create(rolesFormState.value);
        notification.success({
          message: "ສຳເລັດ!",
          description: "ບັນທຶກຂໍ້ມູນສຳເລັດ.",
        });
        push({name: 'roles.index'})
        await getAll()
        resetForm();
      } catch (error: any) {
        if (error.response && error.response.data) {
          // Backend validation error response structure
          const apiErrors = error.response.data || {};
          Object.keys(apiErrors).forEach((field) => {
            msgErrors[field] = Array(apiErrors[field]) ? apiErrors[field][0] : '';
          });
        }
      }
    })
};

// Reset form state
const resetForm = () => {
  rolesFormState.value = { ...FormStateRoles };
};

// Fetch permissions and update state
const fetchPermissions = async () => {
  loadingPermissions.value = true;
  try {
    await getAllPer();
  } catch (error) {
    console.error("Error fetching permissions:", error);
  } finally {
    loadingPermissions.value = false;
  }
};

const clearData = (key: string) => {
  msgErrors[key] = '';
}

// Initialize on mount
onMounted(async () => {
  await fetchPermissions();
});
</script>

<template>
  <div class="form-role">
    <div class="pb-4 flex justify-between">
        <p class="text-base font-bold text-blue-500">
          <line-chart-outlined />
          ຟອມຜູ້ບົດບາດ
        </p>
      </div>
    <a-form
      layout="vertical"
      ref="form"
      :rules="RolesSchema"
      :model="rolesFormState"
    >
      <a-form-item class="form-item-centered" label="ຊື່ບົດບາດ" name="name">
        <a-input v-model:value="rolesFormState.name" placeholder="ປ້ອນຊື່ບົດບາດ" @input="clearData('name')" class="h-[3rem]"/>
        <span style="color: red">{{ msgErrors.name }}</span>
      </a-form-item>
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
              v-for="permission in statePermission.data?.props || []"
              :key="permission.id"
              :value="permission.id"
              :label="permission.name"
            >
              {{ permission.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-collapse-panel>
      </a-collapse>

      <!-- Submit Buttons -->
      <div class="md:flex md:flex-row flex-col gap-4">
        <a-form-item class="flex items-center mt-4 justify-center">
          <a-button type="primary" @click="handleSubmit">ບັນທຶກ</a-button>
          &nbsp;
          <a-button danger>ຍົກເລີກ</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
