<template>
  <div class="pb-4 flex justify-between">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ລາຍລະອຽດ
    </p>
  </div>

  <a-form
    layout="vertical"
    ref="form"
    :rules="updateUserShcema"
    :model="userFormState"
    class="flex-col flex"
  >
    <!-- Upload Section -->
    <a-form-item class="flex items-center justify-start mb-10" name="avatar">
      <a-upload
        v-model:value="userFormState.avatar"
        :showUploadList="false"
        accept=".png, .jpeg, .jpg"
        :before-upload="onUpload"
      >
        <span v-if="imageErrorMessage" class="text-red-500">
          {{ imageErrorMessage }}
        </span>
        <div
          v-if="uploadImg"
          id="photo"
          class="w-[200px] h-[150px] rounded-md border"
          :style="{
            backgroundImage: `url(${uploadImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        ></div>
        <div
          v-else
          class="flex-col w-[200px] h-[150px] rounded-md flex justify-center items-center hover:ring-1 border-dashed border-2 border-sky-500 ring-slate-200 ring-1 hover:bg-slate-200 shadow-md"
        >
          <div class="ant-upload-text text-slate-500">ເລືອກຮູບພາບ</div>
        </div>
      </a-upload>
      <a-button
        v-if="userFormState.avatar"
        class="text-red-700 ml-2 -top-3 hover:text-red-600"
        @click="clearImage"
      >
        <DeleteOutlined />
      </a-button>
    </a-form-item>

    <!-- Input Fields -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item label="ຊື່" name="first_name" class="w-full">
        <a-input
          placeholder="ກະລຸນາປ້ອນຊື່"
          class="h-12"
          v-model:value="userFormState.first_name"
        />
      </a-form-item>
      <a-form-item label="ນາມສະກຸນ" name="last_name" class="w-full">
        <a-input
          placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
          class="h-12"
          v-model:value="userFormState.last_name"
        />
      </a-form-item>
    </div>

    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item label="ເບິໂທ" name="phone_number" class="w-full">
        <a-input
          placeholder="ກະລຸນາປ້ອນເບີໂທ"
          class="h-12"
          v-model:value="userFormState.phone_number"
        />
      </a-form-item>
      <a-form-item label="ອີເມວ" name="email" class="w-full">
        <a-input
          placeholder="ກະລຸນາປ້ອນອີເມວ"
          class="h-12"
          v-model:value="userFormState.email"
        />
      </a-form-item>
    </div>
    <!-- Role Selection -->
    <a-collapse v-model:activeKey="activeKey" class="mt-2">
      <a-collapse-panel
        key="1"
        header="ກຳນົດບົດບາດໃຫ້ຜູ້ໃຊ້"
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
        header="ກຳນົດສິດທີ່ໃຫ້ຜູ້ໃຊ້"
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
          super user
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="is_staff" class="md:w-[10rem]">
        <a-checkbox
          :checked="userFormState.is_staff"
          @change="userFormState.is_staff = $event.target.checked"
        >
          ພະນັກງານ
        </a-checkbox>
      </a-form-item>
      <a-form-item label="" name="is_active" class="md:w-[10rem]">
        <a-checkbox
          :checked="userFormState.is_active"
          @change="userFormState.is_active = $event.target.checked"
        >
          ສະຖານະ
        </a-checkbox>
      </a-form-item>
    </div>
    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit"
          >ປ່ຽນຂໍ້ມູນໂປຣຟາຍ</a-button
        >
      </a-form-item>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { rolesStore } from "@/modules/roles/store/role.store";
import { usersStore } from "@/modules/user/store/index";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";
import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { updateUserShcema } from "@/modules/user/schema/update-user.schema";
import { DeleteOutlined } from "@ant-design/icons-vue";
const imageErrorMessage = ref<string>("");

const clearImage = () => {
  userFormState.value.avatar = undefined; // Reset the avatar in form state
  uploadImg.value = ""; // Reset image preview
};

const { push } = useRouter();
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const { update } = usersStore();
const { stateGetMe } = useAuthStore();
const uploadImg = ref<string | File | null>(null);
const userFormState = ref<UserEntity>({
  id: "",
  first_name: "",
  last_name: "",
  user_type: 0,
  phone_number: "",
  groups: [],
  is_active: false,
  is_superuser: false,
  is_staff: false,
  user_permissions: [],
  avatar: undefined,
  email: "",
  password: "",
});
const form = ref();
const loadingRoles = ref<boolean>(true);
const loadingPermission = ref<boolean>(true);
const activeKey = ref(["1"]);
const activeKeyPermission = ref(["1"]);
const roles = ref<RolesEntity[]>([]);
const permissions = ref<RolesPermissionsEntity[]>([]);
const handleOrderDetailsSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      console.log('userId:', userFormState.value.id);
      
      await update(userFormState.value, userFormState.value.id);
      notification.success({
        message: "Save Success",
        description: "User saved successfully!",
      });
    })
    .catch((error: any) => {
     if(error.status === 403) {
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
    roles.value = state.data?.props?.map((role: RolesEntity) => ({
      id: role.id,
      name: role.name,
    })) || [];
    loadingRoles.value = false;

    // Fetch permissions
    await getAllPer();
    permissions.value = statePermission.data?.props?.map(
      (perm: RolesPermissionsEntity) => ({
        id: perm.id,
        name: perm.name,
      })
    ) || [];
    loadingPermission.value = false;

    // Fetch user data
    if (stateGetMe?.data) {
      const userData = stateGetMe.data;

      userFormState.value = {
        ...userData,
        groups: Array.isArray(userData.groups)
          ? userData.groups.map((role: RolesEntity) => role.id)
          : userData.groups,
        user_permissions: Array.isArray(userData.user_permissions)
          ? userData.user_permissions.map(
              (perm: RolesPermissionsEntity) => perm.id
            )
          : userData.user_permissions,
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
            (perm: RolesPermissionsEntity) => perm.id
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

const onUpload = (file: File) => {
  uploadImg.value = URL.createObjectURL(file);
  return false;
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
