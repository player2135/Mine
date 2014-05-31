// ================================================================================
// NGA[艾泽拉斯国家地理论坛] 论坛增强插件   控制中心
// 作者：LinTx
// ================================================================================
var nga_plug_control_table_s = [];
var nga_plug_control_version = "2.0";
loader.css("http://ngaplug.googlecode.com/svn/ngaplug/css.css");  //加载CSS
var nga_plug_varietynga_reload = [];  //存储百变NGA，加载后一页时需要执行的函数  用法： nga_plug_varietynga_reload.push("xxxx")   xxxx为需要执行的函数
//全局函数：给一个有ID的元素绑定事件以使点击该元素外的区域隐藏该元素
//注意：需要在弹出菜单的触发链接或者按钮的onclick里面加  event.cancelBubble = true;   这是禁止冒泡的语句，如果该链接或者按钮需要点击后触父元素的某些事件请勿使用该方法
//不加上面的语句会使弹出窗口永远不能显示
function nga_plug_HideDomOfClick(id){
	var DomEl = document.getElementById(id);
	if (navigator.appVersion.indexOf("MSIE") != -1){   //绑定click事件 IE用attachEvent
		DomEl.attachEvent("onclick",function(event){event.cancelBubble = true;});
		document.attachEvent("onclick", function(){DomEl.style.display = "none";});
	}else{   // 非IE用addEventListener
		DomEl.addEventListener("click",function(event){event.cancelBubble = true;},false);
		document.addEventListener("click", function(){DomEl.style.display = "none";}, false);
	}
}
//  全局函数：获取元素相对于页面的绝对坐标
function nga_plug_elementLeft(e){
	try{
		var offset = e.offsetLeft;
		if(e.offsetParent != null) offset += nga_plug_elementLeft(e.offsetParent);
		return offset;
	}catch(e){};
}
function nga_plug_elementTop(e){
	try{
		var offset = e.offsetTop;
		if(e.offsetParent != null) offset += nga_plug_elementTop(e.offsetParent);
		return offset;
	}catch(e){};
}   //获取元素坐标函数结束

//  全局函数：添加一个TAB（例子：本插件生成的回帖输入框【包括上面的“编辑”和“预览”】）
//  使用方法：var x = new nga_plug_tab();    x是你的变量
//            x.add(TAB栏内容[标题],正文栏HTML代码);    如：  x.add("编辑","<div>aaaaaaaaaaaa</div>");
//            add可以多次调用，调用一次即给TAB添加一个选项
//            obj.innerHTML = x.gethtml();      obj是一个页面元素，此行代码表示将这个TAB设置为obj的内容
function nga_plug_tab(){
	this.data = [];
}
nga_plug_tab.prototype.add = function(title,html,isopen){
	if (isopen && this.data.length > 0){
		for (var i=0;i<this.data.length;i++){
			this.data[i][2] = false;
		}
	}
	if (this.data.length == 0) isopen = true;
	this.data.push([title,html,isopen]);
}
nga_plug_tab.prototype.gethtml = function(){
	var s = "";
	s += '<div class="nga_plug_tab" >\
	<div class="nga_plug_tab_menu_box" onload="nga_plug_tab_setTabList(this,\'load\')"> \
		<ul class="nga_plug_tab_menu"> \
			<li class="none" style="width:20px;" onclick="nga_plug_tab_setTabList(this.parentNode,\'l\')"><span><a href="javascript:void(0)"><-</a></span></li>';
	for (var i=0;i<this.data.length;i++){
		s += '<li class="';
		s += this.data[i][2]?'nga_plug_tab_menu_open':'nga_plug_tab_menu_close';
		s += '" onclick="nga_plug_tab_setTab(this,'+ i +')"><span><a href="javascript:void(0)">' + this.data[i][0] + '</a></span></li>';
	}
	s += '	<li class="none" style="width:20px;" onclick="nga_plug_tab_setTabList(this.parentNode,\'r\')"><span><a href="javascript:void(0)">-></a></span></li>\
		</ul>\
		<div class="nga_plug_tab_main">';
	for (var i=0;i<this.data.length;i++){
		s += '<div class="nga_plug_tab_pan"';
		if (this.data[i][2]) s += ' style="display:inline"'
		s += '>' + this.data[i][1] + '</div>';
	}
	s += '</div>\
		</div>\
		<img src="about:blank" style="display:none" onerror="nga_plug_tab_setTabList(this.parentNode,\'load\')">\
		</div>';
		//
	return s;
}    //添加TAB函数结束

