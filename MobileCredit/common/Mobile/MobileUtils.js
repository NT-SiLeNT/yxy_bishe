/* 
	javaScriptBridge用于暴露出供js调用的安卓方法。
	此文件将调用进行封装统一管理。在需要使用的文件引用该文件即可。
	增加结束回调，安卓端调用定义好的WriteJsonOutput，方法，在vue和uniapp放在页面的script标签和methods中均不生效，暂时放在window下。
	window在uniapp自身运行app时会报错，暂无解决方法。
 */


/* 引入javaScriptBridge */
import javaScriptBridge from './JavaScriptBridge.js';

/* 水印相机   参数1为固定*/
export function WatermarkCamera(request, callback) {
	request.num = 1;
	javaScriptBridge.invoke('photo', request, callback);
}

/* 相机   参数2为固定*/
export function Camera(request, callback) {
	// 3为带圆形拍照区域遮罩的拍照
	// 4为分辨率高一点的相片-此时用于结婚证识别
	if (request.num) {
	} else {
		request.num = 2; 
		// 2为普通拍照
	}
	javaScriptBridge.invoke('photo', request, callback);
}

// num类型  0开始录音  1 暂停录音  2 结束录音   3播放录音(本地播放录音)   4暂停播放录音   5停止播放录音  6删除录音
/* 录音开始 */
export function RecordStart(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 0;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音开始', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音暂停 */
export function RecordPause(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 1;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音暂停', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音结束 */
export function RecordStop(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 2;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音结束', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音删除*/
export function RecordClear(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 6;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音删除', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音取消录制 */
export function RecordCancel(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 7;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音取消录制', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音播放开始 */
export function PlayStart(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 3;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音播放开始', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音播放暂停 */
export function PlayPause(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 4;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('录音播放暂停', res);
			resolve({
				req,
				res
			});
		});
	})
}
/* 录音播放结束 */
export function PlayStop(request = {}) {
	return new Promise((resolve, reject) => {
		request.num = 5;
		javaScriptBridge.invoke('soundmake', request, function(req, res) {
			console.log('播放结束', res);
			resolve({
				req,
				res
			});
		});
	})

}
/* 获取网络声音时长/秒 */
export function getVoiceTime(request, callback) {
	request.num = 11;
	javaScriptBridge.invoke('soundmake', request, callback);
}


// /*  */num ：7   EngineType:0 身份证识别  1 银行卡
export function getDiscernCert(request = {}) {
	return new Promise((resolve, reject) => {
	
			request.num = 7;
			if (request.EngineType) {
			} else {
				
			request.EngineType = 0;
			}
		javaScriptBridge.invoke('photo', request, function(req, res) {
			console.log('身份证返回', res);
			resolve({
				req,
				res
			});
		});
	})
}
