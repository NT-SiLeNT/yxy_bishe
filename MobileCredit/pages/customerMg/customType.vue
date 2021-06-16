<template>
	<view class="wrap" style="height: 100%;">
		<view class="custPartTitle">请选择客户分类</view>
		<button type="" class="mc-btn-primary widthBig primary" @click="toLink('/pages/customerMg/customerAdd?custType=2')">正式客户</button>
		<button type="" class="mc-btn-primary widthBig temporary" @click="toLink('/pages/customerMg/customerAdd?custType=1')">临时客户</button>
		<button type="" class="mc-btn-primary widthBig orange" @click="toLink('/pages/customerMg/customerAdd?custType=3')">担保客户</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		// 01 临时客户
		// 05 担保客户
		// 20 正式客户
		toLink(pageurl) {
			uni.redirectTo({
				url: pageurl
			});
		},
	}
};
</script>

<style scoped lang="scss">
.custPartTitle {
	margin-top: 48rpx;
	margin-bottom: 40rpx;
}
button.widthBig {
	width: auto;
	margin: 30rpx;
	height: 120rpx;
	line-height: 120rpx;
	font-size: 40rpx;
	margin-bottom: 40rpx;
}
.primary {
	// background: linear-gradient(90deg, #5d92ff 20%, #60aaff);
	background: image-set(url('@/static/img/zskhbg.png') 1x, url('@/static/img/zskhbg@2x.png') 2x, url('@/static/img/zskhbg@3x.png') 3x) no-repeat center center;
	background-size: cover;
}
.temporary {
	// background: linear-gradient(90deg, #43bf73 20%, #62d789);
	background: image-set(url('@/static/img/lskhbg.png') 1x, url('@/static/img/lskhbg@2x.png') 2x, url('@/static/img/lskhbg@3x.png') 3x) no-repeat center center;
	background-size: cover;
}
.orange {
	// background: linear-gradient(90deg, #F6772E 20%, #ffb538);
	background: image-set(url('@/static/img/dbkhbg.png') 1x, url('@/static/img/dbkhbg@2x.png') 2x, url('@/static/img/dbkhbg@3x.png') 3x) no-repeat center center;
	background-size: cover;
}
</style>