//AJAX函数，调用方法：new nga_plug_XMLHttp(url,func,arg)   其中，url应为string类型的变量或者字符串，func应为一个函数名，arg为func的第二个参数，可以传递一些ID之类的东西。
//例子1：new nga_plug_XMLHttp("http://bbs.ngacn.cc/thread.php?fid=-7",bbb);  function bbb(a){}
//例子2：var aaa="http://bbs.ngacn.cc/thread.php?fid=-7"; new nga_plug_XMLHttp(aaa,bbb,{id:1,check:true});  function bbb(a,arg){}
//上述例子中的bbb函数的参数a会接收ajax的返回值
function nga_plug_XMLHttp(url,func,arg){
	if(window.ActiveXObject){
		this.ajax=new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
		this.ajax=new XMLHttpRequest();
	}
	if(this.ajax!=null){
		this.ajax.open("get",url,true);
		this.ajax.onreadystatechange=httpStateChange;
		this.ajax.overrideMimeType("text/html;charset=gbk");
		this.ajax.send(null);
	}
	this.func = func;
	this.arg = arg;
	var this_ = this;
	function httpStateChange(){
		//当指定XMLHttpRequest为异步传输时(false),发生任何状态的变化，该对象都会调用onreadystatechange所指定的函数
		if(this_.ajax.readyState == 4){  //XMLHttpRequest处理状态，4表示处理完毕
			if(this_.ajax.status == 200){ //服务器响应的HTTP代码，200表示正常
				/*
				var win=window.open("about:blank","_blank");
				win.document.write("<textarea style='width:1000px;height:400px;'>"+this_.ajax.responseText+"</textarea>");
				*/
				this_.func(this_.ajax.responseText,this_.arg);
			}
		}
	}
}


//  全局函数：保存、读取设置模块（使用此模块保存的数据存储于本地数据localStorage中）
//  使用方法：var x = nga_plug_local_data("key");    初始化   x是你的变量  key是保存在本地数据中的key（即使用localStorage.key可读取数据的key，不可与其他插件相同）
//            x.save(data)     保存数据data到本地存储中，data可以是任意数据类型（包括但不限于字符串、数值、数组、对象等）
//                             如不带入data参数则直接把x.data保存到本地数据中（可以使用x.data=先修改x.data的数据，然后直接使用x.save()保存）
//            x.load()         读取数据，把数据从本地存储中读取出来
//            x.data           在其他地方调用已经读取出来的数据
//     注意：save方法和load方法后面必须加括号，调用data数据不要加括号
function nga_plug_local_data(dataname){
	this.dataname = dataname;
}
nga_plug_local_data.prototype.save = function(data){
	if (data != null){
		this.data = data;
	}
	localStorage[this.dataname] = JSON.stringify(this.data);
}
nga_plug_local_data.prototype.load = function(){
	for (var key in localStorage){
		if (key==this.dataname){
			try{
				this.data = JSON.parse(localStorage[key]);
			}catch(e){
				this.data = null;
			}
			return true;
		}
	}
	return false;
}    //保存、读取设置模块结束

//  给控制台添加一个项目，调用方法：nga_plug_table_addTab(标题,项目HTML代码)
function nga_plug_table_addTab(title,divhtml){
	var ttable=document.getElementById("nga_plug_control_table");
	if (ttable){
		var ttd0=ttable.rows[1].cells[0];
		var ttd1=ttable.rows[1].cells[1];
		ttd0.getElementsByTagName("div")[0].innerHTML += '<span class="nga_plug_table_left_span" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">'+title+'</span>';
		ttd1.innerHTML += '<div style="display:none" class="nga_plug_table_right_div">'+divhtml+'</div>'
	}else{
		nga_plug_control_table_s.push({title:'<span class="nga_plug_table_left_span" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">'+title+'</span>',html:'<div style="display:none" class="nga_plug_table_right_div">'+divhtml+'</div>'})
	}
}//给控制台添加项目函数结束

