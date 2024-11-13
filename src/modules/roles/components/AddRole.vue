<script setup lang="ts">
import { ref, watch, onMounted , computed } from "vue";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { RolesSchema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";
import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";

// Loading state
const loading = ref(false);
const { create, getAll } = rolesStore();
const { getAllPer, statePermission } = permissionsStore();

// Form and UI states
const activeKeyPermission = ref(["1"]);
const open = ref<boolean>(false);
const loadingPermissions = ref(false);
const form = ref();

// Default form state
const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
  permissions: [],
};

// Define the allowed content types
const perid = [12, 11];

// Permissions filtering with computed
const permission = computed(() => statePermission.data.props || []); // Ensure it's an empty array if undefined
const filterPermission = computed(() => 
  permission.value.filter(per => perid.includes(Number(per.content_type)))
);

// Watch filtered permissions and log changes for debugging
watch(filterPermission, (newValue) => {
  // console.log('Filtered permissions:', newValue);
});

const rolesFormState = ref<RolesEntity>({ ...FormStateRoles });
const permissions = ref<PermissionsEntity[]>([]);

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        // console.log('Input:', rolesFormState.value);
        await create(rolesFormState.value);
        notification.success({
          message: "Save Success",
          description: "ບັນທຶກສຳເລັດ",
        });
        resetForm();
        open.value = false;
        await getAll();
      } catch (error: any) {
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

// Reset form state
const resetForm = () => {
  rolesFormState.value = { ...FormStateRoles };
};

// Fetch permissions and update state
const fetchPermissions = async () => {
  loadingPermissions.value = true;
  try {
    // Fetch all permissions
    await getAllPer();
    
    // Set `permissions` to only the filtered permissions
    permissions.value = filterPermission.value;
    
    // console.log("Filtered permissions after fetch:", permissions.value);
  } catch (error) {
    // console.error("Error loading permissions:", error);
  } finally {
    loadingPermissions.value = false;
  }
};


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
      class=" md:w-[40rem]"
      :rules="RolesSchema"
      :model="rolesFormState"
    >
      <a-form-item class="form-item-centered" label="ຊື່ບົດບາດ" name="name">
        <a-input v-model:value="rolesFormState.name" placeholder="ປ້ອນຊື່ບົດບາດ" @input="clearData('name')" />
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
