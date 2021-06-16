import request from './uni-request.js'
import store from '@/store'
var baseUrl = '/api/'
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = '/api/'
} else {
	// 生产环境
	baseUrl = store.state.prodUrl
}

request.setConfig({
	baseUrl: baseUrl,
})
// 请求拦截
request.interceptor.request = (config => {
	if (config.url.indexOf('/v1/') == -1) {
		config.url = config.url.replace('/rediect/', '/forward/');
	}
	if (config.url.indexOf('CreditLogin/v1/CpmValidationLogin') == -1 && config.url.indexOf('EsCustInfo2') == -1) {
		if (config.loading === false) {

		} else {
			var title = '加载中,请稍后…';
			if (config.upType) {
				title = config.upMsg;
			}
			uni.showLoading({
				title: title,
				mask: true
			});
		}
	}
	// 设置跨域请求头
	config.header['Access-Control-Allow-Origin'] = '*';
	// 对请求参数进行格式化。给请求数据加上header,数据放入content中
	var requestData = JSON.parse(JSON.stringify(config.data));
	// 清空原有config.data数据
	config.data = {};
	
	config.data.content = requestData;
	console.info('request: ', config);
	return config;
})
// 全局的业务拦截
request.interceptor.response = ((res, config) => {
	if (config.url.indexOf('CreditLogin/v1/CpmValidationLogin') == -1 && config.url.indexOf('EsCustInfo2') == -1) {
	// if (config.url.indexOf('web/exit') == -1 && config.url.indexOf('EsCustInfo2') == -1) {
		uni.hideLoading();
	}
	console.log('response:', res)
	if (res) {
		res.success = true;
	} else {
		// token失效，需要重新登录
		uni.navigateTo({
			url: '/pages/loign/login'
		})
	}
	return res;
})

// 全局的错误异常处理
request.interceptor.fail = ((res, config) => {
	uni.hideLoading();
	uni.showToast({
		title: '请求失败',
		icon: 'none',
		mask: true
	})
	let ret = res;
	
	return ret;
})
export default request;
