import { defineStore } from "pinia";
import { ref } from "vue";

const setUIStore = () => {
  const notiBar = ref({
    reveal: false,
    message: "",
    level: "success",
  });
  return {
    notiBar,
  };
};

export const useUIStore = defineStore("ui", setUIStore);
