<template>
	<view class="w100">
		<view class="mc-padding-wrap">
			<view class="playDivWrap bottomGap">
				<view class="payTitle">录音（10分钟内）</view>
				<view class="payDateInfo">2020nian09yue90ri 00:00:00</view>
				<view class="progressLIne progressWrap"><view class="progressLIne progress"></view></view>
				<view class="divflex timeDiv">
					<span>{{formatedPlayTime}}</span>
					<span>{{formatedRecordTime}}</span>
				</view>
				<view class="divflex voiceOPer">
					<span v-if="!hasRecord" class="operIcon voiceDel"></span>
					<span v-if="hasRecord" @click="clear" class="operIcon voiceDelcan"></span>
					<span v-if="!hasRecord" class="operIcon voicePlay"></span>
					<span v-if="hasRecord && !playing" @click="playVoice" class="operIcon voicePlaycan"></span>
					<span v-if="hasRecord && playing"  @click="stopVoice" class="operIcon voicePause"></span>
				</view>
			</view>
			<view class="recordTimeWrap">
				<view class="recordTime" v-if="startRecording">00:00:00</view>
				<image class="startRecordIcon" v-if="!startRecording" @click="startRecord" src="./record/luyinno@2x.png" mode=""></image>
				<image class="startRecordIcon" v-if="startRecording" src="./record/luyinicon@2x.png" mode=""></image>
			</view>
			<view class="mc-body-buttonwrap" v-if="startRecording">
				<view class="mc-body-buttons">
					<view class="cancel"><span class="btnText">取消</span></view>
					<view v-if="!recording" class="play"></view>
					<view v-if="recording" @click="stopRecord" class="pause"></view>
					<!-- <view class="" style="width: 30px;"> -->
					<view class="sure"><span class="btnText">确定</span></view>
					<!-- </view> -->
				</view>
			</view>
			<!-- <block v-if="!recording && !playing && !hasRecord">
                <view class="page-body-time">
                    <text class="time-big">{{formatedRecordTime}}</text>
                </view>
                <view class="page-body-buttons">
                    <view class="page-body-button"></view>
                    <view class="page-body-button" @click="startRecord">
                        <image src="/static/img/luyinicon@2x.png"></image>
                    </view>
                    <view class="page-body-button"></view>
                </view>
            </block>
            <block v-if="recording === true">
                <view class="page-body-time">
                    <text class="time-big">{{formatedRecordTime}}</text>
                </view>
                <view class="page-body-buttons">
                    <view class="page-body-button"></view>
                    <view class="page-body-button" @click="stopRecord">
                        <view class="button-stop-record"></view>
                    </view>
                    <view class="page-body-button"></view>
                </view>
            </block>
            <block v-if="hasRecord === true && playing === false">
                <view class="page-body-time">
                    <text class="time-big">{{formatedPlayTime}}</text>
                    <text class="time-small">{{formatedRecordTime}}</text>
                </view>
                <view class="page-body-buttons">
                    <view class="page-body-button" @click="playVoice">
                        <image src="/static/img/play.png"></image>
                    </view>
                    <view class="page-body-button" @click="clear">
                        <image src="/static/delt.png"></image>
                    </view>
                </view>
            </block>
            <block v-if="hasRecord === true && playing === true">
                <view class="page-body-time">
                    <text class="time-big">{{formatedPlayTime}}</text>
                    <text class="time-small">{{formatedRecordTime}}</text>
                </view>
                <view class="page-body-buttons">
                    <view class="page-body-button" @click="stopVoice">
                        <image src="/static/img/stopicon.png"></image>
                    </view>
                    <view class="page-body-button" @click="clear">
                        <image src="/static/img/delt.png"></image>
                    </view>
                </view>
            </block>-->
		</view>
	</view>
