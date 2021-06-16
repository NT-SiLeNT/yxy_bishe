<template>
	<view style="height: 100%;">
		<view class="w100">
			<view class="mc-padding-wrap">
				<block v-if="isbind">
					<view class="textView">
						点击查看
						<span class="linkicon" @click="viewReport()">《征信报告》</span>
						，由人工判断交易是否继续
					</view>
					<view class="linebtn">
						<view class="bottomBtn"><button type="" class="mc-btn-primaryplan" @click="toCancel()">取消交易</button></view>
						<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="toContinue()">继续办理</button></view>
					</view>
				</block>
				<block v-else>
					<view class="textView notBind">
						<view class="">
							<h3>征信流水号</h3>
							<view class="creSerno">{{ creSerno.ZX_SERNO }}</view>
						</view>
						<view class="">
							点击查看
							<span class="linkicon" @click="viewReport()">《征信报告》</span>
						</view>
					</view>
					<view class="linebtn notBind"><button type="" class="mc-btn-primary width100" @click="toCancel()">确定</button></view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isbind: false, // 判断是否是绑定页面过来的
			currentserno: {}, //自己生成的流水号
			creSerno: {}, //查询出来的征信流水号
			iaserno: '', //贷前申请的流水号
			zxurl: '', // 存储征信url
			saveImageDataFlag: false, // 是否已经进行存库-保存数据
			signPdfFlag: false, // 是否已经进行人名章pdf保存
			infoPdfFlag: false, // 是否已经进行信息存储pdf保存
			cresernoFlag: false, // 是否已经取得征信流水号
			zxurlFlag: false, // 是否已经生成征信报告url
			cancleClickFlag: false, // 是否点击取消按钮
			ContentId: '', // 生成的pdf的影像id
			CreditInspectResult: this.$store.state.custIndetInfo, // 核查页面录入-授权书和拍照-人脸页面结果数据
			accountInfo: this.$store.state.accountInfos // 核查页面录入-授权书和拍照-人脸页面结果数据
		};
	},
	onLoad: function(option) {
		this.isbind = option.isbind ? JSON.parse(option.isbind) : '';
		this.iaserno = option.serno ? option.serno : '';
	},
	onBackPress() {
		this.$store.commit('delcreditInvestInfo');
	},
	beforeDestroy() {
		// 已保存不进行再次保存--不是点击继续按钮，销毁时清掉数据
		if (!this.saveImageDataFlag) {
			this.saveImageData();
			this.$store.commit('delcreditInvestInfo');
			this.$store.commit('delcreReportInfo');
		}
		console.log('33333333333');
	},
	mounted() {
		// 进入页面时保存pdf数据和查看征信流水号
		this.toLoadPdf();
		this.togetsernoUrl();
	},
	methods: {
		async toLoadPdf() {
			var signPdf = await this.signPdfUploadImg();
			if (signPdf) {
				var infopdf = await this.createInfoPdf(this.ContentId);
			}
		},
		async togetsernoUrl() {
			var cercode = this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cert_code;
			var paramsdata = this.isbind ? this.$store.state.creReportInfo : this.$store.state.creditInvestInfo;
			paramsdata.yt = this.isbind ? '02' : this.$store.state.creditInvestInfo.yt;
			var cerse = await this.creInv(cercode, paramsdata);
			if (cerse) {
				if (this.isbind) {
					this.$store.commit('setcreReportInfo', this.creSerno);
				}
				this.creReport(this.currentserno, paramsdata);
			}
		},
		viewReport() {
			if (this.zxurlFlag) {
				uni.navigateTo({
					url: '/pages/indetificationCust/docPage?docType=2'
				});
			} else {
				this.togetsernoUrl();
			}
		},
		async toContinue() {
			var savedata = await this.saveImageData();
			if (savedata) {
				if (this.isbind) {
					uni.navigateBack({});
				}
			}
		},
		toCancel() {
			this.cancleClickFlag = true;
			this.$store.commit('delcreditInvestInfo');
			this.$store.commit('delcreReportInfo');
			if (this.isbind) {
				uni.navigateBack({});
			} else {
				uni.reLaunch({
					url: '/pages/home/home'
				});
			}
		},
		signPdfUploadImg() {
			// 授权的人名章-- 此PDF会返回 影像id用于下一个pdf的上传
			var _this = this;
			var pdfParams = this.$store.state.pdfParams;
			return new Promise((resolve, reject) => {
				var data = _this.CreditInspectResult;
				_this.signPdfFlag = false;
				var params = {
					Pdf: data.pdf.Pdf,
					fileType: '1',
					nameSealFlag: '1', //人名章
					channelSealFlag: '0',
					companySealFlag: '0',
					locationStyle: '',
					offsetX: '',
					offsetY: '',
					pageNo: '',
					signKeyWord: '',
					userName: '',
					sealLocation: '',
					sealReason: '',
					businessCode: '',
					imageType: '',
					faceImage: '',
					fontImage: '',
					backImage: '',
					identificationNo: '',
					phoneNo: '',
					textStyle: '',
					channelSealPage: '11',
					channelSealKeyWord: '',
					channelSealLocationStyle: '',
					channelSealOffsetX: '',
					channelSealOffsetY: '',
					bizTypeCode: 'B001',
					operatorCode: pdfParams.operatorCode, // 操作员编号 wh8170
					channelCode: pdfParams.channelCode, //渠道编号  生产 wh817
					sealCode: '',
					sealPassword: '',
					pdfIndex: '',
					Users: [
						{
							signKeyWord: '人名章', // 报关键字错误--2020/10/31的时侯
							// signKeyWord: '被授权人',
							userName: data.cus_name ? data.cus_name : '',
							sealLocation: 'address', //地址
							sealReason: 'reason', //原因
							faceImage: data.face.upImage.creditbase64,
							// faceImageImgSn: data.face.upImage.imgSn,
							fontImage: data.font.creditbase64,
							backImage: data.back.creditbase64,
							identificationNo: data.cert_code, //身份证
							phoneNo: '15653161211', //是否必填？？？
							locationStyle: 'C',
							offsetX: '80', //调位置
							offsetY: '-10', //调位置
							pageNo: '1',
							width: '80', //调大小
							height: '30', //调大小
							shape: '21',
							color: 'FF0000',
							fontSize: '20',
							businessCodeStyle: 'font-size:20',
							pdfIndex: '1'
						}
					],
					Company: null
				};
				_this.$request
					.post({
						url: 'es/json/EsCreditSystemSignature',
						data: params
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content) {
							if (res.response.content.List.length == 0) {
								_this.ContentId = res.response.content.ContentId;
								_this.signPdfFlag = true;
								resolve(true);
							} else {
								uni.showToast({ title: res.response.content.List[0].ErrorMessage, icon: 'none', duration: 1500 });
								resolve(false);
							}
						} else {
							uni.showToast({ title: res.response.header.returnMsg, icon: 'none', duration: 1500 });
							resolve(false);
						}
					})
					.catch(err => {
						resolve(false);
					});
			});
		},
		createInfoPdf(ContentId) {
			//生成信息收集pdf
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.infoPdfFlag = false;
				var params1 = {
					TemplateCode: 'dq002',
					IdCardNo: _this.CreditInspectResult.cert_code,
					ContentId: ContentId ? ContentId : '',
					AttributeDatas: [
						{
							// 姓名
							key: 'CUSTOMER_NAME',
							value: _this.CreditInspectResult.cus_name ? _this.CreditInspectResult.cus_name : '',
							type: 'text',
							tempLateIndex: 1
						},
						{
							// 身份证号
							key: 'ID_NUMBER',
							value: _this.CreditInspectResult.cert_code ? _this.CreditInspectResult.cert_code : '',
							type: 'text',
							tempLateIndex: 1
						},
						{
							// 时间
							key: 'TIME',
							value: new Date().Format('yyyy-MM-dd'),
							type: 'text',
							tempLateIndex: 1
						},
						{
							// 联网核查结果
							key: 'ONLINE_RESULT',
							value: _this.CreditInspectResult.idcard.checkresult ? _this.CreditInspectResult.idcard.checkresult : '',
							type: 'text',
							tempLateIndex: 1
						},
						{
							// 人脸识别结果
							key: 'FACE_RESULT',
							value: _this.CreditInspectResult.face.simResult ? _this.CreditInspectResult.face.simResult : '',
							type: 'text',
							tempLateIndex: 1
						},
						{
							// 人脸识别分数
							key: 'FACE_FRACTION',
							value: _this.CreditInspectResult.face.sim1Score ? _this.CreditInspectResult.face.sim1Score : '',
							type: 'text',
							tempLateIndex: 1
						}
					],
					isUploadImage: 'true', // 上传影像平台--授权书此时不上传影像平台
					ImageDatas: []
				};
				//生成pdf,
				_this.$request
					.post({
						url: 'es/json/EsCreditCreatePDF',
						data: params1
					})
					.then(res1 => {
						_this.$store.commit('deladdPdfContentId');
						if (res1.response.header.returnCode == '00000000' && res1.response.content) {
							_this.$store.commit('setaddPdfContentId', res1.response.content.ContentId);
							resolve(true);
							_this.infoPdfFlag = true;
						} else {
							uni.showToast({ title: res.response.header.returnMsg, icon: 'none', duration: 1500 });
							resolve(false);
						}
					})
					.catch(err => {
						resolve(false);
					});
			});
		},
		creInv(cercode, paramsdata) {
			//征信流水号查询
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.currentserno = cercode + new Date().Format('yyyyMMddhhmmss');
				_this.cresernoFlag = false;
				var params = {
					SERNO: _this.currentserno, //流水号
					USER_ID: _this.accountInfo.actorno, //服务请求者身份(柜员号)
					GLOBAL_TYPE: '10', // 证件类型(同上)
					GLOBAL_ID: paramsdata.cert_code ? paramsdata.cert_code : '', //客户证件号码
					CUSTOMER_NAME: paramsdata.cus_name ? paramsdata.cus_name : '', // 客户姓名
					QUERY_REASON: paramsdata.yt ? paramsdata.yt : '', //查询原因
					VALID_DAYS: '', // 复用多少天内的历史报告(默认为30，不复用传<=0)
					CR_FLAG: '10' //报告数据格式标志(10-自定义Xml全内容,20-人行原始内容#如果为空，默认走10逻辑)
				};
				_this.$request
					.post({
						url: 'es/json/EsStructureDataInformation',
						data: params
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content) {
							if (res.response.content.RESULT_CODE == '9999') {
								//征信系统返回错误
								uni.showToast({ title: res.response.content.RESULT_MSG, icon: 'none', duration: 1500 });
								resolve(false);
							} else {
								// CR: "H4sIAAAAAAAAAM1Uu07DMBT9oirXaRrVlRUpjU1SKa/a7hA+CWY+gAk2FhADAz/Do5+BH3HqJFUXGJhyz8P2vT5WSMYZ3UnO2obLhNhv3SQhhIAgXKI4woAxjuIYrZckGAykYCndqi9vL/qNqk1yVzFjWyBYhEuJ4k2EN4CNx4iE7oSoD1UCJHAlqVOlfD+8fd48frzfH59fv15uj093gEhgJKIGkF3LsoayBKmVPtai2mXLeLJCKFLtYQywhggARcbaq2R/YLxreG6WUaT1eAUFACjfSLRWzlLR1IbQrUw5Erjr6ZWs4VRUvNNUmQrp07lH0VT2twTrhT57rBij6uQ0MbIWn3MmA7puMJzE2Qihd9BojDO9+vBQue6ROkC0OjoPWcU+MU8cCKKu3/K20Nh3+9DupX2svBq2cpiUYadqWhjF1Y7dXucer5FSVCk70S9wYIjSGy84k+HoTkoxIXo4C9MLcj9NcUQM79HkN4D52wvPvb0Lgf1la1n+b1vjxa9bC2YRB6N/5Q97EEuwOgUAAA=="
								// REPORT_ID: "2020102316490999466183"
								// REPORT_TIME: "2020-10-23T16:49:09.000"
								// RESULT_CODE: "0000"
								// RESULT_MSG: "查询成功"
								// ZX_SERNO: "20201023664592"
								_this.creSerno = res.response.content;
								_this.cresernoFlag = true;
								resolve(true);
							}
						} else {
							uni.showToast({ title: res.response.header.returnMsg, icon: 'none', duration: 1500 });
							resolve(false);
						}
					})
					.catch(err => {
						resolve(false);
					});
			});
		},
		creReport(cusrno, paramsdata) {
			//查询征信报告-获取征信流水号之后
			// 先清空数据
			this.zxurlFlag = false;
			uni.setStorage({
				key: 'zxurl',
				data: '',
				success: function() {}
			});
			var params = {
				userCode: this.accountInfo.actorno, //登录人号码
				appId: '0494', //业务系统应用号
				operationType: '11', //查询类型
				businessNum: cusrno, //业务流水号
				certType: paramsdata.cert_type ? paramsdata.cert_type : '', //证件类型
				certNo: paramsdata.cert_code ? paramsdata.cert_code : '' //证件号码
			};
			var aarr = [];
			for (let zxKey in params) {
				if (params.hasOwnProperty(zxKey)) {
					var str = zxKey + '=' + (params[zxKey] ? params[zxKey] : '');
					aarr.push(str);
				}
			}
			var urlParams = aarr.join('&');
			var reg = /^((http:\/\/)|(https:\/\/))((([a-zA-Z0-9]*\.)*[a-zA-Z0-9]*)|(([a-zA-Z0-9]{1,3}\.){3}[a-zA-Z0-9]{1,3})):[0-9]{4}(\/){0}/;
			var url = this.$store.state.zxUrl + '?' + urlParams;
			var urlreplace = url.replace(reg, this.$store.state.prodUrl);
			this.zxurl = urlreplace;
			this.zxurlFlag = true;
			uni.setStorage({
				key: 'zxurl',
				data: this.zxurl,
				success: function() {}
			});
		},
		saveImageData() {
			// 需要的数据较多在最后一步才能取得所有数据
			// 数据存库
			var _this = this;
			return new Promise((resolve, reject) => {
				var params = {
					idcardphoto: _this.CreditInspectResult.font.photoUrl, //身份证正面
					idcardbackphoto: _this.CreditInspectResult.back.photoUrl, //身份证反面
					checkfacephoto: _this.CreditInspectResult.face.upImage.photoUrl, //人脸照片
					name: _this.CreditInspectResult.cus_name, //名称
					strsnlogin: _this.isbind ? _this.CreditInspectResult.font.serno : '', //业务申请流水号
					contentid1: _this.ContentId ? _this.ContentId : '', //pdf这类的影像Id
					recordid: _this.CreditInspectResult.idcard.recordid, //联网核查记录号号
					cretno: _this.CreditInspectResult.cert_code, //身份证号码
					createdate: new Date().Format('yyyy-MM-dd'), //创建时间
					onlineverifresult: _this.CreditInspectResult.idcard.checkresult, //联网核查结果
					checkfaceresult: _this.CreditInspectResult.face.simResult, //人脸识别的结果
					checkfacegrade: _this.CreditInspectResult.face.sim1Score, //人脸识别的分数
					contentid2: _this.creSerno.ZX_SERNO ? _this.creSerno.ZX_SERNO : '', //征信流水号
					zxurl: _this.zxurl ? _this.zxurl : '', //征信报告url
					userid: _this.accountInfo.actorno ? _this.accountInfo.actorno : '' //征信查询人
				};
				_this.saveImageDataFlag = false;
				_this.$request
					.post({
						url: 'CreditInformation/v1/Add',
						data: params
					})
					.then(res => {
						res = res.result[0];
						if (res.head.returnCode == '00000000') {
							_this.saveImageDataFlag = true;
							resolve(true);
						} else {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
							resolve(false);
						}
					})
					.catch(err => {
						resolve(false);
					});
			});
		}
	}
};
</script>

<style scoped lang="scss">
.mc-padding-wrap {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
	box-sizing: border-box;
	padding-bottom: 1px;
	display: flex;
	flex-direction: column;
	overflow: auto;
}
.w100 {
	background: #f8f9fd;
}
.bottomBtn {
	padding: 40rpx;
	box-sizing: border-box;
	padding-top: 0;
}
.bottomBtn .mc-btn-primary,
.bottomBtn .mc-btn-primaryplan {
	width: 100%;
}
.textView {
	margin: auto 32rpx;
}
.textView.notBind {
	margin: 100rpx 32rpx auto;
	text-align: center;
}
.creSerno {
	font-size: 38rpx;
	color: #f74968;
	margin: 20rpx 0 60rpx;
}
.linkicon {
	color: $mc-color-blue;
}
.linebtn {
	display: flex;
	justify-content: space-between;
	margin: 0 60rpx;
}
.linebtn.notBind {
	margin: 60rpx 60rpx;
}
.linebtn .bottomBtn {
}
.mc-btn-primary.width100 {
	width: 100%;
}
.mc-btn-primaryplan {
	width: 100%;
}
</style>
