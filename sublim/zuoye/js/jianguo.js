var oCartBox=document.querySelector('.cart-box');
var oCartCon=document.querySelector('.cart-box .cart-conter');
var timer=null;
		function animation(obj,iTarget){
			clearInterval(timer);
			timer=setInterval(function(){
				var curr=getComputedStyle(obj,false)['opacity']*100;
				var iSpeed=0;
				if(curr<=iTarget){
					iSpeed=10;
				}else{
					iSpeed=-10;
				}
				if(Math.abs(iTarget-curr)<Math.abs(iSpeed)){
					clearInterval(timer);
					obj.style.opacity=iTarget/100
				}else{
					obj.style.opacity=(curr+iSpeed)/100;
				}
				
			},30)
		}
oCartBox.onmouseenter=function(){
	oCartCon.style.display='block';
	animation(oCartCon,100);	
}
oCartBox.onmouseleave=function(){
	animation(oCartCon,0);
	oCartCon.style.display='none';
}