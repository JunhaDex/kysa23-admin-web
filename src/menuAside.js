import {
  mdiAccountCircle,
  mdiBed,
  mdiAccountMultiple,
  mdiHome,
  mdiInstagram,
  mdiForumOutline,
} from "@mdi/js";

export default [
  {
    to: "/",
    label: "대시보드",
    icon: mdiHome,
  },
  {
    to: "/group",
    label: "조편성",
    icon: mdiAccountMultiple,
  },
  {
    to: "/room",
    label: "숙소정보",
    icon: mdiBed,
  },
  {
    to: "/profile",
    label: "내정보",
    icon: mdiAccountCircle,
  },
  {
    href: "https://discord.gg/v2Vd2kbDmk",
    label: "디스코드",
    icon: mdiForumOutline,
    target: "_blank",
  },
  {
    href: "https://instagram.com/2023_kysa?igshid=MzRlODBiNWFlZA==",
    label: "인스타그램",
    icon: mdiInstagram,
    target: "_blank",
  },
];
