(function(window,undefined){
var 
	//kQuery的构造函数
	kQuery = function(selector){
		return new kQuery.fn.init(selector);
	};
//kQuery的原型对象
kQuery.fn = kQuery.prototype = {
	constructor:kQuery,
	init:function(selector){
		selector=kQuery.trim(selector);
		//布尔值是假的情况返回空的jquery对象
		if(!selector){
			return this;
		}
		//如是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
		else if(kQuery.isFunction(selector)){
			document.addEventListener('DOMContentLoaded',function(){
				selector();
			});
			this[0] = document;
			this.length = 1;
			return this;
		}
		//处理字符串
		else if(kQuery.isString(selector)){
			//HTML代码处理
			if(kQuery.isHTML(selector)){
				var tmpDom=document.createElement('div');
				tmpDom.innerHTML=selector;
				[].push.apply(this,tmpDom.children);
				return this;
				//选择器处理
		    }else{
		    	var doms=document.querySelectorAll(selector);
		    	[].push.apply(this,doms);
		    	return this;
		    }
		}
		else if(kQuery.isArray(selector)){
			//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
			var tmpArr=[].slice.call(selector);
			//把转换后的真数组转换成伪数组
			[].push.apply(this,tmpArr);
			return this;
		}else{
			this[0]=selector;
			this.length=1;
			return this;
		}		
	}
}

kQuery.isFunction=function(str){
    return typeof str==='function';
}

kQuery.isString=function(str){
    return typeof str==='string';
}

kQuery.isHTML=function(str){
    return str.charAt(0)=='<' && str.charAt(str.length-1)=='>' &&str.length>=3;
}

kQuery.isArray=function(str){
    return kQuery.isObject(str)&&length in str
}

kQuery.isObject=function(str){
	return typeof str==='object';
}

kQuery.trim=function(str){
	if(kQuery.isString(str)){
		//用正则去掉字符串的前后空格
		return str.replace(/^\s+|\s+$/g,'');
	}else{
		return str;
	}
}

kQuery.fn.init.prototype = kQuery.fn;


window.kQuery = window.$ = kQuery;

})(window);