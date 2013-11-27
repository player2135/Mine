// ==UserScript==
// @name        19楼直接看大图
// @namespace   19lou
// @include     http://www.19lou.com/*
// @version     1
// ==/UserScript==


var unloginImgHolders=document.getElementsByClassName("unlogin-img");
for	(var i=0;i<unloginImgHolders.length;i++)
{	
	unloginImgHolders[i].style.width="100%";
	var imgs=unloginImgHolders[i].getElementsByTagName("img");
	//$(unloginImgHolders[i]).unbind("click");
	//$(unloginImgHolders[i].childNodes[0]).unbind("click");
	for	(var j=0;j<imgs.length;j++)
	{
		var src=imgs[j].getAttribute("src");
		var newSrc=src.replace("thumb_","");
		imgs[j].setAttribute("src",newSrc);
		imgs[j].removeAttribute("width");
		imgs[j].parentNode.removeChild(imgs[j].parentNode.childNodes[1]);
		imgs[j].style.cursor="default";
		imgs[j].onclick=function(e)
		{
			e.stopPropagation();
		};
		//$(imgs[j]).unbind("click");
	}
}