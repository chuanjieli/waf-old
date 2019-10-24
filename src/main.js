import "babel-polyfill";
import Vue from 'vue';
import app from './app/app.vue';
import router from './router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from "axios";
axios.defaults.withCredentials = true; //让ajax携带cookie
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //此处是增加的代码，设置请求头的类型
// axios.defaults.baseURL = 'http://10.1.4.160/hedunwaf/'
axios.defaults.baseURL = 'http://106.13.41.122:8000/hedunwaf/'
// axios.defaults.baseURL = 'http://117.136.182.230/hedunwaf/'
Vue.prototype.$http = axios;
Vue.use(iView);

var vm = new Vue({
    el: '#app',
    data: {
        msg: 'vue demo'
    },
    methods: {

    },
    render: function (createElements) {
        return createElements(app)
    },
    router
})