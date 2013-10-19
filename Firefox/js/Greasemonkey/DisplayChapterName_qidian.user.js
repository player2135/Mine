// ==UserScript==
// @name        右下角显示章节名
// @namespace   qidian
// @include     http://*.qidian.com/*
// @version     1
// ==/UserScript==


function DisplayChapterName()
{
	var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.right = "0px";
    div.style.bottom = "0px";
    div.style.backgroundColor = "black";
	div.style.color="#00ff00";
	div.style.fontSize="16px";
	div.innerHTML=document.getElementById("lbChapterName").textContent;
	document.body.appendChild(div);
}
function SetNextPageHref()
{
	if(ReadVipChapter.nextpage.indexOf("http")==-1)
	{
		var nextPage=document.getElementById("PrevPage").href.replace(ReadVipChapter.prevpage,ReadVipChapter.nextpage);
		document.getElementById("NextPage").href=ReadVipChapter.nextpage;
		document.getElementById("NextPage").removeAttribute("rel");
	}
}
//SetNextPageHref();
DisplayChapterName();
document.getElementById('reader_zancb').style.display='none';