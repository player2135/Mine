// ==UserScript==
// @name        标记回复楼层
// @namespace   nga
// @include     http://bbs.ngacn.cc/read.php*
// @version     1
// ==/UserScript==

function GetFloorIndex(anchorID) {
    var anchor = document.getElementById(anchorID);
    if (anchor != null) {
        var td = anchor.parentNode;
        var anchors = td.getElementsByTagName("a");
        var floorIndex = parseInt(anchors[1].name.replace("l", ""), 10);
        return floorIndex;
    }
    return -1;
}
function GetAnchorID(href) {
    if (href.indexOf("#") != -1) {
        return href.split("#")[1];
    }
    else {
        return "pid" + href.split("=")[1] + "Anchor";
    }
}
function GetCommentID(href)
{
	return "postauthor_" + href.split("#")[1].replace("pid","").replace("Anchor","");
}
function GetPostContainerLeft(anchor)
{
	var parentNode=anchor.parentNode;
	while(!(parentNode.tag!="td" && parentNode.id.indexOf("postcontainer")!=-1) && parentNode!=null)
	{
		parentNode=parentNode.parentNode;
	}
	if(parentNode!=null)
	{
		return parentNode.offsetLeft;
	}
	return 100;
}
function SetAllReplyA() {
    var spans = document.getElementsByClassName("postcontent");
    for (var i = 0; i < spans.length; i++) {
        var anchors = spans[i].getElementsByTagName("a");
        if (anchors.length != 0) {
            for (var j = 0; j < anchors.length; j++) {
                if (anchors[j].innerHTML.lastIndexOf("Reply") != -1) {
                    var anchorID = GetAnchorID(anchors[j].href);
                    var span = anchors[j].childNodes[0];
                    var floorIndex = GetFloorIndex(anchorID);
                    span.innerHTML = floorIndex + "楼";
                    span.style.fontSize = "16px";
					var anchorRect=anchors[j].getBoundingClientRect();
                    if (floorIndex != -1) {
						anchors[j].href = "#" + anchorID;
						anchors[j].target = "_self";
                        try {
                            var divId = "divQuoteContent" + floorIndex;
                            var maybeDiv = document.getElementById(divId);
                            if (maybeDiv == null || maybeDiv == undefined) {
                                var quoteContent = document.getElementById("postcontent" + floorIndex).innerHTML;
                                var div = document.createElement("div");
                                div.style.position = "absolute";
								div.style.minWidth="10px";
								div.style.minHeight="10px";
								var left=anchorRect.left-50;
								var minLeft=GetPostContainerLeft(anchors[j]);
								if(left<minLeft)
								{
									left=minLeft;
								}
                                div.style.left = (left)+"px";
                                div.style.top = (anchorRect.top+40+scrollY)+"px";
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
							anchors[j].setAttribute("onmouseover", "this.childNodes[0].style.display='inline';document.getElementById('" + divId + "').style.display='';document.getElementById('" + divId + "').style.top=this.getBoundingClientRect().top+scrollY+40+'px';");
							anchors[j].setAttribute("onmouseout", "this.childNodes[0].style.display='none';document.getElementById('" + divId + "').style.display='none';");
                        }
                        catch (err) {
                            //document.getElementById(divId).innerHTML=err;
                            //document.getElementById(divId).style.display="";
                        }
                    }
					else
					{
						try{
							var commentID=GetCommentID(anchors[j].href);
							var comment=document.getElementById(commentID);
							if(comment)
							{
								var spanComment = comment.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
								var commentForPid=spanComment.getAttribute("id").replace("comment_for_","");
								
								anchorID="pid"+commentForPid+"Anchor";
								floorIndex = GetFloorIndex(anchorID);
								span.innerHTML = floorIndex + "楼评论";
								span.style.fontSize = "16px";
								
								anchors[j].href = "#" + commentID;
								anchors[j].target = "_self";
								try {
									var divId = "divQuoteContent" + floorIndex;
									var maybeDiv = document.getElementById(divId);
									if (maybeDiv == null || maybeDiv == undefined) {
										var quoteContent = document.getElementById("postcommentcontainer_" + commentID.replace("postauthor_","")).innerHTML;
										var div = document.createElement("div");
										div.style.position = "absolute";
										div.style.minWidth="10px";
										div.style.minHeight="10px";
										var left=anchorRect.left-50;
										var minLeft=GetPostContainerLeft(anchors[j]);
										if(left<minLeft)
										{
											left=minLeft;
										}
										div.style.left = (left)+"px";
										div.style.top = (anchorRect.top+40+scrollY)+"px";
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
									anchors[j].setAttribute("onmouseover", "this.childNodes[0].style.display='inline';document.getElementById('" + divId + "').style.display='';document.getElementById('" + divId + "').style.top=this.getBoundingClientRect().top+scrollY+40+'px';");
									anchors[j].setAttribute("onmouseout", "this.childNodes[0].style.display='none';document.getElementById('" + divId + "').style.display='none';");
								}
								catch (err) {
									//document.getElementById(divId).innerHTML=err;
									//document.getElementById(divId).style.display="";
								}
							}
						}
						catch(_ERR)
						{
						}
					}
                }
                else if (anchors[j].innerHTML.lastIndexOf("Topic") != -1) {
					anchors[j].href = "#pid0Anchor";
					anchors[j].target = "_self";
                    var span = anchors[j].childNodes[0];
                    span.innerHTML = "主楼";
                    span.style.fontSize = "16px";
					var anchorRect=anchors[j].getBoundingClientRect();
                    try {
                        var divId = "divQuoteContent" + 0;
                        var maybeDiv = document.getElementById(divId);
                        if (maybeDiv == null || maybeDiv == undefined) {
                            var quoteContent = document.getElementById("postcontent" + 0).innerHTML;
                            var div = document.createElement("div");
							div.style.position = "absolute";
							div.style.minWidth="10px";
							div.style.minHeight="10px";
							var left=anchorRect.left-50;
							var minLeft=GetPostContainerLeft(anchors[j]);
							if(left<minLeft)
							{
								left=minLeft;
							}
							div.style.left = (left)+"px";
							div.style.top = (anchorRect.top+20+scrollY)+"px";
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
						anchors[j].setAttribute("onmouseover", "this.childNodes[0].style.display='inline';document.getElementById('" + divId + "').style.display='';document.getElementById('" + divId + "').style.top=this.getBoundingClientRect().top+scrollY+40+'px';");
						anchors[j].setAttribute("onmouseout", "this.childNodes[0].style.display='none';document.getElementById('" + divId + "').style.display='none';");
                    }
                    catch (err) {
                        //document.getElementById(divId).innerHTML=err;
                        //document.getElementById(divId).style.display="";
                    }
                }
            }
        }
    }
}
SetAllReplyA();
setInterval(SetAllReplyA, 5000);