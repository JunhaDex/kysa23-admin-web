import { defineStore } from "pinia";
import { computed, ref } from "vue";

const boyAvt =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Sugar&randomizeIds=true&accessories=prescription02,prescription01,kurt&clothing=hoodie,blazerAndShirt,shirtCrewNeck,shirtScoopNeck,collarAndSweater,graphicShirt&clothingGraphic=bear,deer,pizza&eyebrows=flatNatural,raisedExcited,default&eyes=default,happy,wink&facialHair[]&hairColor=2c1b18,4a312c,724133,a55728&hatColor=3c4f5c,262e33,ffdeb5,ffafb9&mouth=default,smile,twinkle&skinColor=d08b5b,edb98a,fd9841,ffdbb4,f8d25c&top=bun,bob,curly,frizzle,longButNotTooLong,shaggy";
const girlAvt =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Bailey&randomizeIds=true&accessories=prescription02,prescription01,kurt&clothing=hoodie,blazerAndShirt,shirtCrewNeck,shirtScoopNeck,collarAndSweater,graphicShirt&clothingGraphic=bear,deer,pizza&eyebrows=flatNatural,raisedExcited,default&eyes=default,happy,wink&facialHair[]&hairColor=2c1b18,4a312c,724133,a55728&hatColor=3c4f5c,262e33,ffdeb5,ffafb9&mouth=default,smile,twinkle&skinColor=d08b5b,edb98a,fd9841,ffdbb4,f8d25c&top=bun,bob,curly,frizzle,longButNotTooLong,shaggy";
const defaultAvt =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=Midnight&randomizeIds=true&accessories=prescription02,prescription01,kurt&clothing=hoodie,blazerAndShirt,shirtCrewNeck,shirtScoopNeck,collarAndSweater,graphicShirt&clothingGraphic=bear,deer,pizza&eyebrows=flatNatural,raisedExcited,default&eyes=default,happy,wink&facialHair[]&hairColor=2c1b18,4a312c,724133,a55728&hatColor=3c4f5c,262e33,ffdeb5,ffafb9&mouth=default,smile,twinkle&skinColor=d08b5b,edb98a,fd9841,ffdbb4,f8d25c&top=bun,bob,curly,frizzle,longButNotTooLong,shaggy";
const setUserStore = () => {
  const userInfo = ref();
  const userAvatar = ref("");

  function setUser(user) {
    userInfo.value = user;
    userAvatar.value = user.sex === "m" ? boyAvt : girlAvt;
  }

  return { userInfo, userAvatar, setUser };
};

export const useUserStore = defineStore("user", setUserStore);
