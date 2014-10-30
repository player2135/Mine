var varietynga_setting = new nga_plug_local_data("varietynga_setting");
var varietynga_lasthtml = "";
var varietynga_customcss = document.createElement('style');
var varietynga_maxpage;
var varietynga_weibo_ajax = {
	s : '',
	f : '',
	k : '',
	t : -1,
	ts : '',
	tf : '',
	lasttime : 0
}

String.prototype.colorHex = function () {
	var that = this;
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			hex = (hex + hex).substr(0, 2);
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if (reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return that;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return that;
	}
};
/*
//腾讯微博风格-onkey事件
varietynga_weibo_ajax.k = function(e){
if(varietynga_weibo_ajax.t && varietynga_weibo_ajax.t!=-1) return;
var e = e || window.event;
var keyCode = e.which ? e.which : e.keyCode;
//alert(keyCode)
if (keyCode == 35){   //取消自动加载
varietynga_weibo_scroll(0);

if(varietynga_weibo_ajax.s!=''){
var oo = commonui.stdBtns()   //加载提示
oo._.__add(
_$('/a').$0(
'href','javascript:void(0)',
'innerHTML','继续加载',
'title','因为你刚刚按下了“END”键，暂时中止了本页面的即时加载功能，如果需要继续使用，请点击这个按钮。',
'className','darkred',
'onclick','eval(varietynga_weibo_ajax.s)'
)
)
var tipdiv = document.getElementById('varietynga_tip_div');
tipdiv.innerHTML = '';
tipdiv.appendChild(oo)
if(oo._.__vml) oo._.__vml()
}
}
}

//腾讯微博风格-timeout事件（末尾页定时加载）
varietynga_weibo_ajax.tf = function(mode){
if(mode==2 && !varietynga_weibo_ajax.t) return;
var tipdiv = document.getElementById('varietynga_tip_div');
varietynga_weibo_ajax.s = '';
var oo = commonui.stdBtns()
if(mode){
oo._.__add(
_$('/a').$0(
'href','javascript:void(0)',
'innerHTML','完毕<img src="https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/progressIndicator16x16.gif" style="height:12px;">',
'title','本帖内容已经显示到最后页,现在每隔6秒将检测一次是否有新回复，你也可以点击这个按钮取消定时检测。',
'className','darkred',
'onclick','varietynga_weibo_ajax.tf(0)'
)
)

//varietynga_weibo_ajax.t = setTimeout(varietynga_weibo_ajax.ts,6000);
varietynga_weibo_ajax.t = setTimeout(function(){
var tid = /tid=(\d+)/.exec(varietynga_weibo_ajax.ts)[1]
__NUKE.doRequest({
u:'/nuke.php?__api=1&__act=get&__lib=get_topic_modify_time&tid='+tid+'&__output=1',
f:function(d){
//alert(d.data[0])
console.log(d);
if(!d || !d.data){
return;}
if (d.data[0] > varietynga_weibo_ajax.lasttime){
varietynga_weibo_ajax.lasttime = d.data[0]
eval(varietynga_weibo_ajax.ts)
}else{
varietynga_weibo_ajax.tf(2)
}
}
})},10000)
}else{
oo._.__add(
_$('/a').$0(
'href','javascript:void(0)',
'innerHTML','定时检测',
'title','本帖内容已经显示到最后页,已经取消定时检测，你也可以点击这个按钮重新开始每6秒检测一次是否有新回复。',
'className','darkred',
'onclick','varietynga_weibo_ajax.tf(1)'
)
)

clearTimeout(varietynga_weibo_ajax.t);
varietynga_weibo_ajax.t = 0;
}
tipdiv.innerHTML = '';
tipdiv.appendChild(oo)
if(oo._.__vml) oo._.__vml()
}

//腾讯微博风格-滚动条事件
varietynga_weibo_ajax.f = function(){
try{
if(varietynga_weibo_ajax.s=='') return;
var top = document.getElementById('post1strow'+varietynga_maxl).getBoundingClientRect().top //元素顶端到可见区域顶端的距离
var se = document.documentElement.clientHeight //浏览器可见区域高度。
if(top <= se){
eval(varietynga_weibo_ajax.s)
varietynga_weibo_ajax.s = ''
}
}catch(e){}
}

//腾讯微博风格-绑定/解绑滚动条事件
function varietynga_weibo_scroll(check,tfunc){
if(check){
varietynga_weibo_ajax.s = tfunc;

var oo = commonui.stdBtns()   //加载提示
oo._.__add(
_$('/a').$0(
'href','javascript:void(0)',
'innerHTML','正在加载<img src="https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/progressIndicator16x16.gif" style="height:12px;">',
'title','正在加载后面的页面，请稍候...',
'className','darkred'
)
)
var tipdiv = document.getElementById('varietynga_tip_div');
tipdiv.innerHTML = '';
tipdiv.appendChild(oo)
if(oo._.__vml) oo._.__vml()

if (navigator.appVersion.indexOf("MSIE") != -1){               //先解除事件
window.detachEvent("onscroll",varietynga_weibo_ajax.f);
}else{   // 非IE用addEventListener
window.removeEventListener("scroll",varietynga_weibo_ajax.f,false);
}

if (navigator.appVersion.indexOf("MSIE") != -1){                //再重新绑定
window.attachEvent("onscroll",varietynga_weibo_ajax.f);
}else{   // 非IE用addEventListener
window.addEventListener("scroll",varietynga_weibo_ajax.f,false);
}
}else{
if (navigator.appVersion.indexOf("MSIE") != -1){
window.detachEvent("onscroll",varietynga_weibo_ajax.f);
}else{   // 非IE用addEventListener
window.removeEventListener("scroll",varietynga_weibo_ajax.f,false);
}
}
}*/
function varietynga_Initialization() {
	nga_plug_addmsg("varietynga", "百变NGA", "修复帖子列表页图片不能显示的BUG。");

	varietynga_setting.load();
	varietynga_setting.data = varietynga_setting.data || {
		set : {
			tieba : true,
			weibo : true,
			img : true
		}
	};

	//将小工具集的设置加入导出数据中
	nga_plug_setting("add", "小工具设置", "varietynga_setting");
	varietynga_setting.data.set.kj = varietynga_setting.data.set.kj == null ? true : varietynga_setting.data.set.kj;
	varietynga_setting.data.set.css = varietynga_setting.data.set.css || {
		colsenav : false,
		colsebg : false,
		colseinfo : false,
		custombg : {
			check : false,
			bg : "CCE8CC",
			custom : "FFFFFF"
		},
		avis : {
			check : false,
			color : "888"
		}
	}
	varietynga_css();

	var e = new nga_plug_tab();
	e.add("总体设置", '<input onclick="varietynga_setting.data.set.tieba=this.checked;varietynga_setting.save();" type="checkbox" ' + c(varietynga_setting.data.set.tieba) + '>启用主题图片预览（贴吧风格）<br>\
						<input onclick="varietynga_setting.data.set.weibo=this.checked;varietynga_setting.save();" type="checkbox" ' + c(varietynga_setting.data.set.weibo) + '>启用帖子即时加载（腾讯微博风格）<br>\
						<input onclick="varietynga_setting.data.set.img=this.checked;varietynga_setting.save();" type="checkbox" ' + c(varietynga_setting.data.set.img) + '>启用图片旋转功能<br>\
						<input onclick="varietynga_setting.data.set.zd=this.checked;varietynga_setting.save();" type="checkbox" ' + c(varietynga_setting.data.set.zd) + '>启用折叠内容可收缩');
	e.add("界面设置", varietynga_setthtml());
	var t = e.gethtml();
	nga_plug_table_addTab("百变NGA", t);

	varietynga_customcss.type = "text/css";
	document.body.appendChild(varietynga_customcss);

	var x = document.createElement('style');
	var h = document.getElementsByTagName('head')[0];
	x.innerHTML = ".varietynga_cur_zin{cursor: url(http://ngaplug.googlecode.com/svn/ngaplug/img/cur_zin.cur) 14 14,pointer;}.varietynga_cur_zout{cursor: url(http://ngaplug.googlecode.com/svn/ngaplug/img/cur_zout.cur) 14 14,pointer;}";
	h.insertBefore(x, h.firstChild);

	if (varietynga_setting.data.set.kj && !ubbcode.collapse.load_ngaplug)
		varietynga_setCollapseButton();
	if (location.pathname != "/thread.php" && location.pathname != "/read.php")
		return;
	if (location.search.indexOf("authorid") >= 0 && location.pathname == "/thread.php")
		return;
	if (varietynga_setting.data.set.img) {
		try {
			varietynga_img()
		} catch (e) {}; //加载图片旋转功能
		nga_plug_varietynga_reload.push("varietynga_img();"); //添加到自动加载的自动运行中以在后几页也能实现图片旋转
	}
	if (location.pathname == "/thread.php") {
		if (varietynga_setting.data.set.tieba) {
			for (var i = 0; i < 35; i++) {
				var ti = document.getElementById("t_tt" + i);
				new nga_plug_XMLHttp(ti.href, varietynga_tieba, "t_tt" + i);
				var x = document.createElement('span');
				x.innerHTML = "<img title='正在获取该主题的图片' src='https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/progressIndicator16x16.gif'>";
				ti.parentNode.appendChild(x);
			}
		}
	} else if (location.pathname == "/read.php") { // && document.URL.indexOf("page=e#a") < 0){
		if (location.search.indexOf("pid=") >= 0)
			return;
		if (varietynga_setting.data.set.weibo) {
			/*try{
			var maxpage = __PAGE[1];
			var nowpage = __PAGE[2];
			}catch(e){
			var maxpage = 1;
			var nowpage = 1;
			}
			var pageurl = "http://" + location.host + location.pathname + location.search.replace("page=e#a","") + "&page=";
			//if (maxpage == nowpage) return;
			if (maxpage == null && location.search.indexOf("authorid") < 0) return;

			if(!document.getElementById('varietynga_tip_div')) getdiv().parentNode.insertBefore(_$('/div').$0('id','varietynga_tip_div'),getdiv());  //创建放置提示信息和按钮的DIV

			var n = document.getElementsByTagName('table');
			for(var i=0;i<n.length;i++){
			if(n[i].rows && n[i].rows[0] && n[i].rows[0].id && /post1strow(\d+)/.exec(n[i].rows[0].id)[1]) varietynga_maxl = /post1strow(\d+)/.exec(n[i].rows[0].id)[1];
			}


			if (navigator.appVersion.indexOf("MSIE") != -1){                //按END键取消自动加载
			document.attachEvent("onkeydown",varietynga_weibo_ajax.k);
			}else{   // 非IE用addEventListener
			window.addEventListener("keydown",varietynga_weibo_ajax.k,false);
			}

			if (maxpage == nowpage){
			//varietynga_weibo_scroll(1,'new nga_plug_XMLHttp("'+pageurl + nowpage+'",varietynga_weibo,{url:"'+pageurl+'",p:'+nowpage+',n:1});')
			varietynga_weibo_ajax.ts = 'new nga_plug_XMLHttp(\''+pageurl + nowpage+'\',varietynga_weibo,{url:\''+pageurl+'\',p:'+nowpage+',n:1})';
			var tid = /tid=(\d+)/.exec(varietynga_weibo_ajax.ts)[1]
			__NUKE.doRequest({
			u:'/nuke.php?__api=1&__act=get&__lib=get_topic_modify_time&tid='+tid+'&__output=1',
			f:function(d){
			if(d){
			varietynga_weibo_ajax.lasttime = d.data[0];
			}
			}
			})
			varietynga_weibo_ajax.tf(2);
			}else{
			varietynga_weibo_scroll(1,'new nga_plug_XMLHttp("'+pageurl + (nowpage + 1)+'",varietynga_weibo,{url:"'+pageurl+'",p:'+(nowpage + 1)+',n:2});')
			}*/
			var maxpage = getMaxPage();
			var nowpage = getNowPage();
			var pageurl = "http://" + location.host + location.pathname + location.search + "&page=";
			if (maxpage == nowpage)
				return;
			if (maxpage == null && location.search.indexOf("authorid") < 0)
				return;
			new nga_plug_XMLHttp(pageurl + (nowpage + 1), varietynga_weibo, {
				url : pageurl,
				p : nowpage + 1,
				n : 2
			});
		}
	}

	function c(p) {
		if (p)
			return "checked";
		else
			return "";
	}
	function getdiv() {
		var td = document.getElementById('m_posts').nextSibling;
		while (td.nodeType != 1) {
			td = td.nextSibling;
		}
		while (td.firstChild == null) {
			td = td.nextSibling;
		}
		td = td.firstChild;
		while (td.nodeType != 1) {
			td = td.nextSibling;
		}
		td = td.firstChild;
		while (td.nodeType != 1 || td.className != 'clear') {
			td = td.nextSibling;
		}
		return td;
	}
}
/*
//腾讯微博风格（即时加载下一页）
function varietynga_weibo(html,arg){
varietynga_weibo_scroll(0)
var tipdiv = document.getElementById('varietynga_tip_div');

try{                                                                                   //获取最大页
eval(/(var __NGAPLUG_PAGE[\s\S]*?)<\/script>/.exec(html.replace('__PAGE','__NGAPLUG_PAGE'))[1]);var maxpage = __NGAPLUG_PAGE[1];
}catch(e){
var maxpage = 1;
};

if (maxpage == arg.p) {                                                                //如果最大页==当前页则load后进入over模式
load(html,arg);
varietynga_weibo_ajax.ts = 'new nga_plug_XMLHttp(\''+arg.url + (arg.p)+'\',varietynga_weibo,{url:\''+arg.url+'\',p:'+(arg.p)+',n:'+(arg.n)+'})';
var tid = /tid=(\d+)/.exec(varietynga_weibo_ajax.ts)[1]
__NUKE.doRequest({
u:'/nuke.php?__api=1&__act=get&__lib=get_topic_modify_time&tid='+tid+'&__output=1',
f:function(d){
if(d){
varietynga_weibo_ajax.lasttime = d.data[0];
}
}
})
varietynga_weibo_ajax.tf(2);
return;
}
if (/<title>提示信息<\/title>/.test(html)) {                                           //如果提示错误也进入over模式
varietynga_weibo_ajax.ts = 'new nga_plug_XMLHttp(\''+arg.url + (arg.p)+'\',varietynga_weibo,{url:\''+arg.url+'\',p:'+(arg.p)+',n:'+(arg.n)+'})';
var tid = /tid=(\d+)/.exec(varietynga_weibo_ajax.ts)[1]
__NUKE.doRequest({
u:'/nuke.php?__api=1&__act=get&__lib=get_topic_modify_time&tid='+tid+'&__output=1',
f:function(d){
if(d){
varietynga_weibo_ajax.lasttime = d.data[0];
}
}
})
varietynga_weibo_ajax.tf(2);
return;
}

varietynga_weibo_ajax.t = -1                                                            //进入非over模式，必须赋值为true，否则varietynga_weibo_ajax.tf会直接return
if (arg.n == 5) {load(html,arg);nload(html,arg);return;}                               //如果加载的页面达到了5页则进入停止加载模式

load(html,arg);                                                                        //如果上面的情况都没有发生，则正常load并给滚动条绑定加载下一页事件
varietynga_weibo_scroll(1,'new nga_plug_XMLHttp("'+arg.url + (arg.p + 1)+'",varietynga_weibo,{url:"'+arg.url+'",p:'+(arg.p+1)+',n:'+(arg.n+1)+'});')

function load(html,arg){                                                               //load方法，将新的回复append到主贴上，并进行必要的JavaScript处理
if (/<body>[\s\S]*?<\/body>/.test(html)){
var tu = document.createElement('div');                                        //建立临时div存放get过来的html的body
tu.innerHTML = /<body>([\s\S]*?)<\/body>/.exec(html)[1]
var x = tu.getElementsByTagName('div');
for(var i=0;i<x.length;i++){
if (x[i].id == "m_posts_c"){
x = x[i];
break;
}
}
if (x.id=='m_posts_c'){
var tmaxl = 0;
var n=x.firstChild
while (n!=null && Number(varietynga_maxl)>=Number(tmaxl)){                 //判断有无新楼层
if(n.tagName && n.tagName.toLowerCase()=="table" && n.rows && n.rows[0] && n.rows[0].id && /post1strow(\d+)/.exec(n.rows[0].id)[1]) tmaxl = /post1strow(\d+)/.exec(n.rows[0].id)[1];
if(Number(varietynga_maxl)>=Number(tmaxl)) n.parentNode.removeChild(n);
n=x.firstChild
}

if(Number(tmaxl)>Number(varietynga_maxl)){
var ts = tu.getElementsByTagName('script');                            //必要的JavaScript脚本处理
for(var i=0;i<ts.length;i++){
if(ts[i].innerHTML){
//console.info(ts[i].innerHTML);
if (/commonui.userInfo.setAll.* /.test(ts[i].innerHTML)){       //处理用户信息
//console.info(/commonui.userInfo.setAll.* /.exec(ts[i].innerHTML)[0]);
try{eval(/commonui.userInfo.setAll.* /.exec(ts[i].innerHTML)[0])}catch(e){};
break;
}
}
}
for(n=x.firstChild; n!=null; n=x.firstChild){                          //将新楼层append到主贴上
if(n.tagName && n.tagName.toLowerCase()=="table" && n.rows && n.rows[0] && n.rows[0].id && /post1strow(\d+)/.exec(n.rows[0].id)[1]) varietynga_maxl = /post1strow(\d+)/.exec(n.rows[0].id)[1];
document.getElementById("m_posts_c").appendChild(n);

if (n.nodeType==1){
ts = n.getElementsByTagName('script');                         //必要的JavaScript脚本处理
for(var i=0;i<ts.length;i++){
if(ts[i].innerHTML){
if(ts[i].innerHTML.indexOf('commonui.loadAlertInfo')>=0){                                                           //处理编辑记录和评分记录
try{eval(ts[i].innerHTML.replace('commonui.loadAlertInfo(','varietynga_loadAlertInfo(ts[i],'))}catch(e){}
}
if(ts[i].innerHTML.indexOf('commonui.postArg.proc')>=0 || ts[i].innerHTML.indexOf('ubbcode.attach.load')>=0){       //格式化样式和附件列表
try{eval(ts[i].innerHTML)}catch(e){}
}
}
}
}
}

for (var i=0;i<nga_plug_varietynga_reload.length;i++){                 //处理需要在load后重新调用的方法
setTimeout('try{'+nga_plug_varietynga_reload[i]+'}catch(e){}',3000);
}
}
}
}
}
function varietynga_loadAlertInfo(obj,info){   //评分记录和编辑记录处理
if(!info)return;
info = info.split(/\t|\n/);
var e = '';
var p = '';
var q = '';
for (var k in info){
if(typeof(info[k])!='string')continue
info[k] = info[k].replace(/^[\t\n ]+/,'');
if (info[k]){
if (info[k].substr(0,4).toLowerCase()=='edit')e+=info[k]+' ';
else p+=info[k].replace(/\[([\d\.]+) ([\d\.]+) ([\d\.]+)\]/,'[$1声望 $2威望 $3G]')+' ';
}
}
var obja = obj.nextSibling;
while (obja.nodeType!=1){
obja=obja.nextSibling;
}
if(e) obj.parentNode.insertBefore(_$('/div').$0('class','silver','innerHTML',e),obja);
if(p) obj.parentNode.insertBefore(_$('/table').$0('class','quote','innerHTML','<tr><td>'+p+'</td></tr>'),obja);
}

function nload(html,arg){                          //停止加载，除非手动按下加载按钮
varietynga_weibo_ajax.s = '';
var oo = commonui.stdBtns()
oo._.__add(
_$('/a').$0(
'href','javascript:void(0)',
'innerHTML','继续加载',
'title','本帖内容已经显示到第'+arg.p+'页,还可以继续加载后面的页面,点击继续加载.',
'className','darkred',
'onclick','new nga_plug_XMLHttp("'+arg.url + (arg.p + 1)+'",varietynga_weibo,{url:"'+arg.url+'",p:'+(arg.p+1)+',n:1})'
)
)

oo._.__add(
_$('/a').$0(
'href',arg.url + (arg.p + 1),
'innerHTML','第'+(arg.p+1)+'页',
'title','直接跳转到第'+(arg.p+1)+'页',
'className','darkred'
)
)
tipdiv.innerHTML = '';
tipdiv.appendChild(oo)
if(oo._.__vml) oo._.__vml()
}
}*/

