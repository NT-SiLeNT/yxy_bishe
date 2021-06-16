<template>
	<view class="content">
		<!-- 测试页面 -->
		<view class="" style="text-align: center;">
			<ul id="Gallery">
				<li>
					<a href="../../static/img/addpic.png"><img src="images/thumb/01.jpg" alt="Image 01" /></a>
				</li>
				<li>
					<a href="../../static/img/addpic.png"><img src="images/thumb/02.jpg" alt="Image 02" /></a>
				</li>
				<li>
					<a href="../../static/img/addpic.png"><img src="images/thumb/03.jpg" alt="Image 03" /></a>
				</li>
				<li>
					<a href="../../static/img/addpic.png"><img src="images/thumb/04.jpg" alt="Image 04" /></a>
				</li>
			</ul>
			<button type="default" @click="pdfCreate">shenvhennn</button>
			<button type="default" @click="uolpa">shenvhennn</button>
			<image class="logo" src="/static/logo.png"></image>
			<view class="word-btn draw-cotrol-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="show('right')">
				<text class="word-btn-white">显示Drawer</text>
			</view>
		</view>
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			dddddddddddddddddddddddddddd
			<br />
			fffffffffffffff
			<view class="close">
				<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="hide">
					<text class="word-btn-white">关闭Drawer</text>
				</view>
			</view>
		</uni-drawer>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<view class="" style="text-align: center;">
			<button @click="onchange">quxianqing</button>

			<button type="" class="mc-btn-primary">页面主操作 Normal</button>
			<button type="" class="mc-btn-primaryplan">页面主操作 Normal</button>
			<button type="" class="mc-min-btn-primary">操作</button>
			<button type="" class="mc-min-btn-waring">主操作</button>
			<button type="" class="mc-min-btn-primaryplan">主操作</button>
			<button type="" class="mc-min-btn-primarybg">主操作</button>
		</view>
		<mc-list></mc-list>
		<view style="width: 100%;">
			<uni-card title="uni-ui" title1="kjfkdjf" titleBtn="审批历史" @tBtnHandle="tBtnHandle" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne">
							<span class="mclabel">55555555555</span>
							<span class="mccontent">dshfkjahfjdj</span>
						</view>
						<view class="mcitem">
							<span class="mclabel">55555555555</span>
							<span class="mccontent">dshfkjahfjdj</span>
						</view>
						<view class="mcitem">
							<span class="mclabel">55555555555</span>
							<span class="mccontent">dshfkjahfjdj</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户姓名</span>
							<span class="mccontent">和实施</span>
							<span class="mclabel">客户编号</span>
							<span class="mccontent">dshfkjahf555jdj</span>
						</view>
					</view>
					<view class="inline-btn inline-btn-right">
						<button type="" class="mc-min-btn-waring">删除</button>
						<button type="" class="mc-min-btn-primary">修改</button>
					</view>
				</template>
			</uni-card>
		</view>
		输入：
		<input type="text" value="ddd" />
		输入：
		<input type="text" value="ddd" />
		输入：
		<input type="text" value="ddd" />
		输入：
		<input type="text" value="ddd" />
		<tabbars tposition="left" :titleBottomLine="false" :swduration="0" :is-required="[0, 1]">
			<swiper-item label="现场采集" nid="xcjc">5555555555</swiper-item>
			<swiper-item label="现场录音" nid="xcly">5555555dd555</swiper-item>
			<swiper-item label="检查总结" nid="jczj">555555ee5555</swiper-item>
			<swiper-item label="检查总结1" nid="jczj1">5rer555555555</swiper-item>
			<swiper-item label="检查总结2" nid="jczj2">5555dfgsd555555</swiper-item>
			<swiper-item label="检查总结3" nid="jczj3">55sdf55555555</swiper-item>
			<swiper-item label="检查总结4" nid="jczj4">555xvx5555555</swiper-item>
		</tabbars>
		tupian按钮
		<mc-image @getImageData="getData" uploaderTitle=" 客户经理与客户的门头合照" requireClass="requireIcon" :imageListArr="imageList"></mc-image>

		<button type="default" @click="checkImageList">道道数据</button>
		<navigator url="/pages/images/images">tupiandiaoyong</navigator>
		<navigator url="/pages/shuiyin/shuiyin">水印</navigator>
		<view style="height:600px"><mc-voice></mc-voice></view>
		<view class="mcform">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">当前选择</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" class="mc-pick">
							<view class="uni-input">{{ array[index] }}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">可自动聚焦的input</view>
				<radio-group @change="radioChange" class="mcradio">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view><radio :value="item.value" :checked="index === current" /></view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
		</view>
		9999
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
			</picker-view-column>
		</picker-view>
		<button type="default" @click="show = true">dddddd</button>
		<button type="default" @click="show1 = true">dddddd</button>
		{{ show }}--{{ params.current }} {{ show }}--{{ params.current1 }}
		<mc-pop-select :show="show1" @getShowChange="show1 = $event" v-model="params.current1" :data="items"></mc-pop-select>
		<mc-pop-select class="uni-input" v-model="params.current1" :data="items"></mc-pop-select>
	</view>
</template>

