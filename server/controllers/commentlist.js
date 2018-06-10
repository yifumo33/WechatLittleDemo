const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
	console.log('haha')
	const {bookid,openid} = ctx.request.query

	console.log('书名')
	console.log({bookid})
	console.log('commentlist',{bookid,openid})
	const mysqlSelect =   mysql('comments')
                      .select('comments.*', 'cSessionInfo.user_info')
                      .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
     
    if(bookid){
    	comments = await mysqlSelect.where('bookid',bookid)
    }else if(openid){
        comments = await mysqlSelect.where('openid',openid)
    }                 
	console.log('评论')						
	console.log(comments)

	ctx.state.data = {
		list:comments.map(v=>{
			const info = JSON.parse(v.user_info)
			return Object.assign({},v,{
				title:info.nickName,
				image:info.avatarUrl
			})
		})
	}			
}