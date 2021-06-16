<template>
	<view class="wrap" style="height: 100%;">
		<view v-if="!listData.length" class="emptyData">暂无数据</view>
		<uni-card v-if="listData.length" v-for="(item, index) in listData" :key="index" title="" title1="" titleBtn="" :isBgImg="false">
			<template>
				<view class="mcitems">
					<view class="mcitem mcrowOne">
						<span class="mclabel">审批结论</span>
						<span class="mccontent">{{ item.app_conclusion?item.app_conclusion:'-' }}</span>
					</view>
					<view class="mcitem mcrowOne">
						<span class="mclabel">审批意见</span>
						<span class="mccontent">{{ item.app_advice?item.app_advice:'-' }}</span>
					</view>
					<view class="mcitem mcrowOne">
						<span class="mclabel">审批人</span>
						<span class="mccontent">{{ item.app_user_displayname?item.app_conclusion:'-' }}</span>
					</view>
					<view class="mcitem mcrowOne">
						<span class="mclabel">审批岗位</span>
						<span class="mccontent">{{ item.wfi_node_name?item.app_conclusion:'-' }}</span>
					</view>
					<view class="mcitem mcrowOne">
						<view class="">
							<span class="mclabel">审批时间</span>
							<span class="mccontent">{{ item.operate_time?item.operate_time:'-' }}</span>
						</view>
						<view class="">
							<span class="mclabel">审批机构</span>
							<span class="mccontent">{{ item.app_org_displayname?item.app_org_displayname:'-' }}</span>
						</view>
					</view>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			serno: '', // 任务编号
			listData: [], // 显示的列表数据
			numFinish: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			pageSize: 10, // 每页条数
			startCount: 1 // 开始记录数
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.serno = option.serno;
	},
	onPullDownRefresh() {
		//刷新初始化数据
		this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始记录数
		this.listData = [];
		//调用获取数据的函数
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
	mounted() {
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				console.log(res.data);
				this.accountInfo = res.data;
			}
		});
		console.log('this.$stroe', this.$store);
		this.queryList();
	},
	methods: {
		queryList: function() {
			//审批历史查询 --
			this.$request
				.post({
					url: 'es/json/EsQueryApprovalHis',
					data: {
						// start_count: this.startCount, //	开始记录数
						// count: this.pageSize, //	查询条数
						
						serno:this.serno ? this.serno : '' //	任务编号
						// serno:'LS81701202101160585464' //	任务编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);
						// 审批人	app_user_displayname
						// 审批岗位	wfi_node_name
						// 审批结论	app_conclusion
						// 审批意见	app_advice
						// 审批机构	app_org_displayname
						// 审批时间	operate_time
						var listData = res.response.content.List;
						// this.numFinish = res.response.content.end;
						this.listData = this.listData.concat(listData);
						uni.stopPullDownRefresh();
					} else {
						this.listData = [];
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
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
</style>
