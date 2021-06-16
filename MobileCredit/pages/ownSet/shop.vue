<template>
	<view>
		<!-- 选项卡 -->
		<view>
			<view style="border-left: none;" :class="['li-card',mainShow==0?'li-card-a':'']" @click="mainShow=0">精选好物
			</view>
			<view :class="['li-card',mainShow==1?'li-card-a':'']" @click="mainShow=1">吃穿住行</view>
			<view :class="['li-card',mainShow==2?'li-card-a':'']" @click="mainShow=2">定制商品</view>
			<view :class="['li-card',mainShow==3?'li-card-a':'']" @click="mainShow=3">会员体验</view>
		</view>
		<view>
			<!-- 精选好物 -->
			<view v-show="mainShow == 0">
				<uni-card v-for="(item,index) in shopList" :key="index">
						<image :src="item.src"/>
						<a>{{item.name}}<br>{{item.pich}}积分</a>
						<button @click="toSubmit(index)">兑 换</button>
				</uni-card>
			</view>
			<!-- 吃穿住行 -->
			<view v-show="mainShow == 1">
				<uni-card v-for="(item,index) in shopList1" :key="index">
						<image :src="item.src"/>
						<a>{{item.name}}<br>{{item.pich}}积分</a>
						<button @click="toSubmit(index)">兑 换</button>
				</uni-card>
			</view>
			<!-- 定制商品 -->
			<view v-show="mainShow == 2">
				<uni-card v-for="(item,index) in shopList2" :key="index">
						<image :src="item.src"/>
						<a>{{item.name}}<br>{{item.pich}}积分</a>
						<button @click="toSubmit(index)">兑 换</button>
				</uni-card>
			</view>
			<!-- 会员体验 -->
			<view v-show="mainShow == 3">
				<uni-card v-for="(item,index) in shopList2" :key="index">
						<image :src="item.src"/>
						<a>{{item.name}}<br>{{item.pich}}积分</a>
						<button @click="toSubmit(index)">兑 换</button>
				</uni-card>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList:[{
					name:"蓝牙运动耳机",
					pich:"133",
					src:require("./shopImg/erji.jpg") 
				},
				{
					name:"保温杯",
					pich:"122",
					src:require("./shopImg/beizi.jpg") 
				},
				{
					name:"美白面膜",
					pich:"10",
					src:require("./shopImg/mianmo.png")
				},
				
				{
					name:"晴雨两用伞",
					pich:"158",
					src:require("./shopImg/umbrella.jpg")
				}],
				shopList1:[{
					name:"饿了么超级吃货周卡",
					pich:"60",
					src:require("./shopImg/elm.png") 
				},
				{
					name:"美团单车4.5折骑行卡",
					pich:"59",
					src:require("./shopImg/meituan.png") 
				},
				{
					name:"必胜客88元美食券",
					pich:"88",
					src:require("./shopImg/pizza.png")
				},
				
				{
					name:"良品铺子100减20满减券",
					pich:"5",
					src:require("./shopImg/liangpin.jpg")
				}],
				shopList2:[{
					name:"定制相册",
					pich:"79",
					src:require("./shopImg/xiangce.jpg") 
				},
				{
					name:"定制帽子",
					pich:"69",
					src:require("./shopImg/hat.jpg") 
				},
				{
					name:"定制水杯",
					pich:"79",
					src:require("./shopImg/dzbeizi.jpg")
				},				
				{
					name:"定制拖鞋",
					pich:"69",
					src:require("./shopImg/tuoxie.jpg")
				}],
				shopList3:[{
					name:"爱奇艺黄金月卡",
					pich:"300",
					src:require("./shopImg/aqy.png") 
				},
				{
					name:"5折百度网盘月卡",
					pich:"100",
					src:require("./shopImg/baidu.png")
				},
				{
					name:"腾讯视频月卡",
					pich:"300",
					src:require("./shopImg/tencent.png")
				},				
				{
					name:"QQ超级会员月卡7折",
					pich:"20",
					src:require("./shopImg/QQ.png")
				}],
				mainShow: 0,
				custInfo: this.$store.state.accountInfos
			}
		},
		methods: {
			toLink(pageurl) {
				uni.navigateTo({
					url: pageurl
				});
			},
			changeTab(mainShow) {
				that.navIndex = mainShow;
			},
			buyProduct:function(index){
				let shopList = this.shopList; 
				let custInfo = this.custInfo.result;
				uni.request({
					url: 'http://localhost:8888/web/order/buyProduct',
					method: 'POST',
					// data: {"head":{},"content"{}},
					data: {
						'head':{},
						'content':{
							'userId':custInfo.certCode,
							'productId':shopList[index].name,
							'num':shopList[index].pich
						}
					}, 
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			toSubmit(index) {
				let _self = this
				uni.showModal({  
					content: '是否确认兑换？',
					success: e => {
						if (e.confirm) {
							_self.buyProduct(index);
						}
					},
					fail: () => {}
				});
			


			}
		}

	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
	}

	/* 选项卡 */
	.li-card {
		display: flex;
		margin: 33rpx 0 33rpx 13rpx;
		width: 22%;
		list-style-type: none;
		display: inline-block;
		font-size: 0.8rem;
		color: gray;
		border-left: 0.05rem solid #ccc;
		text-align: center;
	}

	.li-card-a {
		color: #5d92ff;
		font-weight: bold;
	}

	button {
		width: 100rpx;
		height: 68rpx;
		font-size: 0.8rem;
		float: right;
		margin-top: 40rpx;
		padding: 0;
		background-color: #5d92ff;
		text-align: center;
		display: flex;
		justify-content: center;
		color: #ffffff;
	}

	/* 列表商品 */
	image {
		float: left;
		width: 100rpx;
		height: 100rpx;
		margin: 25rpx 25rpx 10rpx 25rpx;
		background: no-repeat center;
	}

	a {
		float: left;
		margin-top: 25rpx;
		line-height: 45rpx;
	}
</style>
