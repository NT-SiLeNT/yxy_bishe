<template>
	<view>
		<view class="mianRadius mcform">
			<view v-if="!rename" class="mcselect" :class="{disabledtext:disabled}" @click="disabled == true ? '' : showSelect('ee', 'popup')">
				<span v-if="!value" class="placeholderss">{{ placeholder }}</span>
				<block v-else>
					<span>{{ current.label }}</span>
					<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
				</block>
				<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
				<!-- &#xe623; -->
				<span class="iconfont icons" v-else>&#xe606;</span>
				<!-- &#xe606; -->
			</view>
			<uni-popup :maskClick="rename ? false : true" ref="showpopup" class="maxwrap showpopuppopselect" type="center" @onClose="isOpen = $event">
				<view v-if="!rename" class="select-dialog-wrap">
					<view class="uni-tip-title-row topborderGap">
						<text class="uni-tip-title">请选择</text>
						<span class="uni-tip-close iconfont" @click="cancel('', 'popup')">&#xe601;</span>
					</view>
					<view class="mcradio-wrap" id="mcradiowrap">
						<radio-group v-if="!multiple" @change="radioChange($event, 'dd', 'popup')" @click="radioChange1($event, 'dd', 'popup')" class="mcradio" ref="radioGroup">
							<slot v-if="!data.length"></slot>
							<label v-else class="uni-list-cell uni-list-cell-pd topborderGap" v-for="(item, index) in dataArr" :key="item.value">
								<view>{{ item.label }}</view>
								<view><radio :value="item.value + '~m~~~~c~' + item.label" :checked="item.value === value" /></view>
							</label>
						</radio-group>
						<checkbox-group v-if="multiple" @change="checkboxChange($event, 'dd', 'popup')" class="mcradio" ref="radioGroup">
							<slot v-if="!data.length"></slot>
							<label v-else class="uni-list-cell uni-list-cell-pd topborderGap" v-for="(item, index) in dataArr" :key="item.value">
								<view>{{ item.label }}</view>
								<view>
									<checkbox
										:value="item.value + '~m~~~~c~' + item.label"
										:disabled="disabled == true ? true : current.value.indexOf(notValue) != -1 && notValue != item.value ? true : false"
										:checked="current.value.indexOf(item.value) != -1"
									/>
								</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				
				<view v-if="rename" class="select-dialog-wrap">
					<view class="uni-tip-title-row topborderGap" style="justify-content: center;"><text class="uni-tip-title">请输入文件名</text></view>
					<view class="mcradio-wrap" id="mcradiowrap">
						<input type="text" v-model="name" class="uni-input" style="margin: 50rpx 50rpx; border: 1px solid #c8c7cc; border-radius: 10px;" />
					</view>
					<button type="" class="mc-min-btn-primary" style="margin-bottom: 50rpx;" @click="saveName('dd', 'popup')">确定</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import { citydatas } from '@/common/cityDatas.js';
