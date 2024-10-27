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
      :rules="UserSchema"
      :model="userFormState"
      class="flex-col flex"
    >
      <!-- Upload Section -->
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
        <a-button class="text-red-700 ml-2 hover:text-red-600" @click="clearImage">
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
        <a-collapse-panel key="1" header="ກຳນົດບົດບາດໃຫ້ຜູ້ໃຊ້" name="groups" class="w-full">
          <div v-if="loadingRoles">Loading roles...</div>
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
        <a-collapse-panel key="1" header="ກຳນົດສິດທີ່ໃຫ້ຜູ້ໃຊ້" name="user_permission" class="w-full">
          <div v-if="loadingPermission">Loading permission...</div>
          <a-checkbox-group
            v-else
            v-model:value="userFormState.user_permissions"
            class="flex flex-wrap gap-4"
          >
            <a-checkbox v-for="perm in permissions" :key="perm.id" :value="perm.id">
              {{ perm.name }}
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
  import { ref, onMounted, watch } from "vue";
  import { rolesStore } from "@/modules/roles/store/role.store";
  import { usersStore } from "@/modules/user/store/index";
  import { useAuthStore } from "../store/index";
  import { useRouter, useRoute } from "vue-router";
  import { notification } from "ant-design-vue";
  import { RolesEntity } from "@/modules/roles/entity/role.entity";
  import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
  import { permissionsStore } from "@/modules/permissions/store/permissions.store";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { MeEntity } from "../entity/me.entity";
  
  const { push } = useRouter();
  const { state, getAll } = rolesStore();
  const { statePermission, getAllPer } = permissionsStore();
  const { create, stateGetOne, getOneUser } = usersStore();
  const { stateGetMe, showMe } = useAuthStore();
  
  const uploadImg = ref<string>("");
  const userFormState = ref<UserEntity>({
    id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    groups: [],
    user_permissions: [],
    avatar: "",
    password: "",
    password_confirmation: "",
  });
  const form = ref();
  let nextId = ref(1);
  const loadingRoles = ref<boolean>(true);
  const loadingPermission = ref<boolean>(true);
  const activeKey = ref(["1"]);
  const activeKeyPermission = ref(["1"]);
  const roles = ref<RolesEntity[]>([]);
  const permissions = ref<RolesPermissionsEntity[]>([]);
  const { params } = useRoute();
  const Id = Number(params.id);
  
  const handleOrderDetailsSubmit = async () => {
    form.value
      .validate()
      .then(async () => {
        userFormState.value.id = nextId.value.toString();
        nextId.value += 1;
        await create(userFormState.value);
        notification.success({
          message: "Save Success",
          description: "User saved successfully!",
        });
      })
      .catch(() => {
        notification.error({
          message: "Validation Error",
          description: "Please fill in all required fields.",
        });
      });
  };
  
  // Populate user form with data
  const populateUserForm = async () => {
    await getAll();
    roles.value = state.data.props.map((role: RolesEntity) => ({
      id: role.id,
      name: role.name,
    }));
    loadingRoles.value = false;
  
    await getAllPer();
    permissions.value = statePermission.data.props.map((perm: RolesPermissionsEntity) => ({
      id: perm.id,
      name: perm.name,
    }));
    loadingPermission.value = false;
  
    await getOneUser(Id);
    if (stateGetMe.data) {
      const userData = stateGetMe.data as MeEntity;
      userFormState.value = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone_number: userData.phone_number || "",
        email: userData.email || "",
        groups: userData.groups.map((role: RolesEntity) => role.id) || [],
        user_permissions: userData.user_permissions.map((perm: RolesPermissionsEntity) => perm.id) || [],
        avatar: userData.avatar || "",
        password: "",
        password_confirmation: "",
      };
      uploadImg.value = userData.avatar || "";
    }
  };
  
  // Watch for changes in stateGetMe and update userFormState
  watch(
    () => stateGetMe.data,
    (newData: any) => {
      if (newData) {
        userFormState.value = {
          ...userFormState.value,
          first_name: newData.first_name || "",
          last_name: newData.last_name || "",
          phone_number: newData.phone_number || "",
          email: newData.email || "",
          groups: newData.groups.map((role: RolesEntity) => role.id) || [],
          user_permissions: newData.user_permissions.map((perm: RolesPermissionsEntity) => perm.id) || [],
          avatar: newData.avatar || ""
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
  
  const clearImage = () => {
    uploadImg.value = "";
    userFormState.value.avatar = "";
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>
  