<template>
  <a-layout style="min-height: 100vh; overflow: hidden">
    <!-- Sidebar -->
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
      <div class="min-w-full flex transition-all sticky -mt-1" style="background: #fff; padding: 10px;">
        <a-breadcrumb>
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
            :style="{ fontSize: '16px', fontWeight: '500' }"
          >
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>

        <!-- Global search input -->
        <a-input-search 
          v-if="isSearchableRoute"
          v-model:value="searchQuery"
          :placeholder="searchPlaceholder"
          style="width: 200px; margin-left: 20px; display: inline-block;"
          @search="onSearch"
        />
      </div>

      <!-- Main content area where router-view will be loaded -->
      <a-layout-content
        :style="{ margin: '10px 10px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <!-- Pass searchQuery only when needed -->
        <router-view :search-query="isSearchableRoute ? searchQuery : null" />
        <!-- Footer -->
        <Footer />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import { useI18n } from "vue-i18n";

// Router and layout state
const route = useRoute();
const { t } = useI18n();
const collapsed = ref<boolean>(false);
const searchQuery = ref<string>("");

// Check if the current route requires a search query
const isSearchableRoute = computed(() => {
  return route.name === 'roles.index' || 
         route.name === 'user' ||
         route.name === 'permissions' ||
         route.name === 'customers' ||
         route.name === 'tenants';
});

// Breadcrumbs items (skips the root path)
const breadcrumbItems = computed(() => {
  return route.matched
    .filter((_, idx) => idx !== 0) // Skip the root path
    .flatMap((matched) => {
      const labels = matched.meta.label as string[] | undefined;
      return labels ? labels.map((item) => t(item)) : [];
    });
});

// Computed property for translating placeholder
const searchPlaceholder = computed(() => t("messages.placeholer.search"));

// Search function to update searchQuery
function onSearch(value: string) {
  searchQuery.value = value;
}
</script>

<style lang="scss">
/* Add any additional styling here */
</style>
