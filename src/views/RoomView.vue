<script setup>
import { mdiBed } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
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
        <CardBoxComponentEmpty message="페이지가 준비중 입니다." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
