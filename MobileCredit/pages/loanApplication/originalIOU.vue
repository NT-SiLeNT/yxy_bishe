<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">客户名称</span>
								<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
							</view>
							<view>
								<span class="mclabel">客户号</span>
								<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">借据编号</span>
							<span class="mccontent">{{ item.bill_no ? item.bill_no : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">合同编号</span>
							<span class="mccontent">{{ item.cont_no ? item.cont_no : '-' }}</span>
						</view>
						<view class="mcitem btnline">
							<button type="" class="mc-min-btn-primarybg">{{ item.assure_means_main ? assuremeansname(item.assure_means_main) : '-' }}</button>
							<button type="" class="mc-min-btn-primarybg">{{ item.limit_ind ? limitindname(item.limit_ind) : '-' }}</button>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">贷款金额</span>
							<span class="mccontent">{{ item.loan_amount ? item.loan_amount : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">贷款余额</span>
							<span class="mccontent">{{ item.balance ? item.balance : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">贷款起始日</span>
								<span class="mccontent">{{ item.loan_start_date ? item.loan_start_date : '-' }}</span>
							</view>
							<view>
								<span class="mclabel">终止日</span>
								<span class="mccontent">{{ item.loan_end_date ? item.loan_end_date : '-' }}</span>
							</view>
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
					<view class="title">借据编号</view>
					<input v-model="search.bill_no" type="text" class="uni-input" value="" placeholder="请输入借据编号" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">合同编号</view>
					<input v-model="search.cont_no" type="text" class="uni-input" value="" placeholder="请输入合同编号" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户号</view>
					<input v-model="search.cus_id" disabled type="text" class="uni-input" value="" placeholder="请输入客户号" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户名称</view>
					<input v-model="search.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
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
			biztype: '', //业务品种
			listData: [], // 显示的列表数据
			firstQuery: true, //进入第一次请求数据
			search: {
				bill_no: '',
				cont_no: '',
				cus_id: '',
				cus_name: ''
			},
			serchBtnClick: false, //是否点击确定按钮
			showRight: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			queryClick: false,
			numFinish: false,
			pageSize: 10, // 每页条数
			startCount: 1 // 开始记录数
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
		this.queryClick = false;
		this.startCount = this.pageSize * 1 + this.startCount * 1;
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
		this.biztype = option.biztype;
		this.search.cus_id = option.cusid;
	},
	mounted() {
		(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
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
					url: 'es/json/EsQueryIOUInfomation',
					data: {
						bill_no: this.search.bill_no !== '' ? this.search.bill_no : '', //	借据编号
						cont_no: this.search.cont_no !== '' ? this.search.cont_no : '', //	合同编号
						cus_name: this.search.cus_name !== '' ? this.search.cus_name : '', //	客户名称
						cus_id: this.search.cus_id !== '' ? this.search.cus_id : '', //	客户号
						biz_type: this.biztype !== '' ? this.biztype : '' //	业务品种
					}
				})
				.then(res => {
					if (this.firstQuery) {
						this.listData = [];
					}
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);
						var listData = res.response.content.List;
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
							if (res.response.header.returnCode != '00000000') {
								uni.showToast({
									title: res.response.header.returnMsg,
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
				bill_no: item.bill_no
			};
			this.$store.commit('setoriginalIOUSelect', item);
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
			this.search.cus_name = '';
			this.search.bill_no = '';
			this.search.cont_no = '';
		},
		show(e) {
			this.showRight = true;
		},
		hide() {
			console.log('hide');
			this.showRight = false;
		},
		// 关闭筛选条件
		closeDrawer(e) {
			if (!this.serchBtnClick) {
				this.resetSearch();
			}
			this.showRight = false;
		},
		assuremeansname(status) {
			switch (status) {
				case '00':
					return '信用';
				case '10':
					return '抵押';
				case '20':
					return '质押';
				case '30':
					return '保证';
			}
		},
		limitindname(status) {
			switch (status) {
				case '1':
					return '不使用授信额度';
				case '2':
					return '使用授信额度';
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
