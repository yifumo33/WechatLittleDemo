<template>
	<div>
			<TopSwiper :tops="tops"></TopSwiper>	
			<Card  :key="book.id" v-for="book in books" :book="book" ></Card>
			
	</div>
</template>

<script>
	import TopSwiper from '@/components/TopSwiper'
	import Card from '@/components/Card'
	import {get,showModal} from '@/util'
	export default{
		data(){
			return{
				books:[],
				page:0,
			
				tops:[]
			}
		},
		methods:{
			async getList(init){
				if(init){
					this.page = 0		
				}
				wx.showNavigationBarLoading()
				const books = await get('/weapp/booklist',{page:this.page})
				const booksData = books.data.data.list
				console.log(booksData)
				if(this.page === 0){
					if(booksData.length < 3 ){
						this.books = booksData
						showModal('提示','没有更多图书了')
						this.page++
						return
					}
					this.books = booksData
					this.page++
					wx.stopPullDownRefresh()

				}else{
					if(booksData.length < 3 ){
						this.books = this.books.concat(booksData)
						showModal('提示','没有更多图书了')
						this.page++
						wx.hideNavigationBarLoading()
						return
					}
					this.books = this.books.concat(booksData)
					this.page++
					wx.stopPullDownRefresh()

				}

				wx.hideNavigationBarLoading()
				// res = books.data.data
				// this.books = res.list
				// console.log(res.list)
				// console.log(this.book)
			},
			async getTop(){
				const tops = await get('/weapp/top')
				this.tops = tops.data.data.list 
			}
		},
		onPullDownRefresh(){
			this.getList(false)
			this.getTop()
			console.log('下拉')
		},
	
		mounted(){
			this.getList(true)
			this.getTop()
		},
		onShow(){
			this.getList(true)
			this.getTop()
		},
		components:{
			Card,
			TopSwiper
		}

	}
</script>

<style>
	
</style>