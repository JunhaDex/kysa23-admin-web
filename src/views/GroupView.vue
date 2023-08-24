<script setup>
import {
  mdiAccountMultiple,
  mdiAccount,
  mdiNumeric,
  mdiHumanMaleFemale,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";
import BaseButtons from "@/components/BaseButtons.vue";
import FormControl from "@/components/FormControl.vue";
import { ApiService } from "@/services/api.service";
import GroupTable from "@/components/GroupTable.vue";
import { useUserStore } from "@/stores/user.store";

const searchType = ref("byName");
const gender = ref({ id: "m", label: "형제" });
const groupNo = ref("");
const searchName = ref("");
const listCount = ref(0);
const listData = ref([]);
const isAction = ref(false);
const listGroupLead = ref();
const api = new ApiService();
const userStore = useUserStore();

const genderOptions = [
  { id: "m", label: "형제" },
  { id: "f", label: "자매" },
];

async function searchWithOption(client) {
  let data;
  if (client) {
    searchType.value = "byGroup";
    gender.value = genderOptions
      .filter((value) => value.id === client.sex)
      .pop();
    groupNo.value = client.group.substring(1);
    data = await api.searchByGroup(userStore.userInfo.email, client.group);
    isAction.value = false;
  } else {
    if (searchType.value === "byName") {
      data = await api.searchByName(userStore.userInfo.email, searchName.value);
      isAction.value = true;
    } else if (searchType.value === "byGroup") {
      data = await api.searchByGroup(
        userStore.userInfo.email,
        `${gender.value.id}${groupNo.value}`
      );
      isAction.value = false;
    }
  }

  listCount.value = data.count;
  listData.value = data.items;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="조편성 확인하기"
        main
      />
      <CardBox
        class="mb-5"
        is-form
        @submit.prevent="searchWithOption(undefined)"
      >
        <FormField label="검색옵션">
          <FormCheckRadioGroup
            v-model="searchType"
            name="sample-radio"
            type="radio"
            :options="{ byName: '이름으로 검색', byGroup: '조 검색' }"
          />
        </FormField>
        <FormField v-if="searchType === 'byName'">
          <FormControl
            v-model="searchName"
            :icon="mdiAccount"
            name="username"
            required
            autocomplete="username"
          />
        </FormField>
        <FormField v-else>
          <FormControl
            v-model="gender"
            :icon="mdiHumanMaleFemale"
            :options="genderOptions"
          />
          <FormControl
            v-model="groupNo"
            :icon="mdiNumeric"
            name="username"
            required
            autocomplete="username"
            type="number"
          />
        </FormField>
        <BaseButtons class="align-middle justify-center">
          <BaseButton
            class="w-full xl:w-2/6"
            color="info"
            label="검색"
            type="submit"
            rounded-full
          />
        </BaseButtons>
      </CardBox>

      <CardBox class="mb-6" has-table>
        <GroupTable
          v-if="listCount > 0"
          :items="listData"
          :actions="isAction"
          @go-to="searchWithOption"
        />
        <CardBoxComponentEmpty message="검색을 통해 결과를 확인하세요." v-else />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
