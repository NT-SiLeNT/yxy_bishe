<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card
				v-for="(item, index) in listData"
				:key="index"
				:title="loanType == '12' ? '个人经营贷款' : '对公贷款'"
				title1=""
				:titleBtn="'审批历史 >'"
				:titleBtncanUse="item.approve_status == '000' ? false : true"
				@tBtnHandle="tBtnHandle(item.serno)"
				:isBgImg="loanListCheck == false ? true : false"
			>
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户名称</span>
							<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户号</span>
							<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">合同编号</span>
							<span class="mccontent">{{ item.cont_id ? item.cont_id : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">借据编号</span>
							<span class="mccontent">{{ item.bill_id ? item.bill_id : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne" v-if="item.approve_status != '000'">
							<span class="mclabel">审批状态</span>
							<span class="mccontent" :class="{ redText: item.approve_status == '992' }">
								{{ item.approve_status ? approvestatusname(item.approve_status) : '-' }}
							</span>
						</view>
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view class="">
								<span class="mclabel">核查状态</span>
								<span class="mccontent">{{ item.check_status_sce ? (item.check_status_sce == 2 ? '已核查' : '未核查') : '未核查' }}</span>
							</view>
							<view class="">
								<span class="mclabel">核查时间</span>
								<span class="mccontent">{{ item.real_fin_date ? item.real_fin_date : '-' }}</span>
							</view>
						</view>
					</view>
					<view class="inline-btn inline-btn-right">
						<button
							type=""
							v-if="loanListCheck"
							@click="
								toLink(
									'/pages/loanSpotCheck/loanSpotCheck?loanType=' +
										loanType +
										'&check=' +
										loanListCheck +
										'&isChange=' +
										isChangetemp(item.approve_status, item.check_status_sce) +
										'&serno=' +
										item.serno +
										'&crtdate=' +
										item.crt_date
								)
							"
							:class="isChangetemp(item.approve_status, item.check_status_sce) ? 'mc-min-btn-orange' : 'mc-min-btn-primary'"
						>
							{{ isChangetemp(item.approve_status, item.check_status_sce) ? '修改' : '开始核查' }}
						</button>
						<button
							type=""
							v-if="!loanListCheck"
							@click="
								toLink('/pages/loanSpotCheck/loanSpotCheck?loanType=' + loanType + '&check=' + loanListCheck + '&serno=' + item.serno + '&crtdate=' + item.crt_date)
							"
							class="mc-min-btn-primary"
						>
							详情
						</button>
					</view>
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData" @click="numFinish ? '' : loadMore()">{{ loadMoreText }}</view>
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
					<view class="title">客户名称</view>
					<input v-model="search.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">核查时间</view>
					<mc-picker-select class="uni-input" mode="date" v-model="search.date"></mc-picker-select>
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
			loanType: '12', // '经营性贷款取值：12； 对公贷款取值01
			loanListCheck: true, // 区分是核查列表 还是历史查询列表
			accountInfo: {}, // 登录的用户信息
			listData: [], // 显示的列表数据
			firstQuery: true, //进入第一次请求数据
			search: {
				date: '',
				cus_name: ''
			},
			serchBtnClick: false, //是否点击确定按钮
			loadMoreText: '加载中...',
			showLoadMore: false,
			numFinish: false,
			showRight: false, //筛选条件
			queryClick: false, // 筛选点击
			pageSize: 10, // 每页条数
			startCount: 1, // 开始记录数
			sumCount: 100 //总条数
		};
	},
	computed: {
		// 区分是核查列表还是 历史核查查询列表
		listDist() {
			if (this.loanListCheck) {
				// 核查列表
				// 000待发起、992打回
				return '000,992';
			} else {
				// 历史核查查询列表
				// 111 审批中   997 通过    998 否决(不同意)
				return '111,997,998';
			}
		}
	},
	onPullDownRefresh() {
		if (!this.loanListCheck) {
			this.resetSearch('btn');
		}
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
			this.showLoadMore = true;
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.showLoadMore = true;
		this.pageSize = 10;
		this.startCount = this.pageSize * 1 + this.startCount * 1;
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
	onShow() {
		console.log('eeeSHhow');
		for (var i = 0; i < this.listData.length; i++) {
			var item = this.listData[i];
			if (this.$store.state.currentChecktypeAndIndex.type == 'loan') {
				if (this.$store.state.currentChecktypeAndIndex.index == item.serno) {
					if (this.listData[i].check_status_sce !== 2) {
						this.listData[i].check_status_sce = '2';
						this.$store.commit('deltypeAndIndex', '');
						this.$forceUpdate();
					}
					break;
				}
			}
		}
		console.log('listdata:', this.listData);
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.loanType = option.loanType;
		this.loanListCheck = JSON.parse(option.check);
		if (!this.loanListCheck) {
			uni.setNavigationBarTitle({
				title: '贷款核查查询'
			});
		}
		console.log(option); //打印出上个页面传递的参数。
	},
	mounted() {
		if (this.loanListCheck) {
			var rightbtn = document.querySelector('body.pages-loanSpotCheck-loanSpotCheckList uni-page-head .uni-page-head-ft');
			rightbtn.style.display = 'none';
		}
		(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
		var _this = this;
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				_this.accountInfo = res.data;
			}
		});
		//刷新初始化数据
		this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始记录数
		this.queryClick = false;
		this.firstQuery = true;
		this.queryList();
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		isChangetemp(appsts, status) {
			var flag = false;
			if (appsts == '992') {
				flag = true;
			} else {
				if (status == 2) {
					flag = true;
				} else {
					flag = false;
				}
			}
			return flag;
		},
		queryList: function() {
			//贷后检查任务实时推送 --
			this.$request
				.post({
					url: 'es/json/EsPostDeliveryTask',
					data: {
						start_count: this.startCount.toString(), //	开始记录数
						count: this.pageSize.toString(), //	查询条数
						cus_name: this.search.cus_name, //	客户名称  历史核查查询条件
						cus_type: this.loanType, //	贷后检查客户类型
						chk_state: '', //	检查状态
						approve_status: this.listDist, //	审批状态
						real_fin_date: this.search.date, //	实际完成日期  历史核查查询条件
						mng_br_id: this.accountInfo.orgid, //	主管机构号
						cus_mng_id: this.accountInfo.actorno //	主管客户经理号
					}
				})
				.then(res => {
					if (this.firstQuery) {
						this.listData = [];
					}
					if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length) {
						console.log('所有数据', res);
						var listData = res.response.content.List;
						if (listData.length != this.pageSize * 1 || listData.length < this.pageSize * 1) {
							this.numFinish = true;

							this.showLoadMore = true;
							this.loadMoreText = '没有更多数据了!';
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
					this.$forceUpdate();
					uni.stopPullDownRefresh();
				})
				.catch(err => {
					this.numFinish = false;
					this.firstQuery = false;
					uni.stopPullDownRefresh();
				});
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
		toSearch() {
			this.serchBtnClick = true;
			this.showRight = false;
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			// this.listData = [];
			this.firstQuery = true;
			// this.showLoadMore = false;
			this.queryClick = true;
			this.queryList();
		},
		resetSearch(btn) {
			if (btn) {
				this.serchBtnClick = false;
			}
			console.log('点击重置按钮');
			this.search.cus_name = '';
			this.search.date = '';
		},
		loadMore: function() {
			console.log('onReachBottom');
			if (this.numFinish) {
				this.showLoadMore = true;
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
		// 审批历史点击事件
		tBtnHandle: function(id) {
			this.toLink('/pages/ApprovalHistory/ApprovalHistory?serno=' + id);
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
.mccontent.redText {
	color: red;
}

.uni-card .inline-btn-right {
	margin-right: 26rpx;
}
</style>
