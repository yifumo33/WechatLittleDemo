<template>
	<div class="bookinfo">
		<div class="thumb">
			<img 
			mode = "aspecFill"
			:src="info.image" 
			class="back" 
			>
			<img 
			class="img" 
			:src="info.image"
			mode = "aspecFit"
			>
			<div class="info">
				<div class="title">
					{{info.title}}
				</div>
				<div class="author">
					{{info.author}}
				</div>
			</div>		
		</div>
			<div class="owner">
				<div class="left">
				添加者:{{name}} 
				</div>
				<div class="right">

					<Rate :value='info.rate'></Rate>
					{{info.rate}}分
				</div>				
			</div>
			<div class="detail">
				{{info.publisher}}
				<div class="right">
					{{info.price}}
				</div>
			</div>
			<div class="tags">
				<span :key="tag" class="badge" v-for="tag in info.tags">
					{{tag}}
				</span>
			</div>
			<div class="summary">
				<p :key="sum" v-for="sum in info.summary">
					{{sum}}
				</p>
			</div>
	</div>
</template>


<style lang="scss">
.bookinfo{
	 .badge{
		display: inline-block;
		margin:5px;
		border-radius:10px;
		border:1px solid #6b7179;
		background:#6b7179;
		color:white;
		padding:6px;
	 }
	 .summary{
	 	padding:0 10px;
	 	margin-top:10px;
	 	p{
	 		text-indent:2em; //字体缩进
	 		font-size:14px;
	 	} 
	 }
	 font-size:14px;

	.thumb{
		width:750rpx;
		height:500rpx;
		position: relative;
		overflow:hidden;
		.back{
			filter:blur(15px);
			width:100%;
		}
		.img{
			position: absolute;
			height:300rpx;
			width:250rpx;
			transform:translate(-50%,-50%);
			left:50%;
			top:40%;
		}
		.info{
			color:white;
			position: absolute;
			width:100%;
			left:0;
			top:400rpx;
			text-align:center;
			.title{
				font-size:20px;
			}
			.author{
				font-size:14px;
			}
		}		
	}
	.owner,
	.detail{
			padding:5px 10px;
			font-size:14px;
			color:black;
			display:flex;
			justify-content:space-between;
	}
}
	
</style>


<script>
	import Rate from '@/components/Rate'
	export default{
			props:[
			 'info',
			 'name',
			 'image' //记住props里面要用字符串扩起来
			],
			data(){
				return {
					haha:'hehe'
				}
			},
			mounted(){
				
				// console.log(this.info.user_info)
			},
			components:{
				Rate
			}
	}
</script>
