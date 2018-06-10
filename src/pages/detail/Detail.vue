<template>
	<div class="Detail">
		<BookInfo :info="info" :name="name" :image="image"></BookInfo>
		<div class="Mycomments">
			<p style="font-size:20px;font-weight:bolder" v-if="pinglun.length">读者评论</p>
			<ul style="padding:20rpx">
				<li class="commet-item" v-for="(item,index) in pinglun" :key="index">
					<div class="Commenter">
						<div class="Commenter-left"><img :src="item.image"> {{item.title}} </div>
						<div class="Commenter-right">来自{{item.phone}}-{{item.location}}</div>
					</div>	
					<p>{{item.comment}}</p>
					
				</li>
			</ul>
		</div>		
		<div class="comment" v-if="showAdd">
			<textarea  class="textarea" 
					   v-model='comments'
					   maxlength="100"
					   placeholder="请输入评论"></textarea>
		</div>
		<div class="Info" v-if="showAdd">
			<div class="location" >
				地理位置：
				<switch color="#6b7179" @change="getGeo" :check="location"></switch>	 
				<!-- check时才有值 -->
				<p class="text-primary">{{location}}</p>	
			</div>
			<div class="phone">
				手机型号：
				<switch color="#6b7179" @change="getPhone" :check="phone"></switch>
				<p class="text-primary">{{phone}}</p>	
			</div>	
		</div>
		<button class='btn' @click='addComment' v-if="showAdd">评论</button>
		<div v-if="!showAdd" style="text-align:center">
			未登录或者已经评论过了
		</div>
		<button class="btn" open-type="share">转发给好友</button>
	</div>
	
</template>

<script>
	import CommentList from '@/components/CommentList'
	import {get,post} from '@/util'
	import BookInfo from '@/components/BookInfo'
	export default{ 
		components:{ //components是一个对象
			BookInfo,
			CommentList
		},
		data(){
			return{
				pinglun:[],
				userinfo:{},
				bookid:'',
				info:{},
				image:'',
				name:'',
				comments:'',
				location:'',
				phone:''
			}
		},
		methods:{
			async getDetail(){
				const info = await get('/weapp/bookdetail',{id:this.bookid})
				this.info = info.data.data
				wx.setNavigationBarTitle({
					title:this.info.title
				})
				this.name = this.info.user_info['name']
				this.image = this.info.user_info['image']
			},
			getPhone(e){
				if(e.target.value){
					const phoneInfo = wx.getSystemInfoSync()
					console.log(phoneInfo)
					this.phone = phoneInfo.model
				}else{
					this.phone =''
				}
			},
			getGeo(e){
				// egzibELG8jh6L45lGyGUsxzGaz5tSrB3
				const ak = 'egzibELG8jh6L45lGyGUsxzGaz5tSrB3'
				let url = 'http://api.map.baidu.com/geocoder/v2/'
				if(e.target.value){
					wx.getLocation({
						success:geo=>{
							wx.request({
								url,
								data:{
									location:`${geo.latitude},${geo.longitude}`,
									output:'json',
									ak
								},
								success:res=>{
									console.log(res.data.result.addressComponent)
									this.location = `${res.data.result.addressComponent.province} ${res.data.result.addressComponent.city} ${res.data.result.addressComponent.district} `
								}
							})
						}
					})
				}else{
					this.location=''
				}
			},
			async addComment(){
				if(!this.comments){
					return
				}
				const data = {
					openid:this.userinfo.openId,
					comment:this.comments,
					location:this.location,
					phone:this.phone,
					bookid:this.bookid

				}
				try{
					await post('/weapp/addcomment',data)
					this.comments=''
					this.getComments()
				}catch(e){
					console.log('失败',e.sqlMessage)
				}
			 },
			 async getComments(){
			 	const pinglun = await get('/weapp/commentlist',{bookid:this.bookid})
			 	console.log("pinglun",pinglun.data.data.list)
			 	this.pinglun = pinglun.data.data.list || []
			 	console.log(this.pinglun)	 
			 }
		},
		mounted(){
			this.bookid = this.$root.$mp.query.id //获取url的参数
			this.getDetail()
			this.getComments()
			const userinfo = wx.getStorageSync('userInfo')
			if(userinfo){
				this.userinfo = userinfo
			}

			
		},
		computed:{
			showAdd(){
				if(!this.userinfo.openId){
					return false
				}
				console.log("this.pinglun",this.pinglun)
				

				if(this.pinglun.filter(v=>v.openid = this.userinfo.openId).length){
					return false
				}
				return true;
			}
		}
	}
	
</script>

<style lang='scss'>
	.text-primary{
		font-size:14px;
	}
	
		.Info{
			display:flex;
			justify-content:space-between;
			.location{

			margin-top:10px;
			padding:5px;
			}
			.phone{
				padding:5px;
				margin-top:10px;
			}

		}
		
	.comment{
		margin-top:10px;
		.textarea{
				width:730rpx;
				height:200rpx;
				background:#eeeeee;
				padding:10px;
		}
		
	}
	.Mycomments{
		
	}
	.commet-item{
			box-sizing:border-box;
			width:100%; 
			border:1px solid;
			border-radius:20px;
			background:#6b7179;
			color:white; 
			padding:10px;

			.Commenter{
				font-size:12px;
				display:flex;
				margin-left:10rpx;
				align-items:center;
				.Commenter-left{
					margin-right:120rpx; 
				}
			}
			img{
				border-radius:50%; 
				width:50rpx;
				height:50rpx;
			}
			p{
				text-align:left; 
			}
	}
</style>