function getMaxPage() {
	try {
		return __PAGE[1];
	} catch (ERR) {
		return 1;
	}
	var divLeft = document.getElementsByClassName("left");
	if (divLeft.length != 0) {
		var tables = divLeft[0].getElementsByClassName("stdbtn");
		if (tables.length != 0) {
			var tbl = tables[0];
			var anchors = tbl.getElementsByTagName("a");
			for (var i = anchors.length - 1; i >= 0; i--) {
				if (anchors[i].innerHTML.indexOf("末页") != -1) {
					return parseInt(anchors[i].title.replace("最后页 第", "").replace("页", ""));
				}
			}
			for (var i = anchors.length - 1; i >= 0; i--) {
				if (anchors[i].title == "") {
					return parseInt(anchors[i].innerHTML.replace(/&nbsp;/g, ""));
				}
			}
		}
	}
	return 1;
}
function getNowPage() {
	try {
		return __PAGE[2];
	} catch (ERR) {
		return 1;
	}
	var divLeft = document.getElementsByClassName("left");
	if (divLeft.length != 0) {
		var tables = divLeft[0].getElementsByClassName("stdbtn");
		if (tables.length != 0) {
			var tbl = tables[0];
			var anchors = tbl.getElementsByClassName("invert");
			if (anchors.length != 0) {
				return parseInt(anchors[0].innerHTML.replace(/&nbsp;/g, ""));
			}
		}
	}
	return 1;
}
//腾讯微博风格（即时加载下一页）
function varietynga_weibo(html, arg) {
	if (arg.reload) {
		if (Math.abs(varietynga_lasthtml.length - html.length) > 10) {
			var tpd = document.getElementById("m_posts_c");
			var ttab = tpd.getElementsByTagName("table");
			var td = tpd.getElementsByTagName("div");
			var tb = [];
			for (var i = 0; i < ttab.length; i++) {
				if (ttab[i].className == "forumbox postbox")
					tb.push(ttab[i]);
			}
			var td = tpd.getElementsByTagName("div");
			tpd.removeChild(td[td.length - 1]);
			tpd.removeChild(tb[tb.length - 1].parentNode);
		} else {
			setTimeout('new nga_plug_XMLHttp(\'' + arg.url + (arg.p) + '\',varietynga_weibo,{url:\'' + arg.url + '\',p:' + (arg.p) + ',n:1,reload:true})', 10000);
			return;
		}
	}

	// var win=window.open("about:blank","_blank");
	// win.document.write("<textarea style='width:1500px;height:600px;'>"+html+"</textare>");
	if (/<script>var __PAGE = {0:'\/read\.php\?tid=[\d\D]{1,20}',1:(\d+),2:\d+,3:\d+}<\/script>/i.test(html)) {
		var maxpage = /<script>var __PAGE = {0:'\/read\.php\?tid=[\d\D]{1,20}',1:(\d+),2:\d+,3:\d+}<\/script>/i.exec(html)[1];
		if (maxpage == arg.p) {
			load(html, arg);
			over(html, arg);
			return;
		}
	}
	// var maxpage = getMaxPage();
	// if (maxpage == arg.p) {load(html,arg);over(html,arg);return;}
	if (/<title>提示信息<\/title>/.test(html)) {
		over(html, arg);
		return;
	}
	if (arg.n == 5) {
		load(html, arg);
		nload(html, arg);
		return;
	}
	if (arg.obj) {
		arg.obj.parentNode.removeChild(arg.obj);
	}
	load(html, arg);
	new nga_plug_XMLHttp(arg.url + (arg.p + 1), varietynga_weibo, {
		url : arg.url,
		p : arg.p + 1,
		n : arg.n + 1
	});
	function load(html, arg) {
		if (/commonui.userInfo.setAll[\s\S]*?<\/script>/.test(html)) {
			try {
				var initScript = /(commonui.userInfo.setAll[\s\S]*)__AUTO_TRANS_FID=/.exec(html)[1];

				var c = eval(initScript);
			} catch (e) {
				try {
					var initScript = /(commonui.userInfo.setAll[\s\S]*)__SELECTED_FORUM=/.exec(html)[1];
					eval(initScript);
				} catch (er) {
					alert(er);
				}
			}
		}
		if (/<div class='w100' id='m_posts_c'>[\s\S]*?<div class='module_wrap'>/.test(html)) {
			var thtml = /<div class='w100' id='m_posts_c'>[\s\S]*?<div class='module_wrap'>/.exec(html)[0];
			if (/<table[\s\S]+?<\/table>[\s\S]+?(<table[\s\S]+<\/table>)/.test(thtml)) {
				thtml = /<table[\s\S]+?<\/table>[\s\S]+?(<table[\s\S]+<\/table>)/.exec(thtml)[1];
				var x = document.createElement('div');
				x.innerHTML = thtml;
				document.getElementById("m_posts_c").appendChild(x);

			}
		}
		if (/<script>([\s\S]*?)<\/script>/gi.test(html)) { //附件处理
			var t_js = html.match(/<script>([\s\S]*?)<\/script>/gi);
			for (var i = 0; i < t_js.length; i++) {
				var tt_js = /<script>([\s\S]*?)<\/script>/gi.exec(t_js[i])[1];
				if (tt_js.indexOf("commonui.postArg.proc") >= 0 || tt_js.indexOf("ubbcode.attach.load") != -1) {
					try {
						eval(tt_js)
					} catch (e) {
						console.log(e);
					}
				}
			}
		}
		setTimeout('try{Backlist_bl()}catch(e){};', 3000); //调用添加屏蔽链接模块   暂行办法
		setTimeout('try{if (varietynga_setting.data.set.img) varietynga_img();}catch(e){}', 3000) //加载图片旋转功能
	}
	function nload(html, arg) {
		var x = document.createElement('div');
		x.style.borderLeft = "1px solid #A70";
		x.style.borderTop = "1px solid #A70";
		x.style.borderRight = "1px solid #A70";
		x.style.paddingBottom = "10px";
		//x.style.backgroundColor= "#E9D9B5";
		x.innerHTML = '<br/><h3>本帖内容已经显示到第' + arg.p + '页且还有未加载的页面，<a style="color:blue" href="javascript:void(0)" onclick="new nga_plug_XMLHttp(\'' + arg.url + (arg.p + 1) + '\',varietynga_weibo,{url:\'' + arg.url + '\',p:' + (arg.p + 1) + ',n:1,obj:this.parentNode.parentNode});">点击这里尝试继续加载后面5页</a> <a style="color:blue" href="' + arg.url + (arg.p + 1) + '">或者点击这里跳转到第' + (arg.p + 1) + '页</a>。';
		document.getElementById("m_posts_c").appendChild(x);
	}
	function over(html, arg) {
		var x = document.createElement('div');
		x.style.borderLeft = "1px solid #A70";
		x.style.borderTop = "1px solid #A70";
		x.style.borderRight = "1px solid #A70";
		x.style.paddingBottom = "10px";
		//x.style.backgroundColor= "#E9D9B5";
		x.innerHTML = '<br><h3>本帖内容已经显示到第' + arg.p + '页且已经全部加载完毕,现在每隔10秒将检测一次是否有新回复。';
		document.getElementById("m_posts_c").appendChild(x);
		if (html != null) {
			varietynga_lasthtml = html;
			setTimeout('new nga_plug_XMLHttp(\'' + arg.url + (arg.p) + '\',varietynga_weibo,{url:\'' + arg.url + '\',p:' + (arg.p) + ',n:1,reload:true})', 10000);
		}
	}
}

