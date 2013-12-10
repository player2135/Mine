// ================================================================================
// NGA[艾泽拉斯国家地理论坛] 论坛增强插件   编辑框增强
// 作者：LinTx
// 版本：1.4
// ================================================================================

loader.css("http://ngaplug.googlecode.com/svn/ngaplug/editor/editor.css"); //加载CSS

var nga_edit_tmpshot = [];
var nga_edit_tmpshot_i = 0;
var nga_edit_mojo_check = new nga_plug_local_data("nga_edit_mojo_check");
var nga_edit_custom_mojo = new nga_plug_local_data("nga_edit_custom_mojo");
var nga_edit_quick_mojo = new nga_plug_local_data("nga_edit_quick_mojo");

function nga_edit_Initialization(){
	nga_plug_addmsg("nga_edit","NGA UBB编辑器插件","添加测试功能：所见即所得编辑，原“编辑”标签修改为“代码”标签，原“编辑”标签为所见即所得编辑模式。\n提示：1.部分代码暂不支持所见即所得模式（如code代码）这种类型的代码在所见即所得模式下依然显示源代码。\
	\n2.如在所见即所得编辑模式下编辑后造成代码错乱（部分换行消失不算）请在UBB（代码）模式下撤销至之前的内容即可，并请将之前的内容以code代码包含后发至交流贴以便修复BUG。");

	nga_edit_mojo_check.load();
	nga_edit_mojo_check.data = nga_edit_mojo_check.data || [];
	
	nga_edit_custom_mojo.load();
	nga_edit_custom_mojo.data = nga_edit_custom_mojo.data || [{title:"自定义",id:"custom",check:false,img:[]}];
	
	nga_edit_quick_mojo.load();
	nga_edit_quick_mojo.data = nga_edit_quick_mojo.data || [];
	
	nga_plug_mojo.unshift({autoor:"LinTx",data:nga_edit_custom_mojo.data})
	
	nga_plug_setting("add","表情开关设置","nga_edit_mojo_check");   //将表情开关设置加入统一导入导出设置
	nga_plug_setting("add","自定义表情","nga_edit_custom_mojo");   //将自定义表情加入统一导入导出设置
	nga_plug_setting("add","最后使用的表情","nga_edit_quick_mojo");   //将最后使用的表情加入统一导入导出设置
	var m = [{
		title:"系统",
		alt:["s:1","s:2","s:3","s:4","s:5","s:6","s:7","s:8","s:34","s:32","s:33","s:30","s:29","s:28","s:27","s:26","s:25","s:24","s:35","s:36","s:37","s:38","s:39","s:40","s:41","s:42","s:43"],
		img:["http://img4.ngacn.cc/ngabbs/post/smile/smile.gif","http://img4.ngacn.cc/ngabbs/post/smile/mrgreen.gif","http://img4.ngacn.cc/ngabbs/post/smile/question.gif","http://img4.ngacn.cc/ngabbs/post/smile/wink.gif","http://img4.ngacn.cc/ngabbs/post/smile/redface.gif","http://img4.ngacn.cc/ngabbs/post/smile/sad.gif","http://img4.ngacn.cc/ngabbs/post/smile/cool.gif","http://img4.ngacn.cc/ngabbs/post/smile/crazy.gif","http://img4.ngacn.cc/ngabbs/post/smile/14.gif","http://img4.ngacn.cc/ngabbs/post/smile/12.gif","http://img4.ngacn.cc/ngabbs/post/smile/13.gif","http://img4.ngacn.cc/ngabbs/post/smile/10.gif","http://img4.ngacn.cc/ngabbs/post/smile/09.gif","http://img4.ngacn.cc/ngabbs/post/smile/08.gif","http://img4.ngacn.cc/ngabbs/post/smile/07.gif","http://img4.ngacn.cc/ngabbs/post/smile/06.gif","http://img4.ngacn.cc/ngabbs/post/smile/05.gif","http://img4.ngacn.cc/ngabbs/post/smile/04.gif","http://img4.ngacn.cc/ngabbs/post/smile/15.gif","http://img4.ngacn.cc/ngabbs/post/smile/16.gif","http://img4.ngacn.cc/ngabbs/post/smile/17.gif","http://img4.ngacn.cc/ngabbs/post/smile/18.gif","http://img4.ngacn.cc/ngabbs/post/smile/19.gif","http://img4.ngacn.cc/ngabbs/post/smile/20.gif","http://img4.ngacn.cc/ngabbs/post/smile/21.gif","http://img4.ngacn.cc/ngabbs/post/smile/22.gif","http://img4.ngacn.cc/ngabbs/post/smile/23.gif"]
	}];
	nga_plug_mojo.unshift({autoor:"NGA",data:m})
	
	var txtisfocus = false;
	if(document.getElementById("fast_post_c").getElementsByTagName("textarea").length!=0)
	{
		document.getElementById("atc_content").id="";
		document.getElementById("fast_post_c").getElementsByTagName("textarea")[0].id="atc_content";
		/*postfunc.addsmile=function(code){
			document.getElementById("atc_content").innerHTML+=code;
			postfunc.content=document.getElementById("atc_content").innerHTML;
		};
		postfunc.addText=function(txt){
			document.getElementById("atc_content").innerHTML+=txt;
			postfunc.content=document.getElementById("atc_content").innerHTML;
		};
		postfunc.getSelectText=function(){
			if (window.getSelection) {
				return window.getSelection().toString(); 
			}else if (document.getSelection) {  
				return document.getSelection();  
			}else if (document.selection) {  
				return document.selection.createRange().text;
			}
			return "";
		};
		postfunc.post_v2=function(){
			postfunc.content=document.getElementById("atc_content").innerHTML;
		};
		postfunc.quickpost=function(e){
			postfunc.content=document.getElementById("atc_content").innerHTML;
		};
		postfunc.inputchar=function(event){
			postfunc.content=document.getElementById("atc_content").innerHTML;
		};
		*/
		window.postfunc={};
		postfunc.init = function (title,content,form,preview,post_btn,targetFrame,formContainer,targetFrameContainer,attachList,attachForm)
		{//fs
		this.title = title
		this.titleBak = this.title.value
		this.content = content
		this.contentBak = this.content.value
		this._selectionStart = this._selectionEnd = this._selection = null
		var self = this
		this.content.onmouseup = function (){
			if(document.selection)
				self._selection = document.selection.createRange().duplicate();
			}//fe
		this.content.onkeyup = function (event){
			this.focus()
			self.inputchar(event,this)
			this.focus()
			if(document.selection)
				self._selection = document.selection.createRange().duplicate();
			}//fe
		this.content.onkeydown = function (event){
			self.quickpost(event)
			}//fe
		this.form = form
		this.content.onclick=function (event){
			var y=commonui.selectForum.get(),fid = self.form.elements.namedItem("fid")
			if(y.i==0)
				return self.content.onclick=null
			if(y.i==1){
				if(typeof(y.f[fid.value])=='undefined'){
					for(var k in y.f)
						fid.value=k
					}
				return self.content.onclick=null
				}
			self.form.style.visibility="hidden"
			var x=_$('/span'),fid = self.form.elements.namedItem("fid"), z=_$('/select') 
			for(var i in y.f){
				z.$0(_$('/option').$0('innerHTML',y.f[i][1],'value',i))
				
				var u ="<a style='font-size:130%;font-weight:bold' href='javascript:void(0)' onclick='this.parentNode.__xoxooxoxooxox("+i+")' class='"+(i==fid.value? 'darkred' : '')+"'><span class='silver'>在</span> "+y.f[i][1]+" <span class='silver'>发布主题</span></a><br/>"+(y.f[i][2] ? '<span class=gray>'+y.f[i][2]+"</span><br/>":'')+"<span style='line-height:50%'><br/></span>"
				if(i==fid.value)
					x.innerHTML = u+x.innerHTML
				else
					x.innerHTML+=u

				}
			z.onchange = function(){
				fid.value=this.options[this.selectedIndex].value
				}
			x.__xoxooxoxooxox=function(id){
				for(var i=0;i<z.options.length;i++){
					if(z.options[i].value==id)
						z.selectedIndex=i
					}
				fid.value=id
				postfunc.content.onclick=null
				postfunc.form.style.visibility=''
				postfunc.dialog.w.style.display="none"
				}
			self.title.parentNode.insertBefore(_$('/div')._.add('在',z,'发帖'),self.title)
			self.dialog.createWindow()
			self.dialog.w._.addContent(null)
			self.dialog.w._.addContent(x)
			tTip.showdscp(event,self.dialog.w);
			return false

			}//fe
		this.preview = preview
		if(!this.post_btn)
			this.post_btn = post_btn

		this.targetFrame = targetFrame
		this.formContainer = formContainer
		this.targetFrameContainer = targetFrameContainer
		this.attachList = attachList
		//this.attachForm = attachForm
		this.album=null
		this.albumImgCount=0
		if (commonui.userCache){
			commonui.aE(this.content,'change',function(){
				if(this.value)
					commonui.userCache.set('bbsPostBackup',this.value)
				})
			commonui.aE(window,'beforeunload',function(){
				if(postfunc.content.value)
					commonui.userCache.set('bbsPostBackup',postfunc.content.value)
				})
			}
		if (this.prePostHint)
			this.prePostHint();
		}//fe

		postfunc.addPostBackupLink=function(o){//发帖自动备份
		if (domStorageFuncs && cookieFuncs && cookieFuncs.getCookie('ngaPassportUid'))
			put("<a href='javascript:void(0)' onclick='id2e(\""+o.id+"\").value+=domStorageFuncs.get(\""+domStorageFuncs.domain+'_'+cookieFuncs.getCookie('ngaPassportUid')+"_bbspostbackup\")' style='font-weight:bold'>[恢复上次输入的内容]</a>");
		}//fe

		postfunc.showPostBtn=function(o){
		var x = commonui.stdBtns(), y = _$('/a').$0(
				'innerHTML','<span style="font-size:1.23em">提 交(Ctrl+Enter)</span>',
				'href','javascript:void(0)',
				'className','darkred'
				)
		y.onclick=function(e){//ie6必须直接设置onclick属性并且返回false
			postfunc.post_v2();
			return false
			}

		this.post_btn = y

		x._.__add(y)
		if (commonui.userCache)
			x._.__add(
				_$('/a').$0(
					'innerHTML','恢复上次输入的内容',
					'href','javascript:void(0)',
					'onclick',function(e){var t = commonui.userCache.get("bbsPostBackup")
						if(t)
							postfunc.content.value+=t
						else
							alert('找不到保存的内容')}
					)
				)
		o.innerHTML=''
		o.appendChild(x)
		if(x._.__vml)
			x = x._.__vml()
		x.style.margin='auto'
		}//fe

		postfunc.addPostBackupLink_v2=function(o){
		if (commonui.userCache)
			put("<a href='javascript:void(0)' class='sep'></a><a href='javascript:void(0)' onclick='var t = commonui.userCache.get(\"bbsPostBackup\");if(t)postfunc.content.value+=t' class='rep txtbtnx silver'>恢复上次输入的内容</a>");
		}//fe

		postfunc.checklength = function()
		{
		window.alert('您的信息已经有 '+this.content.value.length+' 字节');
		}

		postfunc.addText = function (txt){
		var o = this.content
		if (o.setSelectionRange){
			var s = o.selectionStart;
			o.value = o.value.substring(0,s) + txt + o.value.substring(o.selectionEnd,o.value.length)
			s += txt.length;
			o.setSelectionRange(s,s)
			}
		else{
			if (!this._selection){
				o.value+=txt
				return
				}
			this._selection.text=txt
			this._selection.collapse(true);
			this._selection.select();
			}
		}//fe

		postfunc.getSelectText = function()
		{
		if(document.selection && document.selection.createRange)
			{
			return(document.selection.createRange().text);
			}
		else
			{
			return this.content.value.substring(this.content.selectionStart,this.content.selectionEnd)
			}
		return '';
		}
		//fe


		postfunc.setFocus = function()
		{
		this.content.focus();
		}

		postfunc.addTag = function(tag,value)
		{
		if(value) this.addText("["+tag+"="+value+"]"+this.getSelectText()+"[/"+tag+"]");
		else this.addText("["+tag+"]"+this.getSelectText()+"[/"+tag+"]");
		}

		postfunc.pc_showsize = function(size) 
		{//fs
		this.addTag('size',size)
		}//fe

		postfunc.pc_showfont = function(font)
		{
		this.addTag('font',font)
		}

		postfunc.pc_showcolor = function(color)
		{
		this.addTag('color',color)
		}

		postfunc.copytext = function() 
		{
		this.content.focus();
		this.content.select();
		this.content.createTextRange().execCommand("Copy");
		}


		postfunc.addsmile = function(NewCode) 
		{
		this.addText(' '+NewCode+' ');
		}

		postfunc.stripsomebbscode = function(v)
		{
		v = v.replace(/\[\/?lessernuke\]/gim,'');
		return v;
		}
		//fe

		postfunc.quickpost = function(e)
		{
		if (!e)
			{
				e = window.event;
			}
		if((e.ctrlKey && e.keyCode == 13))
			{
				this.post_v2();
			}
		}
		//fe

		postfunc.getCursorPos = function (o){
		var s,e
		if(document.selection){
			this._selection = document.selection.createRange.duplicate();
			}
		else{
			s = o.selectionStart
			e = o.selectionEnd
			}
		this._selectionStart = s
		this._selectionEnd = e
		}//fe

		postfunc.inputchar = function(e,o)
		{
		if (!e)
			{
				e = window.event;
			}
		if (e.keyCode == 9)
			{
				this.addText('	');
				return false;
			}
		if(document.selection)
			{
			var rng = document.selection.createRange();
			rng.moveStart("character",-1)
			var c= rng.text.charCodeAt(0)
			}
		else
			{
			var c = o.value.charCodeAt(o.selectionStart-1)
			var rng = false;
			}
		if (c==12304)
			{
			if (rng)
				{
				rng.text='['
				}
			else
				{
				rng = o.selectionStart
				o.value=o.value.substring(0,rng-1)+'['+o.value.substr(rng)
				o.selectionStart= o.selectionEnd = rng
				}
			}
		else if (c==12305)
			{
			if (rng)
				{
				rng.text=']'
				}
			else
				{
				rng = o.selectionStart
				o.value=o.value.substring(0,rng-1)+']'+o.value.substr(rng)
				o.selectionStart= o.selectionEnd = rng
				}
			}
		else if (c==65309)
			{
			if (rng)
				{
				rng.text='='
				}
			else
				{
				rng = o.selectionStart
				o.value=o.value.substring(0,rng-1)+'='+o.value.substr(rng)
				o.selectionStart= o.selectionEnd = rng
				}
			}
		else if (c==12289)
			{
			if (rng)
				{
				rng.moveStart("character",-1)
				if (rng.text.charAt(0)=='[')
					{
					rng.text='[/'
					}
				}
			else
				{
				if (o.value.charAt(o.selectionStart-2)=='[')
					{
					rng = o.selectionStart
					o.value=o.value.substring(0,rng-1)+'/'+o.value.substr(rng)
					o.selectionStart= o.selectionEnd = rng
					}
				}
			}
		}
		//fe

		postfunc.getItem=function (name){
		return this.form.elements.namedItem(name)
		}

		postfunc._bit = {
		'allow_lesser_nuke_and_no_adj':2, //可以lesser nuke并使用默认的声望对威望的比值扣除威望
		'high_allowvisit':4, //未验证的用户或用户在禁言期间不能查看
		'if_auto_translate':8, //版主设置了同义词翻译表
		'free_edit':16, //编辑主题不受时限限制
		'if_filter_key':32, //是否有设置监视
		'if_topic_key_color':64, //是否有设置分类颜色
		'if_custom_level':128, //是否有设置声望级别
		'if_force_topickey':256 //是否有设置强制分类
		}

		postfunc._topic_key = postfunc._filter_key = postfunc._auto_translate_table=null

		postfunc.checkCnt = function()
		{

		if (this.title && this.title.value)
			this.title.value = this.title.value.replace(/\u3010/g,'[').replace(/\u3011/,']')

		var  $ = window._$, self = this,
		setv = function(k,v){var tmp = self.getItem(k)
			if(!tmp)
				self.form.appendChild($('<input/>').$0('type','hidden','name',k,'value',v) )
			else
				tmp.value=v
			},
		intv = function(k){var tmp = self.getItem(k);if(tmp)return __NUKE.toInt(tmp.value)},
		fid = intv('fid'),
		bit = intv('bit_data'),
		tid = intv('tid'),
		pid = intv('pid'),
		act = this.getItem('action'),
		tmp

		if(!act.value){
			if(!tid &&  !pid)
				act.value='new'
			else
				act.value='reply'
			}

		//是否有设置强制分类
		if (act.value=='new' && (bit & postfunc._bit.if_force_topickey))
			{
			if (this._topic_key)
				{
				var x,y,z
				for (var k in this._topic_key){
					x = this._topic_key[k]
					if(x[1]){
						y=1
						if(x[0].indexOf('[')==0) x=x[0]
						else x='['+x[0]+']'
						if (this.title.value.indexOf(x)!=-1)
							z=1
						}
					}
				if (y==1 && z!=1){
					alert('你必须从版主指定的主题分类(灰色)中选择一个或多个');
					return false;
					}
				}
			else{
				this._topic_key={}
				__NUKE.doRequest({
					u:__API.topic_key(fid),
					f:function(d){
						if(!__NUKE.doRequestIfData(d,3600))
							return false
						if(!d.data || d.error)
							self._topic_key = {}
						else{
							if(typeof d.data[0][0] == 'object')
								d.data = d.data[0]
							self._topic_key = d.data;
							}
						window.setTimeout(function(){self.post_v2()},100)
						return true
						}
					})//doRequest
				return false;
				}
			}

		//是否有设置监视
		if (fid && (bit & this._bit.if_filter_key)){
			if (this._filter_key){
				for(var k in this._filter_key){
					if (this.title.value.indexOf(this._filter_key[k])!=-1 || this.content.value.indexOf(this._filter_key[k])!=-1 ){
						setv('filter_key',2)
						break;
						}
					}
				}
			else{
				this._filter_key={}
				__NUKE.doRequest({
					u:__API.filter_key(fid),
					f:function(d){
						if(!__NUKE.doRequestIfData(d,86400))
							return false
						if(!d.data)
							return true
						self._filter_key = d.data
						window.setTimeout(function(){self.post_v2()},100)
						return true
						}
					})//doRequest
				return false;
				}
			}
		//自动翻译
		if (fid && (bit & this._bit.if_auto_translate)){
			if(this._auto_translate_table){
				if( commonui.autoTranslate.test(this.content.value) ){
					setv('has_auto_translate',1)
					}
					
				}
			else{
				commonui.autoTranslate.main(null, fid, function(){
					self._auto_translate_table = true
					window.setTimeout(function(){self.post_v2()},100)
					})
				return false;
				}
			}

		//标题中的符号
		var tmp = _$('</span>')
		tmp.innerHTML = this.title.value
		this.title.value = tmp.innerHTML.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')

		//发送@提醒
		var m = this.content.value.match(/\[@.{2,30}?\]/g)
		if (m){
			var mm=[]
			for (var i=0;i<m.length;i++ )
				mm[m[i].substr(2,m[i].length-3).replace(/^\s+|\s+$/,'')]=1
			m='',i=0
			for (var k in mm){
				m+='\t'+k;
				i++;
				if(i>4)break;
				}
			if(m){
				setv('mention',m.substr(1))
				}
			}

		//附件
		if (this.uploadedAttach){
			var all = true
			for (var i=0;i<this.uploadedAttach.length;i++){
				if (this.content.value.indexOf(this.uploadedAttach[i][0])==-1){
					all=false
					break;
					}
				}
			if (all){
				all = document.createElement('input')
				all.type='hidden'
				all.name='hide_upload'
				all.value=1
				this.form.appendChild(all)
				}
			}

		//检测存在引用的强制改为引用 
		var c = this.content;

		if (act.value.match(/quote|reply/)){
			if(pid){
				if (c.value.substr(0,50).indexOf('[pid='+pid+'][b]Post by')==-1){
					act.value='reply'
					//this.getItem('pid').value=''
					}
				}
			}

		//无修改标记
		if (this.getItem('action').value=='modify'){
			if(this.contentBak == c.value)
				setv('content_not_modify',1)
			if(this.titleBak == this.title.value)
				setv('subject_not_modify',1)
			}
		//device
		if(__SETTING.bit & 32768){
			var d = this.deviceDetect()
			if(d){
				setv('from_device',d[0])
				setv('from_client',d[1])
				}
			}
			

		//附件
		if (this.attachForm)
			if(this.waitAttachList.firstChild)
				if (!window.confirm('确认附件已经全部上传完毕?'))
					return false;

		if(this.additional_check && !this.additional_check(this))
			return false;

		if (c.value){
				if(ubbcode.postContentChk){
					c.value = ubbcode.postContentChk(c.value)
					if(c.value===false)
						return false
					}
				return true;
			}
		else{
				alert('无内容');
				return false;
			}
		}
		//fe
		/*
		postfunc.attachOnPost=function(o){
		if (!o)o=document.getElementById('attachform')
		var f = o.elements.namedItem('attachment_file1').value
		f=encodeURIComponent(f.replace(/.+?([^\/\\]+)$/,'$1'))
		o.elements.namedItem('attachment_file1_url_utf8_name').value=f
		return true
		}//fe
		*/
		postfunc.geturl=function(t)
		{
		var u = '';
		t = t.match(/http:[a-zA-Z0-9\?&_\-+=%;:"\'@\$\^\*\/\\~`\|\.]+/ig);
		for (k in t)
			{
				if (k!='input' && k!='index' && k!='lastIndex')
					{
						u = u+t[k];
					}
			}
		return (u);
		}
		//fe

		postfunc.cancelLock=function(){
		if (this.post_btn.tagName=='A')
			this.post_btn.className=this.post_btn.className.toString().replace(' silver','')
		this.post_btn.disabled=false;
		}//fe

		postfunc.lockPost=function(){
		if (this.post_btn.tagName=='A')
			this.post_btn.className+=' silver'
		this.post_btn.disabled=true;
		}//fe

		postfunc.topic_key=null

		postfunc.post_v2=function()
		{
		if(this.post_btn.disabled)
			return false;
		this.lockPost();
		if (!this.checkCnt()){
			this.cancelLock();
			return false;
			}
		if (this.hiddenInfo){
			var x = document.createElement('span')
			x.innerHTML = '<textarea name="hidden_content" style="display:none"></textarea>'
			this.form.appendChild(x)
			this.form.elements.namedItem('hidden_content').value = this.hiddenInfo.join('\n\n')
			}
		if (this.postHint)
			this.postHint();
		this.form.appendChild( _$('<input/>')._.attr({type:'hidden',name:'checkkey',value:window.__NOW+''+window.__CURRENT_UID}))
		/*
		if(window.commonui.loadTopicUpdate && window.commonui.loadTopicUpdate.inited){
			this.form.target = this.targetFrame.id
			this.form.elements.namedItem('nojump').value=1
			this.formContainer.style.display='none'
			this.targetFrameContainer.style.display='block'
			}
			*/
		this.form.submit();
		}
		//fe

		postfunc.addHiddenInfo=function(txt){
		if (!this.hiddenInfo)this.hiddenInfo=[]
		this.hiddenInfo.push(txt)
		}//fe

		postfunc.switchFrameDisplay=function()
		{
		this.post_btn.disabled=false;
		this.formContainer.style.display='block'
		this.targetFrameContainer.style.display='none'
		}
		//fe

		postfunc.post_preview=function()
		{
		if (this.preview.style.display=='none'){
			this.preview.style.display='block';
			this.preview.style.width='auto';
			this.preview.innerHTML = this.content.value.replace(/\n/g,'<br>')
			ubbcode.bbsCode({c:this.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']})
			this.preview.innerHTML += '<div class="clear"></div>'
			}
		else{
			this.preview.style.display='none';
			}
		}
		//fe

		/**
		 *系统检测
		 * @return [设备名, 系统] 100:android 101:ios 102:BlackBerry
		 */
		postfunc.deviceDetect = function(){
		var z = window.navigator.userAgent.match(/(.+?)\((.+?)\)/) , u = function(z){return z.replace(/(?:\s+Build)?\/.+?$/i,'')}

		if(!z || z[1].match(/Android/i)){
			if(z)
				z=z[1]
			else
				z = window.navigator.userAgent
			var x = z.match(/^(.+?) (?:Linux\/[^ ]+ )?Android\/[^ ]+/)
			if(x)
				return [u(x[1]),100]
			return
			}

		z=z[2].replace(/ (?:U|I|N)(?:;|$)/,'').replace(/ [a-z]{2}-[a-z]{2}(?:;|$)/i,'')//去掉加密和语言 (Linux; U; Android 4.1.2; zh-CN; GT-I9300)

		var y = z.match(/Android|iPhone|iPod|iPad|BlackBerry/i)
		if(!y)return

		z = z.split(/\s*;\s*/)
		y = y[0].toLowerCase()

		if(y=='android'){
			if(z[1].match(/Android/i)){
				if(z[0]=='Linux')
					z = z[2]
				else
					z = z[0]
				}

			if(typeof(z)=='string')
				return [u(z),100]

			return ['Generic',100]
			}
		else if(y=='iphone' || y=='ipad' || y=='ipod'){
			if(z[1].match(/OS [\d\w]+ like Mac OS/))
				z = z[2]?z[2]:z[0]
			
			if(typeof(z)=='string')
				return [u(z),101]
			
			return ['Generic',101]
			}
		else if(y=='blackberry'){
			if(z[0]=='BlackBerry')
				z = z[1]
			
			if(typeof(z)=='string')
				return [u(z),102]

			return ['Generic',102]
			}
		}//fe

		postfunc.listAlbum = function(o){
		o.innerHTML = ''
		window.tmp=undefined
		httpDataGetter.script_muti_get("http://i.178.com/?&_app=album&_controller=category&_action=getAlbumInfo&random="+Math.random(),
			function(r){
				if(window.tmp)r=window.tmp
				else return false;
				if (r.error)
					{
					if(r.error=='not login')r.error = '未登录'
					o.innerHTML = r.error;
					return true
					}
				var list=''
				for (var i=0;i<r.length;i++)
					{
					if(r[i].preview)r[i].preview='<img src="'+r[i].preview+'"/>'
					list+='<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+r[i].id+')" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r[i].preview+'</div>'+r[i].title+' ('+r[i].count+')</a>'
					}
				if (list)
					o.innerHTML = list
				else
					o.innerHTML = '没有相册'
				return true

			},
			function(){
				o.innerHTML = '读取错误'
			},
			'gbk'
			);
		}//fe

		postfunc.openAlbum = function (o,id,page){
		o.innerHTML = ''
		if(!page)page=''
		window.tmp=undefined
		httpDataGetter.script_muti_get("http://i.178.com/?id="+id+"&pagesize=20&page="+page+"&_app=album&_controller=category&_action=getPicByCategory",
			function(r){
				if(window.tmp)r=window.tmp
				else return false;
				if (r.error)
					{
					if(r.error=='not login')r.error = '未登录'
					o.innerHTML = r.error;
					return true
					}
				var info = '';
				if (r.info)
					{
					if (r.info.PAGECOUNT>1)
						{
						for (var i=1;i<r.info.PAGECOUNT;i++)
							info+'<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+id+','+i+')">['+i+']</a>';
						}
					}
				if(info)info='<div style="clear:both">'+info+'</div>'
				var list=''
				for (var i=0;i<r.ROWS.length;i++)
					{
					if(r.ROWS[i].url)r.ROWS[i].urls='<img src="'+r.ROWS[i].thumb+'"/>'
					list+='<a title="点击插入图片代码" href="javascript:void(0)" onclick="postfunc.addText(\'[img]'+r.ROWS[i].url+'[/img]\');" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r.ROWS[i].urls+'</div>'+r.ROWS[i].title+'</a>'
					}
				if (list)
					o.innerHTML = info+list+info
				else
					o.innerHTML = '没有图片'
				return true

			},
			function(){
				o.innerHTML = '读取错误'
			},
			'gbk'
			);
		}//fe


		postfunc.dialogAddTag = function(hid){
		if (!this.hintTable[hid])
			return
		var c = window.showModalDialog("/nuke/PromptWindow.htm?domain="+__AJAX_DOMAIN,this.hintTable[hid],"dialogWidth:400px;status:no;dialogHeight:300px;resizable:0;help:0");
		if (c)
			this.addText(c);
		}//fe

		postfunc.dialog = 
		{
		'createWindow' : function (id){
		if (this.w)return
		this.w = commonui.createCommmonWindow()
		document.body.appendChild(this.w);
		this.w.id = id;
		this.w.style.width = 'auto';
		},

		'returnVal':function(o)
		{
		var rr = []
		var r = o.getElementsByTagName('input')
		for (var i=0;i<r.length;i++)
			rr[r[i].name] = r[i].value

		r = o.getElementsByTagName('select')
		for (var i=0;i<r.length;i++)
			rr[r[i].name] = r[i].options[r[i].selectedIndex].value

		r = o.getElementsByTagName('textarea')
		for (var i=0;i<r.length;i++)
			rr[r[i].name] = r[i].value

		if (this.func){
			rr = this.func(rr)
			if (rr===false)
				return;
			}
		return rr
		},

		'genDialog':function(a){
		//var a = window.dialogArguments
		if (typeof(a) == 'string'){
			a = {0:a}
			this.func = function (v){
				return v[0]
				}//fe
			}

		var c = _$('<div/>')
		for (var k in a)
			{
			if(isNaN(parseInt(k)))continue;
			if (typeof(a[k]) == 'string'){
				c._.aC( _$('<span/>')._.attr('innerHTML',a[k].replace(/(<select|<input|<textarea)/i,function($0,$1){return $1+' name="'+k+'"'}) ,1) )._.aC(_$('<br/>'))._.aC(_$('<br/>'))
				}
			else if (typeof(a[k]) == 'object')
				{
				c._.aC( _$('<b>'+a[k].hint+'</b>') )._.aC( _$('<br/>') )
				if(a[k].opts){
					var y = _$('<select/>')._.attr('name',k)
					for (var kk in a[k].opts){
						if(typeof(a[k].opts[kk])!='object')continue
						y._.aC( _$('<option/>')._.attr('innerHTML',a[k].opts[kk][0],1)._.attr('value',a[k].opts[kk][1]) )
						}
					}
				else if(a[k].cols)
					var y = _$('<textarea/>')._.attr('name',k)._.attr('cols',a[k].cols)._.attr('rows',a[k].rows)
				else
					var y = _$('<input/>')._.attr('name',k)._.attr('type','text')
				c._.aC( y )._.aC( _$('<br/>') )._.aC( _$('<br/>') )
				}
			else if (typeof(a[k]) == 'function')
				this.func = a[k]
			}
		this.arg = a
		return c
		}//fe
		}//ce

		postfunc.uiAddTag = function(e,hid){
		if (!this.hintTable[hid])
			return
		var a,c,f
		var self = this
		this.dialog.createWindow('uiAddTag')
		this.dialog.w.style.display='none'
		this.dialog.w._.addContent(null)
		c = _$('<button>  关闭  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.dialog.w.style.display='none'})

		if(this.hintTable[hid][0]){
			f = this.dialog.genDialog(this.hintTable[hid])
			a = _$('<button>  添加  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.addText(self.dialog.returnVal(this.parentNode));self.dialog.w.style.display='none'})
			f = _$('<table/>')._.aC(
				_$('<tbody/>')._.aC(
					_$('<tr/>')._.aC(
						_$('<td/>')._.cls('ubbcode')._.css('verticalAlign','top')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)
						)._.aC(
						_$('<td/>')._.aC(f)._.css('verticalAlign','top')._.aC(a)._.aC(c)
						)
					)
				)
			}
		else if(this.hintTable[hid].txt){
			f = _$('<div/>')._.cls('ubbcode')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)._.aC(c)
			}

		this.dialog.w._.addContent(f)
		tTip.showdscp(e,this.dialog.w)
		}//fe

		postfunc.hintTable = []//bbscode向导 参看postfunc.dialogAddTag postfunc.code_help 以及/nuke/PromptWindow.htm

		postfunc.code_help=function()
		{
		var x,y,txt
		if (ubbcode.codeHelpSpecial){
			x = []
			x=x.concat(ubbcode.codeHelpSpecial,ubbcode.codeHelpCommon);
			}
		else
			x = ubbcode.codeHelpCommon

		txt=''
		for (var i=0;i<x.length;i++){
			if(!x[i][2])
				x[i][2]={}
			x[i][2].txt = x[i][1].replace(/\n|\r/g,'<br/>')
			txt +="<a href='javascript:void(0)' style='display:block;color:gray;float:left;border:1px solid #fff;padding:0 2px;margin:2px;align:center' onfocus='this.blur()' onclick='postfunc.uiAddTag(event,"+this.hintTable.length+")'>"+x[i][0]+"</a>";
			this.hintTable.push(x[i][2])
			}


		put('<div>'+txt+'<div class="clear"></div></div><div></div>');
		}
		/*
		postfunc.add1Attach=function (attach,checkSum,url,isimg){

		if(!this.attachList.innerHTML || this.attachList.innerHTML.length<10){
			this.attachList.innerHTML+='已有附件<br/>'
			this.uploadedAttach=[]
			}
		if(isimg){
			this.attachList.innerHTML+='<span class=gray>缩略图&链接</span> <span class=orange>[img]./'+url+'.thumb.jpg[/img]</span> &nbsp; <span class=gray>全图</span> <span class=orange>[img]./'+url+'[/img]</span><br/>'
			if(!this.album)this.album=_$('<div>在有大量图片的时候可以使用相册<span class="silver">([album])</span><br/><span class="orange">[album=查看全部附件][/album]</span><br/><br/></div>')
			this.album.innerHTML=this.album.innerHTML.replace('[/album]','<br/>./'+url+'[/album]')
			this.albumImgCount++
			if(this.albumImgCount==5)
				this.attachList.parentNode.insertBefore(this.album,this.attachList)
			}
		else
			this.attachList.innerHTML+='<span class=gray>文件</span> <span class=orange>[attach]./'+url+'[/attach]</span><br/>'

		this.uploadedAttach.push({0:url,1:isimg})

		if (!attach || !checkSum)return

		this.form.elements.namedItem('attachments').value+=attach+'\t';
		this.form.elements.namedItem('attachments_check').value+=checkSum+'\t';
		this.attachForm.elements.namedItem('attachment_file1_dscp').value='';
		var tmp = this.attachForm.elements.namedItem('attachment_file1');
		var tmp2= tmp.cloneNode(false);
		if(tmp2.files)delete(tmp2.files[0]);
		tmp2.value='';
		tmp.parentNode.replaceChild(tmp2,tmp);
			
		}//fe
		*/
		postfunc.addForumSelect=function (e){
		var y= commonui.selectForum.get(),fid = this.form.elements.namedItem("fid")
		if (y.i==0)
			return true
		if(y.i==1){
			if(typeof(y.f[fid.value])=='undefined'){
				for(var k in y.f)
					fid.value=k
				}
			return true
			}
		var x=''
		for(var i in y.f){
			var z ="<a style='font-size:130%;font-weight:bold' href='/post.php?fid="+i+"' class='"+(i==fid.value? 'darkred' : '')+"'><span class='silver'>在</span> "+y.f[i][1]+" <span class='silver'>发布主题</span></a><br/>"+(y.f[i][2] ? '<span class=gray>'+y.f[i][2]+"</span><br/>":'')+"<span style='line-height:50%'><br/></span>"
			if(i==fid.value)
				x = z+x
			else
				x+=z
			}
		this.dialog.createWindow()
		this.dialog.w._.addContent(null)
		this.dialog.w._.addContent(x)
		tTip.showdscp(e,this.dialog.w);
		return false
		}//fe


		postfunc.showHelp=function(x){
		if(x===undefined)
			x = __SETTING.bit & 4
		if(x)
			$('postShowHelp').style.display='',$('postHelp').style.display='none'
		else
			$('postShowHelp').style.display='none',$('postHelp').style.display=''
		}




		/**
		 *文件上传使用到的变量
		postfunc.fileSelector=null //文件选择input
		postfunc.waitAttachList =null //等待上传的文件信息容器
		postfunc.attachList=null //已经上传的文件信息容器
		postfunc.album=null //相册信息容器
		postfunc.attachBtn
		postfunc.albumImgCount=null//相册计数
		 */


		/**
		 *绘制上传文件表单
		 */
		postfunc.fileUpload=function(p,url){
		var $ = _$, f = this.attachForm
		p.innerHTML=''
		this.ifMultiple= (window.XMLHttpRequest!==undefined && ('withCredentials' in new XMLHttpRequest()) && window.FormData !== undefined) ? true : false
		this.attachList = $('/span').$0('id','uploadedattach')
		this.waitAttachList = $('/span').$0('id','waituploadattach')
		this.fileSelector = this.attachNewFileSelect()
		this.attachForm = $('/form').$0('method','post','id','attachform','target','upload_iframe','name','attachform','action',url,'encoding','multipart/form-data','enctype','multipart/form-data','style',{clear:'both'})
		this.attachBtn = $('/button').$0('type','button','innerHTML','上传','onclick',function(){this.disabled=true;postfunc.attachUpload()} )
		this.uploadedAttach=[]

		$(p)._.add(
			this.attachList,
			this.attachForm,
			this.waitAttachList,
			$('/div').$0('style',{clear:'both'}),
			this.fileSelector,
			this.attachBtn,
			this.ifMultiple ? ' (可以一次选择多个附件)' : null
			)
		}//fe

		/**
		 *选择上传文件callback
		 */
		postfunc.attachNewFileSelect=function(){
		var x =	_$('/input').$0('type','file', 'name','attachment_file1', 'onchange',function(){
		var $=_$,p = postfunc.waitAttachList
		if(!p.__xooxoxx){
			p.parentNode.insertBefore($('/div').$0('innerHTML','待上传的附件','style',{clear:'both'}) ,p)
			p.__xooxoxx = true
			}
		p.innerHTML=''

		if(this.files){//多选文件时
			var fs = this.files
			if(!fs.length)return
			for(var i =0; i<fs.length; i++)
				p.insertBefore(postfunc.attachNewFile(fs[i]),p.firstChild)
			}
		else{//单选文件时
			if(!this.value)return
			var f = this.value.match(/[^\/\\]+$/)
			var fo = {name:f[0],__noimg:true}
			f=f[0].split('.')[1]
			if(f=='jpg' || f=='jpeg' || f=='gif' || f=='png')
				fo.type='image/'+f
			p.insertBefore(postfunc.attachNewFile(fo),p.firstChild)
			}


		} )
		if(this.ifMultiple)
			x.multiple=1
		return x
		}

		/**
		 *上传一个待上传的附件
		 * 老式方法 将<input type=file>移进表单 只在单选文件时用
		 */
		postfunc.attachUploadSingle=function(){
		var $=_$, f = $(this.attachForm), z = this.waitAttachList.firstChild, x = this.attachNewFileSelect()
		this.fileSelector.parentNode.replaceChild(x,this.fileSelector)
		this.fileSelector.style.display='none'
		f._.add(
			z,
			$('/input').$0('name','attachment_file1_url_utf8_name','type','hidden','value',encodeURIComponent(z.__file.name.replace(/.+?([^\/\\]+)$/,'$1'))),
			$('/input').$0('name','func','type','hidden','value','upload'),
			$('/input').$0('name','v2','type','hidden','value','1'),
			//$('/input').$0('name','lite','type','hidden','value','js'),
			$('/input').$0('name','fid','type','hidden','value',this.form.elements.namedItem("fid").value),
			this.fileSelector
			)
		this.fileSelector = x
		f.submit()
		this.attachBtn.disabled=null
		}

		/**
		 *上传一个待上传的附件
		 * 新式方法 在多选文件时用 将<input type=file>中多个文件中的一个通过XHR上传
		 */
		postfunc.attachUpload=function(){
		var f = this.attachForm
		f.innerHTML=''
		var z = this.waitAttachList.firstChild
		if(!z){
			this.attachBtn.disabled=null
			return
			}
		if(!this.ifMultiple)//单选文件用老方法
			return postfunc.attachUploadSingle();
		f.appendChild(z)
		var x = new FormData(f), self=this
		x.append('attachment_file1_url_utf8_name',encodeURIComponent(z.__file.name.replace(/.+?([^\/\\]+)$/,'$1')))
		x.append('func','upload')
		x.append('v2','1')
		x.append('origin_domain',window.location.hostname )
		x.append('lite','js')
		x.append('fid',this.form.elements.namedItem("fid").value)
		x.append('attachment_file1',z.__file)
		var xhr =  new XMLHttpRequest()//new XDomainRequest()
		xhr.open("POST", f.action); // Boooom!
		xhr.withCredentials=true
		xhr.onload = function(e) {
			var xhr = e.target
			if (xhr.readyState !== 4 && xhr.status !== 200){
				self.attachBtn.disabled=null
				return alert('request error')
				}
			eval( xhr.responseText)
			var y = window.script_muti_get_var_store
			if(y.error){
				self.attachBtn.disabled=null
				return alert(y.error)
				}
			postfunc.add1Attach(y.data.attachments, y.data.attachments_check, y.data.url,  y.data.isImg,  y.data.thumb)
			}

		xhr.send(x);
		 
		}


		/**
		 *生成一个空附件dom obj
		 *isimg 是否是图片
		 *return {__imgC:缩略图dom容器, __infoC:信息dom容器}
		 */
		postfunc.attachFileC = function(isimg){
		var $=_$,z = $('/table')._.cls('c1')._.css({'float':'left',margin:'0 0.416em 0.416em 0'})._.add(
			$('/tbody')._.add(
				$('/tr')._.add(
					isimg ? $('/td') :null,
					$('/td')				
					)
				)
			)
		if(isimg)
			z.__imgC = z.firstChild.firstChild.firstChild
		z.__infoC = z.firstChild.firstChild.lastChild
		return z
		}


		/**
		 *生成一个待上传附件dom obj
		 *fileO <input type=file>的files中的一个文件object 或 一个虚假的文件object(包含name type __fake 三个属性)
		 */
		postfunc.attachNewFile = function(fileO){
		var $=_$
		if(fileO.type.indexOf('image/')===0){
			var wm = fileO.type.match(/\/jpe?g/) ? true : false, z = this.attachFileC(true)
			
			if(!fileO.__fake &&  window.FileReader){
				var tmpImg = $("/img")._.css({'float':'left',border:'0.25em solid #551200',visibility:'hidden'})
				tmpImg.__r = new FileReader()
				tmpImg.__r.__p = tmpImg
				tmpImg.__r.onload = function(e) {this.__p.src = e.target.result}
				tmpImg.onload = function(){this.onload=null;commonui.resizeImg(this,160,90),this.style.visibility=''}
				tmpImg.__r.readAsDataURL(fileO);
				z.__imgC._.add(tmpImg)
				}
			
			z.__infoC._.add(
				fileO.name+' '+'('+fileO.type+')',
				$('/br'),
				wm ? $('/select').$0('name','attachment_file1_watermark',
					$('/option').$0('value','br','innerHTML','右下水印'),
					$('/option').$0('value','bl','innerHTML','左下水印'),
					$('/option').$0('value','tl','innerHTML','左上水印'),
					$('/option').$0('value','tr','innerHTML','右上水印'),
					$('/option').$0('value','','innerHTML','无水印')
					) : null,
				wm ? $('/br') : null,
				$('/input').$0('name','attachment_file1_dscp', 'type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
				$('/span').$0('innerHTML','附件说明','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'}),
				$('/input').$0('name','attachment_file1_img','type','hidden','value',1)
				)
			}
		else{
			var z = this.attachFileC()
			z.__infoC._.add(
				fileO.name+' '+'('+fileO.type+')',
				$('/br'),
				$('/input').$0('name','attachment_file1_dscp','type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
				$('/span').$0('innerHTML','附件说明','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'})
				)

			}
		z.__fileName = fileO.name
		z.__file = fileO
		return z
		}


		/**
		 * 增加一个已上传的附件 或 附件上传成功callback
		 * attach 附件信息
		 * checkSum 附件信息校验
		 * 有以上两个参数时为 附件上传成功callback
		 * 
		 * url 附件的地址
		 * isimg 附件是否是图片
		 * thumb 附件是否有缩略图 3小 2中小 1大中小 0无
		 */
		postfunc.add1Attach=function (attach,checkSum,url,isimg,thumb){

		if(!this.attachList.firstChild)
			this.attachList.parentNode.insertBefore( _$('/div').$0('innerHTML','已有附件','style',{clear:'both'}), this.attachList)


		var z= this.attachForm.firstChild

		if(!z){
			z = this.attachFileC(isimg ? true :false)
			if(isimg){
				var t = thumb==3 ? '.thumb_ss.jpg' : (thumb==2 || thumb==1 ? '.thumb_s.jpg' : '')//3最小 1最大
				z.__imgC._.add(
					_$('/img').$0('src',commonui.getAttachBase(url)+'/'+url+t,'style',{'float':'left',border:'0.25em solid #551200'})
					)
				}
			}

		z.__infoC.innerHTML=''
		if(isimg){
			if(z.__fileName)
				z.__infoC.innerHTML += z.__fileName+'<br/>'
			if(thumb){//有thumb
				var t = thumb==3 ? 'thumb_ss' : (thumb==2 ? 'thumb_s' : 'thumb')//3最小 1最大
				z.__infoC.innerHTML+=this.add1Attach.sub('缩略图',url+'.'+t+'.jpg')
				}
			z.__infoC.innerHTML+=this.add1Attach.sub('全图',url)
			
			//图片超过5个显示使用相册的提示
			if(!this.album)this.album=_$('<div>在有大量图片的时候建议使用相册<span class="silver">([album])</span><br/><span class="orange">[album=查看全部附件][/album]</span><br/><br/></div>')
			this.album.innerHTML=this.album.innerHTML.replace('[/album]','<br/>./'+url+'[/album]')
			this.albumImgCount++
			if(this.albumImgCount==5)
				this.attachList.parentNode.insertBefore(this.album,this.attachList)
			}
		else{
			if(z.__fileName)
				z.__infoC.innerHTML += z.__fileName+'<br/>'
			z.__infoC.innerHTML='<span class=gray>文件</span> <span class=orange>[attach]./'+url+'[/attach]</span>'

			}
		this.attachList.appendChild(z)

		this.uploadedAttach.push({0:url,1:isimg})

		if (!attach || !checkSum)return

		this.form.elements.namedItem('attachments').value+=attach+'\t';//tab 分隔多个附件信息
		this.form.elements.namedItem('attachments_check').value+=checkSum+'\t';

		window.setTimeout(function(){postfunc.attachUpload()},200)
		}//fe

		postfunc.add1Attach.sub=function(t,u){return '<button class=gray type=button onclick="postfunc.addText(this.nextSibling.innerHTML.substr(1))" title="点击在光标的位置插入图片">'+t+'</button><span class=orange> [img]./'+u+'[/img]</span><br/>'}

		if(window.__CURRENT_FID && (__CURRENT_FID == 9 || __CURRENT_FID==-2342912 || __CURRENT_FID==-7 || window.location.search.indexOf('_newui')!=-1))
			loader.script('/nuke/temp.js',0,0,1)
	}
	if (document.activeElement.id == "atc_content") txtisfocus = true;
	var nga_edit_pathname = location.pathname;
	if(nga_edit_pathname == '/post.php'){
		var t_td = document.getElementById('atc_content').parentNode;
		//try{document.getElementById("postform").appendChild(document.getElementById("atc_content"));}catch(e){}
		t_td.innerHTML = nga_edit_gettabhtml();
		try{document.getElementById("nga_edit_content").appendChild(document.getElementById("atc_content"));}catch(e){}
		document.getElementById("atc_content").style.width="99%";
		document.getElementById("post_preview").style.display="inline";
		document.getElementById("post_preview").style.padding="0";
	}else if(nga_edit_pathname == '/read.php' || nga_edit_pathname == '/thread.php'){
		if (document.getElementById("atc_content")){
			var nga_edit_divEl = document.createElement("div");
			nga_edit_divEl.innerHTML = nga_edit_gettabhtml();
			try{
				document.getElementById("atc_content").parentNode.insertBefore(nga_edit_divEl,document.getElementById("atc_content"));
				document.getElementById("nga_edit_content").appendChild(document.getElementById("atc_content"));
				document.getElementById("atc_content").style.width="99%";
				document.getElementById("post_preview").style.display="inline";
				document.getElementById("post_preview").style.padding="0";
			}catch(e){};
		}
	}
	if(nga_edit_pathname != '/'){
		try{
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[3].onclick=function(){
				nga_plug_tab_setTab(this,2);
				postfunc.preview = document.getElementById("post_preview");
				postfunc.preview.innerHTML = postfunc.content.value.replace(/\n/g,'<br>');
				ubbcode.bbsCode({c:postfunc.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
			};
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[2].onclick=function(){
				nga_plug_tab_setTab(this,1);
				postfunc.preview = document.getElementById("post_edit");
				postfunc.preview.innerHTML = postfunc.content.value.replace(/\n/g,'<br>');
				postfunc.preview.innerHTML = nga_edit_ubb2ubb(postfunc.preview.innerHTML,1);  //将不转换的UBB代码加感叹号
				ubbcode.bbsCode({c:postfunc.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
				postfunc.preview.innerHTML = nga_edit_ubb2ubb(postfunc.preview.innerHTML,2);  //将没有转换的UBB代码的感叹号取消
			};
			document.getElementById("post_edit").onblur=function(){
				//alert(this.id);  //可编辑DIV失去焦点时触发，此处应执行html到ubb代码的转换
				nga_edit_settmpshot()
				document.getElementById("atc_content").value = nga_edit_html2ubb(this.innerHTML);
				nga_edit_settmpshot()
				return true;
			}
			document.getElementById("atc_content").onkeyup = function(event){nga_edit_setshot('up');postfunc.inputchar(event,this);}
			document.getElementById("atc_content").onkeydown = function(e){
				nga_edit_setshot('down');
				var e = e || window.event;
				var keyCode = e.which ? e.which : e.keyCode;
				if (e.altKey && keyCode == 83){
					postfunc.post_v2();
				}
				postfunc.quickpost(e);
			}
			try{if (txtisfocus) document.getElementById('atc_content').focus();}catch(e){};
		}catch(e){console.log(e);};
	}
	
	if (!document.getElementById("nga_edit_PreviewImgDiv")){
		var tmpdiv1 = document.createElement("div");
		tmpdiv1.id = "nga_edit_PreviewImgDiv";
		tmpdiv1.style.display = "none";
		tmpdiv1.style.background = "#FEF3D1";
		tmpdiv1.style.position = "absolute";
		tmpdiv1.style.zIndex = 11;
		tmpdiv1.style.border = "1px solid #A70";
		tmpdiv1.style.boxShadow = "5px 5px 5px #444";
		tmpdiv1.onmousemove = function(){document.getElementById("nga_edit_PreviewImgDiv").style.display = "none"}
		document.body.appendChild(tmpdiv1);
	}
	
	try{document.getElementById("m_nav").getElementsByTagName("div")[1].style.zIndex = "2";}catch(e){};
	try{document.getElementById("b_nav").getElementsByTagName("div")[1].style.zIndex = "2";}catch(e){};
	var x = new nga_plug_tab();
	x.add("表情开关",'<div class="nga_plug_table_tab_div"><input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="加载设置界面"></div>');
	//x.add("表情开关",'<div class="nga_plug_table_tab_div">'+nga_edit_getmojocheckhtml()+'</div>');
	var t = x.gethtml();
	nga_plug_table_addTab("表情设置",t);
	
}

//打开编辑框时给UBB代码做转换以防止不支持编辑的UBB代码转换为HTML代码
function nga_edit_ubb2ubb(html,act){
	var regs = [];
	var thtml = html;
	regs.push(act==1?/\[dice\][\s\S]*?\[\/dice\]/ig:/\[!dice\][\s\S]*?\[!\/dice\]/ig);  //投骰子
	regs.push(act==1?/\[@[\s\S]*?\]/ig:/\[!@[\s\S]*?\]/ig);  //发送提醒 @
	regs.push(act==1?/\[t\.178\.com[\s\S]*?\]/ig:/\[!t\.178\.com[\s\S]*?\]/ig);  //178尾巴
	regs.push(act==1?/\[collapse[\s\S]*?\[\/collapse\]/ig:/\[!collapse[\s\S]*?\[!\/collapse\]/ig);  //折叠的内容
	regs.push(act==1?/\[album[\s\S]*?\[\/album\]/ig:/\[!album[\s\S]*?\[!\/album\]/ig);   //相册
	regs.push(act==1?/\[flash\][\s\S]*?\[\/flash\]/ig:/\[!flash\][\s\S]*?\[!\/flash\]/ig);  //flash
	regs.push(act==1?/\[code[\s\S]*?\[\/code\]/ig:/\[!code[\s\S]*?\[!\/code\]/ig);   //插入代码
	regs.push(act==1?/\[tid[\s\S]*?\[\/tid\]/ig:/\[!tid[\s\S]*?\[!\/tid\]/ig);   //主题
	regs.push(act==1?/\[pid[\s\S]*?\[\/pid\]/ig:/\[!pid[\s\S]*?\[!\/pid\]/ig);  //回复
	regs.push(act==1?/\[customachieve\][\s\S]*?\[\/customachieve\]/ig:/\[!customachieve\][\s\S]*?\[!\/customachieve\]/ig);  //自定义成就
	regs.push(act==1?/\[url\][\s\S]*?#armory\[\/url\]/ig:/\[!url\][\s\S]*?#armory\[!\/url\]/ig);   //D3人物
	regs.push(act==1?/\[crypt\][\s\S]*?\[\/crypt\]/ig:/\[!crypt\][\s\S]*?\[!\/crypt\]/ig);  //加密内容
	regs.push(act==1?/\[randomblock\][\s\S]*?\[\/randomblock\]/ig:/\[!randomblock\][\s\S]*?\[!\/randomblock\]/ig);   //随机段落
	regs.push(act==1?/\[cnarmory[\s\S]*?\]/ig:/\[!cnarmory[\s\S]*?\]/ig);    //魔兽任务
	regs.push(act==1?/\[item[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!item[\s\S]*?\[[\s\S]*?\]\]/ig);   //魔兽物品1
	regs.push(act==1?/\[item[\s\S]*?\[\/item\]/ig:/\[!item[\s\S]*?\[!\/item\]/ig);  //魔兽物品2
	regs.push(act==1?/\[achieve[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!achieve[\s\S]*?\[[\s\S]*?\]\]/ig);   //魔兽成就1
	regs.push(act==1?/\[achieve[\s\S]*?\[\/achieve\]/ig:/\[!achieve[\s\S]*?\[!\/achieve\]/ig);  //魔兽成就2
	regs.push(act==1?/\[spell[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!spell[\s\S]*?\[[\s\S]*?\]\]/ig);  //魔兽法术1
	regs.push(act==1?/\[spell[\s\S]*?\[\/spell\]/ig:/\[!spell[\s\S]*?\[!\/spell\]/ig);  //魔兽法术2
	regs.push(act==1?/\[headline[\s\S]*?\[\/headline\]/ig:/\[!headline[\s\S]*?\[!\/headline\]/ig);  //目录
	regs.push(act==1?/\[murtopic[\s\S]*?\]/ig:/\[!murtopic[\s\S]*?\]/ig);  //近期用户推荐主题
	regs.push(act==1?/\[lessernuke[\s\S]*?\[\/lessernuke\]/ig:/\[!lessernuke[\s\S]*?\[!\/lessernuke\]/ig);  //禁言
	for (var i=0;i<regs.length;i++){
		if (act ==1){
			thtml = thtml.replace(regs[i],function($0){return $0.replace(/\[/gi,"[!")});
		}else if(act ==2){
			thtml = thtml.replace(regs[i],function($0){return $0.replace(/\[!/gi,"[")});
		}
	}
	return thtml;
}

//html代码转换为ubb代码
function nga_edit_html2ubb(html){
	var c = html;
	//nga_plug_mojo[0].data[0].img
	c = c.replace(/\n/g,"<br>");
	//c = c.replace()
	//c = c.replace(/<span class="urltip.*?<\/span>/gi,"");
	//c = c.replace(/<span.*?style="display:none">.*?<\/span>/gi,"");
	//c = c.replace(/<span class="chocolate">.*?<\/span>/gi,"");
	if (/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/.test(c)){
		c = c.replace(/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/gi,function($0,$1){return $1});
	}
	while (/<span(.*?)>(.*?)<\/span>/i.test(c)){
		c = c.replace(/(.*)<span(.*?)>(.*?)<\/span>/i,function($0,$1,$2,$3){
			if (/class/i.test($2)){
				var tc = /class="(.*?)"/gi.exec($2)[1];
				if (eval('/"' + tc + '"/i').test('"skyblue""royalblue""blue""darkblue""orange""orangered""crimson""red""firebrick""darkred""green""limegreen""seagreen""teal""deeppink""tomato""coral""purple""indigo""burlywood""sandybrown""sienna""chocolate""silver"')){
					return $1 + "[color=" + tc + "]" + $3 + "[/color]";
				}else{
					if (/urltip/i.test($2)) return $1;
					if (/class="chocolate"/i.test($2)) return $1;
					return $1 + $3;
				}
			}
			if (/font-size/i.test($2)){
				return $1 + "[size=" + /font-size:(.*?)%/gi.exec($2)[1] + "%]" + $3 + "[/size]";
			}
			if (/font-family/i.test($2)){
				return $1 + "[font=" + /font-family:(.*?)"/gi.exec($2)[1] + "]" + $3 + "[/font]";
			}
			if (/display:none/i.test($2)) return $1;
			return $1 + $3;
		});
		//alert(c)
	}
	c = c.replace(/<img.*?src="(.*?)".*?>/gi,function($0,$1){
		for (var i=0;i<nga_plug_mojo[0].data[0].img.length;i++){
			if ($1.toLowerCase() == nga_plug_mojo[0].data[0].img[i].toLowerCase()){
				return "[" + nga_plug_mojo[0].data[0].alt[i] + "]";
			}
		}
		return "[img]" + $1 + "[/img]";
	});
	c = c.replace(/<b>(.*?)<\/b>/gi,function($0,$1){return "[b]"+$1+"[/b]"});
	c = c.replace(/<u>(.*?)<\/u>/gi,function($0,$1){return "[u]"+$1+"[/u]"});
	c = c.replace(/<i .*?>(.*?)<\/i>/gi,function($0,$1){return "[i]"+$1+"[/i]"});
	c = c.replace(/<del .*?>(.*?)<\/del>/gi,function($0,$1){return "[del]"+$1+"[/del]"});
	while (/<div(.*?)>(.*?)<\/div>/i.test(c)){
		c = c.replace(/(.*)<div(.*?)>(.*?)<\/div>/i,function($0,$1,$2,$3){
			if ($2.indexOf('style="text-align:left"') >=0) return $1 + "[align=left]" + $3 + "[/align]";
			if ($2.indexOf('style="text-align:center"') >=0) return $1 + "[align=center]" + $3 + "[/align]";
			if ($2.indexOf('style="text-align:right"') >=0) return $1 + "[align=right]" + $3 + "[/align]";
			if ($2.indexOf('class="left"') >=0) return $1 + "[l]" + $3 + "[/l]";
			if ($2.indexOf('class="right"') >=0) return $1 + "[r]" + $3 + "[/r]";
			if ($2.indexOf('class="quote"') >=0) return $1 + "[quote]" + $3 + "[/quote]";
			return $1 + $3;
			//if ($3)
			//return $0;
		});
	}
	c = c.replace(/<h4(.*?)>(.*?)<\/h4>/gi,function($0,$1,$2){
		if ($1) return "===" + $2 + "===";
		return "[h]" + $2 + "[/h]";
	});
	c = c.replace(/<a.*?href="(.*?)"(.*?)>(.*?)<\/a>/gi,function($0,$1,$2,$3){
		if ($2.indexOf("onmouseover")>=0) return "[url=" + $1 + "]" + $3 + "[/url]";
		return "[url]" + $1 + "[/url]"
	})
	while (/<(ul|ol.*?)>(.*?)<\/(u|o)l>/i.test(c)){
		c = c.replace(/(.*)<(ul|ol.*?)>(.*?)<\/(u|o)l>/i,function($0,$1,$2,$3){
			var li = $3.replace(/<li>(.*?)(<\/li>)/gi,function($0,$1){return "[*]" + $1});
			if ($2!="ul"){
				return $1 + "[list=" + $2.replace(/.*?type="(.*?)"/,function($0,$1){return $1}) + "]" + li + "[/list]";
			}else{
				return $1 + "[list]" + li + "[/list]"
			}
			//return $1 + "[list]" + $3.replace(/<li>(.*?)(<\/li>)/gi,function($0,$1){return "[*]" + $1}) + "[/list]"
		})
	}
	while(/<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/.test(c)){
		c = c.replace(/(.*)<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/i,function($0,$1,$2){
			$2 = $2.replace(/<tr>(.*?)<\/tr>/gi,function($0,$1){
				$1 = $1.replace(/<td(.*?)>(.*?)<\/td>/gi,function($0,$1,$2){
					var td = "[td";
					if ($1.indexOf("rowspan=")>=0){
						td += " rowspan" + /rowspan="(.*?)"/gi.exec($1)[1]
					}
					if ($1.indexOf("colspan=")>=0){
						td += " colspan" + /colspan="(.*?)"/gi.exec($1)[1]
					}
					if ($1.indexOf("width:")>=0){
						td += " width" + /width:(.*?)%/gi.exec($1)[1]
					}
					return td + "]" + $2 + "[/td]";
				})
				return "[tr]" + $1 + "[/tr]";
			})
			return $1 + "[table]" + $2 + "[/table]";
		})
	}
	c = c.replace(/<br\/?>/ig,"\n")
	return c;
}

//获取并设置默认表情开启状态
function nga_edit_setallmojocheck(){
	for (var m=0;m<nga_plug_mojo.length;m++){
		for (var n=0;n<nga_plug_mojo[m].data.length;n++){
			try{
				for (var i=0;i<nga_edit_mojo_check.data.length;i++){
					if (nga_edit_mojo_check.data[i].autoor == nga_plug_mojo[m].autoor){
						for (var k=0;k<nga_edit_mojo_check.data[i].data.length;k++){
							if (nga_edit_mojo_check.data[i].data[k].id == nga_plug_mojo[m].data[n].id) nga_plug_mojo[m].data[n].check = nga_edit_mojo_check.data[i].data[k].check;
						}
					}
				}
			}catch(e){}
		}
	}
}

//加载表情设置选项
function nga_edit_getmojocheckhtml(){
	nga_edit_setallmojocheck();
	var s = '<input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="重新加载设置界面">';
	for (var i=1;i<nga_plug_mojo.length;i++){
		s += '<div style="margin-top:10px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">表情作者：'+nga_plug_mojo[i].autoor+'</span></div>';
		for (var k=0;k<nga_plug_mojo[i].data.length;k++){
			s += '<table class="nga_plug_plugcon"><tbody><tr><td><input onclick="nga_edit_setmojocheck(\''+nga_plug_mojo[i].autoor+'\',\''+nga_plug_mojo[i].data[k].id+'\',this.checked)" name="check" type="checkbox" '+c(nga_plug_mojo[i].data[k].check)+' title="是否启用该表情">是否启用表情：'+nga_plug_mojo[i].data[k].title+'</td></tr></tbody></table>';
		}
	}
	return s;
	function c(p){
		if (p) return "checked"; else return "";
	}

}

//设置并保存表情开启状态
function nga_edit_setmojocheck(autoor,id,check){
	var hautoor = false;
	var hid = false;
	if (typeof(nga_edit_mojo_check.data) == "object"){
		for (var i=0;i<nga_edit_mojo_check.data.length;i++){
			if (nga_edit_mojo_check.data[i].autoor == autoor){
				hautoor = true;
				if (typeof(nga_edit_mojo_check.data[i].data) == "object"){
					for (var k=0;k<nga_edit_mojo_check.data[i].data.length;k++){
						if (nga_edit_mojo_check.data[i].data[k].id == id){
							hid = true;
							nga_edit_mojo_check.data[i].data[k].check = check;
							nga_edit_mojo_check.save();
						}
					}
				}else{
					nga_edit_mojo_check.data[i].data = [];
				}
				if (!hid){
					nga_edit_mojo_check.data[i].data.push({id:id,check:check});
					nga_edit_mojo_check.save();
				}
			}
		}
	}else{
		nga_edit_mojo_check.data = [];
	}
	if (!hautoor){
		nga_edit_mojo_check.data.push({autoor:autoor,data:[{id:id,check:check}]});
		nga_edit_mojo_check.save();
	}
	nga_edit_setallmojocheck();
	//function c(autoor,)
}
//postfunc.content.value.length  //帖子长度

//撤销重做之定时保存数据
function nga_edit_setshot(act){
	if (act == "up"){
		try{clearTimeout(nga_edit_timer);}catch(e){};
		nga_edit_timer = setTimeout(nga_edit_settmpshot,1500);
	}else if(act == "down"){
		try{clearTimeout(nga_edit_timer);}catch(e){};
	}
}
function nga_edit_settmpshot(){	//保存数据
	if (nga_edit_tmpshot.length - nga_edit_tmpshot_i < 2){
		if(nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != ''){
			nga_edit_tmpshot.push(document.getElementById('atc_content').value);
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			if (nga_edit_tmpshot.length > 1) nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
		}
	}else{
		if(nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != ''){
			nga_edit_tmpshot[nga_edit_tmpshot_i+1] = document.getElementById('atc_content').value;
			nga_edit_tmpshot.length = nga_edit_tmpshot_i + 2;
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),false);
			if (nga_edit_tmpshot.length > 1) nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
		}
	}
}

//构建TAB内容
function nga_edit_gettabhtml(){
	var t_html = "";
	t_html += '<div class="nga_edui_box">';
	t_html += ' <div class="nga_edui_box1">';
	t_html += '   <div id="nga_edit_icon_chexiao" onclick="nga_edit_icon_click(this,\'chexiao\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="撤销一次操作" class="nga_edui_icon nga_edui_chexiao nga_edui_disabled"></div>';
	t_html += '   <div id="nga_edit_icon_huifu" onclick="nga_edit_icon_click(this,\'huifu\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="重做一次操作" class="nga_edui_icon nga_edui_huifu nga_edui_disabled"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div id="nga_edit_icon_mojo" onclick="event.cancelBubble = true;nga_edit_icon_click(this,\'mojo\');" onmouseover="nga_edit_icon_hover(this,\'move\');var td = document.getElementById(\'nga_edit_quickmojo\');td.style.display = \'block\';td.style.left = nga_plug_elementLeft(this) + 1 + \'px\';td.style.top = nga_plug_elementTop(this) + 23 + \'px\';try{clearTimeout(nga_edit_timer_lists);}catch(e){};" onmouseout="nga_edit_icon_hover(this,\'out\',\'quickmojo\');" title="表情" class="nga_edui_icon nga_edui_mojo">\
					<div id="nga_edit_quickmojo" style="display:none;position : absolute;background-color:#FFF8E5;cursor :default;width:132px;border: 1px solid #777;z-index:3;">'
		for (var i=0;i<nga_edit_quick_mojo.data.length;i++){
		//for (var i=0;i<9;i++){
			t_html += '<img onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,event,\'quick\');" style="border:1px solid #777;margin:1px;cursor:pointer;width:40px;height:40px;" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);" alt="'+nga_edit_quick_mojo.data[i]+'" src="'+nga_edit_quick_mojo.data[i]+'">';
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
	x.add("源码",'<div id="nga_edit_content">'+t_html+'</div>');
	x.add("编辑",'<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_edit" contenteditable="true" class="c1 postcontent ubbcode" style="outline:none;margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');
	x.add("预览",'<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_preview" class="c1 postcontent ubbcode" style="margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');
	
	t_html = x.gethtml();
	
	t_html += '<input type="checkbox" name="hidden">隐藏内容 仅版主可见 <input type="checkbox" name="self_reply">只有作者和版主可以回复<br>';
	return t_html;
}


//在大部分浏览器中实现在选中文字前后插入UBB标签后依然选中原来的文字（如无选中则保证添加完毕后光标处于添加的标签中间）
//textarea可以用getElementById之类函数获取的textarea，tag是标签，如'b'将添加[b]，如有value则添加[b=value]
function nga_edit_addTad(textarea,tag,value){  
	var start = 0,end = 0;
	if(typeof textarea.selectionStart != 'undefined'){
		start = textarea.selectionStart;
		end = textarea.selectionEnd;
	}
	if (value && tag != "nga_edit"){
		start += tag.length + value.length + 3;
		end += tag.length + value.length + 3;
		//postfunc.addTag(tag,value);   //http://img4.ngacn.cc/common_res/js_postcode.js
		postfunc.addText("["+tag+"="+value+"]"+postfunc.getSelectText()+"[/"+tag+"]");
	}else{
		if (tag == "nga_edit"){
			if (value == "@"){
				start += 2;
				end += 2;
				postfunc.addText("[@"+postfunc.getSelectText()+"]");
			}
		}else{
			start += tag.length + 2;
			end += tag.length + 2;
			//postfunc.addTag(tag);
			postfunc.addText("["+tag+"]"+postfunc.getSelectText()+"[/"+tag+"]");
		}
	}
	if(typeof textarea.selectionStart != 'undefined'){
		textarea.setSelectionRange(start, end);
		textarea.focus();
	}
}

function nga_edit_icon_show(obj,act,value){
	var textarea = document.getElementById('atc_content');
	if (act == "size" || act == "font" || act == "color"){
		nga_edit_addTad(textarea,act,value);
	}else if (act =="armory"){
		var nga_edit_s = nga_edit_prompt("请输入服务器名：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入玩家名：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		postfunc.addText("["+value+act+" "+nga_edit_s+" "+nga_edit_s1+"]");
	}else if (act =="item" || act =="achieve" || act =="spell"){
		var nga_edit_s = nga_edit_prompt("请输入 物品/成就 名称或者 物品/成就/法术 ID：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)){
			if (act =="spell") return(obj.selectedIndex = 0);
			value = value=="cn"?"["+act+"]":"["+act+"="+value+"]";
			postfunc.addText(value+nga_edit_s+"[/"+act+"]");
		}else{
			var nga_edit_s1 = nga_edit_prompt("请输入自定义 物品/成就/法术 名称（可不输）：");
			if (nga_edit_s1 == ""){
				value = value=="cn"?"["+act+"]":"["+act+"="+value+"]";
				postfunc.addText(value+nga_edit_s+"[/"+act+"]");
			}else{
				value = value=="cn"?"["+act+"="+nga_edit_s+"]":"["+act+"="+nga_edit_s+","+value+"]";
				postfunc.addText(value+nga_edit_s1+"[/"+act+"]");
			}
		}
	}
	obj.selectedIndex = 0;
	nga_edit_settmpshot()
	try{textarea.focus();}catch(e){};
}

function nga_edit_icon_click(obj,act,o){
	var textarea = document.getElementById('atc_content');
	if (act == 'chexiao'){ //撤销
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_chexiao"))){
			nga_edit_tmpshot_i--;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),true);
			if (nga_edit_tmpshot_i == 0){
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),false);
			}
		}
	}else if(act == 'huifu'){  //重做
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_huifu"))){
			nga_edit_tmpshot_i++;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
			if (nga_edit_tmpshot_i == nga_edit_tmpshot.length - 1){
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),false);
			}
		}
		
	//              粗体          斜体           下划线        删除线         左浮动        右浮动      标题
	}else if(act == 'B' || act == 'I' || act == 'U' || act == 'DEL' || act == 'l' || act == 'r' || act == 'h'){
		nga_edit_addTad(textarea,act);
	}else if(act == 'left' || act == 'center' || act == 'right'){ //居于左中右
		nga_edit_addTad(textarea,"align",act);
	}else if(act == 'roll'){   //ROLL点
		postfunc.addText("[dice]d100[/dice]");
	}else if(act == 'msg'){    //打黑枪
		if (postfunc.getSelectText() == ""){
			var nga_edit_s = nga_edit_prompt("你要给谁发送提醒？");
			if (nga_edit_s!=""){
				postfunc.addText("[@"+nga_edit_s+"]");
			}
		}else{
			nga_edit_addTad(textarea,"nga_edit","@");
		}
	}else if(act == 'pse'){       //插入折叠内容
		if (postfunc.getSelectText() != ""){
			var nga_edit_s = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s!=""){
				nga_edit_addTad(textarea,"collapse",nga_edit_s);
			}else{
				nga_edit_addTad(textarea,"collapse");
			}
		}else{
			var nga_edit_s = nga_edit_prompt("请输入需要折叠的内容：");
			if (nga_edit_s == "") return;
			var nga_edit_s1 = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s1!=""){
				postfunc.addText("[collapse="+nga_edit_s1+"]"+nga_edit_s+"[/collapse]");
			}else{
				postfunc.addText("[collapse]"+nga_edit_s+"[/collapse]");
			}
		}
	}else if(act == 'link'){   //插入链接
		if (postfunc.getSelectText() != ""){
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s!=""){
				nga_edit_addTad(textarea,"url",nga_edit_s);
			}
		}else{
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s == "") return;
			var nga_edit_s1 = nga_edit_prompt("请输入链接文字（可不填）：");
			if (nga_edit_s1!=""){
				postfunc.addText("[url="+nga_edit_s+"]"+nga_edit_s1+"[/url]");
			}else{
				postfunc.addText("[url]"+nga_edit_s+"[/url]");
			}
		}
	}else if(act == 'img'){  //插入图片
		var nga_edit_s = nga_edit_prompt("请输入图片地址：");
		if (nga_edit_s == "") return;
		postfunc.addText("[img]"+nga_edit_s+"[/img]");
	}else if(act == 'flash'){  //插入视频
		var nga_edit_s = nga_edit_prompt("请输入视频地址（仅限于youtube.com/tudou.com/youku.com等站点的FLASH地址）：");
		if (nga_edit_s == "") return;
		postfunc.addText("[flash]"+nga_edit_s+"[/flash]");
	}else if(act == 'heng'){   //插入分割线
		var nga_edit_s = nga_edit_prompt("请输入分割线标题（可不填）：");
		postfunc.addText("==="+nga_edit_s+"===");
	}else if(act == 'quote'){  //插入引用
		if (postfunc.getSelectText() != ""){
			nga_edit_addTad(textarea,"quote");
		}else{
			var nga_edit_s = nga_edit_prompt("请输入引用内容：");
			if (nga_edit_s == "") return;
			postfunc.addText("[quote]"+nga_edit_s+"[/quote]");
		}
	}else if(act == 'code'){    //插入代码
		if (postfunc.getSelectText() != ""){
			nga_edit_addTad(textarea,"code");
		}else{
			var nga_edit_s = nga_edit_prompt("请输入代码内容：");
			if (nga_edit_s == "") return;
			postfunc.addText("[code]"+nga_edit_s+"[/code]");
		}
	}else if(act == 'lists'){   //插入列表
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
			if (nga_edit_s!=""){
				if (t == 0){
					nga_edit_addTad(textarea,"list");
					t = 1;
				}
				postfunc.addText("[*]"+nga_edit_s+"\n");
			}else{return;}
		}
	}else if(act == 'listsa'){
		if (!o){
			document.getElementById("nga_edit_listselectdiv").style.display = document.getElementById("nga_edit_listselectdiv").style.display == "none"?"block":"none";
			document.getElementById("nga_edit_listselectdiv").style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById("nga_edit_listselectdiv").style.top = nga_plug_elementTop(obj) + 23 + 'px';
		}else{
			var nga_edit_s;
			var t = 0;
			while (nga_edit_s!=""){
				nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
				if (nga_edit_s!=""){
					if (t == 0){
						nga_edit_addTad(textarea,"list",o);
						t = 1;
					}
					postfunc.addText("[*]"+nga_edit_s+"\n");
				}else{return;}
			}
		}
	}else if(act == 'album'){  //插入相册
		var nga_edit_s;
		var t = 0;
		nga_edit_s = nga_edit_prompt("请输入相册标题。");
		nga_edit_s = nga_edit_s==""?null:nga_edit_s;
		//nga_edit_addTad(textarea,"album",nga_edit_s);
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入一个图片地址。\n第一张图片将作为封面显示。\n留空或者点击取消以完成此相册：");
			//if (nga_edit_s!="")postfunc.addText(nga_edit_s+"\n");
			if (nga_edit_s!=""){
				if (t == 0){
					nga_edit_addTad(textarea,"album",nga_edit_s);
					t = 1;
				}
				postfunc.addText(nga_edit_s+"\n");
			}else{return;}
		}
	}else if(act == 't'){  //插入178尾巴
		var nga_edit_s = nga_edit_prompt("请输入用户ID（数字）以引用这个用户的最新一条消息，或者输入话题（非数字）以引用这个话题的讨论：");
		if (nga_edit_s == "") return;
		if (isNaN(nga_edit_s)){
			postfunc.addText("[t.178.com/#"+nga_edit_s+"#]");
		}else{
			postfunc.addText("[t.178.com/"+nga_edit_s+"]");
		}
	}else if(act == "tid" || act == "pid"){
		var nga_edit_s = nga_edit_prompt("请输入主题或者或者回复的ID：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)){
			return(obj.selectedIndex = 0);
		}else{
			var nga_edit_s1 = nga_edit_prompt("请输入主题名称（可不输）：");
			if (nga_edit_s1 == ""){
				postfunc.addText("["+act+"]"+nga_edit_s+"[/"+act+"]");
			}else{
				postfunc.addText("["+act+"="+nga_edit_s+"]"+nga_edit_s1+"[/"+act+"]");
			}
		}
	}else if(act == "customachieve"){
		var nga_edit_s = nga_edit_prompt("请输入自定义成就名字（有字数限制）：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入自定义成就文字（有字数限制）：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		var nga_edit_s2 = nga_edit_prompt("请输入自定义成就图标（一个图片的绝地地址）：")
		var tmps = "[customachieve]\n[title]" + nga_edit_s + "[/title]\n[txt]" + nga_edit_s1 + "[/txt]\n";
		if (nga_edit_s2 != "") tmps += "[img]" + nga_edit_s2 + "[/img]\n";
		tmps += "[/customachieve]";
		postfunc.addText(tmps);
	}else if(act == "db3"){
		var nga_edit_s = nga_edit_prompt("请输入battle net中人物信息页面的地址：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		postfunc.addText("[url]" + nga_edit_s + "#armory[/url]");
	}else if(act == "crypt"){
		var nga_edit_s = nga_edit_prompt("请输入需要加密的内容：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入密码：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		if (nga_edit_s1.length<5){
			alert('请使用更长的密码')
			return(obj.selectedIndex = 0);
		}
		if (nga_edit_s1.match(/[^0-9A-Za-z_]/)){
			alert('请使用大小写字母或数字做密码');
			return(obj.selectedIndex = 0);
		}
		postfunc.addText("[crypt]"+ubbcode.crypt.c(ubbcode.crypt.rc4(nga_edit_s1,nga_edit_s))+"[/crypt]");
	}else if(act == "table"){
		nga_edit_table("create","",obj);
	}else if(act == "mojo"){
		document.getElementById("nga_edit_quickmojo").style.display = "none";
		nga_edit_mojo("create",obj);
	}else if(act == "randomblock"){
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入随机项目内容，换行使用“\\n”或者添加完后手动换行。\n\n留空或者点击取消以完成此列表：");
			//nga_edit_addTad(textarea,"randomblock",nga_edit_s);
			if (nga_edit_s != "") postfunc.addText("["+act+"]"+nga_edit_s+"[/"+act+"]\n");
		}
	}
	if (act != 'huifu' && act != 'chexiao') nga_edit_settmpshot();
	try{document.getElementById('atc_content').focus();}catch(e){};
}

//表情模块  创建选择表情窗口、预览、点击
function nga_edit_mojo(act,obj,e,autoor,id){
	if (act == "create"){
		nga_edit_setallmojocheck();
		if (document.getElementById('nga_edit_mojo')){
			document.getElementById('nga_edit_mojo').style.display = document.getElementById('nga_edit_mojo').style.display == "block" ? "none":"block";
			document.getElementById('nga_edit_mojo').style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById('nga_edit_mojo').style.top = nga_plug_elementTop(obj) + 23 + 'px';
		}else{
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
			for (var i=0;i<nga_plug_mojo.length;i++){
				for (var k=0;k<nga_plug_mojo[i].data.length;k++){
					if (nga_plug_mojo[i].data[k].check || i == 0){
						s = "";
						for (var l=0;l<nga_plug_mojo[i].data[k].img.length;l++){
							s += '<div style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,event,\''+nga_plug_mojo[i].autoor+'\',\''+nga_plug_mojo[i].data[k].id+'\');" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);">';
							if (i>1) s += '<div onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,\'add\');" title="把这个表情添加到自定义表情" style="display:none;position: absolute;background: url(\'http://ngaplug.googlecode.com/svn/ngaplug/img/add.png\');height:15px;width:15px;border-right:1px solid #777;border-bottom:1px solid #777;"></div>';
							if (i==1) s += '<div onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,\'del\');" title="从自定义表情中删除这个表情" style="display:none;position: absolute;background: url(\'http://ngaplug.googlecode.com/svn/ngaplug/img/del.png\');height:15px;width:15px;border-right:1px solid #777;border-bottom:1px solid #777;"></div>';
							s += '<img style="width:40px;height:40px;" alt="'+(i==0?nga_plug_mojo[i].data[k].alt[l]:nga_plug_mojo[i].data[k].img[l])+'" src="'+nga_plug_mojo[i].data[k].img[l]+'"></div>';
						}
						var t = false;
						if (i==1){
							s += '<div title="手动添加自定义表情" style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,\'add1\');">';
							s += '<img style="width:40px;height:40px;" src="http://ngaplug.googlecode.com/svn/ngaplug/img/add1.png"></div>';
						}
						try{if (nga_edit_mojo_check.data[0].lastautoor == nga_plug_mojo[i].autoor && nga_edit_mojo_check.data[0].id == nga_plug_mojo[i].data[k].id) t = true;}catch(e){}
						x.add(nga_plug_mojo[i].data[k].title,s,t);
					}
				}
			}
			document.getElementById("nga_edit_mojo_b").innerHTML = x.gethtml();
		}
	}else if(act=="click"){
		//点击表情
		if (e=="add"){   //添加自定义表情
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].src;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == tsrc.toLowerCase()){
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(tsrc);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		}else if(e=="add1"){    //手动输入网址添加自定义表情
			var nga_edit_s = nga_edit_prompt("请输入想添加的自定义表情网址：");
			if (nga_edit_s=="") return;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == nga_edit_s.toLowerCase()){
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(nga_edit_s);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		}else if(e=="del"){       //删除自定义表情
			if(!confirm( "确定要删除这个表情吗？")){
				return;
			}
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].alt;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i] == tsrc){
					nga_edit_custom_mojo.data[0].img.splice(i,1);
					nga_edit_custom_mojo.save();
					obj.parentNode.parentNode.removeChild(obj.parentNode);
					document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';
					nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
					return;
				}
			}
		}
		if (obj.tagName.toLowerCase() == "div") obj = obj.getElementsByTagName("img")[0]
		if (obj.src != obj.alt){
			postfunc.addsmile('['+obj.alt+']');
		}else{
			postfunc.addsmile('[img]'+obj.src+'[/img]');
		}
		if (!e.ctrlKey && autoor != "quick") nga_edit_mojo("create");
		var isquickmojo = false;
		
		//快速表情
		for (var i=0;i<nga_edit_quick_mojo.data.length;i++){
			if (nga_edit_quick_mojo.data[i] == obj.alt || nga_edit_quick_mojo.data[i] == obj.src) isquickmojo = true;

		}
		if (!isquickmojo){
			var tsrc;
			if (autoor == "NGA"){
				tsrc = obj.src;
			}else{
				tsrc = obj.alt;
			}
			if (nga_edit_quick_mojo.data.length < 9){
				nga_edit_quick_mojo.data.push(tsrc);
			}else{
				for (var i=0;i<nga_edit_quick_mojo.data.length-1;i++){
					nga_edit_quick_mojo.data[i] = nga_edit_quick_mojo.data[i+1];
				}
				nga_edit_quick_mojo.data[8] = tsrc;
			}
			nga_edit_quick_mojo.save();
		}//快速表情完毕
		
		nga_edit_settmpshot();
		if (autoor != "quick"){
			if (nga_edit_mojo_check.data.length == 0){
				nga_edit_mojo_check.data.push({lastautoor:autoor,id:id});
			}else{
				if (nga_edit_mojo_check.data[0].id){
					nga_edit_mojo_check.data[0] = {lastautoor:autoor,id:id};
				}else{
					nga_edit_mojo_check.data.unshift({lastautoor:autoor,id:id});
				}
			}
			nga_edit_mojo_check.save();
		}
	}else if(act=="over"){
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try{clearTimeout(timer);}catch(e){};
		try{obj.getElementsByTagName("div")[0].style.display = 'block';}catch(e){};
		var tsrc;
		if (obj.tagName.toLowerCase() == "div") tsrc = obj.getElementsByTagName("img")[0].src; else tsrc = obj.src;
		previewdiv.innerHTML = "<img style='margin: 5px' src='" + tsrc + "' \/>";
		previewdiv.style.display = 'block';
		previewdiv.style.left = nga_plug_elementLeft(obj) + 1 + 'px';
		previewdiv.style.top = nga_plug_elementTop(obj) + 44 + 'px';
	}else if(act=="out"){
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try{obj.getElementsByTagName("div")[0].style.display = 'none';}catch(e){};
		timer = setTimeout("document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';",500);
	}
}

var nga_edit_table_o = new Array();
function nga_edit_table(act,value,obj){
	if (act == "create"){
		if (document.getElementById('nga_edit_table')){
			document.body.removeChild(document.getElementById('nga_edit_table'));
		}else{
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
	}else if(act == "check"){
		try{
			if (isNaN(value)) obj.value = 0;
			if (parseInt(value) < 0) obj.value = 0;
			if (parseInt(value) > 30) obj.value = 30;
		}catch(e){};
	}else if(act == "arr"){
		SetArrs(obj.parentNode.rowIndex,obj.cellIndex,value,obj.getElementsByTagName('input')[0].value);
		SetUBB();
	}else if(act == "adv"){
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		SetArr(r1,c1);
		divs.style.display = "block";
		SetUBB();
	}else if(act == "add"){
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		if (nga_edit_table_o.length == 0) SetArr(r1,c1);
		var tables = document.getElementById('nga_edit_table_b').getElementsByTagName("table")[0];
		postfunc.addText(GetUBB());
		nga_edit_table("create");
		nga_edit_table_o = new Array();
	}else if(act == "txt"){
		nga_edit_table_o[obj.parentNode.rowIndex][obj.cellIndex].t = value;
	}
	
	
	function SetArr(r,c){
		nga_edit_table_o = new Array(r);
		for (var i=0;i<r;i++){
			nga_edit_table_o[i] = new Array(c);
			for (var k=0;k<c;k++){
				nga_edit_table_o[i][k] = {};
			}
		}
	}
	function SetArrs(m,n,a,s){
		nga_edit_table_o[m] = nga_edit_table_o[m] || [];
		if (a == "r"){
			if (nga_edit_table_o[m][n].r){
				nga_edit_table_o[m][n].r += 1;
			}else{
				nga_edit_table_o[m][n].r = 2;
			}
			for (var j=m+nga_edit_table_o[m][n].r-1;j>m;j--){  //1
				for (var k=nga_edit_table_o[j].length-1;k>=0;k--){  //1-0
					if (nga_edit_table_o[j][k].no == null || nga_edit_table_o[j][k].no){  
						var tc = nga_edit_table_o[m][n].c == null?1:nga_edit_table_o[m][n].c; //1
						for (var l=k;l>k-tc;l--) nga_edit_table_o[j][l].no = true;
						return;
					}
				}
				
			}
		}else if (a == "c"){
			if (nga_edit_table_o[m][n].c){
				nga_edit_table_o[m][n].c += 1;
			}else{
				nga_edit_table_o[m][n].c = 2;
			}
			for (var k=nga_edit_table_o[m].length-1;k>=0;k--){
				if (nga_edit_table_o[m][k].no == null || nga_edit_table_o[m][k].no){
					for (var l=k;l>k-nga_edit_table_o[m][n].c+1;l--) nga_edit_table_o[m][l].no = true;
					return;
				}
			}
		}else if (a == "w"){
			var nga_edit_s = nga_edit_prompt("请输入这个列的宽度（0-99之内的数字，表示这个列的宽度为百分之多少，0表示自动款速）：");
			if (nga_edit_s == "") return;
			if (isNaN(nga_edit_s)) return(alert("请输入1-99之间的数字！"));
			var i = parseInt(nga_edit_s);
			if (i<0||i>99) return(alert("请输入1-99之间的数字！"));
			nga_edit_table_o[m][n].w = i;
		}
	}
	function SetUBB(){
		var pretable = document.getElementById('nga_edit_table_b');
		pretable.innerHTML = GetUBB().replace(/\n/g,'<br>');
		ubbcode.bbsCode({c:pretable,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
		var tables = pretable.getElementsByTagName("table")[0];
		for (var i=0;i<tables.rows.length;i++){
			for (var k=0;k<tables.rows[i].cells.length;k++){
				tables.rows[i].cells[k].innerHTML = "<input style='width:80%' onchange='nga_edit_table(\"txt\",this.value,this.parentNode)' value='" + tables.rows[i].cells[k].innerHTML + "' />\
					<a href='javascript:void(0)' title='向右合并' onclick='nga_edit_table(\"arr\",\"c\",this.parentNode)' class='right'>→</a> \
					<a href='javascript:void(0)' title='向下合并' onclick='nga_edit_table(\"arr\",\"r\",this.parentNode)' class='right'>↓</a> \
					<a href='javascript:void(0)' title='设置宽度' onclick='nga_edit_table(\"arr\",\"w\",this.parentNode)' class='right'>↔</a>";
			}
		}
	}
	function GetUBB(){
		var s = "[table]";
		for (var i=0;i<nga_edit_table_o.length;i++){
			s += "[tr]"
			for (var k=0;k<nga_edit_table_o[i].length;k++){
				if (!nga_edit_table_o[i][k].no){
					s += "[td";
					if (nga_edit_table_o[i][k].w<100 && nga_edit_table_o[i][k].w>0) s += " width" + nga_edit_table_o[i][k].w;
					if (nga_edit_table_o[i][k].c) s += " colspan" + nga_edit_table_o[i][k].c;
					if (nga_edit_table_o[i][k].r) s += " rowspan" + nga_edit_table_o[i][k].r;
					s += "]";
					if (nga_edit_table_o[i][k].t) s += nga_edit_table_o[i][k].t;
					s += "[/td]";
				}
			}
			s += "[/tr]"
		}
		s += "[/table]"
		return s;
	}
}

function nga_edit_prompt(title){
	var nga_edit_s = prompt(title);
	if (nga_edit_s == "" || nga_edit_s == null)
		return "";
	else
		return nga_edit_s;
}
//获取按钮是否被禁用
function nga_edit_icon_getEnabled(obj){
	return obj.className.indexOf("nga_edui_disabled") >= 0?false:true
}

//禁用\启用按钮
function nga_edit_icon_setEnabled(obj,Enabled){
	if (Enabled){
		obj.className = obj.className.replace(" nga_edui_disabled","");
	}else{
		obj.className = obj.className + " nga_edui_disabled";
		obj.style.border="1px solid #FFF8E5";
	}
}

//鼠标移动时给按钮加上\去除边框
function nga_edit_icon_hover(div,act,o){
	if (nga_edit_icon_getEnabled(div)){
		if (act=="move"){
			div.style.border="1px solid #777";
		}else if(act=="out"){
			div.style.border="1px solid #FFF8E5";
		}
	}
	if (o == "option"){
		if (act == "out"){
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_listselectdiv").style.display = "none"',500);
		}else if(act == "move"){
			try{clearTimeout(nga_edit_timer_lists);}catch(e){};
		}
	}else if (o == "quickmojo"){
		if (act == "out"){
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_quickmojo").style.display = "none"',500);
		}else if(act == "move"){
			try{clearTimeout(nga_edit_timer_lists);}catch(e){};
		}
	}
}