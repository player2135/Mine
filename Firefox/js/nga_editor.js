// ================================================================================
// NGA[艾泽拉斯国家地理论坛] 论坛增强插件   编辑框增强
// 作者：LinTx
// 版本：1.4
// ================================================================================

loadCssContent(".nga_edui_box{  /*工具条全局*/	height:60px;	padding:0;	margin:0;	border:none;}.nga_edui_box1{  /*工具条全局*/	padding:0;	margin:0;	border:none;}.nga_edui_list{   /*选择列表*/	display:inline-block!important;}.nga_edui_font{	display:inline-block!important;}.nga_edui_list{	display:inline-block!important;}.nga_edui_list{	display:inline-block!important;}.nga_edui_icon{   /*图标全局*/	background-image: url('https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/icons.png');	width:20px;	height:20px;	border:1px solid #FFF8E5;	display:inline-block!important;}.nga_edui_chexiao{  /*撤销*/	background-position:-160px 0;}.nga_edui_huifu{  /*重做*/	background-position:-100px 0px;}.nga_edui_disabled {  /*禁用（透明度）*/	opacity: 0.3;	-ms-filter: 'alpha(opacity=30)';	filter: alpha(opacity=30);}.nga_edui_fenge{  /*分隔符*/	width:2px;	background-position:-180px 0px;}.nga_edui_mojo{  /*表情*/	background-position:-60px -20px;}.nga_edui_text{  /*短语*/	background-position:-700px 0px;}.nga_edui_fb{  /*粗体*/	background-position:0px 0px;}.nga_edui_fi{  /*斜体*/	background-position:-60px 0px;}.nga_edui_fu{  /*下划线*/	background-position:-140px 0px;}.nga_edui_fd{  /*删除线*/	background-position:-120px 0px;}.nga_edui_l{  /*左对齐*/	background-position:-460px 0px;}.nga_edui_b{  /*中对齐*/	background-position:-420px 0px;}.nga_edui_r{  /*右对齐*/	background-position:-480px 0px;}.nga_edui_fl{  /*左浮动*/	background-position:-500px -40px;}.nga_edui_fr{  /*右浮动*/	background-position:-520px -40px;}.nga_edui_h{	background-position:0px -40px;}.nga_edui_roll{	background-position:0px -20px;}.nga_edui_msg{	background-position:-80px -20px;}.nga_edui_pse{	background-position:-20px -40px;}.nga_edui_link{	background-position:-500px 0px;}.nga_edui_img{	background-position:-380px 0px;}.nga_edui_flash{	background-position:-320px -20px;}.nga_edui_heng{	background-position:-360px 0px;}.nga_edui_quote{	background-position:-220px 0px;}.nga_edui_code{	background-position:-440px -40px;}.nga_edui_lists{	background-position:-20px 0px;}.nga_edui_listsa{  /*有序列表*/	background-position:-80px 0px;}.nga_edui_t{	background-position:-640px -40px;}.nga_edui_album{	background-position:-860px 0px;}.nga_edui_table{	background-position:-660px 0px;}.nga_edui_tid{	background-position:-180px -20px;}.nga_edui_pid{	background-position:-200px -20px;}.nga_edui_customachieve{	background-position:-920px 0px;}.nga_edui_db3{	background-position:-980px 0px;}.nga_edui_crypt{	background-position:-840px 0px;}.nga_edui_randomblock{	background-position:-560px 0px;}.nga_edit_table{	display : block;	border : 1px solid #777;	box-shadow : 5px 5px 5px #444;	position:absolute;	z-index:10;	background:#FFF8E5;	width:800px;	text-align:left;}.nga_plug_quick_text_a{	display:block;	color:gray;	float:left;	border:1px solid #aaa;	padding:0 2px;	margin:2px;	align:center;}.nga_plug_quick_text_a > div{	display: none;	background-image: url('https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/img/nga/bl.png');	width: 12px;	height: 12px;	margin-left: 2px;}.nga_plug_quick_text_a:hover > div{	display: inline-block!important;}.nga_plug_quick_text_a > div:nth-of-type(1) {	background-position: -12px 0;	margin-left:10px;}"); //加载CSS
//loadCss("https://raw.githubusercontent.com/player2135/Mine/Firefox/Firefox/css/nga/nga_editor.css"); //加载CSS

var nga_edit_tmpshot = [];
var nga_edit_tmpshot_i = 0;
var nga_edit_mojo_check = new nga_plug_local_data("nga_edit_mojo_check");
var nga_edit_custom_mojo = new nga_plug_local_data("nga_edit_custom_mojo");
var nga_edit_quick_mojo = new nga_plug_local_data("nga_edit_quick_mojo");
var nga_edit_system_mojo;

