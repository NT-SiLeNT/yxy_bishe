<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">商品名称</span>
								<span class="mccontent">{{ item.productId }}</span>
								<span class="mclabel">商品积分</span>
								<span class="mccontent">{{ item.num }}</span>
							</view>
						</view>
					</view>					
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData">{{ loadMoreText }}</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountInfo: {},
				listData: [], // 显示的列表数据
				firstQuery: true, //进入第一次请求数据
							
				// ???????
				search: {
					//cus_name: '',
					//cert_code: '',
					// cus_id: '',
					// cus_type: '110', //客户类型
					// cus_status: '20' //客户状态
				},
				serchBtnClick: false, //是否点击确定按钮
				showRight: false,
				loadMoreText: '加载中...',
				showLoadMore: false,
				queryClick: false,
				numFinish: false,
				pageSize: 10, // 每页条数
				startCount: 1 // 开始记录数
			}
		},
		computed: {},
		onShow() {
			var _this = this;
		},
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
			this.startCount = this.pageSize * 1 + this.startCount * 1;
			this.queryClick = false;
			setTimeout(() => {
				this.queryList();
			}, 0);
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
			queryList: function() {			
				uni.request({
					url: 'http://localhost:8888/web/order/queryMyOerder',
					method: 'POST',
					data: {
						'head':{},
						'content':{
							'userId': '111111111111111231'
						}
					},
					success: (res) => {
						this.listData = res.data.result;
					/* 	this.listData = this.listData.concat(listData); */
					}
				});
			},
		}
	}
</script>

<style>

</style>
