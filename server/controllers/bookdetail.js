const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
	const num = parseInt(Math.random()*10)
	const {id} = ctx.request.query

	const detail = await mysql('books').select('books.*','cSessionInfo.user_info')
									  .join('cSessionInfo','books.openid','cSessionInfo.open_id')
									  .where('id',id)
									  .first()
	const info = JSON.parse(detail.user_info) //把字符串转为对象
	ctx.state.data = Object.assign({},detail,{  //后面的对象覆盖前面的,存在的则覆盖木有则添加
		tags:detail.tags.split(','),
		summary:detail.summary.split('\n'),
		user_info:{
			name:info.nickName,
			image:info.avatarUrl
		}
	})

	console.log(detail)

	await mysql('books')
			.where('id',id)
			.increment('count',num)
}
