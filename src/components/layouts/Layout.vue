<template>
    <a-layout style="min-height: 100vh;">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <SideBar/>
        </a-layout-sider>
        <a-layout>
            <Navbar @toggle-sidebar="() => (collapsed = !collapsed)"/>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view />
            </a-layout-content>
            <Footer/>
        </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
    import { ref } from 'vue';
    import SideBar from './Sidebar.vue';
    import Navbar from './Navbar.vue';
    import Footer from './Footer.vue';

    const collapsed = ref<boolean>(false);
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
  