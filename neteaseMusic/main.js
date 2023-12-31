import Vue from 'vue'
import App from './App'
import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 定义全局方法
Vue.filter('formatCount',function(value){
	if(value >= 1000 && value <= 10000){
		value /= 1000;
		return value.toFixed(1) + 'k'
	}
	if(value >= 10000 && value <= 100000000){
		value /= 10000;
		return value.toFixed(1) + '万';
	}
	else if(value > 100000000){
		value /= 100000000;
		return value.toFixed(1) + '亿';
	}
	else{
		return value;
	}
});

Vue.filter('fromatTime',function(value){
	var data = new Date(value)
	return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日'
})

const app = new Vue({
  ...App,
  store
})
app.$mount()
