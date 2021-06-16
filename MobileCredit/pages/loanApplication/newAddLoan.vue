<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<view class="w100">
			<view class="mianRadius mcform">
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title">产品编号</view>
					<input :disabled="true" v-model="loanInfoSave.prd_code" type="text" class="uni-input" value="" placeholder="请输入产品编号" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title">产品名称</view>
					<input :disabled="true" v-model="loanInfoSave.prd_name" type="text" class="uni-input" value="" placeholder="请输入产品名称" />
				</view>
				<block v-if="loanInfoSave.prd_code == '022022'">
					<view class="uni-form-item uni-column nopb bottomGap">
						<view class="title requireIcon">是否有经营实体</view>
						<mc-radio-group v-model="loanInfoSave.business_entity" :left="true">
							<mc-radio value="00" label="是"></mc-radio>
							<mc-radio value="01" label="否"></mc-radio>
						</mc-radio-group>
					</view>
				</block>
				<block v-if="loanInfoSave.prd_code == '022022' || loanInfoSave.prd_code == '022016'">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">业务品种细分</view>
						<mc-pop-select
							class="uni-input"
							v-model="loanInfoSave.biz_type_sub"
							:data="loanInfoSave.prd_code == '022022' ? selectdata.biz_type_sub : selectdata.biz_type_subxf"
						></mc-pop-select>
					</view>
				</block>
				<block v-if="loanInfoSave.prd_code == '022016' && loanInfoSave.biz_type_sub == '022204'">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">差额放款细分产品</view>
						<mc-pop-select class="uni-input" v-model="loanInfoSave.bal_loan_sub_prd" :data="selectdata.bal_loan_sub_prd"></mc-pop-select>
					</view>
				</block>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">客户号</view>
					<view class="uni-input" @click="setmanagerSelect('1')">
						<span v-if="!loanInfoSave.cus_id" class="placeholderss">请选择</span>
						<span v-else>{{ loanInfoSave.cus_id }}</span>
						<span class="iconfont icons">&#xe502;</span>
					</view>
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">客户名称</view>
					<input :disabled="true" v-model="loanInfoSave.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">贷款形式</view>
					<mc-pop-select class="uni-input" v-model="loanInfoSave.loan_form" :data="selectdata.loan_form"></mc-pop-select>
				</view>
				<block v-if="loanInfoSave.loan_form == '3'">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">原借据号</view>
						<view class="uni-input" @click="setmanagerSelect('2')">
							<span v-if="!loanInfoSave.old_bill_no" class="placeholderss">请选择</span>
							<span v-else>{{ loanInfoSave.old_bill_no }}</span>
							<span class="iconfont icons">&#xe502;</span>
						</view>
					</view>
				</block>
				<view
					class="uni-form-item uni-column onerow"
					:class="{
						lastRow: !(loanInfoSave.prd_code != '022022' && loanInfoSave.prd_code != '022009'),
						nopb: loanInfoSave.prd_code != '022022' && loanInfoSave.prd_code != '022009',
						bottomGap: loanInfoSave.prd_code != '022022' && loanInfoSave.prd_code != '022009'
					}"
				>
					<view class="title requireIcon">授信额度使用标识</view>
					<mc-pop-select class="uni-input" :disabled="true" v-model="loanInfoSave.limit_ind" :data="selectdata.limit_ind"></mc-pop-select>
				</view>
				<!-- 消费贷款的商品房时非必输-其他消费贷款必输-经营贷不必输 -->
				<block v-if="ptarflag">
					<view class="uni-form-item uni-column onerow lastRow">
						<view class="title requireIcon">是否小微企业管理口径</view>
						<mc-radio-group v-model="loanInfoSave.pt_ar_flag" :left="true">
							<mc-radio value="1" label="是"></mc-radio>
							<mc-radio value="2" label="否"></mc-radio>
						</mc-radio-group>
					</view>
				</block>
			</view>
			<button type="" class="mc-btn-primary" @click="sureBtn(false)">确定</button>
		</view>
	</view>
</template>

