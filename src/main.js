import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import VueSpline from "vue-spline"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSpline)

app.mount("#app")
