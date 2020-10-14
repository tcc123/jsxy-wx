import Vue from 'vue';
import Request from './plugins/request/index';
import util from './utils/util';
import App from './App';
import uView from "uview-ui";
Vue.use(uView);
Vue.use(util);
Vue.config.productionTip = false;

Vue.prototype.$http = Request();

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
