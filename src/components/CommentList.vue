<template>
	<div class="comment-list">
		hello
		<!-- <div :key="index" v-for ="(comment,index) in pinglun.list">
			{{comment.title}}
		</div>	 -->
	</div>
</template>
	

<script>
	export default{
		props:[
			'haha'
		],
		created(){
			console.log(this.haha)
		}
	}
</script>


<style>
	
</style>