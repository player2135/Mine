var nga_othertools = new nga_plug_local_data("nga_othertools");
var nga_othertools_prevpageurl = "";
var nga_othertools_nextpageurl = "";
var nga_othertools_fistpageurl = "";
var nga_othertools_lastpageurl = "";
function othertools_Initialization(){
	nga_othertools.load();
	nga_othertools.data = nga_othertools.data || {lt:{check:false,title:"艾泽拉斯",bk:{check:true,title:"大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅"}},quickpage:{check:true,ctrl:true},hig0:{check:true}};
	if (nga_othertools.data.hig0 == null) nga_othertools.data.hig0 = {check:true};
	//将百变NGA的设置加入导出数据中
	nga_plug_setting("add","百变NGA设置","nga_othertools");
	
	var x = new nga_plug_tab();
	x.add("关于",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA小工具<br>变更论坛标题作者：莉诺雅羽月、虚空之魂、LinTx<br>快速翻页作者：LinTx<br>版本：1.0</div>');
	x.add("设置",nga_othertools_setthtml());
	var t = x.gethtml();
	nga_plug_table_addTab("小工具设置",t);

	if (nga_othertools.data.lt.bk.check && nga_othertools.data.lt.check){
		if (/(.*?)\s-\s艾泽拉斯国家地理论坛/.test(document.title)){
			var tbk = document.title.match(/(.*?)\s-\s艾泽拉斯国家地理论坛/)[1]
			var tt = nga_othertools.data.lt.bk.title.split("||");
			for (var i=0;i<tt.length;i++){
				if (tt[i].indexOf("|") != -1){
					if (tt[i].split("|")[0]==tbk) document.title = tt[i].split("|")[1] + " - 艾泽拉斯国家地理论坛";
				}
			}
		}
	}
	
	if (nga_othertools.data.hig0.check){
		if (location.pathname == "/thread.php"){
			var ti = document.getElementsByTagName("a");
			for (var i=0;i<ti.length;i++){
				if (ti[i].title=="打开新窗口" && ti[i].className == "replies" && ti[i].innerHTML == "0") ti[i].parentNode.style.backgroundColor = "#998833";
			}
		}
	}
	 
	if (nga_othertools.data.lt.check) document.title = document.title.replace("艾泽拉斯国家地理论坛",nga_othertools.data.lt.title);
	if (nga_othertools.data.quickpage.check){
		document.onkeydown = pageEvent;
		var pagea = document.getElementsByTagName("a");
		for (i=0;i<pagea.length;i++){
			if (pagea[i].title=="上一页") nga_othertools_prevpageurl=pagea[i].href; 
			if (pagea[i].title=="下一页") nga_othertools_nextpageurl=pagea[i].href; 
			if (pagea[i].title=="第一页") nga_othertools_fistpageurl=pagea[i].href; 
			if (pagea[i].title=="最后页") nga_othertools_lastpageurl=pagea[i].href; 
			if (pagea[i].title=="可能有此页"){ nga_othertools_nextpageurl=pagea[i].href; nga_othertools_lastpageurl = pagea[i].href;}
		}
	}
	
	function pageEvent(evt){ 
		evt = evt ||window.event; 
		var key=evt.which||evt.keyCode;
		var evtobj =evt.target||evt.srcElement;
		if(evtobj.tagName.toLowerCase()=="input" || evtobj.tagName.toLowerCase()=="textarea") return;
		if (evt.ctrlKey && nga_othertools.data.quickpage.ctrl){
			if (key == 37 && nga_othertools_fistpageurl != "") location = nga_othertools_fistpageurl;
			if (key == 39 && nga_othertools_lastpageurl != "") location = nga_othertools_lastpageurl;
		}else{
			if (key == 37 && nga_othertools_prevpageurl != "") location = nga_othertools_prevpageurl;
			if (key == 39 && nga_othertools_nextpageurl != "") location = nga_othertools_nextpageurl;
		}
	}
}

function nga_othertools_save(form){
	//{lt:{check:false,title:"艾泽拉斯",bk:{check:true,title:"大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅"}},quickpage:{check:true,ctrl:true}}
	try{
		nga_othertools.data.lt.check = form.lt_check.checked;
		nga_othertools.data.lt.title = form.lt_title.value;
		nga_othertools.data.lt.bk.check = form.lt_bk_check.checked;
		nga_othertools.data.lt.bk.title = form.lt_bk_title.value;
		nga_othertools.data.quickpage.check = form.quick_check.checked;
		nga_othertools.data.quickpage.ctrl = form.quick_ctrl.checked;
		nga_othertools.data.hig0.check = form.hig0_check.checked;
		nga_othertools.save();
	}catch(e){return false;};
	alert("保存成功！");
	return false;
}

function nga_othertools_setthtml(){
var s = "";
	s += '<form style="width:607px;" onsubmit="return nga_othertools_save(this)">\
	<div style="float:right;"><input type="submit" value="保存设置"></div>\
	<div style="padding-top:8px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">小工具设置</span></div>\
	\
	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="lt_check" '+c(nga_othertools.data.lt.check)+' type="checkbox" onclick="document.getElementById(\'nga_othertools_lt_title\').disabled=!this.checked;document.getElementById(\'nga_othertools_lt_bk_check\').disabled=!this.checked;document.getElementById(\'nga_othertools_lt_bk_title\').disabled=!this.checked;" title="是否启用变更论坛标题功能">启用论坛变更标题功能\
	</td></tr>\
	<tr><td style="border-top:1px dotted #777;">替换标题中的“艾泽拉斯国家地理论坛”为：<input id="nga_othertools_lt_title" name="lt_title" '+d(nga_othertools.data.lt.check)+' value="'+nga_othertools.data.lt.title+'">\
	<br><input id="nga_othertools_lt_bk_check" name="lt_bk_check" type="checkbox" '+c(nga_othertools.data.lt.bk.check)+' '+d(nga_othertools.data.lt.check)+'>启用替换板块名，参数：<input id="nga_othertools_lt_bk_title" name="lt_bk_title" '+d(nga_othertools.data.lt.check)+' value="'+nga_othertools.data.lt.bk.title+'"><br><span>替换板块名参数为“原板块名|替换后板块名||原板块名|替换后板块名”，例：“大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅”</span>\
	</td></tr>\
	</tbody></table>\
	\
	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="quick_check" type="checkbox" '+c(nga_othertools.data.quickpage.check)+' onclick="document.getElementById(\'nga_othertools_quick_ctrl\').disabled=!this.checked;" title="是否启用快速翻页功能">启用快速翻页\
	</td></tr>\
	<tr><td style="border-top:1px dotted #777;"><input id="nga_othertools_quick_ctrl" name="quick_ctrl" type="checkbox" '+c(nga_othertools.data.quickpage.ctrl)+' '+d(nga_othertools.data.quickpage.check)+'>启用CTRL模式<br><span>说明：启用快速翻页后按键盘的左右键即可快速到达上一页/下一页，启用CTRL模式后按住CTRL键再按键盘的左右键可快速到达第一页/最后页</span>\
	</td></tr>\
	</tbody></table>\
	\	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="hig0_check" onclick="" type="checkbox" '+c(nga_othertools.data.hig0.check)+' title="是否启用高亮0回复主题功能">启用高亮0回复\
	</td></tr>\
	</tbody></table>\
	\
	</form>';
	
	return s;
	function c(p){
		if (p) return "checked"; else return "";
	}
	function d(p){
		if (!p) return "disabled"; else return "";
	}
}

