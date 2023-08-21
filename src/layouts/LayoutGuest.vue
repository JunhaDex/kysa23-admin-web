<script setup>
import { useStyleStore } from "@/stores/style.js";
import NotificationBar from "@/components/NotificationBar.vue";
import { useUIStore } from "@/stores/ui.store";
import { computed, watch } from "vue";
import notiIcon from "@/notiIcon";

const styleStore = useStyleStore();
const uiStore = useUIStore();
const revealNoti = computed(() => uiStore.notiBar.reveal);
const notiLevel = computed(() => uiStore.notiBar.level);
watch(
  () => revealNoti.value,
  (changed) => {
    if (changed) {
      setTimeout(() => {
        uiStore.notiBar.reveal = !changed;
      }, 3000);
    }
  }
);
</script>

<template>
  <div :class="{ dark: styleStore.darkMode }">
    <div class="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <div class="top-0 inset-x-0 fixed z-5 w-screen lg:w-auto">
        <NotificationBar
          class="w-5/6 mx-auto"
          :color="notiLevel"
          :icon="notiIcon[notiLevel]"
        >
          {{ uiStore.notiBar.message }}
        </NotificationBar>
      </div>
      <slot />
    </div>
  </div>
</template>
