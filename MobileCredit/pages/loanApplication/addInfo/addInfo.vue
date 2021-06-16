<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<view class="w100">
			<block v-if="queryType == '4'">
				<!-- 合作方信息 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column nopb bottomGap" :class="{ onerow: basicCollaboratoraddInfo.cop_cont_no === '' ? true : false }">
						<view class="title requireIcon">第三方授信协议编号</view>
						<view class="uni-input" @click="isDetail || isChange ? '' : toLink('/pages/loanApplication/addInfo/selectPage?type=4')">
							<span v-if="!basicCollaboratoraddInfo.cop_cont_no" class="placeholderss">请选择</span>
							<span v-else>{{ basicCollaboratoraddInfo.cop_cont_no }}</span>
							<span class="iconfont icons">&#xe502;</span>
						</view>
					</view>
					<view class="uni-form-item uni-column onerow lastRow">
						<view class="title requireIcon minHeight1 width40">本次业务占用金额(元)</view>
						<input
							:disabled="isDetail"
							v-model="basicCollaboratoraddInfo.cop_use_amt"
							@blur="checkcopuseamt"
							type="number"
							class="uni-input"
							value=""
							placeholder="请输入本次业务占用金额"
						/>
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('basicCollaboratoraddInfo')">确定</button>
			</block>
			<block v-if="queryType == '3'">
				<!-- 支付信息 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon minHeight1">受托支付是否行内标志</view>
						<mc-radio-group :disabled="isDetail" v-model="basicPayaddInfo.is_loc" :left="true">
							<mc-radio value="1" label="是"></mc-radio>
							<mc-radio value="2" label="否"></mc-radio>
						</mc-radio-group>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">账号</view>
						<input
							:disabled="isDetail"
							v-model="basicPayaddInfo.benifit_acc"
							@input="accAlerdayCheck = false"
							@blur="queryAccountInfo()"
							type="number"
							class="uni-input"
							value=""
							placeholder="请输入账号"
						/>
						<span :class="{ iconCertDiscern: true, idisables: isDetail }" @click="isDetail ? '' : toDiscernCert()"></span>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">账号户名</view>
						<input :disabled="isDetail" v-model="basicPayaddInfo.benifit_name" type="text" class="uni-input" value="" placeholder="请输入账号户名" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title">开户行行号</view>
						<input :disabled="isDetail" v-model="basicPayaddInfo.benifit_bank_id" type="number" class="uni-input" value="" placeholder="请输入开户行行号" />
					</view>
					<view class="uni-form-item uni-column nopb bottomGap">
						<view class="title requireIcon">开户行行名</view>
						<textarea class="autoHeightArea" auto-height :disabled="isDetail" v-model="basicPayaddInfo.benifit_bank" maxlength="60" placeholder="请输入开户行行名" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">付款金额(元)</view>
						<input :disabled="isDetail" v-model="basicPayaddInfo.amount" type="number" class="uni-input" value="" placeholder="请输入付款金额" />
					</view>
					<view class="uni-form-item uni-column onerow" v-if="basicPayaddInfo.is_loc == 1">
						<view class="title requireIcon">受托支付行内转账模式</view>
						<mc-pop-select :disabled="isDetail" class="uni-input" v-model="basicPayaddInfo.etp_in_tx_typ" :data="selectdata.etp_in_tx_typ"></mc-pop-select>
					</view>
					<view class="uni-form-item uni-column onerow" v-if="basicPayaddInfo.is_loc == 2">
						<view class="title requireIcon">受托支付行外转账模式</view>
						<mc-pop-select :disabled="isDetail" class="uni-input" v-model="basicPayaddInfo.etp_out_tx_typ" :data="selectdata.etp_out_tx_typ"></mc-pop-select>
					</view>
					<!-- 隐藏-无字段 -->
					<!-- <view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title">支付时间</view>
						<mc-picker-select class="uni-input" :disabled="isDetail" mode="date" v-model="basicPayaddInfo.pay_date"></mc-picker-select>
					</view> -->
					<view class="uni-form-item uni-column lastRow">
						<view class="title requireIcon">用途</view>
						<textarea v-model="basicPayaddInfo.remarks" :disabled="isDetail" maxlength="120" class="textLeft" placeholder="请输入用途" />
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('basicPayaddInfo')">确定</button>
			</block>
			<block v-if="queryType == 'repay'">
				<!-- 还款计划 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="isChange || isDetail">
						<view class="title requireIcon">还款计划流水号</view>
						<input disabled v-model="basicRepayInfo.pk_value" type="text" class="uni-input" value="" placeholder="请输入还款计划流水号" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">还款金额(元)</view>
						<input :disabled="isDetail" v-model="basicRepayInfo.repay_amt" @blur="checkMoney" type="number" class="uni-input" value="" placeholder="请输入还款金额" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">还款日期</view>
						<mc-picker-select class="uni-input" mode="date" v-model="basicRepayInfo.repay_date"></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">是否成功发送核心</view>
						<mc-picker-select
							class="uni-input"
							mode="selector"
							disabled
							v-model="basicRepayInfo.send_flag"
							range-key="label"
							:range="selectdata.is_send_flag"
						></mc-picker-select>
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('basicRepayInfo')">确定</button>
			</block>
			<block v-if="queryType == '1'">
				<!-- 债务人 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">客户号</view>
						<view class="uni-input" @click="isDetail ? '' : toLink('/pages/loanApplication/queryCustom?condshow=false&custstatus=1')">
							<span v-if="!basicDebtoraddInfo.cus_id" class="placeholderss">请选择客户号</span>
							<span v-else>{{ basicDebtoraddInfo.cus_id }}</span>
							<span class="iconfont icons">&#xe502;</span>
						</view>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">客户名称</view>
						<input :disabled="true" v-model="basicDebtoraddInfo.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">证件类型</view>
						<mc-picker-select
							:disabled="true"
							class="uni-input"
							mode="selector"
							v-model="basicDebtoraddInfo.cert_type"
							range-key="label"
							:range="selectdata.cert_type1"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">证件号码</view>
						<input :disabled="true" v-model="basicDebtoraddInfo.cert_code" type="text" class="uni-input" value="" placeholder="请输入证件号码" />
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('basicDebtoraddInfo')">确定</button>
			</block>
			<block v-if="queryType == '2'">
				<!-- 担保人 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="isChange || isDetail">
						<view class="title requireIcon">保证人编号</view>
						<input disabled v-model="baseguarantoraddInfo.guaranty_id" type="text" class="uni-input" value="" placeholder="请输入保证人编号" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">保证人客户号</view>
						<view
							class="uni-input"
							:class="{ disabledtext: isChange || isDetail }"
							@click="isChange || isDetail ? '' : toLink('/pages/loanApplication/queryCustom?condshow=false&custstatus=2')"
						>
							<span v-if="!baseguarantoraddInfo.cus_id" class="placeholderss">请选择客户号</span>
							<span v-else>{{ baseguarantoraddInfo.cus_id }}</span>
							<span class="iconfont icons">&#xe502;</span>
						</view>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">保证人类型</view>
						<mc-picker-select
							:disabled="isDetail"
							class="uni-input"
							mode="selector"
							v-model="baseguarantoraddInfo.cus_typ"
							range-key="label"
							:range="selectdata.add_cust_type"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow"">
						<view class="title requireIcon">保证人名称</view>
						<span  class="uni-input tworowcss" :class="{placeholderss:baseguarantoraddInfo.cus_name?false:true,disabledtext:true}" >{{baseguarantoraddInfo.cus_name?baseguarantoraddInfo.cus_name:'请输入保证人名称'}}</span>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
						<view class="title requireIcon">证件类型</view>
						<mc-picker-select
							:disabled="true"
							class="uni-input"
							mode="selector"
							v-model="baseguarantoraddInfo.cert_type"
							range-key="label"
							:range="selectdata.cert_type1"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">证件号码</view>
						<input :disabled="true" v-model="baseguarantoraddInfo.cert_code" type="text" class="uni-input" value="" placeholder="请输入证件号码" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">保证担保形式</view>
						<mc-picker-select
							:disabled="isDetail"
							class="uni-input"
							mode="selector"
							v-model="baseguarantoraddInfo.guaranty_type"
							range-key="label"
							:range="selectdata.guaranty_type"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">保证方式</view>
						<mc-picker-select
							:disabled="isDetail"
							class="uni-input"
							mode="selector"
							v-model="baseguarantoraddInfo.guarantee_type"
							range-key="label"
							:range="selectdata.guarantee_type"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">担保金额(元)</view>
						<input :disabled="isDetail" v-model="baseguarantoraddInfo.amount" type="number" class="uni-input" value="" placeholder="请输入担保金额" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">保证人保证能力上限</view>
						<input
							:disabled="isChange || isDetail"
							v-model="baseguarantoraddInfo.max_guarantee_capa"
							type="number"
							class="uni-input"
							value=""
							placeholder="请输入上限金额"
						/>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">币种</view>
						<mc-pop-select class="uni-input" v-model="CNY" :disabled="true" :data="selectdata.apply_cur_type"></mc-pop-select>
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('baseguarantoraddInfo')">确定</button>
			</block>
			<block v-if="queryType == '5'">
				<!-- 经营实体 -->
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
						<view class="title requireIcon">证件类型</view>
						<mc-picker-select
							:disabled="isDetail"
							class="uni-input"
							mode="selector"
							v-model="basicbusinessaddInfo.cert_type"
							range-key="label"
							:range="selectdata.public_cert_type"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">证件号码</view>
						<input
							:disabled="isDetail"
							v-model="basicbusinessaddInfo.cert_code"
							@blur="getGamateCusId(basicbusinessaddInfo.cert_type, basicbusinessaddInfo.cert_code)"
							type="text"
							class="uni-input"
							value=""
							placeholder="请输入证件号码"
						/>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">客户号</view>
						<input disabled v-model="basicbusinessaddInfo.cus_id" type="text" class="uni-input" value="" placeholder="请输入客户号" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">客户名称</view>
						<input disabled v-model="basicbusinessaddInfo.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="sureBtn('basicbusinessaddInfo')">确定</button>
			</block>
			<block v-if="queryType == 'inspect'">
				<view class="mianRadius mcform">
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title ">客户号</view>
						<input :disabled="true" v-model="CreditInspectResult.cus_id" type="text" class="uni-input" value="" placeholder="请输入客户号" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title ">客户角色</view>
						<mc-picker-select
							:disabled="true"
							class="uni-input"
							mode="selector"
							v-model="CreditInspectResult.cus_type"
							range-key="label"
							:range="selectdata.cust_type_role"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title ">客户名称</view>
						<input :disabled="true" v-model="CreditInspectResult.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title ">证件类型</view>
						<mc-picker-select
							:disabled="true"
							class="uni-input"
							mode="selector"
							v-model="CreditInspectResult.cert_type"
							range-key="label"
							:range="selectdata.cert_type_all"
						></mc-picker-select>
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title">证件号码</view>
						<input :disabled="true" v-model="CreditInspectResult.cert_code" type="text" class="uni-input" value="" placeholder="请输入证件号码" />
					</view>
					<view class="uni-form-item uni-column onerow nopb bottomGap">
						<view class="title requireIcon">绑定流水号</view>
						<input v-model="CreditInspectResult.serial_number" type="number" class="uni-input" value="" placeholder="请输入绑定流水号" />
						<button type="" :disabled="isDetail" class="mc-min-btn-primary haveBg classBind" @click="getceSerno()">绑定</button>
					</view>
					<view class="textView">
						<checkbox-group class="remember" @change="checkChange">
							<label>
								<checkbox value="1" :checked="checkbox" />
								我已阅读
								<span class="linkicon" @click.stop="toDoc(false)">《个人信用信息查询及提供授权书》</span>
							</label>
						</checkbox-group>
					</view>
				</view>
				<button type="" :disabled="isDetail" class="mc-btn-primary" @click="bindReport()">确定</button>
			</block>
		</view>
	</view>
