<template>
    <div class="logo">
            <img src="https://img.freepik.com/free-vector/hand-drawn-international-beer-day-concept_23-2148575018.jpg?w=996&t=st=1715423916~exp=1715424516~hmac=fca663993514dfa599b25ab43627d15b6530742cdd77b0a60ed86e40e1122250">
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="sidebar-menu">
        <a-menu-item key="1" class="menu" @click="pushRouter('orders')">
            <shopping-cart-outlined class="menu-icon" />
            <span>ລາຍການສັ່ງຊື້</span>
        </a-menu-item>
        <a-menu-item key="2" class="menu" @click="pushRouter('purchase')">
            <shopping-outlined class="menu-icon" />
            <span>ນຳເຂົ້າສີນຄ້າ</span>
        </a-menu-item>
        <a-menu-item key="3" class="menu">
            <clock-circle-outlined class="menu-icon" />
            <span>ປະຫວັດການນຳເຂົ້າ</span>
        </a-menu-item>
        <!-- ant-menu-submenu-open -->
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
    import { useRouter } from 'vue-router';


    const router = useRouter()

    const selectedKeys = ref<string[]>(['1']);
    const routeName = router.currentRoute.value.name;

    if (routeName === 'orders') {
        selectedKeys.value = ['1'];
    } else if (routeName === 'purchase') {
        selectedKeys.value = ['2'];
    } else {
        selectedKeys.value = ['1'];
    }

    const pushRouter = (routeName: any) => {
        router.push({ name: routeName});
    }
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
</style>
