// ==UserScript==
// @name        加载黑科技插件
// @namespace   nga
// @include     http://bbs.ngacn.cc/*
// @include		http://nga.178.com/*
// @version     1
// ==/UserScript==

//loader.script('https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_command.js');
var loadNGAPlugin = function(){
	var head=document.getElementsByTagName("head")[0];
	var script=document.createElement("script");
	script.src="https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_command.js";
	head.appendChild(script);
};
var loadCss=function(url)
{
	var css=document.createElement("link");
	css.href=url;
	css.rel="StyleSheet";
	css.type="text/css";
	css.onload=function(){
		console.log("load:" + url);
	};
	document.getElementsByTagName("head")[0].appendChild(css);
};
loadCss("https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/css/nga/nga_style.css");  //加载CSS
loadCss("https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/css/nga/nga_editor.css"); //加载CSS
loadNGAPlugin();