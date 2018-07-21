(function(window,undefind){

	var kQuery=function(){

		return new kQuery.fn.init();
	};

	kQuery.fn=kQuery.prototype={

		constructor:kQuery,
		
		init:function(){

		}

	}

kQuery.fn.init.prototype=kQuery.fn;

 window.kQuery=window.$=kQuery;	

})(window)