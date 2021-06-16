<template>
	<view class="w100">
		<view class="mc-padding-wrap">
			<view class="canscroll">
				<view class="playDivWrap bottomGap" v-if="voiceData.length" v-for="(item, index) in voiceData" :key="index" :id="'line' + index">
					<view class="payTitle">录音（10分钟内）</view>
					<!-- <view class="payDateInfo">{{item.ymd}}</view> -->
					<view class="progressLIne progressWrap"><view class="progressLIne progress"></view></view>
					<view class="divflex timeDiv">
						<span>{{ item.formatedPlayTime }}</span>
						<span>{{ item.formatedRecordTimeed }}</span>
					</view>
					<view class="divflex voiceOPer oneBtn">
						<!-- 		<span v-if="!hasRecord&&canAdd" class="operIcon voiceDel"></span>
					<span v-if="hasRecord&&canAdd" @click="delRecorder" class="operIcon voiceDelcan"></span> -->
						<block v-if="item.recordTime == 0"><span class="operIcon voicePlay"></span></block>
						<block v-else>
							<span v-if="!isHaveEcho || !item.hasRecord" class="operIcon voicePlay"></span>
							<span v-if="isHaveEcho && item.hasRecord && !item.playing" @click="playVoice(item, item.songtimeIndex)" class="operIcon voicePlaycan"></span>
							<span v-if="isHaveEcho && item.hasRecord && item.playing" @click="pauseVoice(item, item.songtimeIndex)" class="operIcon voicePause"></span>
						</block>
					</view>
				</view>
				<view class="playDivWrap bottomGap" v-if="canAdd" id="currenting">
					<view class="payTitle">录音（10分钟内）</view>
					<!-- <view class="payDateInfo">2020nian09yue90ri 00:00:00</view> -->
					<view class="progressLIne progressWrap"><view class="progressLIne progress"></view></view>
					<view class="divflex timeDiv">
						<span>{{ formatedPlayTime }}</span>
						<span>{{ formatedRecordTimeed }}</span>
					</view>
					<view class="divflex voiceOPer">
						<span v-if="!hasRecord" class="operIcon voiceDel"></span>
						<span v-if="hasRecord" @click="delRecorder" class="operIcon voiceDelcan"></span>
						<span v-if="!hasRecord" class="operIcon voicePlay"></span>
						<span v-if="hasRecord && !playing" @click="playVoice" class="operIcon voicePlaycan"></span>
						<span v-if="hasRecord && playing" @click="pauseVoice" class="operIcon voicePause"></span>
					</view>
				</view>
			</view>
			<view class="recordTimeWrap" v-if="canAdd">
				<view class="recordTime" v-if="startRecording">{{ formatedRecordTime }}</view>
				<image class="startRecordIcon" v-if="!startRecording" @click="startRecord" src="./record/luyinno@2x.png" mode=""></image>
				<image class="startRecordIcon" v-if="startRecording" src="./record/luyinicon@2x.png" mode=""></image>
			</view>
			<view class="mc-body-buttonwrap" v-if="startRecording && canAdd">
				<view class="mc-body-buttons">
					<view class="cancel" @click="cancleRecord"><span class="btnText">取消</span></view>
					<view v-if="isonlycanstopRecord" class="play" @click="tipEndRecord"></view>
					<block v-else>
						<view v-if="!recording" class="play" @click="startRecord"></view>
						<view v-if="recording" class="pause" @click="pauseRecord"></view>
					</block>
					<!-- <view class="" style="width: 30px;"> -->
					<view class="sure" @click="stopRecord"><span class="btnText">确定</span></view>
					<!-- </view> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { RecordStart, RecordPause, RecordStop, PlayStop, PlayStart, PlayPause, RecordClear, RecordCancel, getVoiceTime } from '@/common/Mobile/MobileUtils.js';
