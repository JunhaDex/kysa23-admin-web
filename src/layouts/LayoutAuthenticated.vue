<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import notiIcon from "@/notiIcon";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import { useUIStore } from "@/stores/ui.store";
import { useUserStore } from "@/stores/user.store";

const layoutAsidePadding = "xl:pl-60";
const styleStore = useStyleStore();
const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    //
  }
};

const uiStore = useUIStore();
const userStore = useUserStore();
const revealNoti = computed(() => uiStore.notiBar.reveal);
const notiLevel = computed(() => uiStore.notiBar.level);
watch(
  () => revealNoti.value,
  (changed) => {
    if (changed) {
      setTimeout(() => {
        uiStore.notiBar.reveal = !changed;
      }, 4500);
    }
  }
);
onMounted(async () => {
  const user = localStorage.getItem("usn");
  if (user) {
    userStore.setUser(JSON.parse(user));
  }
});
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NotificationBar
          v-if="revealNoti"
          class="noti-position w-screen xl:max-w-6xl"
          :color="notiLevel"
          :icon="notiIcon[notiLevel]"
        >
          <b>{{ notiLevel.toUpperCase() }}</b
          >. {{ uiStore.notiBar.message }}
        </NotificationBar>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar />
    </div>
  </div>
</template>
<style>
.noti-position {
  position: fixed;
  top: 56px;
  z-index: 5;
}
</style>
