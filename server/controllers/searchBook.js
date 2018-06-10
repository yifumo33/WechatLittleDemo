const http = require('https')


module.exports = async(ctx) =>{
	const keyWord = ctx.request.body.keyWord
    let url = 'https://api.douban.com/v2/book/search?q=' + keyWord
    const result = getJSON(url)
    ctx.state.data={
    	result,
    	msg:'success'
    }


}


function getJSON(url){
	return new Promise((reslove,reject)=>{
		https.get(url,res=>{
			let urlData = ''
			res.on('data',data=>{
				urlData += data
			})
			res.on('end',data=>{
				const bookinfo = JSON.parse(urlData)
				if(bookinfo.title){
					reslove(bookinfo)
				}
				reject(bookinfo)
			})
		})
	})
}