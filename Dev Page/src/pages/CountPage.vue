<template>
  <q-page class="q-pa-md text-center">
    <div class="q-my-md">
      Test of component <span class="text-green">Count.vue</span>
    </div>
    <counter></counter>
  </q-page>
</template>
<script lang="ts">
import Counter from "../Components/Counter.vue";

export default Vue.defineComponent({
  name: "countPage",
  components: { Counter },
  setup() {
    return {};
  },
});
</script>
