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
//静态
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
        },
    toWord:function(str){
        return str.match(/\b\w+\b/g);
    },
    addEvent:function(dom,eventName,fn){
        if(dom.addEventListener){
            dom.addEventListener(eventName,fn);
        }else{
            dom.attachEvent('on'+eventName);
        }
    }
});
//kquery对象上的属性相关的操作方法
kQuery.fn.extend({
    html:function(conter){
        if(conter){
            this.each(function(){
              this.innerHTML=conter;
            })
            return this;
        }else{
            return this[0].innerHTML;
        }
    },
    text:function(conter){
        if(conter){
            this.each(function(){
                this.innerText=conter;
            })
            return this;
        }else{

            this.each(function(){
                var str=''
                str+=this.innerText;
            })

            return str;
        }
    },
    attr:function(arg1,arg2){
        if(kQuery.isObject(arg1)){
            this.each(function(){
                var dom=this;
                kQuery.each(arg1,function(attr,val){
                    dom.setAttribute(attr,val);
                })
            })
        }else{
            if(arguments.length==1){
                return this[0].getAttribute(arg1);
            }else if(arguments.length==2){
                    this.each(function(){
                        this.setAttribute(arg1,arg2);
                    })
                }
            }
        return this;
    },
    removeAttr:function(attr){
        if(attr){
            this.each(function(){
                this.removeAttribute(attr);
            })
        }
        return this;
    },
    val:function(val){
        if(val){
            this.each(function(){
                this.value=val;
            })
            return this
        }else{
            return this[0].value;
        }
    },
    css:function(arg1,arg2){
        if(kQuery.isString(arg1)){
            if(arguments.length==1){
                if(this[0].currentStyle){
                    return this[0].currentStyle[arg1];
                }else{
                    return getComputedStyle(this[0],false)[arg1];
                }
            }else if(arguments.length==2){
                this.each(function(){
                    this.style[arg1]=arg2;
                });
            }
        }else if(kQuery.isObject(arg1)){
            this.each(function(){
                for(key in arg1){
                    this.style[key]=arg1[key]
                }
            });
        }
        return this;
    },
    hasClass:function(str){
        var set=false;
        if(str){
           var seg=eval('/\\b'+str+'\\b/');
           this.each(function(){
            if(seg.test(this.className)){
                set=true;
                return false;
                }
           })
        }
        return set;
    },
    addClass:function(str){
        this.each(function(){
            var names=kQuery.toWord(str);
            var $this=kQuery(this);
            for(var i=0;i<names.length;i++){
                if(!$this.hasClass(names[i])){
                    this.className=this.className+' '+names[i];
                } 
            }
           
        })
        return this;
    },
    removeClass:function(str){
        if(str){
             var names=kQuery.toWord(str);
            this.each(function(){
                var $this=kQuery(this);
                for(var i=0;i<names.length;i++){
                    if($this.hasClass(names[i])){
                        var reg=eval('/\\b'+names[i]+'\\b/')
                     this.className= this.className.replace(reg,'');
                    }
                }
            })
        }else{
            this.each(function(){
                this.className='';
            })    
        } 
        return this;  
    },
    toggleClass:function(str){
        if(str){
            var names=kQuery.toWord(str);
            this.each(function(){
                var $this=kQuery(this);
                for(var i=0;i<names.length;i++){
                    if($this.hasClass(names[i])){
                        kQuery.removeClass(names[i]);
                    }else{
                        kQuery.addClass(names[i]);
                    }
                }
            })
        }else{
            this.each(function(){
                this.className='';
            })
        }
        return this;
    }
});
////kquery对象上的DOM操作相关方法
kQuery.fn.extend({
    empty:function(){
        this.each(function(){
            this.innerHTML='';
        });
        return this;
    },
    remove:function(selector){
        if(selector){
            //获取选择器选中的所有DOM节点
            var doms=document.querySelectorAll(selector);
            this.each(function(){
                for(i=0;i<doms.length;i++){
                    if(doms[i]==this){
                        //删除
                        var parentNode=this.parentNode;
                        parentNode.removeChild(this)
                    }
                }
            });   
        }else{//没有传参
            this.each(function(){
                this.innerHTML='';
            });
        }
        return this;
    },
    append:function(source){
        if(source){
            //kquery对象,DOM节点,HTML代码片段
            //source -> this
            $source=kQuery(source);
            this.each(function(index,value){
                var parentNode=this;
                if(index==0){//第一个DOM元素直接插入
                    $source.each(function(){
                        parentNode.appendChild(this);
                })
                }else{//第一个DOM元素复制一份再插入
                    $source.each(function(){
                        //复制一份
                    var dom=this.cloneNode(true);
                    parentNode.appendChild(dom);
                    })
                }
                
            })
        }
        return this;
    },
    perpend:function(source){
        if(source){
            $source=kQuery(source);
            this.each(function(index,value){
                var parentNode=this;
                if(index==0){//第一个DOM元素直接插入
                    $source.each(function(){
                        parentNode.inserBefore(this,parentNode.firstChild);
                })
                }else{
                    //第一个DOM元素复制一份在插入
                    $source.each(function(){
                        //复制一份
                        var dom=this.cloneNode(true);
                        parentNode.inserBefore(dom,parentNode.firstChild);
                    })
                }
                
            })
        }
        return this;
    },
    clone:function(bcopy){
        var res=[];
        this.each(function(){
            var dom=this.cloneNode(true);
            if(bcopy && this.bucketEvent){
                kQuery.each(this.bucketEvent,function(eventName,fnArr){
                    kQuery.each(fnArr,function(){
                        kQuery(dom).on(eventName,this)
                    })
                })
            }else{
            }
        })
        return kQuery(res)
    }
})
//kquery对象上事件相关的方法
kQuery.fn.extend({
    on:function(eventName,fn){
        this.each(function(){
           if(!this.bucketEvent){
            this.bucketEvent={};
           }
           if(!this.bucketEvent[eventName]){
               this.bucketEvent[eventName]=[];
               this.bucketEvent[eventName].push(fn);
               kQuery.addEvent(this,eventName,function(){
                   kQuery.each(this.bucketEvent[eventName],function(){
                       this();
                })
            })
        }else{
            this.bucketEvent[eventName].push(fn);
        }
        })

    },
    off:function(eventName,fnName){
        if(arguments.length==0){
            this.each(function(){
                this.bucketEvent={};
            })    
        }else if(arguments.length==1){
            this.each(function(){
                if(this.bucketEvent){
                    this.bucketEvent[eventName]=[];
                }
            });
        }else if(arguments.length==2)
        this.each(function(){
            var dom=this;
            if(this.bucketEvent && this.bucketEvent[eventName]){
                kQuery.each(this.bucketEvent[eventName],function(index,fnName){
                    if(this.eventName=fnName){
                    dom.bucketEvent[eventName].sp lice(index,0);
                    }
                })
            }
        })

    }
});

kQuery.fn.init.prototype=kQuery.fn;

window.kQuery=window.$=kQuery;	

})(window);