</template>

<script>
import { selectdata } from '../select.js';
import { selectdata as customerMgselectdata } from '../../customerMg/select.js';
import { requestParams } from '../requestParams.js';
import { Camera, getDiscernCert } from '@/common/Mobile/MobileUtils.js';
export default {
	data() {
		return {
			CNY: 'CNY',
			selectdata: selectdata,
			requestParams: requestParams,
			customerMgselectdata: customerMgselectdata,
			addachInfoAll: JSON.parse(JSON.stringify(requestParams.addachInfoAll)), //附加信息所有上送字段
			basicCollaboratoraddInfo: JSON.parse(JSON.stringify(requestParams.basicCollaboratoraddInfo)), //贷款基本信息-合作方信息
			basicCollaboratoraddInfoRequired: JSON.parse(JSON.stringify(requestParams.basicCollaboratoraddInfoRequired)), //临贷款基本信息-合作方信息必填项
			basicPayaddInfo: JSON.parse(JSON.stringify(requestParams.basicPayaddInfo)), //贷款基本信息-支付信息
			basicPayaddInfoRequired: JSON.parse(JSON.stringify(requestParams.basicPayaddInfoRequired)), //临贷款基本信息-支付信息必填项
			basicRepayInfo: JSON.parse(JSON.stringify(requestParams.basicRepayInfo)), //还款信息
			basicRepayInfoRequired: JSON.parse(JSON.stringify(requestParams.basicRepayInfoRequired)), //还款信息必填项
			basicDebtoraddInfo: JSON.parse(JSON.stringify(requestParams.basicDebtoraddInfo)), //共债人
			basicDebtoraddInfoRequired: JSON.parse(JSON.stringify(requestParams.basicDebtoraddInfoRequired)), //共债人必填项
			baseguarantoraddInfo: JSON.parse(JSON.stringify(requestParams.baseguarantoraddInfo)), //担保人信息
			baseguarantoraddInfoRequired: JSON.parse(JSON.stringify(requestParams.baseguarantoraddInfoRequired)), //担保人信息必填项
			basicbusinessaddInfo: JSON.parse(JSON.stringify(requestParams.basicbusinessaddInfo)), //经营实体信息
			basicbusinessaddInfoRequired: JSON.parse(JSON.stringify(requestParams.basicbusinessaddInfoRequired)), //经营实体信息必填项
			CreditInspectResult: JSON.parse(JSON.stringify(requestParams.CreditInspectResult)), //征贷结果推送
			CreditInspectResultRequired: JSON.parse(JSON.stringify(requestParams.CreditInspectResultRequired)), //征贷结果推送
			isDetail: false,
			isAdd: false,
			isChange: false,
			currentserno: '', //本条贷前申请流水号
			queryType: '', // 类型
			repayend_date: '', //贷款到期日
			apply_amount: '', //申请金额
			indexNum: '', //列表index
			checkbox: false,
			copartnerlistCount: [], //数组已有合作方列表数据
			benifitaccbef: '', //原账号
			accAlerdayCheck: false,
			accAlerdayCheckMsg: ''
		};
	},
	onShow() {
		// cop_acc_no合作方台账编号  业务申请流水号--组合不能重复=======已添加的cop_acc_no不能重复添加
		if (this.$store.state.basicCollaborator.ctr_no) {
			this.basicCollaboratoraddInfo.cop_cont_no = this.$store.state.basicCollaborator.ctr_no;
			this.basicCollaboratoraddInfo.cus_id = this.$store.state.basicCollaborator.cop_cus_no;
			this.basicCollaboratoraddInfo.cus_name = this.$store.state.basicCollaborator.cop_cus_name;
			this.basicCollaboratoraddInfo.amount = this.$store.state.basicCollaborator.lmt_sum;
			this.basicCollaboratoraddInfo.cop_acc_no = this.$store.state.basicCollaborator.acc_no;
			this.basicCollaboratoraddInfo.lmt_balance = this.$store.state.basicCollaborator.lmt_balance;
		}
		if (this.$store.state.custmorSelect.cus_id) {
			if (this.queryType == '2') {
				this.baseguarantoraddInfo.cus_id = this.$store.state.custmorSelect.cus_id;
				this.baseguarantoraddInfo.cus_name = this.$store.state.custmorSelect.cus_name;
				this.baseguarantoraddInfo.cert_type = this.$store.state.custmorSelect.cert_type;
				this.baseguarantoraddInfo.cert_code = this.$store.state.custmorSelect.cert_code;
			} else if (this.queryType == '1') {
				this.basicDebtoraddInfo.cus_id = this.$store.state.custmorSelect.cus_id;
				this.basicDebtoraddInfo.cus_name = this.$store.state.custmorSelect.cus_name;
				this.basicDebtoraddInfo.cert_type = this.$store.state.custmorSelect.cert_type;
				this.basicDebtoraddInfo.cert_code = this.$store.state.custmorSelect.cert_code;
			}
		}
		//绑定返回的征信流水号
		if (this.$store.state.creReportInfo.ZX_SERNO) {
			this.CreditInspectResult.serial_number = this.$store.state.creReportInfo.ZX_SERNO;
		}
		this.$forceUpdate();
	},
	onBackPress() {},
	onLoad: function(option) {
		// var option = JSON.parse(option);
		this.isChange = option.isChange ? JSON.parse(option.isChange) : false;
		this.isAdd = option.isAdd ? JSON.parse(option.isAdd) : false;
		this.isDetail = option.isDetail ? JSON.parse(option.isDetail) : false;
		this.currentserno = option.serno; // 客户编号
		this.queryType = option.type; // 类型
		this.indexNum = option.index; // 类型
		this.repayend_date = option.repayend;
		this.apply_amount = option.apply_amount;
		this.basicRepayInfo.pk_value = option.pk_value;
		if (this.queryType == 4) {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增合作方信息'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改合作方信息'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '查看合作方信息'
				});
			}
		} else if (this.queryType == 3) {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增支付信息'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改支付信息'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '查看支付信息'
				});
			}
		} else if (this.queryType == 2) {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增担保人'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改担保人'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '担保人详情'
				});
			}
		} else if (this.queryType == 1) {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增债务人'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改债务人'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '债务人详情'
				});
			}
		} else if (this.queryType == 'repay') {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增还款计划'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改还款计划'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '还款计划详情'
				});
			}
		} else if (this.queryType == 5) {
			if (this.isAdd) {
				uni.setNavigationBarTitle({
					title: '新增经营实体信息'
				});
			} else if (this.isChange) {
				uni.setNavigationBarTitle({
					title: '修改经营实体信息'
				});
			} else if (this.isDetail) {
				uni.setNavigationBarTitle({
					title: '经营实体信息详情'
				});
			}
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
	mounted() {
		this.$store.commit('delbasicInfos');
		var filedName = '';
		if (this.queryType == 4) {
			filedName = 'basicCollaboratoraddInfo';
			this.queryOtherInfoList();
		} else if (this.queryType == 3) {
			filedName = 'basicPayaddInfo';
		} else if (this.queryType == 1) {
			filedName = 'basicDebtoraddInfo';
		} else if (this.queryType == 2) {
			filedName = 'baseguarantoraddInfo';
		} else if (this.queryType == 5) {
			filedName = 'basicbusinessaddInfo';
			if (this.isAdd) {
				this.basicbusinessaddInfo.cus_name = this.$store.state.applicationInfo.cus_name;
				this.basicbusinessaddInfo.cus_id = this.$store.state.applicationInfo.cus_id;
			}
		}
		if (this.isChange || this.isDetail) {
			this.showData(filedName);
		} else {
			if (this.queryType == 'repay') {
				this.basicRepayInfo = JSON.parse(JSON.stringify(requestParams.basicRepayInfo));
			} else {
				this[filedName] = JSON.parse(JSON.stringify(requestParams[filedName]));
			}
			this.$forceUpdate();
		}
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		bindReport() {
			if (!this.checkbox) {
				uni.showToast({ title: '请同意协议', icon: 'none' });
				return;
			}
			if (this.CreditInspectResult.result_code) {
				// 如果已绑定征信报告-直接往信贷推送征信结果
				this.sendCreditResult();
				return;
			}
			var formData = this.CreditInspectResult;
			var rule = this.getRule(this.CreditInspectResultRequired);
			var checkRes = this.$graceChecker.check(formData, rule);
			if (!checkRes) {
				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
				return;
			}
			var zxParams = {
				SERNO: this.CreditInspectResult.serial_number, //流水号
				CUS_NAME: this.CreditInspectResult.cus_name, // 被查询人客户名称
				CERT_CATE: '1', //身份类别(1-个人、2-企业)(现在只传1)
				CERT_TYPE: this.CreditInspectResult.cert_type, //证件类型(见下面)
				CERT_CODE: this.CreditInspectResult.cert_code, //证件号码
				QUERY_REASON: '2', //查询原因 (2业务申请)
				INPUT_BR_ID: this.$store.state.accountInfos.orgid, //客户经理机构号
				INPUT_ID: this.$store.state.accountInfos.actorno, // 客户经理号
				PBOC_Y_N: '1' //是否只查最新的报告(2-否、1-是,即1-不复用缓存；2-复用)
			};
			// 征信绑定
			this.$request
				.post({
					url: 'es/json/EsCreditReportEnquiry',
					data: {
						serno: this.currentserno ? this.currentserno : '', //	流水号
						queryzxList: {
							colt: zxParams
						}
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						// TRANS_DATE_TIME	响应时间
						// CERT_CATE	身份类别
						// CERT_TYPE	证件类型
						// CERT_CODE	证件号码
						// RESULT_CODE	响应代码
						// RESULT_MSG	响应内容
						// QUERY_DATE	查询日期
						this.CreditInspectResult.result_code = res.response.content.RESULT_CODE;
						this.CreditInspectResult.result_msg = res.response.content.RESULT_MSG;
						this.CreditInspectResult.query_date = res.response.content.QUERY_DATE;
						this.sendCreditResult();
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		sendCreditResult(fdname) {
			var lists = this.CreditInspectResult;
			var params = {
				serno: '', //流水号
				crt_list: [lists]
			};
			this.$request
				.post({
					url: 'es/json/EsSendCreditInspectResult',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						Object.assign(requestParams.basicCreditInspectResult[this.indexNum], this.CreditInspectResult);
						this.$store.commit('delcreReportInfo');
						uni.navigateBack({});
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		async sureBtn(fdname) {
			var formData = this[fdname];
			var rule = this.getRule(this[fdname + 'Required']);
			var checkRes = this.$graceChecker.check(formData, rule);
			if (!checkRes) {
				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
				return;
			}
			if (this.queryType == 3) {
				if (this.benifitaccbef != this.basicPayaddInfo.benifit_acc) {
					if (!this.accAlerdayCheck) {
						var istrue = await this.queryAccountInfoPromise();
						if (!istrue) {
							return;
						}
					}
				}
			}
			if (this.queryType == 'repay') {
				var type = this.isChange ? '1' : '0';
				this.addReplayInfo(type);
				return;
			}
			// 0新增
			// 1修改
			// 2删除
			//校验本次占用金额的限制
			if (fdname == 'basicCollaboratoraddInfo') {
				if (!this.checkcopuseamt()) {
					return;
				}
			}
			var params = JSON.parse(JSON.stringify(this.addachInfoAll));

			Object.assign(params, this[fdname]);
			if (this.isChange) {
				params.AppFlag = '1';
				delete params.Othertype;
			} else {
				params.AppFlag = '0';
			}
			if (this.queryType == 3) {
				params.benifit_acc_bef = this.benifitaccbef;
			}
			this.$request
				.post({
					url: 'es/json/EsAdditionalInfoModify',
					data: {
						serno: this.currentserno, //	流水号
						Othertype: this.queryType, //	新增类型
						other_list: [params]
					}
				})
				.then(res => {
					console.log('附加信息修改', res);
					if (res.response.header.returnCode == '00000000') {
						if (this.isAdd) {
							this.$store.commit('setbasicInfos', { type: this.queryType });
						}
						if (this.isChange) {
							if (this.queryType == 1) {
								Object.assign(requestParams.basicdebtor_list[this.indexNum], this[fdname]);
							} else if (this.queryType == 2) {
								Object.assign(requestParams.basicguaranty_list[this.indexNum], this[fdname]);
							} else if (this.queryType == 3) {
								Object.assign(requestParams.basicpayment_list[this.indexNum], this[fdname]);
							} else if (this.queryType == 4) {
								Object.assign(requestParams.basiccopartner_list[this.indexNum], this[fdname]);
							} else if (this.queryType == 5) {
								Object.assign(requestParams.basicbuss_list[this.indexNum], this[fdname]);
							}
						}
						var filedName = '';
						if (this.queryType == 4) {
							filedName = 'basicCollaboratoraddInfo';
						} else if (this.queryType == 3) {
							filedName = 'basicPayaddInfo';
						} else if (this.queryType == 1) {
							filedName = 'basicDebtoraddInfo';
						} else if (this.queryType == 2) {
							filedName = 'baseguarantoraddInfo';
						} else if (this.queryType == 5) {
							filedName = 'basicbusinessaddInfo';
							if (this.isAdd) {
								this.basicbusinessaddInfo.cus_name = this.$store.state.applicationInfo.cus_name;
								this.basicbusinessaddInfo.cus_id = this.$store.state.applicationInfo.cus_id;
							}
						}
						this[filedName] = JSON.parse(JSON.stringify(requestParams[filedName]));

						uni.navigateBack();
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		showData(filedName) {
			if (this.isChange || this.isDetail) {
				if (this.queryType == 'repay') {
					this.getReplayInfo();
					return;
				}
				if (this.queryType == 'inspect') {
					Object.assign(this.CreditInspectResult, requestParams.basicCreditInspectResult[this.indexNum]);
				}
				// "1 共借人
				// 2 担保人
				// 3 支付信息
				// 4 合作方信息
				// 5 经营实体
				// 0 其他    "
				if (this.queryType == 1) {
					Object.assign(this[filedName], requestParams.basicdebtor_list[this.indexNum]);
				} else if (this.queryType == 2) {
					Object.assign(this[filedName], requestParams.basicguaranty_list[this.indexNum]);
				} else if (this.queryType == 3) {
					Object.assign(this[filedName], requestParams.basicpayment_list[this.indexNum]);
					this.benifitaccbef = JSON.parse(JSON.stringify(requestParams.basicpayment_list[this.indexNum].benifit_acc));
				} else if (this.queryType == 4) {
					Object.assign(this[filedName], requestParams.basiccopartner_list[this.indexNum]);
				} else if (this.queryType == 5) {
					Object.assign(this[filedName], requestParams.basicbuss_list[this.indexNum]);
				}
				this.$forceUpdate();
			}
		},
		async toDiscernCert(itemtype, font = true) {
			var resolve = await getDiscernCert({ EngineType: 1 });
			console.log('返回信息', resolve);
			// 返回字段
			// bankcardclass: '借记卡',
			// bankname: '威海商业银行',
			// bankorganizecode: '04814650',
			// birthday: '',
			// cardname: '通达借记卡',
			// cardnum: '623102 0101009359636',
			// folk: '',
			// idc_pass_num: '',
			// idtype: 1
			if (resolve.res.cardnum) {
				//删除字符中的空格
				this.basicPayaddInfo.benifit_acc = resolve.res.cardnum.replace(/\s/g, '');
				//调00010000200000查帐户信息
				this.queryAccountInfo();
				this.$forceUpdate();
			} else {
				uni.showToast({
					title: '未识别到卡号',
					icon: 'none',
					duration: 1500
				});
			}
		},
		// 查帐户信息
		queryAccountInfo() {
			if (this.basicPayaddInfo.benifit_acc) {
				if (this.benifitaccbef != this.basicPayaddInfo.benifit_acc) {
					this.$request
						.post({
							url: 'es/json/EsAccountInformationQuery',
							data: {
								FUNC: '9', //功能
								ACCTNO: this.basicPayaddInfo.benifit_acc ? this.basicPayaddInfo.benifit_acc : '' //帐号
							}
						})
						.then(res => {
							if (res.response.header.returnCode == '00000000') {
								this.accAlerdayCheck = true;
								this.basicPayaddInfo.benifit_name = res.response.content['SA-CUST-NAME'];
								this.basicPayaddInfo.benifit_bank = res.response.content['SA-OPEN-BUSN-NAME'];
							} else {
								this.accAlerdayCheckMsg = res.response.header.returnMsg;
								uni.showToast({
									title: res.response.header.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						})
						.catch(err => {});
				}
			}
		},
		queryAccountInfoPromise() {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.$request
					.post({
						url: 'es/json/EsAccountInformationQuery',
						data: {
							FUNC: '9', //功能
							ACCTNO: _this.basicPayaddInfo.benifit_acc ? _this.basicPayaddInfo.benifit_acc : '' //帐号
						}
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000') {
							resolve(true);
						} else {
							uni.showToast({
								title: res.response.header.returnMsg,
								icon: 'none',
								duration: 1500
							});
							resolve(false);
						}
					})
					.catch(err => {});
			});
		},
		// 回显还款信息
		getReplayInfo() {
			Object.assign(this.basicRepayInfo, requestParams.basicRepayList[this.indexNum]);
			this.basicRepayInfo.send_flag = this.basicRepayInfo.send_flag ? this.basicRepayInfo.send_flag : '2';
			this.$forceUpdate();
		},
		//维护还款信息
		addReplayInfo(type) {
			// 0 新增     1 修改   2 删除
			this.$request
				.post({
					url: 'es/json/EsRepayMentInfoPlan',
					data: {
						serno: this.currentserno ? this.currentserno : '', //	流水号
						repaylist: [
							{
								AppFlag: type, //操作类型
								pk_value: type == 0 ? '' : this.basicRepayInfo.pk_value, //还款计划流水号
								repay_amt: this.basicRepayInfo.repay_amt ? this.basicRepayInfo.repay_amt : '', //	还款日
								repay_date: this.basicRepayInfo.repay_date ? this.basicRepayInfo.repay_date : '', //	金额
								send_flag: this.basicRepayInfo.send_flag ? this.basicRepayInfo.send_flag : '2'
							}
						]
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						if (this.isAdd) {
							this.$store.commit('setbasicInfos', { type: this.queryType });
						}
						requestParams.basicRepayListIsAdd = true;
						// this.$forceUpdate();
						if (type == 0) {
						} else if (type == 1) {
							Object.assign(requestParams.basicRepayList[this.indexNum], this.basicRepayInfo);
							if (this.queryType == 'repay') {
								this.basicRepayInfo = JSON.parse(JSON.stringify(requestParams.basicRepayInfo));
							}
							this.$forceUpdate();
						}
						uni.navigateBack({});
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		async toDoc(isBind) {
			if (this.CreditInspectResult.cus_name) {
				// 有客户信息进行下一步
				var resolve = await this.pdfCreate();
				if (resolve) {
					if (isBind) {
						// 是绑定按钮进入的成功后直接去往识别页面
						uni.navigateTo({
							url: '/pages/indetificationCust/indetificationCust?isbind=true&serno=' + this.currentserno
						});
					} else {
						// pdf合成成功去展示-影像的pdf展示
						uni.navigateTo({
							url: '/pages/indetificationCust/docPage?docType=1'
						});
					}
				}
			} else {
				uni.showToast({ title: '请先选择客户', icon: 'none' });
			}
		},
		pdfCreate() {
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: 'sqsPdf',
					data: '',
					success: function() {}
				});
				var params = {
					TemplateCode: 'dq001',
					IdCardNo: this.CreditInspectResult.cert_code,
					AttributeDatas: [
						{
							key: 'NAME',
							value: this.CreditInspectResult.cus_name ? this.CreditInspectResult.cus_name : '',
							type: 'text',
							tempLateIndex: 1
						}
					],
					isUploadImage: 'false', // 上传影像平台--授权书此时不上传影像平台
					ImageDatas: []
				};
				//生成pdf,
				this.$request
					.post({
						url: 'es/json/EsCreditCreatePDF',
						data: params
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content) {
							if (res.response.content.Pdf) {
								this.$store.commit('setpdfSqsInfo', res.response.content);
								uni.setStorage({
									key: 'sqsPdf',
									data: res.response.content.Pdf,
									success: function() {}
								});
								resolve(true);
							} else {
								if (res.response.content.resout) {
									uni.showToast({ title: res.response.content.resout, icon: 'none' });
								} else {
									uni.showToast({ title: '获取文档失败', icon: 'none' });
								}
								resolve(false);
							}
						} else {
							resolve(false);
						}
					})
					.catch(err => {
						resolve(false);
					});
			});
		},
		checkMoney() {
			// 还款总金额必须等于贷款金额
			var lists = JSON.parse(JSON.stringify(requestParams.basicRepayList));
			if (this.isChange) {
				lists.splice(this.indexNum, 1);
			}
			var sunm = 0;
			for (var i = 0; i < lists.length; i++) {
				var item = lists[i];
				sunm += item.repay_amt * 1;
			}
			if (sunm + this.basicRepayInfo.repay_amt * 1 > this.apply_amount) {
				uni.showToast({
					title: '还款总金额必须等于贷款金额',
					icon: 'none'
				});
				if (this.isChange) {
					this.basicRepayInfo.repay_amt = requestParams.basicRepayList[this.indexNum].repay_amt;
				} else {
					this.basicRepayInfo.repay_amt = '';
				}
				return false;
			}
		},
		getceSerno() {
			this.$store.commit('setcreReportInfo', this.CreditInspectResult);
			if (this.$store.state.pdfSqsInfo.Pdf) {
				uni.navigateTo({
					url: '/pages/indetificationCust/indetificationCust?isbind=true&serno=' + this.currentserno
				});
			} else {
				this.toDoc(true);
			}
		},
		getGamateCusId(typ, code) {
			var _this = this;
			//客户信息列表查询 --
			_this.$request
				.post({
					url: 'es/json/EsQueryCustInfoList',
					data: {
						cust_mgr_query: _this.$store.state.accountInfos.actorno, //	查询人客户经理号
						main_br_id_query: _this.$store.state.accountInfos.orgid, //	查询人机构号
						cust_mgr: '', //	主管客户经理号-不使用
						main_br_id: '', //	主管机构号-不使用
						cert_type: typ, //证件类型
						cert_code: code, //	证件号码  查询条件
						cus_id: '', //	客户号 -不使用
						cus_name: '', //	姓名  查询条件
						query_type: '99', //	查询类型  1 共借人客户  2 担保人  3 贷款人  4 经营实体 5 个人客户 99 代表全部客户
						cus_type: '', //	客户类型 查询条件
						cus_status: '', //	客户状态 查询条件
						start_count: '0', //	开始记录数
						count: '999999999' //	查询条数
					}
				})
				.then(res => {
					console.log('客户信息详情', res);
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						if (res.response.content.List.length && res.response.content.List[0].cus_id) {
							_this.basicbusinessaddInfo.cus_id = res.response.content.List[0].cus_id;
							_this.basicbusinessaddInfo.cus_name = res.response.content.List[0].cus_name;
						} else {
							_this.basicbusinessaddInfo.cus_id = '';
							_this.basicbusinessaddInfo.cus_name = '';
						}
						this.$forceUpdate();
					} else {
						uni.showToast({
							title: '客户信息不存在',
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		checkcopuseamt() {
			var flag = true;
			// 本次占用金额(cop_use_amt)<=金额（amount)-合作方占用金额(lmt_balance)
			var value = this.basicCollaboratoraddInfo.amount * 1 - this.basicCollaboratoraddInfo.lmt_balance * 1;
			if (value < this.basicCollaboratoraddInfo.cop_use_amt * 1) {
				uni.showToast({
					title: '本次占用金额不能大于' + value,
					icon: 'none',
					duration: 1500
				});
				flag = false;
			}
			return flag;
		},
		checkChange: function() {
			this.checkbox = !this.checkbox;
		},
		queryOtherInfoList(type, listName) {
			uni.setStorage({
				key: 'copartnerlistCount',
				data: []
			});
			this.$request
				.post({
					url: 'es/json/EsQueryAdditionalInfo',
					data: {
						serno: this.currentserno ? this.currentserno : '', //业务流水号
						Othertype: '4', //查询类型
						start_count: '1', //开始记录数
						count: '9999999' //查询条数
					}
				})
				.then(res => {
					var idlist = [];
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List && res.response.content.List.length > 0) {
							var listData = res.response.content.List;

							this.copartnerlistCount = listData;
							for (var i = 0; i < listData.length; i++) {
								if (this.isAdd) {
									idlist.push(listData[i].cop_cont_no);
								} else if (this.isChange) {
									if (this.basicCollaboratoraddInfo.cop_cont_no == listData[i].cop_cont_no) {
									} else {
										idlist.push(listData[i].cop_cont_no);
									}
								}
							}
						} else {
							this.copartnerlistCount = [];
						}
					} else {
						this.copartnerlistCount = [];
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
					uni.setStorage({
						key: 'copartnerlistCount',
						data: idlist
					});
				})
				.catch(err => {});
		},
		changeRequireStatus(arr, paramsName, filedName, eqvalue, falgName, eqFlag) {
			var itemarr = arr;
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				if (eqFlag == 'indexof') {
				} else {
					if (this.isChange || this.isQueryDetail) {
					} else {
						this[paramsName][itemarr[i].name] = '';
					}
				}
				indexArr.push(this.arrHasObj(this[paramsName + 'Required'], itemarr[i]));
				if (itemarr[i].replace === true) {
					itemarr[i].valid = false;
					this[paramsName + 'Required'][indexArr[i]] = itemarr[i];
				}
			}
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
					return true;
				}
			}
			for (var i = 0; i < indexArr.length; i++) {
				this[paramsName + 'Required'][indexArr[i]].valid = false;
			}
			if (falgName) this[falgName] = false;
			return false;
		},
		arrHasObj(arr, obj, replace) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == obj.name) {
					if (replace) arr[i] = obj;
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
		'basicPayaddInfo.is_loc': {
			handler(newv, oldv) {
				if ((this.isChange || this.isDetail) && oldv === '') {
					return;
				}
				var item = [{ name: 'etp_in_tx_typ', checkType: 'notnull', errorMsg: '请选择受托支付行内转账模式' }];
				this.changeRequireStatus(item, 'basicPayaddInfo', 'is_loc', 1);
				var item = [{ name: 'etp_out_tx_typ', checkType: 'notnull', errorMsg: '请选择受托支付行外转账模式' }];
				this.changeRequireStatus(item, 'basicPayaddInfo', 'is_loc', 2);
			}
		},
		'basicDebtoraddInfo.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.basicDebtoraddInfoRequired.length; i++) {
					var element = this.basicDebtoraddInfoRequired[i];
					if (element.name == 'cert_code') {
						if (this.basicDebtoraddInfo.cert_type == '10') {
							this.basicDebtoraddInfoRequired[i].checkType = 'certcode';
							this.basicDebtoraddInfoRequired[i].error = '身份证号码格式错误';
						} else {
							this.basicDebtoraddInfoRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		},
		'baseguarantoraddInfo.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.baseguarantoraddInfoRequired.length; i++) {
					var element = this.baseguarantoraddInfoRequired[i];
					if (element.name == 'cert_code') {
						if (this.baseguarantoraddInfo.cert_type == '10') {
							this.baseguarantoraddInfoRequired[i].checkType = 'certcode';
							this.baseguarantoraddInfoRequired[i].error = '身份证号码格式错误';
						} else {
							this.baseguarantoraddInfoRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		},
		'basicRepayInfo.repay_date': {
			handler(newv, oldv) {
				if ((this.isChange || this.isQueryDetail) && oldv == '') {
					return;
				}
				var cudate = new Date().Format('yyyy-MM-dd');
				if (newv === '') {
					return;
				}
				if (newv < cudate) {
					uni.showToast({
						title: '还款日期不能小于当前日期',
						icon: 'none'
					});
					this.basicRepayInfo.repay_date = '';
				} else if (newv > this.repayend_date && this.repayend_date !== '') {
					// 还款计划录入准则：同一还款日不能录入多条，还款日期不能大于到期日
					uni.showToast({
						title: '还款日期不能大于到期日[' + (this.repayend_date ? this.repayend_date : '-') + ']',
						icon: 'none'
					});
					this.basicRepayInfo.repay_date = '';
					this.$forceUpdate();
				} else {
					var lists = JSON.parse(JSON.stringify(requestParams.basicRepayList));
					if (this.isChange) {
						lists.splice(this.indexNum, 1);
					}
					for (var i = 0; i < lists.length; i++) {
						var item = lists[i];
						if (item.repay_date == newv) {
							uni.showToast({
								title: '同一还款日不能录入多条',
								icon: 'none'
							});
							this.basicRepayInfo.repay_date = '';
							this.$forceUpdate();
							break;
						}
					}
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
	width: 50%;
}
.uni-column .minHeight1.width40 {
	width: 40%;
	text-align: justify;
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
.mc-min-btn-primary.classBind {
	margin: auto;
	padding: 0 18rpx;
	font-size: 24rpx;
	height: 50rpx;
	line-height: 50rpx;
	margin-left: 20rpx;
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
