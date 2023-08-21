<script setup>
import { computed, ref, onMounted } from "vue";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiKeyChainVariant,
  mdiChartPie,
  mdiAccount,
  mdiPhone,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import { ApiService } from "@/services/api.service";
import { useUIStore } from "@/stores/ui.store";
import CardBoxComingSoon from "@/components/CardBoxComingSoon.vue";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});
const uiStore = useUIStore();
const phone = ref("");
const name = ref("");
const api = new ApiService();

async function findRegisterEmail() {
  uiStore.notiBar.reveal = true;
  if (phone.value && name.value) {
    const pp = phone.value.replace(/-|\s/g, "");
    const nn = name.value.replace(/-|\s/g, "");
    try {
      const reg = await api.findMyEmail(nn, pp);
      uiStore.notiBar.message = `${reg.name} 님의 이메일 주소: ${reg.email}`;
      uiStore.notiBar.level = "success";
      uiStore.notiBar.reveal = true;
    } catch (e) {
      uiStore.notiBar.message =
        "검색 결과가 없습니다. 문제가 지속될 시 사이트오피스 방문해 주시기 바랍니다.";
      uiStore.notiBar.level = "warning";
      uiStore.notiBar.reveal = true;
    }
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiKeyChainVariant"
        title="내 등록 이메일 확인"
        main
      />
      <CardBox class="mb-6" is-form @submit.prevent="findRegisterEmail">
        <FormField label="참가자 이름" help="이름을 입력해주세요">
          <FormControl
            v-model="name"
            :icon="mdiAccount"
            name="username"
            required
            autocomplete="username"
          />
        </FormField>
        <FormField
          label="등록한 휴대폰번호"
          help="등록할 때 사용한 휴대폰 번호를 입력해 주세요 (- 제외). 등록시 제공한 휴대폰 번호가 없으면 확인이 불가합니다."
        >
          <FormControl
            v-model="phone"
            :icon="mdiPhone"
            type="tel"
            name="email"
            required
            autocomplete="email"
          />
        </FormField>
        <div class="grid place-items-center">
          <BaseButton
            class="w-full xl:w-2/6"
            color="info"
            type="submit"
            label="이메일 찾기"
            rounded-full
          />
        </div>
      </CardBox>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="참가자 통계"
        main
      />
      <CardBox>
        <CardBoxComingSoon />
      </CardBox>

      <!--      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">-->
      <!--        <CardBoxWidget-->
      <!--          trend="12%"-->
      <!--          trend-type="up"-->
      <!--          color="text-emerald-500"-->
      <!--          :icon="mdiAccountMultiple"-->
      <!--          :number="512"-->
      <!--          label="Clients"-->
      <!--        />-->
      <!--        <CardBoxWidget-->
      <!--          trend="12%"-->
      <!--          trend-type="down"-->
      <!--          color="text-blue-500"-->
      <!--          :icon="mdiCartOutline"-->
      <!--          :number="7770"-->
      <!--          prefix="$"-->
      <!--          label="Sales"-->
      <!--        />-->
      <!--        <CardBoxWidget-->
      <!--          trend="Overflow"-->
      <!--          trend-type="alert"-->
      <!--          color="text-red-500"-->
      <!--          :icon="mdiChartTimelineVariant"-->
      <!--          :number="256"-->
      <!--          suffix="%"-->
      <!--          label="Performance"-->
      <!--        />-->
      <!--      </div>-->

      <!--      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">-->
      <!--        <div class="flex flex-col justify-between">-->
      <!--          <CardBoxTransaction-->
      <!--            v-for="(transaction, index) in transactionBarItems"-->
      <!--            :key="index"-->
      <!--            :amount="transaction.amount"-->
      <!--            :date="transaction.date"-->
      <!--            :business="transaction.business"-->
      <!--            :type="transaction.type"-->
      <!--            :name="transaction.name"-->
      <!--            :account="transaction.account"-->
      <!--          />-->
      <!--        </div>-->
      <!--        <div class="flex flex-col justify-between">-->
      <!--          <CardBoxClient-->
      <!--            v-for="client in clientBarItems"-->
      <!--            :key="client.id"-->
      <!--            :name="client.name"-->
      <!--            :login="client.login"-->
      <!--            :date="client.created"-->
      <!--            :progress="client.progress"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
    </SectionMain>
  </LayoutAuthenticated>
</template>
