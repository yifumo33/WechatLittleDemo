<template>
	<div class="container">
		<div class="userInfo" @click="login">
			<img :src="userInfo.avatarUrl" alt="">
			<p v-if='nickNameShow'>{{userInfo.nickName}}</p>
		</div>
		<div class="progressBar">
			<progress v-bind:percent='percent' color='#6b7179' ></progress> 
			<!-- 记住凡是设置属性，都要加上:或者v-bind: -->
			<p>{{year}}已经过去了{{day}}天,{{percent}}%</p>
		</div>
		<button class="btn" open-type="getUserInfo" @click="authorize" v-if="getUserInfoShow">点击允许获取您的用户资料</button>
		<button class="btn" @click="scanCode" v-if='userInfo.openId'>添加图书</button>	
	</div>
</template>

<script>
	import config from '@/config'
	import qcloud from 'wafer2-client-sdk'
	import {get,showSuccess,post,showModal} from '@/util'

	export default{

		data(){
			return{
				getUserInfoShow:true,
				nickNameShow:false,
				hehe:'点击登陆',
				userInfo:{
					avatarUrl:'../../../static/img/unlogin.png',
					nickName:'点击登陆'
				}
			}
		},
		methods:{
			async addBook(isbn){
				console.log(isbn)
				const res = await post('/weapp/addbook',{
					isbn,
					openId:this.userInfo.openId
				})
				console.log(res.data.data.title)
				console.log(res)
				if(res.data.code === 0 && res.data.data.title)
				showModal('添加成功',`<<${res.data.data.title}>>添加成功`)


			},
			scanCode(){
				wx.scanCode({
				  success: (res) => {
				  	
				    this.addBook(res.result)
				    console.log('jaja')
				  }
				})
			},
			authorize(){
				this.nickNameShow = true
				this.getUserInfoShow = false
				showSuccess('获得授权成功')
			},
			login(){
				console.log('haha')
				let user = wx.getStorageSync('userInfo')
				var _this = this
				this.userInfo = user
				if(!user){
						qcloud.setLoginUrl(config.loginUrl);
						qcloud.login({
						    success: function (userInfo) {
						        console.log('登录成功', userInfo);
						        wx.setStorageSync('userInfo',userInfo)
						        showSuccess('登陆成功')
						        _this.userInfo = userInfo
						    },
						    fail: function (err) {
						        console.log('登录失败', err);
						    }
						});

				}
			}
		},
		created(){
			let user = wx.getStorageSync('userInfo')
			if(user){
				this.getUserInfoShow = false
				this.nickNameShow = true
				this.userInfo = user
			}
			
		},
		computed:{
			year(){
				return new Date().getFullYear()
			},
			day(){
				let start = new Date()
				start.setMonth(0)
				start.setDate(1)
				let offset = new Date().getTime() - start.getTime()
				return parseInt((offset/1000/60/60/24)+1)
			},
			percent(){
				return parseInt(this.day/365*100)
			}
		}

	}
</script>

<style lang='scss'>
	.container{
		text-align:left;
		padding:0 30rpx;
		.userInfo{
			margin-top:100px;
			text-align: center;
			img{
				width:200rpx;
				height:200rpx;
				margin:20px; 
				border-radius:50%;
			}
		}
		.progressBar{
			width:90%;
			margin:20px auto;  
			text-align: center;
			p{
				text-align:left;
			}
			button{
				width:90%;
				margin:0 auto;
			}
			
		}

	}
</style>