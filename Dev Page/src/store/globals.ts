import { PageIni, SavWeb } from "../Components/SavWeb";

// Dark style
const darkStyle = Vue.computed({
  get: () => {
    return Quasar.Dark.isActive;
  },
  set: (value) => {
    Quasar.Dark.set(value);
  },
});

// Counter clicks transformation in progress which is shown on the home page
const _progress = Vue.ref<number>(0);
const progress = Vue.computed({
  get: () => {
    return _progress.value;
  },
  set: (value) => {
    // From 0.0 to 1.0 in tenth steps
    _progress.value = (value % 11) / 10;
  },
});

// SavWeb interface
const savConnected = Vue.ref<boolean>(false);
function onIni(msg: PageIni) {
  if (typeof msg.darkstyle == "boolean") {
    darkStyle.value = msg.darkstyle;
    savConnected.value = true;
  }
}
const savWeb = new SavWeb(onIni);

export const state = { darkStyle, progress, savWeb, savConnected };
