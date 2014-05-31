var Blacklist_list = new nga_plug_local_data("Blacklist");
var Blacklist_delth = new nga_plug_local_data("Blacklist_delth");
var Blacklist_hbz = new nga_plug_local_data("Blacklist_hbz");
//var Blacklist_other = new nga_plug_local_data("Blacklist_other")
function Blacklist_Initialization(){
	Blacklist_list.load();
	Blacklist_list.data = Blacklist_list.data || [];
	Blacklist_delth.load();
	Blacklist_delth.data = Blacklist_delth.data==false?false:true;
	Blacklist_hbz.load();
	Blacklist_hbz.data = Blacklist_hbz.data || [];
	//Blacklist_other.load();
	//Blacklist_other.data = Blacklist_other.data || {tooltip:{check:true}};
	nga_plug_addmsg("Blacklist","黑名单插件","1.修复由于二哥修改页面结构导致“记一笔”无效的问题。\n2.黑名单功能上线。");
	
	//将黑名单列表和是否开启主题屏蔽加入导出数据中
	nga_plug_setting("add","黑名单列表","Blacklist");
	nga_plug_setting("add","主题屏蔽开关","Blacklist_delth");
	nga_plug_setting("add","小本子","Blacklist_hbz");
	var x = new nga_plug_tab();
	//x.add("综合",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA黑名单插件<br>作者：莉诺雅羽月、天蓝色的冥想、虚空之魂、LinTx<br>版本：1.0<br><br>\
	//	<input type="checkbox" '+c(Blacklist_delth.data)+' onclick="Blacklist_delth.save(this.checked);" title="是否屏蔽黑名单用户发表的主题？">屏蔽主题\
	//	<input type="checkbox" '+c(Blacklist_other.data.tooltip.check)+' onclick="Blacklist_other.data.tooltip.check = this.checked;Blacklist_other.save();" title="是否尝试修改用户名浮动框样式">修改用户名浮动框样式<br></div>');
	//x.add("黑名单",'<div id="Blacklist_listdiv" class="nga_plug_table_tab_div">'+Blacklist_listhtml()+'</div>');
	x.add("综合",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA插件控制中心-黑名单、小本子模块<br>作者：LinTx<br>版本：2.0</div>');
	x.add("黑名单",'<div id="Blacklist_listdiv" class="nga_plug_table_tab_div">'+Blacklist_listhtml()+'</div>');
	var t = x.gethtml();
	nga_plug_table_addTab("黑名单",t);
	
	Backlist_bl() //添加屏蔽链接、移除已屏蔽用户发表的回复、主题
	
	function c(p){
		if (p) return "checked"; else return "";
	}
}

function Backlist_heibenzi(act,uid,id){
	var nga_Backlist_s;
	var uuid = -1;
	for (var i=0;i<Blacklist_hbz.data.length;i++){
		if (Blacklist_hbz.data[i].uid == uid) uuid = i;
	}
	if (act=="add"){
		if (uuid == -1){
			Blacklist_hbz.data.push({uid:uid,body:[]});
			uuid = Blacklist_hbz.data.length-1;
		}
		nga_Backlist_s = prompt("请输入黑历史内容（支持URL代码[url=xxx]证据地址[/url]）：");
		if (nga_Backlist_s == "" || nga_Backlist_s == null)	return "";
		var tid;
		if (Blacklist_hbz.data[uuid].body.length == 0){
			tid = 0;
		}else{
			tid = Blacklist_hbz.data[uuid].body[Blacklist_hbz.data[uuid].body.length-1].id + 1;
		}
		var objDate = new Date(); 
		objDate = objDate.getFullYear()+"-"+(objDate.getMonth()+1)+"-"+objDate.getDate(); 
		Blacklist_hbz.data[uuid].body.push({id:tid,text:nga_Backlist_s,date:objDate});
		alert("添加成功，刷新后显示这条黑历史。");
	}else if(act=="del"){
		for (var i=0;i<Blacklist_hbz.data[uuid].body.length;i++){
			if (Blacklist_hbz.data[uuid].body[i].id == id){
				Blacklist_hbz.data[uuid].body.splice(i,1);
			}
		}
		alert("删除成功，刷新后不显示这条黑历史。");
	}else if(act=="edit"){
		for (var i=0;i<Blacklist_hbz.data[uuid].body.length;i++){
			if (Blacklist_hbz.data[uuid].body[i].id == id){
				nga_Backlist_s = prompt("请编辑黑历史内容（支持URL代码[url=xxx]证据地址[/url]）：",Blacklist_hbz.data[uuid].body[i].text);
				if (nga_Backlist_s == "" || nga_Backlist_s == null)	return "";
				Blacklist_hbz.data[uuid].body[i].text = nga_Backlist_s;
			}
		}
		alert("编辑成功，刷新后显示这条黑历史的新内容。");
	}
	Blacklist_hbz.save();
}

function Backlist_bl(){
	if (location.pathname == "/read.php"){
		var maindiv = document.getElementById("m_posts_c");
		var tabs = [];
		for(var n= maindiv.firstChild; n!=null; n=n.nextSibling){
			if(n.nodeType==1 && n.tagName.toLowerCase()=="table") tabs.push(n);
		}
	
		for (var i = tabs.length-1;i>0;i--){   //本来循环条件应该是i>-1的，但tabs[0]是帖子标题，所以更改循环条件
			var uid = /uid=(\d+)\"/.exec(tabs[i].innerHTML)[1];  //获取UID
			if (tabs[i].innerHTML.indexOf("[记一笔]")<0){
				try{
					var td = tabs[i].getElementsByClassName("stat")[0];
					var ttd = document.createElement("div");
					var ttdhtml = '<div class="ngaplug_heibenzi"><span class="right"><a onclick="Backlist_heibenzi(\'add\','+uid+')" href="javascript:void(0)">[记一笔]</a>\
					<a onclick="Blacklist_Shield(this)" href="javascript:void(0)">[拉黑]</a></span></div>';
					if (Blacklist_hbz.data.length > 0){
						var uuid = -1;
						for (var j=0;j<Blacklist_hbz.data.length;j++){
							if (Blacklist_hbz.data[j].uid == uid) uuid = j;
						}
						if (uuid >= 0){
							if (Blacklist_hbz.data[uuid].body.length > 0){
								for (var j=0;j<Blacklist_hbz.data[uuid].body.length;j++){
									ttdhtml += '<div class="ngaplug_heibenzi"><span class="numericl silver">'+Blacklist_hbz.data[uuid].body[j].date+'</span> <span style="color:#000000">'
									ttdhtml += Blacklist_hbz.data[uuid].body[j].text.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,function($0,$1,$2){return "<a href="+$1+" target=_blank>"+$2+"</a>"});
									ttdhtml += '<div onclick="Backlist_heibenzi(\'edit\','+uid+','+Blacklist_hbz.data[uuid].body[j].id+')" title="编辑"></div><div onclick="Backlist_heibenzi(\'del\','+uid+','+Blacklist_hbz.data[uuid].body[j].id+')" title="删除"></div></span>\
									</div>';
								}
							}
						}
					}
					ttd.innerHTML = ttdhtml;
					td.appendChild(ttd);
				}catch(e){}
			}
			for (k = 0;k<Blacklist_list.data.length;k++){
				if (uid == Blacklist_list.data[k].uid){
					try{tabs[i].parentNode.removeChild(tabs[i]);}catch(e){};
				}
			}

		}
	}else if (location.pathname == "/thread.php"){   //移除已屏蔽用户发表的主题
		if (Blacklist_delth.data){
			var reada = document.getElementsByTagName("a");
			for (i = reada.length - 1; i> -1;i--){
				if (reada[i].title.indexOf("用户ID") != -1){
					for (k=0;k<Blacklist_list.data.length;k++){
						if (/\d+/.exec(reada[i].title) == Blacklist_list.data[k].uid) reada[i].parentNode.parentNode.parentNode.removeChild(reada[i].parentNode.parentNode);
					}
				}
			}
		}
	}
}

