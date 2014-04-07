// ==UserScript==
// @name        右下角显示章节名及VIP章节强制图片显示
// @namespace   qidian
// @include     http://vipreader.qidian.com/BookReader/vip,*.aspx
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
		var textLength=zj_txt[0].textContent.length;
		var zj_cont=zj_txt[0].parentNode;
		zj_cont.removeChild(zj_txt[0]);
		var div=document.createElement("div");
		div.className="zj_img";
		zj_cont.insertBefore(div,zj_cont.childNodes[0]);
		var imgs=GetImages(zj_cont.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,textLength);
		for(var i=0;i<imgs.length;i++)
		{
			div.appendChild(imgs[i]);
		}
	}
	else
	{
		var zj_img=document.getElementsByClassName("zj_img");
		if(zj_img.length!=0)
		{
			for(var i=0;i<zj_img.length;i++)
			{
				var zj_cont=zj_img[i].parentNode;
				var img=zj_img[i].getElementsByTagName("img")[0];
				if(img.src.indexOf("http://localhost/Mine/MyWeb/QiDian/VipPictureConverter.ashx")==-1)
				{
					var pageUrl="http://vipreader.qidian.com"+zj_cont.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("action");
					var imgUrl=img.src;
					img.src=GetConvertImgUrl(pageUrl,imgUrl);
				}
			}
		}
	}
	function GetImages(form1,textLength)
	{
		var pageUrl="http://vipreader.qidian.com"+form1.getAttribute("action");
		var imgArr=[];
		for	(var i = 0;i<Math.ceil(textLength/2400);i++)
		{
			var img=document.createElement("img");
			var imgUrl=GetImgUrl(form1)+i.toString();
			img.src=GetConvertImgUrl(pageUrl,imgUrl);
			imgArr.push(img);
		}
		return imgArr;
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
		return "http://vip.qidian.com/BookReader/ChapterImage.aspx?bookId="+GetBookId()+"&chapterId="+GetChapterId(form1)+"&page=";
	}
	function GetConvertImgUrl(pageUrl,imgUrl)
	{
		return "http://localhost/Mine/MyWeb/QiDian/VipPictureConverter.ashx?PageUrl="+encodeURIComponent(pageUrl)+"&ImageUrl="+encodeURIComponent(imgUrl)+"&Cookie="+encodeURIComponent(document.cookie);
	}
}
SetNextPageHref();
DisplayChapterName();
document.getElementById('reader_zancb').style.display='none';
window.addEventListener("load",function(){
	window.ChangeTextToPicture();
	setInterval(window.ChangeTextToPicture,500);
});