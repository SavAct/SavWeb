import { route, router } from "./simpleRouter";
import { Component } from "@vue/runtime-dom";
import { routes } from "./routes";

let components: { [key: string]: Component } = {};
for (const r of routes) {
  components["qp-" + r.name] = r.component;
}

function getComponentSwitch() {
  if (routes.length > 1) {
    let cs = `<qp-${routes[0].name} v-if="name == '${routes[0].name}'" />`;
    if (routes.length > 2) {
      for (let r = 1; r < routes.length; r++) {
        cs += `<qp-${routes[r].name} v-else-if="name == '${routes[r].name}'" />`;
      }
    }
    return cs;
  } else {
    return "";
  }
}

export default Vue.defineComponent({
  name: "page-container",
  components,
  template: `<q-page-container>${getComponentSwitch()}</q-page-container>`,
  setup() {
    const name = Vue.computed(() => {
      return route.name;
    });
    if (router.currentRoute() === undefined) {
      router.push({ name: "home" }); // Initial page
    }
    return { name };
  },
});