function nga_edit_Initialization() {
	nga_plug_addmsg("nga_edit", "NGA UBB编辑器插件", "添加测试功能：所见即所得编辑，原“编辑”标签修改为“代码”标签，原“编辑”标签为所见即所得编辑模式。\n提示：1.部分代码暂不支持所见即所得模式（如code代码）这种类型的代码在所见即所得模式下依然显示源代码。\
							\n2.如在所见即所得编辑模式下编辑后造成代码错乱（部分换行消失不算）请在UBB（代码）模式下撤销至之前的内容即可，并请将之前的内容以code代码包含后发至交流贴以便修复BUG。");

	nga_edit_mojo_check.load();
	nga_edit_mojo_check.data = nga_edit_mojo_check.data || [];

	nga_edit_custom_mojo.load();
	nga_edit_custom_mojo.data = nga_edit_custom_mojo.data || [{
				title : "自定义",
				id : "custom",
				check : false,
				img : []
			}
		];

	nga_edit_quick_mojo.load();
	nga_edit_quick_mojo.data = nga_edit_quick_mojo.data || [];

	//nga_plug_mojo.unshift({autoor:"LinTx",data:nga_edit_custom_mojo.data})

	nga_plug_setting("add", "表情开关设置", "nga_edit_mojo_check"); //将表情开关设置加入统一导入导出设置
	nga_plug_setting("add", "自定义表情", "nga_edit_custom_mojo"); //将自定义表情加入统一导入导出设置
	nga_plug_setting("add", "最后使用的表情", "nga_edit_quick_mojo"); //将最后使用的表情加入统一导入导出设置
	var m = [{
			title : "系统",
			alt : ["s:1", "s:2", "s:3", "s:4", "s:5", "s:6", "s:7", "s:8", "s:34", "s:32", "s:33", "s:30", "s:29", "s:28", "s:27", "s:26", "s:25", "s:24", "s:35", "s:36", "s:37", "s:38", "s:39", "s:40", "s:41", "s:42", "s:43"],
			img : ["http://img4.ngacn.cc/ngabbs/post/smile/smile.gif", "http://img4.ngacn.cc/ngabbs/post/smile/mrgreen.gif", "http://img4.ngacn.cc/ngabbs/post/smile/question.gif", "http://img4.ngacn.cc/ngabbs/post/smile/wink.gif", "http://img4.ngacn.cc/ngabbs/post/smile/redface.gif", "http://img4.ngacn.cc/ngabbs/post/smile/sad.gif", "http://img4.ngacn.cc/ngabbs/post/smile/cool.gif", "http://img4.ngacn.cc/ngabbs/post/smile/crazy.gif", "http://img4.ngacn.cc/ngabbs/post/smile/14.gif", "http://img4.ngacn.cc/ngabbs/post/smile/12.gif", "http://img4.ngacn.cc/ngabbs/post/smile/13.gif", "http://img4.ngacn.cc/ngabbs/post/smile/10.gif", "http://img4.ngacn.cc/ngabbs/post/smile/09.gif", "http://img4.ngacn.cc/ngabbs/post/smile/08.gif", "http://img4.ngacn.cc/ngabbs/post/smile/07.gif", "http://img4.ngacn.cc/ngabbs/post/smile/06.gif", "http://img4.ngacn.cc/ngabbs/post/smile/05.gif", "http://img4.ngacn.cc/ngabbs/post/smile/04.gif", "http://img4.ngacn.cc/ngabbs/post/smile/15.gif", "http://img4.ngacn.cc/ngabbs/post/smile/16.gif", "http://img4.ngacn.cc/ngabbs/post/smile/17.gif", "http://img4.ngacn.cc/ngabbs/post/smile/18.gif", "http://img4.ngacn.cc/ngabbs/post/smile/19.gif", "http://img4.ngacn.cc/ngabbs/post/smile/20.gif", "http://img4.ngacn.cc/ngabbs/post/smile/21.gif", "http://img4.ngacn.cc/ngabbs/post/smile/22.gif", "http://img4.ngacn.cc/ngabbs/post/smile/23.gif"]
		}
	];
	nga_edit_system_mojo = {
		autoor : "NGA",
		data : m,
		isSystemMojo : true
	};

	var txtisfocus = false;
	if (document.getElementById("fast_post_c") && document.getElementById("fast_post_c").getElementsByTagName("textarea").length != 0) {
		//document.getElementById("atc_content").id="";
		document.getElementById("fast_post_c").getElementsByTagName("textarea")[0].id = "atc_content";
		postfunc.o_content = document.getElementById("atc_content");
		postfunc.content = postfunc.o_content;
		postfunc.addsmile = function (code) {
			postfunc.addText(code);
		};
	} else if (document.getElementById("xoxoxxxoxoxxoo") != undefined)
		//&& location.search.indexOf("action=modify")==-1
		//&& location.search.indexOf("action=quote")==-1)
		//&& location.search.indexOf("action=reply")==-1)
	{
		postfunc.o_content.id = "atc_content";
		postfunc.content = postfunc.o_content;
		postfunc.addsmile = function (code) {
			postfunc.addText(code);
		};
	}

	if (document.activeElement.id == "atc_content")
		txtisfocus = true;
	var nga_edit_pathname = location.pathname;
	if (nga_edit_pathname == '/post.php') {
		var t_td = document.getElementById('atc_content').parentNode;
		//try{document.getElementById("postform").appendChild(postfunc.o_content);}catch(e){}
		t_td.innerHTML = nga_edit_gettabhtml();
		try {
			document.getElementById("nga_edit_content").appendChild(postfunc.o_content);
		} catch (e) {
			console.log(e);
		}
		postfunc.o_content.style.width = "99%";
		document.getElementById("post_preview").style.display = "inline";
		document.getElementById("post_preview").style.padding = "0";
	} else if (nga_edit_pathname == '/read.php' || nga_edit_pathname == '/thread.php') {
		if (document.getElementById("atc_content")) {
			var nga_edit_divEl = document.createElement("div");
			nga_edit_divEl.innerHTML = nga_edit_gettabhtml();
			try {
				document.getElementById("atc_content").parentNode.insertBefore(nga_edit_divEl, document.getElementById("atc_content"));
				document.getElementById("nga_edit_content").appendChild(document.getElementById("atc_content"));
				document.getElementById("atc_content").style.width = "99%";
				document.getElementById("post_preview").style.display = "inline";
				document.getElementById("post_preview").style.padding = "0";
			} catch (e) {};
		}
	}
	if (nga_edit_pathname != '/') {
		try {
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[3].onclick = function () {
				nga_plug_tab_setTab(this, 2);
				postfunc.previewDiv = document.getElementById("post_preview");
				postfunc.previewDiv.innerHTML = postfunc.content.value.replace(/\n/g, '<br>');
				ubbcode.bbsCode({
					c : postfunc.previewDiv,
					tId : Math.floor(Math.random() * 10000),
					pId : Math.floor(Math.random() * 10000),
					authorId : __CURRENT_UID,
					rvrc : __GP['rvrc'],
					isLesser : __GP['lesser']
				});
			};
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[2].onclick = function () {
				nga_plug_tab_setTab(this, 1);
				postfunc.previewDiv = document.getElementById("post_edit");
				postfunc.previewDiv.innerHTML = postfunc.content.value.replace(/\n/g, '<br>');
				postfunc.previewDiv.innerHTML = nga_edit_ubb2ubb(postfunc.previewDiv.innerHTML, 1); //将不转换的UBB代码加感叹号
				ubbcode.bbsCode({
					c : postfunc.previewDiv,
					tId : Math.floor(Math.random() * 10000),
					pId : Math.floor(Math.random() * 10000),
					authorId : __CURRENT_UID,
					rvrc : __GP['rvrc'],
					isLesser : __GP['lesser']
				});
				postfunc.previewDiv.innerHTML = nga_edit_ubb2ubb(postfunc.previewDiv.innerHTML, 2); //将没有转换的UBB代码的感叹号取消
			};
			document.getElementById("post_edit").onblur = function () {
				//alert(this.id);  //可编辑DIV失去焦点时触发，此处应执行html到ubb代码的转换
				nga_edit_settmpshot()
				document.getElementById("atc_content").value = nga_edit_html2ubb(this.innerHTML);
				nga_edit_settmpshot()
				return true;
			}
			document.getElementById("atc_content").onkeyup = function (event) {
				nga_edit_setshot('up');
				postfunc.inputchar(event, this);
			}
			/* document.getElementById("atc_content").onkeydown = function(e){
			nga_edit_setshot('down');
			var e = e || window.event;
			var keyCode = e.which ? e.which : e.keyCode;
			if (e.altKey && keyCode == 83){
			postfunc.post_v2();
			}
			postfunc.quickpost(e);
			} */
			try {
				if (txtisfocus)
					document.getElementById('atc_content').focus();
			} catch (e) {};
		} catch (e) {
			console.log(e);
		};
	}

	if (!document.getElementById("nga_edit_PreviewImgDiv")) {
		var tmpdiv1 = document.createElement("div");
		tmpdiv1.id = "nga_edit_PreviewImgDiv";
		tmpdiv1.style.display = "none";
		tmpdiv1.style.background = "#FEF3D1";
		tmpdiv1.style.position = "absolute";
		tmpdiv1.style.zIndex = 11;
		tmpdiv1.style.border = "1px solid #A70";
		tmpdiv1.style.boxShadow = "5px 5px 5px #444";
		tmpdiv1.onmousemove = function () {
			document.getElementById("nga_edit_PreviewImgDiv").style.display = "none"
		}
		document.body.appendChild(tmpdiv1);
	}

	try {
		document.getElementById("m_nav").getElementsByTagName("div")[1].style.zIndex = "2";
	} catch (e) {};
	try {
		document.getElementById("b_nav").getElementsByTagName("div")[1].style.zIndex = "2";
	} catch (e) {};
	var x = new nga_plug_tab();
	x.add("表情开关", '<div class="nga_plug_table_tab_div"><input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="加载设置界面"></div>');
	//x.add("表情开关",'<div class="nga_plug_table_tab_div">'+nga_edit_getmojocheckhtml()+'</div>');
	var t = x.gethtml();
	nga_plug_table_addTab("表情设置", t);

}

