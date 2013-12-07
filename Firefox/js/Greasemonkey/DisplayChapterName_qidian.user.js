// ==UserScript==
// @name        右下角显示章节名及VIP章节强制图片显示
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
	div.innerHTML=document.getElementById("lbChapterName").textContent;//"<input type='button' value='图片化' onclick='window.ChangeTextToPicture();'/><br/>" + 
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
window.ChangeTextToPicture = function()
{
	var zj_txt=document.getElementsByClassName("zj_txt");
	if(zj_txt.length!=0)
	{
		var zj_cont=zj_txt[0].parentNode;
		zj_cont.removeChild(zj_txt[0]);
		var div=document.createElement("div");
		div.className="zj_img";
		var img=document.createElement("img");
		img.src=GetImgUrl(zj_cont.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		img.id="Image1";
		zj_cont.insertBefore(div,zj_cont.childNodes[0]);
		div.appendChild(img);
	}
	function GetBookId()
	{
		return ReadVipChapter.bookId;
	}
	function GetChapterId(form1)
	{
		var url=form1.getAttribute("action");
		var paths=url.split('/');
		var path=paths[paths.length-1];
		var split=path.replace(".aspx","").split(',');
		return split[2];
	}
	function GetPage(form1)
	{
		var url=form1.getAttribute("action");
		var paths=url.split('/');
		var path=paths[paths.length-1];
		var split=path.replace(".aspx","").split(',');
		if(split.length==3)
		{
			return 0;
		}
		return parseInt(split[3]);
	}
	function GetImgUrl(form1)
	{
		return "http://vip.qidian.com/BookReader/ChapterImage.aspx?bookId="+GetBookId()+"&chapterId="+GetChapterId(form1)+"&page="+GetPage(form1);
	}
}
SetNextPageHref();
DisplayChapterName();
document.getElementById('reader_zancb').style.display='none';
window.addEventListener("load",function(){
	window.ChangeTextToPicture();
	setInterval(window.ChangeTextToPicture,500);
});