// ==UserScript==
// @name        隐藏过长的书架
// @namespace   qidian
// @include     http://me.qidian.com/bookShelf/bookCase.aspx*
// @version     1
// ==/UserScript==
var books=[];
window.showOrHideBooks=function()
{
	var btn=document.getElementById("btnShowAll");
	var table=document.getElementsByClassName("bookcaseTable")[0];
	var trs=table.getElementsByTagName("tr");
	var style="none";
	if(btn.value=="展开全部书架")
	{
		style="";
		btn.value="收起多余书架";
	}
	else
	{
		btn.value="展开全部书架";		
	}
	for(var i=50;i<trs.length;i++)
	{
		if(trs[i].id.indexOf("tr_book_")!=-1)
		{
			trs[i].style.display=style;
		}
	}
	
};
function removeElement(_element){
	var _parentElement = _element.parentNode;
	if(_parentElement){
		_parentElement.removeChild(_element);
	}
}
function HideTooLongList()
{
	var table=document.getElementsByClassName("bookcaseTable")[0];
	var trs=table.getElementsByTagName("tr");
	if(trs.length>50)
	{
		for(var i=50;i<trs.length;i++)
		{
			if(trs[i].id.indexOf("tr_book_")!=-1)
			{
				books.push(trs[i]);
				//removeElement(trs[i]);
				trs[i].style.display="none";
			}
		}
		var tr=document.createElement("tr");
		tr.innerHTML="<td colspan='8'><input type='button' id='btnShowAll' value='展开全部书架' onclick='window.showOrHideBooks();'/></td>";
		trs[49].parentNode.appendChild(tr);
	}
}
window.addEventListener("load",HideTooLongList);