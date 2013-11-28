// ==UserScript==
// @name        楼主名字加亮
// @namespace   nga
// @include     http://bbs.ngacn.cc/read.php*
// @version     1
// ==/UserScript==
function GetLouZhuName()
{
	var anchor = document.getElementById("postauthor0");
	var louzhuName = "";
	if(anchor)
	{
		louzhuName = anchor.innerHTML;
	}
	return louzhuName;
}
function FindSomebody(name, color, bgColor) {
    function FindAuthor(name, color, bgColor) {
        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].id.indexOf("postauthor") != -1) {
                if (anchors[i].innerHTML == name || anchors[i].innerHTML.indexOf(name + "(") != -1) {
                    anchors[i].style.backgroundColor = bgColor;
                    anchors[i].style.color = color;
                }
            }
        }
    }
    function FindQuoted(name, color, bgColor) {
        var spans = document.getElementsByClassName("postcontent");
        for (var i = 0; i < spans.length; i++) {
            var bs = spans[i].getElementsByTagName("b");
            for (var j = 0; j < bs.length; j++) {
                var content = bs[j].innerHTML;
                if (content.indexOf("Post by " + name) != -1) {
                    bs[j].innerHTML = content.replace(name, "<span style='color:" + color + ";background-color:" + bgColor + ";'>" + name + "</span>");
                }
            }
        }
    }
    FindAuthor(name, color, bgColor);
    FindQuoted(name, color, bgColor);
}

function FindLouzhu() {
    try {
        var anchor = document.getElementById("postauthor0");
        var name = anchor.innerHTML;
        var bgColor = "Black";
        var color = "#00ff00";
        if (name != __CURRENT_UNAME) {
            FindSomebody(name, color, bgColor);
        }
    }
    catch (ERR) {
    }
}
function FindMyself() {
    try {
        FindSomebody(__CURRENT_UNAME, "#ffff00", "#ff0000");
    }
    catch (ERR) {
    }
}
function FindGirls()
{
	var nvhanzi=["cinderella2012","竹小晓","一啊萨姆一","寄语明月","微微笑很倾城","陈_豆豆","明月清锋","银色_荆棘","虞兮","辉夜姬kaguya","圣光赐予我力量吧","无双包包","目立里"];
    var louzhuName = GetLouZhuName();
    for (var i = 0; i < nvhanzi.length; i++) {
        if (nvhanzi[i] != louzhuName) {
            FindSomebody(nvhanzi[i], "pink", "#000000");
        }
    }
}
function FindConcernPersons() {
    var ConcernPersons = ["极坏的猪", "我怎能不变态", "岸本早未", "sephirothii",  "墮落的猴子",  "liqiangzimu"];
	var louzhuName = GetLouZhuName();
    for (var i = 0; i < ConcernPersons.length; i++) {
        if (ConcernPersons[i] != louzhuName) {
            FindSomebody(ConcernPersons[i], "#ff0000", "#000000");
        }
    }
}
function LocationUser()
{
	var username=document.getElementById("txtLocationUsername").value;
	if(username=="")
	{
		return;
	}
	if(window.lastLocationUser==null)
	{
		window.lastLocationUser={};
		window.lastLocationUser.name=username;
		window.lastLocationUser.floorIndex=-1;
	}
	else
	{
		if(window.lastLocationUser.name!=username)
		{
			window.lastLocationUser.name=username;
			window.lastLocationUser.floorIndex=-1;
		}
	}
	var result=FindUser(username,window.lastLocationUser.floorIndex+1);
	if(result.A!=null)
	{
		var rect = result.A.getBoundingClientRect();
		var top = rect.top+scrollY;
		window.scroll(0,top);	
	}
	window.lastLocationUser.floorIndex=result.Index;
	function FindUser(name, startIndex)
	{
		var div = document.getElementById("m_posts_c");
		var divChildren = div.childNodes;
		for	(var i=startIndex;i<div.childNodes.length;i++)
		{
			var index=i;
			var author=document.getElementById("postauthor"+index);
			if(author)
			{
				if(author.innerHTML==name || author.innerHTML.indexOf(name+"(") != -1)
				{
					var anchor=document.getElementById("post1strow"+index);
					return {A:anchor,Index:i};
				}
			}
			var post=document.getElementById("postcontent"+index);
			if(post)
			{
				var bs = post.getElementsByTagName("b");
				for (var j = 0; j < bs.length; j++) {
					var content = bs[j].innerHTML;
					if (content.indexOf("Post by " + name) != -1) {
						var anchor=document.getElementById("post1strow"+index);
						return {A:anchor,Index:i};
					}
				}
			}
		}
		for	(var i=0;i<startIndex;i++)
		{
			var index=i;
			var author=document.getElementById("postauthor"+index);
			if(author)
			{
				if(author.innerHTML==name || author.innerHTML.indexOf(name+"(") != -1)
				{
					var anchor=document.getElementById("post1strow"+index);
					return {A:anchor,Index:i};
				}
			}
			var post=document.getElementById("postcontent"+index);
			if(post)
			{
				var bs = post.getElementsByTagName("b");
				for (var j = 0; j < bs.length; j++) {
					var content = bs[j].innerHTML;
					if (content.indexOf("Post by " + name) != -1) {
						var anchor=document.getElementById("post1strow"+index);
						return {A:anchor,Index:i};
					}
				}
			}
		}
		return {A:null,Index:-1};
	}
}
function AppendTempConcernDiv() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = "function TurnToFloor() {try {var index = parseInt(document.getElementById('txtFloorIndex').value, 10);var tdId = 'post1strow' + index;var td = document.getElementById(tdId);if (td != null && td != undefined) {var table = td.parentNode.parentNode;var top = table.getBoundingClientRect().top;top += scrollY; window.scrollTo(scrollX, top);}}catch (Err) {alert(Err);}}";
    document.getElementsByTagName("head")[0].appendChild(script);
	window.locationUser=LocationUser;
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.right = "0px";
    div.style.bottom = "0px";
    div.style.backgroundColor = "rgb(255,248,229)";
    div.style.border = "solid 1px black";
	div.style.textAlign="left";
    div.innerHTML = "临时关注：<input type='text' id='txtTempConcern'/><br/>转到：<input type='text' id='txtFloorIndex' style='width:40px;'/>楼<input type='button' onclick='TurnToFloor();' value='Go'/><br/>定位：<input type='text' id='txtLocationUsername' /><input type='button' onclick='window.locationUser();' value='Go'/>";
    document.body.appendChild(div);
}
function FindTempConcern() {
    var tempConcern = document.getElementById("txtTempConcern").value;
    if (tempConcern != "") {
        FindSomebody(tempConcern, "Aqua", "#000000");
    }
}
function MarkLouzhu() {
    try {
        var anchor = document.getElementById("postauthor0");
        var div = document.createElement("div");
        div.style.position = "fixed";
        div.style.right = "0px";
        div.style.top = "0px";
        div.style.fontSize = "16px";
        //div.style.maxWidth="150px";
        div.style.backgroundColor = "Black";
        div.style.color = "#00ff00";
        div.style.fontWeight = "bold";
        div.innerHTML = "楼主：" + anchor.innerHTML;
        document.body.appendChild(div);
    }
    catch (ERR) { }
}
FindLouzhu();
MarkLouzhu();
FindMyself();
FindConcernPersons();
FindGirls();
setInterval(FindLouzhu, 5000);
setInterval(FindMyself, 5000);
setInterval(FindConcernPersons, 5000);
setInterval(FindTempConcern, 5000);
setInterval(FindGirls,5000);
AppendTempConcernDiv();