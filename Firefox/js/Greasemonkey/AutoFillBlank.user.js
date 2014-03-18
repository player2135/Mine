// ==UserScript==
// @name        自动填写表单
// @namespace   all
// @include     *
// @version     1
// ==/UserScript==

var autoFillList = [{
		url : "http://www.hzti.com/service/qry/violation_veh.aspx?node=249&type=2",
		forms : [{
				id : "ctl00_ContentPlaceHolder1_hpzl",
				value : "小型汽车"
			}, {
				id : "ctl00_ContentPlaceHolder1_steelno",
				value : "浙AG097T"
			}, {
				id : "ctl00_ContentPlaceHolder1_identificationcode",
				value : "097565"
			}
		]
	}
];

var all = {};
all.autoFillForm = function () {
	var pageUrl = location.href.toLowerCase();
	for (var i = 0; i < autoFillList.length; i++) {
		var url = autoFillList[i].url.toLowerCase();
		if (pageUrl == url) {
			var firstNode = autoFillList[i];
			for (var j = 0; j < firstNode.forms.length; j++) {
				try {
					document.getElementById(firstNode.forms[j].id).value = firstNode.forms[j].value;
				} catch(err) {console.log(err);}
			}
		}
	}
};
all.autoFillForm();
