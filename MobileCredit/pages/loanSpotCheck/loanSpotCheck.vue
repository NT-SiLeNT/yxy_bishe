<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID" @click="toResetFocus">
		<tabbars tposition="top" :titleBottomLine="true" :swduration="120" style="height: 100%;" @getCurrent="currentTabIndexMain = $event">
			<swiper-item label="现场采集" nid="xcjc">
				<tabbars
					v-if="tabMain[0].show"
					tposition="left"
					:titleBottomLine="false"
					:swduration="0"
					:is-required="requireList"
					:redc="'redc'"
					@getCurrent="currentTabIndex = $event"
				>
					<swiper-item v-for="(item, index) in checkItem" :key="item.id" :label="item.label" :nid="'n' + item.id" style="background-color: #FFFFFF;">
						<mc-image
							v-if="item.show"
							@getImageData="item.currentImageList = $event"
							:ownData="{ type: item.id, serno: currentserno, pvalue: currentserno + item.id }"
							:countMax="item.max"
							:uploaderTitle="item.tip"
							:requireClass="item.requird ? 'requireIcon' : ''"
							:echoImgList="item.echoImgList"
							:canAddImg="loanListCheck"
							:imageListArr="item.currentImageList"
							:isChangeAdd="isChange"
						></mc-image>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="现场录音" nid="xcly">
				<mc-voice
					v-if="tabMain[1].show"
					:lostFocus="currentTabIndexMain == 1 && focusVoice == true"
					:closeVoice="closeVoice"
					:ownData="{ type: audioType, serno: currentserno, pvalue: currentserno }"
					:voiceData="echovoiceData"
					@getAudioData="audioData = $event"
					:canAdd="loanListCheck"
					:isChangeAdd="isChange"
				></mc-voice>
			</swiper-item>
			<swiper-item label="检查总结" nid="jczj">
				<view class="w100" v-if="tabMain[2].show">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否现场检查</view>
							<mc-radio-group :disabled="queryList" v-model="checkParam.check_sce_yes" :left="true">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<block v-if="checkParam.check_sce_yes != 2">
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">现场检查时间</view>
								<mc-picker-select :disabled="queryList" class="uni-input" mode="date" v-model="checkParam.checkDate"></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow">
								<view class="title requireIcon">检查地点</view>
								<mc-picker-select
									:disabled="queryList"
									mode="area"
									@getName="checkParam.addressname = $event"
									v-model="checkParam.address"
									class="uni-input"
								></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow minHeight bottomGap">
								<view class="title requireIcon" style="position: relative;left: -1000px;">详细地址</view>
								<input
									:disabled="queryList"
									v-model="checkParam.check_point_detail"
									type="text"
									class="uni-input"
									value=""
									maxlength="50"
									placeholder="请输入详细地址(50字以内)"
								/>
							</view>
							<view v-if="loanType == '01'" class="uni-form-item uni-column bottomGap">
								<view class="title requireIcon">参与检查人员</view>
								<mc-checkbox-group v-model="checkParam.joinperson" :data="jointems" class="mcradio"></mc-checkbox-group>
							</view>
							<view v-if="loanType == '01'" class="uni-form-item uni-column bottomGap">
								<view class="title requireIcon">接待人员</view>
								<mc-checkbox-group v-model="checkParam.reception" :notValue="'05'" :data="receptiontems" class="mcradio"></mc-checkbox-group>
							</view>
							<view class="uni-form-item uni-column">
								<view class="title requireIcon">检查总结</view>
								<textarea :disabled="queryList" v-model="checkParam.conclude" maxlength="200" placeholder="请输入检查总结(200字以内)" />
							</view>
						</block>
						<view class="uni-form-item uni-column" v-if="checkParam.check_sce_yes == 2">
							<view class="title" :class="{ requireIcon: checkParam.check_sce_yes == 2 }">非现场检查原因</view>
							<textarea :disabled="queryList" v-model="check_sce_desc" maxlength="200" placeholder="请输入非现场检查原因(200字以内)" />
						</view>
					</view>
				</view>
			</swiper-item>
		</tabbars>
	</view>
</template>

