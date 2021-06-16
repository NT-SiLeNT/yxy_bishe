<template>
	<view style="height: 100%;">
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
					<swiper-item v-for="(item, index) in checkItem" :key="item.id" :label="item.label" :nid="item.id" style="background-color: #FFFFFF;">
						<mc-image
							v-if="item.show"
							@getImageData="item.currentImageList = $event"
							:ownData="{ type: item.id, serno: currentserno }"
							:countMax="item.max"
							:uploaderTitle="item.tip"
							:requireClass="item.requird ? 'requireIcon' : ''"
							:canAddImg="ioanListCheck == 'true' ? true : false"
							:echoImgList="item.echoImgList"
							:imageListArr="item.currentImageList"
						></mc-image>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="现场录音" nid="xcly">
				<mc-voice
					v-if="tabMain[1].show"
					:ownData="{ type: audioType, serno: currentserno }"
					:voiceData="echovoiceData"
					@getAudioData="audioData = $event"
					:canAdd="ioanListCheck == 'true' ? true : false"
				></mc-voice>
			</swiper-item>
			<swiper-item label="检查总结" nid="jczj">
				<view class="w100" v-if="tabMain[2].show">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">现场检查时间</view>
							<picker :disabled="queryList" mode="date" :value="checkParam.checkDate" @change="bindDateChange">
								<view v-if="checkParam.checkDate" class="uni-input">{{ checkParam.checkDate }}</view>
								<view v-else class="uni-input placehold">-请选择-</view>
							</picker>
						</view>
						<view class="uni-form-item uni-column onerow">
							<view class="title requireIcon">检查地点</view>
							<picker
								:disabled="queryList"
								mode="multiSelector"
								@change="addressHandle"
								@cancel="addressCance"
								@columnchange="bindMultiPickerColumnChange"
								:value="multiIndex"
								range-key="CNNAME"
								:range="multiArray"
							>
								<view v-if="checkParam.address" class="uni-input">
									{{ multiArray[0][multiIndex[0]].CNNAME }}，{{ multiArray[1][multiIndex[1]].CNNAME }}，{{ multiArray[2][multiIndex[2]].CNNAME }}
								</view>
								<view v-else class="uni-input placehold">-请选择-</view>
							</picker>
						</view>
						<view class="uni-form-item uni-column onerow minHeight bottomGap">
							<view class="title requireIcon" style="position: relative;left: -1000px;">详细地址</view>
							<input :disabled="queryList" v-model="checkParam.check_point_detail" type="text" class="uni-input" value="" placeholder="请输入检查详细地址" />
						</view>
						<view v-if="ioanType == '01'" class="uni-form-item uni-column bottomGap">
							<view class="title requireIcon">参与检查人员</view>
							<checkbox-group @change="checkboxChangejoin" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in jointems" :key="item.value">
									<view><checkbox :disabled="queryList" :value="item.value" :checked="item.checked" /></view>
									<view>{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
						<view v-if="ioanType == '01'" class="uni-form-item uni-column bottomGap">
							<view class="title requireIcon">接待人员</view>
							<checkbox-group :disabled="queryList" @change="checkboxChangerecept" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in receptiontems" :key="item.value">
									<view><checkbox :disabled="queryList" :value="item.value" :checked="item.checked" /></view>
									<view>{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title requireIcon">检查总结</view>
							<textarea :disabled="queryList" v-model="checkParam.conclude" maxlength="200" placeholder="请输入" />
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
var onlyNum = 0;
export default {
	data() {
		return {
			multiArray: [[], [], []], // 地址选择的数据存放数组
			multiIndex: [0, 0, 0], //[0, 0, 0] 地址初始选择
			ioanType: '12', // '经营性贷款取值：12； 对公贷款取值01
			ioanListCheck: true, // 是现场核查列表还是历史查询列表
			queryList: false,
			isChange: 'false', //是否是修改
			currentTabIndex: 0,
			currentTabIndexMain: 0,
			tabMain: [{ show: true }, { show: false }, { show: false }],
			currentserno: '',
			audioType: 'L',
			echovoiceData: [],
			audioData: '', // 录音数据  类型 L
			onlyFive: false,
			jointems: [
				{
					value: '01',
					label: '客户经理',
					checked: 'true'
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
					checked: 'true'
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
				check_point_detail: '', //检查地点详情
				conclude: '' //结论
			},
			checkParamdg: {
				checkDate: '', // 检查时间
				address: '', // 检查地点
				check_point_detail: '', //检查地点详情
				joinperson: ['01'], // 参与检查人员
				reception: ['01'], // 接待人员
				conclude: '' // 结论
			},
			jyxcheckItem: [
				// 经营性贷款现场核查需收集的照片数据
				{
					label: '检查人合照',
					id: 'A',
					requird: true,
					tip: '检查人和被检查人合照',
					max: 2,
					echoImgList: [],
					currentImageList: [],
					show: true
				},
				{
					label: '经营场所',
					id: 'B',
					requird: true,
					tip: '客户经理与个人经营场所合照',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '收入证明',
					id: 'C',
					requird: false,
					tip: '销售收入证明',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '抵押物',
					id: 'D',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				}
			],
			dgcheckItem: [
				// 对公贷款现场核查需收集的照片数据
				{
					label: '门头照',
					id: 'E',
					requird: true,
					tip: '客户经理与客户的门头合照',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: true
				},
				{
					label: '检查人合照',
					id: 'F',
					requird: true,
					tip: '客户经理与被走访企业接待人员合照',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '生产车间',
					id: 'G',
					requird: false,
					tip: '生产车间照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '仓库',
					id: 'H',
					requird: false,
					tip: '仓库照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '财务报表',
					id: 'I',
					requird: false,
					tip: '财务报表类',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '发票',
					id: 'J',
					requird: false,
					tip: '发票类',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				},
				{
					label: '抵押物',
					id: 'K',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					echoImgList: [],
					currentImageList: [],
					show: false
				}
			]
		};
	},
	onReady: function() {
		console.log('this,', this);
		var title = '';
		// if(this.ioanType == '12'){
		// 	title = ''
		// }else{

		// }
		// uni.setNavigationBarTitle({
		//     title: '新的标题'
		// });
	},
	onLoad: function(option) {
		this.ioanType = option.ioanType; // 核查分类
		this.ioanListCheck = option.check; // 是否现场核查列表
		this.queryList = this.ioanListCheck == 'false' ? true : false;
		// this.currentserno = option.serno; // 任务编号
		this.currentserno = 'LS81701202006060580823'; // 任务编号LS81701202006060580823
		this.isChange = option.isChange ? option.isChange : ''; //是否是修改操作

		console.log(option); //打印出上个页面传递的参数。
		if (this.ioanType == '12') {
			cityFormat = this.doFormateTreeFun(citydatas, '');
			this.multiArray[0] = cityFormat[0].zchild;
			this.multiArray[1] = cityFormat[0].zchild[0].zchild;
			this.multiArray[2] = cityFormat[0].zchild[0].zchild[0].zchild ? cityFormat[0].zchild[0].zchild[0].zchild : [];
			console.log('cityFormat', cityFormat);
		}
	},
	onBackPress() {
		// 如果是详情页不进行这个操作
		if (this.ioanListCheck == 'true') {
			console.log('点击返回：不保存修改');
			uni.showModal({
				content: '页面录入内容未提交，返回数据将丢失，是否继续？',
				success: e => {
					if (e.confirm) {
						this.$request
							.post({
								url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
								data: {
									serno: this.currentserno
								}
							})
							.then(res => {
								if (res.data.response.header.returnCode == '00000000') {
								}
							})
							.catch(err => {});
					}
				},
				fail: () => {}
			});
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
			if (this.ioanType == '01') {
				return this.dgcheckItem;
			} else {
				return this.jyxcheckItem;
			}
		},
		// checkParam 检查结论手机数据
		checkParam() {
			if (this.ioanType == '01') {
				return this.checkParamdg;
			} else {
				return this.checkParamjyx;
			}
		},
		iDate() {
			return onlyNum + 1;
		}
	},
	onNavigationBarButtonTap(e) {
		alert('提交');
		console.log('audio:', this.audioData);
		console.log('dddd:', this.checkItem);
		for (var i = 0; i < this.checkItem.length; i++) {
			var element = this.checkItem[i];
			console.log('checkItem:', element);
			if (element.requird == true) {
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
		for (let key in this.checkParam) {
			console.log('checkParam', this.checkParam[key]);
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
		this.ImageUpload();
		this.toCheck();
	},
	mounted() {
		if (this.ioanListCheck == 'false') {
			var rightbtn = document.querySelector('body.pages-IoanSpotCheck-IoanSpotCheck uni-page-head .uni-page-head-ft');
			console.log(rightbtn);
			rightbtn.style.display = 'none';
		}
		if (this.isChange == 'true' || this.ioanListCheck == 'false') {
			// 查询已有参数;
			this.echovoiceData.push({ pUrl:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',img:'111'})
			this.toQueryData();
			this.toQueryImageData();
		}
	},
	methods: {
		//贷后现场检查
		toCheck: function() {
			var address = '';
			var joinperson = '';
			var reception = '';
			address = this.checkParam.address ? this.checkParam.address.join(',') : '';
			if (this.ioanType == '01') {
				joinperson = this.checkParam.joinperson ? this.checkParam.joinperson.join(',') : '';
				reception = this.checkParam.reception ? this.checkParam.reception.join(',') : '';
			}
			var params = {
				serno: this.currentserno, //	任务编号
				cus_type: this.ioanType, //	贷后检查客户类型
				check_add_cont13: this.checkParam.checkDate ? this.checkParam.checkDate : '', //	检查时间
				check_point: address, //	检查地点
				check_point_detail: this.checkParam.check_point_detail, //详细地址
				check_add_cont15: joinperson, //	参与检查的人员
				check_add_cont16: reception, //	接待人员
				check_add_cont17: '1', //	是否拍照留存  1：是；2：否,默认传1
				check_add_cont19: '01', //	客户是否配合检查 默认积极配合   01 积极配合   02 配合但不积极   03 不配合     04 拒绝
				check_add_cont20: this.checkParam.conclude ? this.checkParam.conclude : '' //备注
			};
			this.$request
				.post({
					url: 'es/json/EsPostDeliveryCheck',
					data: params
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('贷后现场检查');
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=true&ioanType=12&check=true'
						});
					} else {
						this.$store.state.errmsg = res.response.header.returnMsg;
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=false&ioanType=12&check=true'
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
						var contentadd = res.response.content.check_point ? res.response.content.check_point.split(',') : [];
						if (contentadd.length) {
							for (var ai = 0; ai < this.multiArray.length; ai++) {
								for (var i = 0; i < this.multiArray[ai].length; i++) {
									var item = this.multiArray[ai][i];
									if (item.ENNAME == contentadd[ai]) {
										this.multiIndex[ai] = i;
										break;
									}
								}
							}
						}
						if (this.ioanType != '12') {
							var reception = res.response.content.check_add_cont16 ? res.response.content.check_add_cont16.split(',') : [];
							if (reception.length) {
								reception.forEach((el, ind) => {
									for (var index = 0; index < this.receptiontems.length; index++) {
										if (this.receptiontems[index].value == el) {
											this.receptiontems[index].checked = true;
											this.checkParam.reception.push(el);
											break;
										}
									}
								});
							} else {
								this.checkParam.reception = [];
								this.receptiontems[0].checked = false;
							}

							var joinperson = res.response.content.check_add_cont15 ? res.response.content.check_add_cont15.split(',') : [];
							if (joinperson.length) {
								joinperson.forEach((el, ind) => {
									for (var index = 0; index < this.jointems.length; index++) {
										if (this.jointems[index].value == el) {
											this.jointems[index].checked = true;
											this.checkParam.joinperson.push(el);
											break;
										}
									}
								});
							} else {
								this.checkParam.joinperson = [];
								this.jointems[0].checked = false;
							}
						}
					}
				})
				.catch(err => {});
		},
		toQueryImageData: function() {
			this.$request
				.post({
					url: 'es/json/EsCreditImageView',
					data: {
						// serno: this.currentserno //	任务编号
						serno: '2111222' //	任务编号
					}
				})
				.then(res => {
					console.log('影像查看：', res);
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List.length) {
							var listData = res.response.content.List;
							listData.forEach((element, inde) => {
								console.log('eeeeeeeeee');
								if (element.IMGTYPE == this.audioType) {
									this.echovoiceData.push({ pUrl: 1 == 2 ? element.URL : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3', imgSn: '111' });
								}
								for (var i = 0; i < this.checkItem.length; i++) {
									console.log('sss', this.checkItem[i].id);
									if (element.IMGTYPE == this.checkItem[i].id) {
										this.checkItem[i].echoImgList.push({
											pUrl: element.URL
										});
										break;
									}
								}
							});
							console.log('天厨数据后：', this.checkItem);
						}
					}
				});
		},
		ImageUpload: function() {
			this.$request
				.post({
					url: 'es/json/EsCreditImageUpload',
					data: {
						serno: this.currentserno //	任务编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('现场核查影像上传');
						// uni.redirectTo({
						// 	url:'/pages/IoanSpotCheck/IoanSpotCheckList?ioanType=12&check=true'
						// })
					}
				})
				.catch(err => {});
		},
		checkboxChangejoin: function(e) {
			var items = this.jointems,
				values = e.detail.value;
			console.log('values“', values);
			this.checkParam.joinperson = values;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
			console.log(this.jointems);
		},
		checkboxChangerecept: function(e) {
			var items = this.receptiontems,
				values = e.detail.value;
			console.log('eee', values, e);
			if (values.includes('05')) {
				values = ['05'];
				alert(333);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if (item.value == '05') {
						console.log('eeeee，shiwu');
						this.$set(item, 'checked', true);
					} else {
						this.$set(item, 'checked', false);
					}
				}
				console.log(this.receptiontems);
				return;
			}
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
			console.log(this.receptiontems);
		},
		addressHandle: function(e) {
			var address = [];
			for (var ai = 0; ai < this.multiArray.length; ai++) {
				for (var i = 0; i < this.multiArray[ai].length; i++) {
					var item = this.multiArray[ai][i];
					if (i == this.multiIndex[ai]) {
						address[ai] = item.ENNAME;
						break;
					}
				}
			}
			console.log('addressaddressaddress:', address);
			this.checkParam.address = address;
		},
		addressCance: function(e) {
			this.multiIndex = [];
			this.checkParam.address = '';
			this.checkParam.check_point_detail = '';
		},
		bindDateChange: function(e) {
			// 时间选择
			this.checkParam.checkDate = e.target.value;
		},
		bindMultiPickerColumnChange: function(e) {
			// 地区选择
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0: //拖动第1列
					this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
					this.multiArray[2] = this.multiArray[1][0].zchild;
					this.multiIndex.splice(1, 1, 0);
					console.log('jsjsjsjs:', this.multiIndex);
					this.multiIndex.splice(2, 1, 0);
					break;
				case 1: //拖动第2列
					console.log('eeeee:', this.multiArray[1][this.multiIndex[1]].zchild);
					this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild;
					this.multiIndex.splice(2, 1, 0);
					break;
			}
			this.$forceUpdate();
		},
		doFormateTreeFun: function(data, parentId) {
			// 将一维数组转为树形数组
			var t = this;
			var tree = [];
			var temp;
			for (var i = 0; i < data.length; i++) {
				if (data[i].ABVENNAME == parentId) {
					var obj = data[i];
					temp = t.doFormateTreeFun(data, data[i].ENNAME);
					if (temp.length > 0) {
						obj.zchild = temp;
					}
					tree.push(obj);
				}
			}
			return tree;
		}
	},
	watch: {
		currentTabIndex() {
			console.log('eee');
			this.checkItem[this.currentTabIndex].show = true;
		},
		currentTabIndexMain() {
			console.log('eee', this.currentTabIndexMain);
			var a = this.currentTabIndexMain * 1;
			this.tabMain[a].show = true;
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
	display: none;
}
.mcform uni-radio-group,
.mcform uni-checkbox-group {
	font-size: 28rpx;
	color: $mc-text-checkTitle;
}
</style>
