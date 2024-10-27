<template>
  <div class="logo">
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-international-beer-day-concept_23-2148575018.jpg?w=996&t=st=1715423916~exp=1715424516~hmac=fca663993514dfa599b25ab43627d15b6530742cdd77b0a60ed86e40e1122250"
    />
  </div>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    class="sidebar-menu"
  >
    <a-menu-item key="1" class="menu" @click="goToRoute('admin_dashboard')">
      <home-outlined class="menu-icon" />
      <span>ຫນ້າຫລັກ</span>
    </a-menu-item>
    <a-menu-item key="2" class="menu" @click="goToRoute('customer')">
      <shopping-cart-outlined class="menu-icon" />
      <span>ລາຍການສັ່ງຊື້</span>
    </a-menu-item>
    <a-menu-item key="3" class="menu" @click="goToRoute('tenants')">
      <shopping-outlined class="menu-icon" />
      <span>tenants</span>
    </a-menu-item>
    <a-menu-item key="4" class="menu">
      <clock-circle-outlined class="menu-icon" />
      <span>ປະຫວັດການນຳເຂົ້າ</span>
    </a-menu-item>
    <!-- ant-menu-submenu-open -->
    <!-- <a-sub-menu key="sub1" class="sub-menu">
      <template #title>
        <span>
          <setting-outlined class="menu-icon" />
          <span class="title">ຈັດການຂໍ້ມູນຫຼັກ</span>
        </span>
      </template>
      <a-menu-item key="5" class="menu">ໝວດໝູ່ ສີນຄ້າ</a-menu-item>
      <a-menu-item key="6" class="menu">ປະເພດ ສີນຄ້າ</a-menu-item>
      <a-menu-item key="7" class="menu">ຮ້ານຄ້າ</a-menu-item>
    </a-sub-menu> -->
    <a-sub-menu key="sub2" class="sub-menu">
      <template #title>
        <span>
          <setting-outlined class="menu-icon" />
          <span class="title">ຈັດການຂໍ້ມູນຫຼັກ</span>
        </span>
      </template>
      <a-menu-item key="8" class="menu" @click="goToRoute('user')">ຜູ້ໃຊ້</a-menu-item>
      <a-menu-item key="9" class="menu" @click="goToRoute('roles')">ບົດບາດ</a-menu-item>
      <a-menu-item key="10" class="menu" @click="goToRoute('permissions')">ສິດທີ່</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([]);

const routeToKeyMap: Record<string, string> = {
  admin_dashboard: "1",
  customer: "2",
  tenants: "3",
  user: "8",
  roles: "9",
  permissions: "10"
};
watchEffect(() => {
  const routeName = route.name as string;
  selectedKeys.value = [routeToKeyMap[routeName] || "1"];
});
const goToRoute = async (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<style lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8125rem 0.5rem 0.8125rem 1rem;
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  img {
    width: 4rem;
    height: 4rem;
    margin-right: 0.8rem;
    margin-left: 0.25rem;
    object-fit: contain;
    border-radius: 5px;
  }
}
</style>
