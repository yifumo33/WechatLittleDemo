<template>
	<div class="container">
		<div class="search" style="margin-top:50rpx">
			<input  class="inputStyle" type="text" v-model="Keyword" placeholder="输入你想要查找的图书">
		</div>

		<button @click="searchBook" >搜索图书</button>
		<p class="hint" v-if="hintShow">搜索中...</p>
			<div class="page-title" style="padding:10px" v-if="searchlistshow">{{searchResult}}</div>
			<div class="bookItem" v-for="book in searchBooks" :key="book.id" v-if="searchlistshow">
					<div class="imformation">
						<div class="left">
							<img :src="book.image">
						</div>
						<div class="right">
						 	<p style="font-size:18px">{{book.title}}</p>
							<p>作者：{{book.author[0]}}</p>
							<p>分类：{{book.category}}</p>
							<p>价格：{{book.price}}</p>
						     		 
						</div>
					</div>
					<div class="summary">
						{{book.summary}}
					</div>
					<button @click="addBook(book.isbn)"> 添加到我的图书</button>
			</div>
		
			
	</div>
</template>

<script> 
	// import Cardsecond from "@/components/Cardsecond"
	import {get,post,showModal} from '@/util'
	export default{
		data(){
			return{
				isbn:'',
				Keyword:'',
				data:[],
				hehe:'hello',
				userinfo:{},
				comments:[],
				books:[],
				searchBooks:[],
				searchlistshow:false,
				hintShow:false,
				searchResult:'搜查结果'
			}
		},
		methods:{
			init(){
				// wx.showNavigationBarLoading()
				// // this.getComments()
				// console.log(1123)
				// wx.hideNavigationBarLoading()
				// this.getBooks()
			},
			// async getBooks(){
			// 	const books = await get('/weapp/booklist',{
			// 		openid:this.userinfo.openId
			// 	})
			// 	this.books = books.data.data.list
				
			// },
			// async getComments(){
			// 	const comments = await get('/weapp/commentlist',{
			// 		openid : this.userinfo.openId
			// 	}) 
			// 	this.comments = comments.data.data.list
				
			// },
			handleClick(bookid){
				if(bookid){
					wx.navigateTo({
						url:'/pages/detail/main?id=' + bookid 
					})
				}
			},
			async searchBook(){
				var _this = this
				this.hintShow = true
				wx.request({
					  url: 'http://t.yushu.im/v2/book/search', //仅为示例，并非真实的接口地址
					  data:{
					  	q:this.Keyword
					  },
					  header: {
					      'Content-Type': 'application/json' // 默认值
					  },
					  success: function(res) {
					  	if(res.data.count){
						   	_this.searchBooks = res.data.books
 							console.log(_this.searchBooks)
 							_this.searchlistshow = true
 							_this.hintShow = false
 							_this.searchResult = '搜查结果'
					  	}else{
					  		console.log('没找到')
					  		_this.hintShow = false
 							_this.searchlistshow = true
 							_this.searchResult = '没有找到你输入的图书名'
					  	}
					   
					  }
					})
				},
				async addBook(isbn){
					this.isbn = isbn
					if(!this.userinfo.openId){
					showModal('图书添加失败','请先登录')
						return
					}
					const res = await post('/weapp/addbook',{
					isbn:this.isbn,
					openId:this.userinfo.openId
					})
					console.log("返回值",res)
				if(res.data.code === 0 && res.data.data.title)
					showModal('添加成功',`<<${res.data.data.title}>>添加成功`)

				}
			
		},
		onPullDownRefresh(){
			this.init()
			wx.stopPullDownRefresh()
		},
		 onShow(){
		      let userinfo = wx.getStorageSync('userInfo')
		      
		      if(userinfo){
		        this.userinfo = userinfo
		        this.init()
		      }
			}
			// components:{
			// 	Cardsecond
			// }
			
			
	   }

		  
		

	
</script>

<style lang="scss" scoped>
.container{

	.hint{
		margin-top:20rpx;
		text-align: center; 
	}
	padding:0 40rpx 40rpx 40rpx;
	.search{
		.inputStyle{
			margin-bottom:40rpx;
			padding:10rpx 20rpx;
			font-size:14px;
			border:1px solid #6b7179;
			border-radius:6px;   
		}
	}
	.comment-list{
	padding:0 10px;
	}
	.comment-item{
		background:#6b7179;
		color:white;
		font-size:12px;
		border-radius:10px; 
		margin-bottom:10px;
		padding:10px;
		border:1px solid;
	}
	.bookslist{
		padding:0 10px;
	}
	.bookItem{

		.imformation{
		 margin:10px 0px;
		 display:flex;
		 
		  .left{
			img{
				width:300rpx;
				height:300rpx;
				}
			}
			.right{
			   display:flex;
			   flex-direction:column;	
			   margin-left:100rpx; 
			   justify-content:space-between;
			   p:not(:first-child){
			   	text-align: center;
			   	background:#6b7179;
			   	color:white;
			   	font-size:14px;
			   	border-radius:10px;
			   	padding:0 10px;
			   }
			}

		}
		.summary{
			line-height:60rpx;
			height:300rpx;
			overflow:scroll;
		}
		button{
			margin-top:50rpx;
			background:#6b7179;
			color:white;
			border-radius:20px; 
		}
	}
}
</style>