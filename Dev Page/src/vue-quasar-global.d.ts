import _vue from "vue";
import * as _quasar from "quasar";
import _appUseQuasar from "quasar";
// import _quasar from "quasar";

// Define just the types of the components
declare global {
  const Vue: typeof _vue;
  const Quasar: typeof _quasar;
  type AppUseQuasar = typeof _appUseQuasar;
}
