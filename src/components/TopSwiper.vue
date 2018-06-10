<template>
	<div class="swiper">
		<swiper	
		indicator-dots="true"
		indicator-color="#6b7179"
		autoplay = true
		duration = '1000'
		circular = 'true'
		>
		<div   :key='imgindex'   v-for='(top,imgindex) in imgUrls'>
			<swiper-item>
				<img 
				@click='bookDetail(img)'
				class="slider" 
				mode="aspectFit" 
				v-for="img in top"
				:key='img.id'
				:src="img.image" >
			</swiper-item>
		</div>	
	

		</swiper>
	</div>
</template>


<script>
	export default{
		props:[	'tops'],
		computed:{
			imgUrls(){
				let res = this.tops
				return [res.slice(0,3),res.slice(3,6),res.slice(6)] //可以用chunk
			}
		},
		methods:{
			bookDetail(item){
				wx.navigateTo({
					url:'/pages/detail/main?id='+item.id 
				})
			}
		},
		mounted(){
			
		}
	}
</script>


<style>
	.slider{
		margin-top: 5px;
		width:33.3%;
		height:250rpx;
	}
</style>