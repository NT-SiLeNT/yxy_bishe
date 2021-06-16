/**
 * @brief 移动端JS扩展入口类，兼容iOS和Android
 * @author mingchen
 * @since 20171118
 */
var JavaScriptBridge = {};
JavaScriptBridge.callbackmap = {};
JavaScriptBridge._generateGuid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0;
		var v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	})
}
/**
 * @namespace   模块名
 * @method      方法名
 * @data        入参，JSON格式
 * @callback    异步调用时的回调方法  
 */
JavaScriptBridge.invoke = function(method, data, callback) {
	// var identifier = window.AppFrame.md5.hex_md5(module + method + JSON.stringify(data) + window.AppFrame.datetimeex.getCurrentDateTime().getYYYYMMDDHHmmSSSSS());
	var identifier = JavaScriptBridge._generateGuid();
	// 如果有回调，则将回调方法暂存
	if (callback) {
		JavaScriptBridge.callbackmap[identifier] = callback;
	}
	data.identifier = identifier;
	console.log('android调用参数:', JSON.stringify(data));
	console.log('android调用参数android:', android);
	console.log('android调用参数method:', method);
	console.log('android调用参数method:', android[method]);
	uni.hideLoading();
	android[method](JSON.stringify(data));
	try {
		android[method](JSON.stringify(data));
	} catch {
		uni.hideLoading();
		console.warn("It's not an Android environment right now")
	}
}
// 声音播放的结束回调
JavaScriptBridge.voiceonEnded = function(callback) {
	JavaScriptBridge.callbackmap['voiceonEnded'] = callback;
	return callback;
}
// 程序切到外部暂停录音的回调
JavaScriptBridge.recordonPause = function(callback) {
	JavaScriptBridge.callbackmap['recordonPause'] = callback;
	return callback;
}

// 录音超时10分钟结束
JavaScriptBridge.recordonEnd = function(callback) {
	JavaScriptBridge.callbackmap['recordonEnd'] = callback;
	return callback;
}
// 键盘隐藏
JavaScriptBridge.keyboardHeight = function(callback) {
	JavaScriptBridge.callbackmap['keyboardHeight'] = callback;
	return callback;
}

window.WriteJsonOutput = function(req, response) {
	console.log('android返回:', response);
	if (response.code == '8') {
		//程序切到外部暂停录音
		JavaScriptBridge.recordonPause(JavaScriptBridge.callbackmap['recordonPause'])();
		return
	}
	if (response.code == '12') {
		//录音超时10分钟
		JavaScriptBridge.recordonEnd(JavaScriptBridge.callbackmap['recordonEnd'])();
		return
	}
	if (response.code == 'keyboard') {
		// isshow 0 隐藏  1显示
		//键盘高度获取
		JavaScriptBridge.keyboardHeight(JavaScriptBridge.callbackmap['keyboardHeight'])(response);
		return
	}
	var call = JavaScriptBridge.callbackmap[req.identifier];
	try {
		call(req, response);
	} catch (e) {
		console.log(e)
	}
}
export default JavaScriptBridge
