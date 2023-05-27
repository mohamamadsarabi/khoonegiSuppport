import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Toast from "vue-toastification";
import SoftUIDashboard from "./soft-ui-dashboard";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import PrimeVue from "primevue/config";
import "leaflet/dist/leaflet.css"

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/toast.css";
import "vue-toastification/dist/index.css";

loadFonts();

const appInstance = createApp(App);
appInstance.component("DatePicker", Vue3PersianDatetimePicker);
appInstance.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "bottom-center",
    rtl: false,
    closeButton: "button",
    icon: true,
});
appInstance.use(store);
appInstance.use(router);
appInstance.use(vuetify);
appInstance.use(PrimeVue);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
