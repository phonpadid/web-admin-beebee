<script setup lang="ts">
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal, notification } from "ant-design-vue";
import { createVNode, ref , onMounted} from "vue";
import { useAuthStore } from "../store/index";

const { logout, state, showMe } = useAuthStore();
const profileModal = ref<boolean>(false);

const showModal = () => {
  profileModal.value = true;
};

// Drawer state management
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const confirm = async () => {
  await logout();
  notification.success({
    message: "ອອກຈາກລະບົບແລ້ວ",
    description: "ສຳເລັດ",
  });
};

const cancel = () => {
  notification.success({
    message: "ຍົກເລີກການອອກຈາກລະບົບ",
    description: "ຍົກເລີກ",
  });
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
      <span
        class="md:text-lg text-[12px] font-bold text-slate-700"
        @click="showDrawer"
      >
        <div class="w-10 h-10 rounded-full">
            <img
            v-if="state.data?.avatar"
            :src="(state.data?.avatar)"
            alt=""
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
          <img
            v-else
            src="../../../assets/profile.jpg"
            alt=""
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
          </div>
      </span>
    </a-tooltip>
  </div>

  <a-drawer
    v-model:open="open"
    title="ການຕັ້ງຄ່າທົ່ວໄປ"
    :width="300"
    placement="right"
  >
    <div
      class="-mt-4 px-2 py-2 shadow-md h-full bg-slate-100 ring-slate-200 rounded-md ring-1"
    >
      <router-link to="#" @click="showModal">
        <div
          class="flex items-center gap-2 shadow-lg py-1 px-1 ring-1 ring-slate-200 cursor-pointer hover:bg-slate-200 rounded-md"
        >
          <img
            v-if="state.data?.avatar"
            :src="(state.data?.avatar)"
            alt=""
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
          <img
            v-else
            src="../../../assets/profile.jpg"
            alt=""
            class="w-10 h-10 rounded-full flex items-center justify-center"
          />
          <p class="text-slate-600 mt-1">{{ state.data?.email }}</p>
        </div>
      </router-link>

      <a-popconfirm
      title="ເຈົ້າເເນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ ຫຼື ບໍ?"
      ok-text="ເເມ່ນ"
      cancel-text="ຍົກເລີກ"
      @confirm="confirm"
      @cancel="cancel"
      class="text-red-600"
    >
      <button
        class="mt-4 h-[50px] gap-2 w-full items-center ring-1 ring-slate-200 hover:bg-slate-200 shadow-xl py-1 px-3 cursor-pointer rounded-md text-slate-500 text-[15px] flex p-2"
      >
       
          ອອກຈາກລະບົບ
        </button>
      </a-popconfirm>

     
    </div>
  </a-drawer>

</template>

<style scoped></style>
