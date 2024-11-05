<template>
  <div class="pb-4 flex justify-between">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ອັບເດດຂໍ້ມູນ
    </p>
  </div>

  <a-form
    layout="vertical"
    ref="form"
    :rules="updateUserShcema"
    :model="userFormState"
    class="flex-col flex"
  >
    <!-- Upload section -->
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

    <!-- Input fields -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item hidden label="ຊື່" name="id" class="w-full">
        <a-input
          placeholder="ກະລຸນາປ້ອນຊື່"
          class="h-12"
          v-model:value="userFormState.id"
        />
      </a-form-item>
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
        key="2"
        header="ກຳນົດບົດບາດໃຫ້ຜູ້ໃຊ້"
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
        header="ກຳນົດສິດທີ່ໃຫ້ຜູ້ໃຊ້"
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
          >ແກ້ໄຂ</a-button
        >
        &nbsp;
        <a-button danger @click="push({ name: 'user.list' })">ຍົກເລີກ</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { rolesStore } from "@/modules/roles/store/role.store";
import { ref, onMounted, watch } from "vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";
import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
import { UserEntity } from "../entity/user.entity";
import { usersStore } from "../store/index";
import { notification } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { updateUserShcema } from "../schema/update-user.schema";
const router = useRouter();
const { push } = router;
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const uploadImg = ref<string | File | null>(null);

const { update, stateGetOne, getOneUser } = usersStore();

const initialFormState: UserEntity = {
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
};

const form = ref();
const userFormState = ref<UserEntity>({ ...initialFormState });

const resetForm = () => {
  userFormState.value = { ...initialFormState };
  uploadImg.value = ""; // Reset uploaded image preview
};

const handleOrderDetailsSubmit = async () => {
  form.value.validate().then(async () => {
    try {
      await update(userFormState.value, userFormState.value.id);
      notification.success({
        message: "Save Success",
        description: "ແກ້ໄຂສຳເລັດ",
      });
      resetForm();
      push({ name: "user" });
    } catch (error) {
      console.log("error:", error);

      notification.error({
        message: "error",
        description: "ອັບເດດຜິດພາດ",
      });
    }
  });
};

const roles = ref<RolesEntity[]>([]);
const permissions = ref<RolesPermissionsEntity[]>([]);
const loadingRoles = ref<boolean>(true);
const loadingPermission = ref<boolean>(true);

const activeKey = ref(["1"]);
const activeKeyPermission = ref(["1"]);
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
    (perm: RolesPermissionsEntity) => ({
      id: perm.id,
      name: perm.name,
    })
  );
  loadingPermission.value = false;

  await getOneUser(Id);
  if (stateGetOne.data) {
    const userData = stateGetOne.data;

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

    // Set avatar
    uploadImg.value = userData.avatar || null;
  }
};

const imageErrorMessage = ref<string>("");

function onUpload(avatar: File) {
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (avatar.size > maxSizeBytes) {
    imageErrorMessage.value = `ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ ${maxSizeMB}MB`;
    return false;
  }

  imageErrorMessage.value = "";
  const objectURL = URL.createObjectURL(avatar);
  uploadImg.value = objectURL; // Set the upload image preview
  userFormState.value.avatar = avatar; // Store the avatar file

  return false; // Prevent automatic upload
}

const clearImage = () => {
  userFormState.value.avatar = undefined; // Reset the avatar in form state
  uploadImg.value = ""; // Reset image preview
};

onMounted(() => {
  populateUserForm();
});

// Watcher to ensure `user_permissions` updates correctly when data is fetched
watch(
  () => stateGetOne.data,
  (newUser) => {
    if (newUser) {
      const userData = newUser;
      userFormState.value.user_permissions = userData.user_permissions.map(
        (perm: RolesPermissionsEntity) => perm.id
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
