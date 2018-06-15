import Vue from 'vue'
import Comments from './Comments'

const app = new Vue(Comments)
app.$mount()

export default{
	config:{
		navigationBarTitleText:'搜索',
		enablePullDownRefresh:true
	}

}
	