//设置导入导出模块，如果你的插件里面保存的本地数据是使用nga_plug_local_data方法保存，则可使用该方法以在插件设置中心中统一导入导出你的插件的设置
//调用：nga_plug_local_data("add","这个设置项的说明","这个设置项的key")   "add"是常量，调用时请勿修改，说明可以随意填写，以后可能有用，key是你使用nga_plug_local_data保存数据时的那个key
function nga_plug_setting(act,title,name){
	var x;
	var s = [];
	var t = document.getElementById("nga_plug_setting_text");
	if (act == "ex"){
		for (var i=0;i<nga_plug_setting_list.length;i++){
			x = new nga_plug_local_data(nga_plug_setting_list[i].dataname);
			x.load();
			s.push({title:nga_plug_setting_list[i].title,dataname:nga_plug_setting_list[i].dataname,data:x.data});
		}
		t.value = JSON.stringify(s);
	}else if(act == "im"){
		t.value = t.value.replace(/\n/g,"");
		try{s = JSON.parse(t.value);}catch(e){alert("数据格式不对！\n错误代码：1");return;}
		if (!s){alert("没有数据！");return}
		if (typeof(s)!="object"){alert("数据格式不对！\n错误代码：2");return}
		for (var i=0;i<s.length;i++){
			if (!s[i].dataname){alert("数据格式不对！\n错误代码：3");return}
		}
		if(!confirm( "确定要覆盖现在的设置吗？")){
			return;
		}
		for (var i=0;i<s.length;i++){
			x = new nga_plug_local_data(s[i].dataname);
			x.save(s[i].data);
		}
		alert("设置导入成功，刷新后应用新设置。");
	}else if(act == "add"){
		if (!name) return;
		if (!title) return;
		nga_plug_setting_list.push({title:title,dataname:name})
	}else if(act == "read"){
		t.value = "";
		for (var i=0;i<nga_plug_setting_list.length;i++){
			t.value += (i+1) + "." + nga_plug_setting_list[i].title + "\n";
		}
		t.value += "\n点击“导出”后会将以上设置项全部导出，如果有插件的设置项没有导出，请联系插件作者添加（指没有导出设置项的插件的作者）"
	}else if(act == "load"){
		if(!/\.txt$/i.test(title.files[0].name)){
			alert("请确保文件为文本文档！");
			return false;
		}
		var reader = new FileReader();
		reader.readAsText(title.files[0]);
		reader.onload = function(e) {
			t.value = reader.result
		}
	}else if(act == "save"){
		nga_plug_setting('ex');
		var BlobBuilder = BlobBuilder || MSBlobBuilder || WebKitBlobBuilder || MozBlobBuilder;
		var URL = URL || webkitURL || window;

		var bb = new BlobBuilder;
		bb.append(t.value);
		var blob = bb.getBlob('text/plain;charset=utf-8');
		
		var objDate = new Date();
		var filename = 'NGA插件设置-' + objDate.getFullYear()+objDate.getMonth()+objDate.getDate()+(objDate.getHours()<10?'0'+objDate.getHours():objDate.getHours())+(objDate.getMinutes()<10?'0'+objDate.getMinutes():objDate.getMinutes())+(objDate.getSeconds()<10?'0'+objDate.getSeconds():objDate.getSeconds()) + '.txt';
		
		var type = blob.type;
		var force_saveable_type = 'application/octet-stream';
		if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
			var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
			blob = slice.call(blob, 0, blob.size, force_saveable_type);
		}

		var url = URL.createObjectURL(blob);
		title.download = filename;
		title.href = url;
	}
}

//添加一个升级提示
//参数：id 是标记插件名的参数，最好加上作者id以防和其他插件冲突，title 是插件名称，用于显示消息的时候的标题，
//text 是消息内容 消息内容中可以使用\n来换行，type 是表示消息类型，可以省略，如果指定"install"则说明这是一个插件安装成功后的提示
//使用该函数时，升级提示应放在安装提示后，这样做可以在插件安装提示未读（即插件刚刚安装成功时）不显示插件升级消息
function nga_plug_addmsg(id,title,text,type){
	var ttitle = title.replace(/</g,"&lt;");
	var ttext = text.replace(/</g,"&lt;");
	ttext = ttext.replace(/\n/g,"<br>");
	var ishave = false;
	if (nga_plug_msg.data.length>0){
		for (var i=0;i<nga_plug_msg.data.length;i++){
			if (nga_plug_msg.data[i].id == id){
				ishave = true;
				var haveins = false;
				var havetext = false;
				for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
					if (nga_plug_msg.data[i].msg[k].type == "install" && nga_plug_msg.data[i].msg[k].read == false){
						haveins = true;
					}
					if (nga_plug_msg.data[i].msg[k].text == ttext) havetext = true;
				}
				if (!havetext) nga_plug_msg.data[i].msg.push({text:ttext,read:haveins,type:type});
			}
		}
	}
	if (!ishave){
		nga_plug_msg.data.push({id:id,title:ttitle,msg:[{text:ttext,read:false,type:type}]});
	}
	nga_plug_msg.save();
}
//---------------------------------------------------以下函数请其他插件开发者不要调用----------------------------------------------------//

//    TAB切换TAB项函数，无需调用
function nga_plug_tab_setTab(obj,n){
	var tdiv=obj.parentNode.parentNode.getElementsByTagName("div");
	var mli = new Array();
	for (var i=0;i<tdiv.length;i++){
		if (tdiv[i].className == "nga_plug_tab_pan") mli.push(tdiv[i]);
	}
	var tli=obj.parentNode.getElementsByTagName("li");
	for (var i=0;i<mli.length;i++){
		tli[i+1].className=i==n?"nga_plug_tab_menu_open":"nga_plug_tab_menu_close";
		mli[i].style.display=i==n?"inline":"none";
	}
}