//贴吧风格-使用AJAX获取版面帖子中是否有图片并作相应操作
function varietynga_tieba(html, arg) {
	var elimg = document.getElementById(arg).parentNode.getElementsByTagName("img")[0];
	var poststr = /<p id='postcontent0'.*?>(.*?)(?=<\/p>)/.exec(html)[1];
	var imgreg = /\[img\](.*?)\[\/img\]/gi;
	var postimg = [];
	var ngamojostr = JSON.stringify(nga_plug_mojo).toLowerCase();
	if (imgreg.test(poststr)) {
		var postimgs = poststr.match(imgreg);
		for (var i = 0; i < postimgs.length; i++) {
			if (ngamojostr.indexOf(/\[img\](.*?)\[\/img\]/i.exec(postimgs[i])[1].toLowerCase()) == -1) {
				postimg.push(/\[img\](.*?)\[\/img\]/i.exec(postimgs[i])[1]);
			}
		}

	}
	/*else{
	elimg.parentNode.removeChild(elimg);
	return;
	}*/
	var postattach;
	if (/<span id='postattach0'>.*(\[.*\]).*script>/.test(html)) {
		eval("postattach = " + /<span id='postattach0'>.*(\[.*\]).*script>/.exec(html)[1]);
	}
	if (postattach != null) {
		var imgstr = JSON.stringify(postimg).toLowerCase();
		for (var k in postattach) {
			if (postattach[k].type == "img") {
				postattach[k].url = "./" + postattach[k].url;
				//if (postattach[k].thumb == 1) postattach[k].url += ".thumb.jpg";
				if (imgstr.indexOf(postattach[k].url.toLowerCase()) == -1 && ngamojostr.indexOf(postattach[k].url.toLowerCase()) == -1) {
					postimg.push(postattach[k].url)
				}
			}
		}
	}
	if (postimg.length == 0) {
		elimg.parentNode.removeChild(elimg);
		return;
	} else {
		//elimg.parentNode.removeChild(elimg);
		elimg.src = "https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/yes.png";
		elimg.title = "该帖有图片。";
		for (var i = 0; i < postimg.length; i++) {
			if (postimg[i].substr(0, 1) == ".") {
				var m = postimg[i].match(/^\.\/mon_(\d+)\/(\d+)/)
					var b = (window.__BBSURL == 'http://bbs.ngacn.cc') ? true : false
					var r = "";
				if (m) {
					if (parseInt(m[1].toString() + m[2].toString(), 10) >= 20130104) {
						if (b)
							r = 'http://img6.ngacn.cc/attachments/';
						else
							r = 'http://img6.nga.178.com/attachments/';
					} else {
						if (b)
							r = 'http://img.ngacn.cc/attachments/';
						else
							r = 'http://ngaimg.178.com/attachments/';
					}
				}
				postimg[i] = r + postimg[i].substr(1);
				//tdiv += '<img src='+postimg[i]+'>'
			}
		}
		var x = document.createElement('div');
		var tdiv = '<div>';
		var postimgl = postimg.length > 3 ? 3 : postimg.length;
		for (var i = 0; i < postimgl; i++) {
			tdiv += '<img src=' + postimg[i] + ' onload="varietynga_setimg(this)" style="left:-9999px;top:-9999px;position:absolute;z-index:-999">'
		}
		tdiv += '</div>';
		x.innerHTML = tdiv;
		document.getElementById(arg).parentNode.appendChild(x);
		return;
	}
}
//折叠内容收缩
function varietynga_setCollapseButton() {
	ubbcode.collapse.load_ngaplug = ubbcode.collapse.load
		ubbcode.collapse.load = function (o, id) {
		var oo = o.previousSibling
			oo.style.display = 'block'
			oo = oo.getElementsByTagName('button')[0]
			if (o.innerHTML == "") {
				oo.innerHTML = "—";
				//oo.style.width = "17px";
				//oo.style.margin = "2px";
				ubbcode.collapse.load_ngaplug(o, id)
			} else {
				if (oo.innerHTML == "+") {
					o.style.display = "block";
					oo.innerHTML = "—";
				} else {
					o.style.display = "none";
					oo.innerHTML = "+";
				}
			}
	}
}
//贴吧风格-缩略图的放大缩小操作
function varietynga_setimg(img) {
	if (img.offsetHeight > 75) {
		img.style.width = img.offsetWidth / img.offsetHeight * 75 + "px";
		img.style.height = "75px";
		img.title = "点击查看大图"
			img.style.position = "static";
		img.style.border = "3px solid rgb(139, 0, 0)";
		img.style.marginRight = "10px";
		img.className = "varietynga_cur_zin";
		img.onclick = function (event) {
			if (img.title != "点击查看大图") {
				var e = event || window.event;
				var layerY = e.offsetY || getOffset(e).offsetY;
				if (layerY > 75) {
					document.body.scrollTop -= document.body.scrollTop == 0 ? 0 : layerY - 78
					document.documentElement.scrollTop -= document.documentElement.scrollTop == 0 ? 0 : layerY - 78
				}
				varietynga_setimg(img);
			} else {
				var tdw = img.parentNode.parentNode.offsetWidth - 30;
				img.style.width = "";
				img.style.border = "";
				img.title = "点击查看缩略图";
				img.style.height = "";
				if (img.offsetWidth > tdw) {
					img.style.height = img.offsetHeight / img.offsetWidth * tdw + "px";
					img.style.width = tdw + "px";
					img.title += "，该图片过大，请进入帖子查看完整图片。"
				}
				img.className = "varietynga_cur_zout";
			}
		}
	}

	function getOffset(evt) {
		var target = evt.target;
		if (target.offsetLeft == undefined) {
			target = target.parentNode;
		}
		var pageCoord = getPageCoord(target);
		var eventCoord = {
			x : window.pageXOffset + evt.clientX,
			y : window.pageYOffset + evt.clientY
		};
		var offset = {
			offsetX : eventCoord.x - pageCoord.x,
			offsetY : eventCoord.y - pageCoord.y
		};
		return offset;
	}
	function getPageCoord(element) {
		var coord = {
			x : 0,
			y : 0
		};
		while (element) {
			coord.x += element.offsetLeft;
			coord.y += element.offsetTop;
			element = element.offsetParent;
		}
		return coord;
	}
}

