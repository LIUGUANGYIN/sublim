//复杂请求
var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring')

var server=http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","text");
	var urlStr=req.url;
	console.log("req.url::",urlStr);

	if(urlStr=='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	console.log(req.method);
	if(req.method=="POST"){
		var body='';
		req.on('data',function(chunk){
			body+=chunk;
		});
		req.on('end',function(){
			var bodyObj=querystring.parse(body);
			var strBody=JSON.stringify(bodyObj);
			res.statusCode=200;
			res.end(strBody);
		});

	}else{

		if(urlStr.search(/\?/)!=-1){
		var prams=url.parse(urlStr,true).query;
		var pramsStr=JSON.stringify(prams);
		res.statusCode=200;
		res.end(pramsStr)
	}
	
	var filePath="./"+urlStr;

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
   }	
});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000')
})