// ==UserScript==
// @name        楼主名字加亮
// @namespace   nga
// @include     http://bbs.ngacn.cc/read.php*
// @include     http://nga.178.com/read.php*
// @include		http://bbs.nga.cn/read.php*
// @version     1
// ==/UserScript==

var highlightSomebody = function () {
	var specialPersons = {
		famous : [{
				id : "极坏的猪",
				record : "插槽帝"
			}, {
				id : "我怎能不变态",
				record : "态君么么哒"
			}, {
				id : "岸本早未"
			}, {
				id : "sephirothii",
				record : "表弟"
			}, {
				id : "墮落的猴子"
			}, {
				id : "今井绘理子",
				record : "岸本小号"
			}, {
				id : "毕游侠",
				record : "炉石视频"
			}, {
				id : "竹井詩織里",
				record : "安总"
			}
		],
		female : [{
				id : "cinderella2012",
				record : "时政狂魔女汉子"
			}, {
				id : "竹小晓"
			}, {
				id : "一啊萨姆一"
			}, {
				id : "寄语明月"
			}, {
				id : "微微笑很倾城"
			}, {
				id : "陈_豆豆"
			}, {
				id : "明月清锋",
				record : "大魔王"
			}, {
				id : "银色_荆棘"
			}, {
				id : "虞兮"
			}, {
				id : "辉夜姬kaguya",
				record : "时政狂魔女汉子"
			}, {
				id : "圣光赐予我力量吧"
			}, {
				id : "无双包包"
			}, {
				id : "目立里"
			}, {
				id : "mi21",
				record : "DS5女司机"
			}, {
				id : "安提·朝露",
				record : "甲壳虫MM"
			}, {
				id : "朵朵桑",
				record : "自称女汉子的君威女司机"
			}, {
				id : "夏小伊",
				record : "起得早画眉毛"
			}
		],
		known : [{
				id : "liqiangzimu"
			}, {
				id : "银色の空",
				record : "星爷"
			}, {
				id : "ty020530",
				record : "野鸡"
			}
		]
	};
	var checkAuthor = function (name, html) {
		return html == name || html.indexOf(name + "(") != -1;
	};
	var checkReply = function (name, content) {
		return content.indexOf("[" + name + "]") != -1 || content.indexOf("Post by " + name) != -1;
	};
	var getLouzhuName = function () {
		var anchor = document.getElementById("postauthor0");
		var louzhuName = "";
		if (anchor) {
			louzhuName = anchor.innerHTML;
		}
		return louzhuName;
	};
	var louzhuName = getLouzhuName();

	var markLouzhu = function () {
		try {
			if (louzhuName != "") {
				var div = document.createElement("div");
				div.style.position = "fixed";
				div.style.right = "0px";
				div.style.top = "0px";
				div.style.fontSize = "16px";
				//div.style.maxWidth="150px";
				div.style.backgroundColor = "Black";
				div.style.color = "#00ff00";
				div.style.fontWeight = "bold";
				div.innerHTML = "楼主：" + louzhuName;
				document.body.appendChild(div);
			}
		} catch (ERR) {}
	};
	var findSomebody = function (name, color, bgColor, record) {
		var findAuthor = function (name, color, bgColor, record) {
			var anchors = document.getElementsByTagName("a");
			for (var i = 0; i < anchors.length; i++) {
				if (anchors[i].id.indexOf("postauthor") != -1) {
					if (checkAuthor(name, anchors[i].innerHTML)) {
						anchors[i].style.backgroundColor = bgColor;
						anchors[i].style.color = color;
						if (record != undefined) {
							anchors[i].title = record;
						}
					}
				}
			}
		}
		var findQuoted = function (name, color, bgColor, record) {
			var spans = document.getElementsByClassName("postcontent");
			for (var i = 0; i < spans.length; i++) {
				var bs = spans[i].getElementsByTagName("b");
				for (var j = 0; j < bs.length; j++) {
					var html = bs[j].innerHTML;
					var anchors = bs[j].getElementsByTagName("a");
					if (anchors.length != 0) {
						for (var k = 0; k < anchors.length; k++) {
							var a = anchors[k];
							if (checkReply(name, a.textContent)) {
								a.innerHTML = a.textContent.replace(name, "<span style='color:" + color + ";background-color:" + bgColor + ";'>" + name + "</span>");
								if (record != undefined) {
									a.title = record;
								}
							}
						}
					} else {
						var content = bs[j].textContent;
						if (checkReply(name, content)) {
							bs[j].innerHTML = content.replace(name, "<span style='color:" + color + ";background-color:" + bgColor + ";'>" + name + "</span>");
							if (record != undefined) {
								bs[j].title = record;
							}
						}
					}
				}
			}
		}
		findAuthor(name, color, bgColor, record);
		findQuoted(name, color, bgColor, record);
	};
	var findPersons = function (persons, color, bgColor) {
		if (persons.length != 0) {
			for (var i = 0; i < persons.length; i++) {
				if (persons[i].id != louzhuName) {
					findSomebody(persons[i].id, color, bgColor, persons[i].record);
				}
			}
		}
	};
	var getRecord = function (name) {
		for (var i = 0; i < specialPersons.famous.length; i++) {
			if (name == specialPersons.famous[i].id) {
				return specialPersons.famous[i].record;
			}
		}
		for (var i = 0; i < specialPersons.female.length; i++) {
			if (name == specialPersons.female[i].id) {
				return specialPersons.female[i].record;
			}
		}
		for (var i = 0; i < specialPersons.known.length; i++) {
			if (name == specialPersons.known[i].id) {
				return specialPersons.known[i].record;
			}
		}
		return "";
	};
	var findLouzhu = function () {
		try {
			var name = louzhuName;
			if (name == "") {
				return;
			}
			var bgColor = "Black";
			var color = "#00ff00";
			var record = getRecord(name);
			if (name != __CURRENT_UNAME) {
				findSomebody(name, color, bgColor, record);
			}
		} catch (ERR) {}
	};
	var findMyself = function () {
		try {
			findSomebody(__CURRENT_UNAME, "#ffff00", "#ff0000");
		} catch (ERR) {}
	};
	var findGirls = function () {
		findPersons(specialPersons.female, "pink", "#000000");
	};
	var findFamous = function () {
		findPersons(specialPersons.famous, "#ff0000", "#000000");
	};
	var findKnown = function () {
		findPersons(specialPersons.known, "#ffff00", "#000000");
	};
	var findTemp = function () {
		var temp = document.getElementById("txtTempConcern").value;
		if (temp != "") {
			findSomebody(temp, "Aqua", "#000000");
		}
	};

	var quoteLinkOpenNew = function () {
		var quotes = document.getElementsByClassName("quote");
		for (var i = 0; i < quotes.length; i++) {
			var bArray = quotes[i].getElementsByTagName("b");
			if (bArray.length != 0) {
				var aArray = bArray[0].getElementsByTagName("a");
				if (aArray.length != 0) {
					for (var j = 0; j < aArray.length; j++) {
						aArray[j].target = "_blank";
					}
				}
			}
		}
	};
	var getPageStartIndex = function () {
		try {
			var postDiv = document.getElementById("m_posts_c");
			var tblFirst = postDiv.getElementsByTagName("table")[1];
			var tr = tblFirst.getElementsByTagName("tr")[0];
			return parseInt(tr.id.replace("post1strow", ""), 10);
		} catch (ERR) {}
		return 0;
	};
	var pageStartIndex = getPageStartIndex();
	var locationUser = function (name) {
		var username;
		if (name == undefined) {
			username = document.getElementById("txtLocationUsername").value;
		} else {
			username = name;
		}
		if (username == "") {
			return;
		}
		if (window.lastLocationUser == null) {
			window.lastLocationUser = {};
			window.lastLocationUser.name = username;
			window.lastLocationUser.floorIndex = -1;
		} else {
			if (window.lastLocationUser.name != username) {
				window.lastLocationUser.name = username;
				window.lastLocationUser.floorIndex = -1;
			}
		}
		var result = FindUser(username, window.lastLocationUser.floorIndex + 1);
		if (result.A != null) {
			var rect = result.A.getBoundingClientRect();
			var top = rect.top + scrollY;
			window.scroll(0, top);
		}
		window.lastLocationUser.floorIndex = result.Index;
		function FindUser(name, startIndex) {
			var div = document.getElementById("m_posts_c");
			var divChildren = div.childNodes;
			for (var i = startIndex; i < div.childNodes.length; i++) {
				var index = i + pageStartIndex;
				var author = document.getElementById("postauthor" + index);
				if (author) {
					if (checkAuthor(name, author.innerHTML)) {
						var anchor = document.getElementById("post1strow" + index);
						return {
							A : anchor,
							Index : i
						};
					}
				}
				var post = document.getElementById("postcontent" + index);
				if (post) {
					var bs = post.getElementsByTagName("b");
					for (var j = 0; j < bs.length; j++) {
						var content = bs[j].textContent;
						if (checkReply(name, content)) {
							var anchor = document.getElementById("post1strow" + index);
							return {
								A : anchor,
								Index : i
							};
						}
					}
				}
			}
			alert("已经搜索到文档末尾，再次点击将回到最上层重新搜索");
			/* for (var i = 0; i < startIndex; i++) {
				var index = i + pageStartIndex;
				var author = document.getElementById("postauthor" + index);
				if (author) {
					if (checkAuthor(name, author.innerHTML)) {
						var anchor = document.getElementById("post1strow" + index);
						return {
							A : anchor,
							Index : i
						};
					}
				}
				var post = document.getElementById("postcontent" + index);
				if (post) {
					var bs = post.getElementsByTagName("b");
					for (var j = 0; j < bs.length; j++) {
						var content = bs[j].innerHTML;
						if (checkReply(name, content)) {
							var anchor = document.getElementById("post1strow" + index);
							return {
								A : anchor,
								Index : i
							};
						}
					}
				}
			} */
			return {
				A : null,
				Index : -1
			};
		}
	};

	var locationSpecial = function () {
		var checkUser = function (name, content, index) {
			if (checkAuthor(name, content)) {
				var anchor = document.getElementById("post1strow" + index);
				return {
					A : anchor,
					Index : index - pageStartIndex
				};
			}
			if (checkReply(name, content)) {
				var anchor = document.getElementById("post1strow" + index);
				return {
					A : anchor,
					Index : index - pageStartIndex
				};
			}
			return {
				A : null,
				Index : -1
			};
		};
		var findSpecialUser = function (startIndex) {
			var div = document.getElementById("m_posts_c");
			var divChildren = div.childNodes;
			for (var i = startIndex; i < div.childNodes.length; i++) {
				var index = i + pageStartIndex;
				var author = document.getElementById("postauthor" + index);
				if (author) {
					var content = author.innerHTML;
					for (var j = 0; j < specialPersons.famous.length; j++) {
						var result = checkUser(specialPersons.famous[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
					for (var j = 0; j < specialPersons.female.length; j++) {
						var result = checkUser(specialPersons.female[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
					for (var j = 0; j < specialPersons.known.length; j++) {
						var result = checkUser(specialPersons.known[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
				}
				var post = document.getElementById("postcontent" + index);
				if (post) {
					var bs = post.getElementsByTagName("b");
					for (var j = 0; j < bs.length; j++) {
						var content = bs[j].textContent;
						for (var k = 0; k < specialPersons.famous.length; k++) {
							var result = checkUser(specialPersons.famous[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
						for (var k = 0; k < specialPersons.female.length; k++) {
							var result = checkUser(specialPersons.female[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
						for (var k = 0; k < specialPersons.known.length; k++) {
							var result = checkUser(specialPersons.known[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
					}
				}
			}
			alert("已经搜索到文档末尾，将回到最上层重新搜索");
			for (var i = 0; i < startIndex; i++) {
				var index = i + pageStartIndex;
				var author = document.getElementById("postauthor" + index);
				if (author) {
					var content = author.innerHTML;
					for (var j = 0; j < specialPersons.famous.length; j++) {
						var result = checkUser(specialPersons.famous[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
					for (var j = 0; j < specialPersons.female.length; j++) {
						var result = checkUser(specialPersons.female[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
					for (var j = 0; j < specialPersons.known.length; j++) {
						var result = checkUser(specialPersons.known[j].id, content, index);
						if (result.A != null) {
							return result;
						}
					}
				}
				var post = document.getElementById("postcontent" + index);
				if (post) {
					var bs = post.getElementsByTagName("b");
					for (var j = 0; j < bs.length; j++) {
						var content = bs[j].innerHTML;
						for (var k = 0; k < specialPersons.famous.length; k++) {
							var result = checkUser(specialPersons.famous[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
						for (var k = 0; k < specialPersons.female.length; k++) {
							var result = checkUser(specialPersons.female[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
						for (var k = 0; k < specialPersons.known.length; k++) {
							var result = checkUser(specialPersons.known[k].id, content, index);
							if (result.A != null) {
								return result;
							}
						}
					}
				}
			}
			return {
				A : null,
				Index : -1
			};
		};
		if (window.locationSpecialUser == null) {
			window.locationSpecialUser = {};
			window.locationSpecialUser.floorIndex = -1;
		}
		var result = findSpecialUser(window.locationSpecialUser.floorIndex + 1);
		if (result.A != null) {
			var rect = result.A.getBoundingClientRect();
			var top = rect.top + scrollY;
			window.scroll(0, top);
		}
		window.locationSpecialUser.floorIndex = result.Index;
	};

	var appendTempConcernDiv = function () {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.innerHTML = "function TurnToFloor() {try {var index = parseInt(document.getElementById('txtFloorIndex').value, 10);var tdId = 'post1strow' + index;var td = document.getElementById(tdId);if (td != null && td != undefined) {var table = td.parentNode.parentNode;var top = table.getBoundingClientRect().top;top += scrollY; window.scrollTo(scrollX, top);}}catch (Err) {alert(Err);}}";
		document.getElementsByTagName("head")[0].appendChild(script);
		window.locationUser = locationUser;
		window.locationSpecial = locationSpecial;
		var div = document.createElement("div");
		div.style.position = "fixed";
		div.style.right = "0px";
		div.style.bottom = "0px";
		div.style.backgroundColor = "rgb(255,248,229)";
		div.style.border = "solid 1px black";
		div.style.textAlign = "left";
		div.innerHTML = "临时关注：<input type='text' id='txtTempConcern'/>转到：<input type='text' id='txtFloorIndex' style='width:40px;'/>楼<input type='button' onclick='TurnToFloor();' value='Go'/><br/>定位：<input type='text' id='txtLocationUsername' /><input type='button' onclick='window.locationUser();' value='Go'/><input type='button' onclick='window.locationUser(\"" + __CURRENT_UNAME + "\");' value='Me'/><input type='button' onclick='window.locationUser(\"" + louzhuName + "\");' value='楼主'/><input type='button' value='找人' onclick='window.locationSpecial();'/>";
		document.body.appendChild(div);
	};
	var lumiaManufacturerNames=[{MN:"RM-984",Version:"830"},{MN:"RM-821",Version:"920"},{MN:"RM-867",Version:"920T"},{MN:"RM-1087",Version:"930"},
	{MN:"RM-887",Version:"720T"},{MN:"RM-876",Version:"1020"},{MN:"RM-1027",Version:"530"},{MN:"RM-822",Version:"920"},{MN:"RM-1010",Version:"638"},
	{MN:"RM-937",Version:"1520"},{MN:"RM-875",Version:"1020"},{MN:"RM-1045",Version:"930"},{MN:"RM-913",Version:"520T"},{MN:"RM-939",Version:"1520"},
	{MN:"RM-996",Version:"1320"},{MN:"RM-910",Version:"925"},{MN:"RM-998",Version:"525"},{MN:"RM-878",Version:"820"},{MN:"RM-825",Version:"820"},
	{MN:"RM-892",Version:"925"},{MN:"RM-860",Version:"928"},{MN:"RM-885",Version:"720"},{MN:"RM-978",Version:"630"},{MN:"RM-955",Version:"925T"},
	{MN:"RM-826",Version:"820"},{MN:"RM-820",Version:"920"},{MN:"RM-974",Version:"635"},{MN:"RM-846",Version:"620"},{MN:"RM-914",Version:"520"},
	{MN:"RM-997",Version:"526"},{MN:"RM-927",Version:"929"},{MN:"RM-893",Version:"925"},{MN:"RM-1090",Version:"535"},{MN:"RM-1019",Version:"530"},];
	var getLumiaVersion=function (manufacturerName)
	{
		for(var i=0;i<lumiaManufacturerNames.length;i++)
		{
			if(manufacturerName.indexOf(lumiaManufacturerNames[i].MN)!=-1){
				return lumiaManufacturerNames[i].Version;
			}
		}
		return "";
	};
	var changeLumiaManufacturerName=function(){
		var clientIcons=document.getElementsByClassName("client_icon");
		for(var i=0;i<clientIcons.length;i++)
		{
			var title=clientIcons[i].getAttribute("title");
			var hasChange=clientIcons[i].getAttribute("hasChange");
			if(title.indexOf("NOKIA")!=-1 && title.indexOf("RM")!=-1 && hasChange!="yes"){
				var manufacturerName=title.split("(")[0].replace("发送自 NOKIA ","");
				var version=getLumiaVersion(manufacturerName);
				if(version!=""){
					clientIcons[i].setAttribute("title", title.replace(manufacturerName,version));
				}
				clientIcons[i].setAttribute("hasChange", "yes");
			}
			else if(title.indexOf("Microsoft")!=-1 && title.indexOf("RM")!=-1 && hasChange!="yes"){
				var manufacturerName=title.split("(")[0].replace("发送自 Microsoft ","");
				var version=getLumiaVersion(manufacturerName);
				if(version!=""){
					clientIcons[i].setAttribute("title", title.replace(manufacturerName,version));
				}
				clientIcons[i].setAttribute("hasChange", "yes");
			}
		}
	};
	findLouzhu();
	markLouzhu();
	findMyself();
	findFamous();
	findKnown();
	findGirls();
	quoteLinkOpenNew();
	changeLumiaManufacturerName();
	setInterval(findLouzhu, 5000);
	setInterval(findMyself, 5000);
	setInterval(findFamous, 5000);
	setInterval(findKnown, 5000);
	setInterval(findTemp, 5000);
	setInterval(findGirls, 5000);
	setInterval(quoteLinkOpenNew, 5000);
	setInterval(changeLumiaManufacturerName,5000);
	appendTempConcernDiv();
};
highlightSomebody();