var util = require('@/common/util.js');
var playTimeInterval = null;
var recordTimeInterval = null;
var recorderManager = null;
var music = null;
export default {
	data() {
		return {
			startRecording: false, //是否点击开始录音
			recording: false, //录音中
			playing: false, //播放中
			hasRecord: false, //是否有了一个录音文件
			hasRecordTemp: false, //是否有了一个录音文件
			tempFilePath: '',
			recordTime: 0,
			playTime: 0,
			recordTimeed: 0,
			formatedRecordTimeed: '00:00:00', //需要展示的时间
			formatedRecordTime: '00:00:00', //录音的总时间
			formatedPlayTime: '00:00:00', //播放录音的当前时间
			audioData: '',
			CANUSE: true, //false不走上传
			isHaveEcho: false, //点击开始录音，让所有置灰
			currenItem: '',
			isonlycanstopRecord: false
		};
	},
	props: {
		ownData: {
			type: Object,
			default: function() {
				return {
					serno: '',
					type: ''
				};
			}
		},
		voiceData: {
			type: Array,
			default: function() {
				return [];
			}
		}, //回显数据
		canAdd: {
			type: Boolean,
			default: true
		},
		lostFocus: {
			type: Boolean,
			default: true
		},
		closeVoice: {
			type: Boolean,
			default: true
		},
		isChangeAdd: {
			type: Boolean,
			default: false
		}
	},
	onLoad: function() {},
	mounted() {
		this.isHaveEcho = true;
		this.getlistDataParam();
		music = this.$javaScriptBridge;
		console.log('进入录音页面，加载初始元素');
		// 录音暂停事件回调
		music.recordonPause(() => {
			this.recording = false;
			this.startRecording = true;
			this.hasRecord = false;
			this.isonlycanstopRecord = true;
			clearInterval(recordTimeInterval);
		});
		// 录音结束-超时结束
		music.recordonEnd(() => {
			console.log('超时结束');
			uni.hideLoading();
			this.recording = false;
			this.startRecording = true;
			this.hasRecord = false;
			this.isonlycanstopRecord = true;
			clearInterval(recordTimeInterval);
		});
	},
	destroyed() {
		console.log('结束录音页面destory');
		this.end();
	},
	methods: {
		async getlistDataParam() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var params = [];
			for (var i = 0; i < this.voiceData.length; i++) {
				params.push({
					url: this.voiceData[i].pUrl,
					index: i
				});
			}
			var echoList = await this.getSoundTime(params);
			uni.hideLoading();
			for (var i = 0; i < echoList.length; i++) {
				this.voiceData[i].recordTime = echoList[i].songtime;
				this.voiceData[i].songtimeIndex = echoList[i].songindex;
				this.voiceData[i].playTime = 0;
				this.voiceData[i].formatedPlayTime = util.formatTime(this.voiceData[i].playTime);
				this.voiceData[i].formatedRecordTimeed = util.formatTime(this.voiceData[i].recordTime);
				this.voiceData[i].hasRecord = true;
				this.voiceData[i].playing = false;
				this.$set(this.voiceData, i, this.voiceData[i]);
			}
		},
		getSoundTime(params) {
			return new Promise((resolve, reject) => {
				var res = {
					songtime: 100
				};
				getVoiceTime({ soundsrc: params }, function(req, res) {
					if (res.songtimelist && res.songtimelist.length >= 0) {
						console.log('returnde list:', res.songtimelist);
						resolve(res.songtimelist);
					} else {
						resolve(0);
					}
				});
			});
		},
		async startRecord() {
			console.log('audioData',this.audioData)
			if (this.audioData && this.audioData.pUrl) {
				uni.showModal({
					content: '开始录音将会删除已有录音,是否继续？',
					success: async e => {
						if (e.confirm) {
							// this.$request
							// .post({
							// 	url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
							// 	data: {
							// 		imgSn: this.audioData.imgSn ? this.audioData.imgSn : ''
							// 	}
							// })
							// .then(async res => {
							// 	res = res.result[0];
							// 	if (res.head.returnCode == '00000000') {
							// 		this.delRecorderData();
							// 		this.hasRecordTemp = false;
							// 		this.audioData = {};

							uni.showLoading({
								title: '加载中',
								mask: true
							});
							if (this.currenItem === '') {
								var resolve = await PlayStop();
							} else {
								this.stopVoice(this.currenItem.item, this.currenItem.index);
							}
							clearInterval(playTimeInterval);
							this.isHaveEcho = false;
							this.playing = false;
							this.formatedPlayTime = util.formatTime(0);
							this.playTime = 0;

							var resolve1 = await RecordStart();
							uni.hideLoading();
							this.startRecording = true;
							this.recording = true;
							this.hasRecord = false;
							recordTimeInterval = setInterval(() => {
								this.recordTime += 1;
								this.formatedRecordTime = util.formatTime(this.recordTime);
								if (this.recordTime >= 600) {
									this.recording = false;
									this.startRecording = true;
									this.isonlycanstopRecord = true;
									this.hasRecord = false;
									clearInterval(recordTimeInterval);
									uni.hideLoading();
								}
							}, 1000);
							// 	} else {
							// 		uni.showToast({
							// 			title: res.head.returnMsg,
							// 			icon: 'none',
							// 			duration: 1500
							// 		});
							// 	}
							// })
							// .catch(err => {});
						}
					},
					fail: () => {}
				});
			} else {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				if (this.currenItem === '') {
					var resolve = await PlayStop();
				} else {
					this.stopVoice(this.currenItem.item, this.currenItem.index);
				}
				clearInterval(playTimeInterval);
				this.isHaveEcho = false;
				this.playing = false;
				this.formatedPlayTime = util.formatTime(0);
				this.playTime = 0;

				var resolve1 = await RecordStart();
				uni.hideLoading();
				this.startRecording = true;
				this.recording = true;
				this.hasRecord = false;
				recordTimeInterval = setInterval(() => {
					this.recordTime += 1;
					this.formatedRecordTime = util.formatTime(this.recordTime);
					if (this.recordTime >= 600) {
						this.recording = false;
						this.startRecording = true;
						this.isonlycanstopRecord = true;
						this.hasRecord = false;
						clearInterval(recordTimeInterval);
						uni.hideLoading();
					}
				}, 1000);
			}
		},
		async pauseRecord() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var resolve = await RecordPause();
			uni.hideLoading();
			//暂停录音
			clearInterval(recordTimeInterval);
			this.recording = false;
			this.startRecording = true;
			this.hasRecord = false;
		},
		async stopRecord(oper) {
			this.isonlycanstopRecord = false;
			if (this.audioData && this.audioData.pUrl) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				var resolve = await RecordPause();
				uni.hideLoading();
				//暂停录音
				clearInterval(recordTimeInterval);
				this.recording = false;
				this.startRecording = true;
				this.hasRecord = false;
				this.$request
					.post({
						url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
						data: {
							imgSn: this.audioData.imgSn ? this.audioData.imgSn : ''
						}
					})
					.then(async res => {
						res = res.result[0];
						if (res.head.returnCode == '00000000') {
							this.delRecorderData();
							this.hasRecordTemp = false;
							uni.showLoading({
								title: '加载中',
								mask: true
							});
							var resolve = await RecordStop();
							//停止录音
							uni.hideLoading();
							this.recordTimeed = this.recordTime;
							this.recording = false;
							this.startRecording = false;
							this.recordTime = 0;
							this.hasRecord = true;
							this.isHaveEcho = true;
							this.hasRecordTemp = true;
							clearInterval(recordTimeInterval);
							this.formatedRecordTimeed = this.formatedRecordTime;
							this.formatedRecordTime = util.formatTime(0);
							this.$request
								.post({
									url: 'creditPhotoUpload/v1/CpmCreditUpload',
									data: {
										creditbase64: resolve.res.base64,
										phototype: this.ownData.type,
										serno: this.ownData.serno,
										fileType: 'mp3',
										delSign: this.isChangeAdd == true ? '1' : ''
									},
									upType: true,
									upMsg: '正在合成录音文件'
								})
								.then(res1 => {
									res1 = res1.result[0];
									if (res1.head.returnCode == '00000000') {
										this.audioData = {
											pUrl: res1.content.photoUrl,
											imgSn: res1.content.imgSn
										};
										this.$forceUpdate();
									}
								})
								.catch(err => {});
						} else {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			} else {
				this.isonlycanstopRecord = false;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				var resolve = await RecordStop();
				//停止录音
				uni.hideLoading();
				this.recordTimeed = this.recordTime;
				this.recording = false;
				this.startRecording = false;
				this.recordTime = 0;
				this.hasRecord = true;
				this.isHaveEcho = true;
				this.hasRecordTemp = true;
				clearInterval(recordTimeInterval);
				this.formatedRecordTimeed = this.formatedRecordTime;
				this.formatedRecordTime = util.formatTime(0);
				this.$request
					.post({
						url: 'creditPhotoUpload/v1/CpmCreditUpload',
						data: {
							creditbase64: resolve.res.base64,
							phototype: this.ownData.type,
							serno: this.ownData.serno,
							fileType: 'mp3',
							delSign: this.isChangeAdd == true ? '1' : ''
						},
						upType: true,
						upMsg: '正在合成录音文件'
					})
					.then(async res => {
						res = res.result[0];
						if (res.head.returnCode == '00000000') {
							this.audioData = {
								pUrl: res.content.photoUrl,
								imgSn: res.content.imgSn
							};
						}
					})
					.catch(async err => {});
			}
		},
		async playVoice(item, index) {
			if (index != undefined && index !== '') {
				this.currenItem = {
					item: item,
					index: index
				};
			} else {
				this.currenItem = '';
			}
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			if (this.currenItem === '') {
				this.stopVoice();
			} else {
				this.stopVoice(this.currenItem.item, this.currenItem.index);
			}
			clearInterval(playTimeInterval);
			if (index != undefined && index !== '') {
				var resolve = await PlayStart({ index: index });
				uni.hideLoading();
				item.playing = true;
				for (var i = 0; i < this.voiceData.length; i++) {
					if (this.voiceData[i].songtimeIndex == index) {
						this.$set(this.voiceData, i, item);
						break;
					}
				}
				playTimeInterval = setInterval(() => {
					item.playTime += 1;
					console.log(
						'多个的播放',
						item.formatedRecordTimeed == item.formatedPlayTime,
						'item.formatedRecordTime:',
						item.formatedRecordTimeed,
						'item.formatedPlayTime:',
						item.formatedPlayTime
					);
					item.formatedPlayTime = util.formatTime(item.playTime);
					if (item.formatedRecordTimeed == item.formatedPlayTime) {
						this.stopVoice(item, index);
					}
					for (var i = 0; i < this.voiceData.length; i++) {
						if (this.voiceData[i].songtimeIndex == index) {
							this.$set(this.voiceData, i, item);
							break;
						}
					}
				}, 1000);
			} else {
				console.log('eeeee在播放eeeee单个');
				var resolve = await PlayStart();
				this.currenItem = '';
				uni.hideLoading();
				this.playing = true;
				playTimeInterval = setInterval(() => {
					this.playTime += 1;
					// console.log(
					// 	'eeeeeeee',
					// 	this.formatedRecordTimeed == this.formatedPlayTime,
					// 	'this.formatedRecordTime:',
					// 	this.formatedRecordTimeed,
					// 	'this.formatedPlayTime:',
					// 	this.formatedPlayTime
					// );
					this.formatedPlayTime = util.formatTime(this.playTime);
					if (this.formatedRecordTimeed == this.formatedPlayTime) {
						this.stopVoice();
					}
				}, 1000);
			}
		},
		async pauseVoice(item, index) {
			if (index != undefined && index !== '') {
				var resolve = await PlayPause({ index: index });
			} else {
				var resolve = await PlayPause();
			}
			this.playing = false;
			if (index != undefined && index !== '') {
				item.playing = false;
				clearInterval(playTimeInterval);
				for (var i = 0; i < this.voiceData.length; i++) {
					if (this.voiceData[i].songtimeIndex == index) {
						this.$set(this.voiceData, i, item);
						break;
					}
				}
			} else {
				console.log('eeeee在止播放eeeee单个');
				this.playing = false;
				clearInterval(playTimeInterval);
			}
		},
		async stopVoice(item, index) {
			if (index != undefined && index !== '') {
				var resolve = await PlayStop({ index: index });
			} else {
				var resolve = await PlayStop();
			}
			if (index != undefined && index !== '') {
				console.log('eeeee在停止播放eeeee');
				item.playing = false;
				item.formatedPlayTime = util.formatTime(0);
				item.playTime = 0;
				clearInterval(playTimeInterval);
				for (var i = 0; i < this.voiceData.length; i++) {
					if (this.voiceData[i].songtimeIndex == index) {
						this.$set(this.voiceData, i, item);
						break;
					}
				}
			} else {
				console.log('eeeee在停止播放eeeee单个');
				this.playing = false;
				this.formatedPlayTime = util.formatTime(0);
				this.playTime = 0;
				clearInterval(playTimeInterval);
			}
		},
		async cancleRecord() {
			this.isonlycanstopRecord = false;
			var resolve = await RecordCancel();
			clearInterval(recordTimeInterval);
			this.recordTime = 0;
			this.formatedRecordTime = '00:00:00';
			this.recording = false;
			this.startRecording = false;
			this.hasRecord = this.hasRecordTemp;
			this.isHaveEcho = true;
		},
		async end() {
			await RecordCancel();
			this.delRecorderData();
			if (this.currenItem === '') {
			} else {
				this.stopVoice(this.currenItem.item, this.currenItem.index);
			}
			this.hasRecordTemp = false;
			clearInterval(recordTimeInterval);
			clearInterval(playTimeInterval);
			(this.recording = false), (this.playing = false), (this.hasRecord = false);
			(this.playTime = 0), (this.recordTime = 0);
			(this.formatedRecordTime = '00:00:00'), (this.formatedPlayTime = '00:00:00'), (this.formatedRecordTimeed = '00:00:00');
		},
		delRecorder() {
			uni.showModal({
				content: '是否确定删除录音？',
				success: e => {
					if (e.confirm) {
						if (this.CANUSE) {
							this.$request
								.post({
									url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
									data: {
										imgSn: this.audioData.imgSn ? this.audioData.imgSn : ''
									}
								})
								.then(res => {
									res = res.result[0];
									if (res.head.returnCode == '00000000') {
										this.delRecorderData();
										this.hasRecordTemp = false;
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1500
										});
										this.audioData = {};
									} else {
										uni.showToast({
											title: res.head.returnMsg,
											icon: 'none',
											duration: 1500
										});
									}
								})
								.catch(err => {});
						} else {
							this.delRecorderData();
							this.hasRecordTemp = false;
							this.audioData = {};
						}
					}
				},
				fail: () => {}
			});
		},
		async delRecorderData() {
			var resolve = await PlayStop();
			var resolve = await RecordClear();
			uni.hideLoading();
			clearInterval(playTimeInterval);
			this.audioData = {};
			(this.recording = false), (this.playing = false), (this.hasRecord = false);
			(this.playTime = 0), (this.recordTime = 0);
			(this.formatedRecordTime = '00:00:00'), (this.formatedPlayTime = '00:00:00'), (this.formatedRecordTimeed = '00:00:00');
		},
		tipEndRecord() {
			uni.showToast({
				title: '录音时长已到十分钟',
				icon: 'none',
				duration: 2000
			});
		}
	},
	watch: {
		audioData: {
			handler(v) {
				this.audioData = v;
				if (this.audioData.pUrl) {
					this.$emit('getAudioData', this.audioData);
				} else {
					this.$emit('getAudioData', '');
				}
			},
			deep: true
		},
		playTime() {
			var onepercent = 0;
			var secondarr = this.formatedRecordTimeed.split(':');
			var second = secondarr[2] * 1 + secondarr[1] * 60 * 1 + secondarr[0] * 60 * 60 * 1;
			onepercent = 100 / second;
			var progress = document.querySelector('#currenting .progressLIne.progress');
			progress.style.width = onepercent * this.playTime + '%';
		},
		voiceData: {
			handler(v) {
				for (var i = 0; i < this.voiceData.length; i++) {
					var onepercent = 0;
					var secondarr = this.voiceData[i].formatedRecordTimeed.split(':') || [];
					var second = secondarr[2] * 1 + secondarr[1] * 60 * 1 + secondarr[0] * 60 * 60 * 1;
					onepercent = 100 / second;
					var progress = document.querySelector('#line' + i + ' .progressLIne.progress');
					progress.style.width = onepercent * this.voiceData[i].playTime + '%';
				}
			},
			deep: true
		},
		lostFocus() {
			if (this.lostFocus == false) {
				console.log('暂停录音和暂停播放');
				this.cancleRecord();
				this.stopVoice();
			}
		},
		closeVoice() {
			if (this.closeVoice) {
				this.cancleRecord();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.w100 {
	width: 100%;
	height: 100%;
	position: relative;
	padding: 32rpx;
	box-sizing: border-box;
	background: $mc-bg-color;
}
.canscroll {
	height: 50%;
	overflow: auto;
}
.playDivWrap {
	position: relative;
	margin: 0 40rpx;
	padding-top: 40rpx;
	padding-bottom: 17px;
}
.payTitle {
	font-family: PingFang-SC-Bold;
	font-size: 32rpx;
	color: $mc-text-title;
	letter-spacing: 0;
	line-height: 32rpx;
}
.payDateInfo {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-caption;
	letter-spacing: 0;
	line-height: 68rpx;
}
.progressWrap {
	margin-top: 44rpx;
	overflow: hidden;
}
.progressLIne {
	position: relative;
	height: 4rpx;
	background: $mc-division;
}
.progressLIne.progress {
	background: $mc-color-blue;
	width: 0%;
}
.divflex {
	display: flex;
	justify-content: space-between;
}
.divflex.oneBtn {
	justify-content: flex-end;
}
.timeDiv {
	font-size: 24rpx;
	line-height: 44rpx;
	color: $mc-text-caption;
}
.voiceOPer {
	margin-top: 40rpx;
}
.operIcon {
	display: inline-block;
}

.voiceDel {
	width: 50rpx;
	height: 50rpx;
	background: image-set(url('record/delt.png') 1x, url('record/delt@2x.png') 2x, url('record/delt@3x.png') 3x) no-repeat center;
	background-size: contain;
}
.voiceDelcan {
	width: 50rpx;
	height: 50rpx;
	background: image-set(url('record/delthover.png') 1x, url('record/delthover@2x.png') 2x, url('record/delthover@3x.png') 3x) no-repeat center;
	background-size: contain;
}
.voicePlay {
	width: 42rpx;
	height: 48rpx;
	background: image-set(url('record/play.png') 1x, url('record/play@2x.png') 2x, url('record/play@3x.png') 3x) no-repeat center;
	background-size: contain;
}
.voicePlaycan {
	width: 42rpx;
	height: 48rpx;
	background: image-set(url('record/playhover.png') 1x, url('record/playhover@2x.png') 2x, url('record/playhover@3x.png') 3x) no-repeat center;
	background-size: contain;
}
.voicePause {
	width: 36rpx;
	height: 48rpx;
	background: image-set(url('record/stop2.png') 1x, url('record/stop2@2x.png') 2x, url('record/stop2@3x.png') 3x) no-repeat center;
	background-size: contain;
}

.mc-padding-wrap {
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at top right, #e4ecfa 7%, #ffffff 28%);
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
}
.recordTimeWrap {
	position: absolute;
	text-align: center;
	width: 100%;
	bottom: 300rpx;
	left: 0;
}
.recordTimeWrap uni-image {
	width: 114rpx;
	height: 164rpx;
}
.recordTime {
	margin: 20rpx auto;
	font-size: 28rpx;
	color: #adc6f7;
	letter-spacing: 0;
	text-align: center;
	line-height: 68rpx;
}
.startRecordIcon {
	width: 114rpx;
	height: 164rpx;
}
.mc-body-buttonwrap {
	width: 100%;
	position: absolute;
	bottom: 120rpx;
	left: 0;
	padding: 0 112rpx;
	box-sizing: border-box;
}
.mc-body-buttons {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	justify-content: space-between;
	-webkit-box-align: end;
	-webkit-align-items: flex-end;
	align-items: flex-end;
	position: relative;
}
.cancel {
	width: 50rpx;
	height: 50rpx;
	background: image-set(url('record/quxiao.png') 1x, url('record/quxiao@2x.png') 2x, url('record/quxiao@3x.png') 3x) no-repeat right top;
	background-size: contain;
	overflow: hidden;
}
.sure {
	width: 50rpx;
	height: 50rpx;
	overflow: hidden;
	background: image-set(url('record/queren.png') 1x, url('record/queren@2x.png') 2x, url('record/queren@3x.png') 3x) no-repeat right top;
	background-size: contain;
}
.play {
	width: 114rpx;
	height: 114rpx;
	overflow: hidden;
	background: image-set(url('record/recordstart.png') 1x, url('record/recordstart@2x.png') 2x, url('record/recordstart@3x.png') 3x) no-repeat right top;
	background-size: contain;
}
.pause {
	width: 114rpx;
	height: 114rpx;
	overflow: hidden;
	background: image-set(url('record/recordstop.png') 1x, url('record/recordstop@2x.png') 2x, url('record/recordstop@3x.png') 3x) no-repeat right top;
	background-size: contain;
}
.mc-body-buttons .btnText {
	display: block;
	position: absolute;
	bottom: -48rpx;
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-title;
	letter-spacing: 0;
	line-height: 28rpx;
	width: 74px;
}

image {
	width: 150rpx;
	height: 150rpx;
}

.page-body-wrapper {
	justify-content: space-between;
	flex-grow: 1;
	margin-bottom: 300rpx;
}

.page-body-time {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.time-big {
	margin: 20rpx;
	font-size: 28rpx;
	color: #adc6f7;
	letter-spacing: 0;
	text-align: center;
	line-height: 68rpx;
}

.time-small {
	font-size: 30rpx;
}

.page-body-buttons {
	margin-top: 60rpx;
	display: flex;
	justify-content: space-around;
}

.page-body-button {
	width: 250rpx;
	text-align: center;
}

.button-stop-record {
	width: 110rpx;
	height: 110rpx;
	border: 20rpx solid #fff;
	background-color: #f55c23;
	border-radius: 130rpx;
	margin: 0 auto;
}
</style>