//   TAB左右移动TAB项函数，无需调用
function nga_plug_tab_setTabList(obj,act){
	var tel = [];
	if (act == "load"){
		if (!obj) return;
		var tobj = obj.getElementsByTagName("ul");
		var tli,tdiv;
		for (var i=0;i<tobj.length;i++){
			if (tobj[i].className == "nga_plug_tab_menu") tli = tobj[i].getElementsByTagName("li");
		}
		tobj = obj.getElementsByTagName("div");
		for (var i=0;i<tobj.length;i++){
			if (tobj[i].className == "nga_plug_tab_main") tdiv = tobj[i];
		}
		c(tdiv,"x");
		if ((tli.length-2)*75+45 > tdiv.offsetWidth){
			for (var i=1;i<tli.length-1;i++){
				if (i*75+45 > tdiv.offsetWidth) tli[i].style.display = "none";
			}
			tli[0].style.visibility = "hidden";
		}else{
			tli[0].style.visibility = "hidden";
			tli[tli.length-1].style.visibility = "hidden";
		}
		for (var i=1;i<tli.length-1;i++){
			if (tli[i].className == "hover" && tli[i].style.display == "none"){
				while(tli[i].style.display == "none"){
					nga_plug_tab_setTabList(obj.parentNode,"r");
				}
			}
		}
		c(tdiv,"y");
	}else if(act == "l"){
		var tli = obj.getElementsByTagName("li");
		if (tli[1].style.display == "inline" || tli[1].style.display == "") return;
		for (var i=1;i<tli.length-1;i++){
			if (tli[i].style.display == "inline" || tli[i].style.display == ""){
				tli[i-1].style.display = "inline";
				for (var k=i;k<tli.length-1;k++){
					if (tli[k].style.display == "none"){
						tli[k-1].style.display = "none";
						if (tli[k-1].className == "hover") nga_plug_tab_setTab(tli[k-1],k-3);
						
						if (tli[1].style.display != "none") tli[0].style.visibility = "hidden";
						tli[tli.length-1].style.visibility = "visible";
						return;
					}
				}
				tli[tli.length-2].style.display = "none";
				if (tli[tli.length-2].className == "hover") nga_plug_tab_setTab(tli[tli.length-2],tli.length-4);
				
				if (tli[1].style.display != "none") tli[0].style.visibility = "hidden";
				tli[tli.length-1].style.visibility = "visible";
				return;
			}
		}
		
	}else if(act == "r"){
		var tli = obj.getElementsByTagName("li");
		if (tli[tli.length-2].style.display == "inline" || tli[tli.length-2].style.display == "") return;
		for (var i=tli.length-2;i>0;i--){
			if (tli[i].style.display == "inline" || tli[i].style.display == ""){
				tli[i+1].style.display = "inline";
				for (var k=i;k>0;k--){
					if (tli[k].style.display == "none"){
						tli[k+1].style.display = "none";
						if (tli[k+1].className == "hover") nga_plug_tab_setTab(tli[k+1],k+1);
						
						tli[0].style.visibility = "visible";
						if (tli[tli.length-2].style.display != "none") tli[tli.length-1].style.visibility = "hidden";
						return;
					}
				}
				tli[1].style.display = "none";
				if (tli[1].className == "hover") nga_plug_tab_setTab(tli[1],1);
				
				tli[0].style.visibility = "visible";
				if (tli[tli.length-2].style.display != "none") tli[tli.length-1].style.visibility = "hidden";
				return;
			}
		}
	}
	
	function c(obj,act){
		if (act == "x"){
			try{
				if (obj.style.display=="none"){
					tel.push(obj);
					obj.style.display="block";
				}
			}catch(e){}
			//try{c(obj.parentNode,"x");}catch(e){}
			//console.log(obj)
			if (obj.parentNode) c(obj.parentNode,"x");
		}else{
			for (var i=0;i<tel.length;i++){
				tel[i].style.display = "none";
			}
		}
	}
}

//控制台切换列表函数，无需调用
function nga_plug_table_setTab(obj){
	var tspan=obj.parentNode.getElementsByTagName("span");
	var ttable=document.getElementById("nga_plug_control_table");
	var ttd=ttable.rows[1].cells[1];
	var tdiv1=ttd.getElementsByTagName("div");
	var tdiv=new Array();
	for (var i=0;i<tdiv1.length;i++){
		if (tdiv1[i].className == "nga_plug_table_right_div"){
			tdiv.push(tdiv1[i]);
		}
	}
	for (var i=0;i<tspan.length;i++){
		if (tspan[i] == obj){
			tspan[i].className='nga_plug_table_left_div_span_hover';
			tdiv[i].style.display = "block";
		}else{
			tspan[i].className='nga_plug_table_left_span';
			tdiv[i].style.display = "none";
		}
	}
}

