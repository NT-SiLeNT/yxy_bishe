<template>
	<view class="mcformradio">
		<label class="uni-list-cell uni-list-cell-pd">
			<view><checkbox :value="value + '~m~~~~c~' + label" :checked="current.indexOf(value) != -1 ? true : false" /></view>
			<view>{{ label }}</view>
		</label>
	</view>
</template>

<script>
export default {
	data() {
		return {
			leftbtnt: false,
			current: '',
			currentArr: [],
			notValue: ''
		};
	},
	created() {},
	mounted() {
		if (this.current) {
			this.currentArr = this.current.split(',');
		}
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		}
	}
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
</style>
