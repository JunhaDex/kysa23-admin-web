<script setup>
import UserAvatar from "@/components/UserAvatar.vue";
import { mdiChessKing, mdiChessQueen } from "@mdi/js";
import PillTag from "@/components/PillTag.vue";

defineProps({
  items: {
    type: Object,
    default: () => {
      return [];
    },
  },
});

function parseGroup(sex, groupStr) {
  const group = groupStr.substring(1);
  const genderStr = sex === "m" ? "형제" : "자매";
  if (group === "0") {
    return "운영조";
  }
  return `${genderStr} ${group}조`;
}

function parseAge(dateStr) {
  const date = new Date(dateStr).getFullYear();
  return `${2023 - date + 1}세`;
}

function parseJoins(joins) {
  return joins.map((day) => `8/${day}`).join(", ");
}

function parseRoom(room) {
  if (room) {
    const rType = room[0];
    if (rType === "H") {
      return `상록호텔 ${room.substring(1)}호`;
    } else {
      const resort = room.split("-");
      return `콘도 ${resort[0]}동 ${resort[1]}호`;
    }
  }
  return "";
}
</script>

<template>
  <h2 class="text-2xl text-center mb-3">{{ parseRoom(items[0].room) }}</h2>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="text-center" />
        <th class="w-1/6 text-center">이름</th>
        <th class="text-center">나이</th>
        <th class="text-center">소속</th>
        <th class="text-center">조</th>
        <th class="w-1/6 text-center">참가일정</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in items" :key="client.uid">
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :sex="client.sex"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td class="text-center" data-label="Name">
          {{ client.name }}&nbsp;
          <PillTag
            v-if="client.isLeader"
            :color="client.sex === 'm' ? 'success' : 'danger'"
            label=""
            :icon="client.sex === 'm' ? mdiChessKing : mdiChessQueen"
            small
          />
        </td>
        <td data-label="Age">
          {{ parseAge(client.dob) }}
        </td>
        <td data-label="Assoc">
          {{ client.geo }}
        </td>
        <td data-label="Progress" class="lg:w-32">
          {{ parseGroup(client.sex, client.group) }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          {{ parseJoins(client.joins) }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <small>검색결과: {{ items.length }}명</small>
  </div>
</template>
