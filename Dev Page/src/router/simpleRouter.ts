import { routes } from "./routes";

export interface RouteLocation {
  name: string;
  title?: string;
  color?: string;
}

export declare interface NavigationHook {
  (to: RouteLocation, from?: RouteLocation): any;
}

let afterEachRouteChange: NavigationHook;
let beforeEachRouteChange: NavigationHook;

/**
 * Simple route object that mimics some functions of Vue route
 */
export const route = Vue.reactive({
  name: Vue.computed(() => {
    return recordIndex.value >= 0 && record.length > 0
      ? record[recordIndex.value].name
      : "";
  }),
  title: Vue.computed(() => {
    return recordIndex.value >= 0 && record.length > 0
      ? record[recordIndex.value].title
      : undefined;
  }),
  color: Vue.computed(() => {
    return recordIndex.value >= 0 && record.length > 0
      ? record[recordIndex.value].color
      : undefined;
  }),
});

const _recordIndex = Vue.ref<number>(-1);
const recordIndex = Vue.computed({
  get: () => {
    return _recordIndex.value;
  },
  set: (value) => {
    const from = router.currentRoute();
    const to = record[recordIndex.value];
    if (
      typeof beforeEachRouteChange !== "function" ||
      beforeEachRouteChange(to, from) !== false
    ) {
      // At first remove the current page and then load it, to force a reaload if the page name keeps the same
      _recordIndex.value = -1;
      setTimeout(() => (_recordIndex.value = value));
    }
    async () => {
      if (typeof afterEachRouteChange == "function") {
        afterEachRouteChange(to, from);
      }
    };
  },
});

const record = new Array<RouteLocation>();

const normalizeRoute = (to: RouteLocation | string) => {
  let norm: RouteLocation | undefined = undefined;
  if (typeof to == "string") {
    norm = routes.find((v) => to == v.name);
  } else {
    if ("name" in to) {
      norm = routes.find((v) => to.name == v.name);
    }
  }
  if (norm) {
    return { name: norm.name, title: norm.title, color: norm.color };
  }
  return undefined;
};

/**
 * Simple router that mimics some functions of Vue router
 */
export const router = {
  push: (to: RouteLocation | string) => {
    const n_to = normalizeRoute(to);
    if (n_to) {
      record.push(n_to);
      recordIndex.value = record.length - 1;
    }
  },
  replace: (to: RouteLocation | string) => {
    const n_to = normalizeRoute(to);
    if (n_to) {
      if (recordIndex.value >= 0 && record.length) {
        record[recordIndex.value] = n_to;
      }
    }
  },
  back: () => {
    if (recordIndex.value > 0 && record.length > 0) {
      recordIndex.value--;
      return true;
    }
    return false;
  },
  forward: () => {
    if (recordIndex.value < record.length - 1) {
      recordIndex.value++;
      return true;
    }
    return false;
  },
  go: (delta: number) => {
    const index = recordIndex.value + delta;
    if (index >= 0 && index < record.length - 1) {
      recordIndex.value = index;
      return true;
    }
    return false;
  },
  afterEach: (guard: NavigationHook) => {
    afterEachRouteChange = guard;
  },
  beforeEach: (guard: NavigationHook) => {
    afterEachRouteChange = guard;
  },
  getRoutes: () => {
    return [...record];
  },
  currentRoute: () => {
    return recordIndex.value >= 0 && record.length
      ? record[recordIndex.value]
      : undefined;
  },
};
