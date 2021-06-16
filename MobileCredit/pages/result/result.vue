<template>
	<view>
		<view class="w100">
			<view class="mc-padding-wrap">
				<view class="resrow icon" :class="{ success: isSuccess }"></view>
				<view class="resrow text" :class="{ success: isSuccess }">
					<span v-if="loanType">{{ isSuccess ? '现场核查成功' : '现场核查失败' }}</span>
					<span v-if="custOper && custOper == 1">{{ isSuccess ? '新增客户成功' : '新增客户失败' }}</span>
					<span v-if="custOper && custOper == 2">{{ isSuccess ? '修改客户成功' : '修改客户失败' }}</span>
					<span v-if="indet">{{ isSuccess ? '联网核查成功' : '联网核查失败' }}</span>
					<span v-if="appOper && appOper == 1">{{ isSuccess ? '提交成功' : '提交失败' }}</span>
				</view>
				<view class="resrow  errorWhy" v-if="!isSuccess">
					<view class="err-title">失败原因：</view>
					<view class="err-text">{{ $store.state.errmsg }}</view>
				</view>
			</view>
		</view>
		<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="toSearch()">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isSuccess: false,
			custOper: '1',
			loanType: '',
			indet:false,
			isbind:false,
			appOper:'1'
		};
	},
	onLoad: function(option) {
		this.isSuccess = JSON.parse(option.isSuccess); // 成功失败
		this.loanType = option.loanType; // 核查分类
		this.custOper = option.custOper; // 1 新增  2 修改
		this.indet = option.indet; // 客户识别
		this.appOper = option.appOper;
	},
	onBackPress() {
		if(this.isbind){
			uni.navigateBack({
				delta:2
			})
			return true;
		}
	},
	methods: {
		toSearch() {
			uni.navigateBack();
		}
	}
};
</script>

<style scoped>
.mc-padding-wrap {
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
	padding-top: 200rpx;
	box-sizing: border-box;
	padding-bottom: 1px;
}
.w100 {
	/* height: 70%; */
	/* height: 770rpx; */
	/* height: 900rpx; */
}
.bottomBtn {
	padding: 40rpx;
	box-sizing: border-box;
	padding-top: 0;
}
.bottomBtn .mc-btn-primary {
	width: 100%;
}
.resrow.icon {
	margin: 0 auto 40rpx;
	height: 130rpx;
	background: url(../../static/img/false@2x.png) no-repeat center;
	background-size: contain;
}
.resrow.icon.success {
	background: url(../../static/img/cgicon@2x.png) no-repeat center;
	background-size: contain;
}
.resrow.text {
	font-size: 36rpx;
	color: #333333;
	letter-spacing: 0;
	line-height: 36rpx;
}
.resrow.text.success {
	margin-bottom: 300rpx;
}
.errorWhy {
	max-height: 200rpx;
	background: #f8f9fd;
	margin: 40rpx 60rpx 80rpx;
	text-align: left;
	border-top: 1px solid #d9e7fc;
	padding: 32rpx 40rpx;
	overflow-y: auto;
}
.errorWhy .err-title {
	font-size: 24rpx;
	color: #939599;
	letter-spacing: 0;
	line-height: 24rpx;
}
.errorWhy .err-text {
	font-size: 28rpx;
	color: #626366;
	line-height: 44rpx;
}
</style>
