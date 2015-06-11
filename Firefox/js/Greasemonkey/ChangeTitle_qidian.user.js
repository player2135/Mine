// ==UserScript==
// @name        修改VIP的Title
// @namespace   qidian
// @include     http://vipreader.qidian.com/BookReader/BuyVIPChapterList.aspx*
// @include		http://vipreader.qidian.com/BookReaderNew/vip,*.aspx
// @version     1
// ==/UserScript==

if (location.href.indexOf("http://vipreader.qidian.com/BookReader/BuyVIPChapterList.aspx") != -1) {
	document.title = "*" + document.title.replace("订阅vip作品", "").replace(" ", "").replace("《", "").replace("》", "") + " 订阅vip作品";
}
if (location.href.indexOf("http://vipreader.qidian.com/BookReaderNew/vip,") != -1) {
	document.title = document.title.replace("小说:", "");
	var unselectCheckBoxes=function(){
	var inputs=document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].type=="checkbox"){
			inputs[i].checked=false;
		}
	}
	}
	setTimeout(unselectCheckBoxes,100);
}
