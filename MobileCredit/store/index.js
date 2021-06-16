import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		prodUrl: 'http://127.0.0.1:8080',
		// prodUrl: 'http://:192.168.43.67:8080',
		firstlevelName: '/cvm', //url第一级路径
		imgUrlReplace: true, //是否替换图片的地址
		zxUrl: 'http://192.168.118.169:9080/kcqs/whccb/loginOnCm.do', //征信url地址--无需改动，会使用prodUrl替换ip和端口部分
		pdfParams: {
			operatorCode: 'gy001', // 操作员编号 生产  wh8170
			channelCode: 'c001', //渠道编号  生产 wh817
		},
		noConsole: false, // 是否去除console.log，生产包置为true
		accountInfos: {},
		useracc: {},
		rember: false,
		isLoginPage: false, //当前是否是登录页面
		errmsg: '',
		currentChecktypeAndIndex: {}, // 记录核查列表中被核查的数据，核查完成回来更改核查状态
		currentApplatypeAndIndex: {}, //客户申请提交成功标志，返回列表页面刷新数据-暂未使用
		managerSelect: {}, //管户人选择
		custmorSelect: {}, //客户选择
		originalIOUSelect: {}, //原借据查询
		applicationInfo: {}, //新增页面申请填写的信息
		basicCollaborator: {}, //贷前申请-基本信息-合作方信息-协议编号
		basicInfos: {}, //贷前申请-基本信息-的分类，区分是什么信息
		basicPayAddList: {}, //贷前申请-基本信息-支付信息本次添加的数据
		creReportInfo: {}, //征信流水号存储
		isbindSendSuccess: false, //征信结果发送成功
		custIndetInfo: {}, //客户识别信息存储
		pdfSqsInfo: {}, // 授权书的pdf数据
		addPdfContentId: {}, // 授权书返回的影像平台contentid
		creditInvestInfo: {}, // 授权书返回的影像平台contentid
		assListInfo: {}, // 家庭资产的增加标志

	},
	mutations: {
		loginInfo(state, UserInfo) {
			state.accountInfos = UserInfo;
		},
		userAcc(state, data) {
			state.useracc = data;
			state.rember = true;
		},
		isLoginPageChange(state, data) {
			state.isLoginPage = data
		},
		/* logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}, */
		settypeAndIndex(state, data) {
			state.currentChecktypeAndIndex = data;
		},
		deltypeAndIndex(state, data) {
			state.currentChecktypeAndIndex = {};
		},
		setmanagerSelect(state, data) {
			state.managerSelect = data;
		},
		delmanagerSelect(state, data) {
			state.managerSelect = {};
		},
		setcustmorSelect(state, data) {
			state.custmorSelect = data;
		},
		delcustmorSelect(state, data) {
			state.custmorSelect = {};
		},
		setoriginalIOUSelect(state, data) {
			state.originalIOUSelect = data;
		},
		deloriginalIOUSelect(state, data) {
			state.originalIOUSelect = {};
		},
		setapplicationInfo(state, data) {
			state.applicationInfo = data;
		},
		delapplicationInfo(state, data) {
			state.applicationInfo = {};
		},
		setbasicCollaborator(state, data) {
			state.basicCollaborator = data;
		},
		delbasicCollaborator(state, data) {
			state.basicCollaborator = {};
		},
		setbasicInfos(state, data) {
			state.basicInfos = data;
		},
		delbasicInfos(state, data) {
			state.basicInfos = {};
		},
		setbasicPayAddList(state, data) {
			state.basicPayAddList = data;
		},
		delbasicPayAddList(state, data) {
			state.basicPayAddList = {};
		},
		setcreReportInfo(state, data) {
			state.creReportInfo = data;
		},
		delcreReportInfo(state, data) {
			state.creReportInfo = {};
		},
		setisbindSendSuccess(state, data) {
			state.isbindSendSuccess = data;
		},
		delisbindSendSuccess(state, data) {
			state.isbindSendSuccess = false;
		},
		setcustIndetInfo(state, data) {
			state.custIndetInfo = data;
		},
		delcustIndetInfo(state, data) {
			state.custIndetInfo = false;
		},
		setpdfSqsInfo(state, data) {
			state.pdfSqsInfo = data;
		},
		delpdfSqsInfo(state, data) {
			state.pdfSqsInfo = {};
		},
		setaddPdfContentId(state, data) {
			state.addPdfContentId = data;
		},
		deladdPdfContentId(state, data) {
			state.addPdfContentId = {};
		},
		setcreditInvestInfo(state, data) {
			state.creditInvestInfo = data;
		},
		delcreditInvestInfo(state, data) {
			state.creditInvestInfo = {};
		},
		setassListInfo(state, data) {
			state.assListInfo = data;
		},
		delassListInfo(state, data) {
			state.assListInfo = {};
		}

		
	}
})

export default store
