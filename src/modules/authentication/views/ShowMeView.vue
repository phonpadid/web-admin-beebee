<script setup lang="ts">
import { notification } from "ant-design-vue";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import ModalChangePassword from "../components/ModalChangePassword.vue";
import defaultAvatar from "@/assets/profile.jpg";

const router = useRouter();
const { logout, stateGetMe, showMe } = useAuthStore();
const openDrawer = ref(false);
const openModalChangePassword = ref(false);

const showDrawer = () => {
  openDrawer.value = true;
};

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

// Computed property to handle avatar URL or default image
const avatarUrl = computed(() => {
  const avatar = stateGetMe.data?.avatar;
  if (typeof avatar === 'string') {
    return avatar;
  } else if (avatar instanceof Blob) {
    return URL.createObjectURL(avatar);
  } else {
    return defaultAvatar;
  }
});
</script>

<template>
  <div class="setting">
    <a-tooltip placement="bottom">
      <template #title>
        <span class="custom-tooltip-text text-[12px]">{{ $t('setting.hover') }} </span>
      </template>
      <span class="md:text-lg text-[12px] font-bold text-slate-700" @click="showDrawer">
        <div class="w-10 h-10 rounded-full">
          <img
            :src="avatarUrl"
            alt="Profile Avatar"
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
        </div>
      </span>
    </a-tooltip>
  </div>

  <a-drawer v-model:open="openDrawer" :title="$t('setting.title_setting')" :width="300" placement="right">
    <div class="-mt-4 px-2 py-2 shadow-md h-full bg-slate-100 rounded-md">
      <div @click="navigateToProfile" class="flex items-center gap-2 py-1 px-1 ring-1 ring-slate-200 cursor-pointer hover:bg-slate-200 rounded-md">
        <img
          :src="avatarUrl"
          alt="Profile Avatar"
          class="w-10 h-10 rounded-full"
        />
        <p class="text-slate-600 mt-4 text-[14px]">{{ stateGetMe.data?.email }}</p>
      </div>

      <!-- Language Selection Dropdown -->
      <!-- <div class="select-language mt-4 h-[50px] w-full flex items-center gap-2 ring-1 ring-slate-200 hover:bg-slate-200 shadow-md py-1 px-3 rounded-md text-slate-500 text-[14px]">
        <label for="language-select" class="text-slate-500">{{ $t('language') }}:</label>
        <select id="language-select" v-model="locale" @change="changeLanguage" class="flex-1 bg-transparent outline-none">
          <option v-for="lang in languages" :key="lang.value" :value="lang.value">
            {{ lang.name }}
          </option>
        </select>
      </div> -->

      <button @click="openModal" class="mt-4 h-[50px] w-full flex items-center gap-2 ring-1 ring-slate-200 hover:bg-slate-200 shadow-md py-1 px-3 cursor-pointer rounded-md text-slate-500 text-[14px]">
        {{ $t("setting.change_password") }}
      </button>
      <ModalChangePassword 
      v-model:openModalChangePassword="openModalChangePassword"
       hidden
      />
      <a-popconfirm 
      :title="$t('setting.logout.ask.messages')" 
      :ok-text="$t('setting.logout.ask.okay')" :cancel-text="$t('setting.logout.ask.cancel')" 
      placement="bottom"
      @confirm="confirmLogout" 
      @cancel="cancelLogout">
        <button class="mt-4 h-[50px] w-full flex items-center gap-2 ring-1 ring-slate-200 hover:bg-slate-200 shadow-md py-1 px-3 cursor-pointer rounded-md text-slate-500 text-[14px]">
          {{ $t("setting.logout.title") }}
        </button>
      </a-popconfirm>
    </div>
  </a-drawer>
</template>

<style scoped>
.setting {
  display: flex;
  align-items: center;
}
</style>
