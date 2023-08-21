<script setup>
import { mdiBed } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComingSoon from "@/components/CardBoxComingSoon.vue";
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
        <CardBoxComingSoon />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