var cityFormat = [];
var onlyNum = 0;
export default {
	data() {
		return {
			current: {},
			isOpen: false,
			dataArr: [],
			name: '',
			showP: false,
			nameList:[],//取得的名字数组
		};
	},
	created() {
		for (var i = 0; i < this.data.length; i++) {
			if (this.value == this.data[i].value) {
				this.current = this.data[i];
			}
		}
		this.dataArr = this.data;
		if (this.rename) {
			this.name = this.value;
			this.showP = this.show;
		}
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false
		},
		data: {
			type: Array,
			default: function() {
				return [];
			}
		},
		placeholder: {
			type: String,
			default: '-请选择-'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		notValue: {
			default: 'not'
		},
		multiple: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		rename: {
			type: Boolean,
			default: false
		},
		nameLists: {
			type: Array,
			default: function() {
				return [];
			}
		},
		nameIndexn: {
			default: ''
		}
	},
	mounted() {
		this.nameList = this.nameLists
	},
	watch: {
		isOpen() {
			if (this.rename) {
				return;
			}
			if (this.isOpen == true) {
				var _this = this;
				setTimeout(function() {
					if (!_this.data.length) {
						_this.$refs.radioGroup.$children.map((item, index) => {
							if (_this.value == item.value) {
								_this.current = item;
							}
							_this.dataArr.push({
								value: item.value,
								label: item.label
							});
						});
					}
				}, 60); // 50的时候就取不到值了
			}
		},
		value() {
			if (this.rename) {
				this.name = this.value;
			}
			for (var i = 0; i < this.data.length; i++) {
				if (this.value == this.data[i].value) {
					this.current = this.data[i];
				}
			}
		},
		data() {
			this.dataArr = this.data;
		},
		show() {
			this.showP = this.show;
			if (this.show) {
				this.showSelect('ee', 'popup');
			} else {
				this.cancel('ee', 'popup');
			}
		},
		nameLists:{
			handler(v) {
				this.nameList = this.nameLists
			},
			deep: true
		}
	},
	methods: {
		clearValue() {
			this.$emit('input', '');
		},
		showSelect(type, open) {
			this.$nextTick(() => {
				this.$refs['show' + open].open();
				this.isOpen = true;
			});
		},
		cancel(type, open) {
			// this.$emit('getShowChange', false);
			this.$refs['show' + open].close();
			this.isOpen = false;
		},
		radioChange1: function(evt, type, open) {
			var _this = this;
			setTimeout(function() {
				_this.cancel(type, open);
			}, 80);
		},
		radioChange: function(evt, type, open) {
			var arr = evt.target.value.split('~m~~~~c~');
			this.current = {
				value: arr[0],
				label: arr[1]
			};

			this.$emit('input', arr[0]);
			var _this = this;
			setTimeout(function() {
				_this.cancel(type, open);
			}, 80);
		},
		nameOnlyOne() {
			var s = true;
			var namelist = JSON.parse(JSON.stringify(this.nameList));
			// 有值时去掉这个值进行比对
			if (this.nameIndexn !== '') {
				namelist.splice(namelist.indexOf(this.nameIndexn), 1);
			}
			for (var i = 0; i < namelist.length; i++) {
				if (namelist[i] == this.name) {
					s = false;
					break;
				}
			}
			return s;
		},
		saveName: function(type, open) {
			var reg = /^[\u4e00-\u9fa5\w_]*$/g;
			var test = reg.test(this.name);
			if (!test) {
				uni.showToast({
					title: '文件名为字母或数字或下划线或汉字',
					icon: 'none',
					duration: 1500
				});
				return;
			}
			if (this.nameOnlyOne()) {
				this.$emit('input', this.name);
				var _this = this;
				setTimeout(function() {
					_this.showP = false;
					_this.$emit('showP', _this.showP);
					_this.cancel(type, open);
				}, 80);
			} else {
				uni.showToast({
					title: '文件名不能重复',
					icon: 'none',
					duration: 1500
				});
			}
		},
		checkboxChange: function(evt, type, open) {
			console.log('ec', evt);
			var arr = evt.target.value;
			var arrdata = [];
			for (var i = 0; i < arr.length; i++) {
				var spres = arr[i].split('~m~~~~c~');
				arrdata.push(spres[0]);
			}
			this.current.value = arrdata.join(',');
			console.log('this.dfd', this.current.value);
			if (this.current.value.indexOf(this.notValue) != -1) {
				this.current.value = this.notValue;
			}
			this.$forceUpdate();
			this.$emit('input', arrdata.join(','));
		}
	},
	beforeDestroy() {
		var pop = document.getElementsByClassName('showpopuppopselect');
		if (pop[0]) {
			pop[0].style.display = 'none';
		}
	}
};
</script>

<style scoped lang="scss">
.mcform {
	padding: 0;
	touch-action: pan-y;
}
.bottomGap::after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
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
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
	min-width: 60%;
	max-height: 50%;
	overflow: auto;
	border-radius: 20rpx;
}
.mcradio /deep/ uni-radio .uni-radio-input.uni-radio-input-checked:before {
	content: '';
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background: #fff;
}
.mcradio-wrap {
	height: 100%;
	overflow: auto;
}
.mcradio .uni-list-cell {
	justify-content: space-between;
	padding: 0;
	line-height: 90rpx;
	padding: 0 30rpx;
	color: $mc-text-title;
	font-family: PingFang-SC-Bold;
}
.select-dialog-wrap {
	background-color: #fff;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}
.uni-tip-title-row {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 30rpx 20rpx;
	line-height: 1;
}
.uni-tip-title-row.topborderGap {
	border: none;
	border-bottom: 1px solid #dddddd;
}
.mcselect {
	line-height: 88rpx;
	height: 88rpx;
}
.mcselect .placeholderss {
	color: #c4c7cc;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-color;
	letter-spacing: 0;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
}
.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
.icons.clear {
	color: #ccc;
	font-size: 32rpx;
	vertical-align: middle;
	margin: auto;
	margin-left: 10px;
}
.topborderGap {
	border-top: 1px solid #dddddd;
}
.uni-list-cell:first-child {
	border: none;
}
.mianRadius {
	border-radius: 0;
	box-shadow: none;
}
</style>
