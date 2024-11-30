<template>
  <div class="pb-4 flex justify-between">
    <p class="text-base font-bold text-blue-500 flex items-center gap-1">
      <!-- <line-chart-outlined /> -->
      <span
      @click="push({ name: 'customers' })"
      class="hover:ring-red-300 text-[12px] w-10 h-6 ring-1 ring-slate-300 rounded-sm flex items-center justify-center outline-none"
    >
      <ArrowLeftOutlined />
    </span>
      {{ $t("customers.form_edit") }}
    </p>
  </div>

  <a-form
    layout="vertical"
    ref="form"
    :rules="schema"
    :key="schemaKey"
    :model="userFormState"
    class="flex-col flex"
  >
    <!-- Upload section -->
    <a-form-item label=" " class="-mt-12" name="avatar">
      <div class="flex flex-col items-center sm:items-start gap-6">
        <a-image
          v-if="avatarPreviewURL || userFormState.full_avatar_url"
          :src="avatarPreviewURL || userFormState.full_avatar_url"
          width="10rem"
          height="10rem"
          style="object-fit: contain"
        >
          <template #previewMask>
            <span>{{ $t("preview") }}</span>
          </template>
        </a-image>
        <img
          v-else
          src="/src/assets/nodata.png"
          width="200rem"
          height="200rem"
          class="my-6"
          style="object-fit: contain"
          alt=""
        />
        <a-alert
          v-if="imageErrorMessage"
          :message="imageErrorMessage"
          type="error"
          banner
          closable
          @close="imageErrorMessage = ''"
        />
      </div>
    </a-form-item>
    <a-form-item class="-mt-12" label=" ">
      <a-upload
        :showUploadList="false"
        accept=".png, .jpeg, .jpg"
        multiple
        :before-upload="onUpload"
      >
        <a-button> {{ $t("customers.table_field.choose_profile") }} </a-button>
      </a-upload>
      <a-button
        @click="clearImage"
        v-if="userFormState.full_avatar_url"
        class="ml-4 text-red-600"
      >
        {{ $t("customers.table_field.btn.remove") }}
      </a-button>
    </a-form-item>
    <!-- Input fields -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item
        :label="$t('customers.table_field.fname')"
        name="first_name"
        class="w-full"
      >
        <a-input
          :placeholder="placeholders.firstName"
          class="h-12"
          v-model:value="userFormState.first_name"
          :class="{
            'ring-1 ring-red-500 mb-1':
              msgErrors.errors && (userFormState.first_name.length) > 149,
          }"
        />
        <span
          v-if="msgErrors.errors && (userFormState.first_name.length) > 149"
          class="text-red-500"
          >{{$t('validation.user.length_name')}}
        </span>
      </a-form-item>
      <a-form-item
        :label="$t('customers.table_field.lname')"
        name="last_name"
        class="w-full"
      >
        <a-input
          :placeholder="placeholders.lastName"
          class="h-12"
          v-model:value="userFormState.last_name"
          :class="{
            'ring-1 ring-red-500 mb-1':
              msgErrors.errors && userFormState.last_name.length > 149,
          }"
        />
        <span
          v-if="msgErrors.errors && userFormState.last_name.length > 149"
          class="text-red-500"
          >{{$t('validation.user.length_name')}}
        </span>
      </a-form-item>
    </div>

    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item
        :label="$t('customers.table_field.phone_number')"
        name="phone_number"
        class="w-full"
      >
        <a-input
          :placeholder="placeholders.phoneNumber"
          class="h-12"
          v-model:value="userFormState.phone_number"
          :class="{
            'ring-1 ring-red-500 mb-1':
              msgErrors.errors && userFormState.phone_number.length > 11,
          }"
        />
        <span
          v-if="msgErrors.errors && userFormState.phone_number.length > 11"
          class="text-red-500"
          >{{$t('validation.user.length_phone')}}
        </span>
      </a-form-item>
      <a-form-item
        :label="$t('customers.table_field.email')"
        name="email"
        class="w-full"
      >
        <a-input
          :placeholder="placeholders.email"
          class="h-12"
          v-model:value="userFormState.email"
          :class="{
            'ring-1 ring-red-500 mb-1':
              (msgErrors.errors && userFormState.email.length > 254) ||
              msgErrors.errors === 'd',
          }"
        />
        <span
          v-if="msgErrors.errors && userFormState.email.length > 254"
          class="text-red-500"
          >{{ $t("validation.user.email_length") }}
        </span>
        <span
          v-else-if="msgErrors.errors && msgErrors.errors === 'd'"
          class="text-red-500"
          >{{ $t("validation.user.email_exits") }}
        </span>
      </a-form-item>
    </div>
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item
        :label="$t('customers.table_field.created_at')"
        name=""
        class="w-full"
      >
        <a-input
          readonly
          placeholder="ວັນທີອັບເດດ"
          class="h-12"
          v-model:value="userFormState.created_at"
        />
      </a-form-item>
      <a-form-item
        :label="$t('customers.table_field.updated_at')"
        name=""
        class="w-full"
      >
        <a-input
          readonly
          class="h-12"
          v-model:value="userFormState.updated_at"
        />
      </a-form-item>
    </div>

    <!-- Role Selection -->
    <a-collapse v-model:activeKey="activeKey" class="mt-2">
      <a-collapse-panel
        key="2"
        :header="$t('customers.table_field.get_roles')"
        name="groups"
        class="w-full"
      >
        <div v-if="loadingRoles">Loading roles...</div>
        <a-checkbox-group
          v-else
          v-model:value="userFormState.groups"
          class="flex flex-wrap gap-4"
        >
          <a-checkbox
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
            :label="role.name"
          >
            {{ role.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>

    <!-- Role Selection -->
    <a-collapse v-model:activeKey="activeKeyPermission" class="mt-8">
      <a-collapse-panel
        key="2"
        :header="$t('customers.table_field.get_permissions')"
        name="user_permission"
        class="w-full"
      >
        <div v-if="loadingRoles">Loading permission...</div>
        <a-checkbox-group
          v-else
          v-model:value="userFormState.user_permissions"
          class="flex flex-wrap gap-4"
        >
          <a-checkbox
            v-for="per in permissions"
            :key="per.id"
            :value="per.id"
            :label="per.name"
          >
            {{ per.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>

    <div class="md:flex md:flex-row flex-col mt-4">
      <a-form-item label="" name="is_superuser" class="md:w-[8rem]">
        <a-checkbox
          :checked="userFormState.is_superuser"
          @change="userFormState.is_superuser = $event.target.checked"
        >
          {{ $t("customers.table_field.super_user") }}
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="is_active" class="md:w-[6rem]">
        <a-checkbox
          :checked="userFormState.is_active"
          @change="userFormState.is_active = $event.target.checked"
        >
          {{ $t("customers.table_field.status") }}
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="type" class="">
        <a-radio-group v-model:value="userFormState.type">
          <a-radio value="general">{{
            $t("customers.table_field.choose_customer.general")
          }}</a-radio>
          <a-radio value="vip">{{
            $t("customers.table_field.choose_customer.vip")
          }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </div>

    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit"
          >{{ $t("customers.edit") }}
        </a-button>
        &nbsp;
        <a-button danger @click="push({ name: 'customers' })">{{
          $t("customers.table_field.btn.cancel")
        }}</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { rolesStore } from "@/modules/roles/store/role.store";
import { ref, onMounted, watch, computed, reactive } from "vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";

import { notification } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { useUpdateCustomerSchema } from "../schema/update-user.schema";
const { schema, schemaKey } = useUpdateCustomerSchema();
import { customerStore } from "../store/index";
import { CustomerEntity } from "../entity/customer.entity";
import { useI18n } from "vue-i18n";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
const router = useRouter();
const { push } = router;
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const uploadImg = ref<string | File | null>(null);
  defineProps({
  searchQuery: {
    type: String,
    default: null,
  },
});
const { update, stateGetOne, getOneCustomer } = customerStore();
const { t } = useI18n();
const placeholders = computed(() => ({
  firstName: t("placeholder.user.fname"),
  lastName: t("placeholder.user.lname"),
  phoneNumber: t("placeholder.user.phone_number"),
  email: t("placeholder.user.email"),
}));
const initialFormState: CustomerEntity = {
  customer_id: "",
  id: "",
  first_name: "",
  last_name: "",
  type: "",
  phone_number: "",
  groups: [],
  is_active: false,
  is_superuser: false,
  user_permissions: [],
  avatar: undefined,
  full_avatar_url: undefined,
  email: "",
  password: "",
  created_at: "",
  updated_at: "",
};

const form = ref();
const userFormState = ref<CustomerEntity>({ ...initialFormState });

const resetForm = () => {
  userFormState.value = { ...initialFormState };
  uploadImg.value = ""; // Reset uploaded image preview
};
const msgErrors = reactive<any>({});
const handleOrderDetailsSubmit = async () => {
  form.value.validate().then(async () => {
    try {
      await update(userFormState.value, userFormState.value.id);
      notification.success({
        message: t("messages.success"),
        description: t("messages.update"),
      });
      resetForm();
      push({ name: "customers" });
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

const roles = ref<RolesEntity[]>([]);
const permissions = ref<PermissionsEntity[]>([]);
const loadingRoles = ref<boolean>(true);
const loadingPermission = ref<boolean>(true);

const activeKey = ref(["2"]);
const activeKeyPermission = ref(["2"]);
const { params } = useRoute();
const Id = Number(params.id);
const populateUserForm = async () => {
  await getAll();
  roles.value = state.data.props.map((role: RolesEntity) => ({
    id: role.id,
    name: role.name,
  }));
  loadingRoles.value = false;

  await getAllPer();
  permissions.value = statePermission.data.props.map(
    (perm: PermissionsEntity) => ({
      id: perm.id,
      name: perm.name,
    })
  );
  loadingPermission.value = false;

  await getOneCustomer(Id);
  if (stateGetOne.data) {
    const userData = stateGetOne.data;

    userFormState.value = {
      ...userData,
      groups: Array.isArray(userData.groups)
        ? userData.groups.map((role: any) => role.id)
        : userData.groups,
      user_permissions: Array.isArray(userData.user_permissions)
        ? userData.user_permissions.map((perm: any) => perm.id)
        : userData.user_permissions,
    };

    // Set avatar
    uploadImg.value = userData.full_avatar_url || null;
  }
};

const imageErrorMessage = ref<string>("");
const avatarPreviewURL = ref<string | null>(null);
function onUpload(avatar: File) {
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (avatar.size > maxSizeBytes) {
    imageErrorMessage.value = `ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ ${maxSizeMB}MB`;
    return false;
  }
  imageErrorMessage.value = "";
  if (avatarPreviewURL.value) {
    URL.revokeObjectURL(avatarPreviewURL.value);
  }
  avatarPreviewURL.value = URL.createObjectURL(avatar); // Create a new object URL
  userFormState.value.full_avatar_url = avatar; // Store the File object directly
  return false; // Prevent the default upload behavior
}

const clearImage = () => {
  userFormState.value.full_avatar_url = undefined;
  avatarPreviewURL.value = "";
};

onMounted(() => {
  populateUserForm();
});

// Watcher to ensure `user_permissions` updates correctly when data is fetched
watch(
  () => stateGetOne.data,
  (newUser: any) => {
    if (newUser) {
      const userData = newUser;
      userFormState.value.user_permissions = userData.user_permissions.map(
        (perm: any) => perm.id
      );
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.ant-select-selection-search-input {
  height: 48px;
  width: 50%;
}

.custom-select .ant-select-selector {
  height: 48px !important;
  line-height: 48px !important;
  display: flex;
  align-items: center;
}

.custom-select .ant-select-selector .ant-select-selection-item {
  padding: 0 12px;
}

.custom-select .ant-select-dropdown {
  min-height: 200px;
}
</style>
