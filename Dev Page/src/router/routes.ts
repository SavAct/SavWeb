import { Component } from "vue";
import home from "../pages/IndexPage.vue";
import count from "../pages/CountPage.vue";
import user from "../pages/UserPage.vue";

/**
 * Here you can add more pages
 */
export const routes: Array<{
  name: string;
  component: Component;
  title?: string;
  color?: string;
}> = [
  { name: "home", component: home, title: "SavAct Template", color: "teal-12" },
  {
    name: "count",
    component: count,
    title: "Global Counter",
    color: "light-green-13",
  },
  {
    name: "user",
    component: user,
    title: "Check Account",
    color: "cyan-12",
  },
];
