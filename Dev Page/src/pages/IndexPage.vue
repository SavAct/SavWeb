<template>
  <q-page class="column">
    <div class="col q-pa-md text-center">
      <div class="q-my-md">Small file size template by using</div>
      <div class="text-h2 q-mt-lg">
        <span class="quasar-text-color">Quasar</span> +
        <span style="display: inline-block" class="vue-text-color">Vue 3</span>
        + <span class="ts-text-color">TypeScript</span> +
        <span class="vite-text-color">Vite</span>
      </div>
      <div class="q-mt-lg">Presented by SavAct.</div>
    </div>
    <div class="col-auto">
      <q-linear-progress
        size="50px"
        :value="progress"
        class="q-mt-sm"
        :color="darkStyle ? 'blue-13' : 'blue-2'"
      >
        <div class="absolute-full flex flex-center">
          <q-badge
            color="transparent"
            :text-color="darkStyle ? 'white' : 'black'"
            label="Click state on counter page"
          />
        </div>
      </q-linear-progress>
    </div>
  </q-page>
</template>
<script lang="ts">
import { state } from "../store/globals";

export default Vue.defineComponent({
  name: "indexPage",
  setup() {
    return { progress: state.progress, darkStyle: state.darkStyle };
  },
});
</script>