<script>
export default {
	data() {
		const date = new Date();
		const years = [];
		const year = date.getFullYear();
		const months = [];
		const month = date.getMonth() + 1;
		const days = [];
		const day = date.getDate();
		for (let i = 1990; i <= date.getFullYear(); i++) {
			years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			months.push(i);
		}
		for (let i = 1; i <= 31; i++) {
			days.push(i);
		}
		return {
			years,
			year,
			months,
			month,
			days,
			day,
			value: [9999, month - 1, day - 1],
			visible: true,
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
			show: false,
			show1: false,
			params: {
				current: '34',
				current1: ''
			},
			visible: true,
			title: 'Hello',
			showRight: false,
			imageList: ['dddds'],
			items: [
				{
					value: 'USA',
					name: '美国'
				},
				{
					value: 'CHN',
					name: '中国',
					checked: 'true'
				},
				{
					value: 'BRA',
					name: '巴西'
				},
				{
					value: 'JPN',
					name: '日本'
				},
				{
					value: 'ENG',
					name: '英国'
				},
				{
					value: 'FRA',
					name: '法国'
				}
			],
			current: 0,
			index: 0,
			array: ['中国', '美国', '巴西', '日本']
		};
	},
	onLoad() {},
	onNavigationBarButtonTap(e) {
		this.showRight = !this.showRight;
	},
	onBackPress() {
		if (this.showRight || this.showLeft) {
			this.hide();
			return true;
		}
	},
	methods: {
		uolpa(){
			this.$request
				.post({
					url: 'creditPhotoUpload/v1/CpmPdfInfoCommit',
					data: {
						filepath: this.filepath,
						phototype: '010304',
						serno: 'LS81701203012020584684',
						photoName: '000u',
						fileType: 'pdf',
						delSign: '1' // pdf默认传1
					},
					upType: true,
					upMsg: '正在合成影像信息'
				})
				.then(res => {
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						this.imageList = this.imageList.concat({
							pUrl: 'data:image/jpeg;base64,' + res.content.creditbase64,
							imgSn: res.content.imgSn,
							name: this.name
						});
					} else {
						uni.showToast({
							title: res.head.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		pdfCreate(typeDoc) {
			var params = {
				TemplateCode: 'dp003,dp003,dp003,dp003',
				AttributeDatas: [
					{
						key: 'NAME',
						value: 'qqq',
						type: 'text',
						tempLateIndex: 1
					}
				],
				isUploadImage: 'false', // 上传影像平台--授权书此时不上传影像平台
				ImageDatas: [
					{
						imagePath: '/dp/credit/20310106150139336fad1b-80ac-4fc7-b5b4-5512a5d2a318.jpeg',
						imageWidth: '500',
						imageHeight: '1800',
						imageHash: '',
						type: '2',
						pageNo: '',
						lx: '50',
						ly: '90',
						keyWord: '',
						locationStyle: '',
						offsetX: '',
						offsetY: '',
						tempLateIndex: '1'
					},
					{
						imagePath: '/dp/credit/2031010314231450ad9f11-ae54-470f-bd6a-03dea167763e.jpeg',
						imageWidth: '500',
						imageHeight: '1800',
						imageHash: '',
						type: '2',
						pageNo: '',
						lx: '50',
						ly: '90',
						keyWord: '',
						locationStyle: '',
						offsetX: '',
						offsetY: '',
						tempLateIndex: '2'
					},
					{
						imagePath: '/dp/credit/2031010817432571d26da5-bb86-4d44-a2b2-e2ef399e59f2.jpeg',
						imageWidth: '500',
						imageHeight: '1800',
						imageHash: '',
						type: '2',
						pageNo: '',
						lx: '50',
						ly: '90',
						keyWord: '',
						locationStyle: '',
						offsetX: '',
						offsetY: '',
						tempLateIndex: '3'
					},
					{
						imagePath: '/dp/credit/20310108174217ca5205b0-3e61-4df8-98a2-0cfa55c8b85a.jpeg',
						imageWidth: '500',
						imageHeight: '1800',
						imageHash: '',
						type: '2',
						pageNo: '',
						lx: '50',
						ly: '90',
						keyWord: '',
						locationStyle: '',
						offsetX: '',
						offsetY: '',
						tempLateIndex: '4'
					}
				]
			};
			//生成pdf,
			this.$request
				.post({
					url: 'es/json/EsCreatePDF',
					data: params
				})
				.then(res => {
					console.log('eee', res);
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						this.filepath = res.response.content.pdfPath
					} else {
						uni.showToast({ title: res.response.header.returnMsg, icon: 'none' });
					}
				})
				.catch(err => {
					console.log('eee', err);
					uni.showToast({ title: err, icon: 'none' });
				});
		},
		bindChange: function(e) {
			const val = e.detail.value;
			this.year = this.years[val[0]];
			this.month = this.months[val[1]];
			this.day = this.days[val[2]];
		},
		getData(fileList) {
			console.log('fiel', fileList);
			this.imageList = fileList;
		},
		checkImageList() {
			console.log('xianzia的图片数据', this.imageList);
		},
		show(e) {
			console.log('show', e);
			if (e === 'left') {
				this.showLeft = true;
			} else {
				this.showRight = true;
			}
		},
		hide() {
			console.log('hide');
			this.showLeft = false;
			this.showRight = false;
		},
		closeDrawer(e) {
			if (e === 'left') {
				this.showLeft = false;
			} else {
				this.showRight = false;
			}
		},
		tBtnHandle() {
			console.log('点击了审批历史');
		},
		onchange() {
			uni.navigateTo({
				url: '/pages/list/list',
				animationType: 'pop-in',
				animationDuration: 1000
			});
		},
		onTabChange(index) {
			console.log(index, '+++++++++++');
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		}
	}
};
</script>
<style lang="scss" scoped>
/*  使用iconfont为了符合uniapp的导航栏右侧图标规范，将iconfont原本的 &#xe 后面的数字换到 \ue 中就可以     &#xe60e ->  \ue60e */
.content {
	box-sizing: border-box;
	width: 100%;
	// display: flex;
	// flex-direction: column;
	// align-items: center;
	// justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	/* color: #8f8f94; */
	color: $mc-color-blue;
}
.inline-btn {
	margin-top: 20rpx;
	margin-bottom: 30rpx;
}
</style>