//打开编辑框时给UBB代码做转换以防止不支持编辑的UBB代码转换为HTML代码
function nga_edit_ubb2ubb(html, act) {
	var regs = [];
	var thtml = html;
	regs.push(act == 1 ? /\[dice\][\s\S]*?\[\/dice\]/ig : /\[!dice\][\s\S]*?\[!\/dice\]/ig); //投骰子
	regs.push(act == 1 ? /\[@[\s\S]*?\]/ig : /\[!@[\s\S]*?\]/ig); //发送提醒 @
	regs.push(act == 1 ? /\[t\.178\.com[\s\S]*?\]/ig : /\[!t\.178\.com[\s\S]*?\]/ig); //178尾巴
	regs.push(act == 1 ? /\[collapse[\s\S]*?\[\/collapse\]/ig : /\[!collapse[\s\S]*?\[!\/collapse\]/ig); //折叠的内容
	regs.push(act == 1 ? /\[album[\s\S]*?\[\/album\]/ig : /\[!album[\s\S]*?\[!\/album\]/ig); //相册
	regs.push(act == 1 ? /\[flash\][\s\S]*?\[\/flash\]/ig : /\[!flash\][\s\S]*?\[!\/flash\]/ig); //flash
	regs.push(act == 1 ? /\[code[\s\S]*?\[\/code\]/ig : /\[!code[\s\S]*?\[!\/code\]/ig); //插入代码
	regs.push(act == 1 ? /\[tid[\s\S]*?\[\/tid\]/ig : /\[!tid[\s\S]*?\[!\/tid\]/ig); //主题
	regs.push(act == 1 ? /\[pid[\s\S]*?\[\/pid\]/ig : /\[!pid[\s\S]*?\[!\/pid\]/ig); //回复
	regs.push(act == 1 ? /\[customachieve\][\s\S]*?\[\/customachieve\]/ig : /\[!customachieve\][\s\S]*?\[!\/customachieve\]/ig); //自定义成就
	regs.push(act == 1 ? /\[url\][\s\S]*?#armory\[\/url\]/ig : /\[!url\][\s\S]*?#armory\[!\/url\]/ig); //D3人物
	regs.push(act == 1 ? /\[crypt\][\s\S]*?\[\/crypt\]/ig : /\[!crypt\][\s\S]*?\[!\/crypt\]/ig); //加密内容
	regs.push(act == 1 ? /\[randomblock\][\s\S]*?\[\/randomblock\]/ig : /\[!randomblock\][\s\S]*?\[!\/randomblock\]/ig); //随机段落
	regs.push(act == 1 ? /\[cnarmory[\s\S]*?\]/ig : /\[!cnarmory[\s\S]*?\]/ig); //魔兽任务
	regs.push(act == 1 ? /\[item[\s\S]*?\[[\s\S]*?\]\]/ig : /\[!item[\s\S]*?\[[\s\S]*?\]\]/ig); //魔兽物品1
	regs.push(act == 1 ? /\[item[\s\S]*?\[\/item\]/ig : /\[!item[\s\S]*?\[!\/item\]/ig); //魔兽物品2
	regs.push(act == 1 ? /\[achieve[\s\S]*?\[[\s\S]*?\]\]/ig : /\[!achieve[\s\S]*?\[[\s\S]*?\]\]/ig); //魔兽成就1
	regs.push(act == 1 ? /\[achieve[\s\S]*?\[\/achieve\]/ig : /\[!achieve[\s\S]*?\[!\/achieve\]/ig); //魔兽成就2
	regs.push(act == 1 ? /\[spell[\s\S]*?\[[\s\S]*?\]\]/ig : /\[!spell[\s\S]*?\[[\s\S]*?\]\]/ig); //魔兽法术1
	regs.push(act == 1 ? /\[spell[\s\S]*?\[\/spell\]/ig : /\[!spell[\s\S]*?\[!\/spell\]/ig); //魔兽法术2
	regs.push(act == 1 ? /\[headline[\s\S]*?\[\/headline\]/ig : /\[!headline[\s\S]*?\[!\/headline\]/ig); //目录
	regs.push(act == 1 ? /\[murtopic[\s\S]*?\]/ig : /\[!murtopic[\s\S]*?\]/ig); //近期用户推荐主题
	regs.push(act == 1 ? /\[lessernuke[\s\S]*?\[\/lessernuke\]/ig : /\[!lessernuke[\s\S]*?\[!\/lessernuke\]/ig); //禁言
	for (var i = 0; i < regs.length; i++) {
		if (act == 1) {
			thtml = thtml.replace(regs[i], function ($0) {
					return $0.replace(/\[/gi, "[!")
				});
		} else if (act == 2) {
			thtml = thtml.replace(regs[i], function ($0) {
					return $0.replace(/\[!/gi, "[")
				});
		}
	}
	return thtml;
}

//html代码转换为ubb代码
function nga_edit_html2ubb(html) {
	var c = html;
	//nga_plug_mojo[0].data[0].img
	c = c.replace(/\n/g, "<br>");
	//c = c.replace()
	//c = c.replace(/<span class="urltip.*?<\/span>/gi,"");
	//c = c.replace(/<span.*?style="display:none">.*?<\/span>/gi,"");
	//c = c.replace(/<span class="chocolate">.*?<\/span>/gi,"");
	if (/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/.test(c)) {
		c = c.replace(/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/gi, function ($0, $1) {
				return $1
			});
	}
	while (/<span(.*?)>(.*?)<\/span>/i.test(c)) {
		c = c.replace(/(.*)<span(.*?)>(.*?)<\/span>/i, function ($0, $1, $2, $3) {
				if (/class/i.test($2)) {
					var tc = /class="(.*?)"/gi.exec($2)[1];
					if (eval('/"' + tc + '"/i').test('"skyblue""royalblue""blue""darkblue""orange""orangered""crimson""red""firebrick""darkred""green""limegreen""seagreen""teal""deeppink""tomato""coral""purple""indigo""burlywood""sandybrown""sienna""chocolate""silver"')) {
						return $1 + "[color=" + tc + "]" + $3 + "[/color]";
					} else {
						if (/urltip/i.test($2))
							return $1;
						if (/class="chocolate"/i.test($2))
							return $1;
						return $1 + $3;
					}
				}
				if (/font-size/i.test($2)) {
					return $1 + "[size=" + /font-size:(.*?)%/gi.exec($2)[1] + "%]" + $3 + "[/size]";
				}
				if (/font-family/i.test($2)) {
					return $1 + "[font=" + /font-family:(.*?)"/gi.exec($2)[1] + "]" + $3 + "[/font]";
				}
				if (/display:none/i.test($2))
					return $1;
				return $1 + $3;
			});
		//alert(c)
	}
	c = c.replace(/<img.*?src="(.*?)".*?>/gi, function ($0, $1) {
			for (var i = 0; i < nga_plug_mojo[0].data[0].img.length; i++) {
				if ($1.toLowerCase() == nga_plug_mojo[0].data[0].img[i].toLowerCase()) {
					return "[" + nga_plug_mojo[0].data[0].alt[i] + "]";
				}
			}
			return "[img]" + $1 + "[/img]";
		});
	c = c.replace(/<b>(.*?)<\/b>/gi, function ($0, $1) {
			return "[b]" + $1 + "[/b]"
		});
	c = c.replace(/<u>(.*?)<\/u>/gi, function ($0, $1) {
			return "[u]" + $1 + "[/u]"
		});
	c = c.replace(/<i .*?>(.*?)<\/i>/gi, function ($0, $1) {
			return "[i]" + $1 + "[/i]"
		});
	c = c.replace(/<del .*?>(.*?)<\/del>/gi, function ($0, $1) {
			return "[del]" + $1 + "[/del]"
		});
	while (/<div(.*?)>(.*?)<\/div>/i.test(c)) {
		c = c.replace(/(.*)<div(.*?)>(.*?)<\/div>/i, function ($0, $1, $2, $3) {
				if ($2.indexOf('style="text-align:left"') >= 0)
					return $1 + "[align=left]" + $3 + "[/align]";
				if ($2.indexOf('style="text-align:center"') >= 0)
					return $1 + "[align=center]" + $3 + "[/align]";
				if ($2.indexOf('style="text-align:right"') >= 0)
					return $1 + "[align=right]" + $3 + "[/align]";
				if ($2.indexOf('class="left"') >= 0)
					return $1 + "[l]" + $3 + "[/l]";
				if ($2.indexOf('class="right"') >= 0)
					return $1 + "[r]" + $3 + "[/r]";
				if ($2.indexOf('class="quote"') >= 0)
					return $1 + "[quote]" + $3 + "[/quote]";
				return $1 + $3;
				//if ($3)
				//return $0;
			});
	}
	c = c.replace(/<h4(.*?)>(.*?)<\/h4>/gi, function ($0, $1, $2) {
			if ($1)
				return "===" + $2 + "===";
			return "[h]" + $2 + "[/h]";
		});
	c = c.replace(/<a.*?href="(.*?)"(.*?)>(.*?)<\/a>/gi, function ($0, $1, $2, $3) {
			if ($2.indexOf("onmouseover") >= 0)
				return "[url=" + $1 + "]" + $3 + "[/url]";
			return "[url]" + $1 + "[/url]";
		});
	while (/<(ul|ol.*?)>(.*?)<\/(u|o)l>/i.test(c)) {
		c = c.replace(/(.*)<(ul|ol.*?)>(.*?)<\/(u|o)l>/i, function ($0, $1, $2, $3) {
				var li = $3.replace(/<li>(.*?)(<\/li>)/gi, function ($0, $1) {
						return "[*]" + $1
					});
				if ($2 != "ul") {
					return $1 + "[list=" + $2.replace(/.*?type="(.*?)"/, function ($0, $1) {
						return $1
					}) + "]" + li + "[/list]";
				} else {
					return $1 + "[list]" + li + "[/list]";
				}
				//return $1 + "[list]" + $3.replace(/<li>(.*?)(<\/li>)/gi,function($0,$1){return "[*]" + $1}) + "[/list]"
			})
	}
	while (/<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/.test(c)) {
		c = c.replace(/(.*)<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/i, function ($0, $1, $2) {
				$2 = $2.replace(/<tr>(.*?)<\/tr>/gi, function ($0, $1) {
						$1 = $1.replace(/<td(.*?)>(.*?)<\/td>/gi, function ($0, $1, $2) {
								var td = "[td";
								if ($1.indexOf("rowspan=") >= 0) {
									td += " rowspan" + /rowspan="(.*?)"/gi.exec($1)[1]
								}
								if ($1.indexOf("colspan=") >= 0) {
									td += " colspan" + /colspan="(.*?)"/gi.exec($1)[1]
								}
								if ($1.indexOf("width:") >= 0) {
									td += " width" + /width:(.*?)%/gi.exec($1)[1]
								}
								return td + "]" + $2 + "[/td]";
							})
							return "[tr]" + $1 + "[/tr]";
					})
					return $1 + "[table]" + $2 + "[/table]";
			})
	}
	c = c.replace(/<br\/?>/ig, "\n")
		return c;
}

//获取并设置默认表情开启状态
function nga_edit_setallmojocheck() {
	for (var m = 0; m < nga_plug_mojo.length; m++) {
		for (var n = 0; n < nga_plug_mojo[m].data.length; n++) {
			try {
				for (var i = 0; i < nga_edit_mojo_check.data.length; i++) {
					if (nga_edit_mojo_check.data[i].autoor == nga_plug_mojo[m].autoor) {
						for (var k = 0; k < nga_edit_mojo_check.data[i].data.length; k++) {
							if (nga_edit_mojo_check.data[i].data[k].id == nga_plug_mojo[m].data[n].id)
								nga_plug_mojo[m].data[n].check = nga_edit_mojo_check.data[i].data[k].check;
						}
					}
				}
			} catch (e) {}
		}
	}
}

//加载表情设置选项
function nga_edit_getmojocheckhtml() {
	nga_edit_setallmojocheck();
	var s = '<input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="重新加载设置界面">';
	for (var i = 1; i < nga_plug_mojo.length; i++) {
		s += '<div style="margin-top:10px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">表情作者：' + nga_plug_mojo[i].autoor + '</span></div>';
		for (var k = 0; k < nga_plug_mojo[i].data.length; k++) {
			s += '<table class="nga_plug_plugcon"><tbody><tr><td><input onclick="nga_edit_setmojocheck(\'' + nga_plug_mojo[i].autoor + '\',\'' + nga_plug_mojo[i].data[k].id + '\',this.checked)" name="check" type="checkbox" ' + c(nga_plug_mojo[i].data[k].check) + ' title="是否启用该表情">是否启用表情：' + nga_plug_mojo[i].data[k].title + '</td></tr></tbody></table>';
		}
	}
	return s;
	function c(p) {
		if (p)
			return "checked";
		else
			return "";
	}

}

//设置并保存表情开启状态
function nga_edit_setmojocheck(autoor, id, check) {
	var hautoor = false;
	var hid = false;
	if (typeof(nga_edit_mojo_check.data) == "object") {
		for (var i = 0; i < nga_edit_mojo_check.data.length; i++) {
			if (nga_edit_mojo_check.data[i].autoor == autoor) {
				hautoor = true;
				if (typeof(nga_edit_mojo_check.data[i].data) == "object") {
					for (var k = 0; k < nga_edit_mojo_check.data[i].data.length; k++) {
						if (nga_edit_mojo_check.data[i].data[k].id == id) {
							hid = true;
							nga_edit_mojo_check.data[i].data[k].check = check;
							nga_edit_mojo_check.save();
						}
					}
				} else {
					nga_edit_mojo_check.data[i].data = [];
				}
				if (!hid) {
					nga_edit_mojo_check.data[i].data.push({
						id : id,
						check : check
					});
					nga_edit_mojo_check.save();
				}
			}
		}
	} else {
		nga_edit_mojo_check.data = [];
	}
	if (!hautoor) {
		nga_edit_mojo_check.data.push({
			autoor : autoor,
			data : [{
					id : id,
					check : check
				}
			]
		});
		nga_edit_mojo_check.save();
	}
	nga_edit_setallmojocheck();
	//function c(autoor,)
}
//postfunc.content.value.length  //帖子长度

//撤销重做之定时保存数据
function nga_edit_setshot(act) {
	if (act == "up") {
		try {
			clearTimeout(nga_edit_timer);
		} catch (e) {};
		nga_edit_timer = setTimeout(nga_edit_settmpshot, 1500);
	} else if (act == "down") {
		try {
			clearTimeout(nga_edit_timer);
		} catch (e) {};
	}
}
function nga_edit_settmpshot() { //保存数据
	if (nga_edit_tmpshot.length - nga_edit_tmpshot_i < 2) {
		if (nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != '') {
			nga_edit_tmpshot.push(document.getElementById('atc_content').value);
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			if (nga_edit_tmpshot.length > 1)
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"), true);
		}
	} else {
		if (nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != '') {
			nga_edit_tmpshot[nga_edit_tmpshot_i + 1] = document.getElementById('atc_content').value;
			nga_edit_tmpshot.length = nga_edit_tmpshot_i + 2;
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"), false);
			if (nga_edit_tmpshot.length > 1)
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"), true);
		}
	}
}

//构建TAB内容
function nga_edit_gettabhtml() {
	var t_html = "";
	t_html += '<div class="nga_edui_box">';
	t_html += ' <div class="nga_edui_box1">';
	t_html += '   <div id="nga_edit_icon_chexiao" onclick="nga_edit_icon_click(this,\'chexiao\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="撤销一次操作" class="nga_edui_icon nga_edui_chexiao nga_edui_disabled"></div>';
	t_html += '   <div id="nga_edit_icon_huifu" onclick="nga_edit_icon_click(this,\'huifu\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="重做一次操作" class="nga_edui_icon nga_edui_huifu nga_edui_disabled"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div id="nga_edit_icon_mojo" onclick="event.cancelBubble = true;nga_edit_icon_click(this,\'mojo\');" onmouseover="nga_edit_icon_hover(this,\'move\');var td = document.getElementById(\'nga_edit_quickmojo\');td.style.display = \'block\';td.style.left = nga_plug_elementLeft(this) + 1 + \'px\';td.style.top = nga_plug_elementTop(this) + 23 + \'px\';try{clearTimeout(nga_edit_timer_lists);}catch(e){};" onmouseout="nga_edit_icon_hover(this,\'out\',\'quickmojo\');" title="表情" class="nga_edui_icon nga_edui_mojo">\
								<div id="nga_edit_quickmojo" style="display:none;position : absolute;background-color:#FFF8E5;cursor :default;width:132px;border: 1px solid #777;z-index:3;">'
	for (var i = 0; i < nga_edit_quick_mojo.data.length; i++) {
		//for (var i=0;i<9;i++){
		t_html += '<img onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,event,\'quick\');" style="border:1px solid #777;margin:1px;cursor:pointer;width:40px;height:40px;" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);" alt="' + nga_edit_quick_mojo.data[i] + '" src="' + nga_edit_quick_mojo.data[i] + '">';
	}
	t_html += '		</div></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'B\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="粗体" class="nga_edui_icon nga_edui_fb"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'I\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="斜体" class="nga_edui_icon nga_edui_fi"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'U\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="下划线" class="nga_edui_icon nga_edui_fu"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'DEL\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="删除线" class="nga_edui_icon nga_edui_fd"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'left\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="左对齐" class="nga_edui_icon nga_edui_l"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'center\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="中对齐" class="nga_edui_icon nga_edui_b"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'right\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="右对齐" class="nga_edui_icon nga_edui_r"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'l\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="左浮动" class="nga_edui_icon nga_edui_fl"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'r\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="右浮动" class="nga_edui_icon nga_edui_fr"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'h\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="段落标题" class="nga_edui_icon nga_edui_h"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'roll\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="投骰子" class="nga_edui_icon nga_edui_roll"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'msg\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="发送提醒" class="nga_edui_icon nga_edui_msg"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'t\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="发送178尾巴" class="nga_edui_icon nga_edui_t"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'pse\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入折叠的内容" class="nga_edui_icon nga_edui_pse"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'link\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入链接" class="nga_edui_icon nga_edui_link"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'img\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入图片" class="nga_edui_icon nga_edui_img"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'album\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入相册" class="nga_edui_icon nga_edui_album"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'flash\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入视频（仅限于youtube.com/tudou.com/youku.com等站点）" class="nga_edui_icon nga_edui_flash"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'heng\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入分割线" class="nga_edui_icon nga_edui_heng"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'quote\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入引用" class="nga_edui_icon nga_edui_quote"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'code\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入代码" class="nga_edui_icon nga_edui_code"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'lists\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入无序列表" class="nga_edui_icon nga_edui_lists"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'listsa\');" onmouseover="nga_edit_icon_hover(this,\'move\',\'option\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入有序列表" class="nga_edui_icon nga_edui_listsa">\
								<div id="nga_edit_listselectdiv" style="display:none;position : absolute;background-color:#FFF8E5;cursor :default;width:120px;border: 1px solid #777;" onmouseover="nga_edit_icon_hover(this,\'move\',\'option\');" onmouseout="nga_edit_icon_hover(this.parentNode,\'out\',\'option\');">\
									<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'1\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为1,2,3的列表">1,2,3</div>\
									<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'a\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为a,b,c的列表">a,b,c</div>\
									<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'A\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为A,B,C的列表">A,B,C</div>\
									<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'i\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为i,ii,iii的列表">i,ii,iii</div>\
									<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'I\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为I,II,III的列表">I,II,III</div>\
								</div></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'table\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入表格" class="nga_edui_icon nga_edui_table"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'tid\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入主题" class="nga_edui_icon nga_edui_tid"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'pid\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入回复" class="nga_edui_icon nga_edui_pid"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'customachieve\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入自定义成就" class="nga_edui_icon nga_edui_customachieve"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'db3\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入Diablo3人物信息" class="nga_edui_icon nga_edui_db3"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'crypt\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入加密的内容" class="nga_edui_icon nga_edui_crypt"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'randomblock\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入随机段落" class="nga_edui_icon nga_edui_randomblock"></div>';
	t_html += ' </div>';
	t_html += ' <div class="nga_edui_box1">';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'font\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">字体</option>';
	t_html += '		<option value="simsun">宋体</option>';
	t_html += '		<option value="simhei">黑体</option>';
	t_html += '		<option value="Arial">Arial</option>';
	t_html += '		<option value="Arial Black">Arial Black</option>';
	t_html += '		<option value="Book Antiqua">Book Antiqua</option>';
	t_html += '		<option value="Century Gothic">Century Gothic</option>';
	t_html += '		<option value="Comic Sans MS">Comic Sans MS</option>';
	t_html += '		<option value="Courier New">Courier New</option>';
	t_html += '		<option value="Georgia">Georgia</option>';
	t_html += '		<option value="Impact">Impact</option>';
	t_html += '		<option value="Tahoma">Tahoma</option>';
	t_html += '		<option value="Times New Roman">Times New Roman</option>';
	t_html += '		<option value="Trebuchet MS">Trebuchet MS</option>';
	t_html += '		<option value="Script MT Bold">Script MT Bold</option>';
	t_html += '		<option value="Stencil">Stencil</option>';
	t_html += '		<option value="Verdana">Verdana</option>';
	t_html += '		<option value="Lucida Console">Lucida Console</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'size\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">字号</option>';
	t_html += '		<option value="100%">100%</option>';
	t_html += '		<option value="110%">110%</option>';
	t_html += '		<option value="120%">120%</option>';
	t_html += '		<option value="130%">130%</option>';
	t_html += '		<option value="150%">150%</option>';
	t_html += '		<option value="200%">200%</option>';
	t_html += '		<option value="300%">300%</option>';
	t_html += '		<option value="400%">400%</option>';
	t_html += '		<option value="500%">500%</option>';
	t_html += '		<option value="700%">700%</option>';
	t_html += '		<option value="900%">900%</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'color\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">颜色</option>';
	t_html += '		<option value="skyblue" style="background-color:skyblue">&nbsp; &nbsp; &nbsp; &nbsp;</option>';
	t_html += '		<option value="royalblue" style="background-color:royalblue;"></option>';
	t_html += '		<option value="blue" style="background-color:blue"></option>';
	t_html += '		<option value="darkblue" style="background-color:darkblue"></option>';
	t_html += '		<option value="orange" style="background-color:orange"></option>';
	t_html += '		<option value="orangered" style="background-color:orangered"></option>';
	t_html += '		<option value="crimson" style="background-color:crimson"></option>';
	t_html += '		<option value="red" style="background-color:red"></option>';
	t_html += '		<option value="firebrick" style="background-color:firebrick"></option>';
	t_html += '		<option value="darkred" style="background-color:darkred"></option>';
	t_html += '		<option value="green" style="background-color:green"></option>';
	t_html += '		<option value="limegreen" style="background-color:limegreen"></option>';
	t_html += '		<option value="seagreen" style="background-color:seagreen"></option>';
	t_html += '		<option value="teal" style="background-color:teal"></option>';
	t_html += '		<option value="deeppink" style="background-color:deeppink"></option>';
	t_html += '		<option value="tomato" style="background-color:tomato"></option>';
	t_html += '		<option value="coral" style="background-color:coral"></option>';
	t_html += '		<option value="purple" style="background-color:purple"></option>';
	t_html += '		<option value="indigo" style="background-color:indigo"></option>';
	t_html += '		<option value="burlywood" style="background-color:burlywood"></option>';
	t_html += '		<option value="sandybrown" style="background-color:sandybrown"></option>';
	t_html += '		<option value="sienna" style="background-color:sienna"></option>';
	t_html += '		<option value="chocolate" style="background-color:chocolate"></option>';
	t_html += '		<option value="silver" style="background-color:silver"></option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'armory\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽人物</option>';
	t_html += '		<option value="cn">国服人物</option>';
	t_html += '		<option value="tw">台服人物</option>';
	t_html += '		<option value="en">美服人物</option>';
	t_html += '		<option value="eu">欧盟人物</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'item\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽装备</option>';
	t_html += '		<option value="cn">国服装备</option>';
	t_html += '		<option value="tw">台服装备</option>';
	t_html += '		<option value="en">美服装备</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'achieve\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽成就</option>';
	t_html += '		<option value="cn">国服成就</option>';
	t_html += '		<option value="tw">台服成就</option>';
	t_html += '		<option value="en">美服成就</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'spell\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽法术</option>';
	t_html += '		<option value="cn">国服法术</option>';
	t_html += '		<option value="tw">台服法术</option>';
	t_html += '		<option value="en">美服法术</option>';
	t_html += '	</select>';
	t_html += ' </div>';
	t_html += '</div>';

	var x = new nga_plug_tab();
	x.add("源码", '<div id="nga_edit_content">' + t_html + '</div>');
	x.add("编辑", '<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_edit" contenteditable="true" class="c1 postcontent ubbcode" style="outline:none;margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');
	x.add("预览", '<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_preview" class="c1 postcontent ubbcode" style="margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');

	t_html = x.gethtml();

	t_html += '<input type="checkbox" name="hidden">隐藏内容 仅版主可见 <input type="checkbox" name="self_reply">只有作者和版主可以回复<br>';
	return t_html;
}

//在大部分浏览器中实现在选中文字前后插入UBB标签后依然选中原来的文字（如无选中则保证添加完毕后光标处于添加的标签中间）
//textarea可以用getElementById之类函数获取的textarea，tag是标签，如'b'将添加[b]，如有value则添加[b=value]
function nga_edit_addTad(textarea, tag, value) {
	var start = 0,
	end = 0;
	if (typeof textarea.selectionStart != 'undefined') {
		start = textarea.selectionStart;
		end = textarea.selectionEnd;
	}
	if (value && tag != "nga_edit") {
		start += tag.length + value.length + 3;
		end += tag.length + value.length + 3;
		//postfunc.addTag(tag,value);   //http://img4.ngacn.cc/common_res/js_postcode.js
		postfunc.addText("[" + tag + "=" + value + "]" + postfunc.getSelectText() + "[/" + tag + "]");
	} else {
		if (tag == "nga_edit") {
			if (value == "@") {
				start += 2;
				end += 2;
				postfunc.addText("[@" + postfunc.getSelectText() + "]");
			}
		} else {
			start += tag.length + 2;
			end += tag.length + 2;
			//postfunc.addTag(tag);
			postfunc.addText("[" + tag + "]" + postfunc.getSelectText() + "[/" + tag + "]");
		}
	}
	if (typeof textarea.selectionStart != 'undefined') {
		textarea.setSelectionRange(start, end);
		textarea.focus();
	}
}

function nga_edit_icon_show(obj, act, value) {
	var textarea = document.getElementById('atc_content');
	if (act == "size" || act == "font" || act == "color") {
		nga_edit_addTad(textarea, act, value);
	} else if (act == "armory") {
		var nga_edit_s = nga_edit_prompt("请输入服务器名：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入玩家名：");
		if (nga_edit_s1 == "")
			return (obj.selectedIndex = 0);
		postfunc.addText("[" + value + act + " " + nga_edit_s + " " + nga_edit_s1 + "]");
	} else if (act == "item" || act == "achieve" || act == "spell") {
		var nga_edit_s = nga_edit_prompt("请输入 物品/成就 名称或者 物品/成就/法术 ID：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)) {
			if (act == "spell")
				return (obj.selectedIndex = 0);
			value = value == "cn" ? "[" + act + "]" : "[" + act + "=" + value + "]";
			postfunc.addText(value + nga_edit_s + "[/" + act + "]");
		} else {
			var nga_edit_s1 = nga_edit_prompt("请输入自定义 物品/成就/法术 名称（可不输）：");
			if (nga_edit_s1 == "") {
				value = value == "cn" ? "[" + act + "]" : "[" + act + "=" + value + "]";
				postfunc.addText(value + nga_edit_s + "[/" + act + "]");
			} else {
				value = value == "cn" ? "[" + act + "=" + nga_edit_s + "]" : "[" + act + "=" + nga_edit_s + "," + value + "]";
				postfunc.addText(value + nga_edit_s1 + "[/" + act + "]");
			}
		}
	}
	obj.selectedIndex = 0;
	nga_edit_settmpshot()
	try {
		textarea.focus();
	} catch (e) {};
}

function nga_edit_icon_click(obj, act, o) {
	var textarea = document.getElementById('atc_content');
	if (act == 'chexiao') { //撤销
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_chexiao"))) {
			nga_edit_tmpshot_i--;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"), true);
			if (nga_edit_tmpshot_i == 0) {
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"), false);
			}
		}
	} else if (act == 'huifu') { //重做
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_huifu"))) {
			nga_edit_tmpshot_i++;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"), true);
			if (nga_edit_tmpshot_i == nga_edit_tmpshot.length - 1) {
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"), false);
			}
		}

		//              粗体          斜体           下划线        删除线         左浮动        右浮动      标题
	} else if (act == 'B' || act == 'I' || act == 'U' || act == 'DEL' || act == 'l' || act == 'r' || act == 'h') {
		nga_edit_addTad(textarea, act);
	} else if (act == 'left' || act == 'center' || act == 'right') { //居于左中右
		nga_edit_addTad(textarea, "align", act);
	} else if (act == 'roll') { //ROLL点
		postfunc.addText("[dice]d100[/dice]");
	} else if (act == 'msg') { //打黑枪
		if (postfunc.getSelectText() == "") {
			var nga_edit_s = nga_edit_prompt("你要给谁发送提醒？");
			if (nga_edit_s != "") {
				postfunc.addText("[@" + nga_edit_s + "]");
			}
		} else {
			nga_edit_addTad(textarea, "nga_edit", "@");
		}
	} else if (act == 'pse') { //插入折叠内容
		if (postfunc.getSelectText() != "") {
			var nga_edit_s = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s != "") {
				nga_edit_addTad(textarea, "collapse", nga_edit_s);
			} else {
				nga_edit_addTad(textarea, "collapse");
			}
		} else {
			var nga_edit_s = nga_edit_prompt("请输入需要折叠的内容：");
			if (nga_edit_s == "")
				return;
			var nga_edit_s1 = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s1 != "") {
				postfunc.addText("[collapse=" + nga_edit_s1 + "]" + nga_edit_s + "[/collapse]");
			} else {
				postfunc.addText("[collapse]" + nga_edit_s + "[/collapse]");
			}
		}
	} else if (act == 'link') { //插入链接
		if (postfunc.getSelectText() != "") {
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s != "") {
				nga_edit_addTad(textarea, "url", nga_edit_s);
			}
		} else {
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s == "")
				return;
			var nga_edit_s1 = nga_edit_prompt("请输入链接文字（可不填）：");
			if (nga_edit_s1 != "") {
				postfunc.addText("[url=" + nga_edit_s + "]" + nga_edit_s1 + "[/url]");
			} else {
				postfunc.addText("[url]" + nga_edit_s + "[/url]");
			}
		}
	} else if (act == 'img') { //插入图片
		var nga_edit_s = nga_edit_prompt("请输入图片地址：");
		if (nga_edit_s == "")
			return;
		postfunc.addText("[img]" + nga_edit_s + "[/img]");
	} else if (act == 'flash') { //插入视频
		var nga_edit_s = nga_edit_prompt("请输入视频地址（仅限于youtube.com/tudou.com/youku.com等站点的FLASH地址）：");
		if (nga_edit_s == "")
			return;
		postfunc.addText("[flash]" + nga_edit_s + "[/flash]");
	} else if (act == 'heng') { //插入分割线
		var nga_edit_s = nga_edit_prompt("请输入分割线标题（可不填）：");
		postfunc.addText("===" + nga_edit_s + "===");
	} else if (act == 'quote') { //插入引用
		if (postfunc.getSelectText() != "") {
			nga_edit_addTad(textarea, "quote");
		} else {
			var nga_edit_s = nga_edit_prompt("请输入引用内容：");
			if (nga_edit_s == "")
				return;
			postfunc.addText("[quote]" + nga_edit_s + "[/quote]");
		}
	} else if (act == 'code') { //插入代码
		if (postfunc.getSelectText() != "") {
			nga_edit_addTad(textarea, "code");
		} else {
			var nga_edit_s = nga_edit_prompt("请输入代码内容：");
			if (nga_edit_s == "")
				return;
			postfunc.addText("[code]" + nga_edit_s + "[/code]");
		}
	} else if (act == 'lists') { //插入列表
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s != "") {
			nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
			if (nga_edit_s != "") {
				if (t == 0) {
					nga_edit_addTad(textarea, "list");
					t = 1;
				}
				postfunc.addText("[*]" + nga_edit_s + "\n");
			} else {
				return;
			}
		}
	} else if (act == 'listsa') {
		if (!o) {
			document.getElementById("nga_edit_listselectdiv").style.display = document.getElementById("nga_edit_listselectdiv").style.display == "none" ? "block" : "none";
			document.getElementById("nga_edit_listselectdiv").style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById("nga_edit_listselectdiv").style.top = nga_plug_elementTop(obj) + 23 + 'px';
		} else {
			var nga_edit_s;
			var t = 0;
			while (nga_edit_s != "") {
				nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
				if (nga_edit_s != "") {
					if (t == 0) {
						nga_edit_addTad(textarea, "list", o);
						t = 1;
					}
					postfunc.addText("[*]" + nga_edit_s + "\n");
				} else {
					return;
				}
			}
		}
	} else if (act == 'album') { //插入相册
		var nga_edit_s;
		var t = 0;
		nga_edit_s = nga_edit_prompt("请输入相册标题。");
		nga_edit_s = nga_edit_s == "" ? null : nga_edit_s;
		//nga_edit_addTad(textarea,"album",nga_edit_s);
		while (nga_edit_s != "") {
			nga_edit_s = nga_edit_prompt("请输入一个图片地址。\n第一张图片将作为封面显示。\n留空或者点击取消以完成此相册：");
			//if (nga_edit_s!="")postfunc.addText(nga_edit_s+"\n");
			if (nga_edit_s != "") {
				if (t == 0) {
					nga_edit_addTad(textarea, "album", nga_edit_s);
					t = 1;
				}
				postfunc.addText(nga_edit_s + "\n");
			} else {
				return;
			}
		}
	} else if (act == 't') { //插入178尾巴
		var nga_edit_s = nga_edit_prompt("请输入用户ID（数字）以引用这个用户的最新一条消息，或者输入话题（非数字）以引用这个话题的讨论：");
		if (nga_edit_s == "")
			return;
		if (isNaN(nga_edit_s)) {
			postfunc.addText("[t.178.com/#" + nga_edit_s + "#]");
		} else {
			postfunc.addText("[t.178.com/" + nga_edit_s + "]");
		}
	} else if (act == "tid" || act == "pid") {
		var nga_edit_s = nga_edit_prompt("请输入主题或者或者回复的ID：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)) {
			return (obj.selectedIndex = 0);
		} else {
			var nga_edit_s1 = nga_edit_prompt("请输入主题名称（可不输）：");
			if (nga_edit_s1 == "") {
				postfunc.addText("[" + act + "]" + nga_edit_s + "[/" + act + "]");
			} else {
				postfunc.addText("[" + act + "=" + nga_edit_s + "]" + nga_edit_s1 + "[/" + act + "]");
			}
		}
	} else if (act == "customachieve") {
		var nga_edit_s = nga_edit_prompt("请输入自定义成就名字（有字数限制）：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入自定义成就文字（有字数限制）：");
		if (nga_edit_s1 == "")
			return (obj.selectedIndex = 0);
		var nga_edit_s2 = nga_edit_prompt("请输入自定义成就图标（一个图片的绝地地址）：")
			var tmps = "[customachieve]\n[title]" + nga_edit_s + "[/title]\n[txt]" + nga_edit_s1 + "[/txt]\n";
		if (nga_edit_s2 != "")
			tmps += "[img]" + nga_edit_s2 + "[/img]\n";
		tmps += "[/customachieve]";
		postfunc.addText(tmps);
	} else if (act == "db3") {
		var nga_edit_s = nga_edit_prompt("请输入battle net中人物信息页面的地址：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		postfunc.addText("[url]" + nga_edit_s + "#armory[/url]");
	} else if (act == "crypt") {
		var nga_edit_s = nga_edit_prompt("请输入需要加密的内容：");
		if (nga_edit_s == "")
			return (obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入密码：");
		if (nga_edit_s1 == "")
			return (obj.selectedIndex = 0);
		if (nga_edit_s1.length < 5) {
			alert('请使用更长的密码')
			return (obj.selectedIndex = 0);
		}
		if (nga_edit_s1.match(/[^0-9A-Za-z_]/)) {
			alert('请使用大小写字母或数字做密码');
			return (obj.selectedIndex = 0);
		}
		postfunc.addText("[crypt]" + ubbcode.crypt.c(ubbcode.crypt.rc4(nga_edit_s1, nga_edit_s)) + "[/crypt]");
	} else if (act == "table") {
		nga_edit_table("create", "", obj);
	} else if (act == "mojo") {
		document.getElementById("nga_edit_quickmojo").style.display = "none";
		nga_edit_mojo("create", obj);
	} else if (act == "randomblock") {
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s != "") {
			nga_edit_s = nga_edit_prompt("请输入随机项目内容，换行使用“\\n”或者添加完后手动换行。\n\n留空或者点击取消以完成此列表：");
			//nga_edit_addTad(textarea,"randomblock",nga_edit_s);
			if (nga_edit_s != "")
				postfunc.addText("[" + act + "]" + nga_edit_s + "[/" + act + "]\n");
		}
	}
	if (act != 'huifu' && act != 'chexiao')
		nga_edit_settmpshot();
	try {
		document.getElementById('atc_content').focus();
	} catch (e) {};
}

//表情模块  创建选择表情窗口、预览、点击
function nga_edit_mojo(act, obj, e, autoor, id) {
	if (act == "create") {
		nga_edit_setallmojocheck();
		if (document.getElementById('nga_edit_mojo')) {
			document.getElementById('nga_edit_mojo').style.display = document.getElementById('nga_edit_mojo').style.display == "block" ? "none" : "block";
			document.getElementById('nga_edit_mojo').style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById('nga_edit_mojo').style.top = nga_plug_elementTop(obj) + 23 + 'px';
		} else {
			var tmpdiv = document.createElement("div");
			tmpdiv.id = "nga_edit_mojo";
			tmpdiv.className = "nga_edit_table";
			tmpdiv.style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			tmpdiv.style.top = nga_plug_elementTop(obj) + 23 + 'px';
			tmpdiv.innerHTML = '<div style="padding:4px;">\
																<div style="width:100%;border-bottom:1px solid #777;">请选择表情  提示：按住CTRL键的同时点击表情可一次插入多个表情\
																<span style="float:right"><a href="javascript:void(0)" onclick="document.body.removeChild(document.getElementById(\'nga_edit_mojo\'));nga_edit_mojo(\'create\',document.getElementById(\'nga_edit_icon_mojo\'));">重载</a> <a href="javascript:void(0)" onclick="nga_edit_mojo(\'create\');">关闭</a></span></div>\
																<div id="nga_edit_mojo_b"></div></div>'
				document.body.appendChild(tmpdiv);
			nga_plug_HideDomOfClick('nga_edit_mojo');
			document.getElementById('nga_edit_mojo').style.display = "block";
			var x = new nga_plug_tab();
			var s;
			for (var i = 0; i < nga_plug_mojo.length; i++) {
				for (var k = 0; k < nga_plug_mojo[i].data.length; k++) {
					if (nga_plug_mojo[i].data[k].check) {
						s = "";
						for (var l = 0; l < nga_plug_mojo[i].data[k].img.length; l++) {
							s += '<div style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,event,\'' + nga_plug_mojo[i].autoor + '\',\'' + nga_plug_mojo[i].data[k].id + '\');" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);">';
							if (!nga_plug_mojo[i].data[k].alt || nga_plug_mojo[i].data[k].alt.length <= l) {
								s += '<img style="width:40px;height:40px;" alt="' + (nga_plug_mojo[i].data[k].img[l]) + '" src="' + nga_plug_mojo[i].data[k].img[l] + '"></div>';
							} else {
								s += '<img style="width:40px;height:40px;" alt="' + (nga_plug_mojo[i].data[k].alt[l]) + '" src="' + nga_plug_mojo[i].data[k].img[l] + '"></div>';
							}
						}
						var t = false;
						try {
							if ("acniang" == nga_plug_mojo[i].data[k].id)
								t = true;
						} catch (e) {}
						x.add(nga_plug_mojo[i].data[k].title, s, t);
					}
				}
			}
			for (var k = 0; k < nga_edit_system_mojo.data.length; k++) {
				s = "";
				for (var l = 0; l < nga_edit_system_mojo.data[k].img.length; l++) {
					s += '<div style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,event,\'' + nga_edit_system_mojo.autoor + '\',\'' + nga_edit_system_mojo.data[k].id + '\');" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);">';
					s += '<img style="width:40px;height:40px;" alt="' + (nga_edit_system_mojo.data[k].alt[l]) + '" src="' + nga_edit_system_mojo.data[k].img[l] + '"></div>';
				}
				var t = false;
				x.add(nga_edit_system_mojo.data[k].title, s, t);
			}
			document.getElementById("nga_edit_mojo_b").innerHTML = x.gethtml();
		}
	} else if (act == "click") {
		//点击表情
		if (e == "add") { //添加自定义表情
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].src;
			for (var i = 0; i < nga_edit_custom_mojo.data[0].img.length; i++) {
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == tsrc.toLowerCase()) {
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(tsrc);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		} else if (e == "add1") { //手动输入网址添加自定义表情
			var nga_edit_s = nga_edit_prompt("请输入想添加的自定义表情网址：");
			if (nga_edit_s == "")
				return;
			for (var i = 0; i < nga_edit_custom_mojo.data[0].img.length; i++) {
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == nga_edit_s.toLowerCase()) {
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(nga_edit_s);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		} else if (e == "del") { //删除自定义表情
			if (!confirm("确定要删除这个表情吗？")) {
				return;
			}
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].alt;
			for (var i = 0; i < nga_edit_custom_mojo.data[0].img.length; i++) {
				if (nga_edit_custom_mojo.data[0].img[i] == tsrc) {
					nga_edit_custom_mojo.data[0].img.splice(i, 1);
					nga_edit_custom_mojo.save();
					obj.parentNode.parentNode.removeChild(obj.parentNode);
					document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';
					nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
					return;
				}
			}
		}
		if (obj.tagName.toLowerCase() == "div")
			obj = obj.getElementsByTagName("img")[0]
				if (obj.src != obj.alt) {
					postfunc.addsmile('[' + obj.alt + ']');
				} else {
					postfunc.addsmile('[img]' + obj.src + '[/img]');
				}
				if (!e.ctrlKey && autoor != "quick")
					nga_edit_mojo("create");
				var isquickmojo = false;

		//快速表情
		for (var i = 0; i < nga_edit_quick_mojo.data.length; i++) {
			if (nga_edit_quick_mojo.data[i] == obj.alt || nga_edit_quick_mojo.data[i] == obj.src)
				isquickmojo = true;

		}
		if (!isquickmojo) {
			var tsrc;
			if (autoor == "NGA" || obj.src!=obj.alt) {
				tsrc = obj.src;
			} else {
				tsrc = obj.alt;
			}
			if (nga_edit_quick_mojo.data.length < 9) {
				nga_edit_quick_mojo.data.push(tsrc);
			} else {
				for (var i = 0; i < nga_edit_quick_mojo.data.length - 1; i++) {
					nga_edit_quick_mojo.data[i] = nga_edit_quick_mojo.data[i + 1];
				}
				nga_edit_quick_mojo.data[8] = tsrc;
			}
			nga_edit_quick_mojo.save();
		} //快速表情完毕

		nga_edit_settmpshot();
		if (autoor != "quick") {
			if (nga_edit_mojo_check.data.length == 0) {
				nga_edit_mojo_check.data.push({
					lastautoor : autoor,
					id : id
				});
			} else {
				if (nga_edit_mojo_check.data[0].id) {
					nga_edit_mojo_check.data[0] = {
						lastautoor : autoor,
						id : id
					};
				} else {
					nga_edit_mojo_check.data.unshift({
						lastautoor : autoor,
						id : id
					});
				}
			}
			nga_edit_mojo_check.save();
		}
	} else if (act == "over") {
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try {
			clearTimeout(timer);
		} catch (e) {};
		try {
			obj.getElementsByTagName("div")[0].style.display = 'block';
		} catch (e) {};
		var tsrc;
		if (obj.tagName.toLowerCase() == "div")
			tsrc = obj.getElementsByTagName("img")[0].src;
		else
			tsrc = obj.src;
		previewdiv.innerHTML = "<img style='margin: 5px' src='" + tsrc + "' \/>";
		previewdiv.style.display = 'block';
		previewdiv.style.left = nga_plug_elementLeft(obj) + 1 + 'px';
		previewdiv.style.top = nga_plug_elementTop(obj) + 44 + 'px';
	} else if (act == "out") {
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try {
			obj.getElementsByTagName("div")[0].style.display = 'none';
		} catch (e) {};
		timer = setTimeout("document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';", 500);
	}
}

var nga_edit_table_o = new Array();
function nga_edit_table(act, value, obj) {
	if (act == "create") {
		if (document.getElementById('nga_edit_table')) {
			document.body.removeChild(document.getElementById('nga_edit_table'));
		} else {
			var tmpdiv = document.createElement("div");
			tmpdiv.id = "nga_edit_table";
			tmpdiv.className = "nga_edit_table";
			tmpdiv.style.left = nga_plug_elementLeft(obj.parentNode.getElementsByTagName("div")[0]) + 1 + 'px';
			tmpdiv.style.top = nga_plug_elementTop(obj) + 23 + 'px';
			tmpdiv.innerHTML = "<div style='padding:5px;'>\
																<button onclick='nga_edit_table(\"add\");'>确定</button>  <button onclick='nga_edit_table(\"create\");'>取消</button><br>\
																行数：<input type='text' onchange='nga_edit_table(\"check\",this.value,this)' value=2> \
																列数：<input type='text' onchange='nga_edit_table(\"check\")' value=2>  \
																<button onclick='nga_edit_table(\"adv\");this.innerHTML = \"重制\"'>高级</button> 提示：高级中的合并单元格功能可能导致表格混乱。\
																<div id='nga_edit_table_b' class='forumbox' style='width:880;display:none;'></div></div>"
				document.body.appendChild(tmpdiv);
		}
	} else if (act == "check") {
		try {
			if (isNaN(value))
				obj.value = 0;
			if (parseInt(value) < 0)
				obj.value = 0;
			if (parseInt(value) > 30)
				obj.value = 30;
		} catch (e) {};
	} else if (act == "arr") {
		SetArrs(obj.parentNode.rowIndex, obj.cellIndex, value, obj.getElementsByTagName('input')[0].value);
		SetUBB();
	} else if (act == "adv") {
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		SetArr(r1, c1);
		divs.style.display = "block";
		SetUBB();
	} else if (act == "add") {
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		if (nga_edit_table_o.length == 0)
			SetArr(r1, c1);
		var tables = document.getElementById('nga_edit_table_b').getElementsByTagName("table")[0];
		postfunc.addText(GetUBB());
		nga_edit_table("create");
		nga_edit_table_o = new Array();
	} else if (act == "txt") {
		nga_edit_table_o[obj.parentNode.rowIndex][obj.cellIndex].t = value;
	}

	function SetArr(r, c) {
		nga_edit_table_o = new Array(r);
		for (var i = 0; i < r; i++) {
			nga_edit_table_o[i] = new Array(c);
			for (var k = 0; k < c; k++) {
				nga_edit_table_o[i][k] = {};
			}
		}
	}
	function SetArrs(m, n, a, s) {
		nga_edit_table_o[m] = nga_edit_table_o[m] || [];
		if (a == "r") {
			if (nga_edit_table_o[m][n].r) {
				nga_edit_table_o[m][n].r += 1;
			} else {
				nga_edit_table_o[m][n].r = 2;
			}
			for (var j = m + nga_edit_table_o[m][n].r - 1; j > m; j--) { //1
				for (var k = nga_edit_table_o[j].length - 1; k >= 0; k--) { //1-0
					if (nga_edit_table_o[j][k].no == null || nga_edit_table_o[j][k].no) {
						var tc = nga_edit_table_o[m][n].c == null ? 1 : nga_edit_table_o[m][n].c; //1
						for (var l = k; l > k - tc; l--)
							nga_edit_table_o[j][l].no = true;
						return;
					}
				}

			}
		} else if (a == "c") {
			if (nga_edit_table_o[m][n].c) {
				nga_edit_table_o[m][n].c += 1;
			} else {
				nga_edit_table_o[m][n].c = 2;
			}
			for (var k = nga_edit_table_o[m].length - 1; k >= 0; k--) {
				if (nga_edit_table_o[m][k].no == null || nga_edit_table_o[m][k].no) {
					for (var l = k; l > k - nga_edit_table_o[m][n].c + 1; l--)
						nga_edit_table_o[m][l].no = true;
					return;
				}
			}
		} else if (a == "w") {
			var nga_edit_s = nga_edit_prompt("请输入这个列的宽度（0-99之内的数字，表示这个列的宽度为百分之多少，0表示自动款速）：");
			if (nga_edit_s == "")
				return;
			if (isNaN(nga_edit_s))
				return (alert("请输入1-99之间的数字！"));
			var i = parseInt(nga_edit_s);
			if (i < 0 || i > 99)
				return (alert("请输入1-99之间的数字！"));
			nga_edit_table_o[m][n].w = i;
		}
	}
	function SetUBB() {
		var pretable = document.getElementById('nga_edit_table_b');
		pretable.innerHTML = GetUBB().replace(/\n/g, '<br>');
		ubbcode.bbsCode({
			c : pretable,
			tId : Math.floor(Math.random() * 10000),
			pId : Math.floor(Math.random() * 10000),
			authorId : __CURRENT_UID,
			rvrc : __GP['rvrc'],
			isLesser : __GP['lesser']
		});
		var tables = pretable.getElementsByTagName("table")[0];
		for (var i = 0; i < tables.rows.length; i++) {
			for (var k = 0; k < tables.rows[i].cells.length; k++) {
				tables.rows[i].cells[k].innerHTML = "<input style='width:80%' onchange='nga_edit_table(\"txt\",this.value,this.parentNode)' value='" + tables.rows[i].cells[k].innerHTML + "' />\
																				<a href='javascript:void(0)' title='向右合并' onclick='nga_edit_table(\"arr\",\"c\",this.parentNode)' class='right'>→</a> \
																				<a href='javascript:void(0)' title='向下合并' onclick='nga_edit_table(\"arr\",\"r\",this.parentNode)' class='right'>↓</a> \
																				<a href='javascript:void(0)' title='设置宽度' onclick='nga_edit_table(\"arr\",\"w\",this.parentNode)' class='right'>↔</a>";
			}
		}
	}
	function GetUBB() {
		var s = "[table]";
		for (var i = 0; i < nga_edit_table_o.length; i++) {
			s += "[tr]"
			for (var k = 0; k < nga_edit_table_o[i].length; k++) {
				if (!nga_edit_table_o[i][k].no) {
					s += "[td";
					if (nga_edit_table_o[i][k].w < 100 && nga_edit_table_o[i][k].w > 0)
						s += " width" + nga_edit_table_o[i][k].w;
					if (nga_edit_table_o[i][k].c)
						s += " colspan" + nga_edit_table_o[i][k].c;
					if (nga_edit_table_o[i][k].r)
						s += " rowspan" + nga_edit_table_o[i][k].r;
					s += "]";
					if (nga_edit_table_o[i][k].t)
						s += nga_edit_table_o[i][k].t;
					s += "[/td]";
				}
			}
			s += "[/tr]"
		}
		s += "[/table]"
		return s;
	}
}

function nga_edit_prompt(title) {
	var nga_edit_s = prompt(title);
	if (nga_edit_s == "" || nga_edit_s == null)
		return "";
	else
		return nga_edit_s;
}
//获取按钮是否被禁用
function nga_edit_icon_getEnabled(obj) {
	return obj.className.indexOf("nga_edui_disabled") >= 0 ? false : true
}

//禁用\启用按钮
function nga_edit_icon_setEnabled(obj, Enabled) {
	if (Enabled) {
		obj.className = obj.className.replace(" nga_edui_disabled", "");
	} else {
		obj.className = obj.className + " nga_edui_disabled";
		obj.style.border = "1px solid #FFF8E5";
	}
}

//鼠标移动时给按钮加上\去除边框
function nga_edit_icon_hover(div, act, o) {
	if (nga_edit_icon_getEnabled(div)) {
		if (act == "move") {
			div.style.border = "1px solid #777";
		} else if (act == "out") {
			div.style.border = "1px solid #FFF8E5";
		}
	}
	if (o == "option") {
		if (act == "out") {
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_listselectdiv").style.display = "none"', 500);
		} else if (act == "move") {
			try {
				clearTimeout(nga_edit_timer_lists);
			} catch (e) {};
		}
	} else if (o == "quickmojo") {
		if (act == "out") {
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_quickmojo").style.display = "none"', 500);
		} else if (act == "move") {
			try {
				clearTimeout(nga_edit_timer_lists);
			} catch (e) {};
		}
	}
}
