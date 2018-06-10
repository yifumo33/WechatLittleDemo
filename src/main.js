import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default{
	config:{
			pages:['^pages/books/main'],
		  "window":{
		    "backgroundTextStyle":"light",
		    "navigationBarBackgroundColor": "#6b7179",
		    "navigationBarTitleText": "小雪的书城",
		    "navigationBarTextStyle":"light"
		  },
		  "tabBar":{
		  	selectedColor:'#ffffff',
		  	backgroundColor:'#6b7179',
		  	list:[
		  		{
		  			text:'图书',
		  			pagePath:'pages/books/main',
		  			iconPath:'static/img/BookClose.png',
		  			selectedIconPath:'static/img/bookOpen.png'
		  		},
		  		{
		  			text:'评论与搜索',
		  			pagePath:'pages/comments/main',
		  			iconPath:'static/img/commentsNoactive.png',
		  			selectedIconPath:'static/img/commentsActive.png'
		  		},{
		  			text:'个人中心',
		  			pagePath:'pages/me/main',
		  			iconPath:'static/img/manNoactive.png',
		  			selectedIconPath:'static/img/manActive.png'
		  		}
		  	]
		  }

	}
}