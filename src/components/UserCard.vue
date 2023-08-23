<script setup>
import { computed, onMounted, ref } from "vue";
import { mdiAlert, mdiAlertCircle, mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
import { useUserStore } from "@/stores/user.store";
import { ApiService } from "@/services/api.service";

const userStore = useUserStore();
const api = new ApiService();
const user = computed(() => userStore.userInfo);
const additional = ref();

function parseGroup(sex, groupStr) {
  const group = groupStr.substring(1);
  const genderStr = sex === "m" ? "형제" : "자매";
  if (group === "0") {
    return "운영조";
  }
  return `${genderStr} ${group}조`;
}

function parseJoins(joins) {
  return joins.map((day) => `8/${day}`).join(", ");
}

async function getPayment() {
  additional.value = await api.getAdditionalInfo(user.value.email);
}

onMounted(() => {
  getPayment();
});
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          <b>{{ user.name }}</b
          >님,<br />
          2023 청년대회 참가를 환영합니다!
        </h1>
        <table class="table-auto w-full">
          <tbody>
            <tr>
              <th>대회비 납부 상태</th>
              <td class="text-center">
                <span v-if="!additional">-</span>
                <PillTag
                  v-else-if="additional.payment === 1"
                  color="success"
                  label="납부완료"
                  :icon="mdiCheckDecagram"
                />
                <PillTag
                  v-else-if="additional.payment === 2"
                  color="warning"
                  label="부분납부"
                  :icon="mdiAlert"
                />
                <PillTag
                  v-else
                  color="danger"
                  label="납부 확인필요"
                  :icon="mdiAlertCircle"
                />
              </td>
            </tr>
            <tr>
              <th>내 연락처</th>
              <td class="text-center">{{ user.contact }}</td>
            </tr>
            <tr>
              <th>참가 신청일</th>
              <td class="text-center">{{ parseJoins(user.joins) }}</td>
            </tr>
            <tr>
              <th>소속 지역</th>
              <td class="text-center">{{ user.geo }}</td>
            </tr>
            <tr>
              <th>조편성</th>
              <td class="text-center">
                {{ parseGroup(user.sex, user.group) }}
              </td>
            </tr>
            <tr>
              <th>방배정</th>
              <td class="text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseLevel>
  </CardBox>
</template>
