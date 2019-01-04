var _search_page_id = "";
var _objAllSearchResult = document.getElementById("js-search-page");
var _objAllSearchKeyword = document.getElementById("js-search-keyword-text");
var _objAllSearchResultDiv = document.getElementById("js-search-result-div");
var hostsssss = "m.ctrip.com/restapi/h5api/searchapp";
var CurrentTimeString = '';
document.getElementById("search_button_gs_back").onclick = function() {
	indexPage.show();
	if (typeof headerview !== "undefined" && headerview !== null) {
		headerview.show()
	}
	_objAllSearchResult.style.display = "none";
	window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", 'searchType=C&inputkeyword="' + _objAllSearchKeyword.value + '"'])
};

function _renderHeader() {
	_objAllSearchResult.style.display = "block";
	_historyResultDiv()
}
function _jointUrl(c, a) {
	var b = "";
	if (c.indexOf("?") > 0) {
		b = c + "&" + a
	} else {
		b = c + "?" + a
	}
	return b
}
function _conversType(b) {
	var a = b;
	switch (a) {
	case "hotelbrand":
	case "channelhotelsearch":
	case "channelhotellistsearch":
	case "poihotel":
	case "hotellist":
	case "locationhotel":
	case "zone":
	case "zonehotel":
	case "hotel":
	case "channelhotel":
	case "trainhotel":
	case "airporthotel":
	case "desthotel":
		a = "hotel";
		break;
	case "ticket":
	case "tickets":
	case "channelticketsearch":
	case "channelticket":
		a = "tickets";
		break;
	case "intlairport":
	case "channelplane":
	case "channelplanesearch":
	case "airport":
	case "flight":
		a = "flight";
		break;
	case "metrostation":
	case "trainstation":
	case "railwaystation":
	case "channeltrain":
	case "channeltrainsearch":
	case "train":
	case "busstation":
	case "channelbus":
	case "channelbussearch":
		a = "train";
		break;
	case "sight":
	case "poi":
		a = "attractions";
		break;
	case "fun":
	case "huodong":
	case "entertainment":
		a = "play";
		break;
	case "shop":
	case "shopping":
		a = "shopping";
		break;
	case "food":
	case "sightrestaurant":
		a = "food";
		break;
	case "tuan":
	case "channelgroup":
	case "channelgroupsearch":
	case "channeltuansearch":
	case "channeltuan":
	case "group":
		a = "tuan";
		break;
	case "district":
	case "hotdistrict":
	case "location":
	case "ttdlist":
		a = "location";
		break;
	case "channeltravel":
	case "channeltravelsearch":
	case "sighttravel":
	case "vacation":
	case "visa":
	case "grouptravel":
	case "travelgroup":
	case "flighthotel":
	case "sighthotel":
	case "hhtravel":
		a = "vacation";
		break;
	case "channelgs":
	case "channelgssearch":
	case "gs":
		a = "gs";
		break;
	case "cruise":
	case "port":
	case "channelcruise":
	case "channelcruisesearch":
		a = "cruise";
		break;
	case "car":
		a = "location";
		break;
	default:
		a = "location"
	}
	return a
}
document.getElementById("search_button_gs_global").onclick = function(i) {
	if (_objAllSearchKeyword.value == "") {
		isDownloadAPP()
	} else {
		var g = _objAllSearchResult.getElementsByTagName("li");
		var c = g[1];
		var h = c.getAttribute("keyword");
		var b = c.getAttribute("district") || " ";
		var d = c.getAttribute("url");
		var f = c.getAttribute("type");
		if (!d) {
			_doNothing()
		} else {
			var a = _jointUrl(d, "ctm_ref=ch5_hp_sb_lst");
			window.location = a;
			_addCookie(_allSearchHtmlEncode(h), b, d);
			window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", 'searchType=S&keyword="' + c.getAttribute("keyword") + '"&inputkeyword="' + _objAllSearchKeyword.value + '"']);
			return false
		}
	}
};

function _allSearchEnterIn(a) {
	try {
		var a = a ? a : (window.event ? window.event : null);
		if (a.keyCode == 13) {
			a.preventDefault && a.preventDefault();
			a.stopPropagation && a.stopPropagation();
			a.returnValue = false;
			if (_objAllSearchKeyword.value == "") {
				_doNothing();
				return
			}
			var c = _objAllSearchResult.getElementsByTagName("li");
			var b = c[1];
			b.click()
		}
	} catch (d) {}
}
document.getElementById("js-search-keyword-text").onfocus = function() {
	if(_objAllSearchKeyword.value.length == 0){
		_historyResultDiv();		
	}
};