<script>
import { selectdata } from './select.js';
import { requestParams } from './requestParams.js';
export default {
	data() {
		return {
			selectdata: selectdata,
			loanInfoSave: {
				prd_code: '', //产品编号
				prd_name: '', //产品名称
				business_entity: '', //是否有经营实体
				biz_type_sub: '', //业务品种细分
				bal_loan_sub_prd: '', //差额放款细分产品
				cus_id: '', //客户号
				cus_name: '', //客户名称
				loan_form: '1', //贷款形式
				old_bill_no: '', //原借据号
				limit_ind: '1', //授信额度使用标识
				pt_ar_flag: '' // 是否小微企业管理口径
			},
			loanInfoSaveRequired: [
				{ name: 'prd_code', checkType: 'notnull', errorMsg: '请输入产品编号' },
				{ name: 'prd_name', checkType: 'notnull', errorMsg: '请输入产品名称' },
				{ name: 'business_entity', checkType: 'notnull', errorMsg: '请选择是否有经营实体', valid: false },
				{ name: 'biz_type_sub', checkType: 'notnull', errorMsg: '请选择业务品种细分', valid: false },
				{ name: 'bal_loan_sub_prd', checkType: 'notnull', errorMsg: '差额放款细分产品', valid: false },
				{ name: 'cus_id', checkType: 'notnull', errorMsg: '请选择客户号' },
				{ name: 'cus_name', checkType: 'notnull', errorMsg: '请输入客户名称' },
				{ name: 'loan_form', checkType: 'notnull', errorMsg: '请选择贷款形式' },
				{ name: 'old_bill_no', checkType: 'notnull', errorMsg: '请选择原借据号', valid: false },
				{ name: 'limit_ind', checkType: 'notnull', errorMsg: '请选择授信额度使用标识' },
				{ name: 'pt_ar_flag', checkType: 'notnull', errorMsg: '请选择是否小微企业管理口径', valid: false }
			],
			clickBtn: false,
			checkbox: false
		};
	},
	onShow() {
		if (this.$store.state.originalIOUSelect.bill_no) {
			this.loanInfoSave.old_bill_no = this.$store.state.originalIOUSelect.bill_no;
		}
		if (this.$store.state.custmorSelect.cus_id) {
			this.loanInfoSave.cus_id = this.$store.state.custmorSelect.cus_id;
			this.loanInfoSave.cus_name = this.$store.state.custmorSelect.cus_name;
			this.loanInfoSave.idInfo = {
				cert_type: this.$store.state.custmorSelect.cert_type,
				cert_code: this.$store.state.custmorSelect.cert_code
			};
		}
		this.$forceUpdate();
	},
	onLoad: function(option) {
		// custType 1临时  2 正式  3 担保
		this.loanInfoSave.prd_code = option.prdcode; // 客户编号
	},
	onBackPress() {
		this.$store.commit('delapplicationInfo');
		this.$store.commit('delcustmorSelect');
		this.$store.commit('delpdfSqsInfo');
	},
	onHide() {
		if (!this.clickBtn) {
			this.$store.commit('delapplicationInfo');
		}
		this.$store.commit('delcustmorSelect');
		this.$store.commit('delpdfSqsInfo');
	},
	computed: {
		indiv_ass_flag() {
			if (this.isAdd) {
				return '0';
			}
			if (this.isChange) {
				return '1';
			}
		},
		ptarflag() {
			var item = { name: 'pt_ar_flag', checkType: 'notnull', errorMsg: '请选择是否小微企业管理口径', valid: false };
			var index = this.arrHasObj(this.loanInfoSaveRequired, item);

			if (this.loanInfoSave.prd_code != '022022' && this.loanInfoSave.prd_code != '022009') {
				this.loanInfoSaveRequired[index].valid = true;
				return true;
			}
			this.loanInfoSaveRequired[index].valid = false;
			return false;
		}
	},
	mounted() {
		this.$store.commit('delapplicationInfo');
		this.$store.commit('delcustmorSelect');
		this.$store.commit('delpdfSqsInfo');
	},
	methods: {
		async sureBtn(aasss) {
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
			this.$store.commit('setapplicationInfo', this.loanInfoSave);
			this.$store.commit('delcustmorSelect');
			uni.redirectTo({
				url: '/pages/loanApplication/loanApplication?isAdd=true'
			});
		},
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		setmanagerSelect(page, item) {
			if (page == '1') {
				this.toLink('/pages/loanApplication/queryCustom');
			} else if (page == '2') {
				if (this.loanInfoSave.cus_id) {
					this.toLink('/pages/loanApplication/originalIOU?biztype=' + this.loanInfoSave.prd_code + '&cusid=' + this.loanInfoSave.cus_id);
				} else {
					uni.showToast({ title: '请先选择客户', icon: 'none' });
					return;
				}
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
				// 个人消费贷款-综合消费额度贷款 显示 业务品种细分
				var item1 = [{ name: 'biz_type_sub', checkType: 'notnull', errorMsg: '请选择业务品种细分' }];
				this.changeRequireStatus(item1, 'loanInfoSave', 'prd_code', '022016');
			}
		},
		'loanInfoSave.loan_form': {
			handler(newv, oldv) {
				var item = [{ name: 'old_bill_no', checkType: 'notnull', errorMsg: '请选择原借据号' }];
				this.changeRequireStatus(item, 'loanInfoSave', 'loan_form', '3');
			}
		},
		'loanInfoSave.biz_type_sub': {
			handler(newv, oldv) {
				if (
					(this.loanInfoSave.prd_code == '022022' && this.loanInfoSave.biz_type_sub == '022241') ||
					(this.loanInfoSave.prd_code == '022016' && this.loanInfoSave.biz_type_sub == '022204')
				) {
					setTimeout(function(){
						uni.showModal({
							content: '网易贷业务，需要审批后5天内签订合同！',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
					},300)
				}
				if (this.loanInfoSave.prd_code == '022016') {
					var item = [{ name: 'bal_loan_sub_prd', checkType: 'notnull', errorMsg: '差额放款细分产品', valid: false }];
					this.changeRequireStatus(item, 'loanInfoSave', 'biz_type_sub', '022204');
				}
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