//创建设置中心面板
function nga_plug_control_create(msg){
	if (document.getElementById('nga_plug_control')){
		document.getElementById('nga_plug_control').style.display = document.getElementById('nga_plug_control').style.display == "block" ? "none":"block";
	}else{
		var tmpdiv = document.createElement("div");
		tmpdiv.id = "nga_plug_control";
		tmpdiv.className = "nga_plug_table";
		var t_html = 	'<table style="width:800px;" cellspacing="0px" id="nga_plug_control_table">\
				<tr>\
					<td colspan="2" class="nga_plug_table_top">\
					NGA插件设置中心<div class="right"><a href="javascript:void(0)" onclick="nga_plug_control_create()">关闭</a>&nbsp;</div>\
					</td>\
				</tr>\
				<tr>\
					<td class="nga_plug_table_left">\
						<div class="nga_plug_table_left_div">\
							<span class="nga_plug_table_left_div_span_hover" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">基本设置</span>';
		for (var i=0;i<nga_plug_control_table_s.length;i++){
			t_html += nga_plug_control_table_s[i].title;
		}
		t_html += '		</div>\
					</td>\
					<td>\
						<div class="nga_plug_table_right_div">';
		var x = new nga_plug_tab();
		x.add("关于",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA插件设置中心<br>作者：LinTx<br>版本：'+nga_plug_control_version+'<br><a class="green" href="http://bbs.ngacn.cc/read.php?tid=5627431" target="_blank">参与讨论</a><br><br><span style="font-size:36px;">本人已经离开NGA，该插件将已停止更新，现有功能不受影响。</span></div>');
		x.add("插件控制","<div class='nga_plug_table_tab_div'>"+nga_plug_control_getplugmanhtml()+"</div>");
		x.add("配置管理",'<div class="nga_plug_table_tab_div">\
			<textarea id="nga_plug_setting_text" style="width: 625px; height: 313px; margin: 0px; "></textarea>\
			<input onclick="nga_plug_setting(\'ex\')" type="button" value="导出">\
			<input onclick="nga_plug_setting(\'im\')" type="button" value="导入">\
			<input onclick="nga_plug_setting(\'read\')" type="button" value="显示会导出的设置项">\
			<span class="right"><a href="" onclick="nga_plug_setting(\'save\',this)">保存至本地</a>  从本地加载：<input type="file" style="width:120px;" onchange="nga_plug_setting(\'load\',this)"></span>\
			<br><span>导出说明：点击“导出”按钮，把文本框中的内容复制并保存到你的电脑里面即可（你可以将你导出的设置分享给其他人使用）。\
			<br>导入说明：把以前导出的内容或者其他人导出的内容输入进上面的文本框，然后点击“导入”按钮即可（导入会覆盖现在的设置，应用新的设置需要刷新页面）。</span>\
			</div>');
		var newmsg = false;
		if (msg == "newmsg") newmsg = true;
		var tt_html = '<div class="nga_plug_table_tab_div">';
		if (!newmsg){
			tt_html += '<span class="green">没有升级提示</span>';
		}else{
			tt_html += '<input type="button" onclick="nga_plug_readmsg()" value="全部标记为已读"><br>'
			for (var i=0;i<nga_plug_msg.data.length;i++){
				for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
					if (!nga_plug_msg.data[i].msg[k].read){
						tt_html += '<span class="green">'+nga_plug_msg.data[i].title+'</span><br><span>'+nga_plug_msg.data[i].msg[k].text+'</span><br><br>'
					}
				}
			}
		}
		tt_html += '</div>'
		x.add("升级提示",tt_html,newmsg);
		t_html += x.gethtml();
		t_html += '		</div>';
		for (var i=0;i<nga_plug_control_table_s.length;i++){
			t_html += nga_plug_control_table_s[i].html;
		}
		t_html += '	</td>\
				</tr>\
			</table>'
		tmpdiv.innerHTML = t_html;
		document.body.appendChild(tmpdiv);
		nga_plug_HideDomOfClick('nga_plug_control');
		document.getElementById('nga_plug_control').style.display = "block";
	}
	function c(p){
		if (p) return "checked"; else return "";
	}
}

//标记升级提示为已读
function nga_plug_readmsg(){
	for (var i=0;i<nga_plug_msg.data.length;i++){
		for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
			nga_plug_msg.data[i].msg[k].read = true;
			nga_plug_msg.save();
		}
	}
	alert("所有消息已经标记为已读。");
}

//本插件的加载JS函数，和NGA本身相同功能的函数的callback处理模式不同以可以在callback中传递参数
function nga_plug_loaderScript(src,callback,charset){
	var x = document.createElement('script');
	var h = document.getElementsByTagName('head')[0]
	if(charset)x.charset = charset
	x.src=src
	h.insertBefore(x,h.firstChild)
	if (callback) {
		if(x.readyState){
			x.onreadystatechange = function() {
				if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
				try{eval(callback)}catch(e){};
			}
		}else{
			x.onload = function() {try{eval(callback)}catch(e){}}
		}
	}
}

