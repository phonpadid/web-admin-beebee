<script setup lang="ts">
import { notification } from "ant-design-vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import ModalChangePassword from "../components/ModalChangePassword.vue";
import defaultAvatar from "@/assets/profile.jpg";

const router = useRouter();
const { logout, stateGetMe, showMe } = useAuthStore();
const openDrawer = ref(false);

const showDrawer = () => {
  openDrawer.value = true;
};

// This controls the visibility of the ModalChangePassword component
const openModalChangePassword = ref(false);

// Function to set modal to open
const openModal = () => {
  openDrawer.value = false;
  openModalChangePassword.value = true;
};

const confirmLogout = async () => {
  await logout();
  notification.success({
    message: "ອອກຈາກລະບົບແລ້ວ",
    description: "ສຳເລັດ",
  });
};

const cancelLogout = () => {
  notification.error({
    message: "ຍົກເລີກການອອກຈາກລະບົບ",
    description: "ຍົກເລີກ",
  });
};

const navigateToProfile = () => {
  openDrawer.value = false;
  router.push({ name: "getMe.index" });
};

onMounted(async () => {
  await showMe();
});
</script>

<template>
  <div class="setting">
    <a-tooltip placement="bottom">
      <template #title>
        <span class="custom-tooltip-text text-[12px]">ຕັ້ງຄ່າ</span>
      </template>
      <span class="md:text-lg text-[12px] font-bold text-slate-700" @click="showDrawer">
        <div class="w-10 h-10 rounded-full">
          <img
            :src="stateGetMe.data?.avatar || defaultAvatar"
            alt="Profile Avatar"
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
        </div>
      </span>
    </a-tooltip>
  </div>

  <a-drawer v-model:open="openDrawer" title="ການຕັ້ງຄ່າທົ່ວໄປ" :width="300" placement="right">
    <div class="-mt-4 px-2 py-2 shadow-md h-full bg-slate-100 ring-slate-200 rounded-md ring-1">
      <div @click="navigateToProfile" class="flex items-center gap-2 py-1 px-1 ring-1 ring-slate-200 cursor-pointer hover:bg-slate-200 rounded-md">
        <img
          :src="stateGetMe.data?.avatar || defaultAvatar"
          alt="Profile Avatar"
          class="w-10 h-10 rounded-full"
        />
        <p class="text-slate-600 mt-4 text-[14px]">{{ stateGetMe.data?.email }}</p>
      </div>

      <button @click="openModal" class="mt-4 h-[50px] w-full flex items-center gap-2 ring-1 ring-slate-200 hover:bg-slate-200 shadow-md py-1 px-3 cursor-pointer rounded-md text-slate-500 text-[14px]">
        ປ່ຽນລະຫັດຜ່ານ
      </button>

      <a-popconfirm 
      title="ທ່ານຕ້ອງການອອກຈາກລະບົບ ຫຼື ບໍ?" 
      ok-text="ເເມ່ນ" cancel-text="ຍົກເລີກ" 
      placement="bottom"
      @confirm="confirmLogout" 
      @cancel="cancelLogout">
        <button class="mt-4 h-[50px] w-full flex items-center gap-2 ring-1 ring-slate-200 hover:bg-slate-200 shadow-md py-1 px-3 cursor-pointer rounded-md text-slate-500 text-[14px]">
          ອອກຈາກລະບົບ
        </button>
      </a-popconfirm>
    </div>
      <!-- Bind openModalChangePassword with v-model to control modal visibility -->
  <ModalChangePassword 
  v-model:openModalChangePassword="openModalChangePassword"
  />
  </a-drawer>
</template>

<style scoped>
.setting {
  display: flex;
  align-items: center;
}
</style>
