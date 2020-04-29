{}
import Vue from 'vue'
import App from './App'
import {
	request
} from '@/utils/request.js'
import validate from '@/utils/graceChecker.js'

import store from './store'
   import xflSelect from './components/xfl-select/xfl-select.vue';
   import uniPopup from './components/uni-popup/uni-popup.vue';
Vue.component('xfl-select', xflSelect);
Vue.component('uni-popup', uniPopup);
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.prototype.$validate = validate
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'
Vue.prototype.$http = request
const app = new Vue({
	store,
	...App
})
app.$mount()
