// ==UserScript==
// @name        对Window.Open进行控制
// @namespace   all
// @include     http://*
// @version     1
// ==/UserScript==


var oldOpen=window.open;

window.open=function(url)
{
	if(window.confirm('确定要打开：'+url+'？'))
	{
		oldOpen(url,arguments);
	}
}