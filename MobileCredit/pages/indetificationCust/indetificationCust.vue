<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<view class="w100" v-show="!resultfalse">
			<view class="mc-padding-wrap">
				<view class="photoWrap">
					<view v-if="photofont.url" class="photoAdd photoShow uni-uploader__file">
						<imagess class="uni-uploader__img" :src="photofont.url" previewValue="sfzzm1" :data-src="photofont.url" @tap="previewImage"></imagess>
						<span class="delIcon" @tap.stop="deleteImage('photofont')"></span>
					</view>
					<view v-else class="photoAdd uni-uploader__input-box"><view class="uni-uploader__input" @tap="marDiscern('photofont')"></view></view>
					<view class="photoTip">身份证正面</view>
				</view>
				<view class="photoWrap">
					<view v-if="photoback.url" class="photoAdd photoShow uni-uploader__file">
						<imagess class="uni-uploader__img" :src="photoback.url" previewValue="sfzfm1" :data-src="photoback.url" @tap="previewImage"></imagess>
						<span class="delIcon" @tap.stop="deleteImage('photoback')"></span>
					</view>
					<view v-else class="photoAdd uni-uploader__input-box"><view class="uni-uploader__input" @tap="marDiscern('photoback')"></view></view>
					<view class="photoTip">身份证反面</view>
				</view>
			</view>
			<button type="" class="mc-btn-primary" :disabled="photofont.isHave == false || photoback.isHave == false" @click="verification()">确定</button>
		</view>
		<view v-if="resultfalse">
			<view class="w100">
				<view class="mc-padding-wrap1">
					<view class="resrow icon"></view>
					<view class="resrow text"><span>人脸识别失败</span></view>
					<view class="resrow  errorWhy" v-if="!isSuccess">
						<view class="err-title">失败原因：</view>
						<view class="err-text">{{ $store.state.errmsg }}</view>
					</view>
				</view>
			</view>
			<view class="linebtn">
				<view class="bottomBtn"><button type="" class="mc-btn-primaryplan" @click="toHome()">取消</button></view>
				<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="faceCheck()">重试</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import { Camera, getDiscernCert } from '@/common/Mobile/MobileUtils.js';
