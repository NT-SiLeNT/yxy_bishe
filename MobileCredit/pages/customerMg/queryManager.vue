<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">用户码</span>
								<span class="mccontent">{{ item.actorno ? item.actorno : '-' }}</span>
							</view>
							<view>
								<span class="mclabel">姓名</span>
								<span class="mccontent">{{ item.actorname ? item.actorname : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">所属机构</span>
								<span class="mccontent">{{ item.orgid ? item.orgid : '-' }}</span>
							</view>
							<view>
								<span class="mclabel">联系电话</span>
								<span class="mccontent">{{ item.telnum ? item.telnum : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">所属机构名称</span>
							<span class="mccontent">{{ item.orgid_name ? item.orgid_name : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">身份证号</span>
							<span class="mccontent">{{ item.idcardno ? item.idcardno : '-' }}</span>
						</view>
					</view>
					<view class="inline-btn inline-btn-right"><button class="mc-min-btn-primary" @click="selectOne(item)">选定</button></view>
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
					<view class="title">用户码</view>
					<input v-model="search.actorno" type="text" class="uni-input" value="" placeholder="请输入用户码" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">姓名</view>
					<input v-model="search.actorname" type="text" class="uni-input" value="" placeholder="请输入姓名" />
				</view>
			</view>

			<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="toSearch()">确定</button></view>
		</uni-drawer>
	</view>
</template>

<script>
export default {
	data() {
		return {
			accountInfo: {},
			listData: [], // 显示的列表数据
			firstQuery: true, //进入第一次请求数据
			search: {
				actorno: '',
				actorname: ''
			},
			serchBtnClick: false, //是否点击确定按钮
			showRight: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			numFinish: false,
			queryClick: false,
			type: '', //类型-是
			pageSize: 10, // 每页条数
			startCount: 1 // 开始页数
		};
	},
	computed: {},
	onPullDownRefresh() {
		this.resetSearch('btn');
		//刷新初始化数据
		this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始记录数
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
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option); //打印出上个页面传递的参数。
		this.type = option.type ? option.type : '';
	},
	mounted() {
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
					url: 'creditQueryUserInformation/v1/creditquery',
					data: {
						actorno: this.search.actorno,
						actorname: this.search.actorname,
						iscusmger:'',
						state:'1',//1正常的客户 空全部客户
						page: this.startCount.toString(), //	开始记录数
						count: this.pageSize.toString() //	查询条数
					}
				})
				.then(res => {
					if (this.firstQuery) {
						this.listData = [];
					}
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						console.log('所有数据', res);
						var listData = res.content.list;
						this.listData = this.listData.concat(listData);
						if (listData.length != this.pageSize * 1) {
							this.numFinish = true;
							if (this.queryClick && listData.length === 0) {
								this.showLoadMore = false;
							} else {
								this.showLoadMore = true;
								this.loadMoreText = '没有更多数据了!';
							}
						}
					} else {
						if (this.pageSize * 1 * this.startCount * 1 >= res.content.sumCount * 1) {
							this.numFinish = true;
							if (!this.firstQuery) {
								this.showLoadMore = true;
								this.loadMoreText = '没有更多数据了!';
							}
						} else {
							if (res.head.returnCode == '00000000') {
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
		selectOne(item) {
			item = {
				market_id: item.actorno,
				actorname: item.actorname,
				market_br_id: item.orgid,
				type: this.type
			};
			this.$store.commit('setmanagerSelect', item);
			uni.navigateBack();
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
			this.search.actorno = '';
			this.search.actorname = '';
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
		},
		custypename(status) {
			switch (status) {
				case '110':
					return '其他自然人';
				case '140':
					return '小微企业主';
				case '150':
					return '个体工商户';
			}
		},
		cusstatusname(status) {
			switch (status) {
				case '00':
					return '草稿客户(正式)';
				case '01':
					return '临时客户';
				case '02':
					return '草稿客户(担保)';
				case '05':
					return '担保客户';
				case '20':
					return '正式客户';
			}
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
	font-size: 28rpx;
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
	padding: 10rpx 12rpx;
	line-height: 1;
	margin-bottom: 14rpx;
}
.mc-min-btn-primaryplan.checked {
	background: $mc-color-babyblue;
	color: #ffffff;
	border-color: $mc-color-babyblue;
}
</style>
