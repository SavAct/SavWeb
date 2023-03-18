import MeinLayout from "./layouts/MainLayout.vue";

const app = Vue.createApp(MeinLayout);

app.use(Quasar as unknown as AppUseQuasar, {
  config: {
    /*
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    // notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
    */
  },
});

app.mount("#q-app");
