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
function FindSomebody(name, color, bgColor, record) {
    function FindAuthor(name, color, bgColor, record) {
        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].id.indexOf("postauthor") != -1) {
                if (anchors[i].innerHTML == name || anchors[i].innerHTML.indexOf(name + "(") != -1) {
                    anchors[i].style.backgroundColor = bgColor;
                    anchors[i].style.color = color;
					if(record!=undefined)
					{
						anchors[i].title=record;
					}
                }
            }
        }
    }
    function FindQuoted(name, color, bgColor, record) {
        var spans = document.getElementsByClassName("postcontent");
        for (var i = 0; i < spans.length; i++) {
            var bs = spans[i].getElementsByTagName("b");
            for (var j = 0; j < bs.length; j++) {
				var html=bs[j].innerHTML;
                var content = bs[j].textContent;
                if (content.indexOf("Post by [" + name + "]") != -1) {
                    bs[j].innerHTML = content.replace(name, "<span style='color:" + color + ";background-color:" + bgColor + ";'>" + name + "</span>");
					if(record!=undefined)
					{
						bs[j].title=record;
					}
                }
            }
        }
    }
    FindAuthor(name, color, bgColor, record);
    FindQuoted(name, color, bgColor, record);
}
var findPersons=function(persons,color,bgColor)
{
	var louzhuName = GetLouZhuName();
	if(persons.length!=0)
	{
		for (var i=0;i<persons.length;i++)
		{
			if(persons[i].id!=louzhuName)
			{
				FindSomebody(persons[i].id, color, bgColor, persons[i].record);
			}
		}
	}
};
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
	var girls=[{id:"cinderella2012",record:"时政狂魔女汉子"},{id:"竹小晓"},{id:"一啊萨姆一"},{id:"寄语明月"},{id:"微微笑很倾城"},
		{id:"陈_豆豆"},{id:"明月清锋",record:"大魔王"},{id:"银色_荆棘"},{id:"虞兮"},{id:"辉夜姬kaguya",record:"时政狂魔女汉子"},
		{id:"圣光赐予我力量吧"},{id:"无双包包"},{id:"目立里"},{id:"mi21",record:"DS5女司机"},{id:"安提·朝露",record:"甲壳虫MM"},
		{id:"朵朵桑",record:"自称女汉子的君威女司机"}];
    findPersons(girls,"pink","#000000");
}
function FindConcernPersons() {
    var concernPersons = [{id:"极坏的猪"}, {id:"我怎能不变态"}, {id:"岸本早未"}, {id:"sephirothii",record:"表弟"},  {id:"墮落的猴子"}, {id:"今井绘理子",record:"岸本小号"},
	{id:"毕游侠",record:"炉石视频"}];
	findPersons(concernPersons,"#ff0000","#000000");
}
function FindKnownPersons() {
	var knownPersons=[{id:"liqiangzimu"},{id:"银色の空",record:"星爷"}];
	findPersons(knownPersons,"#ffff00","#000000");
}
function LocationUser(name)
{
	var username;
	if(name==undefined)
	{
		username=document.getElementById("txtLocationUsername").value;
	}
	else
	{
		username=name;
	}
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
					var content = bs[j].textContent;
					if (content.indexOf("Post by " + name) != -1) {
						var anchor=document.getElementById("post1strow"+index);
						return {A:anchor,Index:i};
					}
				}
			}
		}
		alert("已经搜索到文档末尾，将回到最上层重新搜索");
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
function GetLouzhuName()
{
	try {
        var anchor = document.getElementById("postauthor0");
        var name = anchor.innerHTML;
        return name;
    }
    catch (ERR) {
    }
	return "";
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
    div.innerHTML = "临时关注：<input type='text' id='txtTempConcern'/>转到：<input type='text' id='txtFloorIndex' style='width:40px;'/>楼<input type='button' onclick='TurnToFloor();' value='Go'/><br/>定位：<input type='text' id='txtLocationUsername' /><input type='button' onclick='window.locationUser();' value='Go'/><input type='button' onclick='window.locationUser(\""+__CURRENT_UNAME+"\");' value='Me'/><input type='button' onclick='window.locationUser(\""+GetLouzhuName()+"\");' value='楼主'/>";
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
FindKnownPersons();
FindGirls();
setInterval(FindLouzhu, 5000);
setInterval(FindMyself, 5000);
setInterval(FindConcernPersons, 5000);
setInterval(FindKnownPersons, 5000);
setInterval(FindTempConcern, 5000);
setInterval(FindGirls,5000);
AppendTempConcernDiv();