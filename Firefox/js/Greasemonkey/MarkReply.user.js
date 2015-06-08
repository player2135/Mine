// ==UserScript==
// @name        标记回复楼层
// @namespace   nga
// @include     http://bbs.ngacn.cc/read.php*
// @include     http://nga.178.com/read.php*
// @include		http://bbs.nga.cn/read.php*
// @version     1
// ==/UserScript==

var markReply = function () {
	var getFloorIndex = function (anchorID) {
		var anchor = document.getElementById(anchorID);
		if (anchor != null) {
			var td = anchor.parentNode;
			var anchors = td.getElementsByTagName("a");
			var floorIndex = parseInt(anchors[1].name.replace("l", ""), 10);
			return floorIndex;
		}
		return -1;
	};
	var getAnchorID = function (href) {
		if (href.indexOf("#") != -1) {
			return href.split("#")[1];
		} else {
			return "pid" + href.split("=")[1] + "Anchor";
		}
	};
	var getCommentID = function (href) {
		return "postauthor_" + href.split("#")[1].replace("pid", "").replace("Anchor", "");
	};
	var getPostContainerLeft = function (anchor) {
		var parentNode = anchor.parentNode;
		while (!(parentNode.tag != "td" && parentNode.id.indexOf("postcontainer") != -1) && parentNode != null) {
			parentNode = parentNode.parentNode;
		}
		if (parentNode != null) {
			return parentNode.offsetLeft;
		}
		return 100;
	};
	var setAnchorClickEvent = function (anchor, aimAnchorID) {
		anchor.target = "_blank";
		anchor.removeAttribute("onclick");
		var aimAnchor = document.getElementById(aimAnchorID);
		if (aimAnchor != null) {
			var aimAnchorRect = aimAnchor.getBoundingClientRect();
			var top = aimAnchorRect.top + scrollY - 5;
			anchor.setAttribute("onclick", "window.scroll(0," + top + ");return false;");
		}
	};
	var appendReplyDiv = function (floorIndex, anchor, quoteContent) {
		try {
			var anchorRect = anchor.getBoundingClientRect();
			var divId = "divQuoteContent" + floorIndex;
			var maybeDiv = document.getElementById(divId);
			if (maybeDiv == null || maybeDiv == undefined) {
				if (quoteContent == undefined) {
					quoteContent = document.getElementById("postcontent" + floorIndex).innerHTML;
				}
				var div = document.createElement("div");
				div.style.position = "absolute";
				div.style.minWidth = "10px";
				div.style.minHeight = "10px";
				var left = anchorRect.left - 50;
				var minLeft = getPostContainerLeft(anchor);
				if (left < minLeft) {
					left = minLeft;
				}
				div.style.left = (left) + "px";
				div.style.top = (anchorRect.top + 40 + scrollY) + "px";
				div.style.zIndex = 999;
				div.style.backgroundColor = "rgb(254,243,209)";
				//                            div.style.color = "yellow";
				div.style.fontSize = "16px";
				div.style.display = "none";
				div.style.border = "solid 1px black";
				div.style.lineHeight = "25px";
				div.id = divId;
				div.innerHTML = quoteContent;
				document.body.appendChild(div);
			}
			anchor.setAttribute("onmouseover", "this.childNodes[0].style.display='inline';document.getElementById('" + divId + "').style.display='';document.getElementById('" + divId + "').style.top=this.getBoundingClientRect().top+scrollY+40+'px';");
			anchor.setAttribute("onmouseout", "this.childNodes[0].style.display='none';document.getElementById('" + divId + "').style.display='none';");
		} catch (err) {
			//document.getElementById(divId).innerHTML=err;
			//document.getElementById(divId).style.display="";
		}
	};
	var setAllReplyA = function () {
		var postSpans = document.getElementsByClassName("postcontent");
		var tagSpans = document.getElementsByClassName("comment_c_3");
		var spans = new Array();
		for (var i = 0; i < postSpans.length; i++) {
			spans.push(postSpans[i]);
		}
		for (var i = 0; i < tagSpans.length; i++) {
			spans.push(tagSpans[i]);
		}
		console.log(spans.length);
		for (var i = 0; i < spans.length; i++) {
			var anchors = spans[i].getElementsByTagName("a");
			if (anchors.length != 0) {
				for (var j = 0; j < anchors.length; j++) {
					if (anchors[j].innerHTML.lastIndexOf("Reply") != -1) {
						var anchorID = getAnchorID(anchors[j].href);
						var span = anchors[j].childNodes[0];
						var floorIndex = getFloorIndex(anchorID);
						span.innerHTML = floorIndex + "楼";
						span.style.fontSize = "16px";
						var anchorRect = anchors[j].getBoundingClientRect();
						if (floorIndex != -1) {
							setAnchorClickEvent(anchors[j], "postcontainer" + floorIndex);
							appendReplyDiv(floorIndex, anchors[j]);
						} else {
							try {
								var commentID = getCommentID(anchors[j].href);
								var comment = document.getElementById(commentID);
								if (comment) {
									var spanComment = comment.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
									var commentForPid = spanComment.getAttribute("id").replace("comment_for_", "");

									anchorID = "pid" + commentForPid + "Anchor";
									floorIndex = getFloorIndex(anchorID);
									span.innerHTML = floorIndex + "楼评论";
									span.style.fontSize = "16px";

									setAnchorClickEvent(anchors[j], commentID);
									/* anchors[j].href = "#" + commentID;
									anchors[j].target = "_self"; */
									var quoteContent = document.getElementById("postcommentcontainer_" + commentID.replace("postauthor_", "")).innerHTML;
									appendReplyDiv(floorIndex, anchors[j], quoteContent);
								}
							} catch (_ERR) {}
						}
					} else if (anchors[j].innerHTML.lastIndexOf("Topic") != -1) {
						var span = anchors[j].childNodes[0];
						span.innerHTML = "主楼";
						span.style.fontSize = "16px";
						setAnchorClickEvent(anchors[j], "postcontainer0");
						appendReplyDiv(0, anchors[j]);
					}
				}
			}
		}
	};
	setAllReplyA();
	setInterval(setAllReplyA, 5000);
};
markReply();