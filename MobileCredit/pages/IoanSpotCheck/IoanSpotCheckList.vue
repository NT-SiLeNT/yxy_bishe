<template>
	<view class="wrap">
		<!-- 		<uni-card
			:title="ioanListCheck == 'true' ? '个人经营贷款' : ''"
			title1="daikua名称"
			:titleBtn="ioanListCheck == 'true' ? '审批历史 >' : ''"
			@tBtnHandle="tBtnHandle('2111222')"
			:isBgImg="ioanListCheck == 'false' ? true : false"
		>
			<template>
				<view class="mcitems">
					<view class="mcitem mcrowOne">
						<span class="mclabel">客户名称</span>
						<span class="mccontent">和实施</span>
						<span class="mclabel">客户号</span>
						<span class="mccontent">dshfkjahf555jdj</span>
					</view>
					<view class="mcitem mcrowOne">
						<span class="mclabel">合同编号</span>
						<span class="mccontent">817182040924006580</span>
					</view>
					<view class="mcitem mcrowOne">
						<span class="mclabel">借据编号</span>
						<span class="mccontent">817192040924007892</span>
					</view>
					<view v-if="ioanListCheck == 'true'" class="mcitem mcrowOne">
						<span class="mclabel">核查时间</span>
						<span class="mccontent">个人经营贷</span>
					</view>
					<view v-if="ioanListCheck == 'true'" class="mcitem mcrowOne">
						<span class="mclabel">核查状态</span>
						<span class="mccontent">核查完成</span>
					</view>
					<view v-if="ioanListCheck != 'true'" class="mcitem mcrowOne">
						<span class="mclabel">核查结果</span>
						<span class="mccontent">核查完成</span>
					</view>
				</view>
				<view class="inline-btn inline-btn-right">
					<button
						type=""
						v-if="ioanListCheck == 'true'"
						@click="toLink('/pages/IoanSpotCheck/IoanSpotCheck?ioanType=' + ioanType + '&check=' + ioanListCheck + '&serno=' + 'eeeeeeeeeeeee')"
						class="mc-min-btn-waring"
					>
						核查
					</button>
					<button
						type=""
						@click="
							toLink('/pages/IoanSpotCheck/IoanSpotCheck?ioanType=' + ioanType + '&check=' + ioanListCheck + '&isChange=' + ioanListCheck + '&serno=' + '2111222')
						"
						class="mc-min-btn-primary"
					>
						{{ ioanListCheck == 'true' ? '核查' : '详情' }}
					</button>
				</view>
			</template>
		</uni-card> -->
		<view v-if="!listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card
				v-for="(item, index) in listData"
				:key="index"
				:title="ioanType == '12' ? '个人经营贷款' : '对公贷款'"
				title1=""
				:titleBtn="'审批历史 >'"
				@tBtnHandle="tBtnHandle(item.serno)"
				:isBgImg="ioanListCheck == 'false' ? true : false"
			>
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户名称</span>
							<span class="mccontent">{{ item.cus_name }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户号</span>
							<span class="mccontent">{{ item.cus_id }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">合同编号</span>
							<span class="mccontent">{{ item.cont_id }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">借据编号</span>
							<span class="mccontent">{{ item.bill_id }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<view class="">
								<span class="mclabel">核查状态</span>
								<span class="mccontent">{{ approvestatusname(item.approve_status) }}</span>
							</view>
							<view class="">
								<span class="mclabel">核查时间</span>
								<span class="mccontent">{{ item.real_fin_date }}</span>
							</view>
						</view>
					</view>
					<view class="inline-btn inline-btn-right">
						<button
							type=""
							v-if="ioanListCheck == 'true'"
							@click="
								toLink(
									'/pages/IoanSpotCheck/IoanSpotCheck?ioanType=' +
										ioanType +
										'&check=' +
										ioanListCheck +
										'&isChange=' +
										(item.approve_status == '000' ? false : true) +
										'&serno=' +
										item.serno
								)
							"
							class="mc-min-btn-primary"
						>
							核查
						</button>
						<button
							type=""
							v-if="ioanListCheck != 'true'"
							@click="toLink('/pages/IoanSpotCheck/IoanSpotCheck?ioanType=' + ioanType + '&check=' + ioanListCheck + '&serno=' + item.serno)"
							class="mc-min-btn-primary"
						>
							详情
						</button>
					</view>
				</template>
			</uni-card>
		</block>
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')" class="mcdrawer">
			<!-- <view class="height-status"> -->
			<!-- </view> -->
			<view class="height-status">
				<view class="headediv">
					<view class="floatleft" :hover-start-time="20" :hover-stay-time="70" @click="hide">&#215;</view>
					<view class="floatright" @click="resetSearch()">重置</view>
				</view>
			</view>
			<view class="mcform">
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户号</view>
					<input v-model="search.cus_id" type="text" class="uni-input" value="" placeholder="请输入客户号" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">核查时间</view>
					<picker mode="date" :value="search.date" @change="bindDateChange">
						<view v-if="search.date" class="uni-input">{{ search.date }}</view>
						<view v-else class="uni-input placehold">-请选择-</view>
					</picker>
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
			ioanType: '12', // '经营性贷款取值：12； 对公贷款取值01
			ioanListCheck: 'true', // 区分是核查列表 还是历史查询列表
			accountInfo: {}, // 登录的用户信息
			listData: [], // 显示的列表数据
			search: {
				date: '',
				cus_id: ''
			},
			loadMoreText: '加载中...',
			showLoadMore: false,
			// numFinish: false,
			showRight: false, //筛选条件
			pageSize: 10, // 每页条数
			startCount: 1, // 开始记录数
			sumCount: 100 //总条数
		};
	},
	computed: {
		// 区分是核查列表还是 历史核查查询列表
		listDist() {
			if (this.ioanListCheck == 'true') {
				// 核查列表
				// 000待发起、992打回
				return '000,992';
			} else {
				// 历史核查查询列表
				// 111 审批中   997 通过    998 否决(不同意)
				return '111,997,998';
			}
		},
		numFinish() {
			var sumCount = this.sumCount * 1;
			if (sumCount > 0) {
				if (sumCount - this.pageSize + this.startCount > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	},
	onPullDownRefresh() {
		//刷新初始化数据
		// this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始记录数
		this.listData = [];
		//调用获取数据的函数
		console.log('111');
		this.queryList();
	},
	onReachBottom() {
		console.log('onReachBottom');
		if (this.numFinish) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.showLoadMore = true;
		this.pageSize = 10;
		this.startCount = this.pageSize * this.startCount + 1;

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
		this.ioanType = option.ioanType;
		this.ioanListCheck = option.check;
		(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);

		console.log(option); //打印出上个页面传递的参数。
	},
	mounted() {
		console.log('222');
		if (this.ioanListCheck == 'true') {
			var rightbtn = document.querySelector('body.pages-IoanSpotCheck-IoanSpotCheckList uni-page-head .uni-page-head-ft');
			console.log(rightbtn);
			rightbtn.style.display = 'none';
		}
		var _this = this;
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				console.log(res.data);
				_this.accountInfo = res.data;
			}
		});
				this.queryList();
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		queryList: function() {
			//贷后检查任务实时推送 --
			/* "现场核查包括：000待发起、992打回；
			历史核查查询：包括：
			111 审批中
			997 通过
			998 否决(不同意)
			根据返回值筛选列表数据
			 */
			this.$request
				.post({
					url: 'es/json/EsPostDeliveryTask',
					data: {
						start_count: this.startCount.toString(), //	开始记录数
						count: this.pageSize.toString(), //	查询条数
						cus_name: this.search.cus_id, //	客户名称  历史核查查询条件
						cus_type: this.ioanType, //	贷后检查客户类型
						chk_state: '', //	检查状态
						approve_status: this.listDist, //	审批状态
						real_fin_date: this.search.date, //	实际完成日期  历史核查查询条件
						// mng_br_id: this.accountInfo.orgid, //	主管机构号
						// cus_mng_id: this.accountInfo.actorno //	主管客户经理号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);
						var listData = res.response.content.List;
						this.listData = this.listData.concat(listData);
						uni.stopPullDownRefresh();
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
						this.listData = [];
					}
				})
				.catch(err => {});
		},

		approvestatusname(status) {
			switch (status) {
				case '000':
					return '待发起';
				case '992':
					return '打回';
				case '111':
					return '审批中';
				case '997':
					return '通过';
				case '998':
					return '否决';
			}
		},
		bindDateChange: function(e) {
			// 时间选择
			this.search.date = e.target.value;
		},
		toSearch() {
			this.showRight = false;
			//刷新初始化数据
			// this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			this.listData = [];
			this.queryList();
		},
		resetSearch() {
			this.search.cus_id = '';
			this.search.date = '';
		},
		show(e) {
			this.showRight = true;
			this.resetSearch();
		},
		hide() {
			console.log('hide');
			this.showRight = false;
		},
		// 关闭筛选条件
		closeDrawer(e) {
			console.log('444');
			this.showRight = false;
		},
		// 审批历史点击事件
		tBtnHandle: function(id) {
			console.log('eeeeeeeeeeeeee:', id);
			this.toLink('/pages/IoanSpotCheck/IoanSpotCheckHistory?serno=' + id);
		}
	}
};
</script>

<style scoped>
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
</style>
