<script setup>
import { mdiAccountMultiple } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores/user.store";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBox from "@/components/CardBox.vue";

const userStore = useUserStore();
const isReady = computed(() => !!userStore.userInfo);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="청년대회 참여정보 확인하기"
        main
      />
      <CardBoxComponentEmpty v-if="!isReady" message="Loading..." />
      <UserCard v-else class="mb-6" />
      <CardBox>
        <p class="text-center">
          위 등록정보에 문제가 있거나 수정이 필요한 경우, 사이트 오피스로
          문의하여 주십시오.
        </p>
        <p class="text-center"><small>담당자 연락처: 010-5849-5378 김준하 형제</small></p>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
