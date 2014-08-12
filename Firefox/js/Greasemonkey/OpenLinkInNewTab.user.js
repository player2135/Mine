// ==UserScript==
// @name        列表新窗口打开
// @namespace   nga
// @include     http://bbs.ngacn.cc/thread.php*
// @include     http://nga.178.com/thread.php*
// @include		http://bbs.bt5156.com/forumdisplay.php*
// @include		http://bbs.bt5156.com/thread.php*
// @version     1
// ==/UserScript==
function SetAllAOpenNew(anchors)
{
	for(var i=0;i<anchors.length;i++)
	{
		if(anchors[i].href.indexOf("javascript")!=0){
			anchors[i].setAttribute("target","_blank");
		}
	}
}
function OpenNewNga()
{
	var topicA=document.getElementsByClassName("topic");
	SetAllAOpenNew(topicA);
	var allPagerSpan=document.getElementsByClassName("pager");
	for(var i=0;i<allPagerSpan.length;i++)
	{
		var pagerA=allPagerSpan[i].getElementsByTagName("a");
		SetAllAOpenNew(pagerA);
	}
	var authorA=document.getElementsByClassName("author");
	SetAllAOpenNew(authorA);
	var replyA=document.getElementsByClassName("silver replydate");
	SetAllAOpenNew(replyA);
	var menuA=document.getElementById("mainmenu").getElementsByTagName("a");
	SetAllAOpenNew(menuA);
}
function OpenNewBt5156()
{
	var commonTh=document.getElementsByClassName("common");
	var commonA=[];
	for(var i=0;i<commonTh.length;i++)
	{
		commonA.push(commonTh[i].getElementsByTagName("span")[0].childNodes[0]);
	}
	SetAllAOpenNew(commonA);
	var newTh=document.getElementsByClassName("new");
	var newA=[];
	for(var i=0;i<newTh.length;i++)
	{
		if(newTh[i].tagName.toUpperCase()=="TH" && newTh[i].getElementsByTagName("span").length>0)
		{
			newA.push(newTh[i].getElementsByTagName("span")[0].childNodes[0]);
		}
	}
	SetAllAOpenNew(newA);
	var hotTh=document.getElementsByClassName("hot");
	var hotA=[];
	for(var i=0;i<hotTh.length;i++)
	{
		if(hotTh[i].tagName.toUpperCase()=="TH" && hotTh[i].getElementsByTagName("span").length>0)
		{
			hotA.push(hotTh[i].getElementsByTagName("span")[0].childNodes[0]);
		}
	}
	SetAllAOpenNew(hotA);
}
function OpenNewBt5156New()
{
	var topicA=document.getElementById("ajaxtable").getElementsByTagName("a");
	SetAllAOpenNew(topicA);
}
function TryDo(func)
{
	try
	{
		func();
	}
	catch(_Err)
	{
		console.log(_Err);
	}
}
function OpenNew()
{
	TryDo(OpenNewNga);
	TryDo(OpenNewBt5156);
	TryDo(OpenNewBt5156New);
}
OpenNew();