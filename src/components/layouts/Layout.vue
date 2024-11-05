<template>
    <a-layout style="min-height: 100vh;">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible style="background: #fff">
            <SideBar/>
        </a-layout-sider>
        <a-layout>
            <div class="z-40 sticky min-w-full transition-all">
                <Navbar @toggle-sidebar="() => (collapsed = !collapsed)"/>
            </div>
            <a-breadcrumb :style="{ padding: '10px', background: '#fff', minHeight: '10px' }">
                <p style="margin-left: 5px;"></p>
                <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :style="{ fontSize: '16', fontWeight: '500'}">
                    {{ item }}
                </a-breadcrumb-item>
            </a-breadcrumb>

            <a-layout-content :style="{ margin: '10px 10px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view />
            </a-layout-content>
            <Footer/>
        </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import SideBar from './Sidebar.vue';
    import Navbar from './Navbar.vue';
    import Footer from './Footer.vue';
    import { RouteLocationNormalizedLoaded, onBeforeRouteUpdate, useRoute } from 'vue-router';

    const route = useRoute();
    const collapsed = ref<boolean>(false);
    const breadcrumbItems = ref<Array<string>>([]);

    onBeforeRouteUpdate((to: any) => {
        getBreadcrumbItems(to);
    });

    function getBreadcrumbItems(to: RouteLocationNormalizedLoaded) {
        breadcrumbItems.value = [];
        to.matched.forEach((matched, idx) => {
            if (idx !== 0) {
                const labels = matched.meta.label as string[];
                labels.map((item) => {
                    breadcrumbItems.value.push(item as string)
                })
                // matched.meta['label'] ? breadcrumbItems.value.push(matched.meta['label'] as string) : null;
            }
        })
    }

    onMounted(() => {
        getBreadcrumbItems(route);
    })
  </script>

  <style lang="scss">
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }
    
    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
    }
    
    .site-layout .site-layout-background {
        background: #fff;
    }
  </style>
  