function Blacklist_listhtml(){
	var s = '<form style="width:607px;" onsubmit="return Blacklist_listman(this)">\
		<div style="float:right;"><input type="submit" value="删除所选"></div>\
		<div style="padding-top:8px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">黑名单管理</span></div>';
	for (i=0;i<Blacklist_list.data.length;i++){
		s += '<table class="nga_plug_plugcon"><tbody>\
			<tr><td>\
				<input name="users" type="checkbox" title="是否从黑名单列表中移除该用户">删除\
			</td></tr>\
			<tr><td style="border-top:1px dotted #777;">用户：<a href="nuke.php?func=ucp&uid='+Blacklist_list.data[i].uid+'" target="_blank"><b>'+Blacklist_list.data[i].username+'</b></a> <i class="numeric">('+Blacklist_list.data[i].uid+')</i>\
			<br><span>备注：'+Blacklist_list.data[i].rem+'</span></td></tr>\
		</tbody></table>';
	}
	s += '</form>';
	return s;
}

function Blacklist_listman(form){
	if(form.users){
		if(form.users.length){
			for (i=form.users.length-1;i>-1;i--){
				if (form.users[i].checked){
					Blacklist_list.data.splice(i,1);
					Blacklist_list.save();
				}
			}
		}else{
			if (form.users.checked){
				Blacklist_list.data = [];
				Blacklist_list.save();
			}
		}
	}else{
		alert("你没有屏蔽过任何用户！")
		return false;
	}
	alert("删除黑名单用户成功，刷新后可以看到被删除黑名单用户发表的帖子。")
	document.getElementById("Blacklist_listdiv").innerHTML = Blacklist_listhtml();
	return false;
}

//屏蔽链接动作
function Blacklist_Shield(obj){
	var obj=c(obj)
	var uid = /uid=(\d+)\".+?>(.+?)<\/a/.exec(obj.innerHTML)[1];
	var username = /uid=(\d+)\".+?>(.+?)<\/a/.exec(obj.innerHTML)[2];
	if (uid==null){alert("获取用户UID错误，无法屏蔽！");return ;}
	if (username == null){username=="无用户名"}
	for (i=0;i<Blacklist_list.data.length;i++){
		if (uid == Blacklist_list.data[i].uid){
			alert("该用户已经屏蔽过！");
			return;
		}
	}
	var Blacklist_s = prompt("你将屏蔽用户 "+uid+"("+username+")\n请输入你对这次屏蔽的原因或者备注以方便你以后查看，可不输，点击取消可取消屏蔽。");
	if (Blacklist_s == null) return;
	Blacklist_list.data.push({username:username,uid:uid,rem:Blacklist_s});
	Blacklist_list.save();
	obj.parentNode.removeChild(obj);
	document.getElementById("Blacklist_listdiv").innerHTML = Blacklist_listhtml();
	
	function c(obj){
		if (obj.tagName.toLowerCase()=="table"){
			return obj;
		}else{
			return c(obj.parentNode);
		}
	}
}

