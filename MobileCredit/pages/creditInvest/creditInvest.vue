<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<view class="w100">
			<view class="mianRadius mcform">
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">姓名</view>
					<input v-model="loanInfoSave.cus_name" type="text" class="uni-input" value="" placeholder="请输入姓名" />
					<span :class="{ iconCertDiscern: true }" @click="toDiscernCert()"></span>
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">身份证号</view>
					<input v-model="loanInfoSave.cert_code" type="text" class="uni-input" value="" placeholder="请输入身份证号" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">查询用途</view>
					<mc-pop-select
						class="uni-input"
						v-model="loanInfoSave.yt"
						:data="yt"
					></mc-pop-select>
				</view>
			</view>
			<view class="textView">
				<checkbox-group class="remember" @change="checkChange">
					<label>
						<checkbox value="1" :checked="checkbox" />
						我已阅读
						<span class="linkicon" @click.stop="toDoc()">《个人信用信息查询及提供授权书》</span>
					</label>
				</checkbox-group>
			</view>
			<button type="" class="mc-btn-primary" @click="sureBtn(false)">确定</button>
		</view>
	</view>
</template>

<script>
import { getDiscernCert } from '@/common/Mobile/MobileUtils.js';
export default {
	data() {
		return {
			selectdata: {},
			loanInfoSave: {
				cus_name: '', //客户姓名
				cert_code: '', //身份证号
				cert_type: '10', //证件类型
				yt: '' //征信用途
			},
			loanInfoSaveRequired: [
				{ name: 'cus_name', checkType: 'notnull', errorMsg: '请输入姓名' },
				{ name: 'cert_code', checkType: 'certcode', errorMsg: '请输入身份证号', error: '身份证号错误' },
				{ name: 'yt', checkType: 'notnull', errorMsg: '请选择征信用途'}
			],
			clickBtn: false,
			checkbox: false,
			discernCert: false, //是否是识别回来的
			yt: [
				{value:"01",label:"贷后管理"},
				{value:"02",label:"贷款审批"},
				{value:"03",label:"信用卡审批"},
				{value:"08",label:"担保资格审查"},
				{value:"19",label:"特约商户实名审查"},
				{value:"22",label:"法人代表、负责人、高管等资信审查"},
				{value:"23",label:"客户准入资格审查"},
				{value:"25",label:"资信审查"},
			]
		};
	},
	onShow() {},
	/* onLoad: function(option) {
		if (this.$store.state.accountInfos.qxSign !== this.$store.state.qxValue && process.env.NODE_ENV === 'production') {
			uni.showModal({
				showCancel: false,
				title: '提示',
				content: '您没有此操作权限',
				success: function() {
					uni.navigateBack({});
				}
			});
		}
		// custType 1临时  2 正式  3 担保
		this.loanInfoSave.prd_code = option.prdcode; // 客户编号
	}, */
	onBackPress() {
		this.$store.commit('delcreditInvestInfo');
		this.$store.commit('delpdfSqsInfo');
		this.$store.commit('delpdfSqsInfo');
	},
	onHide() {
		if (!this.clickBtn) {
			this.$store.commit('delcreditInvestInfo');
		}
	},
	computed: {
		indiv_ass_flag() {
			if (this.isAdd) {
				return '0';
			}
			if (this.isChange) {
				return '1';
			}
		}
	},
	mounted() {},
	methods: {
		async sureBtn(aasss) {
			if (!this.checkbox) {
				uni.showToast({ title: '请同意协议', icon: 'none' });
				return;
			}
			console.log('tsjof ri=ule:', this.loanInfoSaveRequired);
			this.clickBtn = false;
			var rule = this.getRule(this.loanInfoSaveRequired);
			console.log('tsjof ri=ule:', rule);
			var formData = this.loanInfoSave;
			var checkRes = this.$graceChecker.check(formData, rule);
			if (!checkRes) {
				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
				return;
			}
			this.clickBtn = true;
			this.$store.commit('setcreditInvestInfo', this.loanInfoSave);
			//getPdf
			this.pdfCreate('next');
		},
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		async toDiscernCert() {
			this.discernCert = false;
			var resolve = await getDiscernCert();
			this.discernCert = true;
			console.log('返回信息', resolve);
			if (resolve) {
				if (resolve.res) {
					this.loanInfoSave.cert_code = resolve.res.num;
					this.loanInfoSave.cus_name = resolve.res.name;
				}
				this.$forceUpdate();
			}
		},
		toDoc() {
			if (this.loanInfoSave.cus_name && this.loanInfoSave.cert_code) {
				// 有客户信息进行下一步
				this.pdfCreate('doc');
			} else {
				uni.showToast({ title: '请先录入信息', icon: 'none' });
			}
		},
		pdfCreate(typeDoc) {
			var params = {
				TemplateCode: 'dq001',
				IdCardNo: this.loanInfoSave.cert_code,
				AttributeDatas: [
					{
						key: 'NAME',
						value: this.loanInfoSave.cus_name ? this.loanInfoSave.cus_name : '',
						type: 'text',
						tempLateIndex: 1
					}
				],
				isUploadImage: 'false', // 上传影像平台--授权书此时不上传影像平台
				ImageDatas: []
			};
			uni.setStorage({
				key: 'sqsPdf',
				data: '',
				success: function() {}
			});
			//生成pdf,
			this.$request
				.post({
					url: 'es/json/EsCreditCreatePDF',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						this.pdfSqsInfo = res.response.content;
						this.$store.commit('setpdfSqsInfo', this.pdfSqsInfo);
						uni.setStorage({
							key: 'sqsPdf',
							data: res.response.content.Pdf,
							success: function() {}
						});
						if (res.response.content.Pdf) {
							if (typeDoc == 'next') {
								uni.navigateTo({
									url: '/pages/indetificationCust/indetificationCust'
								});
							} else if (typeDoc == 'doc') {
								uni.navigateTo({
									url: '/pages/indetificationCust/docPage?docType=1'
								});
							}
						} else {
							if (res.response.content.resout) {
								uni.showToast({ title: res.response.content.resout, icon: 'none' });
							} else {
								uni.showToast({ title: '获取文档失败', icon: 'none' });
							}
						}
					} else {
						uni.showToast({ title: res.response.header.returnMsg, icon: 'none' });
					}
				})
				.catch(err => {
					console.log('eee', err);
					uni.showToast({ title: err, icon: 'none' });
				});
		},
		checkChange: function() {
			this.checkbox = !this.checkbox;
		},
		setmanagerSelect(page, item) {
			if (page == '1') {
				this.toLink('/pages/loanApplication/queryCustom');
			} else if (page == '2') {
				this.toLink('/pages/loanApplication/originalIOU?biztype=' + this.loanInfoSave.prd_code + '&cusid=' + this.loanInfoSave.cus_id);
			}
		},
		prdcodename(val) {
			for (var i = 0; i < selectdata.prd_code.length; i++) {
				var item = selectdata.prd_code[i];
				if (item.value == val) {
					this.loanInfoSave.prd_name = item.label;
					return item.label;
					break;
				}
			}
		},
		changeRequireStatus(arr, paramsName, filedName, eqvalue, falgName, eqFlag) {
			var itemarr = arr;
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				if (eqFlag == 'indexof') {
				} else {
					this[paramsName][itemarr[i].name] = '';
				}
				indexArr.push(this.arrHasObj(this[paramsName + 'Required'], itemarr[i]));
				if (itemarr[i].replace === true) {
					itemarr[i].valid = false;
					this[paramsName + 'Required'][indexArr[i]] = itemarr[i];
				}
			}
			console.log('thijs.,', this[paramsName][filedName], eqvalue);
			if (eqFlag == 'indexof') {
				if (eqvalue.indexOf(this[paramsName][filedName]) != -1) {
					for (var i = 0; i < indexArr.length; i++) {
						this[paramsName + 'Required'][indexArr[i]].valid = true;
					}
					if (falgName) this[falgName] = true;
					return true;
				}
			} else {
				if (this[paramsName][filedName] == eqvalue) {
					for (var i = 0; i < indexArr.length; i++) {
						this[paramsName + 'Required'][indexArr[i]].valid = true;
					}
					if (falgName) this[falgName] = true;
					console.log('flagdatename:', this.flagdatename);
					return true;
				}
			}
			for (var i = 0; i < indexArr.length; i++) {
				this[paramsName + 'Required'][indexArr[i]].valid = false;
			}
			if (falgName) this[falgName] = false;
			return false;
		},
		arrHasObj(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == obj.name) {
					return i;
					break;
				}
			}
			return -1;
		},
		getRule(rule) {
			var arr = [];
			if (rule.length) {
				for (var i = 0; i < rule.length; i++) {
					if (rule[i].valid === undefined || rule[i].valid == true) {
						arr.push(rule[i]);
					}
				}
			}
			return arr;
		}
	},
	watch: {
		'loanInfoSave.prd_code': {
			handler(newv, oldv) {
				console.log('eee new', newv, 'ov', oldv);
				this.prdcodename(newv);
				var item = [
					{ name: 'business_entity', checkType: 'notnull', errorMsg: '请选择是否有经营实体' },
					{ name: 'biz_type_sub', checkType: 'notnull', errorMsg: '请选择业务品种细分' }
				];
				this.changeRequireStatus(item, 'loanInfoSave', 'prd_code', '022022');
			}
		},
		'loanInfoSave.loan_form': {
			handler(newv, oldv) {
				var item = [{ name: 'old_bill_no', checkType: 'notnull', errorMsg: '请选择原借据号' }];
				this.changeRequireStatus(item, 'loanInfoSave', 'loan_form', '3');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.nopb.bottomGap {
	padding-bottom: 0;
}
#pageCheckID .mc-btn-primary {
	width: 100%;
}
#pageCheckID .w100 {
	display: flex;
	flex-direction: column;
}
#pageCheckID .mcform {
	margin-bottom: 40rpx;
}
#pageCheckID .mcform .infoTipTitle {
	font-weight: 600;
}
.bottomGap {
	padding-bottom: 28rpx;
}
.mcform .oneTextarea {
	flex: 1;
	height: 200rpx;
}
.mcform .uni-form-item.onerow.minHeight {
	height: 40rpx;
}
.mcform .uni-form-item .uni-input {
	text-align: right;
}
.textLeft {
	text-align: left !important;
}
.lastRow {
	margin-bottom: 40rpx;
}
.mcform .uni-form-item.onerow.minHeight .uni-input {
	line-height: 40rpx;
	height: 40rpx;
}
.mcform .uni-list-cell::after {
	display: none !important;
}
.mcform uni-radio-group,
.mcform uni-checkbox-group {
	font-size: 28rpx;
	color: $mc-text-checkTitle;
}
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
}
.select-dialog-wrap {
	padding: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.uni-tip-title-row {
	display: flex;
	justify-content: space-between;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-color;
	letter-spacing: 0;
	line-height: 100rpx;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
	line-height: 100rpx;
}
.uni-column .minHeight1 {
	line-height: 1.5;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.iconfont.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
#pageCheckID .placeholderss {
	color: #c4c7cc;
}
.textView {
	padding: 20rpx 0;
}
.linkicon {
	color: $mc-color-blue;
}
.remember {
	width: 100%;
	line-height: 2;
}
.remember .uni-label-pointer /deep/ uni-checkbox .uni-checkbox-input {
	width: 32rpx;
	height: 32rpx;
}
.remember uni-radio-group uni-label,
uni-checkbox-group uni-label {
	padding-right: 0;
}
</style>
