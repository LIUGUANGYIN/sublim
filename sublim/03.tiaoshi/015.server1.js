var http=require('http');
var fs=require('fs');
var url=require('url')

var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	var urlStr=req.url;
	console.log("req.url::"urlStr);

	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}

	if(urlStr.search(/\?/)!=-1){
		var prams=url.parse(urlStr,true).query;
		var pramsStr=JSON stringify(prams);
		res.statusCode=200;
		res.end(pramsStr)
	}

	var filePath="./"+req.url;

	fs.readFile(filePath,function(err,data){
		if(err){
			console.log('read file error:::',err);
			res.statusCode=404;
			res.end('file not found');
		}else{
			res.statusCode=200;
			res.end(data);
		}
	})
});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000')
})