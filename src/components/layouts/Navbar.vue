<template>
  <div>
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
        <a-dropdown>
          <a class="ant-dropdown-link flex items-center ring-1 ring-slate-200 shadow-ms px-2 h-12 rounded-sm gap-2" @click.prevent>
            <!-- <GlobalOutlined /> -->
            <img
              v-if="locale === 'la'"
              src="/public/lao.png"
              alt=""
              srcset=""
              width="20px"
              height="20px"
            />
            <img
              v-else
              src="/public/en.png"
              alt=""
              srcset=""
              width="20px"
              height="20px"
            />
            {{ currentLanguageName }}
            <DownOutlined :style="{ fontSize: '12px' }" />
          </a>
          <template #overlay>
            <a-menu class="language-menu">
              <a-menu-item
                v-for="lang in languages"
                :key="lang.value"
                @click="changeLanguage(lang.value)"
                class="menu-item"
              >
                <div class="flex-item">
                  <img :src="lang.icon" alt="flag" class="flag-icon" />
                  <span>{{ lang.name }}</span>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <ShowMeView />
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import {
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/modules/authentication/store/index";
import ShowMeView from "@/modules/authentication/views/ShowMeView.vue";
import { useI18n } from "vue-i18n";

const collapsed = ref<boolean>(false);
const { showMe } = useAuthStore();
const emit = defineEmits<{ (e: "toggleSidebar"): void }>();

// Toggle sidebar collapse
const onCollapsed = () => {
  collapsed.value = !collapsed.value;
  emit("toggleSidebar");
};

// Localization and language setup
const { t, locale } = useI18n();
const currentLanguageName = ref<string>("");

// Define languages using a computed property
import laIcon from "../../../public/lao.png";
import enIcon from "../../../public/en.png";
const languages = computed(() => [
  { name: t("messages.language.en"), value: "en", icon: enIcon },
  { name: t("messages.language.lo"), value: "la", icon: laIcon },
]);

// Function to update the display name of the current language
const updateCurrentLanguageName = () => {
  const selectedLang = languages.value.find(
    (lang) => lang.value === locale.value
  );
  currentLanguageName.value = selectedLang ? selectedLang.name : "Language";
};

// Update language function now accepts langValue as a parameter
const changeLanguage = (langValue: string) => {
  locale.value = langValue;
  localStorage.setItem("locale", langValue);
  updateCurrentLanguageName(); // Update display name after change
};

// Initialize current language on component mount
onMounted(async () => {
  await showMe();
  updateCurrentLanguageName(); // Set initial language name
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
}

.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.language-menu {
  display: flex;
  flex-direction: column; /* Make the menu items stack vertically */
  padding: 0;
}

.menu-item {
  display: flex; /* Use flexbox for each menu item */
  align-items: center; /* Align items vertically */
  padding: 4px 10px; /* Optional: Adjust padding for better spacing */
}

.flex-item {
  display: flex; /* Flexbox for flag and text */
  align-items: center; /* Vertical center */
}

.flag-icon {
  width: 14px; /* Set flag size */
  height: 14px; /* Set flag size */
  margin-right: 6px; /* Space between flag and text */
}
</style>