function _allSearchHtmlEncode(b) {
	try {
		return b.replace(/&/g, "&amp").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\+/g, "＋")
	} catch (a) {
		return ""
	}
}
document.getElementById("search_button_gs_clear").onclick = function() {
	_objAllSearchKeyword.value = "";
	_historyResultDiv()
};
document.getElementById("js-search-keyword-text").onkeydown = function(a) {

	try {
		var a = a ? a : (window.event ? window.event : null);
		if (a.keyCode == 13 || a.keyCode == 38 || a.keyCode == 40) {
			_allSearchEnterIn(a)
		}
	} catch (b) {}
};
if ("\v" == "v") {
	document.getElementById("js-search-keyword-text").onpropertychange = _webChange
} else {
	document.getElementById("js-search-keyword-text").addEventListener("input", _webChange, false)
}
_historyResultDiv();

function _webChange() {
	var a = _objAllSearchKeyword.value;
	if (a != null && a.length != 0) {
		_drawOut(a);
	}else {
		_historyResultDiv();
	}
}
function _navigatorMSIE() {
	userAgent = window.navigator.userAgent.toLowerCase();
	if (userAgent.indexOf("msie") >= 0) {
		return 1
	}
	return 0
}
function getCurrentTime(){
    var mydate = new Date();
    return mydate.getMinutes()+":"+mydate.getSeconds()+":"+mydate.getMilliseconds();
}
function _drawOut(a) {
	var nowTime = getCurrentTime();
	CurrentTimeString = nowTime;
	var b = null;
	if (window.XMLHttpRequest) {
		if (_navigatorMSIE() == 1 && window.XDomainRequest) {
			b = new XDomainRequest()
		} else {
			b = new XMLHttpRequest()
		}
	} else {
		b = new ActiveXObject("Microsoft.XMLHTTP")
	}

	var c = "//" + hostsssss + "/search?source=mobileweb&action=autocomplete&contentType=json&keyword=";
	c += encodeURIComponent(a);
	b.open("GET", c, true);
	b.send(null);
	b.onload = function() {
        if(CurrentTimeString !== nowTime){
            return;
		}
		var d = JSON.parse(b.responseText);
		if (d !== null && d.data !== null && d.data.length > 0) {
			_renderResult(a, d.data);
		} else {
			if (a !== "") {
				_renderNoResultDiv(a);						
			} else {
				_historyResultDiv();				
			}
		}
	}
}
function _dumpHref(c) {
	var g = c.getAttribute("keyword");
	var b = c.getAttribute("district") || " ";
	var e = c.getAttribute("url");
	var f = c.getAttribute("type");
	var d = parseInt(c.getAttribute("index"));
	var a = _jointUrl(e, "ctm_ref=ch5_hp_bs_lst");
	if (g == "下载携程APP 专享优惠低至50%") {
		isDownloadAPP()
	} else {
		window.location = a
	}
	if (g !== "下载携程APP 专享优惠低至50%") {
		_addCookie(_allSearchHtmlEncode(g), b, e)
	}
	window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", "searchType=BS&AutoType=" + c.getAttribute("type") + "&Yindex=" + (d + 1) + '&keyword="' + c.getAttribute("keyword") + '"&inputkeyword="' + _objAllSearchKeyword.value + '"'])
}
function _renderResult(g, a) {
	var f = '<ul class="search-list">';
	var b = "";
	f += "<li url=" + b + ' class="js-url" index="0" keyword="下载携程APP 专享优惠低至50%" type="hotdistrict" onclick="_dumpHref(this)"><i class="i-download-item"></i><span>下载携程APP 专享优惠低至</span><span class="span2">50%</span></li>';
	for (var e = 0; e <= a.length - 1; e++) {
		var j = a[e];
		if (j.url.indexOf("http:") == 0) {
			j.url = j.url.replace("http:", "")
		}
		var d = j.districtname;
		if (!d) {
			d = " "
		}
		var c = _allSearchHtmlEncode(j.word);
		if (j.type == "hotel" || j.type == "desthotel") {
			var h;
			if (j.price == "undefined" || j.price == null || j.price == "实时计价") {
				h = '<span class="search-pirce">实时计价</span><em>'
			} else {
				h = '<span class="search-pirce">¥' + j.price + "</span>起<em>"
			}
			f += "<li url=" + j.url + ' class="js-url" index ="' + e + '" keyword="' + c + '" district="' + d + '"  type =' + j.type + ' onclick="_dumpHref(this)"><i class="i-' + _conversType(j.type) + '"></i>' + j.word.split(g).join("<strong>" + g + "</strong>") + '<em class="js-districtname">  ' + (j.districtname || "") + " " + (j.zonename || "") + "</em><p>" + h + (j.star || "") + '</em></p><i class="fill-in"  onclick=_fillWord(event)></i></li>'
		} else {
			if (j.type == "flightschedule") {
				f += "<li url=" + j.url + ' class="js-url" index ="' + e + '" keyword="' + c + '" district="' + d + '"  type =' + j.type + ' onclick="_dumpHref(this)"><i class="i-flight"></i><p class="flight-num">' + j.word.split(g).join("<strong>" + g + "</strong>") + '</p><p class="flight-cont">' + j.departurecity + j.departureairport + "<i></i>" + j.arrivalcity + j.arrivalairport + '</p><i class="fill-in"  onclick=_fillWord(event)></i></li>'
			} else {
				f += "<li url=" + j.url + ' class="js-url" index ="' + e + '" keyword="' + c + '" district="' + d + '"  type =' + j.type + ' onclick="_dumpHref(this)"><i class="i-' + _conversType(j.type) + '"></i>' + j.word.split(g).join("<strong>" + g + "</strong>") + '<em class="js-districtname">  ' + j.districtname + '</em><i class="fill-in"  onclick=_fillWord(event)></i></li>'
			}
		}
	}
	f += " </ul>";
	if (_objAllSearchKeyword.value.length == 0) {
		return;
	}
	_objAllSearchResultDiv.innerHTML = f;
	_objAllSearchResultDiv.style.display = "block"
}
function _doNothing(a) {
	var a = a ? a : (window.event ? window.event : null);
	a.preventDefault && a.preventDefault();
	a.stopPropagation && a.stopPropagation();
	a.returnValue = false
}
function _renderNoResultDiv(a) {
	var b = '<div class="noresult">抱歉，没有搜索到相关信息</div>' + '<h4 class="search-title">您还可以在携程查找：</h4>' + '<ul class="search-list" id="noresultchannel">' + '<li onClick="_noresultHref(this)" keyword = "机票CHN"  url="//m.ctrip.com/webapp/flight/"><i class="i-flight"></i>机票</li>' + '<li onClick="_noresultHref(this)" keyword = "酒店CHN"  url="//m.ctrip.com/webapp/hotel/"><i class="i-hotel"></i>酒店</li>' + '<li onClick="_noresultHref(this)" keyword = "攻略CHN" url="//m.ctrip.com/you/"><i class="i-gs"></i>攻略社区</li>' + '<li onClick="_noresultHref(this)" keyword = "门票CHN" url="//m.ctrip.com/webapp/ticket/index"><i class="i-tickets"></i>门票</li>' + '<li onClick="_noresultHref(this)" keyword = "旅游CHN" url="//m.ctrip.com/webapp/vacations/tour/"><i class="i-vacation"></i>旅游</li>' + '<li onClick="_noresultHref(this)" keyword = "火车CHN" url="//m.ctrip.com/webapp/train/"><i class="i-train"></i>火车票</li>' + '<li onClick="_noresultHref(this)" keyword = "团购CHN" url="//m.ctrip.com/webapp/tuan/"><i class="i-tuan"></i>团购</li></ul>';
	_objAllSearchResultDiv.innerHTML = b;
	_objAllSearchResultDiv.style.display = "block"
}
function _addCookie(h, d, a) {
	h = _allSearchHtmlEncode(h);
	var l = h + "#--" + d;
	var f = h + "#--" + d + "#==" + a;
	var b = _readCookie();
	if (b != null) {
		var m = b.split("#&&")
	} else {
		var m = new Array()
	}
	for (var k = 0; k < m.length; k++) {
		var g = m[k].split("#==");
		if (g.length > 1) {
			if (g[0] == l) {
				return
			}
		}
	}
	if (m.length == 5) {
		m.shift()
	}
	m.push(f);
	var n = m.join("#&&");
	var j = "SearchHistoryWordHPGlobal" + "=" + escape(n);
	try {
		localStorage.setItem("SearchHistoryWordHPGlobal", j)
	} catch (i) {}
}
function _readCookie() {
	var a;
	try {
		a = localStorage.getItem("SearchHistoryWordHPGlobal")
	} catch (c) {}
	if (!a || a == "") {
		return null
	}
	var b = unescape(a.split("SearchHistoryWordHPGlobal=")[1]);
	return b
}
function _deleteCookie(i) {
	var d = _readCookie();
	var m = i.currentTarget.parentElement.getAttribute("keyword");
	var g = i.currentTarget.parentElement.getAttribute("dis");
	var b = m + "#--" + g;
	try {
		if (d != null) {
			var n = d.split("#&&");
			for (var k = 0; k < n.length; k++) {
				var h = n[k].split("#==");
				if (h[0] == b) {
					n.splice(k, 1)
				}
			}
			if (n.length != 0) {
				var o = n.join("#&&");
				var j = "SearchHistoryWordHPGlobal=" + escape(o);
				var f = new Date();
				var a = 30 * 24 * 3600 * 1000;
				f.setTime(f.getTime() + a);
				j += "; expires=" + f.toGMTString();
				document.cookie = j
			} else {
				var f = new Date();
				f.setTime(f.getTime() - 10000);
				document.cookie = "SearchHistoryWordHPGlobal=a; expires=" + f.toGMTString()
			}
		}
	} catch (l) {} finally {
		d = _readCookie();
		if (d == null) {
			_hideHistory()
		} else {
			var n = d.split("#&&");
			if (n.length == 0) {
				_hideHistory()
			}
		}
		if (i && i.stopPropagation) {
			i.stopPropagation()
		} else {
			window.event.cancelBubble = true
		}
		_historyResultDiv()
	}
}
function _clearHistory() {
	document.getElementById("historySubDiv").style.display = "none";
	try {
		localStorage.setItem("SearchHistoryWordHPGlobal", "")
	} catch (a) {}
}
function _hideHistory() {
	_objAllSearchResult.style.display = "none"
}
function _historyHref(a) {
	window.location = _jointUrl(a.getAttribute("url"), "ctm_ref=ch5_hp_his_lst");
	window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", 'searchType=HIS&keyword="' + a.getAttribute("keyword") + '"'])
}
function _noresultHref(a) {
	window.location = _jointUrl(a.getAttribute("url"), "ctm_ref=ch5_hp_chn_lst");
	window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", 'searchType=CHN&keyword="' + a.getAttribute("keyword") + '"'])
}
function _hotHref(a) {
	window.location = _jointUrl(a.getAttribute("url"), "ctm_ref=ch5_hp_hot_lst");
	window["__bfi"].push(["_tracklog", "H5_SEARCH_AUTOCOMPLET_US", 'searchType=HOT&keyword="' + a.getAttribute("keyword") + '"'])
}
function _fillWord(c) {
	var b = c.currentTarget.parentElement.getAttribute("keyword");
	var a = c.currentTarget.parentElement;
	_objAllSearchKeyword.value = b;
	_drawOut(b);
	if (c && c.stopPropagation) {
		c.stopPropagation()
	} else {
		window.event.cancelBubble = true
	}
}
function _historyResultDiv() {
	//if (_objAllSearchKeyword.value && _objAllSearchKeyword.value.length != 0) {
	//	_drawOut(_objAllSearchKeyword.value);
	//	return;
	//}
	var d = "";
	var a = "";
	var e = _readCookie();
	if (e != null) {
		var j = e.split("#&&");
		if (j.length > 0) {
			d += '<div class="js-history-wrap" id="historySubDiv"><h4 class="search-title">历史搜索</h4><ul class="search-list2">';
			for (var i = j.length - 1; i >= 0; i--) {
				var b = j[i].split("#==");
				var g = b[0].split("#--");
				if (b[1].indexOf("http:") == 0) {
					b[1] = b[1].replace("http:", "")
				}
				d += '<li href="javascript:void(0);" url=' + b[1] + ' onClick="_historyHref(this)" keyword="' + g[0] + '" dis="' + g[1] + '" >' + g[0] + "<em>  " + g[1] + '</em><i class ="fill-in" onclick=_fillWord(event)></i></li>'
			}
			d += ' <li class="delete" onclick="_clearHistory()">清除搜索历史</li></div>'
		}
	}
	if (a == null || a == "") {
		//var h = null;
		//if (window.XMLHttpRequest) {
		//	if (_navigatorMSIE() == 1 && window.XDomainRequest) {
		//		h = new XDomainRequest()
		//	} else {
		//		h = new XMLHttpRequest()
		//	}
		//} else {
		//	h = new ActiveXObject("Microsoft.XMLHTTP")
		//}
		//var f = "//" + hostsssss + "/search?action=hotword&source=mobileweb";
		//h.open("GET", f, true);
		//h.send(null);
		//h.onload = function() {
		var defaultHotSearchData = "{\"head\": { \"auth\": null, \"errcode\": 404 }, \"data\": [  {\"keyword\":\"机票\",\"url\":\"//m.ctrip.com/webapp/flight/\",\"type\":\"flight\"}, {\"keyword\":\"酒店\",\"url\":\"//m.ctrip.com/webapp/hotel/\",\"type\":\"hotel\"}, {\"keyword\":\"攻略社区\",\"url\":\"//m.ctrip.com/you/\",\"type\":\"gs\"}, {\"keyword\":\"门票\",\"url\":\"//m.ctrip.com/webapp/ticket/index\",\"type\":\"ticket\"}, {\"keyword\":\"旅游\",\"url\":\"//m.ctrip.com/webapp/vacations/tour/\",\"type\":\"vacation\"}, {\"keyword\":\"火车票\",\"url\":\"//m.ctrip.com/webapp/train/\",\"type\":\"train\"}, {\"keyword\":\"团购\",\"url\":\"//m.ctrip.com/webapp/tuan/\",\"type\":\"tuan\"} ] }";
			var k = null;
			try {
				k = JSON.parse(defaultHotSearchData);
			} catch (m) {
				k = null
			}

			if (k !== null && k.data !== null && k.data.length > 0) {
				rList = k.data;
				a += '<div class="promote_div" onclick="isDownloadAPP()"><i class="i-download"></i><span class="span1">下载携程app 专享优惠低至</span><span class="span2">50%</span></div>';
				a += '<div class="js-hot-wrap">  <h4 class="search-title">热门搜索</h4> <ul class="search-list">';
				for (var c = 0; c < rList.length; c++) {
					var l = rList[c];
					if (l.url.indexOf("http:") == 0) {
						l.url = l.url.replace("http:", "")
					}
					a += "<li url=" + l.url + ' onclick="_hotHref(this)" keyword=' + l.keyword + " >" + l.keyword + '<i class = "fill-in" onclick=_fillWord(event)></i></li>'
				}
				a += "</ul></div>"
			}
			if(_objAllSearchKeyword.value.length != 0){
				return;
			}
			_objAllSearchResultDiv.innerHTML = a + d;
			_objAllSearchResultDiv.style.display = "block"
		//}
	} else {
		if(_objAllSearchKeyword.value.length != 0){
			return;
		}
		_objAllSearchResultDiv.innerHTML = a + d;
		_objAllSearchResultDiv.style.display = "block"
	}
}
function isDownloadAPP() {
	var e = JSON.parse(localStorage.getItem("UNION"));
	var d = "";
	var b = "";
	if (localStorage.getItem("UNION") !== null && typeof e.data !== "undefined") {
		d = e.data.AllianceID;
		b = e.data.SID
	}
	var c = "";
	var a = true;
	if (seo_data.indexOf(d) >= 0 && seo_data.indexOf(b) >= 0) {
		a = true;
		c = "//m.ctrip.com/m/c1133"
	} else {
		if (sem_data.indexOf(d) >= 0 && sem_data.indexOf(b) >= 0) {
			a = true;
			c = "//m.ctrip.com/m/c43"
		} else {
			a = false;
			c = "//m.ctrip.com/m/c1134"
		}
	}
	if (window.Mkt.Weixin) {
		window.Mkt.Weixin.wxLanuch3rd({
			"schema": "ctrip://wireless?popup=close&from=insearch",
			isdown: false,
			callback: function() {
				window.location = c
			}
		});
		window.Mkt.Weixin.wxIsInstall(function(f) {
			if (f) {
				if (a) {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=SEMWK&keyword="' + "" + '"'])
				} else {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=NAWK&keyword="' + "" + '"'])
				}
			} else {
				if (a) {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=SEMDL&keyword="' + "" + '"'])
				} else {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=NADL&keyword="' + "" + '"'])
				}
			}
		})
	} else {
		if (window.AppUtility.hasApp) {
			window.AppUtility.openApp("ctrip://wireless?popup=close&from=insearch")
		}
		setTimeout(function() {
			if (window.AppUtility.hasApp) {
				if (a) {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=SEMWK&keyword="' + "" + '"'])
				} else {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=NAWK&keyword="' + "" + '"'])
				}
			} else {
				window.location = c;
				if (a) {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=SEMDL&keyword="' + "" + '"'])
				} else {
					window["__bfi"].push(["_tracklog", "H5_SEARCH_downLoadAPPLi_US", 'searchType=NADL&keyword="' + "" + '"'])
				}
			}
		}, 4000)
	}
};