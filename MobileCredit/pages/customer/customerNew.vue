<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<tabbars tposition="top" :titleBottomLine="true" :swduration="120" style="height: 100%;" @getCurrent="currentTabIndexMain = $event"
		 ref="tabs" :onBeforeSwitch1="onBeforeSwitch1" :onBeforeSwitch="onBeforeSwitch" @getIsorigin="getIsorigin = $event"
		 @getnid="mainShow.push($event)">
			<!-- 临时客户选项 -->
			<!-- indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置 -->
			<swiper-item label="临时客户信息" nid="lskhxx" v-if="custType == 1">

				<!-- mainShow这个变量中 "lskhxx"这个字符串出现的位置,
				如果mainShow中存在"lskhxx"则成立 -->
				<view class="w100" v-if="mainShow.indexOf('lskhxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">姓名</view>
							<input v-model="temporary.cus_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入姓名" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件类型</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail || isChangeFrom || saved" v-model="temporary.cert_type"
							 :data="selectdata.cert_type"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件号码</view>
							<input @blur="getGamateCusId(temporary.cert_type, temporary.cert_code, 'jiaoyan', 'temporary')" v-model="temporary.cert_code"
							 :disabled="isQueryDetail || isChangeFrom || saved" type="text" class="uni-input" value="" maxlength="18" placeholder="请输入证件号码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">性别</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="temporary.indiv_sex" :data="selectdata.indiv_sex"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">出生日期</view>
							<mc-picker-select class="uni-input" :clearable="true" :disabled="isQueryDetail" mode="date" v-model="temporary.indiv_dt_of_birth"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">国别</view>
							<mc-picker-select :disabled="isQueryDetail" class="uni-input" mode="selector" v-model="temporary.indiv_country"
							 range-key="label" :range="selectdata.indiv_country"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">通讯地址</view>
							<textarea class="autoHeightArea" auto-height v-model="temporary.post_addr" :disabled="isQueryDetail" maxlength="80"
							 placeholder="请输入通讯地址" />
							</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">邮政编码</view>
							<input v-model="temporary.post_code" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入邮政编码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">手机号码</view>
							<input v-model="temporary.mobile" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入手机号码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">更新日期</view>
							<mc-picker-select class="uni-input" :disabled="true" mode="date" v-model="temporary.last_upd_date"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">登记日期</view>
							<mc-picker-select :disabled="true" class="uni-input" mode="date" v-model="temporary.input_date"></mc-picker-select>
						</view>
					</view>
					<!-- <button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'temporary')">保存</button> -->
				</view>
			</swiper-item>
			
			<!-- 正式客户选项 -->
			<swiper-item label="客户基本信息" nid="yhjbxx" v-if="custType != 1">
				<view class="w100" v-if="mainShow.indexOf('yhjbxx') != -1">
					<view class="mianRadius mcform">
						<!-- <view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">客户类型</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="userBaseInfo.cus_type" :data="selectdata.cus_type"></mc-pop-select>
						</view> -->
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">姓名</view>
							<input v-model="userBaseInfo.cus_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入姓名" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">性别</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isQueryDetail"
								v-model="userBaseInfo.indiv_sex"
								:data="selectdata.indiv_sex"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件类型</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isChangeFrom || isQueryDetail || saved"
								v-model="userBaseInfo.cert_type"
								:data="selectdata.cert_type"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件号码</view>
							<input
								v-model="userBaseInfo.cert_code"
								:disabled="isChangeFrom || isQueryDetail || saved"
								maxlength="18"
								type="text"
								class="uni-input"
								value=""
								placeholder="请输入证件号码"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">国别</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="userBaseInfo.indiv_country"
								range-key="label"
								:range="selectdata.indiv_country"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">民族</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="userBaseInfo.indiv_ntn"
								range-key="label"
								:range="selectdata.indiv_ntn"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">出生日期</view>
							<mc-picker-select
								class="uni-input"
								:disabled="isQueryDetail"
								mode="date"
								v-model="userBaseInfo.indiv_dt_of_birth"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">户籍地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="userBaseInfo.indiv_houh_reg_add"
								:disabled="isQueryDetail"
								maxlength="200"
								placeholder="请输入户籍地址"
							/>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">现住地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="userBaseInfo.now_address"
								:disabled="isQueryDetail"
								maxlength="200"
								placeholder="请输入现住地址"
							/>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="" style="display: flex; justify-content: space-between;">
								<view class="title requireIcon">证件是否长期有效</view>
							</view>
							<mc-radio-group v-model="userBaseInfo.long_flag" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<!-- <view v-if="individexpdtreq" class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title" :class="{ requireIcon: individexpdtreq }">证件到期日</view>
							<mc-picker-select
								class="uni-input"
								:clearable="individexpdtreq == false"
								:disabled="isQueryDetail"
								mode="date"
								v-model="userBaseInfo.indiv_id_exp_dt"
							></mc-picker-select>
						</view> -->
						<!-- <view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否新客户</view>
							<mc-radio-group v-model="userBaseInfo.new_cus" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view> -->
					</view>
					<!-- <button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'userBaseInfo')">保存</button> -->
				</view>
			</swiper-item>
			
			<swiper-item label="联系信息" nid="lxxx" v-if="custType != 1">
				<view class="w100" v-if="mainShow.indexOf('lxxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">是否与现住地址相同</view>
							<mc-radio-group v-model="relationInfo.same_curadd_flg" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">通讯地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="relationInfo.post_addr"
								:disabled="isQueryDetail || relationInfo.same_curadd_flg == 1"
								maxlength="80"
								placeholder="请输入通讯地址"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">邮政编码</view>
							<input v-model="relationInfo.post_code" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入邮政编码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域名称</view>
							<mc-picker-select
								mode="area"
								:disabled="isQueryDetail"
								v-model="relationInfo.area_code"
								@getName="relationInfo.area_name = $event"
								class="uni-input"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域编号</view>
							<input disabled v-model="relationInfo.area_code" type="text" class="uni-input" value="" placeholder="请输入区域编号" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">手机号码</view>
							<input v-model="relationInfo.mobile" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入手机号码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">备用手机号</view>
							<input v-model="relationInfo.mobile2" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入备用手机号" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">短信通知号</view>
							<input v-model="relationInfo.phone" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入短信通知号" />
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">Email地址</view>
							<input v-model="relationInfo.email" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入Email地址" />
						</view>
					</view>
					<!-- <button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'relationInfo')">保存</button> -->
				</view>
			</swiper-item>
			
			<!-- <swiper-item label="其他" nid="qita" v-if="custType != 1">
				<view class="uni-form-item uni-column nopb bottomGap">
					<view class="title">备注信息：</view>
					<textarea class="beizhu" :disabled="isQueryDetail" maxlength="200"
					 placeholder=" 请输入(限200字以内)" />
				</view>
				<button type="" class="beizhuSave" :disabled="isQueryDetail" @click="infoSubmit(true, 'temporary')">保存</button>
			</swiper-item> -->
		</tabbars>
	</view>
