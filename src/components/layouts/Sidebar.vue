<template>
  <div class=" transition-all sticky z-10 top-0">
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      class="sidebar-menu"
    >
      <a-menu-item key="1" class="menu" @click="goToRoute('admin_dashboard')">
        <div class="flex items-center">
          <home-outlined class="menu-icon" />
        <span>{{t("messages.menu_sidebar.home")}}</span>
        </div>
      </a-menu-item>
      <a-menu-item key="2" class="menu" @click="goToRoute('customers')">
        <div class="flex items-center">
        <shopping-cart-outlined class="menu-icon" />
        <span>{{t("messages.menu_sidebar.customer")}}</span>
        </div>
      </a-menu-item>
      <a-menu-item key="3" class="menu" @click="goToRoute('tenants')">
        <div class="flex items-center">
        <shopping-outlined class="menu-icon" />
        <span>{{t("messages.menu_sidebar.tenants")}}</span>
        </div>
      </a-menu-item>
      <a-sub-menu key="sub2" class="sub-menu">
        <template #title>
          <span class="flex items-center">
            <setting-outlined class="menu-icon" />
            <span class="title">{{t("messages.menu_sidebar.manage_user")}}</span>
          </span>
        </template>
        <a-menu-item key="8" class="menu" @click="goToRoute('user')"
          >ຜູ້ໃຊ້</a-menu-item
        >
        <a-menu-item key="9" class="menu" @click="goToRoute('roles')"
          >ບົດບາດ</a-menu-item
        >
        <a-menu-item key="10" class="menu" @click="goToRoute('permissions')"
          >ສິດທີ່</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import logo from '@/../public/logo_beer.jpg'
import { ref, watchEffect } from "vue";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([]);

const routeToKeyMap: Record<string, string> = {
  admin_dashboard: "1",
  customers: "2",
  tenants: "3",
  user: "8",
  roles: "9",
  permissions: "10",
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
    width: 10rem;
    height: 10rem;
    margin-right: 0.8rem;
    margin-left: 0.25rem;
    object-fit: contain;
    top: 0;
    margin-top: -1rem;
    border-radius: 5px;
  }
}
</style>
