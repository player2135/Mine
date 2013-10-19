// ==UserScript==
// @name        滚动到顶和底
// @namespace   all
// @include     http://*
// @version     1
// ==/UserScript==


function ScrollTopAndBottom()
{
	function ScrollTop(){
		var img=document.createElement("img");
		img.setAttribute("onclick","scroll(0,0);");
		img.style.width="40px";
		img.style.cursor="pointer";
		img.style.position="fixed";
		img.style.zIndex=9999;
		img.style.left="915px";
		img.style.bottom="0px";
		img.style.fontSize="16px";
		img.src="https://raw.github.com/player2135/Mine/Firefox/Firefox/img/toTop.png";
		document.body.appendChild(img);
	}
	function ScrollBottom(){
		var img=document.createElement("img");
		img.setAttribute("onclick","scroll(0,scrollMaxY);");
		img.style.cursor="pointer";
		img.style.position="fixed";
		img.style.width="40px";
		img.style.zIndex=9999;
		img.style.left="955px";
		img.style.bottom="0px";
		img.style.fontSize="16px";
		img.src="https://raw.github.com/player2135/Mine/Firefox/Firefox/img/toBottom.png";
		document.body.appendChild(img);
	}
	if(scrollMaxY!=0)
	{
		ScrollTop();
		ScrollBottom();
	}
}
window.addEventListener("load",function(){
	ScrollTopAndBottom();
},false);