</template>

<script>
// import { Camera, getDiscernCert } from '@/common/Mobile/MobileUtils.js';
import { citydatas } from '@/common/cityDatas.js';
import { selectdata } from '../customerMg/select.js';
import { requestParams } from '../customerMg/requestParams.js';
var cityFormat = [];
var onlyNum = 0;
export default {
	data() {
		return {
			selectdata: selectdata,
			originparamsAll: {}, //修改时的原数据
			paramsAll: JSON.parse(JSON.stringify(requestParams.paramsAll)),
			paramsAllRequired: JSON.parse(JSON.stringify(requestParams.paramsAllRequired)),
			accountInfo: {},
			temporary: JSON.parse(JSON.stringify(requestParams.temporary)), //临时客户参数
			temporaryRequired: JSON.parse(JSON.stringify(requestParams.temporaryRequired)), //临时客户必填项
			userBaseInfo: JSON.parse(JSON.stringify(requestParams.userBaseInfo)), // 客户基本信息
			userBaseInfoRequired: JSON.parse(JSON.stringify(requestParams.userBaseInfoRequired)), // 客户基本信息必填项
			// indivInfo: JSON.parse(JSON.stringify(requestParams.indivInfo)), //个人基本信息
			relationInfo: JSON.parse(JSON.stringify(requestParams.relationInfo)), //联系信息
			relationInfoRequired: JSON.parse(JSON.stringify(requestParams.relationInfoRequired)), //联系信息必填项
			// otherInfo: JSON.parse(JSON.stringify(requestParams.otherInfo)), //其他信息必填项
			// otherInfoRequired: JSON.parse(JSON.stringify(requestParams.otherInfoRequired)), //其他信息必填项
			// farmingfarmcoop: false, //是否农户的必输
			individexpdtreq: false, //证件到期日的必填项
			currentTabIndexMain: 0, // tab的index
			mainShow: [], // tab的显隐情况
			// currentcustno: '', //当前客户号
			// transCUSTNO: '', // 修改时得到核心客户号
			isChange: '', //是否是修改
			custStatus: '', //修改时的客户状态
			// custType: '', // 客户类型的区分
			saved: false, // 第一次新增后的标志
			isChangeFrom: false, //是否从列表的修改按钮过来
			queryListFrom: false, //从查询列表过来
			isQueryDetail: false, //从查询列表的查看过来
			isVaildOldCust: false, //新增校验是否是老客户
			isDateDiscernCert: false, //是否是识别到期日
			onBeforeSwitch: true, // 是否可以切换的标志
			getIsorigin: false //是否是不允许切换返回的标志
		};
	},

	onLoad: function(option) {
		// custType 1临时  2 正式
		// var option = JSON.parse(option);
		this.custType = option.custType;
		this.isChange = option.isChange ? JSON.parse(option.isChange) : false;
		this.queryListFrom = option.isquery ? JSON.parse(option.isquery) : false;
		this.isQueryDetail = option.isQueryDetail ? JSON.parse(option.isQueryDetail) : false;
		this.custStatus = option.custStatus;
		// 如果客户状态为正式(20)，便把客户存为正式客户，类型为2（customerInsert.vue中）
		if (this.custStatus == '20') {
			this.custType = 2;
			// 否则将客户存为临时客户
		} else if (this.custStatus == '01') {
			this.custType = 1;
		} 
		if (this.custType == 1) {
			this.mainShow = ['lskhxx'];
		} else {
			this.mainShow = ['yhjbxx'];
		}
		// this.currentcustno = option.cusId; // 客户编号
		if (this.isChange) {
			// 从新增列表的修改按钮过来
			this.isChangeFrom = true;
		}
		if (this.isChange) {
			uni.setNavigationBarTitle({
				title: '修改客户'
			});
		} else if (this.isQueryDetail) {
			uni.setNavigationBarTitle({
				title: '客户详情'
			});
		}
		this.$forceUpdate();
	},
	onBackPress() {
		this.$store.commit('delmanagerSelect');
	},
	onNavigationBarButtonTap(e) {
		console.log('点击提交');
		this.infoSubmit(false, '');
	},
	mounted() {
		if (this.isQueryDetail == true) {
			// 隐藏提交按钮
			var rightbtn = document.querySelector('body.pages-customerMg-customerAdd uni-page-head .uni-page-head-ft');
			rightbtn.style.display = 'none';
		}
		// requestParams.paramsAllAssList = [];
		requestParams.paramsAllSave = {};
		// this.ass_list = [];
		this.accountInfo = this.$store.state.accountInfos;
		// 不是修改的时候赋值
		if (!this.isChange) {
			// this.paramsAll.cust_mgr = this.accountInfo.actorno;
			// this.paramsAll.main_br_id = this.accountInfo.orgid;
		}
		if (this.custType == 1 && !this.isChange && !this.isQueryDetail) {
			//新增赋值
			this.temporary.last_upd_date = new Date().Format('yyyy-MM-dd');
			this.temporary.input_date = new Date().Format('yyyy-MM-dd');
			// this.temporary.last_upd_id = this.accountInfo.actorno;
		}
		if (this.isChange || this.isQueryDetail) {
			this.queryData();
		}
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		onBeforeSwitch1() {
			return new Promise((resolve, reject) => {
				var _this = this;
				setTimeout(function() {
					resolve(_this.onBeforeSwitch);
				});
			});
		},
		// async infoSubmit(save, tab, isTabS = false) {
		async infoSubmit(tab, isTabS = false) {
			if (this.isQueryDetail) {
				return;
			}
			this.onBeforeSwitch = true;
			if (this.isChange) {
				var flag = false;
				if (!flag) {
					if (isTabS == false) {
						uni.showToast({
							title: '未进行任何修改',
							icon: 'none',
							duration: 1500
						});
					}
					return;
				}
			}
			// 查询是否是老客户，如果是则提示已存在
			if (this.isVaildOldCust) {
				uni.showToast({
					title: '该证件号码已存在',
					icon: 'none',
					duration: 1500
				});
				this.onBeforeSwitch = false;
				return;
			}
			// 保存页面的提交按照 草稿存储，提交页面按照正常
			var Statussave = true;
			if(this.isChange || this.isQueryDetail){
				Statussave = false;
			}
			this.paramsAll.cus_status = this.getCustStatus(Statussave);
			if (this.isChange || this.saved) this.paramsAll.AppFlag = '1';
			if (this.isChange && this.custStatus) {
				this.paramsAll.cus_status = this.custStatus;
				// this.paramsAll.cus_id = this.currentcustno;
			} else { (this.isChange || this.saved) }
				
			// this.paramsAll.SaveFlag = '1';
			// if (save) {
			// 	this.paramsAll.SaveFlag = '0';
			// 	var rule = [];
			// 	var formData = {};
			// 	//保存必填项---四项
			// 	if (this.custType == 1) {
			// 		formData = this.temporary;
			// 		for (var i = 0; i < this.temporaryRequired.length; i++) {
			// 			if (this.temporaryRequired[i].save) {
			// 				rule.push(this.temporaryRequired[i]);
			// 			}
			// 		}
			// 		var checkRes = this.$graceChecker.check(formData, rule);
			// 		if (!checkRes) {
			// 			uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
			// 			return;
			// 		}
			// 		// 保存时不必填但是填上时有校验
			// 		var saveCheck = [];
			// 		for (var i = 0; i < this.temporaryRequired.length; i++) {
			// 			var item = JSON.parse(JSON.stringify(this.temporaryRequired[i]));
			// 			if (item.valid !== false) {
			// 				item.notrequire = true;
			// 				saveCheck.push(item);
			// 			}
			// 		}
			// 		if (!this.$graceChecker.check(formData, saveCheck)) {
			// 			uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
			// 			return;
			// 		}
			// 		// 用于对象的合并，将源对象（temporary）的所有可枚举属性，复制到目标对象（paramsAll）
			// 		Object.assign(this.paramsAll, this.temporary);
			// 	} else {
			// 		formData = this.userBaseInfo;
			// 		// formData1 = this.userBaseInfo;
			// 		for (var i = 0; i < this.userBaseInfoRequired.length; i++) {
			// 			if (this.userBaseInfoRequired[i].save) {
			// 				rule.push(this.userBaseInfoRequired[i]);
			// 			}
			// 		}
			// 		var checkRes = this.$graceChecker.check(formData, rule);
			// 		if (!checkRes) {
			// 			uni.showToast({ title: '客户基本信息：' + this.$graceChecker.error, icon: 'none' });
			// 			this.onBeforeSwitch = false;
			// 			return;
			// 		}
			// 		/* if (tab != 'ass_list') {
			// 			// 保存时不必填但是填上时有校验
			// 			var saveCheck = [];
			// 			for (var i = 0; i < this[tab + 'Required'].length; i++) {
			// 				var item = JSON.parse(JSON.stringify(this[tab + 'Required'][i]));
			// 				if (item.valid !== false) {
			// 					item.notrequire = true;
			// 					saveCheck.push(item);
			// 				}
			// 			}
			// 			if (!this.$graceChecker.check(this[tab], saveCheck)) {
			// 				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
			// 				return;
			// 			}
			// 			Object.assign(this.paramsAll, this[tab]);
			// 		} else {
			// 			Object.assign(this.paramsAll.ass_list, this[tab]);
			// 		} */
			// 		Object.assign(this.paramsAll, this.userBaseInfo);
			// 	}
			// 	// 填充上数据
			// 	if (this.paramsAll.ass_list.length == 0) {
			// 		Object.assign(this.paramsAll.ass_list, this.setRequrieAssListData);
			// 	}
			// }
			 
				var rule = [];
				var formData = {};
				if (this.custType == 1) {
					Object.assign(this.paramsAll, this.temporary);
					formData = this.temporary;
					rule = this.getRule(this.temporaryRequired);
					var checkRes = this.$graceChecker.check(formData, rule);
					if (!checkRes) {
						uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
						return;
					}
				} else {
					Object.assign(this.paramsAll, this.userBaseInfo);
					// Object.assign(this.paramsAll, this.indivInfo);
					// Object.assign(this.paramsAll, this.maritalStatus);
					Object.assign(this.paramsAll, this.relationInfo);
					// Object.assign(this.paramsAll, this.companyInfo);
					// Object.assign(this.paramsAll, this.financialAssets);
					// Object.assign(this.paramsAll, this.otherInfo);
					// Object.assign(this.paramsAll.ass_list, this.ass_list);
					/* if (this.userBaseInfo.cus_type != '110') {
						Object.assign(this.paramsAll, this.businessInfo);
					} else {
						var businessInfo = {};
						for (var keys in this.businessInfo) {
							if (this.businessInfo.hasOwnProperty(keys)) {
								businessInfo[keys] = '';
							}
						}
						Object.assign(this.paramsAll, businessInfo);
					} */
					formData = this.paramsAll;
					rule = this.getRule(this.paramsAllRequired);
					var listss = [
						{ value: 'userBaseInfoRequired', label: '我行基本信息' },
						// { value: 'indivInfoRequired', label: '个人基本信息' },
						// { value: 'maritalStatusRequired', label: '婚姻状况' },
						{ value: 'relationInfoRequired', label: '联系信息' },
						// { value: 'companyInfoRequired', label: '单位信息' },
						// { value: 'financialAssetsRequired', label: '财务信息' },
						// { value: 'otherInfoRequired', label: '其他信息' }
					];
					/* if (this.userBaseInfo.cus_type != '110') {
						listss = [
							{ value: 'userBaseInfoRequired', label: '客户基本信息' },
							// { value: 'businessInfoRequired', label: '经营情况' },
							// { value: 'indivInfoRequired', label: '个人基本信息' },
							// { value: 'maritalStatusRequired', label: '婚姻状况' },
							{ value: 'relationInfoRequired', label: '联系信息' },
							// { value: 'companyInfoRequired', label: '单位信息' },
							// { value: 'financialAssetsRequired', label: '财务信息' },
							{ value: 'otherInfoRequired', label: '其他' }
						];
					} */
					for (var i = 0; i < listss.length; i++) {
						rule = this.getRule(this[listss[i].value]);
						var checkRes = this.$graceChecker.check(formData, rule);
						if (!checkRes) {
							uni.showModal({
								content: listss[i].label + ': ' + this.$graceChecker.error,
								showCancel: false,
								success: e => {
									if (e.confirm) {
									}
								}
							});
							return;
						}
					}
					/* if (this.custType == 2 && this.ass_list.length == 0) {
						uni.showModal({
							content: '家庭资产不能为空',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
						return;
					} */
				}
				// 填充上数据
				/* if (this.paramsAll.ass_list.length == 0) {
					Object.assign(this.paramsAll.ass_list, this.setRequrieAssListData);
				} */
			

			if (!this.isChange) {
				// 新增赋值
				// 将 Date 转化为指定格式的String
				this.paramsAll.last_upd_date = new Date().Format('yyyy-MM-dd');
				this.paramsAll.input_date = this.paramsAll.input_date ? this.paramsAll.input_date : new Date().Format('yyyy-MM-dd');
				// this.paramsAll.last_upd_id = this.accountInfo.actorno;
			} else if (this.isChange) {
				this.paramsAll.last_upd_date = new Date().Format('yyyy-MM-dd');
			}
			// if (this.custType != 1) {
				// this.paramsAll.com_hold_stk_amt = this.paramsAll.com_hold_stk_amt !== '' ? (this.paramsAll.com_hold_stk_amt * 1).toFixed(2).toString() : '';
				// this.paramsAll.debt_amt = this.paramsAll.debt_amt !== '' ? (this.paramsAll.debt_amt * 1).toFixed(2).toString() : '';
				// this.paramsAll.familymonthincome = this.paramsAll.familymonthincome !== '' ? (this.paramsAll.familymonthincome * 1).toFixed(6).toString() : '';
				// this.paramsAll.fixed = this.paramsAll.fixed !== '' ? (this.paramsAll.fixed * 1).toFixed(2).toString() : '';
				// this.paramsAll.indiv_ann_mouth = this.paramsAll.indiv_ann_mouth !== '' ? (this.paramsAll.indiv_ann_mouth * 1).toFixed(2).toString() : '';
				// this.paramsAll.indiv_dept_rate = this.paramsAll.indiv_dept_rate !== '' ? (this.paramsAll.indiv_dept_rate * 1).toFixed(2).toString() : '';
				// this.paramsAll.indiv_sps_out = this.paramsAll.indiv_sps_out !== '' ? (this.paramsAll.indiv_sps_out * 1).toFixed(2).toString() : '';
				// this.paramsAll.liquidity = this.paramsAll.liquidity !== '' ? (this.paramsAll.liquidity * 1).toFixed(2).toString() : '';
				// this.paramsAll.on_debt_payments = this.paramsAll.on_debt_payments !== '' ? (this.paramsAll.on_debt_payments * 1).toFixed(2).toString() : '';
				// this.paramsAll.yearlamt = this.paramsAll.yearlamt !== '' ? (this.paramsAll.yearlamt * 1).toFixed(2).toString() : '';
			// }

			//提交修改时时，担保、正式客户、临时客户 客户号必输
			/* if (this.paramsAll.AppFlag == 1 && this.custStatus && (this.custStatus == '20' || this.custStatus == '01')) {
				if (this.paramsAll.cus_id == '') {
					var a = await this.getGamateCusId(this.paramsAll.cert_type, this.paramsAll.cert_code);
				}
			} */

			// 正式客户新增时 ，正式客户保存时和正式客户修改时核心客户号必传
			/* if (this.custType == 2 || ((this.isChange == true || this.saved == true) && this.custStatus && this.custStatus == '20')) {
				//如果客户号已经查回来了就不再查
				if (this.transCUSTNO) {
					this.paramsAll.trans_cus_id = this.transCUSTNO;
				} else {
					this.onBeforeSwitch = false;
					var s = await this.getId();
					if (s === '') {
						this.onBeforeSwitch = false;
					} else {
						this.onBeforeSwitch = true;
						this.transCUSTNO = s;
						this.paramsAll.trans_cus_id = s;
					}
				}
			} */
			/* if (save) {
				this.submitRequest(this.paramsAll, save, isTabS);
			} else { */
				uni.showModal({
					content: '是否确认提交？',
					success: e => {
						if (e.confirm) {
							// this.submitRequest(this.paramsAll, save, isTabS);
							this.submitRequest(this.paramsAll,isTabS);
						}
					},
					fail: () => {}
				});
			// }
		},
		submitRequest(data,isTabS) {
			this.$request
				.post({
					url: 'web/user/insert',
					data: data
				})
				.then(res => {
					console.log('提交结果', res);
					if (res.response.header.returnCode == '00000000') {
						// this.currentcustno = res.response.content.cus_id;
						requestParams.paramsAllSave = JSON.parse(JSON.stringify(this.paramsAll));
						requestParams.paramsAllSave.AppFlag = '1';
						// requestParams.paramsAllSave.cus_id = res.response.content.cus_id;
						// 修改时cus_id必传
						/* if (save) {
							this.paramsAll.cus_id = res.response.content.cus_id;
							this.saved = true;
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 1500
							});
							return;
						} */
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=true&custOper=' + (this.isChange ? 2 : 1) + '&check=true'
						});
					} else {
						/* if (save) {
							uni.showToast({
								title: res.response.header.returnMsg,
								icon: 'none',
								duration: 1500
							});
							return;
						} */
						this.$store.commit('delmanagerSelect');
						uni.showModal({
							content: res.response.header.returnMsg,
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
					}
				})
				.catch(err => {});
		},
		queryData() {
			// 客户查询 -- 传列表中返回的客户号即可
			this.$request
				.post({
					url: 'es/json/EsQueryCustInfomation',
					data: {
						// cus_id: this.currentcustno ? this.currentcustno : '', //	客户号
						cert_type: '', //	证件类型
						cert_code: '' //	证件号码
					}
				})
				.then(res => {
					console.log('客户信息详情', res);
					if (res.response.header.returnCode == '00000000') {
						// Object.assign(res.response.content);
						var content = res.response.content;
						// this.transCUSTNO = content.trans_cus_id;
						if (this.custType == 1) {
							var lists = ['paramsAll', 'temporary'];
							for (var i = 0; i < lists.length; i++) {
								for (let key in this[lists[i]]) {
									if (content.hasOwnProperty(key)) {
										this[lists[i]][key] = content[key];
									}
								}
							}
							this.originparamsAll = JSON.parse(JSON.stringify(this.paramsAll));
						} else {
							var lists = [
								'paramsAll',
								'userBaseInfo',
								// 'businessInfo',
								// 'indivInfo',
								// 'maritalStatus',
								'relationInfo',
								// 'companyInfo',
								// 'financialAssets',
								// 'otherInfo'
							];
						}
						this.$forceUpdate();
					}
				})
				.catch(err => {});
		},
		getGamateCusId(typ, code, filedName, fname) {
			if (typ == '10') {
				var checkRes = this.$graceChecker.iscertcode(code);
				if (!checkRes) {
					uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
					this.isVaildOldCust = false;
					return;
				}
			}
			if (filedName == 'jiaoyan') {
				this.isVaildOldCust = false;
				if (typ !== '' && code !== '') {
					//证件类型和证件号码都不为空继续发送请求
				} else {
					return;
				}
			}
		},
		
		getSex(name, value) {
			for (var i = 0; i < this.selectdata.indiv_sex.length; i++) {
				var item = this.selectdata.indiv_sex[i];
				if (item.label.indexOf(name) != -1) {
					return item.value;
				}
			}
		},
		getNtn(name, value) {
			for (var i = 0; i < this.selectdata.indiv_ntn.length; i++) {
				var item = this.selectdata.indiv_ntn[i];
				if (item.label.indexOf(name) != -1) {
					return item.value;
				}
			}
		},
		getindiv_ass_type(value) {
			for (var i = 0; i < this.selectdata.indiv_ass_type.length; i++) {
				var item = this.selectdata.indiv_ass_type[i];
				if (item.value == value) {
					return item.label;
				}
			}
		},
		getcom_ass_status(value) {
			for (var i = 0; i < this.selectdata.com_ass_status.length; i++) {
				var item = this.selectdata.com_ass_status[i];
				if (item.value == value) {
					return item.label;
				}
			}
		},
		changeRequireStatus(arr, paramsName, filedName, eqvalue, falgName, eqFlag) {
			/*
			//以requestParams.js中的为主，在页面中判断该条件是否需要验证，valid：false为不需要，可以条件显示和隐藏。
			arr中的replace表示替换掉js中的项
			notrequire:为true无值的时候不验证，有值的时候验证
			*/
			var itemarr = arr;
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				
				if (eqFlag == 'indexof') {
				} else {
					if (this.isChange || this.isQueryDetail || (this.isDateDiscernCert && paramsName == 'userBaseInfo')) {
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
		},
		// checkRequire(require = [], data, save = false, tabname = '') {
		checkRequire(require = [], data, tabname = '') {
			for (var i = 0; i < require.length; i++) {
				/* if (save) {
					if (data[require[i].value] == '' && require[i].save) {
						uni.showToast({
							title: tabname + '有必填项为空',
							icon: 'none',
							duration: 1500
						});
						return true;
					}
				} else { */
					if (data[require[i].value] == '') {
						uni.showToast({
							title: tabname + '有必填项为空',
							icon: 'none',
							duration: 1500
						});
						return true;
					}
				// }
			}
			return false;
		},
		getCustStatus() {
			// 提交时传： 01临时客户 05担保客户 20正式客户   保存时传： 00 草稿客户(正式)  01 临时客户  02 草稿客户(担保)
			//  00 草稿客户(正式)  02 草稿客户(担保) 转为 05担保客户 20正式客户  时 appFlag 为1 状态不变
			// custType 1临时  2 正式  3 担保
			/* if (save) {
				switch (this.custType) {
					case '1':
						return '01';
						break;
					case '2':
						return '00';
						break;
					
					default:
						return '';
						break;
				}
			} else { */
				switch (this.custType) {
					case '1':
						return '01';
						break;
					case '2':
						return '20';
						break;
					
					default:
						return '';
						break;
				// }
			}
		},
		getId() {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.$request
					.post({
						url: 'es/json/EsCustInfo2',
						data: {
							SYSNO: '', //	外部系统编号
							CUSTNO: '', //	客户编号 _this.data['CUST-NO]
							CERTYP: _this.certype(_this.paramsAll.cert_type), //	证件类型
							CERNO: _this.paramsAll.cert_code, //	证件号码
							FULLNAM: _this.paramsAll.cus_name //	客户全称
						}
					})
					.then(data => {
						if (data.response.header.returnCode == '00000000' && data.response.content) {
							var data = data.response.content;
							resolve(data['CUST-NO']);
						} else {
							resolve('');
						}
					})
					.catch(err => {
						resolve('');
					});
			});
		},
		transformIdentityCard(value) {
			var birthday = '';
			var sex = '';
			// sex 0未知  1男  2女
			if (value.length === 15) {
				birthday = `19${value.substr(6, 2)}-${value.substr(8, 2)}-${value.substr(10, 2)}`;
				sex = value.substr(14, 1) % 2 || 2;
			}
			if (value.length === 18) {
				birthday = `${value.substr(6, 4)}-${value.substr(10, 2)}-${value.substr(12, 2)}`;
				sex = value.substr(16, 1) % 2 || 2;
			}
			return {
				birthday: birthday,
				sex: sex
			};
		},
		/* certype(type) {
			switch (type) {
				case '10':
					return 'A';
					break;
				case '11':
					return 'M';
					break;
				case '12':
					return 'J';
					break;
				case '13':
					return 'B';
					break;
				case '14':
					return 'E';
					break;
				case '15':
					return 'G';
					break;
				case '16':
					return 'H';
					break;
				case '17':
					return '3';
					break;
				case '18':
					return '4';
					break;
				case '19':
					return 'D';
					break;
				case '1X':
					return 'N';
					break;
				case '20':
					return 'P';
					break;
				case '21':
					return 'U';
					break;
				case '22':
					return 'R';
					break;
				case '23':
					return '2';
					break;
				case '24':
					return 'F';
					break;
				case '25':
					return 'Q';
					break;
				case '26':
					return 'T';
					break;
				case '27':
					return 'V';
					break;
				case '28':
					return 'W';
					break;
				case '29':
					return 'X';
					break;
				case '30':
					return 'Y';
					break;
			}
		}, */
		arrHasObj(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == obj.name) {
					return i;
					break;
				}
			}
			return -1;
		}
	},
	watch: {
		// 第一部分未完成其它选项不可选
		/* currentTabIndexMain(newv, oldv) {
			console.log('当前tabindex', newv, oldv);
			if (this.getIsorigin) {
				return;
			}
			var lists = [
				{ index: 0, value: 'userBaseInfo' },
				// { index: 1, value: 'businessInfo' },
				{ index: 2, value: 'indivInfo' },
				// { index: 3, value: 'maritalStatus' },
				{ index: 4, value: 'relationInfo' },
				{ index: 5, value: 'companyInfo' },
				// { index: 6, value: 'financialAssets' },
				// { index: 7, value: 'ass_list' },
				{ index: 8, value: 'otherInfo' }
			];
			if (this.custType == 3) {
				lists.splice(7, 1);
				lists[7].index = 7;
			}
			if (newv == 7) {
				this.queryAssList();
			}
			if (oldv == 7) {
			} else {
				for (var i = 0; i < lists.length; i++) {
					if (lists[i].index == oldv) {
						this.infoSubmit(true, lists[i].value, true);
					}
				}
			}
		}, */
		/* 'userBaseInfo.cus_type': {
			handler(newv, oldv) {
				if (this.userBaseInfo.cus_type == '110') {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'none';
					});
				} else {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'inline-block';
					});
				}
				var item = { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' };
				var index = this.arrHasObj(this.businessInfoRequired, item);
				if (this.userBaseInfo.cus_type == '150' && this.businessInfo.reg_flag == 1 && this.businessInfo.ins_code_flag == 1) {
					if (index == -1) {
						this.businessInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.businessInfoRequired[index].valid = false;
				}
				return false;
			}
		}, */
		/* 'businessInfo.reg_flag': {
			handler(newv, oldv) {
				var itemarr = [
					// { name: 'reg_code', checkType: 'notnull', errorMsg: '请输入登记注册号' },
					// { name: 'word_name', checkType: 'notnull', errorMsg: '请输入单位名称' },
					// { name: 'reg_org', checkType: 'notnull', errorMsg: '请输入发证机关' },
					// { name: 'reg_type', checkType: 'notnull', errorMsg: '请选择组成形式' },
					// { name: 'oper_place', checkType: 'notnull', errorMsg: '请输入经营场所' },
					// { name: 'oper_range_way', checkType: 'notnull', errorMsg: '请输入经营范围及方式' },
					// { name: 'reg_start_date', checkType: 'notnull', errorMsg: '请选择营业执照起始日' },
					// { name: 'reg_end_date', checkType: 'notnull', errorMsg: '请选择营业执照到期日' },
					// { name: 'ins_code_flag', checkType: 'notnull', errorMsg: '请选择是否有组织机构代码' }
					// { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' }
				];
				this.changeRequireStatus(itemarr, 'businessInfo', 'reg_flag', 1, 'regcodeRequire');
				var item = { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' };
				var index = this.arrHasObj(this.businessInfoRequired, item);
				if (this.userBaseInfo.cus_type == '150' && this.businessInfo.reg_flag == 1 && this.businessInfo.ins_code_flag == 1) {
					if (index == -1) {
						this.businessInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.businessInfoRequired[index].valid = false;
				}
				return false;
			}
		}, */
		
		/* 'userBaseInfo.agri_flg': {
			handler(newv, oldv) {
				var itemarr = [
					// { name: 'is_farming', checkType: 'notnull', errorMsg: '请选择是否农业专业大户' },
					{ name: 'is_farmcoop', checkType: 'notnull', errorMsg: '请选择是否家庭农场' }
				];
				return this.changeRequireStatus(itemarr, 'userBaseInfo', 'agri_flg', 1, 'farmingfarmcoop');
			}
		}, */
		/* 'userBaseInfo.is_bank_stk': {
			handler(newv, oldv) {
				// var item = { name: 'com_hold_stk_amt', checkType: 'notnull', errorMsg: '拥有我行股份金额' };
				var index = this.arrHasObj(this.userBaseInfoRequired, item);
				if (this.userBaseInfo.is_bank_stk == 1) {
					if (index == -1) {
						this.userBaseInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.userBaseInfoRequired[index].valid = false;
				}
				this.userBaseInfo.com_hold_stk_amt = '0.00';
				this.comholdstkamt = false;
				return false;
			}
		}, */
		/* 'indivInfo.is_business_owner': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'com_str_date', checkType: 'notnull', errorMsg: '请选择企业成立年月(格式:yyyy-mm)' },
					{ name: 'startworkdate', checkType: 'notnull', errorMsg: '请选择经营起始年份' },
					{ name: 'yearlamt', checkType: 'money', errorMsg: '请输入最近一个完整年度营业收入', error: '金额格式错误' },
					{ name: 'com_opt_owner', checkType: 'notnull', errorMsg: '请选择经营场地所有权' }
				];
				return this.changeRequireStatus(itemarr, 'indivInfo', 'is_business_owner', 1, 'isbusinessowner');
			}
		}, */

		/* 'maritalStatus.indiv_mar_st': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'indiv_sps_id_typ', checkType: 'notnull', errorMsg: '配偶证件类型' },
					{
						name: 'indiv_sps_id_code',
						checkType: this.maritalStatus.indiv_sps_id_typ != '10' ? 'notnull' : 'certcode',
						errorMsg: '配偶证件号码',
						error: '证件号码格式错误',
						replace: true
					},
					{ name: 'indiv_sps_name', checkType: 'notnull', errorMsg: '配偶姓名' },
					{ name: 'cus_id_rel', checkType: 'notnull', errorMsg: '配偶客户号' },
					{ name: 'indiv_scom_name', checkType: 'notnull', errorMsg: '工作单位' },
					{ name: 'indiv_sps_mphn', checkType: 'phoneno', errorMsg: '手机号码', error: '手机号码格式错误' },
					{ name: 'indiv_sps_phn', checkType: 'notnull', errorMsg: '单位电话' },
					{ name: 'indiv_sps_mincm', checkType: 'money', errorMsg: '配偶月收入(元)', error: '金额格式错误' },
					{ name: 'indiv_sps_out', checkType: 'notnull', errorMsg: '配偶月债务支出' }
				];
				return this.changeRequireStatus(itemarr, 'maritalStatus', 'indiv_mar_st', '20,21,22,23', 'msindivmars', 'indexof');
			}
		}, */
		/* 'otherInfo.loan_card_flg': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'loan_card_id', checkType: 'int', checkRule: '16', errorMsg: '请输入中征码(原贷款卡号)', error: '中征码为16位数字' },
					{ name: 'loan_card_eff_flg', checkType: 'notnull', errorMsg: '请选择中征码状态' }
				];
				return this.changeRequireStatus(itemarr, 'otherInfo', 'loan_card_flg', '1', 'loancardideffflg');
			}
		}, */
/* 		'temporary.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.temporaryRequired.length; i++) {
					var element = this.temporaryRequired[i];
					if (element.name == 'cert_code') {
						if (this.temporary.cert_type == '10') {
							this.temporaryRequired[i].checkType = 'certcode';
						} else {
							this.temporaryRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		}, */
		/* 'userBaseInfo.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.userBaseInfoRequired.length; i++) {
					var element = this.userBaseInfoRequired[i];
					if (element.name == 'cert_code') {
						if (this.userBaseInfo.cert_type == '10') {
							this.userBaseInfoRequired[i].checkType = 'certcode';
						} else {
							this.userBaseInfoRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		}, */
		/* 'userBaseInfo.long_flag': {
			handler(newv, oldv) {
				this.changeRequireStatus([{ name: 'indiv_id_exp_dt', checkType: 'notnull', errorMsg: '请选择证件到期日' }], 'userBaseInfo', 'long_flag', 2, 'individexpdtreq');
			}
		}, */
		// 判断是否与现居住地址相同
		'relationInfo.same_curadd_flg': {
			handler(newv, oldv) {
				if (newv == '1') {
					if (this.userBaseInfo.now_address) {
						this.relationInfo.post_addr = this.userBaseInfo.now_address;
					} else {
						uni.showModal({
							content: '请在“客户基本信息”中输入现居住地址',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
					}
				}
				this.$forceUpdate();
			}
		}
	}
};
</script>

<style scoped lang="scss">
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
.btnwrap {
	padding-bottom: 40rpx;
	position: relative;
}
.btnwrap::after {
	content: '';
	display: block;
	height: 1rpx;
	background: $mc-text-weak;
	position: absolute;
	width: 153%;
	bottom: 0;
	left: -70rpx;
}
#pageCheckID .mc-min-btn-primary.haveBg {
	background: #f2f6ff;
	color: #5d92ff;
	border: 1px solid #5d92ff;
	margin-left: 32rpx;
}
.listWrap {
	position: relative;
	margin-top: 40rpx;
}
.familyList .mcitem .mclabel {
	font-size: 28rpx;
	color: $mc-text-checkOption;
	// font-weight: 600;
	margin-right: 50rpx;
	margin-left: 0;
}
.familyList .mcitem.mcrowOne > uni-view {
	width: 40%;
}
.familyList .mcitem.mcrowOne > uni-view:first-child {
	width: 60%;
}
.familyList .mcitem .mccontent {
	color: $mc-text-color;
	font-size: 28rpx;
}
.inline-btn {
	position: relative;
}
.inline-btn .mc-min-btn-waring {
	float: left;
}
.listWrap .inline-btn-right {
	margin-right: 20rpx;
}
.textLeft {
	text-align: left;
}
.emptyData {
	margin-top: 32rpx;
}
.mianRadius.wrapScroll {
	display: flex;
	flex-direction: column;
}
.listbox.wrapScroll {
	height: 100%;
	overflow: auto;
}
.beizhu{
	background-color: white;
	margin: 3% 0 2% 5%;
	width: 90%;
	box-shadow: 0 0px 0 grayscale($color: #ffff7f),0 1px 5px grayscale($color: #ffff7f);
}
.beizhuSave{
	width: 90%;
	height: 45px;
	position: relative;
	padding: 32rpx;
	box-sizing: border-box;
	background: $mc-color-blue;
	color: white;
	margin-top: 20px;
	line-height: 12px;
	font-size: 17px;
}
</style>



<!-- indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置 -->
