const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
	console.log(ctx.request.body)
	const {openid,comment,location,phone,bookid} = ctx.request.body
	console.log({openid,comment,location,phone,bookid})
	try{
		await mysql('comments').insert(ctx.request.body)
		ctx.state.data={
			msg:'success'
		}
	}catch(e){
		ctx.state.data={
			code:-1,
			data:{
				msg:'评论失败'+e.sqlMessage
			}
		}
	}
}