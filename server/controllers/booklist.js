const { mysql } = require('../qcloud')

module.exports = async(ctx) =>{
	const {page,openid} = ctx.request.query
	console.log(ctx.request.query)
	const size = 6
	const books = await mysql('books').select('books.*','cSessionInfo.user_info')
									  .join('cSessionInfo','books.openid','cSessionInfo.open_id')
									  .limit(size)
									  .offset(Number(page)* size)
									  .orderBy('books.id','desc')
	console.log('books',books)
	ctx.state.data = {
		list:books.map(v=>{
			const info =JSON.parse(v.user_info)
			return Object.assign({},v,{
				user_info:{
					nickName:info.nickName
				}
			})
		})
	}						
}