<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<tabbars
			tposition="top"
			:titleBottomLine="true"
			:swduration="120"
			style="height: 100%;"
			@getCurrent="currentTabIndexMain = $event"
			ref="tabs"
			:onBeforeSwitch1="onBeforeSwitch1"
			:onBeforeSwitch="onBeforeSwitch"
			@getIsorigin="getIsorigin = $event"
			@getnid="currentTabIndexMainShow.push($event)"
		>
			<swiper-item label="临时客户信息" nid="lskhxx" v-if="custType == 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('lskhxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">客户类型</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="temporary.cus_type" :data="selectdata.cus_type"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件类型</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isQueryDetail || isChangeFrom || saved"
								v-model="temporary.cert_type"
								:data="selectdata.cert_type"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件号码</view>
							<input
								@blur="getGamateCusId(temporary.cert_type, temporary.cert_code, 'jiaoyan', 'temporary')"
								v-model="temporary.cert_code"
								:disabled="isQueryDetail || isChangeFrom || saved"
								type="text"
								class="uni-input"
								value=""
								placeholder="请输入证件号码"
							/>
							<span
								:class="{ iconCertDiscern: true, idisables: isQueryDetail || isChange || temporary.cert_type != '10' }"
								@click="isQueryDetail || isChange || temporary.cert_type != '10' ? '' : toDiscernCert('temporary')"
							></span>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">姓名</view>
							<input v-model="temporary.cus_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入姓名" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">性别</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isQueryDetail || temporary.cert_type == '10'"
								v-model="temporary.indiv_sex"
								:data="selectdata.indiv_sex"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">出生日期</view>
							<mc-picker-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail || temporary.cert_type == '10'"
								mode="date"
								v-model="temporary.indiv_dt_of_birth"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">国别</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="temporary.indiv_country"
								range-key="label"
								:range="selectdata.indiv_country"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">最高学历</view>
							<mc-pop-select class="uni-input" :clearable="true" :disabled="isQueryDetail" v-model="temporary.indiv_edt" :data="selectdata.indiv_edt"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">最高学位</view>
							<mc-pop-select class="uni-input" :clearable="true" :disabled="isQueryDetail" v-model="temporary.indiv_dgr" :data="selectdata.indiv_dgr"></mc-pop-select>
						</view>
						<!-- <view class="uni-form-item uni-column nopb bottomGap" v-if="tempEdtRequire"> -->
						<view class="uni-form-item uni-column nopb bottomGap">
							<!-- <view class="title" :class="{ requireIcon: tempEdtRequire }">学位说明</view> -->
							<view class="title">学位说明</view>
							<textarea class="oneTextarea" :disabled="isQueryDetail" v-model="temporary.edt_remark" maxlength="200" placeholder="请输入(200字以内)" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title ">参加工作年月</view>
							<mc-picker-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								:fields="'month'"
								mode="date"
								v-model="temporary.indiv_work_job_y"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">月收入(元)</view>
							<input v-model="temporary.indiv_ann_mouth" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入月收入" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">月债务支出(元)</view>
							<input v-model="temporary.on_debt_payments" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入月债务支出" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">是否进入全国法院失信被执行人名单</view>
							<mc-radio-group v-model="temporary.isretaliate" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title minHeight1">是否在全国法院被执行人信息查询中有记录且正在执行中</view>
							<mc-radio-group v-model="temporary.isexecuted" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">诚信状况</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="temporary.integstatus"
								:data="selectdata.integstatus"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">从事当前经营行业起始年份</view>
							<mc-picker-select class="uni-input" :disabled="isQueryDetail" :fields="'year'" mode="date" v-model="temporary.termyear"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">婚姻状况</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="temporary.indiv_mar_st" :data="selectdata.indiv_mar_st"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">供养人数</view>
							<input v-model="temporary.supportnumber" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入供养人数" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">家庭子女人数</view>
							<input v-model="temporary.childrensum" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入家庭子女人数" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">职业</view>
							<mc-pop-select class="uni-input" :clearable="true" :disabled="isQueryDetail" v-model="temporary.indiv_occ" :data="selectdata.indiv_occ"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">职务</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="temporary.indiv_com_job_ttl"
								:data="selectdata.indiv_com_job_ttl"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">职称</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="temporary.indiv_crtfctn"
								:data="selectdata.indiv_crtfctn"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<!-- onerow -->
							<view class="title requireIcon">工作单位</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="temporary.indiv_com_name"
								:disabled="isQueryDetail"
								maxlength="100"
								placeholder="请输入工作单位"
							/>
							<!-- <input v-model="temporary.indiv_com_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入工作单位" /> -->
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">通讯地址</view>
							<textarea class="autoHeightArea" auto-height v-model="temporary.post_addr" :disabled="isQueryDetail" maxlength="80" placeholder="请输入通讯地址" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">邮政编码</view>
							<input v-model="temporary.post_code" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入邮政编码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域名称</view>
							<mc-picker-select
								mode="area"
								:disabled="isQueryDetail"
								v-model="temporary.area_code"
								@getName="temporary.area_name = $event"
								class="uni-input"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域编号</view>
							<input disabled v-model="temporary.area_code" type="text" class="uni-input" value="" placeholder="请输入区域编号" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">单位电话</view>
							<input :disabled="isQueryDetail" v-model="temporary.indiv_com_phn" type="tel" class="uni-input" value="" placeholder="请输入单位电话" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">住宅电话</view>
							<input v-model="temporary.fphone" :disabled="isQueryDetail" type="tel" class="uni-input" value="" placeholder="请输入住宅电话" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">手机号码</view>
							<input v-model="temporary.mobile" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入手机号码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">短信通知号</view>
							<input v-model="temporary.phone" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入短信通知号" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">个人简历</view>
							<textarea class="oneTextarea" :disabled="isQueryDetail" v-model="temporary.work_resume" maxlength="500" placeholder="请输入(500字以内)" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">更新人</view>
							<input v-model="temporary.last_upd_id" :disabled="true" type="text" class="uni-input" value="" placeholder="请输入更新人" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">更新日期</view>
							<mc-picker-select class="uni-input" :disabled="true" mode="date" v-model="temporary.last_upd_date"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">登记日期</view>
							<mc-picker-select :disabled="true" class="uni-input" mode="date" v-model="temporary.input_date"></mc-picker-select>
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'temporary')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="我行基本信息" nid="whjbxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('whjbxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">客户类型</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="ourBankBaseInfo.cus_type" :data="selectdata.cus_type"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件类型</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isChangeFrom || isQueryDetail || saved"
								v-model="ourBankBaseInfo.cert_type"
								:data="selectdata.cert_type"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">证件号码</view>
							<input
								v-model="ourBankBaseInfo.cert_code"
								:disabled="isChangeFrom || isQueryDetail || saved"
								@blur="getGamateCusId(ourBankBaseInfo.cert_type, ourBankBaseInfo.cert_code, 'jiaoyan', 'ourBankBaseInfo')"
								type="text"
								class="uni-input"
								value=""
								placeholder="请输入证件号码"
							/>
							<span
								:class="{ iconCertDiscern: true, idisables: isQueryDetail || isChange || ourBankBaseInfo.cert_type != '10' }"
								@click="isQueryDetail || isChange || ourBankBaseInfo.cert_type != '10' ? '' : toDiscernCert('ourBankBaseInfo')"
							></span>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">姓名</view>
							<input v-model="ourBankBaseInfo.cus_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入姓名" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">性别</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isQueryDetail || ourBankBaseInfo.cert_type == '10'"
								v-model="ourBankBaseInfo.indiv_sex"
								:data="selectdata.indiv_sex"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">民族</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="ourBankBaseInfo.indiv_ntn"
								range-key="label"
								:range="selectdata.indiv_ntn"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">出生日期</view>
							<mc-picker-select
								class="uni-input"
								:disabled="isQueryDetail || ourBankBaseInfo.cert_type == '10'"
								mode="date"
								v-model="ourBankBaseInfo.indiv_dt_of_birth"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">户籍地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="ourBankBaseInfo.indiv_houh_reg_add"
								:disabled="isQueryDetail"
								maxlength="60"
								placeholder="请输入户籍地址"
							/>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">现住地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="ourBankBaseInfo.now_address"
								:disabled="isQueryDetail"
								maxlength="200"
								placeholder="请输入现住地址"
							/>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="" style="display: flex; justify-content: space-between;">
								<view class="title requireIcon">证件是否长期有效</view>
								<!-- <span
								:class="{ iconCertDiscern: true, idisables: ourBankBaseInfo.cert_type != '10' }"
								@click="isQueryDetail || ourBankBaseInfo.cert_type != '10' ? '' : toDiscernCert('ourBankBaseInfo', false)"
							></span> -->
							</view>
							<mc-radio-group v-model="ourBankBaseInfo.long_flag" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">证件起始日</view>
							<mc-picker-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								mode="date"
								v-model="ourBankBaseInfo.indiv_id_sta_dt"
							></mc-picker-select>
							<span
								:class="{ iconCertDiscern: true, idisables: ourBankBaseInfo.cert_type != '10' }"
								@click="isQueryDetail || ourBankBaseInfo.cert_type != '10' ? '' : toDiscernCert('ourBankBaseInfo', false)"
							></span>
						</view>
						<view v-if="individexpdtreq" class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title" :class="{ requireIcon: individexpdtreq }">证件到期日</view>
							<mc-picker-select
								class="uni-input"
								:clearable="individexpdtreq == false"
								:disabled="isQueryDetail"
								mode="date"
								v-model="ourBankBaseInfo.indiv_id_exp_dt"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">英文名称</view>
							<input v-model="ourBankBaseInfo.en_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入英文名称" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否农户</view>
							<mc-radio-group v-model="ourBankBaseInfo.agri_flg" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<block v-if="farmingfarmcoop">
							<view class="uni-form-item uni-column nopb bottomGap">
								<view class="title requireIcon">是否农业专业大户</view>
								<mc-radio-group v-model="ourBankBaseInfo.is_farming" :left="true" :disabled="isQueryDetail">
									<mc-radio value="1" label="是"></mc-radio>
									<mc-radio value="2" label="否"></mc-radio>
								</mc-radio-group>
							</view>

							<view class="uni-form-item uni-column nopb bottomGap">
								<view class="title requireIcon">是否家庭农场</view>
								<mc-radio-group v-model="ourBankBaseInfo.is_farmcoop" :left="true" :disabled="isQueryDetail">
									<mc-radio value="1" label="是"></mc-radio>
									<mc-radio value="2" label="否"></mc-radio>
								</mc-radio-group>
							</view>
						</block>

						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">与我行关系</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="ourBankBaseInfo.cus_bank_rel"
								range-key="label"
								:range="selectdata.cus_bank_rel"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap" id="is_bank_stk">
							<view class="title requireIcon">是否我行股东</view>
							<mc-radio-group v-model="ourBankBaseInfo.is_bank_stk" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap" v-if="comholdstkamt">
							<view class="title" :class="{ requireIcon: comholdstkamt }">拥有我行股份金额(元)</view>
							<input
								v-model="ourBankBaseInfo.com_hold_stk_amt"
								:disabled="isQueryDetail"
								type="number"
								class="uni-input"
								value=""
								placeholder="请输入拥有我行股份金额"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">在我行职务</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								v-model="ourBankBaseInfo.bank_duty"
								:disabled="isQueryDetail"
								:data="selectdata.bank_duty"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">上本行黑名单标志</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								v-model="ourBankBaseInfo.blist_flag"
								:disabled="isQueryDetail"
								:data="selectdata.blist_flag"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title ">上黑名单日期</view>
							<mc-picker-select class="uni-input" mode="date" :clearable="true" :disabled="isQueryDetail" v-model="ourBankBaseInfo.blist_date"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title">上黑名单原因</view>
							<input v-model="ourBankBaseInfo.blist_reason" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入上黑名单原因" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title ">最近走访日期</view>
							<mc-picker-select class="uni-input" mode="date" :disabled="isQueryDetail" v-model="ourBankBaseInfo.walk_dt"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title ">最近稽查日期</view>
							<mc-picker-select class="uni-input" :clearable="true" mode="date" :disabled="isQueryDetail" v-model="ourBankBaseInfo.check_dt"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">渠道来源</view>
							<mc-pop-select class="uni-input" v-model="ourBankBaseInfo.is_tax" :disabled="isQueryDetail" :data="selectdata.is_tax"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否新客户</view>
							<mc-radio-group v-model="ourBankBaseInfo.new_cus" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否承接类客户</view>
							<mc-radio-group v-model="ourBankBaseInfo.undertake_cus" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">诚信状况</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="ourBankBaseInfo.integstatus"
								:data="selectdata.integstatus"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">信息透明度</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="ourBankBaseInfo.transparency"
								:data="selectdata.transparency"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">是否进入全国法院失信被执行人名单</view>
							<mc-radio-group v-model="ourBankBaseInfo.isretaliate" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column lastRow">
							<view class="title minHeight1">是否在全国法院被执行人信息查询中有记录且正在执行中</view>
							<mc-radio-group v-model="ourBankBaseInfo.isexecuted" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'ourBankBaseInfo')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="经营情况" nid="jyqk" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('jyqk') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">是否有营业执照</view>
							<mc-radio-group v-model="businessInfo.reg_flag" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<block v-if="regcodeRequire">
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">登记注册号</view>
								<input v-model="businessInfo.reg_code" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入登记注册号" />
							</view>
							<view class="uni-form-item uni-column nopb bottomGap">
								<!-- onerow -->
								<view class="title requireIcon">单位名称</view>
								<textarea
									class="autoHeightArea"
									auto-height
									v-model="businessInfo.word_name"
									:disabled="isQueryDetail"
									maxlength="500"
									placeholder="请输入单位名称"
								/>
								<!-- <input v-model="businessInfo.word_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入单位名称" /> -->
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">发证机关</view>
								<input v-model="businessInfo.reg_org" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入发证机关" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">组成形式</view>
								<mc-pop-select class="uni-input" v-model="businessInfo.reg_type" :disabled="isQueryDetail" :data="selectdata.reg_type"></mc-pop-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">经营场所</view>
								<input v-model="businessInfo.oper_place" type="text" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入经营场所" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">经营范围及方式</view>
								<input v-model="businessInfo.oper_range_way" type="text" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入经营范围及方式" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">营业执照起始日</view>
								<mc-picker-select class="uni-input" mode="date" :disabled="isQueryDetail" v-model="businessInfo.reg_start_date"></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">营业执照到期日</view>
								<mc-picker-select class="uni-input" mode="date" :disabled="isQueryDetail" v-model="businessInfo.reg_end_date"></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">是否有组织机构代码</view>
								<mc-radio-group v-model="businessInfo.ins_code_flag" :left="true" :disabled="isQueryDetail">
									<mc-radio value="1" label="是"></mc-radio>
									<mc-radio value="2" label="否"></mc-radio>
								</mc-radio-group>
							</view>
							<block v-if="flagdatename">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">组织机构代码</view>
									<input
										v-model="businessInfo.indiv_ins_code"
										type="text"
										:disabled="isQueryDetail"
										class="uni-input"
										value=""
										placeholder="请输入组织机构代码"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">组织机构代码有效期</view>
									<mc-picker-select class="uni-input" mode="date" :disabled="isQueryDetail" v-model="businessInfo.ins_code_date"></mc-picker-select>
								</view>
							</block>
							<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="ourBankBaseInfo.cus_type == '150'">
								<view class="title requireIcon">经营者姓名</view>
								<input v-model="businessInfo.operator_name" type="text" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入经营者姓名" />
							</view>
						</block>
						<view class="uni-form-item uni-column lastRow">
							<view class="title requireIcon">备注</view>
							<textarea v-model="businessInfo.reg_desc" placeholder="请输入备注" :disabled="isQueryDetail" />
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'businessInfo')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="个人基本信息" nid="gejbxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('gejbxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">国别</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="indivInfo.indiv_country"
								range-key="label"
								:range="selectdata.indiv_country"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">籍贯</view>
							<input v-model="indivInfo.indiv_brt_place" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入籍贯" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">现住房类别</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="indivInfo.now_hous_type"
								:data="selectdata.now_hous_type"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">现住房产权类别</view>
							<mc-pop-select
								class="uni-input"
								:disabled="isQueryDetail"
								v-model="indivInfo.now_property_nature"
								:data="selectdata.now_property_nature"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">政治面貌</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								:disabled="isQueryDetail"
								v-model="indivInfo.indiv_pol_st"
								:data="selectdata.indiv_pol_st"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">最高学历</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="indivInfo.indiv_edt" :data="selectdata.indiv_edt"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">最高学位</view>
							<mc-pop-select class="uni-input" :clearable="true" :disabled="isQueryDetail" v-model="indivInfo.indiv_dgr" :data="selectdata.indiv_dgr"></mc-pop-select>
						</view>
						<!-- <view class="uni-form-item uni-column nopb onerow bottomGap" v-if="indivInfotempEdtRequire"> -->
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<!-- <view class="title" :class="{ requireIcon: indivInfotempEdtRequire }">学位说明</view> -->
							<view class="title">学位说明</view>
							<input v-model="indivInfo.edt_remark" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入学位说明" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">健康状况</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="indivInfo.indiv_heal_st" :data="selectdata.indiv_heal_st"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">是否为企业主</view>
							<mc-radio-group v-model="indivInfo.is_business_owner" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<block v-if="isbusinessowner">
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">企业成立年月</view>
								<mc-picker-select class="uni-input" :disabled="isQueryDetail" :fields="'month'" mode="date" v-model="indivInfo.com_str_date"></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">经营起始年份</view>
								<mc-picker-select class="uni-input" :disabled="isQueryDetail" :fields="'year'" mode="date" v-model="indivInfo.startworkdate"></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column nopb bottomGap">
								<view class="title requireIcon">最近一个完整年度营业收入(元)</view>
								<input
									v-model="indivInfo.yearlamt"
									:disabled="isQueryDetail"
									type="number"
									class="uni-input textLeft"
									value=""
									placeholder="请输入最近一个完整年度营业收入"
								/>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">经营场地所有权</view>
								<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="indivInfo.com_opt_owner" :data="selectdata.com_opt_owner"></mc-pop-select>
							</view>
						</block>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">社会保障情况</view>
							<mc-checkbox-group
								v-model="indivInfo.indiv_soc_scr"
								:disabled="isQueryDetail"
								:notValue="'07'"
								:data="selectdata.indiv_soc_scr"
								class="mcradio"
							></mc-checkbox-group>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">是否本地人</view>
							<mc-radio-group v-model="indivInfo.localflag" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">工作单位是否本地</view>
							<mc-radio-group v-model="indivInfo.islocalcom" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">是否在经营地有固定住所</view>
							<mc-radio-group v-model="indivInfo.residencecompliancedflag" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">是否拥有本地房产</view>
							<mc-radio-group v-model="indivInfo.ishaveloacalhourse" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title">本地居住年限</view>
							<input v-model="indivInfo.localresidenceyear" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入本地居住年限" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title">工作年限</view>
							<input v-model="indivInfo.careeryear" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入工作年限" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title">家庭月收入(元)</view>
							<input v-model="indivInfo.familymonthincome" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入家庭月收入(元)" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title">家庭人数</view>
							<input v-model="indivInfo.familysum" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入家庭人数" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">家庭子女人数</view>
							<input v-model="indivInfo.childrensum" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入家庭子女人数" />
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">供养人数</view>
							<input v-model="indivInfo.supportnumber" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入供养人数" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">借款人从事当前经营行业起始年份</view>
							<input
								v-model="indivInfo.termyear"
								type="number"
								:disabled="isQueryDetail"
								class="uni-input textLeft"
								value=""
								placeholder="请输入借款人从事当前经营行业起始年份"
							/>
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">居住邮编</view>
							<input v-model="indivInfo.postcodetax" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入居住邮编" />
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'indivInfo')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="婚姻状况" nid="hyzk" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('hyzk') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb" :class="{ lastRow: !msindivmars, bottomGap: msindivmars }">
							<view class="title requireIcon">婚姻状况</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="maritalStatus.indiv_mar_st" :data="selectdata.indiv_mar_st"></mc-pop-select>
						</view>
						<block v-if="msindivmars">
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">配偶证件类型</view>
								<mc-pop-select
									class="uni-input"
									:disabled="isQueryDetail"
									v-model="maritalStatus.indiv_sps_id_typ"
									:data="selectdata.indiv_sps_id_typ"
								></mc-pop-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">配偶证件号码</view>
								<input
									:disabled="isQueryDetail"
									v-model="maritalStatus.indiv_sps_id_code"
									type="text"
									@blur="getGamateCusId(maritalStatus.indiv_sps_id_typ, maritalStatus.indiv_sps_id_code, 'marital')"
									class="uni-input"
									value=""
									placeholder="请输入配偶证件号码"
								/>
								<span
									:class="{ iconCertDiscern: true, idisables: maritalStatus.indiv_sps_id_typ != '10' }"
									@click="isQueryDetail || maritalStatus.indiv_sps_id_typ != '10' ? '' : toDiscernCert('maritalStatus')"
								></span>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">结婚证号</view>
								<input v-model="maritalStatus.indiv_sps_mar_code" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入结婚证号" />
								<span :class="{ iconCertDiscern: true }" @click="isQueryDetail ? '' : marDiscern('maritalStatus')"></span>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">配偶姓名</view>
								<input v-model="maritalStatus.indiv_sps_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入配偶姓名" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">配偶客户号</view>
								<input v-model="maritalStatus.cus_id_rel" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入配偶客户号" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">配偶职业</view>
								<mc-pop-select
									class="uni-input"
									:clearable="true"
									:disabled="isQueryDetail"
									v-model="maritalStatus.indiv_sps_occ"
									:data="selectdata.indiv_occ"
								></mc-pop-select>
							</view>
							<view class="uni-form-item uni-column nopb bottomGap">
								<view class="title requireIcon">工作单位</view>
								<textarea
									class="autoHeightArea"
									auto-height
									v-model="maritalStatus.indiv_scom_name"
									:disabled="isQueryDetail"
									maxlength="100"
									placeholder="请输入工作单位"
								/>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">职务</view>
								<mc-pop-select
									class="uni-input"
									:disabled="isQueryDetail"
									v-model="maritalStatus.indiv_sps_duty"
									:data="selectdata.indiv_com_job_ttl"
								></mc-pop-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">职称</view>
								<mc-pop-select
									class="uni-input"
									:disabled="isQueryDetail"
									v-model="maritalStatus.indiv_psp_crtfctn"
									:data="selectdata.indiv_crtfctn"
								></mc-pop-select>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">手机号码</view>
								<input v-model="maritalStatus.indiv_sps_mphn" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入手机号码" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">单位电话</view>
								<input v-model="maritalStatus.indiv_sps_phn" type="tel" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入单位电话" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">配偶月收入(元)</view>
								<input
									v-model="maritalStatus.indiv_sps_mincm"
									type="number"
									:disabled="isQueryDetail"
									class="uni-input"
									value=""
									placeholder="请输入配偶月收入(元)"
								/>
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">参加工作年份</view>
								<mc-picker-select
									class="uni-input"
									:clearable="true"
									mode="date"
									:disabled="isQueryDetail"
									:fields="'year'"
									v-model="maritalStatus.indiv_sps_job_dt"
								></mc-picker-select>
							</view>
							<view class="uni-form-item uni-column onerow lastRow">
								<view class="title requireIcon">配偶月债务支出(元)</view>
								<input
									v-model="maritalStatus.indiv_sps_out"
									:disabled="isQueryDetail"
									type="number"
									class="uni-input"
									value=""
									placeholder="请输入配偶月债务支出(元)"
								/>
							</view>
						</block>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'maritalStatus')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="联系信息" nid="lxxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('lxxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">是否与现住地址相同</view>
							<mc-radio-group v-model="relationInfo.same_curadd_flg" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">通讯地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="relationInfo.post_addr"
								:disabled="isQueryDetail || relationInfo.same_curadd_flg == 1"
								maxlength="80"
								placeholder="请输入通讯地址"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">邮政编码</view>
							<input v-model="relationInfo.post_code" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入邮政编码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">居住状况</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="relationInfo.indiv_rsd_st" :data="selectdata.indiv_rsd_st"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column nopb onerow bottomGap">
							<view class="title requireIcon">是否异地</view>
							<mc-radio-group v-model="relationInfo.indiv_lcl_flg" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域名称</view>
							<mc-picker-select
								mode="area"
								:disabled="isQueryDetail"
								v-model="relationInfo.area_code"
								@getName="relationInfo.area_name = $event"
								class="uni-input"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">区域编号</view>
							<input disabled v-model="relationInfo.area_code" type="text" class="uni-input" value="" placeholder="请输入区域编号" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">住宅电话</view>
							<input v-model="relationInfo.fphone" :disabled="isQueryDetail" type="tel" class="uni-input" value="" placeholder="请输入住宅电话" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">手机号码</view>
							<input v-model="relationInfo.mobile" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入手机号码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">手机号码2</view>
							<input v-model="relationInfo.mobile2" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入手机号码2" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">短信通知号</view>
							<input v-model="relationInfo.phone" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入短信通知号" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">传真</view>
							<input v-model="relationInfo.fax_code" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入传真" />
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">Email地址</view>
							<input v-model="relationInfo.email" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入Email地址" />
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'relationInfo')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="单位信息" nid="dwxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('dwxx') != -1">
					<view class="mianRadius mcform">
						<view class="infoTipTitle">单位信息</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">职业</view>
							<mc-pop-select class="uni-input" :disabled="isQueryDetail" v-model="companyInfo.indiv_occ" :data="selectdata.indiv_occ"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column  nopb bottomGap">
							<!-- onerow -->
							<view class="title requireIcon">工作单位</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="companyInfo.indiv_com_name"
								:disabled="isQueryDetail"
								maxlength="60"
								placeholder="请输入工作单位"
							/>
							<!-- <input v-model="companyInfo.indiv_com_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入工作单位" /> -->
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">单位性质</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								class="uni-input"
								mode="selector"
								v-model="companyInfo.indiv_com_typ"
								range-key="label"
								:range="selectdata.indiv_com_typ"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
							<view class="title requireIcon">单位所属行业名称</view>
							<mc-picker-select
								:disabled="isQueryDetail"
								mode="industry"
								class="uni-input"
								v-model="companyInfo.indiv_com_fld"
								@getName="companyInfo.indiv_com_fld_name = $event"
							></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">单位所属行业</view>
							<input v-model="companyInfo.indiv_com_fld" :disabled="true" type="text" class="uni-input" value="" placeholder="请输入单位所属行业" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title requireIcon">单位地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="companyInfo.indiv_com_addr"
								:disabled="isQueryDetail"
								maxlength="60"
								placeholder="请输入单位地址"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">单位邮编</view>
							<input v-model="companyInfo.indiv_com_zip_code" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入单位邮编" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">单位电话</view>
							<input v-model="companyInfo.indiv_com_phn" :disabled="isQueryDetail" type="tel" class="uni-input" value="" placeholder="请输入单位电话" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">单位传真</view>
							<input v-model="companyInfo.indiv_com_fax" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入单位传真" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">单位联系人</view>
							<input v-model="companyInfo.indiv_com_cnt_name" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入单位联系人" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon ">参加工作年月</view>
							<mc-picker-select class="uni-input" :disabled="isQueryDetail" :fields="'month'" mode="date" v-model="companyInfo.indiv_work_job_y"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">职务</view>
							<mc-pop-select class="uni-input" v-model="companyInfo.indiv_com_job_ttl" :disabled="isQueryDetail" :data="selectdata.indiv_com_job_ttl"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">职称</view>
							<mc-pop-select class="uni-input" v-model="companyInfo.indiv_crtfctn" :disabled="isQueryDetail" :data="selectdata.indiv_crtfctn"></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">个人简历</view>
							<textarea v-model="companyInfo.work_resume" maxlength="500" :disabled="isQueryDetail" placeholder="请输入个人简历(500字以内)" />
						</view>
						<view class="infoTipTitle">经营实体信息</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">企业职工人数</view>
							<input v-model="companyInfo.employeenumber" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入企业职工人数" />
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<!-- onerow -->
							<view class="title">企业办公地址</view>
							<textarea
								class="autoHeightArea"
								auto-height
								v-model="companyInfo.officeadd"
								:disabled="isQueryDetail"
								maxlength="80"
								placeholder="请输入企业办公地址"
							/>
							<!-- <input v-model="companyInfo.officeadd" type="text" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入企业办公地址" /> -->
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">企业邮政编码</view>
							<input v-model="companyInfo.officezip" type="number" :disabled="isQueryDetail" class="uni-input" value="" placeholder="请输入企业邮政编码" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">企业有无进出口经营权</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								v-model="companyInfo.hasieright"
								:disabled="isQueryDetail"
								:data="selectdata.hasieright"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">企业经营场地所有权</view>
							<mc-pop-select
								class="uni-input"
								:clearable="true"
								v-model="companyInfo.workfieldfee"
								:disabled="isQueryDetail"
								:data="selectdata.workfieldfee"
							></mc-pop-select>
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title">企业是否环境达标</view>
							<mc-pop-select
								class="uni-input"
								v-model="companyInfo.enviromenteriendlyflag"
								:disabled="isQueryDetail"
								:data="selectdata.enviromenteriendlyflag"
							></mc-pop-select>
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'companyInfo')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="财务信息" nid="cwxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('cwxx') != -1">
					<view class="mianRadius mcform">
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">个人月收入(元)</view>
							<input
								v-model="financialAssets.indiv_ann_mouth"
								:disabled="isQueryDetail"
								type="number"
								class="uni-input"
								value=""
								placeholder="请输入个人月收入(元)"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">月债务支出(元)</view>
							<input
								v-model="financialAssets.on_debt_payments"
								:disabled="isQueryDetail"
								type="number"
								class="uni-input"
								value=""
								placeholder="请输入月债务支出(元)"
							/>
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">其他流动资产(元)</view>
							<input v-model="financialAssets.liquidity" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入其他流动资产(元)" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">负债总额(元)</view>
							<input v-model="financialAssets.debt_amt" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入负债总额(元)" />
						</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title">固定资产(元)</view>
							<input v-model="financialAssets.fixed" :disabled="isQueryDetail" type="number" class="uni-input" value="" placeholder="请输入固定资产(元)" />
						</view>
						<view class="uni-form-item uni-column lastRow">
							<view class="title">固定资产说明</view>
							<textarea
								v-model="financialAssets.fixed_desc"
								:disabled="isQueryDetail"
								class="textLeft"
								maxlength="500"
								placeholder="请输入房产、汽车、有价证劵等信息请输入个人简历(500字以内)"
							/>
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'financialAssets')">保存</button>
				</view>
			</swiper-item>
			<swiper-item label="家庭资产" nid="jtzc" v-if="custType == 2">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('jtzc') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="btnwrap">
							<button class="mc-min-btn-primary" :disabled="isQueryDetail" @click="toLink('/pages/customerMg/familyAssets?isAdd=true')">新增</button>
							<button type="" @click="queryAssList()" class="mc-min-btn-primary haveBg">查询</button>
						</view>
						<view v-if="!ass_list.length" class="emptyData">暂无数据</view>
						<view v-if="ass_list.length" class="listbox wrapScroll">
							<view class="listWrap bottomGap" v-for="(item, index) in ass_list" :key="index" v-if="item.indiv_ass_flag != 2">
								<view class="mcitems familyList">
									<view class="mcitem mcrowOne">
										<span class="mclabel">资产类别</span>
										<span class="mccontent">{{ item.indiv_ass_type !== '' ? getindiv_ass_type(item.indiv_ass_type) : '-' }}</span>
									</view>
									<view class="mcitem mcrowOne">
										<span class="mclabel">资产名称</span>
										<span class="mccontent">{{ item.indiv_ass_name ? item.indiv_ass_name : '-' }}</span>
									</view>
									<view class="mcitem mcrowOne mcrowItemcanwrap">
										<view class="">
											<span class="mclabel">资产单位</span>
											<span class="mccontent">{{ item.indiv_ass_plr ? item.indiv_ass_plr : '-' }}</span>
										</view>
										<view class="">
											<span class="mclabel">资产数量</span>
											<span class="mccontent">{{ item.indiv_ass_num ? item.indiv_ass_num : '-' }}</span>
										</view>
									</view>
									<view class="mcitem mcrowOne">
										<span class="mclabel">资产估价</span>
										<span class="mccontent">{{ item.indiv_ass ? item.indiv_ass : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button class="mc-min-btn-waring" :disabled="isQueryDetail" @click="delAssList(index)">删除</button>
									<button type="" class="mc-min-btn-primary" @click="toLink('/pages/customerMg/familyAssets?isDetail=true&index=' + index)">详情</button>
									<button
										type=""
										class="mc-min-btn-primary"
										:disabled="isQueryDetail"
										@click="toLink('/pages/customerMg/familyAssets?isChange=true&index=' + index)"
									>
										修改
									</button>
								</view>
							</view>
						</view>
					</view>
					<!-- <button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'ass_list')">保存</button> -->
				</view>
			</swiper-item>
			<swiper-item label="其他信息" nid="qtxx" v-if="custType != 1">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('qtxx') != -1">
					<view class="mianRadius mcform">
						<view class="infoTipTitle">中征码信息</view>
						<view class="uni-form-item uni-column nopb" :class="{ lastRow: !loancardideffflg, bottomGap: loancardideffflg }">
							<view class="title requireIcon">有无中征码(原贷款卡)</view>
							<mc-radio-group v-model="otherInfo.loan_card_flg" :left="true" :disabled="isQueryDetail">
								<mc-radio value="1" label="是"></mc-radio>
								<mc-radio value="2" label="否"></mc-radio>
							</mc-radio-group>
						</view>
						<block v-if="loancardideffflg">
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title requireIcon">中征码</view>
								<input v-model="otherInfo.loan_card_id" :disabled="isQueryDetail" type="text" class="uni-input" value="" placeholder="请输入中征码" />
							</view>
							<view class="uni-form-item uni-column onerow lastRow">
								<view class="title requireIcon">中征码状态</view>
								<mc-pop-select
									class="uni-input"
									:disabled="isQueryDetail"
									v-model="otherInfo.loan_card_eff_flg"
									:data="selectdata.loan_card_eff_flg"
								></mc-pop-select>
							</view>
						</block>

						<view class="infoTipTitle">与我行合作关系</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">建立信贷关系时间</view>
							<mc-picker-select class="uni-input" :disabled="isQueryDetail" mode="date" v-model="otherInfo.com_init_loan_date"></mc-picker-select>
						</view>
						<view class="uni-form-item uni-column nopb bottomGap">
							<view class="title">在我行开立账户情况</view>
							<mc-checkbox-group v-model="otherInfo.indiv_hld_acnt" :disabled="isQueryDetail" :data="selectdata.indiv_hld_acnt" class="mcradio"></mc-checkbox-group>
						</view>
						<view class="uni-form-item uni-column lastRow">
							<view class="title">持卡情况</view>
							<mc-checkbox-group
								v-model="otherInfo.hold_card"
								:notValue="'1'"
								:disabled="isQueryDetail"
								:data="selectdata.hold_card"
								class="mcradio"
							></mc-checkbox-group>
						</view>
						<view class="infoTipTitle">管户人</view>
						<view class="uni-form-item uni-column onerow nopb bottomGap">
							<view class="title requireIcon">营销人</view>
							<view class="uni-input" :class="{disabledtext:isQueryDetail}" @click="isQueryDetail ? '' : setmanagerSelect()">
								<span v-if="!otherInfo.market_id" class="placeholderss">请选择</span>
								<span v-else>{{ otherInfo.market_id }}</span>
								<span class="iconfont icons">&#xe502;</span>
							</view>
						</view>
						<view class="uni-form-item uni-column onerow lastRow">
							<view class="title requireIcon">营销机构</view>
							<input :disabled="isQueryDetail" v-model="otherInfo.market_br_id" type="text" class="uni-input" value="" placeholder="请输入营销机构" />
						</view>
					</view>
					<button type="" class="mc-btn-primary" :disabled="isQueryDetail" @click="infoSubmit(true, 'otherInfo')">保存</button>
				</view>
			</swiper-item>
		</tabbars>
	</view>
</template>
<!-- &#xe622; -->
<script>
import { Camera, getDiscernCert } from '@/common/Mobile/MobileUtils.js';
import { citydatas } from '@/common/cityDatas.js';
import { selectdata } from './select.js';
import { requestParams } from './requestParams.js';
var cityFormat = [];
var onlyNum = 0;
export default {
	data() {
		return {
			selectdata: selectdata,
			ass_list: requestParams.paramsAllAssList, //家庭资产列表
			originparamsAll: {}, //修改时的原数据
			paramsAll: JSON.parse(JSON.stringify(requestParams.paramsAll)),
			paramsAllRequired: JSON.parse(JSON.stringify(requestParams.paramsAllRequired)),
			accountInfo: {},
			setRequrieAssListData: JSON.parse(JSON.stringify(requestParams.setRequrieAssListData)), //由于ass_list必传所以存下来
			temporary: JSON.parse(JSON.stringify(requestParams.temporary)), //临时客户参数
			temporaryRequired: JSON.parse(JSON.stringify(requestParams.temporaryRequired)), //临时客户必填项
			ourBankBaseInfo: JSON.parse(JSON.stringify(requestParams.ourBankBaseInfo)), // 我行基本信息
			ourBankBaseInfoRequired: JSON.parse(JSON.stringify(requestParams.ourBankBaseInfoRequired)), // 我行基本信息必填项
			businessInfo: JSON.parse(JSON.stringify(requestParams.businessInfo)), //经营情况
			businessInfoRequired: JSON.parse(JSON.stringify(requestParams.businessInfoRequired)), //经营情况必填项
			indivInfo: JSON.parse(JSON.stringify(requestParams.indivInfo)), //个人基本信息
			indivInfoRequired: JSON.parse(JSON.stringify(requestParams.indivInfoRequired)), //个人基本信息必填项
			maritalStatus: JSON.parse(JSON.stringify(requestParams.maritalStatus)), //婚姻状况
			maritalStatusRequired: JSON.parse(JSON.stringify(requestParams.maritalStatusRequired)), //婚姻状况必填项
			relationInfo: JSON.parse(JSON.stringify(requestParams.relationInfo)), //联系信息
			relationInfoRequired: JSON.parse(JSON.stringify(requestParams.relationInfoRequired)), //联系信息必填项
			companyInfo: JSON.parse(JSON.stringify(requestParams.companyInfo)), //单位信息必填项
			companyInfoRequired: JSON.parse(JSON.stringify(requestParams.companyInfoRequired)), //单位信息必填项
			financialAssets: JSON.parse(JSON.stringify(requestParams.financialAssets)), //财务资产必填项
			financialAssetsRequired: JSON.parse(JSON.stringify(requestParams.financialAssetsRequired)), //财务资产必填项
			otherInfo: JSON.parse(JSON.stringify(requestParams.otherInfo)), //其他信息必填项
			otherInfoRequired: JSON.parse(JSON.stringify(requestParams.otherInfoRequired)), //其他信息必填项
			farmingfarmcoop: false, //是否农户的必输
			comholdstkamt: false, //我行股份必输
			regcodeRequire: false, //是否有营业执照必输项的显隐
			individexpdtreq: false, //证件到期日的必填项
			flagdatename: false, //组织机构代码 组织机构有效期是否必输
			isbusinessowner: false, //企业主的必输项
			msindivmars: false, //婚姻状况的必输项
			loancardideffflg: false, //中征码和状态必填
			currentTabIndexMain: 0, // tab的index
			currentTabIndexMainShow: [], // tab的显隐情况
			currentcustno: '', //当前客户号
			transCUSTNO: '', // 修改时得到核心客户号
			isChange: '', //是否是修改
			custStatus: '', //修改时的客户状态
			custType: '', // 客户类型的区分
			saved: false, // 第一次新增后的标志
			isChangeFrom: false, //是否从列表的修改按钮过来
			queryListFrom: false, //从查询列表过来
			isQueryDetail: false, //从查询列表的查看过来
			isVaildOldCust: false, //新增校验是否是老客户
			isDateDiscernCert: false, //是否是识别到期日
			onBeforeSwitch: true, // 是否可以切换的标志
			getIsorigin: false //是否是不允许切换返回的标志
		};
	},
	onShow() {
		// 选择的客户经理信息存在并且 当前页面不是临时客户
		if (this.$store.state.managerSelect.market_id && this.custType != 1) {
			this.otherInfo.market_id = this.$store.state.managerSelect.market_id;
			this.otherInfo.market_br_id = this.$store.state.managerSelect.market_br_id;
		}
		if (this.$store.state.assListInfo.add == true) {
			this.queryAssList();
			this.$store.commit('delassListInfo');
		}
		if (this.$store.state.assListInfo.change == true) {
			this.ass_list = requestParams.paramsAllAssList;
			this.$store.commit('delassListInfo');
		}
		this.$forceUpdate();
	},
	onLoad: function(option) {
		// custType 1临时  2 正式  3 担保
		// var option = JSON.parse(option);
		this.custType = option.custType;
		this.isChange = option.isChange ? JSON.parse(option.isChange) : false;
		this.queryListFrom = option.isquery ? JSON.parse(option.isquery) : false;
		this.isQueryDetail = option.isQueryDetail ? JSON.parse(option.isQueryDetail) : false;
		this.custStatus = option.custStatus;
		if (this.custStatus == '20' || this.custStatus == '00') {
			this.custType = 2;
		} else if (this.custStatus == '01') {
			this.custType = 1;
		} else if (this.custStatus == '02' || this.custStatus == '05') {
			this.custType = 3;
		}
		if (this.custType == 1) {
			this.currentTabIndexMainShow = ['lskhxx'];
		} else {
			this.currentTabIndexMainShow = ['whjbxx'];
		}
		this.currentcustno = option.cusId; // 客户编号
		if (this.currentcustno && this.isChange) {
			// 从新增列表的修改按钮过来
			this.isChangeFrom = true;
		}
		if (this.currentcustno && this.isChange) {
			uni.setNavigationBarTitle({
				title: '修改客户'
			});
		} else if (this.isQueryDetail) {
			uni.setNavigationBarTitle({
				title: '客户详情'
			});
		}
		this.$forceUpdate();
	},
	onBackPress() {
		this.$store.commit('delmanagerSelect');
	},
	computed: {
		tempEdtRequire() {
			var item = {
				name: 'edt_remark',
				checkType: 'string',
				checkRule: '1,200',
				errorMsg: '请输入学位说明',
				error: '学位说明最多为200个字符'
			};
			var index = this.arrHasObj(this.temporaryRequired, item);
			// 10 硕士研究生                  0 其他  4 学士  9 未知      20 "大学本科
			// 最高学历为硕士研究生、最高学位为其他、学士、未知时必输  最高学历为大学本科、最高学位不为学士时必输
			if (this.temporary.indiv_edt == '10' && (this.temporary.indiv_dgr == '0' || this.temporary.indiv_dgr == '4' || this.temporary.indiv_dgr == '9')) {
				this.temporaryRequired[index].valid = true;
				return true;
			}
			if (this.temporary.indiv_edt == '20' && this.temporary.indiv_dgr != '4') {
				this.temporaryRequired[index].valid = true;
				return true;
			}
			this.temporaryRequired[index].valid = false;
			return false;
		},
		// 学位说明的必输控制
		indivInfotempEdtRequire() {
			var item = {
				name: 'edt_remark',
				checkType: 'string',
				checkRule: '1,200',
				errorMsg: '请输入学位说明',
				error: '学位说明最多为200个字符'
			};
			var index = this.arrHasObj(this.indivInfoRequired, item);
			if (this.indivInfo.indiv_edt == '10' && (this.indivInfo.indiv_dgr == '0' || this.indivInfo.indiv_dgr == '4' || this.indivInfo.indiv_dgr == '9')) {
				this.indivInfoRequired[index].valid = true;
				return true;
			}
			if (this.indivInfo.indiv_edt == '20' && this.indivInfo.indiv_dgr != '4') {
				this.indivInfoRequired[index].valid = true;
				return true;
			}
			this.indivInfoRequired[index].valid = false;
			return false;
		}
	},
	onNavigationBarButtonTap(e) {
		console.log('点击提交');
		this.infoSubmit(false, '');
	},
	mounted() {
		if (this.isQueryDetail == true) {
			// 隐藏提交按钮
			var rightbtn = document.querySelector('body.pages-customerMg-customerAdd uni-page-head .uni-page-head-ft');
			rightbtn.style.display = 'none';
		}
		requestParams.paramsAllAssList = [];
		requestParams.paramsAllSave = {};
		this.ass_list = [];
		this.accountInfo = this.$store.state.accountInfos;
		// 不是修改的时候赋值
		if (!this.isChange) {
			this.paramsAll.cust_mgr = this.accountInfo.actorno;
			this.paramsAll.main_br_id = this.accountInfo.orgid;
		}
		if (this.custType == 1 && !this.isChange && !this.isQueryDetail) {
			//新增赋值
			this.temporary.last_upd_date = new Date().Format('yyyy-MM-dd');
			this.temporary.input_date = new Date().Format('yyyy-MM-dd');
			this.temporary.last_upd_id = this.accountInfo.actorno;
		}
		if (this.isChange || this.isQueryDetail) {
			this.queryData();
		}
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		onBeforeSwitch1() {
			return new Promise((resolve, reject) => {
				var _this = this;
				setTimeout(function() {
					resolve(_this.onBeforeSwitch);
				});
			});
		},
		async infoSubmit(save, tab, isTabS = false) {
			if (this.isQueryDetail) {
				return;
			}
			this.onBeforeSwitch = true;
			if (this.isChange && save) {
				var flag = false;
				if (tab !== 'ass_list') {
					for (var ckey in this[tab]) {
						if (this.originparamsAll.hasOwnProperty(ckey)) {
							if (this.originparamsAll[ckey] != this[tab][ckey]) {
								flag = true;
								break;
							}
						}
					}
				} else {
					if (this.originparamsAll.ass_list.length != this.ass_list.length) {
						flag = true;
					} else if (this.originparamsAll.ass_list.length == this.ass_list.length) {
						// 长度相等-对应的数组项值不相等
						for (var j = 0; j < this.originparamsAll.ass_list.length; j++) {
							for (var okey in this.originparamsAll.ass_list[j]) {
								if (this.originparamsAll.ass_list[j][okey] != this.ass_list[j][okey]) {
									flag = true;
									break;
								}
							}
						}
					}
				}
				if (!flag) {
					if (isTabS == false) {
						uni.showToast({
							title: '未进行任何修改',
							icon: 'none',
							duration: 1500
						});
					}
					return;
				}
			}
			if (this.isVaildOldCust) {
				uni.showToast({
					title: '该证件号码已存在',
					icon: 'none',
					duration: 1500
				});
				this.onBeforeSwitch = false;
				return;
			}
			// 保存页面的提交按照 草稿存储，提交页面按照正常
			var Statussave = true;
			if(this.isChange || this.isQueryDetail){
				Statussave = false;
			}
			this.paramsAll.cus_status = this.getCustStatus(Statussave);
			if (this.isChange || this.saved) this.paramsAll.AppFlag = '1';
			if (this.isChange && this.custStatus) {
				this.paramsAll.cus_status = this.custStatus;
				this.paramsAll.cus_id = this.currentcustno;
			} else {
				if (this.isChange || this.saved) {
				} else {
					this.paramsAll.cus_id = '';
				}
			}
			this.paramsAll.SaveFlag = '1';
			if (save) {
				this.paramsAll.SaveFlag = '0';
				var rule = [];
				var formData = {};
				//保存必填项---四项
				if (this.custType == 1) {
					formData = this.temporary;
					for (var i = 0; i < this.temporaryRequired.length; i++) {
						if (this.temporaryRequired[i].save) {
							rule.push(this.temporaryRequired[i]);
						}
					}
					var checkRes = this.$graceChecker.check(formData, rule);
					if (!checkRes) {
						uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
						return;
					}
					// 保存时不必填但是填上时有校验
					var saveCheck = [];
					for (var i = 0; i < this.temporaryRequired.length; i++) {
						var item = JSON.parse(JSON.stringify(this.temporaryRequired[i]));
						if (item.valid !== false) {
							item.notrequire = true;
							saveCheck.push(item);
						}
					}
					if (!this.$graceChecker.check(formData, saveCheck)) {
						uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
						return;
					}
					Object.assign(this.paramsAll, this.temporary);
				} else {
					formData = this.ourBankBaseInfo;
					// formData1 = this.ourBankBaseInfo;
					for (var i = 0; i < this.ourBankBaseInfoRequired.length; i++) {
						if (this.ourBankBaseInfoRequired[i].save) {
							rule.push(this.ourBankBaseInfoRequired[i]);
						}
					}
					var checkRes = this.$graceChecker.check(formData, rule);
					if (!checkRes) {
						uni.showToast({ title: '我行基本信息：' + this.$graceChecker.error, icon: 'none' });
						this.onBeforeSwitch = false;
						return;
					}
					if (tab != 'ass_list') {
						// 保存时不必填但是填上时有校验
						var saveCheck = [];
						for (var i = 0; i < this[tab + 'Required'].length; i++) {
							var item = JSON.parse(JSON.stringify(this[tab + 'Required'][i]));
							if (item.valid !== false) {
								item.notrequire = true;
								saveCheck.push(item);
							}
						}
						if (!this.$graceChecker.check(this[tab], saveCheck)) {
							uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
							return;
						}
						Object.assign(this.paramsAll, this[tab]);
					} else {
						Object.assign(this.paramsAll.ass_list, this[tab]);
					}
					Object.assign(this.paramsAll, this.ourBankBaseInfo);
				}
				// 填充上数据
				if (this.paramsAll.ass_list.length == 0) {
					Object.assign(this.paramsAll.ass_list, this.setRequrieAssListData);
				}
			} else {
				var rule = [];
				var formData = {};
				if (this.custType == 1) {
					Object.assign(this.paramsAll, this.temporary);
					formData = this.temporary;
					rule = this.getRule(this.temporaryRequired);
					var checkRes = this.$graceChecker.check(formData, rule);
					if (!checkRes) {
						uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
						return;
					}
				} else {
					Object.assign(this.paramsAll, this.ourBankBaseInfo);
					Object.assign(this.paramsAll, this.indivInfo);
					Object.assign(this.paramsAll, this.maritalStatus);
					Object.assign(this.paramsAll, this.relationInfo);
					Object.assign(this.paramsAll, this.companyInfo);
					Object.assign(this.paramsAll, this.financialAssets);
					Object.assign(this.paramsAll, this.otherInfo);
					Object.assign(this.paramsAll.ass_list, this.ass_list);
					if (this.ourBankBaseInfo.cus_type != '110') {
						Object.assign(this.paramsAll, this.businessInfo);
					} else {
						var businessInfo = {};
						for (var keys in this.businessInfo) {
							if (this.businessInfo.hasOwnProperty(keys)) {
								businessInfo[keys] = '';
							}
						}
						Object.assign(this.paramsAll, businessInfo);
					}
					formData = this.paramsAll;
					rule = this.getRule(this.paramsAllRequired);
					var listss = [
						{ value: 'ourBankBaseInfoRequired', label: '我行基本信息' },
						{ value: 'indivInfoRequired', label: '个人基本信息' },
						{ value: 'maritalStatusRequired', label: '婚姻状况' },
						{ value: 'relationInfoRequired', label: '联系信息' },
						{ value: 'companyInfoRequired', label: '单位信息' },
						{ value: 'financialAssetsRequired', label: '财务信息' },
						{ value: 'otherInfoRequired', label: '其他信息' }
					];
					if (this.ourBankBaseInfo.cus_type != '110') {
						listss = [
							{ value: 'ourBankBaseInfoRequired', label: '我行基本信息' },
							{ value: 'businessInfoRequired', label: '经营情况' },
							{ value: 'indivInfoRequired', label: '个人基本信息' },
							{ value: 'maritalStatusRequired', label: '婚姻状况' },
							{ value: 'relationInfoRequired', label: '联系信息' },
							{ value: 'companyInfoRequired', label: '单位信息' },
							{ value: 'financialAssetsRequired', label: '财务信息' },
							{ value: 'otherInfoRequired', label: '其他信息' }
						];
					}
					for (var i = 0; i < listss.length; i++) {
						rule = this.getRule(this[listss[i].value]);
						var checkRes = this.$graceChecker.check(formData, rule);
						if (!checkRes) {
							uni.showModal({
								content: listss[i].label + ': ' + this.$graceChecker.error,
								showCancel: false,
								success: e => {
									if (e.confirm) {
									}
								}
							});
							return;
						}
					}
					if (this.custType == 2 && this.ass_list.length == 0) {
						uni.showModal({
							content: '家庭资产不能为空',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
						return;
					}
				}
				// 填充上数据
				if (this.paramsAll.ass_list.length == 0) {
					Object.assign(this.paramsAll.ass_list, this.setRequrieAssListData);
				}
			}

			if (!this.isChange) {
				// 新增赋值
				this.paramsAll.last_upd_date = new Date().Format('yyyy-MM-dd');
				this.paramsAll.input_date = this.paramsAll.input_date ? this.paramsAll.input_date : new Date().Format('yyyy-MM-dd');
				this.paramsAll.last_upd_id = this.accountInfo.actorno;
			} else if (this.isChange) {
				this.paramsAll.last_upd_date = new Date().Format('yyyy-MM-dd');
			}
			if (this.custType != 1) {
				this.paramsAll.com_hold_stk_amt = this.paramsAll.com_hold_stk_amt !== '' ? (this.paramsAll.com_hold_stk_amt * 1).toFixed(2).toString() : '';
				this.paramsAll.debt_amt = this.paramsAll.debt_amt !== '' ? (this.paramsAll.debt_amt * 1).toFixed(2).toString() : '';
				this.paramsAll.familymonthincome = this.paramsAll.familymonthincome !== '' ? (this.paramsAll.familymonthincome * 1).toFixed(6).toString() : '';
				this.paramsAll.fixed = this.paramsAll.fixed !== '' ? (this.paramsAll.fixed * 1).toFixed(2).toString() : '';
				this.paramsAll.indiv_ann_mouth = this.paramsAll.indiv_ann_mouth !== '' ? (this.paramsAll.indiv_ann_mouth * 1).toFixed(2).toString() : '';
				this.paramsAll.indiv_dept_rate = this.paramsAll.indiv_dept_rate !== '' ? (this.paramsAll.indiv_dept_rate * 1).toFixed(2).toString() : '';
				this.paramsAll.indiv_sps_out = this.paramsAll.indiv_sps_out !== '' ? (this.paramsAll.indiv_sps_out * 1).toFixed(2).toString() : '';
				this.paramsAll.liquidity = this.paramsAll.liquidity !== '' ? (this.paramsAll.liquidity * 1).toFixed(2).toString() : '';
				this.paramsAll.on_debt_payments = this.paramsAll.on_debt_payments !== '' ? (this.paramsAll.on_debt_payments * 1).toFixed(2).toString() : '';
				this.paramsAll.yearlamt = this.paramsAll.yearlamt !== '' ? (this.paramsAll.yearlamt * 1).toFixed(2).toString() : '';
			}

			//提交修改时时，担保、正式客户、临时客户 客户号必输
			if (this.paramsAll.AppFlag == 1 && this.custStatus && (this.custStatus == '20' || this.custStatus == '05' || this.custStatus == '01')) {
				if (this.paramsAll.cus_id == '') {
					var a = await this.getGamateCusId(this.paramsAll.cert_type, this.paramsAll.cert_code);
				}
			}

			// 正式客户新增时 ，正式客户保存时和正式客户修改时核心客户号必传
			if (this.custType == 2 || ((this.isChange == true || this.saved == true) && this.custStatus && this.custStatus == '20')) {
				//如果客户号已经查回来了就不再查
				if (this.transCUSTNO) {
					this.paramsAll.trans_cus_id = this.transCUSTNO;
				} else {
					this.onBeforeSwitch = false;
					var s = await this.getId();
					if (s === '') {
						this.onBeforeSwitch = false;
					} else {
						this.onBeforeSwitch = true;
						this.transCUSTNO = s;
						this.paramsAll.trans_cus_id = s;
					}
				}
			}
			if (save) {
				this.submitRequest(this.paramsAll, save, isTabS);
			} else {
				uni.showModal({
					content: '是否确认提交？',
					success: e => {
						if (e.confirm) {
							this.submitRequest(this.paramsAll, save, isTabS);
						}
					},
					fail: () => {}
				});
			}
		},
		submitRequest(data, save, isTabS) {
			this.$request
				.post({
					url: 'es/json/EsCustAddOrModify',
					data: data
				})
				.then(res => {
					console.log('提交结果', res);
					if (res.response.header.returnCode == '00000000') {
						this.currentcustno = res.response.content.cus_id;
						requestParams.paramsAllSave = JSON.parse(JSON.stringify(this.paramsAll));
						requestParams.paramsAllSave.AppFlag = '1';
						requestParams.paramsAllSave.cus_id = res.response.content.cus_id;
						// 修改时cus_id必传
						if (save) {
							this.paramsAll.cus_id = res.response.content.cus_id;
							this.saved = true;
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 1500
							});
							return;
						}
						uni.redirectTo({
							url: '/pages/result/result?isSuccess=true&custOper=' + (this.isChange ? 2 : 1) + '&check=true'
						});
					} else {
						if (save) {
							uni.showToast({
								title: res.response.header.returnMsg,
								icon: 'none',
								duration: 1500
							});
							return;
						}
						this.$store.commit('delmanagerSelect');
						uni.showModal({
							content: res.response.header.returnMsg,
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
					}
				})
				.catch(err => {});
		},
		queryData() {
			// 客户查询 -- 传列表中返回的客户号即可
			this.$request
				.post({
					url: 'es/json/EsQueryCustInfomation',
					data: {
						cus_id: this.currentcustno ? this.currentcustno : '', //	客户号
						cert_type: '', //	证件类型
						cert_code: '' //	证件号码
					}
				})
				.then(res => {
					console.log('客户信息详情', res);
					if (res.response.header.returnCode == '00000000') {
						// Object.assign(res.response.content);
						var content = res.response.content;
						this.transCUSTNO = content.trans_cus_id;
						if (this.custType == 1) {
							var lists = ['paramsAll', 'temporary'];
							for (var i = 0; i < lists.length; i++) {
								for (let key in this[lists[i]]) {
									if (content.hasOwnProperty(key)) {
										this[lists[i]][key] = content[key];
									}
								}
							}
							this.originparamsAll = JSON.parse(JSON.stringify(this.paramsAll));
						} else {
							var lists = [
								'paramsAll',
								'ourBankBaseInfo',
								'businessInfo',
								'indivInfo',
								'maritalStatus',
								'relationInfo',
								'companyInfo',
								'financialAssets',
								'otherInfo'
							];
							if (this.custType == 2) {
								lists.push('ass_list');
							}
							for (var i = 0; i < lists.length; i++) {
								if (lists[i] == 'ass_list') {
									if (content.List.length >= 0) {
										this[lists[i]] = content.List;
									} else {
										this[lists[i]] = [content.List];
									}
									this.originparamsAll.ass_list = JSON.parse(JSON.stringify(this[lists[i]]));
									requestParams.paramsAllAssList = JSON.parse(JSON.stringify(this[lists[i]]));
								} else {
									for (let key1 in this[lists[i]]) {
										if (content.hasOwnProperty(key1)) {
											if (key1 == 'List') {
											} else {
												try {
													this[lists[i]][key1] = content[key1];
												} catch (e) {
													//TODO handle the exception
												}
											}
										}
									}
									if (lists[i] == 'paramsAll') {
										var aa = JSON.parse(JSON.stringify(this[lists[i]]));
										Object.assign(aa, { AppFlag: '1', SaveFlag: '0' });
										this.originparamsAll = JSON.parse(JSON.stringify(this[lists[i]]));
										requestParams.paramsAllSave = aa;
									}
								}
							}
						}
						this.$forceUpdate();
					}
				})
				.catch(err => {});
		},
		setmanagerSelect() {
			this.toLink('/pages/customerMg/queryManager');
		},
		getGamateCusId(typ, code, filedName, fname) {
			if (typ == '10') {
				var checkRes = this.$graceChecker.iscertcode(code);
				if (!checkRes) {
					uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
					this.isVaildOldCust = false;
					return;
				}
			}
			if (filedName == 'jiaoyan') {
				this.isVaildOldCust = false;
				if (typ !== '' && code !== '') {
					//typ和code都不为空继续发送请求
				} else {
					return;
				}
			}
			// 客户查询 -- 传列表中返回的客户号即可
			this.$request
				.post({
					url: 'es/json/EsQueryCustInfomation',
					data: {
						cert_type: typ, //	证件类型
						cert_code: code //	证件号码
					}
				})
				.then(res => {
					console.log('客户存在查询结果', res);
					if (res.response.header.returnCode == '00000000') {
						if (filedName == 'marital') {
							this.maritalStatus.indiv_sps_name = res.response.content.cus_name;
							this.maritalStatus.cus_id_rel = res.response.content.cus_id;
							this.maritalStatus.indiv_sps_occ = res.response.content.indiv_occ;
							this.maritalStatus.indiv_scom_name = res.response.content.indiv_com_name;
							this.maritalStatus.indiv_sps_duty = res.response.content.indiv_com_job_ttl;
							this.maritalStatus.indiv_psp_crtfctn = res.response.content.indiv_crtfctn;
							this.maritalStatus.indiv_sps_mphn = res.response.content.mobile;
							this.maritalStatus.indiv_sps_phn = res.response.content.indiv_com_phn;
							this.maritalStatus.indiv_sps_mincm = res.response.content.indiv_ann_mouth;
							this.maritalStatus.indiv_sps_job_dt = res.response.content.termyear;
							this.maritalStatus.indiv_sps_out = res.response.content.on_debt_payments;
						} else if (filedName == 'jiaoyan') {
							if (res.response.content && res.response.content.cus_id) {
								var data = res.response.content;
								var namedata = data.UserInforlist && data.UserInforlist.length ? data.UserInforlist[0] : { orgid_name: '', actorname: '', orgid: '' };
								uni.showModal({
									content:
										'该客户已在【' +
										(namedata.orgid_name ? namedata.orgid_name : '-') +
										'：' +
										(namedata.orgid ? namedata.orgid : '-') +
										'】机构，【' +
										(namedata.actorname ? namedata.actorname : '-') +
										'：' +
										data.cust_mgr +
										'】经理名下',
									showCancel: false,
									success: e => {
										if (e.confirm) {
										}
									}
								});
								// uni.showToast({
								// 	title: '该证件号码已存在',
								// 	icon: 'none',
								// 	duration: 1500
								// });
								this.isVaildOldCust = true;
							} else {
								if (filedName == 'jiaoyan' && typ == '10') {
									var result = this.transformIdentityCard(code);
									if (result.sex && typ == '10') {
										this[fname].indiv_sex = result.sex.toString();
										this[fname].indiv_dt_of_birth = result.birthday;
									}
								} else if (typ !== '10') {
									this[fname].indiv_sex = '';
								}
							}
						} else {
							this.paramsAll.cus_id = res.response.content.cus_id;
							if (filedName == 'jiaoyan' && typ == '10') {
								var result = this.transformIdentityCard(code);
								if (result.sex && typ == '10') {
									this[fname].indiv_sex = result.sex.toString();
									this[fname].indiv_dt_of_birth = result.birthday;
								}
							} else if (typ !== '10') {
								this[fname].indiv_sex = '';
							}
						}
					} else {
						if (filedName == 'jiaoyan' && typ == '10') {
							var result = this.transformIdentityCard(code);
							if (result.sex && typ == '10') {
								this[fname].indiv_sex = result.sex.toString();
								this[fname].indiv_dt_of_birth = result.birthday;
							}
						} else if (typ !== '10') {
							this[fname].indiv_sex = '';
						}
					}
					this.$forceUpdate();
				})
				.catch(err => {});
		},
		queryAssList() {
			// 客户查询 -- 传列表中返回的客户号即可
			this.$request
				.post({
					url: 'es/json/EsQueryCustInfomation',
					data: {
						cus_id: this.currentcustno ? this.currentcustno : requestParams.paramsAllSave.cus_id, //	客户号
						cert_type: '', //	证件类型
						cert_code: '' //	证件号码
					}
				})
				.then(res => {
					console.log('家庭资产', res);
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List && res.response.content.List.length) {
							this.ass_list = res.response.content.List;
							requestParams.paramsAllAssList = JSON.parse(JSON.stringify(res.response.content.List));
						}
						this.$forceUpdate();
					}
				})
				.catch(err => {});
		},
		delAssList(index) {
			uni.showModal({
				content: '是否删除本条信息?',
				success: e => {
					if (e.confirm) {
						if (index !== '') {
							this.ass_list[index].indiv_ass_flag = '2';
							var data = requestParams.paramsAllSave;
							data.ass_list = this.ass_list;
							this.$request
								.post({
									url: 'es/json/EsCustAddOrModify',
									data: data
								})
								.then(res => {
									console.log('提交结果', res);
									if (res.response.header.returnCode == '00000000') {
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1500
										});
										requestParams.paramsAllSave.ass_list.splice(index, 1);
										this.ass_list.splice(index, 1);
										this.queryAssList();
									} else {
										uni.showToast({
											title: res.response.header.returnMsg,
											icon: 'none'
										});
									}
								})
								.catch(err => {});
						}
					}
				},
				fail: () => {}
			});
		},
		async toDiscernCert(itemtype, font = true) {
			if (itemtype == 'ourBankBaseInfo' && font == false) {
				this.isDateDiscernCert = false;
			}
			var resolve = await getDiscernCert();
			if (itemtype == 'ourBankBaseInfo' && font == false) {
				this.isDateDiscernCert = true;
			}
			console.log('识别返回信息', resolve);
			if (resolve) {
				if (itemtype == 'temporary' && font == true) {
					this.temporary.cert_code = resolve.res.num;
					this.temporary.cus_name = resolve.res.name;
					this.temporary.indiv_sex = this.getSex(resolve.res.sex);
					this.temporary.indiv_dt_of_birth = resolve.res.birthday
						.replace('年', '-')
						.replace('月', '-')
						.replace('日', '');
					this.getGamateCusId(this.temporary.cert_type, this.temporary.cert_code, 'jiaoyan', 'temporary');
				} else if (itemtype == 'ourBankBaseInfo' && font == true) {
					this.ourBankBaseInfo.cert_code = resolve.res.num;
					this.ourBankBaseInfo.indiv_sex = this.getSex(resolve.res.sex);
					this.ourBankBaseInfo.indiv_ntn = this.getNtn(resolve.res.folk);
					this.ourBankBaseInfo.indiv_dt_of_birth = resolve.res.birthday
						.replace('年', '-')
						.replace('月', '-')
						.replace('日', '');
					this.ourBankBaseInfo.cus_name = resolve.res.name;
					this.ourBankBaseInfo.indiv_houh_reg_add = resolve.res.address;
					this.getGamateCusId(this.ourBankBaseInfo.cert_type, this.ourBankBaseInfo.cert_code, 'jiaoyan', 'ourBankBaseInfo');
				} else if (itemtype == 'ourBankBaseInfo' && font == false) {
					if (resolve.res.period.indexOf('长期') != -1) {
						this.ourBankBaseInfo.long_flag = '1';
						this.ourBankBaseInfo.indiv_id_sta_dt = resolve.res.period.substr(0, resolve.res.period.indexOf('-')).replace(/\./g, '-');
						this.ourBankBaseInfo.indiv_id_exp_dt = '';
					} else {
						this.ourBankBaseInfo.long_flag = '2';
						this.ourBankBaseInfo.indiv_id_sta_dt = resolve.res.period.substr(0, resolve.res.period.indexOf('-')).replace(/\./g, '-');
						this.ourBankBaseInfo.indiv_id_exp_dt = resolve.res.period.substr(resolve.res.period.indexOf('-') + 1).replace(/\./g, '-');
						this.$set(this.ourBankBaseInfo, 'indiv_id_exp_dt', resolve.res.period.substr(resolve.res.period.indexOf('-') + 1).replace(/\./g, '-'));
					}
					this.$forceUpdate();
				} else if (itemtype == 'maritalStatus') {
					if (resolve.res.num) {
						this.maritalStatus.indiv_sps_id_code = resolve.res.num;
						this.maritalStatus.indiv_sps_name = resolve.res.name;
						this.getGamateCusId(this.maritalStatus.indiv_sps_id_typ, this.maritalStatus.indiv_sps_id_code, 'marital');
					} else {
						uni.showToast({
							title: '未识别到信息',
							icon: 'none',
							duration: 1500
						});
					}
				}
				this.$forceUpdate();
			}
		},
		marDiscern() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var _this = this;
			Camera({ num: 4 }, function(request, respons) {
				uni.hideLoading();
				console.log('拍照返回', respons);
				_this.$request
					.post({
						url: 'es/json/EsOcrMarriageCard',
						data: {
							imgStr: respons.imgbase64, // 这个是图片base64
							channelCode: 'ocr001_ydyxpt', // 固定值ocr001_ydyxpt
							imgType: '7' //7表示结婚证
						}
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content) {
							if (res.response.content.code === '0' && res.response.content.List.length) {
								_this.maritalStatus.indiv_sps_mar_code = res.response.content.List[0].marriageNo?res.response.content.List[0].marriageNo:'';
								_this.maritalStatus.indiv_sps_name = res.response.content.List[0].name;
								if (!_this.maritalStatus.indiv_sps_id_code) {
									_this.maritalStatus.indiv_sps_id_code = res.response.content.List[0].idCardNo;
								}
							} else {
								uni.showToast({
									title: res.response.content.msg,
									icon: 'none',
									duration: 1500
								});
							}
						} else {
							uni.showToast({
								title: res.response.header.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			});
		},
		getSex(name, value) {
			for (var i = 0; i < this.selectdata.indiv_sex.length; i++) {
				var item = this.selectdata.indiv_sex[i];
				if (item.label.indexOf(name) != -1) {
					return item.value;
				}
			}
		},
		getNtn(name, value) {
			for (var i = 0; i < this.selectdata.indiv_ntn.length; i++) {
				var item = this.selectdata.indiv_ntn[i];
				if (item.label.indexOf(name) != -1) {
					return item.value;
				}
			}
		},
		getindiv_ass_type(value) {
			for (var i = 0; i < this.selectdata.indiv_ass_type.length; i++) {
				var item = this.selectdata.indiv_ass_type[i];
				if (item.value == value) {
					return item.label;
				}
			}
		},
		getcom_ass_status(value) {
			for (var i = 0; i < this.selectdata.com_ass_status.length; i++) {
				var item = this.selectdata.com_ass_status[i];
				if (item.value == value) {
					return item.label;
				}
			}
		},
		changeRequireStatus(arr, paramsName, filedName, eqvalue, falgName, eqFlag) {
			/*
			//以requestParams.js中的为主，在页面中判断该条件是否需要验证，valid：false为不需要，可以条件显示和隐藏。
			arr中的replace表示替换掉js中的项
			notrequire:为true无知的时候不验证，有值的时候验证
			*/
			var itemarr = arr;
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				if (eqFlag == 'indexof') {
				} else {
					if (this.isChange || this.isQueryDetail || (this.isDateDiscernCert && paramsName == 'ourBankBaseInfo')) {
					} else {
						this[paramsName][itemarr[i].name] = '';
					}
				}
				indexArr.push(this.arrHasObj(this[paramsName + 'Required'], itemarr[i]));
				if (itemarr[i].replace === true) {
					itemarr[i].valid = false;
					this[paramsName + 'Required'][indexArr[i]] = itemarr[i];
				}
			}
			if (eqFlag == 'indexof') {
				if (eqvalue.indexOf(this[paramsName][filedName]) != -1) {
					for (var i = 0; i < indexArr.length; i++) {
						this[paramsName + 'Required'][indexArr[i]].valid = true;
					}
					if (falgName) this[falgName] = true;
					return true;
				}
			} else {
				if (this[paramsName][filedName] == eqvalue) {
					for (var i = 0; i < indexArr.length; i++) {
						this[paramsName + 'Required'][indexArr[i]].valid = true;
					}
					if (falgName) this[falgName] = true;
					return true;
				}
			}
			for (var i = 0; i < indexArr.length; i++) {
				this[paramsName + 'Required'][indexArr[i]].valid = false;
			}
			if (falgName) this[falgName] = false;
			return false;
		},
		getRule(rule) {
			var arr = [];
			if (rule.length) {
				for (var i = 0; i < rule.length; i++) {
					if (rule[i].valid === undefined || rule[i].valid == true) {
						arr.push(rule[i]);
					}
				}
			}
			return arr;
		},
		checkRequire(require = [], data, save = false, tabname = '') {
			for (var i = 0; i < require.length; i++) {
				if (save) {
					if (data[require[i].value] == '' && require[i].save) {
						uni.showToast({
							title: tabname + '有必填项为空',
							icon: 'none',
							duration: 1500
						});
						return true;
					}
				} else {
					if (data[require[i].value] == '') {
						uni.showToast({
							title: tabname + '有必填项为空',
							icon: 'none',
							duration: 1500
						});
						return true;
					}
				}
			}
			return false;
		},
		getCustStatus(save) {
			// 提交时传： 01临时客户 05担保客户 20正式客户   保存时传： 00 草稿客户(正式)  01 临时客户  02 草稿客户(担保)
			//  00 草稿客户(正式)  02 草稿客户(担保) 转为 05担保客户 20正式客户  时 appFlag 为1 状态不变
			// custType 1临时  2 正式  3 担保
			if (save) {
				switch (this.custType) {
					case '1':
						return '01';
						break;
					case '2':
						return '00';
						break;
					case '3':
						return '02';
						break;
					default:
						return '';
						break;
				}
			} else {
				switch (this.custType) {
					case '1':
						return '01';
						break;
					case '2':
						return '20';
						break;
					case '3':
						return '05';
						break;
					default:
						return '';
						break;
				}
			}
		},
		getId() {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.$request
					.post({
						url: 'es/json/EsCustInfo2',
						data: {
							SYSNO: '', //	外部系统编号
							CUSTNO: '', //	客户编号 _this.data['CUST-NO]
							CERTYP: _this.certype(_this.paramsAll.cert_type), //	证件类型
							CERNO: _this.paramsAll.cert_code, //	证件号码
							FULLNAM: _this.paramsAll.cus_name //	客户全称
						}
					})
					.then(data => {
						if (data.response.header.returnCode == '00000000' && data.response.content) {
							var data = data.response.content;
							resolve(data['CUST-NO']);
						} else {
							resolve('');
						}
					})
					.catch(err => {
						resolve('');
					});
			});
		},
		transformIdentityCard(value) {
			var birthday = '';
			var sex = '';
			// sex 0未知  1男  2女
			if (value.length === 15) {
				birthday = `19${value.substr(6, 2)}-${value.substr(8, 2)}-${value.substr(10, 2)}`;
				sex = value.substr(14, 1) % 2 || 2;
			}
			if (value.length === 18) {
				birthday = `${value.substr(6, 4)}-${value.substr(10, 2)}-${value.substr(12, 2)}`;
				sex = value.substr(16, 1) % 2 || 2;
			}
			return {
				birthday: birthday,
				sex: sex
			};
		},
		certype(type) {
			switch (type) {
				case '10':
					return 'A';
					break;
				case '11':
					return 'M';
					break;
				case '12':
					return 'J';
					break;
				case '13':
					return 'B';
					break;
				case '14':
					return 'E';
					break;
				case '15':
					return 'G';
					break;
				case '16':
					return 'H';
					break;
				case '17':
					return '3';
					break;
				case '18':
					return '4';
					break;
				case '19':
					return 'D';
					break;
				case '1X':
					return 'N';
					break;
				case '20':
					return 'P';
					break;
				case '21':
					return 'U';
					break;
				case '22':
					return 'R';
					break;
				case '23':
					return '2';
					break;
				case '24':
					return 'F';
					break;
				case '25':
					return 'Q';
					break;
				case '26':
					return 'T';
					break;
				case '27':
					return 'V';
					break;
				case '28':
					return 'W';
					break;
				case '29':
					return 'X';
					break;
				case '30':
					return 'Y';
					break;
			}
		},
		arrHasObj(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == obj.name) {
					return i;
					break;
				}
			}
			return -1;
		}
	},
	watch: {
		currentTabIndexMain(newv, oldv) {
			console.log('当前tabindex', newv, oldv);
			if (this.getIsorigin) {
				return;
			}
			var lists = [
				{ index: 0, value: 'ourBankBaseInfo' },
				{ index: 1, value: 'businessInfo' },
				{ index: 2, value: 'indivInfo' },
				{ index: 3, value: 'maritalStatus' },
				{ index: 4, value: 'relationInfo' },
				{ index: 5, value: 'companyInfo' },
				{ index: 6, value: 'financialAssets' },
				{ index: 7, value: 'ass_list' },
				{ index: 8, value: 'otherInfo' }
			];
			if (this.custType == 3) {
				lists.splice(7, 1);
				lists[7].index = 7;
			}
			if (newv == 7) {
				this.queryAssList();
			}
			if (oldv == 7) {
			} else {
				for (var i = 0; i < lists.length; i++) {
					if (lists[i].index == oldv) {
						this.infoSubmit(true, lists[i].value, true);
					}
				}
			}
		},
		'ourBankBaseInfo.cus_type': {
			handler(newv, oldv) {
				if (this.ourBankBaseInfo.cus_type == '110') {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'none';
					});
				} else {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'inline-block';
					});
				}
				var item = { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' };
				var index = this.arrHasObj(this.businessInfoRequired, item);
				if (this.ourBankBaseInfo.cus_type == '150' && this.businessInfo.reg_flag == 1 && this.businessInfo.ins_code_flag == 1) {
					if (index == -1) {
						this.businessInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.businessInfoRequired[index].valid = false;
				}
				return false;
			}
		},
		'businessInfo.reg_flag': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'reg_code', checkType: 'notnull', errorMsg: '请输入登记注册号' },
					{ name: 'word_name', checkType: 'notnull', errorMsg: '请输入单位名称' },
					{ name: 'reg_org', checkType: 'notnull', errorMsg: '请输入发证机关' },
					{ name: 'reg_type', checkType: 'notnull', errorMsg: '请选择组成形式' },
					{ name: 'oper_place', checkType: 'notnull', errorMsg: '请输入经营场所' },
					{ name: 'oper_range_way', checkType: 'notnull', errorMsg: '请输入经营范围及方式' },
					{ name: 'reg_start_date', checkType: 'notnull', errorMsg: '请选择营业执照起始日' },
					{ name: 'reg_end_date', checkType: 'notnull', errorMsg: '请选择营业执照到期日' },
					{ name: 'ins_code_flag', checkType: 'notnull', errorMsg: '请选择是否有组织机构代码' }
					// { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' }
				];
				this.changeRequireStatus(itemarr, 'businessInfo', 'reg_flag', 1, 'regcodeRequire');
				var item = { name: 'operator_name', checkType: 'notnull', errorMsg: '请输入经营者姓名' };
				var index = this.arrHasObj(this.businessInfoRequired, item);
				if (this.ourBankBaseInfo.cus_type == '150' && this.businessInfo.reg_flag == 1 && this.businessInfo.ins_code_flag == 1) {
					if (index == -1) {
						this.businessInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.businessInfoRequired[index].valid = false;
				}
				return false;
			}
		},
		'businessInfo.ins_code_flag': {
			handler(newv, oldv) {
				var item = [
					{ name: 'indiv_ins_code', checkType: 'notnull', errorMsg: '请输入组织机构代码' },
					{ name: 'ins_code_date', checkType: 'notnull', errorMsg: '请输入组织机构代码有效期' }
				];
				return this.changeRequireStatus(item, 'businessInfo', 'ins_code_flag', 1, 'flagdatename');
			}
		},
		'ourBankBaseInfo.agri_flg': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'is_farming', checkType: 'notnull', errorMsg: '请选择是否农业专业大户' },
					{ name: 'is_farmcoop', checkType: 'notnull', errorMsg: '请选择是否家庭农场' }
				];
				return this.changeRequireStatus(itemarr, 'ourBankBaseInfo', 'agri_flg', 1, 'farmingfarmcoop');
			}
		},
		'ourBankBaseInfo.is_bank_stk': {
			handler(newv, oldv) {
				var item = { name: 'com_hold_stk_amt', checkType: 'notnull', errorMsg: '拥有我行股份金额' };
				var index = this.arrHasObj(this.ourBankBaseInfoRequired, item);
				if (this.ourBankBaseInfo.is_bank_stk == 1) {
					if (index == -1) {
						this.ourBankBaseInfoRequired[index].valid = true;
					}
					this.comholdstkamt = true;
					return true;
				}
				if (index != -1) {
					this.ourBankBaseInfoRequired[index].valid = false;
				}
				this.ourBankBaseInfo.com_hold_stk_amt = '0.00';
				this.comholdstkamt = false;
				return false;
			}
		},
		'indivInfo.is_business_owner': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'com_str_date', checkType: 'notnull', errorMsg: '请选择企业成立年月(格式:yyyy-mm)' },
					{ name: 'startworkdate', checkType: 'notnull', errorMsg: '请选择经营起始年份' },
					{ name: 'yearlamt', checkType: 'money', errorMsg: '请输入最近一个完整年度营业收入', error: '金额格式错误' },
					{ name: 'com_opt_owner', checkType: 'notnull', errorMsg: '请选择经营场地所有权' }
				];
				return this.changeRequireStatus(itemarr, 'indivInfo', 'is_business_owner', 1, 'isbusinessowner');
			}
		},

		'maritalStatus.indiv_mar_st': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'indiv_sps_id_typ', checkType: 'notnull', errorMsg: '配偶证件类型' },
					{
						name: 'indiv_sps_id_code',
						checkType: this.maritalStatus.indiv_sps_id_typ != '10' ? 'notnull' : 'certcode',
						errorMsg: '配偶证件号码',
						error: '证件号码格式错误',
						replace: true
					},
					{ name: 'indiv_sps_name', checkType: 'notnull', errorMsg: '配偶姓名' },
					{ name: 'cus_id_rel', checkType: 'notnull', errorMsg: '配偶客户号' },
					{ name: 'indiv_scom_name', checkType: 'notnull', errorMsg: '工作单位' },
					{ name: 'indiv_sps_mphn', checkType: 'phoneno', errorMsg: '手机号码', error: '手机号码格式错误' },
					{ name: 'indiv_sps_phn', checkType: 'notnull', errorMsg: '单位电话' },
					{ name: 'indiv_sps_mincm', checkType: 'money', errorMsg: '配偶月收入(元)', error: '金额格式错误' },
					{ name: 'indiv_sps_out', checkType: 'notnull', errorMsg: '配偶月债务支出' }
				];
				return this.changeRequireStatus(itemarr, 'maritalStatus', 'indiv_mar_st', '20,21,22,23', 'msindivmars', 'indexof');
			}
		},
		'otherInfo.loan_card_flg': {
			handler(newv, oldv) {
				var itemarr = [
					{ name: 'loan_card_id', checkType: 'int', checkRule: '16', errorMsg: '请输入中征码(原贷款卡号)', error: '中征码为16位数字' },
					{ name: 'loan_card_eff_flg', checkType: 'notnull', errorMsg: '请选择中征码状态' }
				];
				return this.changeRequireStatus(itemarr, 'otherInfo', 'loan_card_flg', '1', 'loancardideffflg');
			}
		},
		'temporary.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.temporaryRequired.length; i++) {
					var element = this.temporaryRequired[i];
					if (element.name == 'cert_code') {
						if (this.temporary.cert_type == '10') {
							this.temporaryRequired[i].checkType = 'certcode';
						} else {
							this.temporaryRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		},
		'ourBankBaseInfo.cert_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.ourBankBaseInfoRequired.length; i++) {
					var element = this.ourBankBaseInfoRequired[i];
					if (element.name == 'cert_code') {
						if (this.ourBankBaseInfo.cert_type == '10') {
							this.ourBankBaseInfoRequired[i].checkType = 'certcode';
						} else {
							this.ourBankBaseInfoRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		},
		'ourBankBaseInfo.long_flag': {
			handler(newv, oldv) {
				this.changeRequireStatus([{ name: 'indiv_id_exp_dt', checkType: 'notnull', errorMsg: '请选择证件到期日' }], 'ourBankBaseInfo', 'long_flag', 2, 'individexpdtreq');
			}
		},
		'relationInfo.same_curadd_flg': {
			handler(newv, oldv) {
				if (newv == '1') {
					if (this.ourBankBaseInfo.now_address) {
						this.relationInfo.post_addr = this.ourBankBaseInfo.now_address;
					} else {
						uni.showModal({
							content: '个人基本信息:请输入现居住地址',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
					}
				}
				this.$forceUpdate();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.nopb.bottomGap {
	padding-bottom: 0;
}
#pageCheckID .mc-btn-primary {
	width: 100%;
}
#pageCheckID .w100 {
	display: flex;
	flex-direction: column;
}
#pageCheckID .mcform {
	margin-bottom: 40rpx;
}
#pageCheckID .mcform .infoTipTitle {
	font-weight: 600;
}
.bottomGap {
	padding-bottom: 28rpx;
}
.mcform .oneTextarea {
	flex: 1;
	height: 200rpx;
}
.mcform .uni-form-item.onerow.minHeight {
	height: 40rpx;
}
.mcform .uni-form-item .uni-input {
	text-align: right;
}
.textLeft {
	text-align: left !important;
}
.lastRow {
	margin-bottom: 40rpx;
}
.mcform .uni-form-item.onerow.minHeight .uni-input {
	line-height: 40rpx;
	height: 40rpx;
}
.mcform .uni-list-cell::after {
	display: none !important;
}
.mcform uni-radio-group,
.mcform uni-checkbox-group {
	font-size: 28rpx;
	color: $mc-text-checkTitle;
}
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
}
.select-dialog-wrap {
	padding: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.uni-tip-title-row {
	display: flex;
	justify-content: space-between;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-color;
	letter-spacing: 0;
	line-height: 100rpx;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
	line-height: 100rpx;
}
.uni-column .minHeight1 {
	line-height: 1.5;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.iconfont.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
#pageCheckID .placeholderss {
	color: #c4c7cc;
}
.btnwrap {
	padding-bottom: 40rpx;
	position: relative;
}
.btnwrap::after {
	content: '';
	display: block;
	height: 1rpx;
	background: $mc-text-weak;
	position: absolute;
	width: 153%;
	bottom: 0;
	left: -70rpx;
}
#pageCheckID .mc-min-btn-primary.haveBg {
	background: #f2f6ff;
	color: #5d92ff;
	border: 1px solid #5d92ff;
	margin-left: 32rpx;
}
.listWrap {
	position: relative;
	margin-top: 40rpx;
}
.familyList .mcitem .mclabel {
	font-size: 28rpx;
	color: $mc-text-checkOption;
	// font-weight: 600;
	margin-right: 50rpx;
	margin-left: 0;
}
.familyList .mcitem.mcrowOne > uni-view {
	width: 40%;
}
.familyList .mcitem.mcrowOne > uni-view:first-child {
	width: 60%;
}
.familyList .mcitem .mccontent {
	color: $mc-text-color;
	font-size: 28rpx;
}
.inline-btn {
	position: relative;
}
.inline-btn .mc-min-btn-waring {
	float: left;
}
.listWrap .inline-btn-right {
	margin-right: 20rpx;
}
.textLeft {
	text-align: left;
}
.emptyData {
	margin-top: 32rpx;
}
.mianRadius.wrapScroll {
	display: flex;
	flex-direction: column;
}
.listbox.wrapScroll {
	height: 100%;
	overflow: auto;
}

</style>
