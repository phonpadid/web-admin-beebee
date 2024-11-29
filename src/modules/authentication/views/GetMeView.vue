<template>
  <div class="pb-4 flex justify-between">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      {{ $t("me.detail") }}
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
    <!-- Upload Section -->
    <a-form-item label=" " class="-mt-12" name="avatar">
      <div class="flex flex-col items-center sm:items-start gap-6">
        <a-image
          v-if="avatarPreviewURL || userFormState.avatar"
          :src="avatarPreviewURL || userFormState.avatar"
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
          class="my-4"
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
        v-if="userFormState.avatar"
        class="ml-4 text-red-600"
      >
        {{ $t("customers.table_field.btn.remove") }}
      </a-button>
    </a-form-item>
    <!-- Input Fields -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item
        :label="$t('users.table_field.fname')"
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
        :label="$t('users.table_field.lname')"
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
        :label="$t('users.table_field.phone_number')"
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
        :label="$t('users.table_field.email')"
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
    <!-- Role Selection -->
    <a-collapse v-model:activeKey="activeKey" class="mt-2">
      <a-collapse-panel
        key="1"
        :header="$t('users.table_field.get_roles')"
        name="groups"
        class="w-full"
      >
        <div v-if="loadingRoles">ບໍ່ມີບົດບາດ...</div>
        <a-checkbox-group
          v-else
          v-model:value="userFormState.groups"
          class="flex flex-wrap gap-4"
        >
          <a-checkbox v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>

    <a-collapse v-model:activeKey="activeKeyPermission" class="mt-8">
      <a-collapse-panel
        key="1"
        :header="$t('users.table_field.get_permissions')"
        name="user_permission"
        class="w-full"
      >
        <div v-if="loadingPermission">ບໍ່ມີສິດທີ່</div>
        <a-checkbox-group
          v-else
          v-model:value="userFormState.user_permissions"
          class="flex flex-wrap gap-4"
        >
          <a-checkbox
            v-for="perm in permissions"
            :key="perm.id"
            :value="perm.id"
          >
            {{ perm.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>

    <div class="md:flex md:flex-row flex-col mt-4">
      <a-form-item label="" name="is_superuser" class="md:w-[10rem]">
        <a-checkbox
          :checked="userFormState.is_superuser"
          @change="userFormState.is_superuser = $event.target.checked"
        >
          {{ $t("users.table_field.super_user") }}
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="is_staff" class="md:w-[10rem]">
        <a-checkbox
          :checked="userFormState.is_staff"
          @change="userFormState.is_staff = $event.target.checked"
        >
          {{ $t("users.table_field.staff") }}
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="is_active" class="md:w-[10rem]">
        <a-checkbox
          :checked="userFormState.is_active"
          @change="userFormState.is_active = $event.target.checked"
        >
          {{ $t("users.table_field.status") }}
        </a-checkbox>
      </a-form-item>
    </div>
    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit">{{
          $t("me.btn")
        }}</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
const avatarPreviewURL = ref<string | null>(null);
import { rolesStore } from "@/modules/roles/store/role.store";
import { usersStore } from "@/modules/user/store/index";
import { useAuthStore } from "../store/index";
import { notification } from "ant-design-vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { useUpdateUserSchema } from "@/modules/user/schema/update-user.schema";
import { useI18n } from "vue-i18n";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
const { schema, schemaKey } = useUpdateUserSchema();
const imageErrorMessage = ref<string>("");

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
  userFormState.value.avatar = avatar; // Store the File object directly
  return false; // Prevent the default upload behavior
}

const clearImage = () => {
  userFormState.value.avatar = undefined;
  avatarPreviewURL.value = "";
};

const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const { update } = usersStore();
const { stateGetMe } = useAuthStore();
const uploadImg = ref<string | File | null>(null);
  const loading = ref(false);
  const userFormState = ref<UserEntity>({
  id: "",
  first_name: "",
  last_name: "",
  type: "",
  phone_number: "",
  groups: [],
  is_active: false,
  is_superuser: false,
  is_staff: false,
  user_permissions: [],
  avatar: undefined, // Keep this strictly a File object
  email: "",
});
//translate placeholder
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
const loadingRoles = ref<boolean>(true);
const loadingPermission = ref<boolean>(true);
const activeKey = ref(["1"]);
const activeKeyPermission = ref(["1"]);
const roles = ref<RolesEntity[]>([]);
const permissions = ref<PermissionsEntity[]>([]);
const handleOrderDetailsSubmit = async () => {
  form.value
  .validate()
  .then(async () => {
      loading.value = true;
      await update(userFormState.value, userFormState.value.id);
      notification.success({
        message: "Save Success",
        description: "User saved successfully!",
      });
    })
    .catch((error: any) => {
      if (error.status === 403) {
        notification.warn({
          message: "ເຕືອນ",
          description: "ທ່ານບໍ່ມີສິດແກ້ໄຂ",
        });
      }
    });
};

// Populate user form with data
const populateUserForm = async () => {
  try {
    // Fetch roles
    await getAll();
    roles.value =
      state.data?.props?.map((role: RolesEntity) => ({
        id: role.id,
        name: role.name,
      })) || [];
    loadingRoles.value = false;

    // Fetch permissions
    await getAllPer();
    permissions.value =
      statePermission.data?.props?.map((perm: any) => ({
        id: perm.id,
        name: perm.name,
      })) || [];
    loadingPermission.value = false;

    // Fetch user data
    if (stateGetMe?.data) {
      const userData = stateGetMe.data;

      userFormState.value = {
        ...(userData as any),
        groups: Array.isArray(userData.groups)
          ? userData.groups.map((role: any) => role.id)
          : [],
        user_permissions: Array.isArray(userData.user_permissions)
          ? userData.user_permissions.map((perm: any) => perm.id)
          : [],
      };

      // Set avatar if available
      uploadImg.value = userData.avatar || null;
    }
  } catch (error) {
    console.error("Error populating user form:", error);
  }
};

// Watch for changes in stateGetMe and update userFormState
watch(
  () => stateGetMe.data,
  (newData: any) => {
    if (newData) {
      userFormState.value = {
        ...userFormState.value,
        id: newData.id || "",
        first_name: newData.first_name || "",
        last_name: newData.last_name || "",
        phone_number: newData.phone_number || "",
        email: newData.email || "",
        is_superuser: newData.is_superuser || "",
        is_active: newData.is_active || "",
        is_staff: newData.email || "",
        groups: newData.groups.map((role: RolesEntity) => role.id) || [],
        user_permissions:
          newData.user_permissions.map(
            (perm: PermissionsEntity) => perm.id
          ) || [],
        avatar: newData.avatar || "",
      };
      uploadImg.value = newData.avatar || "";
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await populateUserForm();
});

// const onUpload = (file: File) => {
//   uploadImg.value = URL.createObjectURL(file);
//   return false;
// };
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
