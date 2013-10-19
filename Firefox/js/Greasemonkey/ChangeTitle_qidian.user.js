// ==UserScript==
// @name        修改VIP订阅的Title
// @namespace   qidian
// @include     http://vipreader.qidian.com/BookReader/BuyVIPChapterList.aspx*
// @version     1
// ==/UserScript==

document.title="*"+document.title.replace("订阅vip作品","").replace(" ","").replace("《","").replace("》","")+" 订阅vip作品";