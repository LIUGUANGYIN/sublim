(function(win,doc){
		var oFont=doc.getElementsByTagName('html')[0];

		function fontSize(){
		var iWidth=doc.body.clientWidth||doc.documentElement.clientWidth;
		var iFont=iWidth/10+'px';
		oFont.style.fontSize=iFont;
		}

		win.addEventListener('resize',fontSize,false);
		doc.addEventListener('DOMContentLoaded',fontSize,false);
		
})(window,document);