//生成CSS
function varietynga_css() {
	var tcss = "";
	if (varietynga_setting.data.set.css.colsenav) {
		tcss += '#_178NavAll_110906_765453{display:none}  /*去除导航条*/\n';
	}
	if (varietynga_setting.data.set.css.colsebg) {
		tcss += '#custombg{display:none}  /*去除自定义背景*/\n';
		tcss += '#mainmenu{margin:0px;}   /*去除了自定义背景后需要使用这个以清除用户头像和版面链接之间的间距*/\n';
	}
	if (varietynga_setting.data.set.css.colseinfo) {
		tcss += '.cpinfo{display:none;}    /*去除底部申明*/\n';
	}

	var color = "";
	if (varietynga_setting.data.set.css.custombg.check) {
		if (varietynga_setting.data.set.css.custombg.bg.toLowerCase() == "custom") {
			color = varietynga_setting.data.set.css.custombg.custom;
		} else {
			color = varietynga_setting.data.set.css.custombg.bg;
		}
		color = color.substr(0, 1) == "#" ? color.substr(1) : color;
		tcss += 'body {background:#' + color + ';}   /*body背景色*/\n';
		tcss += '.catenew{background:#' + color + ';}   /*子版块主背景色*/\n';
		tcss += '.urltip, .urltip2 {background: #' + color + ';}  /*浮动用户信息背景色*/\n';
		tcss += '#indexBlock3 .catenew, #indexBlock3 .catenew .b2{background-color:#' + color + '}  /*暗黑区主背景色*/\n';
		tcss += '.single_ttip2 .div2 {background: #' + color + ';}  /*提醒信息背景色*/\n';
		tcss += '#atc_content {background-color: #' + getbcolor(getbcolor(color)) + ';}  /*回帖编辑框背景色*/\n';

		tcss += '.catenew .b2 {background-color: #' + color + ';}  /*子版块表格色1*/\n';
		tcss += '.catenew .b3 {background-color: #' + getbcolor(color) + ';}  /*子版块表格色2 主界面板块表格色1*/\n';
		tcss += '.catenew .b4 {background-color: #' + color + ';}  /*子版块表格色3 主界面板块表格色2*/\n';

		tcss += '#indexBlock3 .catenew .b3{background-color:#' + color + '}  /*暗黑区表格色1*/\n';
		tcss += '#indexBlock3 .catenew .b4{background-color:#' + getbcolor(color) + '}  /*暗黑区表格色2*/\n';

		tcss += '.quote {background-color: #' + getbcolor(getbcolor(color)) + ';}  /*引用区域背景色*/\n';

		tcss += '.forumbox .row1 .c1 {background-color: #' + color + ';}  /*主题列表表格背景色1.1*/\n';
		tcss += '.forumbox .row1 .c2 {background-color: #' + getbcolor(color) + ';}  /*主题列表表格背景色1.2*/\n';
		tcss += '.forumbox .row1 .c3_ {background-color: #' + color + ';}  /*主题列表表格背景色1.3*/\n';
		tcss += '.forumbox .row1 .c4_ {background-color: #' + getbcolor(color) + ';}  /*主题列表表格背景色1.4*/\n';
		tcss += '.forumbox .row2 .c1 {background-color: #' + getbcolor(color) + ';}  /*主题列表表格背景色2.1*/\n';
		tcss += '.forumbox .row2 .c2 {background-color: #' + color + ';}  /*主题列表表格背景色2.2*/\n';
		tcss += '.forumbox .row2 .c3_ {background-color: #' + getbcolor(color) + ';}  /*主题列表表格背景色2.3*/\n';
		tcss += '.forumbox .row2 .c4_ {background-color: #' + color + ';}  /*主题列表表格背景色2.4*/\n';

		tcss += '.nga_plug_table {background-color: #' + color + ';}  /*插件设置中心背景色*/\n';
		tcss += '.nga_plug_tab_main {background-color: #' + color + ';}  /*插件设置中心生成的TAB的背景色*/\n';
		tcss += '.nga_plug_tab_menu_open {background-color: #' + color + ';}  /*TAB表示打开的TAB的背景色*/\n';
		tcss += '.nga_plug_tab_menu_close {background-color: #' + getbcolor(color) + ';}  /*TAB表示关闭的TAB的背景色*/\n';
		tcss += '.nga_edit_table {background-color: #' + getbcolor(color) + ';}  /*表情选择窗口的背景色*/\n';
	}

	if (varietynga_setting.data.set.css.avis.check) {
		tcss += '.posticon a:visited {color: #' + varietynga_setting.data.set.css.avis.color + ';}  /*主题列表中已点击过的链接的颜色*/\n';
		tcss += '.posticon a:hover {text-decoration: underline;color: #314396;}  /*主题列表中鼠标划过的链接的颜色*/\n';
	}
	if (varietynga_setting.data.set.css.noad) {
		tcss += '*[class^="adsc"]{display:none !important;}  /*去广告css1（有class的块）*/\n';
		tcss += '#mc>a[href^="http://www.xunyou.com"]{display:none !important;}  /*去广告css2（迅游广告）*/\n';
	}
	varietynga_customcss.innerHTML = tcss;

	function getbcolor(color) {
		var tcolor = color;
		for (var i = 0; i < 3; i++) {
			if (tcolor.substr(i * 2, 1).toLowerCase() == "a") {
				tcolor = tcolor.substr(0, (i * 2)) + "9" + tcolor.substr(i * 2 + 1);
			} else if (tcolor.substr(i * 2, 1) == "0") {
				tcolor = tcolor.substr(0, (i * 2)) + "00" + tcolor.substr((i + 1) * 2);
			} else if (isNaN(tcolor.substr(i * 2, 1))) {
				tcolor = tcolor.substr(0, (i * 2)) + String.fromCharCode(tcolor.substr(i * 2, 1).charCodeAt() - 1) + tcolor.substr(i * 2 + 1);
			} else {
				tcolor = tcolor.substr(0, (i * 2)) + (parseInt(tcolor.substr(i * 2, 1)) - 1) + tcolor.substr(i * 2 + 1);
			}
		}
		return tcolor;
	}
}

