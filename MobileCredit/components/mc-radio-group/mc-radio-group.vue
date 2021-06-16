<template>
	<view class="mcform" :class="{ left: left }">
		<radio-group @change="radioChange($event, 'dd', 'popup')" :disabled="disableded" class="mcradio" ref="radioGroup"><slot></slot></radio-group>
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
			disableded: false
		};
	},
	created() {
		this.current.value = this.value;
		this.dataArr = this.data;
		this.disableded = this.disabled;
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '-请选择-'
		},
		left: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		this.$refs.radioGroup.$children.map((item, index) => {
			this.$refs.radioGroup.$children[index]._data.leftbtnt = this.left;
			this.$refs.radioGroup.$children[index]._data.current = this.current.value;
			this.$refs.radioGroup.$children[index]._data.disableded = this.disableded;
		});
	},
	methods: {
		radioChange: function(evt, type, open) {
			var arr = evt.target.value.split('~m~~~~c~');
			this.current = {
				value: arr[0],
				label: arr[1]
			};
			this.$emit('input', arr[0]);
		}
	},
	watch: {
		value() {
			this.$refs.radioGroup.$children.map((item, index) => {
				this.$refs.radioGroup.$children[index]._data.current = this.value;
			});
			this.$forceUpdate();
		},
		disabled() {
			this.disableded = v;
			alert('disableded', this.disableded);
			this.$refs.radioGroup.$children.map((item, index) => {
				this.$refs.radioGroup.$children[index]._data.disableded = this.disableded;
			});
		}
	}
};
</script>

<style scoped lang="scss">
.mcform {
	padding: 0;
	touch-action: pan-y;
	margin-bottom: 0 !important;
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
.mcform.left uni-radio-group,
.mcform.left uni-checkbox-group {
	display: flex;
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
	transform: translate(-50%, -50%) scale(0.73);
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
.topborderGap {
	border-top: 1px solid #dddddd;
}
.uni-list-cell:first-child {
	border: none;
}
</style>
