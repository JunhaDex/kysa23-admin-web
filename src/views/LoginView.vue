<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mdiEmail } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { ApiService } from "@/services/api.service";
import { useUIStore } from "@/stores/ui.store";

const email = ref("");

const router = useRouter();
const api = new ApiService();
const uiStore = useUIStore();

async function submit() {
  try {
    const ee = email.value.replace(/\s/g, "");
    const { register } = await api.loginEmail(ee);
    localStorage.setItem("usn",JSON.stringify(register));
    await router.push("/");
  } catch (e) {
    uiStore.notiBar.message = "이메일을 찾을 수 없습니다.";
    uiStore.notiBar.level = "danger";
    uiStore.notiBar.reveal = true;
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField
          label="E-mail"
          help="청년대회 가입에 사용한 이메일을 입력하세요."
        >
          <FormControl
            v-model="email"
            :icon="mdiEmail"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="로그인" />
            <BaseButton to="/" color="info" outline label="홈으로" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