//点击快速设置主题色时的动作
function varietynga_setcolor(obj) {
	var divel = obj.parentNode.getElementsByTagName("div");
	if (obj == divel[0]) {
		varietynga_setting.data.set.css.custombg.check = false;
	} else {
		varietynga_setting.data.set.css.custombg.check = true;
	}
	if (obj == divel[divel.length - 1]) {
		obj.parentNode.getElementsByTagName("input")[0].disabled = false;
		varietynga_setting.data.set.css.custombg.bg = "custom";
	} else {
		obj.parentNode.getElementsByTagName("input")[0].disabled = true;
		if (obj.style.backgroundColor.colorHex() != '')
			varietynga_setting.data.set.css.custombg.bg = obj.style.backgroundColor.colorHex();
	}
	for (var i = 0; i < divel.length; i++) {
		divel[i].style.border = '1px solid #888';
	}
	obj.style.border = '1px solid #f88';
	varietynga_setting.save();
	varietynga_css();
}

//检查并设置自定义颜色
function varietynga_checkcolor(obj) {
	if (obj.value.substr(0, 1) == "#")
		obj.value = obj.value.substr(1);
	var isbg = (obj.id == "varietynga_color");
	if (!/^[a-fA-F0-9]+$/.test(obj.value)) {
		if (isbg) {
			obj.value = varietynga_setting.data.set.css.custombg.custom;
		} else {
			obj.value = varietynga_setting.data.set.css.avis.color;
		}
		return;
	}
	if (obj.value.length > 6)
		obj.value = obj.value.substr(0, 6);
	if (obj.value.length == 3)
		obj.value = obj.value.replace(/([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/gi, function ($0, $1, $2, $3) {
				return $1 + $1 + $2 + $2 + $3 + $3
			});
	if (obj.value.length < 6)
		obj.value = (obj.value + "000000").substr(0, 6);
	if (isbg) {
		varietynga_setting.data.set.css.custombg.custom = obj.value;
	} else {
		varietynga_setting.data.set.css.avis.color = obj.value;
	}
	varietynga_setting.save();
	varietynga_css();
}

function varietynga_setthtml() {
	var s = "";
	s += '<div>\
			<div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
			<span class="green">自定义主题色</span><br>\
			<div title="默认颜色" onclick="varietynga_setcolor(this)" style="height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="浅绿" onclick="varietynga_setcolor(this)" style="background-color:#CCE8CC;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="蓝色" onclick="varietynga_setcolor(this)" style="background-color:#1D7F99;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="绿色" onclick="varietynga_setcolor(this)" style="background-color:#85A333;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="红色" onclick="varietynga_setcolor(this)" style="background-color:#AB0303;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="紫色" onclick="varietynga_setcolor(this)" style="background-color:#AB2C74;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="青色" onclick="varietynga_setcolor(this)" style="background-color:#518791;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="褐色" onclick="varietynga_setcolor(this)" style="background-color:#BA4C30;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="白色" onclick="varietynga_setcolor(this)" style="background-color:#FFFFFF;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<div title="自定义颜色" onclick="varietynga_setcolor(this)" style="height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
			<img src="about:blank" style="display:none" onerror="var ts=varietynga_setting.data.set.css.custombg;var divel=this.parentNode.getElementsByTagName(\'div\');if(!ts.check){divel[0].style.border=\'1px solid #f88\';return}for(var i=1;i<divel.length-1;i++){if(ts.bg.toLowerCase()==divel[i].style.backgroundColor.colorHex().toLowerCase()){divel[i].style.border=\'1px solid #f88\';return}};divel[divel.length-1].style.border=\'1px solid #f88\';return">\
			<input onkeyup="var e = event || window.event;var keyCode = e.which || e.keyCode;if(keyCode==13) varietynga_checkcolor(this);" id="varietynga_color" size="6" value=' + varietynga_setting.data.set.css.custombg.custom + ' ' + d(varietynga_setting.data.set.css.custombg.bg.toLowerCase() == "custom" && varietynga_setting.data.set.css.custombg.check) + ' type="text"></div><div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
			<span class="green">已访问帖子颜色</span><br>\
			<input type="checkbox" onclick="document.getElementById(\'varietynga_color1\').disabled=!this.checked;varietynga_setting.data.set.css.avis.check=this.checked;varietynga_setting.save();varietynga_css();" ' + c(varietynga_setting.data.set.css.avis.check) + ' title="是否启用已访问帖子变色">启用已访问帖子变色    颜色：\
			<input onkeyup="var e = event || window.event;var keyCode = e.which || e.keyCode;if(keyCode==13) varietynga_checkcolor(this);" id="varietynga_color1" size="6" value=' + varietynga_setting.data.set.css.avis.color + ' ' + d(varietynga_setting.data.set.css.avis.check) + ' type="text"></div>\
			<div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
			<span class="green">隐藏界面元素</span><br>\
			<input onclick="varietynga_setting.data.set.css.colsenav=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" ' + c(varietynga_setting.data.set.css.colsenav) + ' title="是否隐藏顶部导航条">隐藏顶部导航条<br>\
			<input onclick="varietynga_setting.data.set.css.colsebg=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" ' + c(varietynga_setting.data.set.css.colsebg) + ' title="是否隐藏顶部背景">隐藏顶部背景<br>\
			<input onclick="varietynga_setting.data.set.css.colseinfo=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" ' + c(varietynga_setting.data.set.css.colseinfo) + ' title="是否隐藏底部内容">隐藏底部内容<br>\
			<input onclick="varietynga_setting.data.set.css.noad=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" ' + c(varietynga_setting.data.set.css.noad) + ' title="去除大部分NGA广告">去广告<br>\
			</div>\
			<div style="text-align:left;width:607px;"><span class="green">本页使用说明</span><br>\
			选择主题色时直接点击相应的颜色块即可快速选择主题色，如需自定义主题色请点击“自定义”块后在后面的文本框输入3位颜色编码或者6位颜色编码，在文本框按下回车以保存并预览效果，如不使用自定义主题色请选择第一个颜色块（默认颜色）即可。<br><br>\
			自定义已访问帖子的颜色请启用已访问帖子变色，然后在后面的文本框输入3位颜色编码或者6位颜色编码，在文本框按下回车以保存并预览效果。<br><br>\
			隐藏界面元素时开启或者关闭对应选项立即保存并查看效果。\
			</div>\
			</div>';
	return s;
	function c(p) {
		if (p)
			return "checked";
		else
			return "";
	}
	function d(p) {
		if (!p)
			return "disabled";
		else
			return "";
	}
}

//图片旋转
function varietynga_img() {
	var timg = document.getElementById("m_posts_c").getElementsByTagName("img");
	for (var i = 0; i < timg.length; i++) {
		if (checkimg(timg[i])) {
			var ts = document.createElement("span");
			ts.className = "varietyngas";
			ts.style.display = "inline-block";
			ts.top = nga_plug_elementTop(timg[i]) + "px";
			ts.left = nga_plug_elementLeft(timg[i]) + "px";
			ts.innerHTML = "<div style='position: absolute;z-index:999'>\r\
												<div onclick='event.cancelBubble = true;varietynga_imgclick(this.parentNode.parentNode,\"l\");return false;' title='左转' \
												style='display: inline-block; background-image: url(https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/left.gif); \
												height: 16px; width: 16px; border:1px solid #777777; background-position: initial initial; background-repeat: initial initial;'></div>\r\
												<div onclick='event.cancelBubble = true;varietynga_imgclick(this.parentNode.parentNode,\"r\");return false;' title='右转' \
												style='display: inline-block; background-image: url(https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/right.gif); \
												height: 16px; width: 16px; border:1px solid #777777;background-position: initial initial; background-repeat: initial initial;'></div>\
												</div>";
			timg[i].parentNode.insertBefore(ts, timg[i]);
			timg[i].className = timg[i].className.replace("imgmaxwidth", "");
			ts.appendChild(timg[i]);
		}
	}

	function checkimg(img) {
		if (img.parentNode.className == "varietyngas")
			return false
			if (img.parentNode.getAttribute("name") == "portrait")
				return false
				if (img.parentNode.getAttribute("name") == "medal")
					return false
					if (img.parentNode.parentNode.getAttribute("name") == "money")
						return false
						if (img.src == "about:blank")
							return false
							if (JSON.stringify(nga_plug_mojo).toLowerCase().indexOf(img.src.toLowerCase()) >= 0)
								return false
								//var width = img.offsetWidth || img.width
								//var height = img.offsetHeight ||img.height
								//if (width < 200 && height < 200) return false
								return true
	}
}

function varietynga_imgclick(o, p) {
	var img = o.getElementsByTagName("img")[0]
		if (!img || !p)
			return false;
		var n = img.getAttribute('step');
	if (n == null)
		n = 0;
	if (p == 'r') {
		(n == 3) ? n = 0 : n++;
	} else if (p == 'l') {
		(n == 0) ? n = 3 : n--;
	}
	img.setAttribute('step', n);
	if (window.attachEvent) {
		img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + n + ')';
		switch (n) {
		case 0:
			img.parentNode.style.height = img.height + "px";
			break;
		case 1:
			img.parentNode.style.height = img.width + "px";
			break;
		case 2:
			img.parentNode.style.height = img.height + "px";
			break;
		case 3:
			img.parentNode.style.height = img.width + "px";
			break;
		}
	} else {
		var tw = img.offsetWidth;
		var th = img.offsetHeight;
		switch (n) {
		default:
		case 0:
			img.className = img.className.replace(/\svarietynga./, "");
			img.style.marginLeft = "0px";
			img.style.marginTop = "0px";
			img.parentNode.style.width = "";
			img.parentNode.style.height = "";
			break;
		case 1:
			img.className = img.className.replace(/\svarietynga./, "");
			img.className += " varietyngar";
			img.style.marginLeft = (img.offsetHeight - img.offsetWidth) / 2 + "px";
			img.style.marginTop = (img.offsetWidth - img.offsetHeight) / 2 + "px";

			img.parentNode.style.width = th + "px";
			img.parentNode.style.height = tw + "px";
			break;
		case 2:
			img.className = img.className.replace(/\svarietynga./, "");
			img.className += " varietyngat";
			img.style.marginLeft = "0px";
			img.style.marginTop = "0px";
			img.parentNode.style.width = "";
			img.parentNode.style.height = "";
			break;
		case 3:
			img.className = img.className.replace(/\svarietynga./, "");
			img.className += " varietyngal";
			img.style.marginLeft = (img.offsetHeight - img.offsetWidth) / 2 + "px";
			img.style.marginTop = (img.offsetWidth - img.offsetHeight) / 2 + "px";
			img.parentNode.style.width = th + "px";
			img.parentNode.style.height = tw + "px";
			break;
		}
	}
}