//插件控制台-添加插件
function nga_plug_control_addplug(plug_form){
	if (plug_form.plugsrc.value == ""){
		alert("插件地址必须填写！");
		return false;
	}
	for (var i=0;i<nga_plug_plugs.length;i++){
		if (plug_form.plugsrc.value == nga_plug_plugs[i].src){
			alert("该插件存在于固定插件列表中，无需再次添加！");
			return false;
		}
	}
	for (var i=0;i<nga_plug_user_plugs.data.length;i++){
		if (plug_form.plugsrc.value == nga_plug_user_plugs.data[i].src){
			alert("该插件存在于你的插件列表中，无需再次添加！");
			return false;
		}
	}
	nga_plug_user_plugs.data.push({title:plug_form.plugtitle.value,src:plug_form.plugsrc.value,charset:plug_form.plugchar.value,check:true});
	nga_plug_user_plugs.save();
	var tf = document.getElementById("nga_plug_control_pluglistman_form");
	tf.innerHTML += '<table class="nga_plug_plugcon"><tr><td>\
			<input name="plugcheck" type="checkbox" checked title="是否启用'+plug_form.plugtitle.value+'">是否启用插件：'+plug_form.plugtitle.value+'\
			<div style="float:right"><input type="button" onclick="nga_plug_control_delplug(this.parentNode.parentNode.parentNode.parentNode)" value="删除"></div></td></tr>\
			<tr><td style="border-top:1px dotted #777;">插件地址：<input type="text" name="plugsrc" size=83 value='+plug_form.plugsrc.value+'><br>\
			插件名称：<input type="text" name="plugtitle" value="'+plug_form.plugtitle.value+'">插件编码：<select name="plugchar">\
			<option value="GBK" '+s(plug_form.plugchar.value,"GBK")+'>GBK</option><option value="UTF-8" '+s(plug_form.plugchar.value,"UTF-8")+'>UTF-8</option></select></td></tr></table>';

	function s(p,s){
		if (p == s) return "selected='selected'"; else return "";
	}
	return false;
}

//插件控制台-删除插件
function nga_plug_control_delplug(table){
	if (table.tagName.toLowerCase() == "tbody") table = table.parentNode;
	var plug_form = table.parentNode;
	var tables = plug_form.getElementsByTagName("table");
	var tableid = -1;
	for (var i=0;i<tables.length;i++){
		if (tables[i] == table){
			tableid = i - nga_plug_plugs.length;
		}
	}
	if(!confirm( "你要删除“"+nga_plug_user_plugs.data[tableid].title+"”吗？")){
		return;
	}
	nga_plug_user_plugs.data.splice(tableid,1);
	nga_plug_user_plugs.save();
	plug_form.removeChild(table);
}

//插件控制台-保存插件设置
function nga_plug_control_pluglistman(plug_form){
	try{
		for (var i=0;i<plug_form.plugtitle.length;i++){
			for (var k=i+1;k<plug_form.plugtitle.length;k++){
				if (plug_form.plugsrc[i].value == plug_form.plugsrc[k].value){
					alert("保存失败！\n原因：插件列表有重复的插件地址。\n请检查后再保存。");
					return false;
				}
			}
		}
	}catch(e){}
	try{
		for (var i=0;i<nga_plug_plugs.length;i++){
			if(plug_form.plugtitle.length){
				for (var k=0;k<plug_form.plugtitle.length;k++){
					if (nga_plug_plugs[i].src == plug_form.plugsrc[k].value){
						alert("保存失败！\n原因：插件列表有插件和固定插件列表中的插件重复。\n重复插件名称："+nga_plug_plugs[i].title+"，\n重复插件地址："+nga_plug_plugs[i].src+"。\n请检查后再保存。");
						return false;
					}
				}
			}else{
				if (nga_plug_plugs[i].src == plug_form.plugsrc.value){
					alert("保存失败！\n原因：插件列表有插件和固定插件列表中的插件重复。\n重复插件名称："+nga_plug_plugs[i].title+"，\n重复插件地址："+nga_plug_plugs[i].src+"。\n请检查后再保存。");
					return false;
				}
			}
		}
	}catch(e){}
	nga_plug_plugs_check.data = [];   //保存固定插件列表的开启状态
	if (nga_plug_plugs.length == 1){
		nga_plug_plugs[0].check = plug_form.fixedcheck.checked;
		nga_plug_plugs_check.data.push({id:nga_plug_plugs[0].id,check:nga_plug_plugs[0].check});
	}else{
		for (var i=0;i<nga_plug_plugs.length;i++){
			nga_plug_plugs[i].check = plug_form.fixedcheck[i].checked;
			nga_plug_plugs_check.data.push({id:nga_plug_plugs[i].id,check:nga_plug_plugs[i].check});
		}
	}
	nga_plug_plugs_check.save();
	
	nga_plug_user_plugs.data = [];    //保存自定义插件的配置
	if(plug_form.plugtitle.length){
		for (var i=0;i<plug_form.plugtitle.length;i++){
			nga_plug_user_plugs.data.push({title:plug_form.plugtitle[i].value,src:plug_form.plugsrc[i].value,charset:plug_form.plugchar[i].value,check:plug_form.plugcheck[i].checked});
		}
	}else{
		nga_plug_user_plugs.data.push({title:plug_form.plugtitle.value,src:plug_form.plugsrc.value,charset:plug_form.plugchar.value,check:plug_form.plugcheck.checked});
	}
	nga_plug_user_plugs.save();
	alert("保存成功！");
	return false;
}

