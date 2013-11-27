// ==UserScript==
// @name        19楼直接看大图
// @namespace   19lou
// @include     http://www.19lou.com/*
// @version     1
// ==/UserScript==

$(document).ready(function()
{
	$(".unlogin-img img").each(function()
	{
		var src=$(this).attr("src");
		var newSrc=src.replace("thumb_","");
		$(this).attr("src",newSrc);
	});
});