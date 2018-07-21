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
		}
		//处理字符串
		else if(kQuery.isString(selector)){
			//HTML代码处理
			if(kQuery.isHTML(selector)){
				var tmpDom=document.createElement('div');
				tmpDom.innerHTML=selector;
				[].push.apply(this,tmpDom.children);
				//选择器处理
		    }else{
		    	var doms=document.querySelectorAll(selector);
		    	[].push.apply(this,doms);
		    }
		}
		else if(kQuery.isArray(selector)){
			//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
			var tmpArr=[].slice.call(selector);
			//把转换后的真数组转换成伪数组
			[].push.apply(this,tmpArr);
		}else{
			this[0]=selector;
			this.length=1;
		}
		return this;		
	},
    selector: "",
    length: 0,
    jquery:'1.1.11',
    push: [].push,
    sort: [].sort,
    splice: [].splice,
    toArray:function(){
    		return [].slice.call(this);
    	},
    get:function(num){
    	if(arguments.length==1){
    		if(num>=0){
    			return this[num];
    		}else{
    			return this[this.length+num];
    		}
    	}else{
    		return this.toArray();
    	}
    },
    eq:function(num){
      if(arguments.length==1){
      	return kQuery(this.get(num));
      }else{
      	return new kQuery();
      }
    },
    first:function(){
    		return this.eq(0);
    	},
    
    last:function(){
    		return this.eq(-1);
    	},
    each:function(fn){
    	return kQuery.each(this,fn)
    },
    map:function(fn){
    	return kQuery(kQuery.map(this,fn))
    }
}

kQuery.extend=kQuery.fn.extend=function(obj){
	for(key in obj){
		this[key]=obj[key];
	}
}
kQuery.extend({
    isFunction:function(str){
        return typeof str==='function';
    },
    isString:function(str){
        return typeof str==='string';
    },
    isHTML:function(str){
        return str.charAt(0)=='<' && str.charAt(str.length-1)=='>' &&str.length>=3;
    },
    isArray:function(str){
        return kQuery.isObject(str)&&length in str
    },
    isObject:function(str){
	    return typeof str==='object';
    },
    trim:function(str){
	    if(kQuery.isString(str)){
		    //用正则去掉字符串的前后空格
		    return str.replace(/^\s+|\s+$/g,'');
	    }else{
		    return str;
	    }
    },
    each:function(arr,fn){
		if(kQuery.isArray(arr)){
			for(var i=0;i<arr.length;i++){
				var res=fn.call(arr[i],i,arr[i]);
				if(res==false){
					break;
				}else if(res==true){
					continue;
				}
			}
		}else{
			for(key in arr){
				var res=fn.call(arr[key],key,arr[key]);
				if(res==false){
					break;
				}else if(res==true){
					continue;
				}
			}
		}
		return arr;
	},
    map:function(arr,fn){
    	var retArr=[];
    	if(kQuery.isArray(arr)){
    		for(var i=0;i<arr.length;i++){
    			var res=fn(arr[i],i);
    			if(res){
    				retArr.push(res);
    			}
    		}
    	}else{
    		for(key in arr){
    			var res=fn(arr[key],key);
    				if(res){
    					retArr.push(res)
    				}
    			}
    		}
    		return retArr;
        }
    });

kQuery.fn.init.prototype=kQuery.fn;

window.kQuery=window.$=kQuery;	

})(window);