﻿// ==UserScript==
// @name        自动跳转到NGA.CC
// @namespace   all
// @include     http://nga.178.com/*
// @version     1
// ==/UserScript==


var href=location.href;
var newHref=href.replace("nga.178.com","bbs.ngacn.cc");
window.location.href=newHref;