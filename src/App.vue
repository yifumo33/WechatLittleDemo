
<script>
	import config from './config'
	import {get,showSuccess} from './util'
	

	import qcloud from 'wafer2-client-sdk'


	export default{

		data(){
			return{

			}
		},
		async created(){


				// 设置登录地址
		


		 // const res  = await get('/weapp/demo')
		 // console.log(123,res)
			console.log('小程序启动！')
		}
	}
</script>

<style>
	.text-footer{
		text-align:center;
		font-size:12px;
	}
	.text-primary{
		color:#6b7179;
	}
	.btn{
		color:white;
		font-size:16px;
		line-height: 40px;
		height:40px;
		margin:10px 0;
		background: #6b7179;
	}
	.btn:active{
		background: #6b6171;
	}
</style>