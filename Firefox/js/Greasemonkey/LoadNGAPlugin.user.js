// ==UserScript==
// @name        加载黑科技插件
// @namespace   nga
// @include     http://bbs.ngacn.cc/*
// @include		http://nga.178.com/*
// @version     1
// ==/UserScript==

loader.script('https://raw.github.com/player2135/Mine/Firefox/Firefox/js/nga_command.js');

//loader.script('http://nga.jctrl.org/nga-ext.js');

(function(window, undefined) {

	'use strict';

	var serverUrl = "http://nga.jctrl.org", postTables = (function() {
		var tables = document.getElementsByTagName("table"), res = [], i = 0;
		for (; i < tables.length; i++) {
			if (tables[i].className == "forumbox postbox") {
				res.push(tables[i]);
			}
		}
		return res;
	})(), curId = window["__CURRENT_UID"] || 0, loadJS = function(url) {
		var script = document.createElement("script"), head = document.head
				|| document.documentElement;

		script.charset = "UTF-8";
		script.src = url;
		script.onload = script.onreadystatechange = function(_, isAbort) {

			if (isAbort || !script.readyState
					|| /loaded|complete/.test(script.readyState)) {
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

			}
		};
		head.insertBefore(script, head.firstChild);

	}, encode = function(input) {
		input = input.replace(/\r\n/g, "\n");
		var utftext = "";

		for ( var n = 0; n < input.length; n++) {

			var c = input.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return escape(utftext);
	}, createDom = function(html) {
		var tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.childNodes[0];
	}, getUid = function(d) {
		var list = d.getElementsByTagName("a");
		for ( var i = 0; i < list.length; i++) {
			if (list[i].name == "uid") {
				return list[i].innerText || list[i].textContent;
			}
		}
	}, setCookie = function(c_name,value, expire){ 
		var expiredays = expire || 1;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name
				+ "="
				+ escape(value)
				+ ((expiredays == null) ? "" : ";expires="
						+ exdate.toGMTString());
	}, getCookie = function(c_name) {
		var cookies = document.cookie.split(';');
		var cookie = '';
		for ( var i = 0; i < cookies.length; i++) {
			cookie = cookies[i].split('=');
			if (cookie[0].replace(/^\s+|\s+$/g, '') == c_name) {
				return (cookie.length <= 1) ? "" : unescape(cookie[1].replace(
						/^\s+|\s+$/g, ''));
			}
		}
		return "";
	}, Panel = function(tags, parent) {
		var tag, last = '', uid = getUid(parent), frame = createDom('<div style="margin-top: 5px;"><div style="clear: both;float: none;"></div></div>'), input = createDom('<input type="text" style="height:20px; width: 50px;padding: 2px;float: left; border:1px solid #FFF9E7; background-color: #EFE9D7; border-bottom: 1px solid #DFD9C7; border-right: 1px solid #DFD9C7; margin: 2px;"></input>');
		frame.insertBefore(input, frame.lastChild);

		if (tags.hasOwnProperty(uid)) {
			tags = tags[uid];
		}

		for ( var i = 0; i < tags.length; i++) {

			if (tags[i].addTo != uid) {
				continue;
			}

			tag = createDom('<div style="cursor: pointer; float: left; padding: 2px 6px 2px 6px; border-color: #FFF9E7; background-color: #EFE9D7; border-bottom: 1px solid #DFD9C7; border-right: 1px solid #DFD9C7; margin: 2px;"></div>');
			tag.title = tags[i].content;
			if (tags[i].content.length > 4) {
				tag.textContent = tag.innerText = tags[i].content.substr(0, 4)
						+ "..";
			} else {
				tag.textContent = tag.innerText = tags[i].content;
			}

			if (getCookie(tags[i].id) == '1') {
				tag.style.cursor = "";
			}

			tag.onclick = (function(id, to) {
				return function() {
					setCookie(id, 1);
					if (this.style.cursor == "pointer") {
						this.style.cursor = "";
						loadJS(serverUrl + "/api/tags/like?user=" + to
								+ "&tid=" + id);
					}
				};
			})(tags[i].id, tags[i].addTo);

			tag.oncontextmenu = (function(id, to) {
				return function() {
					setCookie(id, 1);
					if (this.style.cursor == "pointer") {
						this.style.cursor = "";
						loadJS(serverUrl + "/api/tags/unlike?user=" + to
								+ "&tid=" + id);
					}
					return false;
				};
			})(tags[i].id, tags[i].addTo);

			frame.insertBefore(tag, input);
		}

		input.onblur = function() {

			if (input.value == last || input.value == '') {
				return;
			}

			last = input.value;

			var request = "from=" + curId + "&to=" + uid + "&ctx="
					+ encode(last);
			loadJS(serverUrl + "/api/tags/add?" + request);
		};

		this.append = function() {
			var place = parent.getElementsByTagName("span");

			for ( var i = 0; i < place.length; i++) {
				if (place[i].className == "posterinfo") {
					place[i].appendChild(frame);
					return;
				}
			}
		};
	}, init = function() {

		if (!getCookie("update_")) {
			setCookie("update_", "true", 10000);
			loadJS(serverUrl + "/alert.js");
		}

		var uidd = document.getElementsByName("uid"), request = "_";

		if (postTables.length == 0 || uidd.length == 0) {
			return;
		}

		for ( var i = 0; i < uidd.length; i++) {
			request += "&users=" + (uidd[i].innerText || uidd[i].textContent);
		}

		loadJS(serverUrl + "/api/tags?" + request);
	};

	window.extCallBack = function(o) {
		for ( var i = 0; i < postTables.length; i++) {
			new Panel(o.d, postTables[i]).append();
		}
	};

	init();

})(window);

