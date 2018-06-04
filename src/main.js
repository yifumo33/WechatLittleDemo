import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default{
	config:{
			pages:[],
		  "window":{
		    "backgroundTextStyle":"light",
		    "navigationBarBackgroundColor": "#EA5149",
		    "navigationBarTitleText": "小雪的书城",
		    "navigationBarTextStyle":"light"
		  }

	}
}