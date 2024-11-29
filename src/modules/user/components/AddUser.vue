<script lang="ts" setup>
import { rolesStore } from "@/modules/roles/store/role.store";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import { RolesEntity } from "@/modules/roles/entity/role.entity";
import { RolesPermissionsEntity } from "@/modules/role_permissions/entity/role.permissions.entity";
import { UserEntity } from "../entity/user.entity";
import { usersStore } from "../store/index";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import { UserShcema } from "../schema/user.schema";
import { permissionsStore } from "@/modules/permissions/store/permissions.store";
const { push } = useRouter();
const { state, getAll } = rolesStore();
const { statePermission, getAllPer } = permissionsStore();
const imageErrorMessage = ref<string>("");
const { create } = usersStore();
const initialFormState: UserEntity = {
  id: "",
  first_name: "",
  last_name: "",
  user_type: 0, // Assuming `user_type` is a number (e.g., 0 for default type)
  phone_number: "",
  groups: [], // Empty array for groups of type number[]
  user_permissions: [], // Empty array for user_permissions of type number[]
  avatar: undefined, // Avatar should be `undefined` initially (assuming type is `File | undefined`)
  email: "",
  password: "",
  password_confirmation: "",
};
const form = ref();
const loading = ref(false);
const userFormState = ref<UserEntity>({
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
          push({ name: "user" });
        } else {
          notification.warn({
            message: "warn",
            description: "ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ",
          });
        }
      } catch (error) {
        console.log("เกิดข้อผิดพลาด", error);

        // notification.error({
        //   message: "Failed",
        //   description: "ຜິດຜາດ",
        // });
        loading.value = false;
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

const activeKey = ref(["1"]);
const activeKeyPermission = ref(["1"]);
</script>

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
    class="flex-col flex"
  >
    <!-- Upload section -->

    <a-form-item label="" class="-mt-12" name="avatar">
      <div class="flex flex-col items-center sm:items-start gap-6">
        <a-image
          :src="
            typeof userFormState.avatar === 'object' &&
            userFormState.avatar.objectURL
              ? userFormState.avatar.objectURL
              : '/src/assets/nodata.png'
          "
          width="10rem"
          height="10rem"
          style="object-fit: contain"
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
        <a-button> ເລືອກຮູບພາບ </a-button>
      </a-upload>
      <a-button
        @click="clearImage"
        v-if="userFormState.avatar"
        class="ml-4 text-red-600"
      >
        ລົບຮູບ
      </a-button>
    </a-form-item>

    <!-- Input fields -->
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
      <a-form-item label="ເບີໂທ" name="phone_number" class="w-full">
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
      <a-form-item
        label="ຢືນຢັນລະຫັດຜ່ານ"
        name="password_confirmation"
        class="w-full"
      >
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
    <!-- Submit Buttons -->
    <div class="md:flex md:flex-row flex-col gap-4">
      <a-form-item class="flex items-center mt-4 justify-center">
        <a-button type="primary" @click="handleOrderDetailsSubmit"
          >ບັນທຶກ</a-button
        >
        &nbsp;
        <a-button danger @click="push({ name: 'user.list' })">ຍົກເລີກ</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

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
