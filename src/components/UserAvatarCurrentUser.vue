<script setup>
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "@/stores/user.store";
import { computed } from "vue";

const userStore = useUserStore();
const userName = computed(() => userStore.userInfo?.name ?? "");
</script>

<template>
  <UserAvatar :username="userName" :avatar="userStore.userAvatar">
    <slot />
  </UserAvatar>
</template>
