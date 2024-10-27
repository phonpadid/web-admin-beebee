<template>
  <div class="pb-4 flex justify-between">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ຟອມຜູ້ໃຊ້ລະບົບ
    </p>
  </div>

  <a-form 
  layout="vertical" 
  ref="form" 
  :rules="UserShcema"
  :model="userFormState"
  class="flex-col flex">
    <!-- Upload section -->
    <a-form-item class="flex items-center justify-start mb-10" name="avatar">
      <a-upload
      v-model:value="userFormState.avatar"
        :showUploadList="false"
        accept=".png, .jpeg, .jpg"
        :beforeUpload="onUpload"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
        class="text-red-700 ml-2 hover:text-red-600"
        @click="clearImage"
      >
        <DeleteOutlined />
      </a-button>
    </a-form-item>

    <!-- Input fields -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item label="ຊື່" name="first_name" class="w-full">
        <a-input placeholder="ກະລຸນາປ້ອນຊື່" class="h-12" v-model:value="userFormState.first_name"/>
      </a-form-item>
      <a-form-item label="ນາມສະກຸນ" name="last_name" class="w-full">
        <a-input placeholder="ກະລຸນາປ້ອນນາມສະກຸນ" class="h-12" v-model:value="userFormState.last_name" />
      </a-form-item>
    </div>

    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item label="ເບິໂທ" name="phone_number" class="w-full">
        <a-input placeholder="ກະລຸນາປ້ອນເບີໂທ" class="h-12" v-model:value="userFormState.phone_number"/>
      </a-form-item>
      <a-form-item label="ອີເມວ" name="email" class="w-full">
        <a-input placeholder="ກະລຸນາປ້ອນອີເມວ" class="h-12" v-model:value="userFormState.email" />
      </a-form-item>
    </div>

    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item label="ລະຫັດຜ່ານ" name="password" class="w-full">
        <a-input-password
          type="password"
          placeholder="ປ້ອນລະຫັດຜ່ານ"
          class="h-12"
          v-model:value="userFormState.password"
        />
      </a-form-item>
      <a-form-item label="ຢືນຢັນລະຫັດຜ່ານ" name="password_confirmation" class="w-full">
        <a-input-password
          type="password"
          placeholder="ປ້ອນລະຫັດຜ່ານອີກຄັ້ງ"
          class="h-12"
          v-model:value="userFormState.password_confirmation"
        />
      </a-form-item>
    </div>

    <!-- Role Selection -->
    <a-collapse v-model:activeKey="activeKey" class="mt-2">
      <a-collapse-panel key="2" header="ກຳນົດບົດບາດໃຫ້ຜູ້ໃຊ້" name="groups" class="w-full">
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
      <a-collapse-panel key="2" header="ກຳນົດສິດທີ່ໃຫ້ຜູ້ໃຊ້" name="user_permission" class="w-full">
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

    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit">ບັນທຶກ</a-button>
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
import { rolesPermissionsStore } from "@/modules/role_permissions/store/role.permissions.store";
import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
import { UserEntity } from "../entity/user.entity";
import { usersStore } from "../store/index";
import { notification } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";

const { push } = useRouter();
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const uploadImg = ref<string>("");

const { create, stateGetOne, getOneUser } = usersStore();

const initialFormState: UserEntity = {
  id: "",
  first_name: "",
  last_name: "",
  status: "",
  user_type: "",
  phone_number: "",
  groups: [],
  user_permissions: [],
  avatar: "",
  email: "",
  password: "",
};

const form = ref();
const userFormState = ref<UserEntity>({ ...initialFormState });
let nextId = ref(1);

const resetForm = () => {
  userFormState.value = { ...initialFormState };
};

const handleOrderDetailsSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        userFormState.value.id = nextId.value.toString();
        nextId.value += 1;
        await create(userFormState.value);
        notification.success({
          message: "Save Success",
          description: "ບັນທຶກສຳເລັດ",
        });
        resetForm();
        push({ name: "order_details" });
      } catch (success) {
        notification.success({
          message: "Success",
          description: "ບັນທຶກສຳເລັດ",
        });
        push({ name: "user" });
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
    // Populate userFormState with user data
    userFormState.value = {
      ...userData,
      groups: userData.groups.map((role: RolesEntity) => role.id),
      user_permissions: userData.user_permissions.map((perm: RolesPermissionsEntity) => perm.id),
    };
    uploadImg.value = userData.avatar; // Set avatar
  }
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
</style>
