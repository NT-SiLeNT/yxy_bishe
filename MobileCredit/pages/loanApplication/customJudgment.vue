<template>
	<view style="height: 100%;">
		<view class="w100">
			<view class="mc-padding-wrap">
				<block v-if="isbind">
					<view class="textView">
						点击查看
						<span class="linkicon" @click="creInv('view')">《征信报告》</span>
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
							<span class="linkicon" @click="creInv('view')">《征信报告》</span>
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
			isbind: false,
			currentserno: {}, //自己生成的流水号
			creSerno: {}, //查询出来的征信流水号
			iaserno: '', //贷前申请的流水号
			zxurl: '',
			saveImageDataFlag: false,
			ContentId: '',
			CreditInspectResult: this.$store.state.custIndetInfo
		};
	},
	onLoad: function(option) {
		this.isbind = option.isbind ? JSON.parse(option.isbind) : '';
		this.iaserno = option.serno ? option.serno : '';
	},
	onBackPress() {
		this.$store.commit('delcreditInvestInfo');
	},
	mounted() {
		if (this.isbind != true) {
			this.creInv('cat');
		}
	},
	methods: {
		async toContinue(process = false) {
			if (this.saveImageDataFlag && this.isbind) {
				// 如果数据已存储,就直接获取流水号
				this.creInv('bind');
				return;
			}
			var data = this.$store.state.custIndetInfo;
			var params = {
				idcardphoto: data.font.photoUrl, //身份证正面
				idcardbackphoto: data.back.photoUrl, //身份证反面
				checkfacephoto: data.face.upImage.photoUrl, //人脸照片
				name: data.cus_name, //名称
				strsnlogin: this.isbind ? data.font.serno : '', //业务申请流水号
				contentid1: this.ContentId ? this.ContentId : '', //pdf这类的影像Id
				recordid: data.idcard.recordid, //联网核查记录号号
				cretno: data.cert_code, //身份证号码
				createdate: new Date().Format('yyyy-MM-dd'), //创建时间
				onlineverifresult: data.idcard.checkresult, //联网核查结果
				checkfaceresult: data.face.simResult, //人脸识别的结果
				checkfacegrade: data.face.sim1Score, //人脸识别的分数
				contentid2: this.creSerno.ZX_SERNO ? this.creSerno.ZX_SERNO : '' ,//征信流水号
				// zxurl: this.creSerno.ZX_SERNO ? this.creSerno.ZX_SERNO : '', //征信报告url
				// userid: this.creSerno.ZX_SERNO ? this.creSerno.ZX_SERNO : '' //征信查询人
			};
			this.saveImageDataFlag = false;
			this.$request
				.post({
					url: 'CreditInformation/v1/Add',
					data: params
				})
				.then(res => {
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						this.saveImageDataFlag = true;
						if (!process) {
							if (this.isbind) {
								// 得到征信流水号
								this.creInv('bind');
							} else {
								uni.redirectTo({
									url: '/pages/loanApplication/loanApplication?isAdd=true'
								});
							}
						}
					} else {
						uni.showToast({
							title: res.head.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		toCancel() {
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
		creInv(type) {
			if (type == 'view' && this.creSerno.ZX_SERNO) {
				// 征信系统流水号存在并且是去看报告
				this.creReport(this.currentserno);
				return;
			}
			var cercode = this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cert_code;
			this.currentserno = cercode + new Date().Format('yyyyMMddhhmmss');
			//征信流水号查询
			var params = {
				SERNO: this.currentserno, //流水号
				USER_ID: this.$store.state.accountInfos.actorno, //服务请求者身份(柜员号)
				GLOBAL_TYPE: '10', // 证件类型(同上)
				GLOBAL_ID: this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cert_code, //客户证件号码
				CUSTOMER_NAME: this.isbind ? this.$store.state.creReportInfo.cus_name : this.$store.state.creditInvestInfo.cus_name, // 客户姓名
				QUERY_REASON:this.isbind ? '02' : this.$store.state.creditInvestInfo.yt, //查询原因
				VALID_DAYS: '', // 复用多少天内的历史报告(默认为30，不复用传<=0)
				CR_FLAG: '10' //报告数据格式标志(10-自定义Xml全内容,20-人行原始内容#如果为空，默认走10逻辑)
			};
			this.$request
				.post({
					url: 'es/json/EsStructureDataInformation',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						if (res.response.content.RESULT_CODE == '9999') {
							//征信系统返回错误
							uni.showToast({ title: res.response.content.RESULT_MSG, icon: 'none', duration: 1500 });
						} else {
							// CR: "H4sIAAAAAAAAAM1Uu07DMBT9oirXaRrVlRUpjU1SKa/a7hA+CWY+gAk2FhADAz/Do5+BH3HqJFUXGJhyz8P2vT5WSMYZ3UnO2obLhNhv3SQhhIAgXKI4woAxjuIYrZckGAykYCndqi9vL/qNqk1yVzFjWyBYhEuJ4k2EN4CNx4iE7oSoD1UCJHAlqVOlfD+8fd48frzfH59fv15uj093gEhgJKIGkF3LsoayBKmVPtai2mXLeLJCKFLtYQywhggARcbaq2R/YLxreG6WUaT1eAUFACjfSLRWzlLR1IbQrUw5Erjr6ZWs4VRUvNNUmQrp07lH0VT2twTrhT57rBij6uQ0MbIWn3MmA7puMJzE2Qihd9BojDO9+vBQue6ROkC0OjoPWcU+MU8cCKKu3/K20Nh3+9DupX2svBq2cpiUYadqWhjF1Y7dXucer5FSVCk70S9wYIjSGy84k+HoTkoxIXo4C9MLcj9NcUQM79HkN4D52wvPvb0Lgf1la1n+b1vjxa9bC2YRB6N/5Q97EEuwOgUAAA=="
							// REPORT_ID: "2020102316490999466183"
							// REPORT_TIME: "2020-10-23T16:49:09.000"
							// RESULT_CODE: "0000"
							// RESULT_MSG: "查询成功"
							// ZX_SERNO: "20201023664592"
							this.creSerno = res.response.content;
							if (type == 'bind') {
								// 是继续办理点击
								//当前流水号
								this.creSerno.serno = this.currentserno;
								this.$store.commit('setcreReportInfo', this.creSerno);
								console.log('setcreReportInfo', this.$store.state.creReportInfo);
								uni.navigateBack({});
							} else if (type == 'view') {
								this.creReport(this.currentserno);
							} else if (type == 'cat') {
								this.signPdfUploadImg();
							}
						}
					} else {
						if (type == 'view') {
							uni.showToast({ title: '获取报告出错请重试', icon: 'none', duration: 1500 });
						} else {
							uni.showToast({ title: res.response.header.returnMsg, icon: 'none', duration: 1500 });
						}
					}
				})
				.catch(err => {
					uni.showToast({ title: '请求失败', icon: 'none', duration: 1500 });
				});
		},
		creReport(cusrno) {
			uni.setStorage({
				key: 'zxurl',
				data: '',
				success: function() {}
			});
			//查询征信报告
			var params = {
				userCode: this.$store.state.accountInfos.actorno, //登录人号码
				appId: '0494', //业务系统应用号
				operationType: '11', //查询类型
				businessNum: cusrno, //业务流水号
				certType: this.isbind ? this.$store.state.creReportInfo.cert_type : this.$store.state.creditInvestInfo.cert_type, //证件类型
				certNo: this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cert_code //证件号码
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
			uni.setStorage({
				key: 'zxurl',
				data: this.zxurl,
				success: function() {
					uni.navigateTo({
						url: '/pages/loanApplication/docPage?docType=2'
					});
				}
			});

			// ?userCode=4294&appId=0494&operationType=11&businessNum=LS81701201903290579201&certType=10&certNo=11010819931010444X
		},
		signPdfUploadImg() {
			var data = this.$store.state.custIndetInfo;
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
				operatorCode: 'dq001',
				channelCode: 'c001',
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
			this.$request
				.post({
					url: 'es/json/EsCreditSystemSignature',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						console.log('res.response.content.ContentId', res.response.content.ContentId);
						this.ContentId = res.response.content.ContentId;
						//签章
						this.pdfResult(res.response.content.ContentId);
					} else {
					}
				})
				.catch(err => {});
		},
		pdfResult(ContentId) {
			var params1 = {
				TemplateCode: 'dq002',
				IdCardNo: this.CreditInspectResult.cert_code,
				ContentId: ContentId ? ContentId : '',
				AttributeDatas: [
					{
						// 姓名
						key: 'CUSTOMER_NAME',
						value: this.CreditInspectResult.cus_name ? this.CreditInspectResult.cus_name : '',
						type: 'text',
						tempLateIndex: 1
					},
					{
						// 身份证号
						key: 'ID_NUMBER',
						value: this.CreditInspectResult.cert_code ? this.CreditInspectResult.cert_code : '',
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
						value: this.CreditInspectResult.idcard.checkresult ? this.CreditInspectResult.idcard.checkresult : '',
						type: 'text',
						tempLateIndex: 1
					},
					{
						// 人脸识别结果
						key: 'FACE_RESULT',
						value: this.CreditInspectResult.face.simResult ? this.CreditInspectResult.face.simResult : '',
						type: 'text',
						tempLateIndex: 1
					},
					{
						// 人脸识别分数
						key: 'FACE_FRACTION',
						value: this.CreditInspectResult.face.sim1Score ? this.CreditInspectResult.face.sim1Score : '',
						type: 'text',
						tempLateIndex: 1
					}
				],
				isUploadImage: 'true', // 上传影像平台--授权书此时不上传影像平台
				ImageDatas: []
			};
			//生成pdf,
			this.$request
				.post({
					url: 'es/json/EsCreditCreatePDF',
					data: params1
				})
				.then(res1 => {
					this.$store.commit('deladdPdfContentId');
					if (res1.response.header.returnCode == '00000000' && res1.response.content) {
						this.$store.commit('setaddPdfContentId', res1.response.content.ContentId);
						// 不是绑定过来的
						if (!this.isbind) {
							// 去保存数据
							this.toContinue(true);
						}
					} else {
					}
				})
				.catch(err => {});
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
