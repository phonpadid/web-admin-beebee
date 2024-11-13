<template>
  <div class=" ">
    <a-layout-header style="background: #fff">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="onCollapsed"
        style="font-size: 20px; margin-left: -35px"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="onCollapsed"
        style="margin-left: -35px; font-size: 20px"
      />
  
      <div class="header-action-container">
        <a-badge count="2">
          <a-avatar shape="square" size="large" class="navbar-btn">
            <shopping-cart-outlined class="menu-icon" />
          </a-avatar>
        </a-badge>
        <a-badge count="3">
          <a-avatar shape="square" size="large" class="navbar-btn">
            <comment-outlined class="menu-icon" />
          </a-avatar>
        </a-badge>
            <ShowMeView/>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  ShoppingCartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/modules/authentication/store/index";
import ShowMeView from "@/modules/authentication/views/ShowMeView.vue";
const collapsed = ref<boolean>(false);
const { showMe } = useAuthStore();
const emit = defineEmits<{ (e: "toggleSidebar"): void }>();

const onCollapsed = () => {
  collapsed.value = !collapsed.value;
  emit("toggleSidebar");
};
onMounted(async () => {
  await showMe();
});
</script>

<style lang="scss">
.header-action-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-right: -25px;

  .navbar-btn {
    background-color: rgb(191, 219, 254);
    color: rgb(59, 130, 246);
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50% !important;
    padding-right: 0;
    padding-left: 0;
    text-align: center !important;

    :hover {
      cursor: pointer;
    }
  }
}

.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logout-container {
  position: relative;
}

.logout-popup {
  position: absolute;
  right: 0;
  z-index: 1000;
  border-radius: 4px;
  padding: 2px;
  background-color: white; // Set background for the popup
  a-button {
    width: 100%;
  }
}

/* Transition for fade-in and fade-out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.confirm-buttons {
  display: flex;
  gap: 10px; // Space between Yes and Cancel buttons
}
</style>
