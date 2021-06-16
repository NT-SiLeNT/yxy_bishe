<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<block v-if="type == 4">
				<uni-card v-for="(item, index) in listData" :key="index">
					<template>
						<view class="mcitems">
							<view class="mcitem mcrowOne">
								<span class="mclabel">合作方协议编号</span>
								<span class="mccontent">{{ item.ctr_no ? item.ctr_no : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">合作方客户名称</span>
								<span class="mccontent">{{ item.cop_cus_name ? item.cop_cus_name : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">合作项目类别</span>
								<span class="mccontent">{{ item.cop_prj_type ? copprjtypename(item.cop_prj_type) : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">项目名称</span>
								<span class="mccontent">{{ item.prj_name ? item.prj_name : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">合作额度类型</span>
								<span class="mccontent">{{ item.cop_lmt_type ? coplmttypename(item.cop_lmt_type) : '-' }}</span>
							</view>
							<view class="mcitem mcrowOne">
								<span class="mclabel">合作额度</span>
								<span class="mccontent">{{ item.lmt_sum ? item.lmt_sum : '-' }}</span>
							</view>
						</view>
						<view class="inline-btn inline-btn-right">
							<button class="mc-min-btn-primary" :disabled="copartnerlistCount.indexOf(item.ctr_no) != -1" @click="selectOne(item)">选定</button>
						</view>
					</template>
				</uni-card>
			</block>
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
					<view class="title">合作协议编号</view>
					<input v-model="search.ctr_no" type="text" class="uni-input" value="" placeholder="请输入合作协议编号" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">项目名称</view>
					<input v-model="search.prj_name" type="text" class="uni-input" value="" placeholder="请输入项目名称" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">合作方客户名</view>
					<input v-model="search.cop_cus_name" type="text" class="uni-input" value="" placeholder="请输入合作方客户名" />
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
				ctr_no: '',
				prj_name: '',
				cop_cus_name: ''
			},
			serchBtnClick: false, //是否点击确定按钮
			showRight: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			numFinish: false,
			queryClick: false,
			type: '',
			pageSize: 10, // 每页条数
			startCount: 1, // 开始页数
			copartnerlistCount: []
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
		this.type = option.type;
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
		uni.getStorage({
			key: 'copartnerlistCount',
			success: function(res) {
				_this.copartnerlistCount = res.data;
				_this.$forceUpdate();
			}
		});
		//console.log('copartnerlistCount', this.copartnerlistCount);
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
			//贴息信息查询
			if (this.type == '4') {
				this.EsQueryPartnerList();
			}
		},
		// 协议编号列表
		EsQueryPartnerList() {
			this.$request
				.post({
					url: 'es/json/EsQueryPartnerListInfo',
					data: {
						ctr_no: this.search.ctr_no, //	合作协议编号
						prj_name: this.search.prj_name, //	项目名称
						cop_cus_name: this.search.cop_cus_name, //	合作方客户名
						StartCount: this.startCount.toString(), //	开始记录数
						Count: this.pageSize.toString() //	查询条数
					}
				})
				.then(res => {
					if (this.firstQuery) {
						this.listData = [];
					}
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);
						var listData = res.response.content.List;
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
						this.numFinish = true;
						if (!this.firstQuery) {
							this.showLoadMore = true;
							this.loadMoreText = '没有更多数据了!';
						}
						if (res.response.header.returnCode != '00000000') {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
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
			this.$store.commit('setbasicCollaborator', item);
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
			this.search.ctr_no = '';
			this.search.prj_name = '';
			this.search.cop_cus_name = '';
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

		copprjtypename(status) {
			switch (status) {
				case '040':
					return '仓储物流项目';
				case '010':
					return '楼盘项目';
				case '021':
					return '汽车项目';
				case '030':
					return '担保公司与其他';
				case '901':
					return '银行同业';
			}
		},
		coplmttypename(status) {
			switch (status) {
				case '111':
					return '房地产开发商 - 住房类按揭额度';
				case '112':
					return '房地产开发商 - 商用房类按揭额度';
				case '221':
					return '汽车经销商 - 汽车消费类按揭额度';
				case '222':
					return '汽车经销商 - 汽车经营类按揭额度';
				case '311':
					return '房地产经纪公司 - 住房类按揭额度';
				case '312':
					return '房地产经纪公司 - 商用房类按揭额度';
				case '331':
					return '房地产经纪公司 - 对私抵押类额度';
				case '400':
					return '专业担保公司与其他';
				case '500':
					return '其他';
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
}
.mc-min-btn-primaryplan {
	border-color: $mc-text-weak;
	color: $mc-text-caption;
	margin-right: 14rpx;
	padding: 10rpx 12rpx;
	line-height: 1;
}
.mc-min-btn-primaryplan.checked {
	background: $mc-color-babyblue;
	color: #ffffff;
	border-color: $mc-color-babyblue;
}
</style>