//插件控制台-生成设置页
function nga_plug_control_getplugmanhtml(){
	var th = "";
	th += '<div><span class="green">添加一个插件到你的插件列表</span></div><form style="border:1px solid #777;text-align:left;width:607px;" onsubmit="return nga_plug_control_addplug(this)">\
		插件地址：<input type="text" name="plugsrc" size=85><br>插件名称：<input type="text" name="plugtitle">插件编码：<select name="plugchar">\
		<option value="GBK" selected="selected">GBK</option><option value="UTF-8">UTF-8</option></select><div style="float:right"><input type="submit" value="确定添加"></div></form>\
		<br><form style="width:607px;" id="nga_plug_control_pluglistman_form" onsubmit="return nga_plug_control_pluglistman(this)">\
		<div style="float:right;margin-top:24px;"><input type="submit" value="保存设置"></div>\
		<div style="margin-top:20px;padding-top:28px;border-top:4px double #777;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">修改已有插件设置</span></div>';
	for (var i=0;i<nga_plug_plugs.length;i++){
		th += '<table class="nga_plug_plugcon"><tr><td><input name="fixedcheck" type="checkbox" '+c(nga_plug_plugs[i])+' title=\
		"是否启用'+nga_plug_plugs[i].title+'">是否启用插件：'+nga_plug_plugs[i].title+'</td></tr></table>';
	}
	for (var i=0;i<nga_plug_user_plugs.data.length;i++){
		th += '<table class="nga_plug_plugcon"><tr><td>\
			<input name="plugcheck" type="checkbox" '+c(nga_plug_user_plugs.data[i])+' title="是否启用'+nga_plug_user_plugs.data[i].title+'">是否启用插件：'+nga_plug_user_plugs.data[i].title+'\
			<div style="float:right"><input type="button" onclick="nga_plug_control_delplug(this.parentNode.parentNode.parentNode.parentNode)" value="删除"></div></td></tr>\
			<tr><td style="border-top:1px dotted #777;">插件地址：<input type="text" name="plugsrc" size=83 value='+nga_plug_user_plugs.data[i].src+'><br>\
			插件名称：<input type="text" name="plugtitle" value="'+nga_plug_user_plugs.data[i].title+'">插件编码：<select name="plugchar">\
			<option value="GBK" '+s(nga_plug_user_plugs.data[i],"GBK")+'>GBK</option><option value="UTF-8" '+s(nga_plug_user_plugs.data[i],"UTF-8")+'>UTF-8</option></select></td></tr></table>';
	}
	th += '</form>';
	return th;
	
	function c(p){
		if (p.check) return "checked"; else return "";
	}
	function s(p,s){
		if (p.charset == s) return "selected='selected'"; else return "";
	}
}

//内置固定插件列表   ID必须唯一
var nga_plug_plugs = [
{
	id:"nga_edit",
	title:'UBB编辑器',
	src:"https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_editor.js",//"http://ngaplug.googlecode.com/svn/ngaplug/editor/editor.js",
	testsrc:"http://ngaplug.googlecode.com/svn/ngaplug/editor/editor.test.js",
	charset:"UTF-8",
	check:true
},/*{
	id:"Blacklist",
	title:"黑名单插件",
	src:"http://ngaplug.googlecode.com/svn/ngaplug/Blacklist.js",
	testsrc:"http://ngaplug.googlecode.com/svn/ngaplug/Blacklist.test.js",
	charset:"UTF-8",
	check:false
},*/{
	id:"ngacn_ui_mojo",
	title:"表情-虚空之魂",
	src:"https://raw.github.com/player2135/Mine/Firefox/Firefox/js/ngacn_ui_mojo.js",
	charset:"UTF-8",
	check:true
},{
	id:"mojo_for_lintx",
	title:"表情-LinTx",
	src:"https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_mojo_for_lintx.js",
	charset:"UTF-8",
	check:true
},/*{
	id:"othertools",
	title:"小工具集合",
	src:"http://ngaplug.googlecode.com/svn/ngaplug/othertools.js",
	testsrc:"http://ngaplug.googlecode.com/svn/ngaplug/othertools.test.js",
	charset:"UTF-8",
	check:false
}*/,{
	id:"varietynga",
	title:"百变NGA",
	src:"https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_varietynga.js",
	testsrc:"http://ngaplug.googlecode.com/svn/ngaplug/varietynga.test.js",
	charset:"UTF-8",
	check:true
}
];
var nga_plug_mojo = [];
var nga_plug_setting_list = [];
var nga_plug_user_plugs = new nga_plug_local_data("nga_plug_user_plugs");  //自定义插件设置
var nga_plug_plugs_check = new nga_plug_local_data("nga_plug_plugs");      //固定插件开启状态
var nga_plug_settings = new nga_plug_local_data("nga_plug_setting");
var nga_plug_msg = new nga_plug_local_data("nga_plug_msg");