</template>
<script>
// #ifdef APP-PLUS
import permision from '@/common/permission.js';
// #endif
var util = require('@/common/util.js');
var playTimeInterval = null;
var recordTimeInterval = null;
var recorderManager = null;
var music = null;
export default {
	data() {
		return {
			title: 'start/stopRecord、play/stopVoice',
			startRecording: false, //是否点击开始录音
			recording: false, //录音中
			playing: false, //播放中
			hasRecord: false, //是否有了一个录音文件
			tempFilePath: '',
			recordTime: 0,
			playTime: 0,
			formatedRecordTime: '00:00:00', //录音的总时间
			formatedPlayTime: '00:00:00' //播放录音的当前时间
		};
	},
	onUnload: function() {
		this.end();
	},
	onLoad: function() {
		music = uni.createInnerAudioContext();
		music.onEnded(() => {
			clearInterval(playTimeInterval);
			var playTime = 0;
			console.log('play voice finished');
			this.playing = false;
			this.formatedPlayTime = util.formatTime(playTime);
			this.playTime = playTime;
		});
		recorderManager = uni.getRecorderManager();
		recorderManager.onStart(() => {
			console.log('recorder start');

			this.recording = true;
			recordTimeInterval = setInterval(() => {
				this.recordTime += 1;
				this.formatedRecordTime = util.formatTime(this.recordTime);
			}, 1000);
		});
		recorderManager.onStop(res => {
			console.log('on stop');
			music.src = res.tempFilePath;

			this.hasRecord = true;
			this.recording = false;
		});
		recorderManager.onError(() => {
			console.log('recorder onError');
		});
	},
	methods: {
		async startRecord() {
			//开始录音
			// #ifdef APP-PLUS
			let status = await this.checkPermission();
			if (status !== 1) {
				return;
			}
			// #endif

			// TODO ios 在没有请求过权限之前无法得知是否有相关权限，这种状态下需要直接调用录音，但没有状态或回调判断用户拒绝
			recorderManager.start({
				format: 'mp3'
			});
		},
		stopRecord() {
			//停止录音
			recorderManager.stop();
			clearInterval(recordTimeInterval);
		},
		playVoice() {
			console.log('play voice');
			this.playing = true;
			playTimeInterval = setInterval(() => {
				this.playTime += 1;
				this.formatedPlayTime = util.formatTime(this.playTime);
			}, 1000);
			music.play();
		},
		stopVoice() {
			clearInterval(playTimeInterval);
			this.playing = false;
			this.formatedPlayTime = util.formatTime(0);
			this.playTime = 0;
			music.stop();
		},
		end() {
			music.stop();
			recorderManager.stop();
			clearInterval(recordTimeInterval);
			clearInterval(playTimeInterval);
			(this.recording = false), (this.playing = false), (this.hasRecord = false);
			(this.playTime = 0), (this.recordTime = 0);
			(this.formatedRecordTime = '00:00:00'), (this.formatedRecordTime = '00:00:00');
		},
		clear() {
			this.end();
		},
		// #ifdef APP-PLUS
		async checkPermission() {
			let status = permision.isIOS ? await permision.requestIOS('record') : await permision.requestAndroid('android.permission.RECORD_AUDIO');

			if (status === null || status === 1) {
				status = 1;
			} else if (status === 2) {
				uni.showModal({
					content: '系统麦克风已关闭',
					confirmText: '确定',
					showCancel: false,
					success: function(res) {}
				});
			} else {
				uni.showModal({
					content: '需要麦克风权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}
			return status;
		}
		// #endif
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
}
.progressLIne {
	position: relative;
	height: 4rpx;
	background: $mc-division;
}
.divflex {
	display: flex;
	justify-content: space-between;
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
	background: image-set(url('@/static/img/wlbg.png') 1x, url('@/static/img/wlbg@2x.png') 2x, url('@/static/img/wlbg@3x.png') 3x) no-repeat right top;
	background-size: 224rpx 200rpx;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
}
.recordTimeWrap {
	position: absolute;
	text-align: center;
	width: 100%;
	bottom: 362rpx;
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
