import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "홈",
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "조편성",
    },
    path: "/group",
    name: "group",
    component: () => import("@/views/GroupView.vue"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("usn")) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "방배정",
    },
    path: "/room",
    name: "room",
    component: () => import("@/views/RoomView.vue"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("usn")) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "내정보",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("usn")) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "로그인",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "스타일가이드",
    },
    path: "/style",
    name: "style",
    // component: () => import("@/views/UiView.vue"),
    component: () => import("@/views/UiView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
