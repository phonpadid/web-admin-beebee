<template>
  <a-layout style="min-height: 100vh; overflow: hidden">
    <!-- Sidebar (a-layout-sider) -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="background: #fff; position: sticky; top: 0; height: 100vh; overflow: auto;"
    >
      <div class="transition-all sticky top-0 z-10">
        <SideBar />
      </div>
    </a-layout-sider>

    <!-- Main layout -->
    <a-layout style="overflow: auto; height: 100vh;">
      <!-- Navbar -->
      <div class="min-w-full transition-all sticky top-0 z-10">
        <Navbar @toggle-sidebar="() => (collapsed = !collapsed)" />
      </div>

      <!-- Breadcrumbs with Search Bar -->
      <div class="min-w-full transition-all sticky -mt-1">
        <a-breadcrumb :style="{ padding: '10px', background: '#fff', minHeight: '10px' }">
          <p style="margin-left: 5px"></p>
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
            :style="{ fontSize: '16px', fontWeight: '500' }"
          >
            {{ item }}

             <!-- Global search input -->
          <a-input-search 
          v-if="isDataTableView"
          v-model:value="searchQuery"
          placeholder="ຄົ້ນຫາຂໍ້ມູນ..."
          style="width: 200px; margin-left: 50px; margin-top: -6px"
          @search="onSearch"
        />
          </a-breadcrumb-item>
         
        </a-breadcrumb>
      </div>

      <!-- Main content area where router-view will be loaded -->
      <a-layout-content
        :style="{ margin: '10px 10px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <!-- Pass searchQuery to the table in router-view -->
        <router-view :search-query="searchQuery" />
      </a-layout-content>

      <!-- Footer -->
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import SideBar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import { RouteLocationNormalizedLoaded, onBeforeRouteUpdate, useRoute } from "vue-router";

// Router and layout state
const route = useRoute();
const collapsed = ref<boolean>(false);
const breadcrumbItems = ref<Array<string>>([]);
const searchQuery = ref<string>("");
// const inputSearchData = ref<string>("");

const isDataTableView = computed(() => {
  // Change 'data-table-route' to your actual route name or path for the data table page
  return route.name === 'roles.index' || route.name === 'user' || route.name === 'permissions' || route.name === 'customers' || route.name === 'tenants'
});
// Breadcrumbs function
function getBreadcrumbItems(to: RouteLocationNormalizedLoaded) {
  breadcrumbItems.value = [];
  to.matched.forEach((matched, idx) => {
    if (idx !== 0) {
      const labels = matched.meta.label as string[];
      labels.map((item) => {
        console.log('itemddF:', item);
        // inputSearchData.value = item
        breadcrumbItems.value.push(item as string);
        searchQuery.value = "";
      });
    }
  });
}

onBeforeRouteUpdate((to: any) => {
  getBreadcrumbItems(to);
});

onMounted(() => {
  getBreadcrumbItems(route);
});

// Search function to update searchQuery
function onSearch(value: string) {
  searchQuery.value = value;
}
</script>

<style lang="scss">
/* Add any additional styling here */
</style>
