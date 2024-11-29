<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { useRoleSchema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { schema, schemaKey } = useRoleSchema();
// Loading state
const loading = ref(false);
const { create, getAll } = rolesStore();
const { getAllPer, statePermission } = permissionsStore();

// Form and UI states
const activeKeyPermission = ref(["2"]);
const loadingPermissions = ref(false);
const form = ref();
const { push } = useRouter();
// Default form state
const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
  permissions: [],
};

const rolesFormState = ref<RolesEntity>({ ...FormStateRoles });
const msgErrors = reactive<any>({});

const handleSubmit = async () => {
  form.value.validate().then(async () => {
    try {
      loading.value = true;
      await create(rolesFormState.value);
      notification.success({
        message: t("messages.success"),
        description: t("messages.description"),
      });
      push({ name: "roles.index" });
      await getAll();
      resetForm();
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Backend validation error response structure
        const apiErrors = error.response.data || {};
        Object.keys(apiErrors).forEach((field) => {
          msgErrors[field] = Array(apiErrors[field]) ? apiErrors[field][0] : "";
        });
      }
    }
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
    await getAllPer();
  } catch (error) {
    console.error("Error fetching permissions:", error);
  } finally {
    loadingPermissions.value = false;
  }
};

const clearData = (key: string) => {
  msgErrors[key] = "";
};

// Initialize on mount
onMounted(async () => {
  await fetchPermissions();
});
const { t } = useI18n();
const placeholders = computed(() => ({
  name: t("placeholder.role.name"),
}));

const toListRole = () => {
  push({ name: "roles.index" });
};
</script>

<template>
  <div class="form-role">
    <div class="pb-4 flex justify-between">
      <p
        @click="toListRole"
        class="text-base font-bold text-blue-500 hover:text-blue-400"
      >
        <line-chart-outlined />
        {{ $t("messages.role.add_role") }}
      </p>
    </div>
    <a-form
      layout="vertical"
      ref="form"
      :rules="schema"
      :key="schemaKey"
      :model="rolesFormState"
    >
      <a-form-item
        class="form-item-centered"
        :label="$t('messages.role.name')"
        name="name"
      >
        <a-input
          v-model:value="rolesFormState.name"
          :placeholder="placeholders.name"
          @input="clearData('name')"
          class="h-[3rem]"
          :class="{'ring-1 ring-red-500 mb-1': msgErrors.name}"
        />
        <span
          v-if="msgErrors.name && msgErrors.name.length >= 50"
          style="color: red"
          >{{ $t("messages.more_then") }}</span
        >
        <span
          v-else-if="msgErrors.name && msgErrors.name.length < 40"
          style="color: red"
          >{{ $t("messages.exist_name") }}</span
        >
      </a-form-item>
      <a-collapse v-model:activeKey="activeKeyPermission" class="mt-8">
        <a-collapse-panel
          key="2"
          :header="$t('messages.role.form.get_permissions')"
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
          <a-button type="primary" @click="handleSubmit"
            >{{ $t("messages.role.btn.save") }}
          </a-button>
          &nbsp;
          <a-button @click="push({ name: 'roles.index' })" danger
            >{{ $t("messages.role.btn.cancel") }}
          </a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
