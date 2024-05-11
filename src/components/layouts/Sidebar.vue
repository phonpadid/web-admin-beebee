<template>
    <div class="logo">
            <img src="https://img.freepik.com/free-vector/hand-drawn-international-beer-day-concept_23-2148575018.jpg?w=996&t=st=1715423916~exp=1715424516~hmac=fca663993514dfa599b25ab43627d15b6530742cdd77b0a60ed86e40e1122250">
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="sidebar-menu">
        <a-menu-item key="1" class="menu">
            <shopping-cart-outlined class="menu-icon" />
            <span>ລາຍການສັ່ງຊື້</span>
        </a-menu-item>
        <a-menu-item key="2" class="menu">
            <shopping-outlined class="menu-icon" />
            <span>ນຳເຂົ້າສີນຄ້າ</span>
        </a-menu-item>
        <a-menu-item key="3" class="menu">
            <clock-circle-outlined class="menu-icon" />
            <span>ປະຫວັດການນຳເຂົ້າ</span>
        </a-menu-item>
        <a-sub-menu key="sub1" class="sub-menu">
            <template #title>
                <span>
                <setting-outlined class="menu-icon" />
                <span class="title">ຈັດການຂໍ້ມູນຫຼັກ</span>
                </span>
            </template>
            <a-menu-item key="4" class="menu">ໝວດໝູ່ ສີນຄ້າ</a-menu-item>
            <a-menu-item key="5" class="menu">ປະເພດ ສີນຄ້າ</a-menu-item>
            <a-menu-item key="6" class="menu">ຮ້ານຄ້າ</a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import {
        ShoppingCartOutlined,
        SettingOutlined,
        ShoppingOutlined,
        ClockCircleOutlined
    } from '@ant-design/icons-vue';
    
    const selectedKeys = ref<string[]>(['1']);
</script>

<style lang="scss">
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .8125rem .5rem .8125rem 1rem;
        width: 100%;
        height: 100px;
        background: rgba(255, 255, 255, .2);
        img {
            width: 4rem;
            height: 4rem;
            margin-right: .8rem;
            margin-left: .25rem;
            object-fit: contain;
            border-radius: 5px;
        }
    }

    .ant-menu-item-selected, .ant-menu-item-selected a, .ant-menu-item-selected a:hover {
        color: #1890ff !important;
    }
  
    :where(.css-dev-only-do-not-override-16pw25h).ant-layout .ant-layout-sider {
        background: white !important;
    }
    .sidebar-menu {
        background-color: white !important;
    }
    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline.ant-menu-root .ant-menu-item, :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline.ant-menu-root .ant-menu-submenu-title:hover {
        color:black;
    }
    .sidebar-menu .menu:hover {
        span {
            color: #1890ff !important;
        }
    }
    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark .ant-menu-submenu-selected >.ant-menu-submenu-title {
        color: black !important;
    }
    .ant-menu-submenu-title {
        color: black !important;
    }
    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
        background: #fafafa !important;
    }
   
    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark .ant-menu-item-selected {
        background-color: #e6f7ff;
    }
    /* :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline .ant-menu-item:hover {
        background-color: white !important;
    } */

    .menu-icon {
        font-size: 16px !important;
    }
    .sidebar-menu .sub-menu {
        :hover {
            .title {
                color: #1890ff !important;
            }
            .menu-icon {
                color: #1890ff !important;
            }
            .ant-menu-submenu-arrow {
                color: #1890ff;
            }
        }
        .menu:hover {
            background-color: #fafafa !important;
            color: #1890ff;
        }
    }

    :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline-collapsed >.ant-menu-item, :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline-collapsed >.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item, :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline-collapsed >.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title, :where(.css-dev-only-do-not-override-16pw25h).ant-menu-inline-collapsed >.ant-menu-submenu>.ant-menu-submenu-title {
        color: black;
    }
</style>