<script>
import { citydatas } from '@/common/cityDatas.js';
var cityFormat = [];
export default {
	data() {
		return {
			loanType: '12', // '经营性贷款取值：12； 对公贷款取值01
			loanListCheck: true, // 是现场核查列表还是历史查询列表
			queryList: false,
			focusVoice: true, //是否未提交
			closeVoice: false, //是否删除未保存录音
			isFirstBck: true, //第一次进入onbackPass
			isChange: false, //是否是修改
			currentTabIndex: 0,
			currentTabIndexMain: 0,
			tabMain: [{ show: true }, { show: false }, { show: false }],
			currentserno: '',
			crtdate: '',
			jyxaudioType: '0416',
			dgaudioType: '0429',
			echovoiceData: [],
			audioData: '', // 录音数据  类型 L
			onlyFive: false,
			origincheckParam: {},
			origincheckItem: [],
			check_sce_desc: '', //不进行检查的原因
			jointems: [
				{
					value: '01',
					label: '客户经理',
					checked: false
				},
				{
					value: '02',
					label: '业务科长'
				},
				{
					value: '03',
					label: '市场部经理'
				},
				{
					value: '04',
					label: '支行行长'
				}
			],
			receptiontems: [
				{
					value: '01',
					label: '会计负责人',
					checked: false
				},
				{
					value: '02',
					label: '实际控制人'
				},
				{
					value: '03',
					label: '总经理'
				},
				{
					value: '04',
					label: '一般工作人员'
				},
				{
					value: '05',
					label: '无'
				}
			],
			checkParamjyx: {
				// 结论的数组存放
				checkDate: '', //检查时间
				address: '',
				addressname: '',
				check_point_detail: '', //检查地点详情
				conclude: '', //结论
				check_sce_yes: '' //是否现场检查
			},
			checkParamdg: {
				checkDate: '', // 检查时间
				address: '', // 检查地点
				addressname: '',
				check_point_detail: '', //检查地点详情
				joinperson: '', // 参与检查人员
				reception: '', // 接待人员
				conclude: '', // 结论
				check_sce_yes: '' //是否现场检查
			},
			jyxcheckItem: [
				// 经营性贷款现场核查需收集的照片数据
				{
					label: '检查人合照',
					id: '0411',
					requird: true,
					tip: '检查人和被检查人合照',
					max: 2,
					echoImgList: [],
					currentImageList: [],
					show: true
				},
				{
					label: '经营场所',
					id: '0412',
					requird: true,
					tip: '客户经理与个人经营场所合照',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '收入证明',
					id: '0413',
					requird: false,
					tip: '销售收入证明',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '抵押物',
					id: '0414',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '其他资料',
					id: '0415',
					requird: false,
					tip: '其他资料',
					max: 5,
					echoImgList: [],
					currentImageList: [],
					show: false
				}
			],
			dgcheckItem: [
				// 对公贷款现场核查需收集的照片数据
				{
					label: '门头照',
					id: '0421',
					requird: true,
					tip: '客户经理与客户的门头合照',
					max: 3,
					echoImgList: [],
					currentImageList: [],
					show: true
				},
				{
					label: '检查人合照',
					id: '0422',
					requird: true,
					tip: '客户经理与被走访企业接待人员合照',
					max: 3,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '生产车间',
					id: '0423',
					requird: false,
					tip: '生产车间照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '仓库',
					id: '0424',
					requird: false,
					tip: '仓库照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '财务报表',
					id: '0425',
					requird: false,
					tip: '财务报表类',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '发票',
					id: '0426',
					requird: false,
					tip: '发票类',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '抵押物',
					id: '0427',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '其他资料',
					id: '0428',
					requird: false,
					tip: '其他资料',
					max: 5,
					echoImgList: [],
					currentImageList: [],
					show: false
				}
			]
		};
	},
	onReady: function() {},
	/* onLoad: function(option) {
		var checkop = JSON.parse(option.check) == false ? true : false;
		if (this.$store.state.accountInfos.qxSign !== this.$store.state.qxValue && process.env.NODE_ENV === 'production' && !checkop) {
			uni.showModal({
				showCancel: false,
				title: '提示',
				content: '您没有此操作权限',
				success: function() {
					uni.navigateBack({});
				}
			});
		}
		this.loanType = option.loanType; // 核查分类
		this.loanListCheck = JSON.parse(option.check); // 是否现场核查列表
		this.queryList = this.loanListCheck == false ? true : false; // 是否是详情也米娜
		this.currentserno = option.serno; // 任务编号
		this.crtdate = option.crtdate; //任务生成日期
		// this.currentserno = 'LS81701202006060580823'; // 任务编号LS81701202006060580823
		this.isChange = option.isChange ? JSON.parse(option.isChange) : ''; //是否是修改操作
		// this.isChange = 'true'; //是否是修改操作

		console.log(option); //打印出上个页面传递的参数。
	}, */
	onBackPress() {
		this.$store.commit('deltypeAndIndex', '');
		// 如果是详情页不进行这个操作
		if (this.loanListCheck == true && this.isFirstBck) {
			if (this.currentParamsIschange()) {
				return false;
			}
			console.log('点击返回：不保存修改');
			uni.showModal({
				content: '页面录入内容未提交，返回数据将丢失，是否继续？',
				success: e => {
					if (e.confirm) {
						this.$request
							.post({
								url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
								data: {
									serno: this.currentserno,
									delSign: this.isChange == true ? '1' : ''
								}
							})
							.then(res => {
								res = res.result[0];
								if (res.head.returnCode == '00000000') {
									// 返回列表页面
									this.isFirstBck = false;
									uni.navigateBack();
									// uni.redirectTo({
									// 	url:'/pages/loanSpotCheck/loanSpotCheckList?loanType='+this.loanType+'&check='+this.loanListCheck
									// })
								} else {
									uni.showToast({
										title: res.head.returnMsg,
										icon: 'none',
										duration: 1500
									});
								}
							})
							.catch(err => {});
					}
				},
				fail: () => {}
			});
			return true;
		}
	},
	computed: {
		// requireList 得到item中必填的数据
		requireList() {
			if (!this.checkItem || !this.checkItem.length) {
				return [];
			}
			var list = [];
			for (var i = 0; i < this.checkItem.length; i++) {
				if (this.checkItem[i].requird == true) {
					list.push(i);
				}
			}
			return list;
		},
		// checkItem 现场核查需收集的照片数据
		checkItem() {
			if (this.loanType == '01') {
				return this.dgcheckItem;
			} else {
				return this.jyxcheckItem;
			}
		},
		// checkParam 检查结论手机数据
		checkParam() {
			if (this.loanType == '01') {
				return this.checkParamdg;
			} else {
				return this.checkParamjyx;
			}
		},
		audioType() {
			if (this.loanType == '01') {
				return this.dgaudioType;
			} else {
				return this.jyxaudioType;
			}
		}
	},
	onNavigationBarButtonTap(e) {
		if (this.checkParam.check_sce_yes == 2) {
			if (this.check_sce_desc == '') {
				uni.showToast({
					title: '检查总结有必填项为空',
					icon: 'none',
					duration: 1500
				});
				console.log('检查总结有必填项为空：', this.checkParam[key]);
				return;
			}
			for (let key in this.checkParam) {
				if (key == 'check_sce_yes') {
				} else {
					this.checkParam[key] = '';
				}
			}
			var canuploadImg = false;
			for (var i = 0; i < this.checkItem.length; i++) {
				var element = this.checkItem[i];
				if (element.currentImageList.length != 0) {
					canuploadImg = true;
					break;
				}
			}
			if (this.audioData != '' && this.audioData.pUrl != '') {
				canuploadImg = true;
			}
			if (!canuploadImg) {
				this.toCheck();
			} else {
				this.$request
					.post({
						url: 'es/json/EsCreditImageUpload',
						data: {
							serno: this.currentserno, //	任务编号
							crtdate: this.crtdate ? this.crtdate : ''
						},
						upType: true,
						upMsg: '正在上传文件'
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000') {
							console.log('现场核查影像上传', res);
							this.toCheck();
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			}
		} else {
			if (this.isChange && this.currentParamsIschange()) {
				uni.showModal({
					content: '未进行任何修改！',
					showCancel: false
				});
				return;
			}
			if (!this.audioData || !this.audioData.pUrl) {
				this.focusVoice = false;
			} else {
				this.closeVoice = true;
			}
			console.log('audio:', this.audioData);
			console.log('dddd:', this.checkItem);
			for (var i = 0; i < this.checkItem.length; i++) {
				var element = this.checkItem[i];
				if (element.requird == true) {
					if (this.isChange) {
						if (element.echoImgList.length == 0 && element.currentImageList.length == 0) {
							uni.showToast({
								title: '现场采集有必填项为空',
								icon: 'none',
								duration: 1500
							});
							console.log('现场采集有必填项为空');
							return;
						}
					} else {
						if (element.currentImageList.length == 0) {
							uni.showToast({
								title: '现场采集有必填项为空',
								icon: 'none',
								duration: 1500
							});
							console.log('现场采集有必填项为空');
							return;
						}
					}
				}
			}
			if (this.isChange) {
				if (this.echovoiceData.length == 0 && !this.audioData.pUrl) {
					uni.showToast({
						title: '现场录音为空',
						icon: 'none',
						duration: 1500
					});
					return;
				}
			} else {
				if (!this.audioData.pUrl) {
					uni.showToast({
						title: '现场录音为空',
						icon: 'none',
						duration: 1500
					});
					return;
				}
			}
			for (let key in this.checkParam) {
				if (!this.checkParam[key]) {
					uni.showToast({
						title: '检查总结有必填项为空',
						icon: 'none',
						duration: 1500
					});
					console.log('检查总结有必填项为空：', this.checkParam[key]);
					return;
				}
			}
			var canuploadImg = false;
			for (var i = 0; i < this.checkItem.length; i++) {
				var element = this.checkItem[i];
				if (element.currentImageList.length != 0) {
					canuploadImg = true;
					break;
				}
			}
			this.check_sce_desc = '';
			if (this.audioData != '' && this.audioData.pUrl != '') {
				canuploadImg = true;
			}
			if (!canuploadImg) {
				this.toCheck();
			} else {
				// this.ImageUpload();
				this.$request
					.post({
						url: 'es/json/EsCreditImageUpload',
						data: {
							serno: this.currentserno, //	任务编号
							crtdate: this.crtdate ? this.crtdate : ''
						},
						upType: true,
						upMsg: '正在上传文件'
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000') {
							console.log('现场核查影像上传', res);
							this.toCheck();
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			}
		}
	},
	mounted() {
		if (this.loanListCheck == false) {
			var rightbtn = document.querySelector('body.pages-loanSpotCheck-loanSpotCheck uni-page-head .uni-page-head-ft');
			rightbtn.style.display = 'none';
		}
		// 暂时注释
		if (this.isChange == true || this.loanListCheck == false) {
			// 查询已有参数;
			this.toQueryData();
			this.toQueryImageData();
		}
	},
	methods: {
		//贷后现场检查
		toCheck: function() {
			var params = {
				serno: this.currentserno, //	任务编号
				cus_type: this.loanType, //	贷后检查客户类型
				check_add_cont13: this.checkParam.checkDate ? this.checkParam.checkDate : '', //	检查时间
				check_point: this.checkParam.address, //	检查地点
				check_point_name: this.checkParam.addressname, //	检查地点
				check_point_detail: this.checkParam.check_point_detail, //详细地址
				check_add_cont15: this.checkParam.joinperson, //	参与检查的人员
				check_add_cont16: this.checkParam.reception, //	接待人员
				// check_add_cont17: '1', //	是否拍照留存  1：是；2：否,默认传1
				// check_add_cont19: '01', //	客户是否配合检查 默认积极配合   01 积极配合   02 配合但不积极   03 不配合     04 拒绝
				check_add_cont20: this.checkParam.conclude ? this.checkParam.conclude : '', //备注
				check_status_sce: '2',
				check_sce_yes: this.checkParam.check_sce_yes, //是否现场检查1：是  2：否
				check_sce_desc: this.check_sce_desc //非现场检查原因
			};
			this.$request
				.post({
					url: 'es/json/EsPostDeliveryCheck',
					data: params,
					upType: true,
					upMsg: '正在上传文件'
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('贷后现场检查', res);
						this.$store.commit('settypeAndIndex', {
							type: 'loan',
							index: this.currentserno
						});
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=true&loanType=12&check=true'
						});
					} else {
						this.$store.state.errmsg = res.response.header.returnMsg;
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=false&loanType=12&check=true'
						});
					}
				})
				.catch(err => {});
		},
		toQueryData: function() {
			this.$request
				.post({
					url: 'es/json/EsQueryPostDeliveryTask',
					data: {
						serno: this.currentserno //	任务编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('贷后列表详情：', res);
						this.checkParam.checkDate = res.response.content.check_add_cont13 ? res.response.content.check_add_cont13 : '';
						this.checkParam.conclude = res.response.content.check_add_cont20 ? res.response.content.check_add_cont20 : '';
						this.checkParam.check_point_detail = res.response.content.check_point_detail ? res.response.content.check_point_detail : '';
						this.checkParam.address = res.response.content.check_point ? res.response.content.check_point : '';
						this.checkParam.addressname = res.response.content.check_point_name ? res.response.content.check_point_name : '';
						this.checkParam.check_sce_yes = res.response.content.check_sce_yes ? res.response.content.check_sce_yes : '';
						this.check_sce_desc = res.response.content.check_sce_desc ? res.response.content.check_sce_desc : '';
						if (this.loanType != '12') {
							this.checkParam.reception = res.response.content.check_add_cont16 ? res.response.content.check_add_cont16 : '';
							this.checkParam.joinperson = res.response.content.check_add_cont15 ? res.response.content.check_add_cont15 : '';
						}
						for (let key in this.checkParam) {
							if (this.checkParam[key] != '') {
								this.isChange = true;
								break;
							}
						}
						if (this.queryList) {
							this.checkParam.checkDate = this.checkParam.checkDate ? this.checkParam.checkDate : '-';
							this.checkParam.conclude = this.checkParam.conclude ? this.checkParam.conclude : '-';
							this.checkParam.check_point_detail = this.checkParam.check_point_detail ? this.checkParam.check_point_detail : '-';
							this.checkParam.address = this.checkParam.address ? this.checkParam.address : '-';
						}

						this.origincheckParam = JSON.parse(JSON.stringify(this.checkParam));
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
		toQueryImageData: function() {
			this.$request
				.post({
					url: 'es/json/EsCreditImageView',
					data: {
						serno: this.currentserno, //	任务编号
						crtdate: this.crtdate ? this.crtdate : ''
						// serno: '2111222' //	任务编号
					}
				})
				.then(res => {
					console.log('影像查看：', res);
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List.length) {
							this.isChange = true;
							var listData = res.response.content.List;
							listData.forEach((element, inde) => {
								if (process.env.NODE_ENV === 'development') {
									element.urlreplace = element.URL;
								} else {
									if (this.$store.state.imgUrlReplace) {
										var reg = /^((http:\/\/)|(https:\/\/))((([a-zA-Z0-9]*\.)*[a-zA-Z0-9]*)|(([a-zA-Z0-9]{1,3}\.){3}[a-zA-Z0-9]{1,3})):[0-9]{4}(\/){0}/;
										element.urlreplace = element.URL.replace(reg, this.$store.state.prodUrl);
									} else {
										element.urlreplace = element.URL;
									}
								}
								if (element.IMGTYPE == this.audioType) {
									element.pUrl = element.urlreplace ? element.urlreplace : '';
									this.echovoiceData.push(element);
								}
								for (var i = 0; i < this.checkItem.length; i++) {
									if (element.IMGTYPE == this.checkItem[i].id) {
										element.pUrl = element.urlreplace ? element.urlreplace : '';
										this.checkItem[i].echoImgList.push(element);
										break;
									}
								}
							});
							this.origincheckItem = JSON.parse(JSON.stringify(this.checkItem));
							console.log('填充数据后：', this.checkItem);
						}
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				});
		},
		ImageUpload: function() {
			this.$request
				.post({
					url: 'es/json/EsCreditImageUpload',
					data: {
						serno: this.currentserno, //	任务编号
						crtdate: this.crtdate ? this.crtdate : ''
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('现场核查影像上传', res);
						// uni.redirectTo({
						// 	url:'/pages/loanSpotCheck/loanSpotCheckList?loanType=12&check=true'
						// })
					}
				})
				.catch(err => {});
		},
		currentParamsIschange: function() {
			var flag = true;
			for (var i = 0; i < this.checkItem.length; i++) {
				var element = this.checkItem[i];
				if (this.isChange) {
					if (
						element.currentImageList.length != 0 ||
						(this.origincheckItem.length !== 0 && this.origincheckItem[i].currentImageList.length != element.currentImageList.length)
					) {
						flag = false;
					}
				} else {
					if (element.currentImageList.length != 0) {
						flag = false;
					}
				}
			}
			if (this.audioData != '' || (this.audioData.pUrl != undefined && this.audioData.pUrl != '')) {
				flag = false;
			}
			for (let key in this.checkParam) {
				if (this.isChange) {
					if (this.checkParam[key] != this.origincheckParam[key]) {
						flag = false;
					}
				} else {
					if (this.checkParam[key] != '') {
						flag = false;
					}
				}
			}
			return flag;
		},
		toResetFocus: function() {
			this.focusVoice = true;
		}
	},
	watch: {
		currentTabIndex() {
			this.checkItem[this.currentTabIndex].show = true;
		},
		currentTabIndexMain() {
			console.log('eee', this.currentTabIndexMain);
			var a = this.currentTabIndexMain * 1;
			this.tabMain[a].show = true;
		},
		'checkParam.check_sce_yes': {
			handler(newv, oldv) {
				if (this.checkParam.check_sce_yes == 2) {
					for (let key in this.checkParam) {
						if (key == 'check_sce_yes') {
						} else {
							this.checkParam[key] = '';
						}
					}
				}
			}
		}
	}
};
</script>

<style scoped lang="scss">
.nopb.bottomGap {
	padding-bottom: 0;
}
.bottomGap {
	padding-bottom: 28rpx;
}
.mcform .uni-form-item.onerow.minHeight {
	height: 40rpx;
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
.mianRadius /deep/ .mcradio .uni-list-cell {
	justify-content: flex-start;
	line-height: 80rpx;
}
</style>
