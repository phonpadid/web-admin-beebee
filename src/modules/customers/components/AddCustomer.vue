<template>
  <div class="pb-4 flex justify-between">
    <p
      class="text-base flex font-bold text-blue-500 items-center gap-2 justify-center"
    >
      <line-chart-outlined />
      {{ $t("customers.form_customer") }}
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
        <a-image v-if="userFormState.avatar"
          :src="
            typeof userFormState.avatar === 'object' &&
            userFormState.avatar.objectURL
              ? userFormState.avatar.objectURL
              : '/src/assets/nodata.png'
          "
          width="10rem"
          height="10rem"
          style="object-fit: contain"
        >
        <template #previewMask>
          <span>{{ $t('preview') }}</span>
        </template>
      </a-image>
        <img v-else
          src="/src/assets/nodata.png"
          width="200rem"
          height="200rem"
          class="my-4"
          style="object-fit: contain"
          alt="" srcset=""
        />
        <!-- <img src="" alt="" srcset=""> -->
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
        v-if="userFormState.avatar"
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
        />
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
        />
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
        />
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
        />
      </a-form-item>
    </div>

    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item
        :label="$t('customers.table_field.password')"
        name="password"
        class="w-full"
      >
        <a-input-password
          type="password"
          :placeholder="placeholders.password"
          class="h-12"
          v-model:value="userFormState.password"
        />
      </a-form-item>
      <a-form-item
        :label="$t('customers.table_field.confirm_password')"
        name="password_confirmation"
        class="w-full"
      >
        <a-input-password
          type="password"
          :placeholder="placeholders.confirmPassword"
          class="h-12"
          v-model:value="userFormState.password_confirmation"
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

    <a-form-item
      :label="$t('customers.table_field.choose_customer.label')"
      name="type"
      class="mt-6"
    >
      <a-radio-group v-model:value="userFormState.type">
        <a-radio value="general">
          {{ $t("customers.table_field.choose_customer.general") }}
        </a-radio>
        <a-radio value="vip">{{
          $t("customers.table_field.choose_customer.vip")
        }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit">
          {{ $t("customers.table_field.btn.save") }}
        </a-button>
        &nbsp;
        <a-button danger @click="push({ name: 'customers' })">{{
          $t("customers.table_field.btn.cancel")
        }}</a-button>
      </a-form-item>
    </div>
  </a-form>
  <LeftCircleOutlined />
</template>

<script lang="ts" setup>
import { rolesStore } from "@/modules/roles/store/role.store";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, computed } from "vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";
import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
import { CustomerEntity } from "../entity/customer.entity";
import { customerStore } from "../store/index";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useCustomerSchema } from "../schema/user.schema";
const {schema, schemaKey} = useCustomerSchema();

import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { useI18n } from "vue-i18n";
const { push } = useRouter();
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const imageErrorMessage = ref<string>("");
const { create } = customerStore();
const initialFormState: CustomerEntity = {
  customer_id: "",
  id: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  groups: [], // Empty array for groups of type number[]
  user_permissions: [], // Empty array for user_permissions of type number[]
  avatar: undefined, // Avatar should be `undefined` initially (assuming type is `File | undefined`)
  email: "",
  type: "general",
  password: "",
  password_confirmation: "",
};
// Define computed properties for translated placeholders
const { t } = useI18n();
const placeholders = computed(() => ({
  firstName: t("placeholder.user.fname"),
  lastName: t("placeholder.user.lname"),
  phoneNumber: t("placeholder.user.phone_number"),
  email: t("placeholder.user.email"),
  password: t("placeholder.user.password"),
  confirmPassword: t("placeholder.user.confirm_password"),
}));
const form = ref();
const loading = ref(false);
const userFormState = ref<CustomerEntity>({
  ...initialFormState,
});
const resetForm = () => {
  userFormState.value = { ...initialFormState };
};
const handleOrderDetailsSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      loading.value = true;
      try {
        if (
          userFormState.value.password ===
          userFormState.value.password_confirmation
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          await create(userFormState.value); // ตรวจสอบ response

          // console.log("บันทึกสำเร็จ", response);

          notification.success({
            message: "Save Success",
            description: "ບັນທຶກສຳເລັດ",
          });
          resetForm();
          loading.value = false;
          push({ name: "customers" });
        } else {
          notification.warn({
            message: "warn",
            description: "ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ",
          });
        }
      } catch (error: any) {
        if (error.status === 400) {
          notification.error({
            message: "ເຕືອນ",
            description: "ອີເມວນີ້ມີໃນລະບົບແລ້ວ.",
          });
          loading.value = false;
        } else {
          notification.error({
            message: "Failed",
            description: "ຜິດຜາດ",
          });
          loading.value = false;
        }
      }
    })
    .catch((error: unknown) => {
      console.log("error", error);
    });
};

const roles = ref<RolesEntity[]>([]);
const permissions = ref<RolesPermissionsEntity[]>([]);
const loadingRoles = ref<boolean>(true);
const loadingPermission = ref<boolean>(true);

// Handle image upload
function onUpload(avatar: any) {
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (avatar.size > maxSizeBytes) {
    imageErrorMessage.value = `ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ ${maxSizeMB}MB`;
    return false;
  }

  imageErrorMessage.value = "";
  const objectURL = URL.createObjectURL(avatar);
  avatar.objectURL = objectURL;
  userFormState.value.avatar = avatar;
  return false;
}

const clearImage = () => {
  userFormState.value.avatar = undefined;
};

// Fetch roles on mount
onMounted(async () => {
  await getAll();
  roles.value = state.data.props.map((role: RolesEntity) => ({
    id: role.id,
    name: role.name,
  }));
  loadingRoles.value = false;

  await getAllPer();
  permissions.value = statePermission.data.props.map(
    (per: RolesPermissionsEntity) => ({
      id: per.id,
      name: per.name,
    })
  );
  loadingPermission.value = false;
});

const activeKey = ref(["2"]);
const activeKeyPermission = ref(["2"]);
</script>
<style scoped>
.ant-select-selection-search-input {
  /* Ensure the overall height is specified */
  height: 48px;
  width: 50%;
}

/* Ensure the selector itself is set to the desired height */
.custom-select .ant-select-selector {
  height: 48px !important; /* Force height to 48px */
  line-height: 48px !important; /* Center text vertically */
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Center items vertically */
}

/* Adjust padding inside the select */
.custom-select .ant-select-selector .ant-select-selection-item {
  padding: 0 12px; /* Adjust padding for text */
}

/* Ensure the dropdown menu has adequate height */
.custom-select .ant-select-dropdown {
  min-height: 200px; /* Adjust as needed */
}

.image-container {
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 10rem;
}

.image-container .hover-message {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex; /* Center the text */
}

.image-container:hover .hover-message {
  display: flex; /* Show hover message */
}
</style>
