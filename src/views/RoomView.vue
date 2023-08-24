<script setup>
import { mdiBed } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { useUserStore } from "@/stores/user.store";
import { computed, ref, watch } from "vue";
import { ApiService } from "@/services/api.service";
import RoomTable from "@/components/RoomTable.vue";

const userStore = useUserStore();
const isReady = computed(() => !!userStore.userInfo);
const api = new ApiService();
const listCount = ref(0);
const listData = ref();

async function searchRoom(email) {
  const res = await api.searchRoommates(email);
  listCount.value = res.count;
  listData.value = res.items;
}

watch(
  () => isReady.value,
  () => {
    searchRoom(userStore.userInfo.email);
  }
);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBed"
        title="숙소 방배정 확인하기"
        main
      />
      <CardBox>
        <CardBoxComponentEmpty
          v-if="listData === undefined"
          message="로딩중입니다."
        />
        <RoomTable v-else-if="listCount > 0" :items="listData" />
        <CardBoxComponentEmpty v-else message="결과가 없습니다." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
