// ==UserScript==
// @name        自动修改VIP书架的书名链接
// @namespace   qidian
// @include     http://me.qidian.com/bookCase/bookCase.aspx?caseId=0
// @version     1
// @grant       none
// ==/UserScript==

function ChangeLink()
{  
  var tbody=document.getElementById("tbBookList");
  var rows=tbody.getElementsByTagName("tr");
  for(var i=0;i<rows.length;i++)
  {
    var row=rows[i];
    var bookId=row.getAttribute("id").split("_")[1];
    var anchor=row.childNodes[2].childNodes[2];
    anchor.setAttribute("href","http://vipreader.qidian.com/BookReader/BuyVIPChapterList.aspx?BookId="+bookId);
  }
}
ChangeLink();