<script setup>
import { computed } from "vue";

const boyAvt =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Sugar&randomizeIds=true&accessories=prescription02,prescription01,kurt&clothing=hoodie,blazerAndShirt,shirtCrewNeck,shirtScoopNeck,collarAndSweater,graphicShirt&clothingGraphic=bear,deer,pizza&eyebrows=flatNatural,raisedExcited,default&eyes=default,happy,wink&facialHair[]&hairColor=2c1b18,4a312c,724133,a55728&hatColor=3c4f5c,262e33,ffdeb5,ffafb9&mouth=default,smile,twinkle&skinColor=d08b5b,edb98a,fd9841,ffdbb4,f8d25c&top=bun,bob,curly,frizzle,longButNotTooLong,shaggy";
const girlAvt =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Bailey&randomizeIds=true&accessories=prescription02,prescription01,kurt&clothing=hoodie,blazerAndShirt,shirtCrewNeck,shirtScoopNeck,collarAndSweater,graphicShirt&clothingGraphic=bear,deer,pizza&eyebrows=flatNatural,raisedExcited,default&eyes=default,happy,wink&facialHair[]&hairColor=2c1b18,4a312c,724133,a55728&hatColor=3c4f5c,262e33,ffdeb5,ffafb9&mouth=default,smile,twinkle&skinColor=d08b5b,edb98a,fd9841,ffdbb4,f8d25c&top=bun,bob,curly,frizzle,longButNotTooLong,shaggy";
const props = defineProps({
  sex: {
    type: String,
    default: "m",
  },
});

const avatar = computed(() => (props.sex === "m" ? boyAvt : girlAvt));

const username = computed(() => props.username);
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="username"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