function nga_plug_control_Initialization(){
	var istest = false;
	nga_plug_settings.load();
	nga_plug_settings.data = nga_plug_settings.data || {set:{updata:true}};
	nga_plug_msg.load();
	nga_plug_msg.data = nga_plug_msg.data || [];
	
	//创建打开本插件设置的链接
	var nga_plug_control_t_link = document.getElementById("mainmenu").getElementsByTagName("a");
	var nga_plug_control_link = document.createElement("a");
	nga_plug_control_link.href="javascript:void(0)";
	var newmsg = false;
	if (nga_plug_msg.data.length > 0){
		for (var i=0;i<nga_plug_msg.data.length;i++){
			for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
				if (!nga_plug_msg.data[i].msg[k].read){
					nga_plug_control_link.style.color= "sandyBrown";
					nga_plug_control_link.title="有插件升级了，点击查看升级内容。"
					newmsg = true;
				}
			}
		}
	}
	if (newmsg){
		nga_plug_control_link.onclick=function(event){event.cancelBubble = true;nga_plug_control_create("newmsg");};
	}else{
		nga_plug_control_link.onclick=function(event){event.cancelBubble = true;nga_plug_control_create();};
	}
	nga_plug_control_link.className="rep gray txtbtnx b";
	nga_plug_control_link.innerHTML="插件";
	try{var nga_plug_td=document.createElement("td");nga_plug_td.appendChild(nga_plug_control_link);nga_plug_control_t_link[2].parentNode.parentNode.appendChild(nga_plug_td);}catch(e){};
	
	nga_plug_addmsg("nga_plug","NGA 插件设置中心","恭喜！\n插件安装成功，更多功能请点击上方的“关于”，然后点击下面的“参与讨论”链接。","install");
	nga_plug_addmsg("nga_plug","NGA 插件设置中心","本人已经离开NGA，该插件将已停止更新，现有功能不受影响。");
	
	//获取UBB编辑器插件是否测试
	var js = document.getElementsByTagName("script");
	for (var i = 0; i < js.length; i++) {
		if (js[i].src.indexOf("svn/ngaplug/command.test.js") >= 0){
			try{
				for (var i=0;i<nga_plug_plugs.length;i++){
					if (nga_plug_plugs[i].testsrc != null) nga_plug_plugs[i].src = nga_plug_plugs[i].testsrc;
				}
			}catch(e){}
		}
	}
	
	//获取插件是否启用
	nga_plug_user_plugs.load();    //从本地存储中加载自定义插件配置
	nga_plug_user_plugs.data = nga_plug_user_plugs.data || [];
	nga_plug_plugs_check.load();   //从本地存储中加载固定插件是否开启
	for (var i=0;i<nga_plug_plugs.length;i++){   //把获取到的固定插件开启状态应用到固定插件列表中
		if(nga_plug_plugs_check.data){
			for (var k=0;k<nga_plug_plugs_check.data.length;k++){
				if (nga_plug_plugs[i].id == nga_plug_plugs_check.data[k].id) nga_plug_plugs[i].check = nga_plug_plugs_check.data[i].check;
			}
		}
	}
	
	//将自定义插件列表和插件开启状况加入导出数据中
	nga_plug_setting("add","自定义插件列表","nga_plug_user_plugs");
	nga_plug_setting("add","内置插件开启状态","nga_plug_plugs");
	
	//加载固定插件
	for (var i = 0;i<nga_plug_plugs.length;i++){
		if (nga_plug_plugs[i].check){
			nga_plug_loaderScript(nga_plug_plugs[i].src,nga_plug_plugs[i].id+"_Initialization()",nga_plug_plugs[i].charset);
		}
	}
	//加载自定义插件
	for (var i = 0;i<nga_plug_user_plugs.data.length;i++){
		if (nga_plug_user_plugs.data[i].check){
			//nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,"",nga_plug_user_plugs.data[i].charset);
			if (/.+\/(.+)\.js/.test(nga_plug_user_plugs.data[i].src)){
				nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,/.+\/(.+)\.js/.exec(nga_plug_user_plugs.data[i].src)[1]+"_Initialization()",nga_plug_user_plugs.data[i].charset);
			}else{
				nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,"",nga_plug_user_plugs.data[i].charset);
			}
		}
	}
}

var nga_plug_control_isload = nga_plug_control_isload || false;
if (!nga_plug_control_isload){
	nga_plug_control_isload = true;
	nga_plug_control_Initialization();
}