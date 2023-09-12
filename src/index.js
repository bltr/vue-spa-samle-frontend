import './scss/index.scss'
import {createApp} from 'vue'
import router from "@/js/router"
import store from "@/js/store";
import App from "@/components/App";

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
