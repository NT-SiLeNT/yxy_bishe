<template>
	<view class="mcformradio">
		<label class="uni-list-cell uni-list-cell-pd" :class="{'topborderGap':leftbtnt==false?true:false,disabledtext:disableded}">
			<view v-if="leftbtnt == false">{{ label }}</view>
			<view><radio :disabled="disableded" :value="value+'~m~~~~c~'+label" :checked="current == value" /></view>
			<view v-if="leftbtnt == true">{{ label }}</view>
		</label>
	</view>
</template>

<script>
export default {
	data() {
		return {
			leftbtnt:false,
			current:'',
			disableded:false,
		};
	},
	created() {
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		disabled:{
			type:Boolean,
			default:false
		}
	},
};
</script>

<style lang="scss" scoped>
.mcformradio {
	padding: 0;
}
.mcformradio .uni-list-cell::after {
	display: none !important;
}
.mcformradio uni-radio-group,
.mcformradio uni-checkbox-group {
	font-size: 28rpx;
	color: $mc-text-checkTitle;
}
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
	min-width: 60%;
}
.mcradio .uni-list-cell {
	justify-content: space-between;
	padding: 0;
	line-height: 90rpx;
	padding: 0 30rpx;
	color: $mc-text-title;
	font-family: PingFang-SC-Bold;
}
.topborderGap {
	border-top: 1px solid #dddddd;
}
.mcformradio /deep/ uni-radio .uni-radio-input.uni-radio-input-checked:before {
	content: '';
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background: #fff;
	transform: translate(-50%,-50%) scale(.73);
	
}
</style>
