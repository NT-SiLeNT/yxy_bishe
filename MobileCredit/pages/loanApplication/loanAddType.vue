<template>
	<view class="wrap" style="height: 100%;">
		<block v-if="loanType == 2">
			<uni-card>
				<view class="menuwrap">
					<h5 class="menuTitle">个人经营贷款产品</h5>
					<ul class="menulist clearfix">
						<li @click="toLink('/pages/loanApplication/newAddLoan?prdcode=022022')">
							<view class="menu-icon"><image src="../../static/dqsq/grjydk1@2x.png" mode=""></image></view>
							<view class="menu-text">个人经营贷款</view>
						</li>
					</ul>
				</view>
			</uni-card>
		</block>
		<block v-else>
			<uni-card>
				<view class="menuwrap">
					<h5 class="menuTitle">个人消费贷款产品</h5>
					<ul class="menulist clearfix">
						<li v-for="(item, index) in prdListPers" @click="toLink('/pages/loanApplication/newAddLoan?prdcode=' + item.value)">
							<view class="menu-icon"><image :src="item.img" mode=""></image></view>
							<view class="menu-text">{{ item.name }}</view>
						</li>
					</ul>
				</view>
			</uni-card>
		</block>
	</view>
</template>

<script>
import { selectdata } from './select.js';
export default {
	data() {
		return {
			loanType: '1',
			prdListPers: []
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.loanType = option.loanType;
		console.log(option); //打印出上个页面传递的参数。
	},
	mounted() {
		this.prdListPers = JSON.parse(JSON.stringify(selectdata.prd_code)).splice(1);
		this.$forceUpdate()
	},
	methods: {
		// 01 临时客户
		// 05 担保客户
		// 20 正式客户
		toLink(pageurl) {
			uni.redirectTo({
				url: pageurl
			});
		}
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
.uni-card {
	margin: 32rpx;
	border-radius: 32rpx;
}
.menuwrap {
}
.menuTitle {
	font-family: PingFang-SC-Bold;
	font-size: 32rpx;
	color: $mc-text-title;
	letter-spacing: 0;
	font-weight: bold;
	text-align: left;
	line-height: 98rpx;
	margin: 0 32rpx;
	margin-bottom: 14rpx;
}
.menulist {
	margin: 0 32rpx;
	margin-bottom: 32rpx;
}
.menulist > li {
	width: 25%;
	float: left;
	text-align: center;
	padding: 0 20rpx;
	box-sizing: border-box;
	margin-bottom: 20px;
}

.menulist .menu-icon {
	width: 48rpx;
	height: 48rpx;
	margin: auto;
	margin-bottom: 20rpx;
}
.menulist .menu-icon uni-image {
	width: 100%;
	height: 100%;
}
.menulist .menu-text {
	font-family: PingFang-SC-Regular;
	font-size: 24rpx;
	color: $mc-text-color;
	letter-spacing: 0;
	line-height: 32rpx;
}
li.widthBig {
	padding: 0 6rpx;
}
</style>