export default {
	data() {
		return {
			photofont: {
				url: '',
				isHave: false
			}, // 拍下的身份证图片
			photoback: {
				url: '',
				isHave: false
			},
			accountInfo: {},
			idLineCheck: {}, // 联网核查数
			faceCheckdata: {}, // 人脸核查数据
			resultfalse: false, // 展示人脸失败页面
			alreadyId: false, //是否联网核查通过
			isbind: false, //是征信绑定页面过来的
			currentSerno: '', //当前流水号
			pdfSqsInfo: {} //授权书pdf上传后数据存储
		};
	},
	mounted() {
		// 进入时删除存储的图片数据
		this.$store.commit('delcustIndetInfo');
		var _this = this;
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				_this.accountInfo = res.data;
			}
		});
	},
	onBackPress() {
		console.log('result', this.resultfalse);
		if (this.resultfalse) {
			if (this.isbind) {
				uni.navigateBack({});
			} else {
				this.toHome();
			}
			return true;
		}
	},
	onLoad(option) {
		this.isbind = option.isbind ? JSON.parse(option.isbind) : '';
		this.currentSerno = option.serno ? option.serno : '';
	},
	methods: {
		marDiscern(idTypes) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var _this = this;
			Camera({}, function(request, respons) {
				uni.hideLoading();
				console.log('拍照返回', respons);
				_this.$request
					.post({
						url: 'creditPhotoUpload/v1/CpmCreditUpload',
						data: {
							creditbase64: respons.imgbase64,
							phototype: '',
							serno: _this.isbind ? _this.currentSerno : '',
							fileType: respons.imgtype
						}
					})
					.then(res => {
						res = res.result[0];
						// delSign: '',
						// fileType: 'jpeg',
						// filename: '0001',
						// imgSn: 'G32132200203102060001051790',
						// photoUrl: '/dp/credit/2031020613284084e12946-4bb6-4f0b-b780-3b55dd59436e.jpeg',
						// phototype: '0411',
						// serno: ''
						if (res.head.returnCode == '00000000') {
							_this[idTypes] = res.content;
							_this[idTypes].isHave = true;
							_this[idTypes].url = 'data:image/jpeg;base64,' + respons.imgbase64;
							_this.$forceUpdate();
						} else {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			});
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			var imageList = [current];
			var allimage = [];
			allimage.push(current);
			uni.previewImage({
				current: current,
				urls: allimage
			});
		},
		deleteImage: function(names) {
			uni.showModal({
				content: '您确认要删除该照片吗？',
				success: e => {
					if (e.confirm) {
						this.$request
							.post({
								url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
								data: {
									imgSn: this[names].imgSn
								}
							})
							.then(res => {
								res = res.result[0];
								if (res.head.returnCode == '00000000') {
									this[names].url = '';
									this[names].isHave = false;
									this.$forceUpdate();
								}
							})
							.catch(err => {});
					}
				},
				fail: () => {}
			});
		},
		verification() {
			console.log('联网核查');
			if (this.alreadyId) {
				var _this = this;
				uni.showToast({
					title: '开始人脸识别',
					icon: 'none'
				});
				setTimeout(function() {
					_this.faceCheck();
				}, 1000);
				return;
			}
			var currentFormatDate = new Date().Format('yyyy-MM-dd');
			var params = {
				bankcode: this.accountInfo.orgid, //机构代码
				entrustdate: currentFormatDate, //发送日期
				businesscode: '01', //业务种类
				usercode: '8170' + this.accountInfo.actorno, //柜员号
				id: this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cert_code, //身份证号
				name: this.isbind ? this.$store.state.creReportInfo.cert_code : this.$store.state.creditInvestInfo.cus_name, //姓名
				nation: '', //民族
				birthday: '', //出生日期
				address: '', //住址
				issueoffice: '', //签发机关
				validity: '', //有效期
				photo: '', //wlt照片
				sex: '', //性别
				requestway: '0' //请求途径
			};
			this.alreadyId = false;
			this.$request
				.post({
					url: 'es/json/EsIdCardVerification',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						this.idLineCheck = res.response.content;
						if (res.response.content.checkresult == '01' || res.response.content.checkresult == '00') {
							this.alreadyId = true;
							var _this = this;
							uni.showToast({
								title: '开始人脸识别',
								icon: 'none'
							});
							setTimeout(function() {
								_this.faceCheck();
							}, 1000);
						} else {
							this.$store.state.errmsg = res.response.header.returnMsg;
							uni.navigateTo({
								url: '/pages/result/result?isSuccess=false&indet=true&isbind=' + this.isbind
							});
						}
					} else {
						this.$store.state.errmsg = res.response.header.returnMsg;
						uni.navigateTo({
							url: '/pages/result/result?isSuccess=false&indet=true&isbind=' + this.isbind
						});
					}
				})
				.catch(err => {});
		},
		faceCheck() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var _this = this;
			Camera({ num: 3 }, function(request, respons) {
				uni.hideLoading();
				console.log('拍照返回', respons);
				_this.$request
					.post({
						url: 'creditPhotoUpload/v1/CpmCreditUpload',
						data: {
							creditbase64: respons.imgbase64,
							phototype: '',
							serno: '',
							fileType: respons.imgtype
						}
					})
					.then(res => {
						res = res.result[0];
						if (res.head.returnCode == '00000000') {
							_this.faceCheckdata.upImage = res.content;
							var params = {
								cId: _this.isbind ? _this.$store.state.creReportInfo.cert_code : _this.$store.state.creditInvestInfo.cert_code, //证件号码
								cName: _this.isbind ? _this.$store.state.creReportInfo.cus_name : _this.$store.state.creditInvestInfo.cus_name, //人员姓名
								cType: '0020', //0020 身份证0201 护照0202 港澳通行证0203 台胞证0204 户口簿 0205 军官证
								faceImg: respons.imgbase64, //Base64编码
								channel: '0402', //0400  手机银行0401 直销银行0402  柜面，PC0403  VTM0404 ATM0406 自助发卡机0407 TCR
								org: '817', //客户所在法人行号（3位），威海银行固定值：817
								businesscode: '02', //数据字典如下：01  银行账户业务02  信贷及征信业务03   支付结算业务04   反洗钱业务05   其他业务
								usercode: '8170' + _this.accountInfo.actorno, //进行核查操作的柜员代码
								customerId: '', //客户核心号，是都可以不输入，还是条件必输
								inputtype: '1', //0  机具读取二代证信息 1  手工输入信息或机具读取手工修改过
								isNetworkCheck: '',
								netCheckImg: _this.idLineCheck.photo, //Base64编码 -- 核查返回图片
								netCheckImgType: '1' //联网核查图片类型 1高清 2网纹
							};
							_this.$request
								.post({
									url: 'es/json/EsFaceContrast',
									data: params
								})
								.then(res1 => {
									if (res1.response.header.returnCode == '00000000' && res1.response.content) {
										for (var key in res1.response.content) {
											_this.faceCheckdata[key] = res1.response.content[key];
										}
										_this.faceCheckdata.url = respons.imgbase64;
										var data = {
											cus_name: _this.isbind ? _this.$store.state.creReportInfo.cus_name : _this.$store.state.creditInvestInfo.cus_name,
											cert_code: _this.isbind ? _this.$store.state.creReportInfo.cert_code : _this.$store.state.creditInvestInfo.cert_code,
											font: _this.photofont,
											back: _this.photoback,
											idcard: _this.idLineCheck,
											face: _this.faceCheckdata,
											pdf: _this.$store.state.pdfSqsInfo
										};
										_this.$store.commit('setcustIndetInfo', data);
										uni.redirectTo({
											url: '/pages/indetificationCust/customJudgment?isbind=' + _this.isbind + '&serno=' + _this.currentSerno
										});
									} else {
										_this.resultfalse = true;
										_this.$store.state.errmsg = res1.response.header.returnMsg;
									}
								})
								.catch(err => {});
						} else {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			});
		},
		toHome() {
			if (this.isbind) {
				uni.navigateBack({});
			} else {
				uni.reLaunch({
					url: '/pages/home/home'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#pageCheckID .w100 {
	display: flex;
	flex-direction: column;
}
.mc-padding-wrap {
	width: 100%;
	height: 100%;
	// background: radial-gradient(circle at top right, #e4ecfa 7%, #ffffff 28%);
	background: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
	overflow: auto;
	padding-top: 40px;
}
#pageCheckID .mc-btn-primary {
	width: 100%;
	margin-top: 40rpx;
}
.photoAdd {
	width: 240px;
	height: 170px;
	margin: auto;
	margin-bottom: 30rpx;
}
.photoTip {
	text-align: center;
}
.photoWrap {
	margin-bottom: 60rpx;
}
.photoShow .uni-uploader__img {
	width: 240px;
	height: 170px;
}
.photoShow .delIcon {
	width: 36rpx;
	height: 36rpx;
}
.mc-padding-wrap1 {
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
	padding-top: 200rpx;
	box-sizing: border-box;
	padding-bottom: 1px;
}
.w100 {
	/* height: 70%; */
	/* height: 770rpx; */
	/* height: 900rpx; */
}
.bottomBtn {
	padding: 40rpx;
	box-sizing: border-box;
	padding-top: 0;
}
.bottomBtn .mc-btn-primary {
	width: 100%;
}
.resrow.icon {
	margin: 0 auto 40rpx;
	height: 130rpx;
	background: url(../../static/img/false@2x.png) no-repeat center;
	background-size: contain;
}
.resrow.icon.success {
	background: url(../../static/img/cgicon@2x.png) no-repeat center;
	background-size: contain;
}
.resrow.text {
	font-size: 36rpx;
	color: #333333;
	letter-spacing: 0;
	line-height: 36rpx;
}
.resrow.text.success {
	margin-bottom: 300rpx;
}
.errorWhy {
	max-height: 200rpx;
	background: #f8f9fd;
	margin: 40rpx 60rpx 80rpx;
	text-align: left;
	border-top: 1px solid #d9e7fc;
	padding: 32rpx 40rpx;
	overflow-y: auto;
}
.errorWhy .err-title {
	font-size: 24rpx;
	color: #939599;
	letter-spacing: 0;
	line-height: 24rpx;
}
.errorWhy .err-text {
	font-size: 28rpx;
	color: #626366;
	line-height: 44rpx;
}
.linebtn {
	display: flex;
	justify-content: space-between;
	margin: 0 60rpx;
}
.linebtn .bottomBtn {
	width: 45%;
}
.mc-btn-primaryplan {
	width: 100%;
	margin-top: 40rpx;
}
</style>
