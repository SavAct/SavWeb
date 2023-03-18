<template>
  <div class="row q-mt-lg justify-center">
    <q-btn
      class="col-sm-3 col-md-2 col-12"
      icon-right="add"
      @click="btnClick"
      label="Count"
    ></q-btn>
    <div class="col-sm-2 col-12">
      <div :class="$q.screen.lt.sm ? 'q-mt-md' : 'q-mt-sm'">
        Value is <span class="number-color q-pa-sm">{{ counter }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { state } from "../store/globals";

export default Vue.defineComponent({
  name: "counter",
  setup() {
    const counter = Vue.ref<number>(0);

    function btnClick() {
      counter.value++;
      state.progress.value = counter.value;
    }

    return { counter, btnClick };
  },
});
</script>
