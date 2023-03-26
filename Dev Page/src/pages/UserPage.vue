<template>
  <q-page class="q-pa-md text-center">
    <div class="q-my-md">Check name on blockchain</div>

    <div v-if="!savConnected" class="q-my-md">
      This page needs to be executed in the
      <a
        href="https://savact.app#_browser_"
        target="_blank"
        :class="{ 'text-blue': darkStyle }"
        >SavAct App</a
      >.<br />You can just drag it into the address of its browser.
    </div>

    <q-input
      v-else
      rounded
      outlined
      dense
      v-model="userName"
      maxlength="13"
      :rules="rules"
      :loading="isLoading"
      @keydown.enter="checkName"
    >
      <template v-slot:before>
        <q-select outlined dense v-model="chain" :options="chainOptions" />
      </template>
      <template v-slot:after>
        <q-btn
          @click="checkName"
          :disable="isLoading"
          color="blue"
          rounded
          icon="send"
        ></q-btn>
      </template>
    </q-input>
  </q-page>
</template>
<script lang="ts">
import { state } from "../store/globals";

export default Vue.defineComponent({
  name: "userPage",
  setup() {
    const _userName = Vue.ref<string>("");
    const _nameError = Vue.ref<boolean>(false);
    const isLoading = Vue.ref<boolean>(false);
    const darkStyle = Vue.computed(() => state.darkStyle.value);
    const savConnected = Vue.computed(() => state.savConnected.value);

    const userName = Vue.computed({
      get: () => {
        return _userName.value;
      },
      set: (value: string) => {
        _userName.value = value.toLowerCase();
      },
    });

    function validChars(val: string): boolean | string {
      let valid = true;
      for (const c of val) {
        if ("abcdefghijklmnopqrstuvwxyz12345.".indexOf(c) == -1) {
          valid = false;
        }
      }
      return valid
        ? true
        : "Only characters from a to z, 1 to 5 and the dot is allowed!";
    }

    const rules = [
      validChars ||
        "Only characters from a to z, 1 to 5 and the dot is allowed!",
      (val: string) =>
        val[0] != "." || "It is not allowed to start the name with a dot!",
    ];

    async function checkName() {
      if (isLoading.value) {
        return;
      }
      if (userName.value.length > 0) {
        isLoading.value = true;
        const result = await state.savWeb.checkName(
          chain.value.value,
          userName.value
        );
        isLoading.value = false;

        if (result === true) {
          Quasar.Notify.create({
            type: "positive",
            message: "Account exists",
            caption: "The account exists on the selected network",
            position: "top",
          });
        } else if (result === false) {
          Quasar.Notify.create({
            type: "negative",
            message: "Not found",
            caption: "The account does not exist on the selected network",
            position: "top",
          });
        } else {
          Quasar.Notify.create({
            type: "negative",
            message: "Connection fail",
            caption:
              "Could not check the account, there seems to be an error with the connection",
            position: "top",
          });
        }
      } else {
        Quasar.Notify.create({
          type: "negative",
          message: "Please fill out the input",
          position: "top",
        });
      }
    }

    const chainOptions: Array<{ label: string; value: string }> = [
      {
        label: "EOS",
        value: "eos",
      },
      {
        label: "WAX",
        value: "wax",
      },
    ];
    const chain = Vue.ref<{ label: string; value: string }>(chainOptions[0]);

    return {
      userName,
      _nameError,
      checkName,
      isLoading,
      rules,
      chainOptions,
      chain,
      darkStyle,
      savConnected,
    };
  },
});
</script>
