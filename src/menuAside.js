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
    href: "https://github.com/justboil/admin-one-vue-tailwind",
    label: "디스코드",
    icon: mdiForumOutline,
    target: "_blank",
  },
  {
    href: "https://github.com/justboil/admin-one-react-tailwind",
    label: "인스타그램",
    icon: mdiInstagram,
    target: "_blank",
  },
];
