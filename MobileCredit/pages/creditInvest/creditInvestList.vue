<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" :isBgImg="true" v-if="item">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">姓名</span>
								<span class="mccontent">{{ item.name ? item.name : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">身份证号</span>
								<span class="mccontent">{{ item.cretno ? item.cretno : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">查询人</span>
								<span class="mccontent">{{ item.pdfpath2 ? item.pdfpath2 : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">查询时间</span>
								<span class="mccontent">{{ item.createdate ? item.createdate : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">征信流水号</span>
							<span class="mccontent">{{ item.contentid2 ? item.contentid2 : '-' }}</span>
							<button type="" v-if="item.contentid2" v-copy="item.contentid2" class="mc-min-btn-primarybg copybtn">复制</button>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">征信报告地址</span>
							<span class="mccontent uni-ellipsis " :class="{linkclor:item.pdfpath1 ? true:false}" @click="(item.pdfpath1 ? toViewReport(item.pdfpath1):'')">{{ item.pdfpath1 ? item.pdfpath1 : '-' }}</span>
							<button type="" v-if="item.pdfpath1" v-copy="item.pdfpath1" class="mc-min-btn-primarybg copybtn">复制</button>
						</view>
					</view>
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData">{{ loadMoreText }}</view>
		</block>
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')" class="mcdrawer">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="height-status">
				<view class="headediv">
					<view class="floatleft" :hover-start-time="20" :hover-stay-time="70" @click="hide">&#215;</view>
					<view class="floatright" @click="resetSearch('btn')">重置</view>
				</view>
			</view>
			<view class="mcform">
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">姓名</view>
					<input v-model="search.name" type="text" class="uni-input" value="" placeholder="请输入姓名" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">身份证号</view>
					<input v-model="search.cretno" type="text" class="uni-input" value="" placeholder="请输入身份证号" />
				</view>
			</view>
			<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="toSearch()">确定</button></view>
		</uni-drawer>
	</view>
</template>

<script>
import { selectdata } from '../customerMg/select.js';
export default {
	data() {
		return {
			selectdata: selectdata,
			accountInfo: {},
			listData: [], // 显示的列表数据
			firstQuery: true, //进入第一次请求数据
			search: {
				name: '',
				cretno: ''
			},
			serchBtnClick: false, //是否点击确定按钮
			showRight: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			queryClick: false,
			numFinish: false,
			pageSize: 10, // 每页条数
			startCount: 1 // 开始页数
		};
	},
	computed: {},
	onShow() {
		var _this = this;
		uni.getStorage({
			key: 'scrollSave',
			success: function(res) {
				if (res.data) {
					if (_this.$androidenv) {
						document.getElementsByTagName('body')[0].scrollTop = res.data;
						return;
					}
					document.getElementsByTagName('html')[0].scrollTop = res.data;
				}
			}
		});
	},
	onPullDownRefresh() {
		this.resetSearch('btn');
		//刷新初始化数据
		this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始页数
		this.showLoadMore = false;
		this.firstQuery = true;
		this.queryClick = false;
		//调用获取数据的函数
		this.queryList();
	},
	onReachBottom() {
		if (this.numFinish) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.showLoadMore = true;
		this.pageSize = 10;
		this.startCount = this.startCount * 1 + 1;
		this.queryClick = false;
		setTimeout(() => {
			this.queryList();
		}, 0);
	},
	onNavigationBarButtonTap(e) {
		this.show();
	},
	onBackPress() {
		this.hide();
		uni.setStorage({
			key: 'scrollSave',
			data: 0,
			success: function() {}
		});
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option); //打印出上个页面传递的参数。
	},
	mounted() {
		uni.setStorage({
			key: 'scrollSave',
			data: 0,
			success: function() {}
		});
		(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
		var _this = this;
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				_this.accountInfo = res.data;
			}
		});
		// this.listData = [1, 2, 3, 4, 5];
		this.queryList();
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		queryList: function() {
			//客户信息列表查询 --
			this.$request
				.post({
					url: 'CreditInformation/v1/Query',
					data: {
						userid: this.accountInfo.actorno, //身份证正面
						name: this.search.name ? this.search.name : '', //名称
						cretno: this.search.cretno ? this.search.cretno : '', //身份证号码
						page: this.startCount.toString(), //	开始记录数
						count: this.pageSize.toString() //	查询条数
					}
				})
				.then(res => {
					res = res.result[0];
					if (this.firstQuery) {
						this.listData = [];
					}
					if (res.head.returnCode == '00000000' && res.content.List && res.content.List.length) {
						console.log('所有数据', res);
						var listData = res.content.List;
						if (listData.length != this.pageSize * 1 || listData.length < this.pageSize * 1) {
							this.numFinish = true;
							if (this.queryClick && listData.length == 0) {
								this.showLoadMore = false;
							} else {
								this.showLoadMore = true;
								this.loadMoreText = '没有更多数据了!';
							}
						}
						this.listData = this.listData.concat(listData);
					} else {
						this.numFinish = true;
						if (!this.firstQuery) {
							this.showLoadMore = true;
							this.loadMoreText = '没有更多数据了!';
						}
						if (this.queryClick) {
							this.showLoadMore = false;
						} else {
							if (res.head.returnCode != '00000000') {
								uni.showToast({
									title: res.head.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						}
					}
					this.firstQuery = false;
					uni.stopPullDownRefresh();
				})
				.catch(err => {
					this.numFinish = false;
					this.firstQuery = false;
					uni.stopPullDownRefresh();
				});
		},
		toViewReport(url) {
			uni.setStorage({
				key: 'zxurl',
				data: '',
				success: function() {}
			});
			uni.setStorage({
				key: 'zxurl',
				data: url,
				success: function() {
					uni.navigateTo({
						url: '/pages/indetificationCust/docPage?docType=2'
					});
				}
			});
		},
		toSearch() {
			this.serchBtnClick = true;
			this.showRight = false;
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			this.queryClick = true;
			this.firstQuery = true;
			this.queryList();
		},
		resetSearch(btn) {
			if (btn) {
				this.serchBtnClick = false;
			}
			console.log('点击重置按钮');
			this.search.name = '';
			this.search.cretno = '';
		},
		show(e) {
			this.showRight = true;
		},
		hide() {
			this.showRight = false;
		},
		// 关闭筛选条件
		closeDrawer(e) {
			if (!this.serchBtnClick) {
				this.resetSearch();
			}
			this.showRight = false;
		}
	}
};
</script>

<style scoped lang="scss">
uni-page-body {
	display: block;
	height: 100%;
}
.wrap {
	padding-top: 32rpx;
	box-sizing: border-box;
}
.uni-card {
	margin: 32rpx;
}
.uni-card:first-child {
	margin-top: 0;
}
.wrap .mc-min-btn-primarybg {
	padding: 0 2px;
	margin: 0;
	margin-right: 22rpx;
}
.mcitem.btnline {
	margin: 10rpx 0 14rpx;
	margin-left: 28rpx;
}
.mcdrawer .height-status {
	height: calc(44px + constant(safe-area-inset-top));
	height: calc(44px + env(safe-area-inset-top));
}
.headediv {
	display: flex;
	justify-content: space-between;
	padding: 0 40rpx;
	height: 100%;
	align-items: center;
}
.mcdrawer .floatleft {
	/* float: left; */
	color: rgb(0, 0, 0);
	font-size: 58rpx;
}
.mcdrawer .floatright {
	/* float: right; */
	font-family: PingFang-SC-Medium;
	font-size: 32rpx;
	color: #626366;
}
.mcdrawer {
	/* position: relative; */
}
.bottomBtn {
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 80rpx;
}
.mcdrawer.uni-drawer /deep/ .uni-drawer__content {
	width: 80%;
}
.uni-input.linebtn {
	padding-right: 0;
	height: auto;
}
.mc-min-btn-primaryplan {
	border-color: $mc-text-weak;
	color: $mc-text-caption;
	margin-right: 14rpx;
	line-height: 48rpx;
	padding: 0 12rpx;
	font-size: 24rpx;
	margin-bottom: 14rpx;
}
.mc-min-btn-primaryplan.checked {
	background: $mc-color-babyblue;
	color: #ffffff;
	border-color: $mc-color-babyblue;
}
.inline-btn-right {
	margin-right: 20rpx;
}
.inline-btn .mc-min-btn-waring {
	float: left;
	margin-left: 30rpx;
}
.linkclor{
	color:#5d92ff
}
</style>
