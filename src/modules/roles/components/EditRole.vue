<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { useRoleSchema } from "../schema/role.schema";
import { rolesStore } from "../store/role.store";
import { notification } from "ant-design-vue";
import { RolesEntity } from "../entity/role.entity";
import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { schema, schemaKey } = useRoleSchema();
const { update, getDetail, getAll } = rolesStore();
const { getAllPer, statePermission } = permissionsStore();
const activeKeyPermission = ref(["2"]);
const loading = ref(false);
const loadingPermissions = ref(false);
const { params } = useRoute();
const form = ref();
const { push } = useRouter();
const FormStateRoles: RolesEntity = {
  id: "",
  name: "",
  permissions: [],
};

// Initialize rolesFormState with the default state
const rolesFormState = ref<RolesEntity>({ ...FormStateRoles });
const msgErrors = reactive<any>({});

const handleSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        await update(rolesFormState.value, rolesFormState.value.id);
        notification.success({
          message: t("messages.success"),
          description: t("messages.update"),
        });
        push({ name: "roles.index" });
        await getAll();
        resetForm();
      } catch (error: any) {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data || {};
          Object.keys(apiErrors).forEach((field) => {
            msgErrors[field] = Array.isArray(apiErrors[field])
              ? apiErrors[field][0]
              : "";
          });
        }
      } finally {
        loading.value = false;
      }
    })
    .catch((error: unknown) => {
      console.log("Validation error", error);
    });
};

const resetForm = () => {
  rolesFormState.value = { ...FormStateRoles };
};

const fetchRoleDetails = async () => {
  loadingPermissions.value = true; // Start loading state
  try {
    const roleData = await getDetail(Number(params.id));
    if (roleData) {
      rolesFormState.value = {
        ...roleData.data,
        permissions: roleData.data.permissions.map(
          (perm: PermissionsEntity) => perm.id
        ),
      };
    }
  } catch (error) {
    console.error("Error fetching role details:", error);
  } finally {
    loadingPermissions.value = false; // End loading state
  }
};

// Fetch all permissions and initialize roles
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

onMounted(async () => {
  await fetchRoleDetails();
  await fetchPermissions();
});

const clearData = (key: string) => {
  msgErrors[key] = "";
};
const { t } = useI18n();
const placeholders = computed(() => ({
  name: t("placeholder.role.name"),
}));
</script>

<template>
  <div class="form-role">
    <div class="pb-4 flex justify-between">
      <p class="text-base font-bold text-blue-500 flex items-center gap-1">
        <!-- <line-chart-outlined /> -->
        <span
        @click="push({ name: 'roles.index' })"
        class="hover:ring-red-300 text-[12px] w-10 h-6 ring-1 ring-slate-300 rounded-sm flex items-center justify-center outline-none"
      >
        <ArrowLeftOutlined />
      </span>
        {{ $t("messages.role.form_edit") }} 
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
          :class="{ 'ring-1 ring-red-500 mb-1': msgErrors.name }"
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

      <div class="md:flex md:flex-row flex-col gap-4">
        <a-form-item class="flex items-center mt-4 justify-center">
          <a-button type="primary" @click="handleSubmit"
            >{{ $t("messages.role.edit") }}
          </a-button>
          &nbsp;
          <a-button @click="push({ name: 'roles.index' })" danger>{{
            $t("messages.role.btn.cancel")
          }}</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
