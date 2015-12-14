// ==UserScript==
// @name        加载黑科技插件
// @namespace   nga
// @include     http://bbs.ngacn.cc/*
// @include		http://nga.178.com/*
// @include		http://bbs.nga.cn/*
// @include   	http://club.178.com/*
// @include   	http://bbs.bigccq.cn/*
// @version     1
// ==/UserScript==

//loader.script('https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_command.js');
var loadNGAPlugin = function(){
	var head=document.getElementsByTagName("head")[0];
	var script=document.createElement("script");
	script.src="http://code.taobao.org/svn/myfirefoxsupport/trunk/nga/nga_command.js";
	//script.src="https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_command.js";
	head.appendChild(script);
};
loadNGAPlugin();
