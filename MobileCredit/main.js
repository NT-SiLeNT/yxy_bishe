import Vue from 'vue'
import App from './App'
import request from '@/common/http/http' // http请求
import javaScriptBridge from './common/Mobile/JavaScriptBridge.js';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import Directives from '@/common/js/directives.js';
import jsdelivr from '@/common/jsdelivr.js';
//引入vuex
import store from './store'
import graceChecker from '@/common/js/graceChecker.js' // 字段校验js引入
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$javaScriptBridge = javaScriptBridge;
Vue.prototype.$graceChecker = graceChecker;

Vue.config.productionTip = false
var options = {
	fullscreenEl: false //关闭全屏按钮
}
// 判断是否是可调用android的环境
try {
	if (android) {
		Vue.prototype.$androidenv = true;
		console.log('android', android);
	}
} catch {
	Vue.prototype.$androidenv = false;
}
// 判断是否不打印console.log
if (store.state.noConsole == true) {
	console.log = () => {}
}

import vConsole from 'vconsole'
Vue.prototype.$vConsole= new vConsole()
Vue.use(Directives);
Vue.use(preview, options);
console.log('previewssss', preview)
// 日期格式化
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
if (typeof Object.assign != 'function') {
	(function() {
		Object.assign = function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			var output = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source !== undefined && source !== null) {
					for (var nextKey in source) {
						if (source.hasOwnProperty(nextKey)) {
							output[nextKey] = source[nextKey];
						}
					}
				}
			}
			return output;
		};
	})();
};

var keyborder = javaScriptBridge;
// 键盘高度
var kheight1 = 320;
var elementI = '';
keyborder.keyboardHeight((response) => {
	console.log('键盘高度', response);
	kheight1 = 0;
	kheight1 = response.height;
});
//已经是获得焦点状态
var isOneEvent;
window.addEventListener('click', function(e) {
	if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement
		.getAttribute('contenteditable') == 'true') {
		window.setTimeout(function() {
			var offsetHeight = getPageViewHeight(); //页面高度
			var canseeHieght = offsetHeight - kheight1; // 可视高度
			var clientY = e.clientY; //当前输入框的y坐标
			var yMore = (clientY + 10) - canseeHieght; //多出的高度
			var pi = '';
			var offt = 0;
			if (e.path.length > 16) {
				for (var i = 0; i < e.path.length; i++) {
					if (e.path[i].className.indexOf('mianRadius') != -1) {
						pi = i;
						offt = e.path[i].offsetTop;
						break;
					}
				}
				for (var i = 0; i < e.path.length; i++) {
					if (i > pi && i < e.path.length - 2) {
						if (e.path[i].offsetTop != e.path[i + 1].offsetTop) {
							offt = offt + e.path[i].offsetTop;
						}
					}
				}
			}
			// console.log('pi', pi, 'offt', offt)
			// console.log('documeeeeeeeeeeee', kheight1);
			// console.log('offsetHeight', offsetHeight);
			// console.log('可视高度', canseeHieght);
			// console.log('当前输入框的', clientY);
			// console.log('输入框是否在可视高度里', clientY < canseeHieght)
			// console.log('输入框+20像素是否在可视高度里', (clientY + 10) < canseeHieght)
			// console.log('输入框+20像素', yMore)
			// console.log('isOneEvent', isOneEvent)
			if (('scrollIntoView' in document.activeElement)) {
				if (isOneEvent != document.activeElement) {
					if (yMore > 0) {
						if (e.path.length > 16) {
							for (var i = 0; i < e.path.length; i++) {
								if (e.path[i].className.indexOf('mianRadius') != -1) {
									if (document.activeElement.tagName === 'TEXTAREA') {
										e.path[i].style.paddingBottom = yMore + 30 + 'px';
										e.path[i].scrollTop = e.path[i].scrollTop + yMore + 30;
									} else {
										console.log('oribtmoribtm:', e.path[i].scrollTop)
										e.path[i].style.paddingBottom = yMore + 20 + 'px';
										e.path[i].scrollTop = e.path[i].scrollTop + yMore + 20
										//console.log('scrollTop:', e.path[i].scrollTop)
									}
									elementI = e.path[i];
									break;
								}
							}
						} else {
							document.body.style.paddingBottom = yMore + 20 + 'px';
							document.body.scrollTop = clientY + yMore + 20;
						}
						isOneEvent = document.activeElement;
					} else {
						//外框距离顶部减去当前焦点的y轴减去20大于零表示，焦点被挡住需要向下滚动一点
						if (offt >= clientY - 20) {
							if (e.path.length > 16) {
								for (var i = 0; i < e.path.length; i++) {
									if (e.path[i].className.indexOf('mianRadius') != -1) {
										if (document.activeElement.tagName === 'TEXTAREA') {
											e.path[i].scrollTop = e.path[i].scrollTop - 100;
										} else {
											e.path[i].scrollTop = e.path[i].scrollTop - 50;
										}
										elementI = e.path[i];
										break;
									}
								}
							}
						}
					}
				}
			} else {
				isOneEvent = '';
				if (e.path.length > 16) {
					for (var i = 0; i < e.path.length; i++) {
						if (e.path[i].className.indexOf('mianRadius') != -1) {
							e.path[i].style.paddingBottom = 20 + 'px';
							elementI = '';
							break;
						}
					}
				} else {
					document.body.style.paddingBottom = 0 + 'px';
				}
			}
		}, 300)
	} else {
		if (elementI) {
			elementI.style.paddingBottom = 20 + 'px';
		}
	}
})

function getPageViewHeight() {
	var d = document,
		a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
	return a.clientHeight;
}
App.mpType = 'app'

// http://www.bejson.com/json/col2json/  使用在线转换工具excel->json
const app = new Vue({
	...App
})
app.$mount()
