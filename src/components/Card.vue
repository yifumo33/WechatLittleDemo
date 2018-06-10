<template>
	<a :href="detailUrl">
	<div class="book-card">
		<a href="">
			
		</a>
		<div class="thumb">
			<img :src="book.image" class="image" mode ='aspectFit' @click.stop="preview"> 
			<!-- @click.stop可以防止事件向上传递 -->
		</div>
		<div class="detail">
			<div class="row">
				<div class="right text-primary">
					
					{{book.title}}
				</div>
				<div class="left text-primary">
					{{book.rate}} <Rate :value = 'book.rate'></Rate>
				</div>
			</div>
			<div class="row">
				<div class="right">
					
					{{book.author}}
				</div>
				<div class="left">
					浏览量:{{book.count}}
				</div>
			</div>
			<div class="row">
				<div class="right">
					
					{{book.publisher}}
				</div>
				<div class="left">
					{{book.user_info.nickName}}
				</div>
			</div>


		</div>
	</div>
	</a>
</template>

<script>
	import Rate from '@/components/Rate'
	export default{
		props:[
			'book'
		],
		components:{
			Rate

		},
		methods:{
			preview(){
				wx.previewImage({
					current:this.book.image,
					urls:[this.book.image]

				})
			}
		},
		computed:{
			detailUrl(){
				return '/pages/detail/main?id='+this.book.id
			}
		}
	}
</script>

<style lang='scss'>
	.book-card{
		height:100px;
		font-size:12px;
		padding-right:25rpx;
		margin:5px 0;
		display: flex;
    	justify-content: space-between;
		.thumb{
				max-width:100%;
				max-height:100%; 
			img{
				width:90px;
				height:90px;
				
			}
		}
		.detail{
			flex:1;
			display:flex;
			max-width:100%;
			max-height:100%; 
			flex-direction:column;
			justify-content: space-between;

			.row{
				line-height:20px; 
				display:flex;
				justify-content: space-between;
			.right{
				width:175px; 
				overflow:hidden;
				}
			}
			
		}  
	}
</style>