<template>
	<view style="height: 100%;">
		<tabbars tposition="top" :titleBottomLine="true" :swduration="120" style="height: 100%;">
			<swiper-item label="现场采集" nid="xcjc">
				<tabbars tposition="left" :titleBottomLine="false" :swduration="0" :is-required="requireList" :redc="'redc'">
					<swiper-item v-for="(item, index) in checkItem" :key="item.id" :label="item.label" :nid="item.id" style="background-color: #FFFFFF;">
						<mc-image
							@getImageData="item.currentImageList = $event"
							:ownData="{ type: item.id, serno: currentserno }"
							:countMax="item.max"
							:uploaderTitle="item.tip"
							:requireClass="item.requird ? 'requireIcon' : ''"
							:imageListArr="item.currentImageList"
						></mc-image>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="现场录音" nid="xcly"><mc-voice></mc-voice></swiper-item>
			<swiper-item label="检查总结" nid="jczj">
				<view class="w100">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">现场检查时间</view>
							<picker mode="date" :value="checkParam.checkDate" @change="bindDateChange">
								<view v-if="checkParam.checkDate" class="uni-input">{{ checkParam.checkDate }}</view>
								<view v-else class="uni-input placehold">-请选择-</view>
							</picker>
						</view>
						<view v-if="ioanType == '01'" class="uni-form-item uni-column bottomGap">
							<view class="title requireIcon">检查地点</view>
							<radio-group @change="radioChangeAddr" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in checkAddressitems" :key="item.value">
									<view><radio :value="item.value" :checked="index === checkParam.address" /></view>
									<view>{{ item.label }}</view>
								</label>
							</radio-group>
						</view>
						<view v-if="ioanType == '01'" class="uni-form-item uni-column bottomGap">
							<view class="title requireIcon">参与检查人员</view>
							<radio-group @change="radioChangejoin" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in jointems" :key="item.value">
									<view><radio :value="item.value" :checked="index === checkParam.joinperson" /></view>
									<view>{{ item.label }}</view>
								</label>
							</radio-group>
							<checkbox-group @change="checkboxChangejoin" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in jointems" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" /></view>
									<view>{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
						<view v-if="ioanType == '01'" class="uni-form-item uni-column bottomGap">
							<view class="title requireIcon">接待人员</view>
							<radio-group @change="radioChangerecept" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in receptiontems" :key="item.value">
									<view><radio :value="item.value" :checked="item.checked" /></view>
									<view>{{ item.label }}</view>
								</label>
							</radio-group>
							<checkbox-group @change="checkboxChangerecept" class="mcradio">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in receptiontems" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" /></view>
									<view>{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
						<view v-if="ioanType != '01'" class="uni-form-item uni-column onerow">
							<view class="title requireIcon">检查地点</view>
							<picker
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
						<view v-if="ioanType != '01'" class="uni-form-item uni-column onerow minHeight bottomGap">
							<view class="title requireIcon" style="position: relative;left: -1000px;">详细地址</view>
							<input v-model="detailAddress" type="text" class="uni-input" value="" placeholder="请输入检查详细地址" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title requireIcon">检查总结</view>
							<textarea v-model="checkParam.conclude" placeholder="请输入" />
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
			multiArray: [['亚洲', '欧洲'], ['中国', '日本'], ['北京', '上海', '广州']], // 地址选择的数据存放数组
			multiIndex: [0, 0, 0], //[0, 0, 0] 地址初始选择
			ioanType: '12', // '经营性贷款取值：12； 对公贷款取值01
			isChange: 'false', //是否是修改
			currentserno: '',
			detailAddress: '', //详细地址
			checkAddressitems: [
				{
					value: '0',
					label: '企业办公室',
					checked: 'true'
				},
				{
					value: '1',
					label: '车间'
				},
				{
					value: '2',
					label: '仓库'
				},
				{
					value: '3',
					label: '财务办公室'
				}
			],
			jointems: [
				{
					value: '0',
					label: '客户经理',
					checked: 'true'
				},
				{
					value: '1',
					label: '业务科长'
				},
				{
					value: '2',
					label: '市场部经理'
				},
				{
					value: '3',
					label: '支行行长'
				}
			],
			receptiontems: [
				{
					value: '0',
					label: '会计负责人',
					checked: 'true'
				},
				{
					value: '1',
					label: '业务科长'
				},
				{
					value: '2',
					label: '市场部经理'
				},
				{
					value: '3',
					label: '支行行长'
				}
			],
			checkParamjyx: {
				// 结论的数组存放
				checkDate: '', //检查时间
				address: '',
				conclude: '' //结论
			},
			checkParamdg: {
				checkDate: '', // 检查时间
				address: '', // 检查地点
				joinperson: '', // 参与检查人员
				reception: '', // 接待人员
				conclude: '' // 结论
			},
			jyxcheckItem: [
				// 经营性贷款现场核查需收集的照片数据
				{
					label: '检查人合照',
					id: 'jyxjcrhz',
					requird: true,
					tip: '检查人和被检查人合照',
					max: 2,
					currentImageList: []
				},
				{
					label: '经营场所',
					id: 'jyxjycs',
					requird: true,
					tip: '客户经理与个人经营场所合照',
					max: 10,
					currentImageList: []
				},
				{
					label: '收入证明',
					id: 'jyxsrzm',
					requird: false,
					tip: '销售收入证明',
					max: 10,
					currentImageList: []
				},
				{
					label: '抵押物',
					id: 'jyxdyw',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					currentImageList: []
				}
			],
			dgcheckItem: [
				// 对公贷款现场核查需收集的照片数据
				{
					label: '门头照',
					id: 'dgmtz',
					requird: true,
					tip: '客户经理与客户的门头合照',
					max: 10,
					currentImageList: []
				},
				{
					label: '检查人合照',
					id: 'dgjcrhz',
					requird: true,
					tip: '客户经理与被走访企业接待人员合照',
					max: 10,
					currentImageList: []
				},
				{
					label: '生产车间',
					id: 'dgsccj',
					requird: false,
					tip: '生产车间照片',
					max: 10,
					currentImageList: []
				},
				{
					label: '仓库',
					id: 'dgck',
					requird: false,
					tip: '仓库照片',
					max: 10,
					currentImageList: []
				},
				{
					label: '财务报表',
					id: 'dgcwbb',
					requird: false,
					tip: '财务报表类',
					max: 10,
					currentImageList: []
				},
				{
					label: '发票',
					id: 'dgfp',
					requird: false,
					tip: '发票类',
					max: 10,
					currentImageList: []
				},
				{
					label: '抵押物',
					id: 'dgdyw',
					requird: false,
					tip: '抵押物照片',
					max: 10,
					currentImageList: []
				}
			]
		};
	},
	onLoad: function(option) {
		this.ioanType = option.ioanType; // 核查分类
		this.currentserno = option.serno; // 任务编号
		this.isChange = option.isChange ? option.isChange : ''; //是否是修改操作

		console.log(option); //打印出上个页面传递的参数。
		cityFormat = this.doFormateTreeFun(citydatas, '');
		this.multiArray[0] = cityFormat[0].zchild;
		this.multiArray[1] = cityFormat[0].zchild[0].zchild;
		this.multiArray[2] = cityFormat[0].zchild[0].zchild[0].zchild ? cityFormat[0].zchild[0].zchild[0].zchild : [];
		console.log('cityFormat', cityFormat);
		if (this.isChange == 'true') {
			// 查询已有参数;
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
		}
	},
	onNavigationBarButtonTap(e) {
		alert('提交');
		console.log('dddd:', this.checkItem);
	},
	methods: {
		//贷后现场检查
		toCheck: function() {
			this.$request
				.post({
					url: 'es/json/EsPostDeliveryCheck',
					data: {
						serno: '', //	任务编号
						cus_type: '', //	贷后检查客户类型
						check_add_cont13: '', //	检查时间
						check_add_cont14: '', //	检查地点
						check_add_cont15: '', //	参与检查的人员
						check_add_cont16: '', //	接待人员
						check_add_cont17: '', //	是否拍照留存
						check_add_cont19: '', //	客户是否配合检查
						check_add_cont20: '' //备注
					}
				})
				.then(res => {
					if (res.data.response.header.returnCode == '00000000') {
						console.log('贷后现场检查');
					}
				})
				.catch(err => {});
		},
		//
		radioChangeAddr: function(evt) {
			for (let i = 0; i < this.checkAddressitems.length; i++) {
				if (this.checkAddressitems[i].value === evt.target.value) {
					this.checkParam.address = i;
					break;
				}
			}
		},
		radioChangejoin: function(evt) {
			for (let i = 0; i < this.jointems.length; i++) {
				if (this.jointems[i].value === evt.target.value) {
					this.checkParam.joinperson = i;
					break;
				}
			}
		},
		checkboxChangejoin: function(e) {
			var items = this.jointems,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
		},
		radioChangerecept: function(evt) {
			for (let i = 0; i < this.receptiontems.length; i++) {
				if (this.receptiontems[i].value === evt.target.value) {
					this.checkParam.reception = i;
					break;
				}
			}
		},
		checkboxChangerecept: function(e) {
			var items = this.receptiontems,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
		},
		addressHandle: function(e) {
			this.checkParam.address = 'hhhhhhhhh' + this.detailAddress;
		},
		addressCance: function(e) {
			this.checkParam.address = '';
			this.detailAddress = '';
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
