<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<tabbars
			:fistLevel="currentTabIndexMain == 0 || currentTabIndexMain == 1 || currentTabIndexMain == 8 ? true : false"
			tposition="top"
			:titleBottomLine="true"
			:swduration="120"
			style="height: 100%;"
			@getCurrent="currentTabIndexMain = $event"
			@getnid="currentTabIndexMainShow.push($event)"
			:onBeforeSwitch1="onBeforeSwitch1"
			ref="tabs"
		>
			<swiper-item label="贷款基本信息" v-if="currentTabIndexMainShow.indexOf('dkjbxx') != -1" nid="dkjbxx">
				<tabbars
					class="tabstwo"
					v-if="currentTabIndexMainShow.indexOf('dkjbxx') != -1"
					tposition="top"
					:titleBottomLine="true"
					:swduration="120"
					style="height: 100%;"
					ref="tabstwodk"
					@getCurrent="currentTabIndexSub = $event"
					:onBeforeSwitch1="onBeforeSwitch1"
					:onBeforeSwitch="onBeforeSwitch"
					@getIsorigin="getIsorigin = $event"
					@getnid="currentTabIndexSubShow.push($event)"
				>
					<swiper-item label="申请信息" nid="dksqxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dksqxx') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="paramsAll.prd_code == '022016' && paramsAll.biz_type_sub == '022204'">
									<view class="title requireIcon">差额放款细分产品</view>
									<mc-pop-select class="uni-input" :disabled="true" v-model="applyInfo.bal_loan_sub_prd" :data="selectdata.bal_loan_sub_prd"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">客户名称</view>
									<input v-model="applyInfo.cus_name" disabled type="text" class="uni-input" value="" placeholder="请输入客户名称" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">是否国家限制行业</view>
									<mc-pop-select
										class="uni-input"
										:disabled="isQueryDetail"
										v-model="applyInfo.contry_limit_flag"
										:data="selectdata.contry_limit_flag"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">是否授权内</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.authorize_flag" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view v-if="loanstartdateShow" class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">能源类型</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										v-model="applyInfo.loan_start_date"
										:data="selectdata.loan_start_date"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">即时续贷贷款</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.immediate_loan_flag" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">月债务支出(元)</view>
									<input :disabled="isQueryDetail" v-model="applyInfo.indiv_loan_mout" type="number" class="uni-input" value="" placeholder="请输入月债务支出" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">本金月分摊额(元)</view>
									<input :disabled="isQueryDetail" v-model="applyInfo.capital_amt" type="number" class="uni-input" value="" placeholder="请输入本金月分摊额" />
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">主担保下押品是否存在二次抵质押情况</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.coltis_uses" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">是否新旧动能转换十强产业</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.energy_flag" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<block v-if="applyInfo.energy_flag == 1">
									<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
										<view class="title requireIcon">十强产业</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											mode="tenindustry"
											class="uni-input"
											v-model="applyInfo.loan_for_energy"
											@getName="applyInfo.energy_name = $event"
										></mc-picker-select>
									</view>
								</block>
								<block v-if="loanrecordflagShow">
									<view class="uni-form-item uni-column nopb bottomGap">
										<view class="title requireIcon">人行征信系统查询后该户有无贷款记录</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.loan_record_int_flag" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">是否防疫贷</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.is_epidemic" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">是否农易贷</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.is_agricult" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">是否复工贷</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="applyInfo.is_multiplex" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
								</block>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">申请币种</view>
									<mc-picker-select
										class="uni-input"
										mode="selector"
										:disabled="true"
										v-model="applyInfo.apply_cur_type"
										range-key="label"
										:range="selectdata.apply_cur_type"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">申请金额(元)</view>
									<input :disabled="isQueryDetail" v-model="applyInfo.apply_amount" type="number" class="uni-input" value="" placeholder="请输入申请金额" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">利率定价类型</view>
									<mc-pop-select class="uni-input" v-model="applyInfo.base_type" :disabled="true" :data="selectdata.base_type"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">期限时间类型</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="applyInfo.term_time_type" :data="selectdata.term_time_type"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">申请期限</view>
									<input
										:disabled="isQueryDetail"
										v-model="applyInfo.apply_term"
										@blur="applyInfoapplyterm"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入申请期限"
									/>
								</view>
								<!-- <view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">到期日</view>
									<mc-picker-select :disabled="isQueryDetail" class="uni-input" mode="date" v-model="applyInfo.end_date"></mc-picker-select>
								</view> -->
							</view>
							<!-- 
							<button type="default" @click="toLink('/pages/result/result?isSuccess=true&appOper=1')">4567654</button> -->
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'applyInfo')">保存</button>
						</view>
					</swiper-item>
					<!-- <swiper-item label="业务分类" nid="dkywfl" v-if="paramsAll.prd_code == '022022' || paramsAll.prd_code == '022009'"> -->
					<swiper-item label="业务分类" nid="dkywfl">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">创业通达</view>
									<mc-checkbox-group :disabled="isQueryDetail" v-model="bussclassInfo.cytd" :data="selectdata.cytd" class="mcradio"></mc-checkbox-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">业务模式</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="bussclassInfo.pro_mode" :data="selectdata.pro_mode"></mc-pop-select>
								</view>
								<block v-if="paramsAll.prd_code == '022022' || paramsAll.prd_code == '022009'">
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">抵质押类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.pledge"
											:range="selectdata.pledge"
											@getName="procategory.pledgename = $event"
											@getitems="procategory.pledgeArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">交易类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.TransactionClass"
											:range="selectdata.TransactionClass"
											@getName="procategory.TransactionClassname = $event"
											@getitems="procategory.TransactionClassArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">固定资产类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.fixed_assets"
											:range="selectdata.fixed_assets"
											@getName="procategory.fixed_assetsname = $event"
											@getitems="procategory.fixed_assetsArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">政策类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.policy"
											:range="selectdata.policy"
											@getName="procategory.policyname = $event"
											@getitems="procategory.policyArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">保险类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.insurance"
											:range="selectdata.insurance"
											@getName="procategory.insurancename = $event"
											@getitems="procategory.insuranceArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title">其他特色类</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="multiple"
											v-model="procategory.other_features"
											:range="selectdata.other_features"
											@getName="procategory.other_featuresname = $event"
											@getitems="procategory.other_featuresArr = $event"
										></mc-picker-select>
									</view>
									<view class="uni-form-item uni-column onerow lastRow">
										<view class="title requireIcon" style="flex-shrink: 0;">业务品种</view>
										<textarea style="padding-top: 30rpx;" disabled v-model="ord_pro_categoryname" maxlength="1000" placeholder="回显以上选择框的值" />
										<button
											type=""
											class="mc-min-btn-primaryplan iconRight"
											:class="{ disableds: procategory.ord_pro_category === '' }"
											:disabled="isQueryDetail || procategory.ord_pro_category === ''"
											@click="clearprocategory"
											style="flex-shrink: 0;margin-top: 20rpx;"
										>
											清空
										</button>
									</view>
								</block>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'bussclassInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="担保方式" nid="dkdbfs">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dkdbfs') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">主要担保方式</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										v-model="assuremeansInfo.assure_means_main"
										:data="selectdata.assure_means"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">担保方式2</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="assuremeansInfo.assure_means2"
										:data="selectdata.assure_means"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow">
									<view class="title">担保方式3</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="assuremeansInfo.assure_means3"
										:data="selectdata.assure_means"
									></mc-pop-select>
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'assuremeansInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="利率信息" nid="dklvxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dklvxx') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">年定价基准(%)</view>
									<!-- <input type="number" value="" v-model="rateInfo.ruling_ir" /> -->
									<span class="uni-input disabledtext">{{ rateInfo.ruling_ir }}</span>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">审批利率上浮比例(%)</view>
									<input
										:disabled="isQueryDetail"
										v-model="rateInfo.cal_floating_ir"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入审批利率上浮比例"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">利率浮动类型</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="rateInfo.floating_type" :data="selectdata.floating_type"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">利率浮动比/点数(%)</view>
									<input
										:disabled="isQueryDetail"
										v-model="rateInfo.floating_rate"
										@blur="cumputedFloatRate"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入利率浮动比 / 点数"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">执行年利率(%)</view>
									<!-- <input type="number" value="" v-model="rateInfo.reality_ir_y" /> -->
									<input v-model="rateInfo.reality_ir_y" type="number" disabled class="uni-input" value="" placeholder="请输入执行年利率" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">执行月利率(‰)</view>
									<!-- <input type="number" value="" v-model="rateInfo.reality_ir_m" /> -->
									<input v-model="rateInfo.reality_ir_m" type="number" disabled class="uni-input" value="" placeholder="请输入执行月利率" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">逾期月利率(‰)</view>
									<!-- <input type="number" value="" v-model="rateInfo.overdue_ir" /> -->
									<input v-model="rateInfo.overdue_ir" type="number" disabled class="uni-input" value="" placeholder="请输入逾期月利率" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">转移用途月利率(‰)</view>
									<!-- <input type="number" value="" v-model="rateInfo.default_ir" /> -->
									<input v-model="rateInfo.default_ir" type="number" disabled class="uni-input" value="" placeholder="请输入转移用途月利率" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">利率调整模式</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="rateInfo.rate_exe_model" :data="selectdata.rate_exe_model"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">利率调整方式</view>
									<mc-pop-select
										class="uni-input"
										:disabled="isQueryDetail || rateInfo.rate_exe_model === '11'"
										v-model="rateInfo.ir_adjust_mode"
										:data="selectdatair_adjust_mode"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="paramsAll.biz_type_sub == '022204' || paramsAll.biz_type_sub == '022241'">
									<view class="title requireIcon">定价基准参照日</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="rateInfo.ir_match_type" :data="selectdata.ir_match_type"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="intradjstrtdt1">
									<view class="title requireIcon">利率调整起始日期</view>
									<mc-picker-select :disabled="isQueryDetail" class="uni-input" mode="date" v-model="rateInfo.intr_adj_strt_dt1"></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="ir_adjust_days">
									<view class="title requireIcon">定期周期(月)</view>
									<input :disabled="isQueryDetail" v-model="rateInfo.ir_adjust_days" type="number" class="uni-input" value="" placeholder="请输入定期周期" />
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">是否贴息</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="rateInfo.discont_ind" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap" v-if="rateInfo.discont_ind == '1'">
									<view class="title requireIcon">贴息方编号</view>
									<mc-picker-select :disabled="isQueryDetail" ref="discountid" class="uni-input" mode="listSelection" v-model="rateInfo.discount_id">
										<ul>
											<scroll-view
												v-if="discountList.length"
												class="scroll-Y scrollUl"
												:lower-threshold="10"
												scroll-y="true"
												@scrolltolower="loadListdiscountList"
											>
												<block v-if="discountList.length">
													<li class="discountList" v-for="(item, index) in discountList" :key="index">
														<view class="mcitems">
															<view class="mcitem resver mcrowOne">
																<span class="mclabel">贴息方编号</span>
																<span class="mccontent">{{ item.discount_id ? item.discount_id : '-' }}</span>
															</view>
															<view class="mcitem resver mcrowOne">
																<span class="mclabel">贴息方名称</span>
																<span class="mccontent">{{ item.discount_name ? item.discount_name : '-' }}</span>
															</view>
															<view class="mcitem resver mcrowOne">
																<span class="mclabel">贴息方说明</span>
																<span class="mccontent tworowText tworowTextell">{{ item.discount_dec ? item.discount_dec : '-' }}</span>
															</view>
														</view>
														<view class="inline-btn inline-btn-right">
															<button :disabled="isQueryDetail" @click="selectDiscountId(index, item)" class="mc-min-btn-primary">选定</button>
														</view>
														<view class="line-h"></view>
													</li>
												</block>
												<li v-else class="emptyData">暂无数据</li>
											</scroll-view>
										</ul>
									</mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">还款方式</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="rateInfo.repayment_mode" :data="selectdata.repayment_mode"></mc-pop-select>
								</view>
								<block v-if="rateInfo.repayment_mode == '201' || rateInfo.repayment_mode == '202'">
									<view class="uni-form-item uni-column nopb bottomGap">
										<view class="title requireIcon">是否免息</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="rateInfo.is_free_time" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
									<block v-if="rateInfo.is_free_time == 1">
										<view class="uni-form-item uni-column onerow nopb bottomGap">
											<view class="title requireIcon">免息期数</view>
											<input :disabled="isQueryDetail" v-model="rateInfo.free_time" type="text" class="uni-input" value="" placeholder="请输入免息期数" />
										</view>
										<view class="uni-form-item uni-column onerow nopb bottomGap">
											<view class="title requireIcon">付息方式</view>
											<mc-pop-select
												:disabled="isQueryDetail"
												class="uni-input"
												v-model="rateInfo.discount_typ"
												:data="selectdata.discount_typ"
											></mc-pop-select>
										</view>
									</block>
								</block>
								<view
									class="uni-form-item uni-column onerow"
									:class="{ lastRow: rateInfo.interest_acc_mode != '13', nopb: rateInfo.repayment_mode !== '101', bottomGap: rateInfo.repayment_mode !== '101' }"
								>
									<view class="title requireIcon">结息方式</view>
									<mc-pop-select
										:disabled="isQueryDetail || rateInfo.repayment_mode === '101' || rateInfo.repayment_mode === '201' || rateInfo.repayment_mode === '202'"
										class="uni-input"
										v-model="rateInfo.interest_acc_mode"
										:data="selectdatainterest_acc_mode"
									></mc-pop-select>
								</view>
								<block v-if="rateInfo.interest_acc_mode == '13'">
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">缴息周期</view>
										<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="rateInfo.pay_cycle" :data="selectdata.pay_cycle"></mc-pop-select>
									</view>
									<view class="uni-form-item uni-column onerow lastRow">
										<view class="title requireIcon">缴息日期</view>
										<mc-picker-select
											:disabled="isQueryDetail"
											class="uni-input"
											mode="selector"
											v-model="rateInfo.pay_period"
											range-key="label"
											:range="selectdata.pay_period"
										></mc-picker-select>
									</view>
								</block>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'rateInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="投向信息" nid="dktxxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dktxxx') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
									<view class="title" :class="{ requireIcon: paramsAll.prd_code == '022022' || paramsAll.prd_code == '022009' }">贷款投向</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										:clearable="true"
										mode="industry"
										class="uni-input"
										v-model="directionInfo.loan_direction"
										@getName="directionInfo.direction_name = $event"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">涉农类型</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										mode="selector"
										v-model="directionInfo.agriculture_type"
										range-key="label"
										:range="selectdata.agriculture_type"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow" v-if="directionInfo.agriculture_type != '00'">
									<view class="title requireIcon">涉农用途</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										mode="selector"
										v-model="directionInfo.agriculture_use"
										range-key="label"
										:range="selectdata.agriculture_use"
									></mc-picker-select>
									<!-- <mc-pop-select class="uni-input" v-model="directionInfo.agriculture_use" :data="selectdata.agriculture_use"></mc-pop-select> -->
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">申请借款用途</view>
									<textarea :disabled="isQueryDetail" v-model="directionInfo.use_dec" maxlength="4000" placeholder="请输入申请借款用途" />
								</view>
								<view class="uni-form-item uni-column ">
									<view class="title requireIcon">还款来源</view>
									<textarea :disabled="isQueryDetail" v-model="directionInfo.repayment_src_dec" maxlength="200" placeholder="请输入还款来源" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'directionInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="合作方信息" nid="dkhzfxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dkhzfxx') != -1">
							<view class="mianRadius mcform" style="height: auto;overflow: inherit;padding: 20rpx 40rpx;">
								<view class="uni-form-item uni-column onerow">
									<view class="title requireIcon">是否合作方标志</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="copartnerindInfo.copartner_ind" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" :disabled="copartner_list.length ? true : false" label="否"></mc-radio>
									</mc-radio-group>
								</view>
							</view>
							<view class="mianRadius mcform wrapScroll">
								<block v-if="copartnerindInfo.copartner_ind == 1">
									<view class="btnwrap">
										<button
											:disabled="isQueryDetail"
											class="mc-min-btn-primary"
											@click="toLink('/pages/loanApplication/addInfo/addInfo?isAdd=true&type=4&serno=' + currentserno)"
										>
											新增
										</button>
										<button type="" class="mc-min-btn-primary haveBg" @click="queryOtherInfoList('4', 'copartner_list', true)">查询</button>
									</view>
									<view v-if="!copartner_list.length" class="emptyData">{{ copartner_listEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
									<scroll-view
										v-if="copartner_list.length"
										class="scroll-Y listbox wrapScroll"
										:lower-threshold="10"
										scroll-y="true"
										@scrolltolower="loadList('copartner_list')"
									>
										<view class="listWrap bottomGap" v-for="(item, index) in copartner_list" :key="index">
											<view class="mcitems familyList">
												<view class="mcitem resver mcrowOne">
													<span class="mclabel">第三方授信协议编号</span>
													<span class="mccontent">{{ item.cop_cont_no ? item.cop_cont_no : '-' }}</span>
												</view>
												<view class="mcitem resver mcrowOne">
													<span class="mclabel">本次业务占用金额(元)</span>
													<span class="mccontent">{{ item.cop_use_amt ? item.cop_use_amt : '-' }}</span>
												</view>
											</view>
											<view class="inline-btn inline-btn-right">
												<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delAssList(item, '4', 'copartner_list', index)">删除</button>
												<button
													v-if="isQueryDetail"
													type=""
													class="mc-min-btn-primary"
													@click="toLink('/pages/loanApplication/addInfo/addInfo?isDetail=true&type=4&serno=' + currentserno + '&index=' + index)"
												>
													详情
												</button>
												<button
													:disabled="isQueryDetail"
													type=""
													class="mc-min-btn-primary"
													@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=4&serno=' + currentserno + '&index=' + index)"
												>
													修改
												</button>
											</view>
										</view>
										<view class="emptyData loadingData">{{ copartner_listEnd ? '没有更多数据了!' : '加载更多' }}</view>
									</scroll-view>
								</block>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'copartnerindInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="支付信息" nid="dkzfxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dkzfxx') != -1">
							<view class="mianRadius mcform" style="height: auto;overflow: inherit;padding: 20rpx 40rpx;">
								<view class="uni-form-item uni-column onerow">
									<view class="title requireIcon">支付方式</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="paymentInfo.payment_type" :data="selectdata.payment_type"></mc-pop-select>
								</view>
							</view>
							<view class="mianRadius mcform wrapScroll">
								<block v-if="paymentInfo.payment_type == 2">
									<view class="btnwrap">
										<button
											:disabled="isQueryDetail"
											class="mc-min-btn-primary"
											@click="toLink('/pages/loanApplication/addInfo/addInfo?isAdd=true&type=3&serno=' + currentserno)"
										>
											新增
										</button>
										<button type="" class="mc-min-btn-primary haveBg" @click="queryOtherInfoList('3', 'payment_list', true)">查询</button>
									</view>
									<view v-if="!payment_list.length" class="emptyData">{{ payment_listEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
									<scroll-view
										v-if="payment_list.length"
										class="scroll-Y listbox wrapScroll"
										:lower-threshold="10"
										scroll-y="true"
										@scrolltolower="loadList('payment_list')"
									>
										<view class="listWrap bottomGap" v-for="(item, index) in payment_list" :key="index">
											<view class="mcitems familyList">
												<view class="mcitem resver mcrowOne">
													<span class="mclabel">账号</span>
													<span class="mccontent">{{ item.benifit_acc ? item.benifit_acc : '-' }}</span>
												</view>
												<view class="mcitem resver mcrowOne">
													<span class="mclabel">账号户名</span>
													<span class="mccontent">{{ item.benifit_name ? item.benifit_name : '-' }}</span>
												</view>
												<view class="mcitem resver mcrowOne">
													<span class="mclabel">付款金额</span>
													<span class="mccontent">{{ item.amount ? item.amount : '-' }}</span>
												</view>
											</view>
											<view class="inline-btn inline-btn-right">
												<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delAssList(item, '3', 'payment_list', index)">删除</button>
												<button
													type=""
													class="mc-min-btn-primary"
													@click="toLink('/pages/loanApplication/addInfo/addInfo?isDetail=true&type=3&serno=' + currentserno + '&index=' + index)"
												>
													详情
												</button>
												<button
													:disabled="isQueryDetail"
													type=""
													class="mc-min-btn-primary"
													@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=3&serno=' + currentserno + '&index=' + index)"
												>
													修改
												</button>
											</view>
										</view>
										<view class="emptyData loadingData">{{ payment_listEnd ? '没有更多数据了!' : '加载更多' }}</view>
									</scroll-view>
								</block>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'paymentInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="意见信息" nid="dkyjxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dkyjxx') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">调查人意见</view>
									<textarea :disabled="isQueryDetail" v-model="invstconclInfo.invst_concl" maxlength="2600" placeholder="请输入调查人意见" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap mc-haveTwoRow">
									<view class="title requireIcon">风险分类初分意见</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										mode="selector"
										v-model="invstconclInfo.cla_result"
										range-key="label"
										:range="selectdata.cla_result"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">十级分类</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										mode="selector"
										v-model="invstconclInfo.ten_result"
										range-key="label"
										:range="selectdata.ten_result"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column lastRow">
									<view class="title requireIcon">分类理由</view>
									<textarea :disabled="isQueryDetail" v-model="invstconclInfo.cla_suggestion" maxlength="500" placeholder="请输入分类理由" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'invstconclInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="机构信息" nid="dkygxx">
						<view class="w100" v-if="currentTabIndexSubShow.indexOf('dkygxx') != -1">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">登记日期</view>
									<mc-picker-select :disabled="true" class="uni-input" mode="date" v-model="organizationInfo.input_date"></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">营销人</view>
									<view class="uni-input" :class="{ disabledtext: isQueryDetail }" @click="isQueryDetail ? '' : setmanagerSelect('1')">
										<span v-if="!organizationInfo.investigator_id" class="placeholderss">请选择</span>
										<span v-else>{{ organizationInfo.investigator_id }}</span>
										<span class="iconfont icons">&#xe502;</span>
									</view>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">营销人姓名</view>
									<input v-model="manger1Name" disabled type="text" class="uni-input" value="" placeholder="请输入营销人姓名" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">协办客户经理</view>
									<view class="uni-input" :class="{ disabledtext: isQueryDetail }" @click="isQueryDetail ? '' : setmanagerSelect('2')">
										<span v-if="!organizationInfo.examinant_id" class="placeholderss">请选择</span>
										<span v-else>{{ organizationInfo.examinant_id }}</span>
										<span class="iconfont icons">&#xe502;</span>
									</view>
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">协办客户经理名称</view>
									<input v-model="manger2Name" disabled type="text" class="uni-input" value="" placeholder="请输入协办客户经理名称" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'organizationInfo')">保存</button>
						</view>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="产品信息" nid="cpxx">
				<tabbars
					v-if="currentTabIndexMainShow.indexOf('cpxx') != -1"
					class="tabstwo"
					tposition="top"
					:titleBottomLine="true"
					:swduration="120"
					style="height: 100%;"
					ref="tabscptwo"
					@getCurrent="currentTabIndexSubCp = $event"
				>
					<swiper-item label="个人经营贷款" nid="cpgrjy" v-if="paramsAll.prd_code == '022022'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">单位代码</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.com_id" type="text" class="uni-input" value="" placeholder="请输入单位代码" />
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title">单位名称</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="personoptInfo.com_name"
										maxlength="80"
										placeholder="请输入单位名称"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">经济性质</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.com_kind" type="text" class="uni-input" value="" placeholder="请输入经济性质" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">经营期限</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.opt_dt" type="text" class="uni-input" value="" placeholder="请输入经营期限" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">登记注册号</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.reg_code" type="text" class="uni-input" value="" placeholder="请输入登记注册号" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">注册资本(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="personoptInfo.reg_cap_amt"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入注册资本(元)"
									/>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title">注册登记地址</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="personoptInfo.reg_addr"
										maxlength="80"
										placeholder="请输入注册登记地址"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">国税税务登记代码</view>
									<input
										:disabled="isQueryDetail"
										v-model="personoptInfo.nat_tax_reg_code"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入国税税务登记代码"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">实际控制人客户码</view>
									<input
										:disabled="isQueryDetail"
										v-model="personoptInfo.reality_controler_no"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入实际控制人客户码"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">实际控制人证件类型</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="personoptInfo.reality_controler_id_type"
										:data="selectdata.cert_type1"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">实际控制人证件号码</view>
									<input
										:disabled="isQueryDetail"
										v-model="personoptInfo.reality_controler_id_code"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入实际控制人证件号码"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">实际控制人姓名</view>
									<input
										:disabled="isQueryDetail"
										v-model="personoptInfo.reality_controler_name"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入实际控制人姓名"
									/>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title">通讯地址</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="personoptInfo.post_addr"
										maxlength="80"
										placeholder="请输入通讯地址"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">主营范围</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.com_main_opt_scp" type="text" class="uni-input" value="" placeholder="请输入主营范围" />
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title">兼营范围</view>
									<input :disabled="isQueryDetail" v-model="personoptInfo.com_part_opt_scp" type="text" class="uni-input" value="" placeholder="请输入兼营范围" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'personoptInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item
						:label="paramsAll.prd_code == '022022' ? '小企业汽车' : '汽车消费'"
						nid="cpxqyqc"
						v-if="(paramsAll.prd_code == '022022' && paramsAll.biz_type_sub == '022242') || paramsAll.prd_code == '022010'"
					>
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">购车合同编号</view>
									<input :disabled="isQueryDetail" v-model="personvchInfo.vch_cont_no" type="text" class="uni-input" value="" placeholder="请输入购车合同编号" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">购车品牌名称</view>
									<input
										:disabled="isQueryDetail"
										v-model="personvchInfo.vch_brand_name"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入购车品牌名称"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">车辆型号</view>
									<input :disabled="isQueryDetail" v-model="personvchInfo.vch_model" type="text" class="uni-input" value="" placeholder="请输入车辆型号" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title minHeight1 requireIcon">车辆售价(不含税费和保险)</view>
									<input
										:disabled="isQueryDetail"
										v-model="personvchInfo.vch_price"
										type="number"
										class="uni-input minHeight1"
										value=""
										placeholder="请输入车辆售价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">出厂日期</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										mode="date"
										v-model="personvchInfo.production_date"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">车辆产地</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="personvchInfo.vch_place"
										:data="selectdata.vch_place"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">机动车交强险保单号</view>
									<input
										:disabled="isQueryDetail"
										v-model="personvchInfo.vch_color"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入机动车交强险保单号"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">机动车保险单号</view>
									<input
										:disabled="isQueryDetail"
										v-model="personvchInfo.insuance_no"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入机动车保险单号"
									/>
								</view>
								<view class="uni-form-item uni-column nopb onerow bottomGap">
									<view class="title requireIcon">是否挂靠</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="personvchInfo.if_bst_motorcade" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap" v-if="personvchInfo.if_bst_motorcade == 1">
									<view class="title requireIcon">挂靠单位</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="personvchInfo.motorcade_name"
										maxlength="100"
										placeholder="请输入挂靠单位"
									/>
								</view>

								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">是否销售商担保</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="personvchInfo.if_sales_guatantee" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">首付款金额(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="personvchInfo.init_pay_amount"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入首付款金额"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">购买用途</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="personvchInfo.buy_purpose" :data="selectdata.buy_purpose"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title">营运路线</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="personvchInfo.operating_way"
										maxlength="100"
										placeholder="请输入营运路线"
									/>
								</view>
								<view class="uni-form-item uni-column onerow  lastRow">
									<view class="title requireIcon">车况</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="personvchInfo.carinfo" :data="selectdata.carinfo"></mc-pop-select>
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'personvchInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item :label="paramsAll.prd_code == '022007' ? '住房' : '商业房'" nid="cpzf" v-if="paramsAll.prd_code == '022007' || paramsAll.prd_code == '022009'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon minHeight1">是否以所购房产作为押品</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="housesInfo.isselfhouse" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋属性</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="housesInfo.houses_nature" :data="selectdata.houses_nature"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">购房合同编号</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.housing_cont_id" type="text" class="uni-input" value="" placeholder="请输入购房合同编号" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">预售许可证编号</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.booking_id" type="text" class="uni-input" value="" placeholder="请输入预售许可证编号" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">是否首套房</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="housesInfo.buy_flag" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">是否预抵押</view>
									<mc-radio-group :disabled="isQueryDetail" v-model="housesInfo.pledge_flag" :left="true">
										<mc-radio value="1" label="是"></mc-radio>
										<mc-radio value="2" label="否"></mc-radio>
									</mc-radio-group>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">房屋用途</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="housesInfo.housing_purpose"
										:data="selectdata.housing_purpose"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋状况</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										v-model="housesInfo.housing_status"
										:data="selectdata.housing_status"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋类型</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input"
										mode="selector"
										v-model="housesInfo.housing_type"
										range-key="label"
										:range="selectdata.housing_type"
									></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋计价方式</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										:clearable="true"
										v-model="housesInfo.housing_val_typ"
										:data="selectdata.housing_val_typ"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column nopb bottomGap">
									<view class="title requireIcon">房屋座落位置</view>
									<textarea
										class="autoHeightArea"
										auto-height
										:disabled="isQueryDetail"
										v-model="housesInfo.housing_loc"
										maxlength="100"
										placeholder="请输入房屋座落位置"
									/>
									<span style="position: absolute;right: 10px;" class="iconCertDiscern" @click="isQueryDetail ? '' : marDiscern('maritalStatus')"></span>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">建筑面积(平方米)</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.dsb_area" type="number" class="uni-input" value="" placeholder="请输入建筑面积" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title" :class="{ requireIcon: housesInfo.housing_val_typ == '01' }">套内建筑面积(平方米)</view>
									<input
										:disabled="isQueryDetail"
										:clearable="housesInfo.housing_val_typ !== '01'"
										v-model="housesInfo.cif_area"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入套内建筑面积"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋总价(元)</view>
									<input
										:disabled="isQueryDetail"
										@blur="downpayment"
										v-model="housesInfo.housing_total"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入房屋总价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">单位售价(元)</view>
									<input v-model="housesInfo.sales_price" disabled type="number" class="uni-input" value="" placeholder="请输入单位售价" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">首付款金额(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="housesInfo.down_payment"
										@blur="downpayment"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入首付款金额"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">首付款比例(%)</view>
									<input v-model="housesInfo.down_payment_rate" disabled type="number" class="uni-input" value="" placeholder="请输入首付款比例" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">交房日期</view>
									<mc-picker-select :disabled="isQueryDetail" class="uni-input" :clearable="true" mode="date" v-model="housesInfo.pay_date"></mc-picker-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">小区名称</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.parce_name" type="text" class="uni-input" value="" placeholder="请输入小区名称" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">房屋结构</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="housesInfo.housing_arc" :data="selectdata.housing_arc"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">土地使用方式</view>
									<mc-pop-select :disabled="isQueryDetail" class="uni-input" v-model="housesInfo.land_use_way" :data="selectdata.land_use_way"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">土地剩余使用年限</view>
									<input
										:disabled="isQueryDetail"
										v-model="housesInfo.land_remain_use_y"
										type="text"
										class="uni-input"
										value=""
										placeholder="请输入土地剩余使用年限"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">售房人姓名</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.mark_name" type="text" class="uni-input" value="" placeholder="请输入售房人姓名" />
								</view>
								<block v-if="housesInfo.houses_nature == '2'">
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">原房屋所有权证编号</view>
										<input
											:disabled="isQueryDetail"
											v-model="housesInfo.ownerhip_no"
											type="text"
											class="uni-input"
											value=""
											placeholder="请输入原房屋所有权证编号"
										/>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">房龄(年)</view>
										<input :disabled="isQueryDetail" v-model="housesInfo.houses_age" type="number" class="uni-input" value="" placeholder="请输入房龄" />
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">评估价值(元)</view>
										<input :disabled="isQueryDetail" v-model="housesInfo.assess_value" type="number" class="uni-input" value="" placeholder="请输入评估价值" />
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">评估机构</view>
										<input :disabled="isQueryDetail" v-model="housesInfo.assess_organ" type="text" class="uni-input" value="" placeholder="请输入评估机构" />
									</view>

									<view class="uni-form-item uni-column nopb onerow bottomGap">
										<view class="title requireIcon">是否中介担保</view>
										<mc-radio-group :disabled="isQueryDetail" v-model="housesInfo.medium_flag" :left="true">
											<mc-radio value="1" label="是"></mc-radio>
											<mc-radio value="2" label="否"></mc-radio>
										</mc-radio-group>
									</view>
									<view class="uni-form-item uni-column onerow nopb bottomGap">
										<view class="title requireIcon">中介名称</view>
										<input :disabled="isQueryDetail" v-model="housesInfo.medium_name" type="text" class="uni-input" value="" placeholder="请输入中介名称" />
									</view>
								</block>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">月物业管理费</view>
									<input :disabled="isQueryDetail" v-model="housesInfo.monthfee" type="number" class="uni-input" value="" placeholder="请输入月物业管理费" />
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">房屋区位</view>
									<mc-picker-select
										:disabled="isQueryDetail"
										class="uni-input pickerTwoRowText"
										mode="selector"
										v-model="housesInfo.housing_position"
										range-key="label"
										:range="selectdata.housing_position"
									></mc-picker-select>
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'housesInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item :label="'住房装修'" nid="cpzfzx" v-if="paramsAll.prd_code == '022012'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费内容</view>
									<mc-pop-select :disabled="true" class="uni-input" v-model="housingFitmentInfo.spd_content" :data="selectdata.spd_content"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费品总价(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="housingFitmentInfo.spd_amount"
										@blur="comparaSize('housingFitmentInfo')"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入消费品总价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">贷款成数(%)</view>
									<input v-model="housingFitmentInfo.loan_percent" disabled type="text" class="uni-input" value="" placeholder="请输入贷款成数" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">{{ paramsAll.prd_code == '022012' ? '装修单位' : '销售单位' }}</view>
									<input
										:disabled="isQueryDetail"
										v-model="housingFitmentInfo.fitment_unit"
										type="text"
										class="uni-input"
										value=""
										:placeholder="'请输入' + (paramsAll.prd_code == '022012' ? '装修单位' : '销售单位')"
									/>
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">{{ paramsAll.prd_code == '022012' ? '装修地点' : '耐用品名称' }}</view>
									<input
										:disabled="isQueryDetail"
										v-model="housingFitmentInfo.fitment_place"
										type="text"
										class="uni-input"
										value=""
										:placeholder="'请输入' + (paramsAll.prd_code == '022012' ? '装修地点' : '耐用品名称')"
									/>
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'housingFitmentInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item :label="'耐用品'" nid="cpnyp" v-if="paramsAll.prd_code == '022015'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费内容</view>
									<mc-pop-select :disabled="true" class="uni-input" v-model="housingdurableInfo.spd_content" :data="selectdata.spd_content"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费品总价(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="housingdurableInfo.spd_amount"
										@blur="comparaSize('housingdurableInfo')"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入消费品总价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">贷款成数(%)</view>
									<input v-model="housingdurableInfo.loan_percent" disabled type="text" class="uni-input" value="" placeholder="请输入贷款成数" />
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">销售单位</view>
									<input
										:disabled="isQueryDetail"
										v-model="housingdurableInfo.market_unit"
										type="text"
										class="uni-input"
										value=""
										:placeholder="'请输入销售单位'"
									/>
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">耐用品名称</view>
									<input :disabled="isQueryDetail" v-model="housingdurableInfo.durable_name" type="text" class="uni-input" value="" :placeholder="'耐用品名称'" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'housingdurableInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="留学保证金" nid="cplxbzj" v-if="paramsAll.prd_code == '022021'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费内容</view>
									<mc-pop-select
										:disabled="isQueryDetail"
										class="uni-input"
										v-model="countrymoneyInfo.spd_content"
										:data="selectdata.spd_content"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title">留学国家</view>
									<input :disabled="isQueryDetail" v-model="countrymoneyInfo.country" type="text" class="uni-input" value="" placeholder="请输入留学国家" />
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title">所需资金证明金额(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="countrymoneyInfo.country_money"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入所需资金证明金额"
									/>
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'countrymoneyInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="留学" nid="cplx" v-if="paramsAll.prd_code == '022019'">
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费内容</view>
									<mc-pop-select :disabled="true" class="uni-input" v-model="countryInfo.spd_content" :data="selectdata.spd_content"></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费品总价(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="countryInfo.spd_amount"
										@blur="comparaSize('countryInfo')"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入消费品总价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title requireIcon">贷款成数(%)</view>
									<input v-model="countryInfo.loan_percent" disabled type="text" class="uni-input" value="" placeholder="请输入贷款成数" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'countryInfo')">保存</button>
						</view>
					</swiper-item>
					<swiper-item
						:label="paramsAll.prd_code == '022020' ? '其他' : '综合消费额'"
						nid="cpqtzh"
						v-if="paramsAll.prd_code == '022020' || paramsAll.prd_code == '022016'"
					>
						<view class="w100">
							<view class="mianRadius mcform">
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费内容</view>
									<mc-pop-select
										:disabled="paramsAll.prd_code == '022020' ? true : false || isQueryDetail"
										class="uni-input"
										v-model="otherandCountInfo.spd_content"
										:data="selectdata.spd_content"
									></mc-pop-select>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">消费品总价(元)</view>
									<input
										:disabled="isQueryDetail"
										v-model="otherandCountInfo.spd_amount"
										@blur="comparaSize('otherandCountInfo')"
										type="number"
										class="uni-input"
										value=""
										placeholder="请输入消费品总价"
									/>
								</view>
								<view class="uni-form-item uni-column onerow nopb bottomGap">
									<view class="title requireIcon">贷款成数(%)</view>
									<input v-model="otherandCountInfo.loan_percent" disabled type="text" class="uni-input" value="" placeholder="请输入贷款成数" />
								</view>
								<view class="uni-form-item uni-column onerow lastRow">
									<view class="title">销售单位</view>
									<input :disabled="isQueryDetail" v-model="otherandCountInfo.market_unit" type="text" class="uni-input" value="" placeholder="请输入销售单位" />
								</view>
							</view>
							<button :disabled="isQueryDetail" type="" class="mc-btn-primary" @click="infoSubmit(true, 'otherandCountInfo')">保存</button>
						</view>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="还款计划" nid="hkjh">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('hkjh') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="btnwrap">
							<!-- 还款方式为[分期归还法]才可录入还款信息 -->
							<button
								class="mc-min-btn-primary"
								:disabled="isQueryDetail || rateInfo.repayment_mode != '203'"
								@click="
									toLink(
										'/pages/loanApplication/addInfo/addInfo?isAdd=true&type=repay&serno=' +
											currentserno +
											'&repayend=' +
											applyInfo.end_date +
											'&apply_amount' +
											applyInfo.apply_amount
									)
								"
							>
								新增
							</button>
							<button type="" class="mc-min-btn-primary haveBg" @click="queryrepayInfoList(true)">查询</button>
						</view>

						<view v-if="!repayList.length" class="emptyData">{{ repayListEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
						<scroll-view v-if="repayList.length" class="scroll-Y listbox wrapScroll" :lower-threshold="10" scroll-y="true" @scrolltolower="loadList('repayList')">
							<view class="listWrap bottomGap" v-for="(item, index) in repayList" :key="index">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">还款计划流水号</span>
										<span class="mccontent">{{ item.pk_value ? item.pk_value : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">还款金额</span>
										<span class="mccontent">{{ item.repay_amt ? item.repay_amt : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">还款日期</span>
										<span class="mccontent">{{ item.repay_date ? item.repay_date : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delrepayList(item, item.pk_value, 'repayList', index)">删除</button>
									<button
										v-if="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="
											toLink(
												'/pages/loanApplication/addInfo/addInfo?isDetail=true&type=repay&index=' +
													index +
													'&pk_value=' +
													item.pk_value +
													'&serno=' +
													currentserno
											)
										"
									>
										详情
									</button>
									<button
										:disabled="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="
											toLink(
												'/pages/loanApplication/addInfo/addInfo?isChange=true&type=repay&index=' +
													index +
													'&serno=' +
													currentserno +
													'&pk_value=' +
													item.pk_value +
													'&repayend=' +
													applyInfo.end_date +
													'&apply_amount' +
													applyInfo.apply_amount
											)
										"
									>
										修改
									</button>
								</view>
							</view>
							<view class="emptyData loadingData">{{ repayListEnd ? '没有更多数据了!' : '加载更多' }}</view>
						</scroll-view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="共同债务人" nid="gtzwr">
				<view class="w100 hasData" v-if="currentTabIndexMainShow.indexOf('gtzwr') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="btnwrap">
							<button
								:disabled="isQueryDetail"
								class="mc-min-btn-primary"
								@click="toLink('/pages/loanApplication/addInfo/addInfo?isAdd=true&type=1&serno=' + currentserno, true)"
							>
								新增
							</button>
							<button type="" class="mc-min-btn-primary haveBg" @click="queryOtherInfoList('1', 'debtor_list', true)">查询</button>
						</view>
						<view v-if="!debtor_list.length" class="emptyData">{{ debtor_listEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
						<scroll-view v-if="debtor_list.length" class="scroll-Y listbox wrapScroll" :lower-threshold="10" scroll-y="true" @scrolltolower="loadList('debtor_list')">
							<view class="listWrap bottomGap" v-for="(item, index) in debtor_list" :key="index">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">客户名称</span>
											<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">客户号</span>
											<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
										</view>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">证件类型</span>
										<span class="mccontent">{{ item.cert_type ? getValuename(item.cert_type, 'cert_type1') : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">证件号码</span>
										<span class="mccontent">{{ item.cert_code ? item.cert_code : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delAssList(item, '1', 'debtor_list', index)">删除</button>
									<!-- <button
										v-if="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isDetail=true&type=1&serno=' + currentserno + '&index=' + index)"
									>
										详情
									</button> -->
									<button disabled class="mc-min-btn-primary" style="opacity: 0;"></button>
									<!-- <button
										:disabled="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=1&serno=' + currentserno + '&index=' + index)"
									>
										修改
									</button> -->
								</view>
							</view>
							<view class="emptyData loadingData">{{ debtor_listEnd ? '没有更多数据了!' : '加载更多' }}</view>
						</scroll-view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="担保信息" nid="dbxx">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('dbxx') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="btnwrap">
							<button
								:disabled="isQueryDetail"
								class="mc-min-btn-primary"
								@click="toLink('/pages/loanApplication/addInfo/addInfo?isAdd=true&type=2&serno=' + currentserno, true)"
							>
								新增
							</button>
							<button type="" class="mc-min-btn-primary haveBg" @click="queryOtherInfoList('2', 'guaranty_list', true)">查询</button>
						</view>
						<view v-if="!guaranty_list.length" class="emptyData">{{ guaranty_listEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
						<scroll-view
							v-if="guaranty_list.length"
							class="scroll-Y listbox wrapScroll"
							:lower-threshold="10"
							scroll-y="true"
							@scrolltolower="loadList('guaranty_list')"
						>
							<view class="listWrap bottomGap" v-for="(item, index) in guaranty_list" :key="index">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">保证人编号</span>
										<span class="mccontent">{{ item.guaranty_id ? item.guaranty_id : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">保证人名称</span>
										<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">担保金额</span>
										<span class="mccontent">{{ item.amount ? item.amount : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delAssList(item, '2', 'guaranty_list', index)">删除</button>
									<button
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isDetail=true&type=2&serno=' + currentserno + '&index=' + index)"
									>
										详情
									</button>
									<button
										:disabled="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=2&serno=' + currentserno + '&index=' + index)"
									>
										修改
									</button>
								</view>
							</view>
							<view class="emptyData loadingData">{{ guaranty_listEnd ? '没有更多数据了!' : '加载更多' }}</view>
						</scroll-view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="存量业务" nid="clyw">
				<view class="w100 stock" v-if="currentTabIndexMainShow.indexOf('clyw') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="infoTipTitle">客户存量台账</view>
						<view class="listbox" style="padding-bottom: 30rpx;">
							<view class="listWrap">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">贷款余额</span>
											<span class="mccontent">0.00</span>
										</view>
										<view>
											<span class="mclabel">欠息累计</span>
											<span class="mccontent">0.00</span>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="infoTipTitle">贷款台账列表</view>
						<view v-if="!stock_list.length" class="emptyData">暂无数据</view>
						<view v-if="stock_list.length" class="listbox wrapScroll">
							<view class="listWrap bottomGap" v-for="(item, index) in stock_list" :key="index">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">借据编号</span>
										<span class="mccontent">{{ item.bill_no ? item.bill_no : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">合同编号</span>
										<span class="mccontent">{{ item.cont_no ? item.cont_no : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">起贷日期</span>
											<span class="mccontent">{{ item.loan_start_date ? item.loan_start_date : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">止贷日期</span>
											<span class="mccontent">{{ item.loan_end_date ? item.loan_end_date : '-' }}</span>
										</view>
									</view>
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">贷款金额</span>
											<span class="mccontent">{{ item.loan_amount ? item.loan_amount : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">贷款余额</span>
											<span class="mccontent">{{ item.balance ? item.balance : '-' }}</span>
										</view>
									</view>
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">欠息金额</span>
											<span class="mccontent">{{ item.delay_int_cumu ? item.delay_int_cumu : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">台账状态</span>
											<span class="mccontent">{{ item.account_status ? getValuename(item.account_status, 'account_status') : '-' }}</span>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="经营实体" nid="jyst">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('jyst') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view class="btnwrap">
							<button
								:disabled="isQueryDetail"
								class="mc-min-btn-primary"
								@click="toLink('/pages/loanApplication/addInfo/addInfo?isAdd=true&type=5&serno=' + currentserno)"
							>
								新增
							</button>
							<button type="" class="mc-min-btn-primary haveBg" @click="queryOtherInfoList('5', 'buss_list', true)">查询</button>
						</view>
						<view v-if="!buss_list.length" class="emptyData">{{ buss_listEnd ? '暂无数据' : '请点击查询获取数据' }}</view>
						<scroll-view v-if="buss_list.length" class="scroll-Y listbox wrapScroll" :lower-threshold="10" scroll-y="true" @scrolltolower="loadList('buss_list')">
							<view class="listWrap bottomGap" v-for="(item, index) in buss_list" :key="index">
								<view class="mcitems familyList">
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
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">证件类型</span>
										<span class="mccontent">{{ item.cert_type ? getValuename(item.cert_type, 'public_cert_type') : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">证件号码</span>
										<span class="mccontent">{{ item.cert_code ? item.cert_code : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button :disabled="isQueryDetail" class="mc-min-btn-waring" @click="delAssList(item, '5', 'buss_list', index)">删除</button>
									<!-- <button
										v-if="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isDetail=true&type=5&serno=' + currentserno + '&index=' + index)"
									>
										详情
									</button> -->
									<button disabled class="mc-min-btn-primary" style="opacity: 0;"></button>
									<!-- <button
										:disabled="isQueryDetail"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=5&serno=' + currentserno + '&index=' + index)"
									>
										修改
									</button> -->
								</view>
							</view>
							<view class="emptyData loadingData">{{ buss_listEnd ? '没有更多数据了!' : '加载更多' }}</view>
						</scroll-view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="征信记录" nid="zxjl">
				<view class="w100 stock" v-if="currentTabIndexMainShow.indexOf('zxjl') != -1">
					<view class="mianRadius mcform wrapScroll">
						<view v-if="!credit_inspect.length" class="emptyData">暂无数据</view>
						<view v-if="credit_inspect.length" class="listbox wrapScroll">
							<view class="listWrap bottomGap" v-for="(item, index) in credit_inspect" :key="index">
								<view class="mcitems familyList">
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">客户名称</span>
											<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">客户角色</span>
											<span class="mccontent">{{ item.cus_type ? getValuename(item.cus_type, 'cust_type_role') : '-' }}</span>
										</view>
									</view>
									<view class="mcitem resver mcrowOne mcrowItemcanwrap">
										<view>
											<span class="mclabel">证件类型</span>
											<span class="mccontent">{{ item.cert_type ? getValuename(item.cert_type, 'cert_type_all') : '-' }}</span>
										</view>
										<view>
											<span class="mclabel">客户号</span>
											<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
										</view>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">证件号码</span>
										<span class="mccontent">{{ item.cert_code ? item.cert_code : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">查询状态</span>
										<span class="mccontent">{{ item.result_msg ? item.result_msg : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">查询日期</span>
										<span class="mccontent">{{ item.query_date ? item.query_date : '-' }}</span>
									</view>
									<view class="mcitem resver mcrowOne">
										<span class="mclabel">绑定流水号</span>
										<span class="mccontent">{{ item.serial_number ? item.serial_number : '-' }}</span>
									</view>
								</view>
								<view class="inline-btn inline-btn-right">
									<button
										:disabled="isQueryDetail || item.serial_number != ''"
										type=""
										class="mc-min-btn-primary"
										@click="toLink('/pages/loanApplication/addInfo/addInfo?isChange=true&type=inspect&serno=' + currentserno + '&index=' + index)"
									>
										绑定
									</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item label="登记材料" nid="djcl">
				<tabbars
					class="tabstwo"
					v-if="currentTabIndexMainShow.indexOf('djcl') != -1"
					tposition="top"
					:titleBottomLine="true"
					:swduration="120"
					style="height: 100%;"
					ref="tabstwodj"
					@getCurrent="currentTabIndexSubCl = $event"
				>
					<swiper-item label="基本资料" nid="djjbzl">
						<view class="w100 pdfprealtive">
							<button
								class="pdfpabsolute"
								type="default"
								v-if="!isQueryDetail"
								@click="
									topdfPage(
										'/pages/loanApplication/imageToPdf?id=' +
											checkItem[0].id +
											'&serno=' +
											currentserno +
											'&date=' +
											(isChange || isQueryDetail ? apply_date : paramsAll.apply_date),
										0
									)
								"
							></button>
							<mc-image
								class="mianRadius"
								@getImageData="checkItem[0].currentImageList = $event"
								:ownData="{
									type: checkItem[0].id,
									serno: currentserno,
									date: isChange || isQueryDetail ? apply_date : paramsAll.apply_date,
									pvalue: currentserno + 'jb'
								}"
								:rename="true"
								:canSelect="true"
								:echoCanDel="true"
								:countMax="checkItem[0].max"
								:uploaderTitle="checkItem[0].tip"
								:requireClass="'requireIcon'"
								:echoImgList="checkItem[0].echoImgList"
								:imageListArr="checkItem[0].currentImageList"
								:canAddImg="isQueryDetail ? false : true"
								:isChangeAdd="isChange"
							></mc-image>
							<button :disabled="isQueryDetail" style="margin-top: 40rpx;" type="" class="mc-btn-primary" @click="canUploadimage(true, 0)">保存</button>
						</view>
					</swiper-item>
					<swiper-item label="其他资料" v-if="paramsAll.prd_code != '022022'" nid="djqtzl">
						<view class="w100 pdfprealtive">
							<button
								class="pdfpabsolute"
								type="default"
								v-if="!isQueryDetail"
								@click="
									topdfPage(
										'/pages/loanApplication/imageToPdf?id=' +
											checkItem[1].id +
											'&serno=' +
											currentserno +
											'&date=' +
											(isChange || isQueryDetail ? apply_date : paramsAll.apply_date),

										1
									)
								"
							></button>
							<mc-image
								class="mianRadius"
								@getImageData="checkItem[1].currentImageList = $event"
								:ownData="{
									type: checkItem[1].id,
									serno: currentserno,
									date: isChange || isQueryDetail ? apply_date : paramsAll.apply_date,
									pvalue: currentserno + 'qt'
								}"
								:rename="true"
								:canSelect="true"
								:echoCanDel="true"
								:countMax="checkItem[1].max"
								:uploaderTitle="checkItem[1].tip"
								:requireClass="'requireIcon'"
								:echoImgList="checkItem[1].echoImgList"
								:imageListArr="checkItem[1].currentImageList"
								:canAddImg="isQueryDetail ? false : true"
								:isChangeAdd="isChange"
							></mc-image>
							<button :disabled="isQueryDetail" style="margin-top: 40rpx;" type="" class="mc-btn-primary" @click="canUploadimage(true, 1)">保存</button>
						</view>
					</swiper-item>
				</tabbars>
			</swiper-item>
			<swiper-item label="评分结果" nid="pfjg">
				<view class="w100" v-if="currentTabIndexMainShow.indexOf('pfjg') != -1">
					<view class="mianRadius mcform">
						<view class style="text-align: center;margin-bottom: 40rpx;">
							<button type="" :disabled="isQueryDetail" class="mc-min-btn-primary" @click="launchRating">评分发起</button>
						</view>
						<view v-if="!canShowRate" class="emptyData">温馨提示:本产品只需进行评分发起不展示评分结果!</view>
						<block v-if="canShowRate">
							<view class="infoTipTitle">评分结果</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap topGap">
								<view class="title">客户评级编号</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_cus_no ? rating_data.ccr_cus_no : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">模型名称</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_modelname ? rating_data.ccr_modelname : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">评级得分</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_score ? rating_data.ccr_score : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">评分策略结论</view>
								<input type="text" class="uni-input" :value="getValuename(rating_data.ccr_scoreresult, 'ccr_scoreresult')" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">最终策略结论</view>
								<input type="text" class="uni-input" :value="getValuename(rating_data.ccr_lastresult, 'ccr_lastresult')" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">建议额度</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_adviceamt ? rating_data.ccr_adviceamt : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">额度提示信息</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_adviceinfo ? rating_data.ccr_adviceinfo : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">决策方式</view>
								<input type="text" class="uni-input" :value="getValuename(rating_data.ccr_advicetype, 'ccr_advicetype')" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">实施方式</view>
								<input type="text" class="uni-input" :value="getValuename(rating_data.ccr_doworktype, 'ccr_doworktype')" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">最低上浮比例建议(%)</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_upminrate ? rating_data.ccr_upminrate : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">评分时间</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_score_date ? rating_data.ccr_score_date : '-'" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">评分结果状态</view>
								<input type="text" class="uni-input" :value="getValuename(rating_data.ccr_score_status, 'ccr_score_status')" />
							</view>
							<view class="uni-form-item uni-column onerow nopb bottomGap">
								<view class="title">评价结果状态产生时间</view>
								<input type="text" class="uni-input" :value="rating_data.ccr_score_stdate ? rating_data.ccr_score_stdate : '-'" />
							</view>
						</block>
					</view>
				</view>
			</swiper-item>
		</tabbars>
	</view>
</template>

<script>
import { selectdata } from './select.js';
import { selectdata as selectdatacustomerMg } from '../customerMg/select.js';
import { requestParams } from './requestParams.js';
import { Camera } from '@/common/Mobile/MobileUtils.js';
export default {
	data() {
		return {
			selectdata: selectdata,
			selectdatacustomerMg: selectdatacustomerMg,
			currentTabIndexMain: 0, //一级tab的id
			currentTabIndexSub: 0, //二级tab的id
			currentTabIndexSubCp: 0, //二级tab的id
			currentTabIndexSubCl: 0, //登记材料-id
			currentTabIndexMainShow: ['dkjbxx'], // 已展示的tabs
			currentTabIndexSubShow: ['dksqxx'],
			accountInfo: {},
			isChange: false,
			isAdd: false,
			isQueryDetail: false,
			originparamsAll: {},
			paramsAll: JSON.parse(JSON.stringify(requestParams.paramsAll)), // 所有数据
			applyInfo: JSON.parse(JSON.stringify(requestParams.applyInfo)), // 申请信息
			applyInfoRequired: JSON.parse(JSON.stringify(requestParams.applyInfoRequired)),
			bussclassInfo: JSON.parse(JSON.stringify(requestParams.bussclassInfo)), // 业务分类
			bussclassInfoRequired: JSON.parse(JSON.stringify(requestParams.bussclassInfoRequired)),
			assuremeansInfo: JSON.parse(JSON.stringify(requestParams.assuremeansInfo)), // 担保方式
			assuremeansInfoRequired: JSON.parse(JSON.stringify(requestParams.assuremeansInfoRequired)),
			rateInfo: JSON.parse(JSON.stringify(requestParams.rateInfo)), // 利率信息
			rateInfoRequired: JSON.parse(JSON.stringify(requestParams.rateInfoRequired)),
			directionInfo: JSON.parse(JSON.stringify(requestParams.directionInfo)), // 投向信息
			directionInfoRequired: JSON.parse(JSON.stringify(requestParams.directionInfoRequired)),
			copartnerindInfo: JSON.parse(JSON.stringify(requestParams.copartnerindInfo)), // 合作方信息
			copartnerindInfoRequired: JSON.parse(JSON.stringify(requestParams.copartnerindInfoRequired)),
			paymentInfo: JSON.parse(JSON.stringify(requestParams.paymentInfo)), // 支付信息
			paymentInfoRequired: JSON.parse(JSON.stringify(requestParams.paymentInfoRequired)),
			invstconclInfo: JSON.parse(JSON.stringify(requestParams.invstconclInfo)), // 意见信息
			invstconclInfoRequired: JSON.parse(JSON.stringify(requestParams.invstconclInfoRequired)),
			organizationInfo: JSON.parse(JSON.stringify(requestParams.organizationInfo)), // 机构信息
			organizationInfoRequired: JSON.parse(JSON.stringify(requestParams.organizationInfoRequired)),
			personoptInfo: JSON.parse(JSON.stringify(requestParams.personoptInfo)), // 个人经营信息
			personoptInfoRequired: JSON.parse(JSON.stringify(requestParams.personoptInfoRequired)),
			personvchInfo: JSON.parse(JSON.stringify(requestParams.personvchInfo)), // 汽车
			personvchInfoRequired: JSON.parse(JSON.stringify(requestParams.personvchInfoRequired)),
			housesInfo: JSON.parse(JSON.stringify(requestParams.housesInfo)), // 住房
			housesInfoRequired: JSON.parse(JSON.stringify(requestParams.housesInfoRequired)),
			housingFitmentInfo: JSON.parse(JSON.stringify(requestParams.housingFitmentInfo)), // 住房装修
			housingFitmentInfoRequired: JSON.parse(JSON.stringify(requestParams.housingFitmentInfoRequired)),
			housingdurableInfo: JSON.parse(JSON.stringify(requestParams.housingdurableInfo)), // 耐用品
			housingdurableInfoRequired: JSON.parse(JSON.stringify(requestParams.housingdurableInfoRequired)),
			countrymoneyInfo: JSON.parse(JSON.stringify(requestParams.countrymoneyInfo)), // 留学保证金
			countrymoneyInfoRequired: JSON.parse(JSON.stringify(requestParams.countrymoneyInfoRequired)),
			countryInfo: JSON.parse(JSON.stringify(requestParams.countryInfo)), // 留学
			countryInfoRequired: JSON.parse(JSON.stringify(requestParams.countryInfoRequired)),
			otherandCountInfo: JSON.parse(JSON.stringify(requestParams.otherandCountInfo)), // 综合消费
			otherandCountInfoRequired: JSON.parse(JSON.stringify(requestParams.otherandCountInfoRequired)),
			ord_pro_categoryname: '', // 业务品种名字存储
			selectdatair_adjust_mode: selectdata.ir_adjust_mode,
			selectdatainterest_acc_mode: selectdata.interest_acc_mode,
			procategory: {
				pledge: '', //抵质押类
				pledgename: '', //抵质押类
				pledgeArr: [], //抵质押类
				TransactionClass: '', // 交易类：
				TransactionClassname: '', // 交易类：
				TransactionClassArr: [], // 交易类：
				fixed_assets: '', //固定资产类
				fixed_assetsname: '', //固定资产类
				fixed_assetsArr: [], //固定资产类
				policy: '', //政策类
				policyname: '', //政策类
				policyArr: [], //政策类
				insurance: '', //保险类
				insurancename: '', //保险类
				insuranceArr: [], //保险类
				other_features: '', //其他特色类
				other_featuresname: '', //其他特色类
				other_featuresArr: [] //其他特色类
			},
			discountList: [], //贴息信息
			discountListEnd: false,
			discountListstart: '1', //贴息信息开始记录数
			discountListcount: '10', //贴息信息查询条数
			otherstart: '1', //附加信息开始记录数
			othercount: '10', //附加信息查询条数
			repayListstart: '1', //还款计划信息开始记录数
			repayListcount: '10', //还款计划查询条数
			repayListEnd: false, //数据结束
			repayList: requestParams.basicRepayList.length ? requestParams.basicRepayList : [],
			currentserno: '',
			copartner_liststart: '1', //合作方列表信息开始记录数
			copartner_listcount: '10', //合作方列表查询条数
			copartner_listEnd: false, //数据结束
			copartner_list: requestParams.basiccopartner_list.length ? requestParams.basiccopartner_list : [], //合作方列表
			payment_liststart: '1', //支付信息列表信息开始记录数
			payment_listcount: '10', //支付信息列表查询条数
			payment_listEnd: false, //数据结束
			payment_list: requestParams.basicpayment_list.length ? requestParams.basicpayment_list : [], //支付信息列表
			debtor_liststart: '1', //共债人列表信息开始记录数
			debtor_listcount: '10', //共债人列表查询条数
			debtor_listEnd: false, //数据结束
			debtor_list: requestParams.basicdebtor_list.length ? requestParams.basicdebtor_list : [], //共债人列表
			guaranty_liststart: '1', //担保人列表信息开始记录数
			guaranty_listcount: '10', //担保人列表查询条数
			guaranty_listEnd: false, //数据结束
			guaranty_list: requestParams.basicguaranty_list.length ? requestParams.basicguaranty_list : [], // 担保人列表
			stock_list: [], // 存量业务列表
			buss_liststart: '1', //经营实体列表信息开始记录数
			buss_listcount: '10', //经营实体列表查询条数
			buss_listEnd: false, //数据结束
			buss_list: requestParams.basicbuss_list.length ? requestParams.basicbuss_list : [], //经营实体列表
			credit_inspect: requestParams.basicCreditInspectResult.length ? requestParams.basicCreditInspectResult : [], //征信结果列表
			rating_data: {}, // 评级结果
			manger1Name: '', //营销人姓名
			manger2Name: '', //客户经理姓名
			saved: false, //是否保存过
			apply_date: '', //修改时传入的申请日期，用于影像查看
			checkItem: [
				// 经营性贷款现场核查需收集的照片数据
				{
					label: '基本资料',
					id: '010302',
					requird: true,
					tip: '基本资料',
					max: 0,
					echoImgList: [],
					currentImageList: []
				},
				{
					label: '其他资料',
					id: '010304',
					requird: true,
					tip: '其他资料',
					max: 0,
					echoImgList: [],
					currentImageList: []
				}
			],
			originCheckItem: [], // 存储查回来的图片数据
			listtoEndTimes: 0, //触底事件触发次数
			onBeforeSwitch: true, // 是否可以切换的标志
			getIsorigin: false, //是否是不允许切换返回的标志
			rateInforeality_ir_m: 0 //存下执行年利率未保留小数的值
		};
	},
	onShow() {
		console.log('this.$store.state.managerSelect', this.$store.state.managerSelect);
		console.log('this.$store.state.managerSelect', this.currentTabIndexMain);
		if (this.$store.state.managerSelect.market_id) {
			if (this.$store.state.managerSelect.type == 1) {
				this.organizationInfo.investigator_id = this.$store.state.managerSelect.market_id;
				this.manger1Name = this.$store.state.managerSelect.actorname;
			} else if (this.$store.state.managerSelect.type == 2) {
				this.organizationInfo.examinant_id = this.$store.state.managerSelect.market_id;
				this.manger2Name = this.$store.state.managerSelect.actorname;
			}
		}
		//新增回来刷新数据
		if (this.$store.state.basicInfos.type) {
			if (this.$store.state.basicInfos.type == 4) {
				this.queryOtherInfoList('4', 'copartner_list', true);
			} else if (this.$store.state.basicInfos.type == 3) {
				this.queryOtherInfoList('3', 'payment_list', true);
			} else if (this.$store.state.basicInfos.type == 2) {
				this.queryOtherInfoList('2', 'guaranty_list', true);
			} else if (this.$store.state.basicInfos.type == 1) {
				this.queryOtherInfoList('1', 'debtor_list', true);
			} else if (this.$store.state.basicInfos.type == 5) {
				this.queryOtherInfoList('5', 'buss_list', true);
			} else if (this.$store.state.basicInfos.type == 'repay') {
				this.queryrepayInfoList(true);
			}
		}
		if (this.$store.state.isbindSendSuccess) {
			this.creditInspectQuery();
			this.$store.commit('delisbindSendSuccess');
		}
		var _this = this;
		uni.getStorage({
			key: 'pdfBack',
			success: function(res) {
				if (res.data) {
					if ((res.data.back = true)) {
						if (_this.isAdd) {
							_this.apply_date = res.data.date;
						}
						_this.toQueryImageData(true,true);
						_this.$forceUpdate();
					}
				}
			}
		});
		this.$forceUpdate();
	},
	onLoad: function(option) {
		this.isAdd = option.isAdd ? JSON.parse(option.isAdd) : false;
		this.isChange = option.isChange ? JSON.parse(option.isChange) : false;
		this.isQueryDetail = option.isQueryDetail ? JSON.parse(option.isQueryDetail) : false;
		this.currentserno = option.serno ? option.serno : '';
		this.apply_date = option.apply_date ? option.apply_date : '';
	},
	onBackPress() {},
	beforeDestroy() {
		this.$store.commit('delbasicInfos');
	},
	onNavigationBarButtonTap(e) {
		var canuploadImg = false;
		if (this.isAdd) {
			if (this.checkItem[0].currentImageList.length != 0 || this.checkItem[1].currentImageList.length != 0) {
				canuploadImg = true;
			}
		} else if (this.isChange) {
			// 原始数据被删除或者新增了数据，进行保存
			if (
				this.originCheckItem[0].echoImgList.length != this.checkItem[0].echoImgList.length ||
				this.checkItem[0].currentImageList.length != 0 ||
				(this.originCheckItem[1].echoImgList.length != this.checkItem[1].echoImgList.length || this.checkItem[1].currentImageList.length != 0)
			) {
				canuploadImg = true;
			}
		}
		this.infoSubmit(false, '', false, canuploadImg);
	},
	computed: {
		loanstartdateShow() {
			// 能源类型的显示隐藏
			var item = { name: 'loan_start_date', checkType: 'notnull', errorMsg: '请选择能源类型', valid: false };
			var index = this.arrHasObj(this.applyInfoRequired, item);
			if ((this.paramsAll.prd_code == '022022' && this.paramsAll.biz_type_sub == '022242') || this.paramsAll.prd_code == '022010') {
				this.applyInfoRequired[index].valid = true;
				return true;
			}
			this.applyInfoRequired[index].valid = false;
			return false;
		},
		loanrecordflagShow() {
			// 征信贷款显示隐藏
			var itemarr = [
				{ name: 'loan_record_int_flag', checkType: 'notnull', errorMsg: '人行征信系统查询后该户有无贷款记录', valid: false },
				{ name: 'is_epidemic', checkType: 'notnull', errorMsg: '请选择是否防疫贷', valid: false },
				{ name: 'is_agricult', checkType: 'notnull', errorMsg: '请选择是否农易贷', valid: false },
				{ name: 'is_multiplex', checkType: 'notnull', errorMsg: '请选择是否复工贷', valid: false }
			];
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				if (this.isChange || this.isQueryDetail) {
				} else {
					this.applyInfo[itemarr[i].name] = '';
				}

				indexArr.push(this.arrHasObj(this.applyInfoRequired, itemarr[i]));
				if (itemarr[i].replace === true) {
					itemarr[i].valid = false;
					this.applyInfoRequired[indexArr[i]] = itemarr[i];
				}
			}
			if (this.paramsAll.prd_code == '022022') {
				for (var i = 0; i < indexArr.length; i++) {
					this.applyInfoRequired[indexArr[i]].valid = true;
				}
				return true;
			}
			for (var i = 0; i < indexArr.length; i++) {
				this.applyInfoRequired[indexArr[i]].valid = false;
			}
			return false;
		},
		intradjstrtdt1() {
			//利率调整起始日期显示隐藏
			var item = { name: 'intr_adj_strt_dt1', checkType: 'notnull', errorMsg: '请选择利率调整起始日期', valid: false };
			var index = this.arrHasObj(this.rateInfoRequired, item);
			// 利率调整模式选择12、利率调整方式为5时必输
			if (this.rateInfo.ir_adjust_mode == '5' && this.rateInfo.rate_exe_model == '12') {
				this.rateInfoRequired[index].valid = true;
				if (this.isChange || this.isQueryDetail) {
				} else {
					this.rateInfo.intr_adj_strt_dt1 = '';
				}
				return true;
			}
			if (this.isChange || this.isQueryDetail) {
			} else {
				this.rateInfo.intr_adj_strt_dt1 = '';
			}
			this.rateInfoRequired[index].valid = false;
			return false;
		},
		ir_adjust_days() {
			var item = { name: 'ir_adjust_days', checkType: 'intNot0', errorMsg: '请输入定期周期(月)', valid: false };
			var index = this.arrHasObj(this.rateInfoRequired, item);
			// 利率调整模式选择12、利率调整方式为2、4、5时必输
			if (this.rateInfo.rate_exe_model == '12' && (this.rateInfo.ir_adjust_mode == '2' || this.rateInfo.ir_adjust_mode == '4' || this.rateInfo.ir_adjust_mode == '5')) {
				this.rateInfoRequired[index].valid = true;
				if (this.isChange || this.isQueryDetail) {
				} else {
					this.rateInfo.ir_adjust_days = '';
				}
				return true;
			}
			if (this.isChange || this.isQueryDetail) {
			} else {
				this.rateInfo.ir_adjust_days = '';
			}
			this.rateInfoRequired[index].valid = false;
			return false;
		},
		canShowRate() {
			if (this.paramsAll.prd_code == '022016' || this.paramsAll.prd_code == '022007' || this.paramsAll.prd_code == '022009') {
				return false;
			} else {
				return true;
			}
		}
	},
	mounted() {
		if (this.isQueryDetail == true) {
			// 隐藏提交按钮
			var rightbtn = document.querySelector('body.pages-loanApplication-loanApplication uni-page-head .uni-page-head-ft');
			rightbtn.style.display = 'none';
		}
		requestParams.basiccopartner_list = [];
		requestParams.basicpayment_list = [];
		requestParams.basicguaranty_list = [];
		requestParams.basicdebtor_list = [];
		requestParams.basicbuss_list = [];
		requestParams.basicrepayList = [];
		requestParams.basicCreditInspectResult = [];
		this.copartner_list = [];
		this.payment_list = [];
		this.guaranty_list = [];
		this.debtor_list = [];
		this.buss_list = [];
		this.repayList = [];
		this.credit_inspect = [];
		this.$forceUpdate();
		//清除选择的客户号
		this.$store.commit('delmanagerSelect');
		this.$nextTick(() => {
			this.$refs.tabs.$refs.tabs6[0].$el.style.display = 'none';
		});

		this.accountInfo = this.$store.state.accountInfos;
		// store中applicationInfo有值
		if (this.$store.state.applicationInfo.prd_code && this.isAdd) {
			if (this.$store.state.applicationInfo.prd_code == '022016' && this.$store.state.applicationInfo.biz_type_sub == '022204') {
				console.log('res', this.$refs.tabs);
				this.$nextTick(() => {
					this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'none';
				});
			}
			for (let appKey in this.$store.state.applicationInfo) {
				if (this.paramsAll.hasOwnProperty(appKey) && appKey != 'idInfo') {
					this.paramsAll[appKey] = this.$store.state.applicationInfo[appKey].toString();
				}
			}
			this.applyInfo.cus_name = this.paramsAll.cus_name;
			this.applyInfo.bal_loan_sub_prd = this.paramsAll.bal_loan_sub_prd;
			this.paramsAll.AppFlag = '0';
			this.paramsAll.SaveFlag = '0';
			this.paramsAll.apply_date = new Date().Format('yyyy-MM-dd');
			this.organizationInfo.input_date = new Date().Format('yyyy-MM-dd');
			this.$forceUpdate();
			(this.paramsAll.input_id = this.accountInfo.actorno), //受理客户经理   用户码
				(this.paramsAll.input_br_id = this.accountInfo.orgid), //	受理机构  机构码
				this.$request
					.post({
						url: 'es/json/EsBussiApplication',
						data: this.paramsAll
					})
					.then(res => {
						console.log('提交结果', res);
						if (res.response.header.returnCode == '00000000') {
							this.saved = true;
							this.applyInfo.cus_name = this.paramsAll.cus_name;
							this.$store.commit('delapplicationInfo');
							this.currentserno = res.response.content.serno;
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 1500
							});
							this.$forceUpdate();
						} else {
							uni.showToast({
								title: res.response.header.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
		}
		// if(this.$store.state.addPdfContentId && this.isAdd){

		// }
		if (this.isChange || this.isQueryDetail) {
			this.queryData();
			this.toQueryImageData();
		}
	},
	methods: {
		toLink(pageurl, dbzw) {
			if (dbzw) {
				this.$store.commit('delcustmorSelect');
			}
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
		async infoSubmit(save, tab, isTabS = false, canuploadImg = false) {
			if (this.isQueryDetail) {
				return;
			}
			this.onBeforeSwitch = true;
			// 增加必填项-利率定价类型  期限时间类型  申请期限
			var formData1 = this.applyInfo;
			var rule1 = [];
			for (var i = 0; i < this.applyInfoRequired.length; i++) {
				if (this.applyInfoRequired[i].save) {
					rule1.push(this.applyInfoRequired[i]);
				}
			}
			var checkRes1 = this.$graceChecker.check(formData1, rule1);
			if (!checkRes1) {
				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
				this.onBeforeSwitch = false;
				return;
			}
			var apptime = this.applyInfoapplyterm();
			if (apptime === false) {
				this.onBeforeSwitch = false;
				return;
			}
			if (this.isChange && save) {
				var flag = false;
				for (let ckey in this[tab]) {
					if (this.originparamsAll.hasOwnProperty(ckey)) {
						if (this.originparamsAll[ckey] != this[tab][ckey]) {
							flag = true;
							break;
						}
					} else {
						flag = true;
						break;
					}
				}
				if (!flag) {
					if (isTabS == false) {
						uni.showToast({
							title: '未进行任何修改',
							icon: 'none',
							duration: 1500
						});
						return;
					}
				}
			}
			this.paramsAll.AppFlag = '0';
			this.paramsAll.serno = this.currentserno ? this.currentserno : '';
			this.paramsAll.base_type = '02';
			if (this.isChange || this.saved) {
				this.paramsAll.AppFlag = '1';
			}
			//AppFlag  0新增；1修改
			// SaveFlag 0暂存 1保存
			if (save) {
				this.paramsAll.SaveFlag = '0';
				// 若数据有值验证格式是否正确
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
				this.applyInfo.apply_amount_init = this.applyInfo.apply_amount;
				this.rateInfo.floating_rate_init = this.rateInfo.floating_rate;
				Object.assign(this.paramsAll, this[tab]);
				console.log('ejkejeke', this[tab]);
				console.log('ejkejeke', this.paramsAll);
			} else {
				this.paramsAll.SaveFlag = '1';
				var listss = [
					{ value: 'applyInfo', label: '申请信息' },
					// {value:'bussclassInfo',label:"业务分类"},
					{ value: 'assuremeansInfo', label: '担保方式' },
					{ value: 'rateInfo', label: '利率信息' },
					{ value: 'directionInfo', label: '投向信息' },
					{ value: 'copartnerindInfo', label: '合作方信息' },
					{ value: 'paymentInfo', label: '支付信息' },
					{ value: 'invstconclInfo', label: '意见信息' },
					{ value: 'organizationInfo', label: '机构信息' }
					// { value: 'personoptInfo', label: '个人经营贷款' }
					// { value: 'personvchInfo', label: this.paramsAll.prd_code == '022022' ? '小企业汽车' : '汽车消费' },
					// { value: 'housesInfo', label: this.paramsAll.prd_code == '022007' ? '住房' : '商业房' },
					// { value: 'housingFitmentInfo', label: this.paramsAll.prd_code == '022012' ? '住房装修' : '耐用品' },
					// { value: 'housingdurableInfo', label: this.paramsAll.prd_code == '022012' ? '住房装修' : '耐用品' },
					// { value: 'countrymoneyInfo', label: '留学保证金' },
					// { value: 'countryInfo', label: '留学' },
					// { value: 'otherandCountInfo', label: this.paramsAll.prd_code == '022020' ? '其他' : '综合消费额' }
				];

				if (this.paramsAll.prd_code == '022022' || this.paramsAll.prd_code == '022009') {
					var listss = [
						{ value: 'applyInfo', label: '申请信息' },
						{ value: 'bussclassInfo', label: '业务分类' },
						{ value: 'assuremeansInfo', label: '担保方式' },
						{ value: 'rateInfo', label: '利率信息' },
						{ value: 'directionInfo', label: '投向信息' },
						{ value: 'copartnerindInfo', label: '合作方信息' },
						{ value: 'paymentInfo', label: '支付信息' },
						{ value: 'invstconclInfo', label: '意见信息' },
						{ value: 'organizationInfo', label: '机构信息' }
						// { value: 'personoptInfo', label: '个人经营贷款' }
						// { value: 'personvchInfo', label: this.paramsAll.prd_code == '022022' ? '小企业汽车' : '汽车消费' },
						// { value: 'housesInfo', label: this.paramsAll.prd_code == '022007' ? '住房' : '商业房' },
						// { value: 'housingFitmentInfo', label: this.paramsAll.prd_code == '022012' ? '住房装修' : '耐用品' },
						// { value: 'housingdurableInfo', label: this.paramsAll.prd_code == '022012' ? '住房装修' : '耐用品' },
						// { value: 'countrymoneyInfo', label: '留学保证金' },
						// { value: 'countryInfo', label: '留学' },
						// { value: 'otherandCountInfo', label: this.paramsAll.prd_code == '022020' ? '其他' : '综合消费额' }
					];
				}
				// 根据需显示的不通做不通数据的必填判断
				if (this.paramsAll.prd_code == '022022') {
					listss.push({ value: 'personoptInfo', label: '个人经营贷款' });
				}
				if ((this.paramsAll.prd_code == '022022' && this.paramsAll.biz_type_sub == '022242') || this.paramsAll.prd_code == '022010') {
					listss.push({ value: 'personvchInfo', label: this.paramsAll.prd_code == '022022' ? '小企业汽车' : '汽车消费' });
				}
				if (this.paramsAll.prd_code == '022007' || this.paramsAll.prd_code == '022009') {
					listss.push({ value: 'housesInfo', label: this.paramsAll.prd_code == '022007' ? '住房' : '商业房' });
				}
				if (this.paramsAll.prd_code == '022012') {
					listss.push({ value: 'housingFitmentInfo', label: '住房装修' });
				}
				if (this.paramsAll.prd_code == '022015') {
					listss.push({ value: 'housingdurableInfo', label: '耐用品' });
				}
				if (this.paramsAll.prd_code == '022021') {
					listss.push({ value: 'countrymoneyInfo', label: '留学保证金' });
				}
				if (this.paramsAll.prd_code == '022019') {
					listss.push({ value: 'countryInfo', label: '留学' });
				}
				if (this.paramsAll.prd_code == '022020' || (this.paramsAll.prd_code == '022016' && this.paramsAll.biz_type_sub != '022204')) {
					listss.push({ value: 'otherandCountInfo', label: this.paramsAll.prd_code == '022020' ? '其他' : '综合消费额' });
				}
				this.applyInfo.apply_amount_init = this.applyInfo.apply_amount;
				this.rateInfo.floating_rate_init = this.rateInfo.floating_rate;
				for (var i = 0; i < listss.length; i++) {
					Object.assign(this.paramsAll, this[listss[i].value]);
				}
				var formData = this.paramsAll;
				for (var i = 0; i < listss.length; i++) {
					var rule = this.getRule(this[listss[i].value + 'Required']);
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
				if (this.copartnerindInfo.copartner_ind == 1 && save == false) {
					var s = await this.copListCheck();
					if (!s) {
						return;
					}
				}
				if (this.paymentInfo.payment_type == 2 && save == false) {
					var s = await this.paymentListCheck();
					if (!s) {
						return;
					}
				}
			}
			this.paramsAll.reality_ir_m = ((this.paramsAll.reality_ir_m * 1) / 1000).toString(); //执行月利率
			this.paramsAll.overdue_ir = ((this.paramsAll.overdue_ir * 1) / 1000).toString(); //逾期月利率
			this.paramsAll.default_ir = ((this.paramsAll.default_ir * 1) / 1000).toString(); //转移用途月利率
			var returnFomatefiled = ['ruling_ir', 'cal_floating_ir', 'floating_rate', 'floating_rate_init', 'reality_ir_y', 'down_payment_rate', 'loan_percent'];
			for (var i = 0; i < returnFomatefiled.length; i++) {
				if (returnFomatefiled[i] == 'floating_rate' || returnFomatefiled[i] == 'reality_ir_y') {
					this.paramsAll[returnFomatefiled[i]] = ((this.paramsAll[returnFomatefiled[i]] * 1) / 100).toFixed(6).toString();
				} else {
					this.paramsAll[returnFomatefiled[i]] = ((this.paramsAll[returnFomatefiled[i]] * 1) / 100).toString();
				}
			}
			if (save) {
				await this.submitRequest(this.paramsAll, save, isTabS);
			} else {
				uni.showModal({
					content: '是否确认提交？',
					success: async e => {
						if (e.confirm) {
							var resolve = await this.submitRequest(this.paramsAll, save, isTabS);
							if (resolve) {
								if (canuploadImg) {
									// 有图片可以上传图片时
									this.$request
										.post({
											url: 'es/json/EsCreditImageUploadDQ',
											data: {
												serno: this.currentserno, //	任务编号
												crtdate: this.paramsAll.apply_date ? this.paramsAll.apply_date : ''
											},
											upType: true,
											upMsg: '正在上传文件'
										})
										.then(res1 => {
											if (res1.response.header.returnCode == '00000000') {
												console.log('现场核查影像上传', res1);
											} else {
												uni.showToast({
													title: '提交失败',
													icon: 'none',
													duration: 1500
												});
											}
										})
										.catch(err => {});
								}
							}
						}
					},
					fail: () => {}
				});
			}
		},
		submitRequest(data, save, isTabS) {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.$request
					.post({
						url: 'es/json/EsBussiApplication',
						data: data
					})
					.then(res => {
						console.log('提交结果', res);
						if (res.response.header.returnCode == '00000000') {
							this.paramsAll.reality_ir_m = (this.paramsAll.reality_ir_m * 1 * 1000).toString(); //执行月利率
							this.paramsAll.overdue_ir = (this.paramsAll.overdue_ir * 1 * 1000).toString(); //逾期月利率
							this.paramsAll.default_ir = (this.paramsAll.default_ir * 1 * 1000).toString(); //转移用途月利率
							var returnFomatefiled = ['ruling_ir', 'cal_floating_ir', 'floating_rate', 'floating_rate_init', 'reality_ir_y', 'down_payment_rate', 'loan_percent'];
							for (var i = 0; i < returnFomatefiled.length; i++) {
								if (returnFomatefiled[i] == 'floating_rate' || returnFomatefiled[i] == 'reality_ir_y') {
									this.paramsAll[returnFomatefiled[i]] = (this.paramsAll[returnFomatefiled[i]] * 100).toFixed(6).toString();
								} else {
									this.paramsAll[returnFomatefiled[i]] = (this.paramsAll[returnFomatefiled[i]] * 100).toString();
								}
							}
							if (save) {
								_this.saved = true;
								uni.showToast({
									title: '保存成功',
									icon: 'none',
									duration: 1500
								});
								resolve(true);
								return;
							}
							_this.$store.commit('delmanagerSelect');
							uni.redirectTo({
								url: '/pages/result/result?isSuccess=true&appOper=1'
							});
							resolve(true);
						} else {
							if (save) {
								uni.showToast({
									title: res.response.header.returnMsg,
									icon: 'none',
									duration: 1500
								});

								resolve(false);
								return;
							}
							uni.showModal({
								content: res.response.header.returnMsg,
								showCancel: false,
								success: e => {
									if (e.confirm) {
									}
								}
							});
							resolve(false);
						}
					})
					.catch(err => {});
			});
		},
		canUploadimage(saveBtn, checkI) {
			var canuploadImg = false;
			if (this.isAdd) {
				if (this.checkItem[0].currentImageList.length != 0 || this.checkItem[1].currentImageList.length != 0) {
					canuploadImg = true;
				}
			} else if (this.isChange) {
				// 原始数据被删除或者新增了数据，进行保存
				if (
					this.originCheckItem[0].echoImgList.length != this.checkItem[0].echoImgList.length ||
					this.checkItem[0].currentImageList.length != 0 ||
					(this.originCheckItem[1].echoImgList.length != this.checkItem[1].echoImgList.length || this.checkItem[1].currentImageList.length != 0)
				) {
					canuploadImg = true;
				}
			}
			console.log('canuoloadimg:', canuploadImg);
			if (canuploadImg) {
				this.$request
					.post({
						url: 'es/json/EsCreditImageUploadDQ',
						data: {
							serno: this.currentserno, //	任务编号
							crtdate: this.paramsAll.apply_date ? this.paramsAll.apply_date : ''
						},
						upType: true,
						upMsg: '正在上传文件'
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000') {
							console.log('现场核查影像上传', res);
							if (this.isAdd) {
								this.apply_date = this.paramsAll.apply_date;
							}
							this.toQueryImageData(true);
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			} else {
				if (saveBtn) {
					uni.showToast({
						title: '未作任何更新',
						icon: 'none',
						duration: 1500
					});
				}
			}
		},
		changeFlag(list, origin) {
			var flag = false;
			for (var i = 0; i < list.length; i++) {
				for (let ckey in this[list[i].value]) {
					if (origin.hasOwnProperty(ckey)) {
						if (origin[ckey] != this[list[i].value][ckey]) {
							flag = true;
							break;
						}
					}
				}
			}
			return flag;
		},
		copListCheck() {
			var _this = this;
			return new Promise((resolve, reject) => {
				var countAmt = 0;
				_this.$request
					.post({
						url: 'es/json/EsQueryAdditionalInfo',
						data: {
							serno: _this.currentserno ? _this.currentserno : '', //业务流水号
							Othertype: '4', //查询类型
							start_count: '0', //开始记录数
							count: '999999' //查询条数
						}
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length > 0) {
							var listData = res.response.content.List;
							for (var i = 0; i < listData.length; i++) {
								countAmt += listData[i].cop_use_amt * 1;
							}
							// 合作方信息业务占用金额应大于或等于申请金额
							if (countAmt < _this.applyInfo.apply_amount * 1) {
								uni.showModal({
									content: '合作方信息业务占用金额(' + countAmt + ')应大于或等于申请金额(' + _this.applyInfo.apply_amount + ')',
									showCancel: false,
									success: e => {
										if (e.confirm) {
										}
									}
								});
								resolve(false);
								return;
							}
							resolve(true);
						} else {
							if (res.response.header.returnCode != '00000000') {
								uni.showModal({
									content: '合作方信息业务占用金额(0)应大于或等于申请金额(' + _this.applyInfo.apply_amount + ')',
									showCancel: false,
									success: e => {
										if (e.confirm) {
										}
									}
								});
							}
							resolve(false);
							return;
						}
					})
					.catch(err => {
						uni.showModal({
							content: '合作方信息业务占用金额(0)应大于或等于申请金额(' + _this.applyInfo.apply_amount + ')',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
						resolve(false);
						return;
					});
			});
		},
		paymentListCheck() {
			var _this = this;
			return new Promise((resolve, reject) => {
				var countAmt = 0;
				_this.$request
					.post({
						url: 'es/json/EsQueryAdditionalInfo',
						data: {
							serno: _this.currentserno ? _this.currentserno : '', //业务流水号
							Othertype: '3', //查询类型
							start_count: '0', //开始记录数
							count: '999999' //查询条数
						}
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length > 0) {
							var listData = res.response.content.List;
							for (var i = 0; i < listData.length; i++) {
								countAmt += listData[i].amount * 1;
							}
							// 合作方信息业务占用金额应大于或等于申请金额
							if (countAmt != _this.applyInfo.apply_amount * 1) {
								uni.showModal({
									content: '支付方式为受托支付时，付款金额总额(' + countAmt + ')必须等于申请金额(' + _this.applyInfo.apply_amount + ')',
									showCancel: false,
									success: e => {
										if (e.confirm) {
										}
									}
								});
								resolve(false);
								return;
							}
							resolve(true);
						} else {
							uni.showModal({
								content: '支付方式为受托支付时，付款金额总额(0)必须等于申请金额(' + _this.applyInfo.apply_amount + ')',
								showCancel: false,
								success: e => {
									if (e.confirm) {
									}
								}
							});
							resolve(false);
							return;
						}
					})
					.catch(err => {
						uni.showModal({
							content: '支付方式为受托支付时，付款金额总额(0)必须等于申请金额(' + _this.applyInfo.apply_amount + ')',
							showCancel: false,
							success: e => {
								if (e.confirm) {
								}
							}
						});
						resolve(false);
						return;
					});
			});
		},
		toQueryImageData: function(isSaveBtn,pdfView=false) {
			this.$request
				.post({
					url: 'es/json/EsCreditImageViewDQ',
					data: {
						serno: this.currentserno, //	任务编号
						crtdate: this.apply_date ? this.apply_date : ''
					},
					loading: isSaveBtn ? false : true
				})
				.then(res => {
					this.originCheckItem = JSON.parse(JSON.stringify(this.checkItem));
					console.log('影像查看：', res);
					this.checkItem[0].echoImgList = [];
					this.checkItem[1].echoImgList = [];
					if (!pdfView) {
						this.checkItem[0].currentImageList = [];
						this.checkItem[1].currentImageList = [];
					}
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List.length) {
							this.isChange = true;
							var listData = res.response.content.List;
							listData.forEach((element, inde) => {
								if (process.env.NODE_ENV === 'development') {
									element.urlreplace = element.URL;
								} else {
									if (this.$store.state.imgUrlReplace) {
										var reg = /^((http:\/\/)|(https:\/\/))((([a-zA-Z0-9]*\.)*[a-zA-Z0-9]*)|(([a-zA-Z0-9]{1,3}\.){3}[a-zA-Z0-9]{1,3})):[0-9]{4}(\/){0}/;
										element.urlreplace = element.URL.replace(reg, this.$store.state.prodUrl);
									} else {
										element.urlreplace = element.URL;
									}
								}
								element.name = element.BUSI_FILE_TITLE;
								for (var i = 0; i < this.checkItem.length; i++) {
									if (element.IMGTYPE == this.checkItem[i].id) {
										element.pUrl = element.urlreplace ? element.urlreplace : '';
										this.checkItem[i].echoImgList.push(element);
										break;
									}
								}
							});
							this.originCheckItem = JSON.parse(JSON.stringify(this.checkItem));
							console.log('填充数据后：', this.checkItem);
						}
						if (isSaveBtn) {
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 1500
							});
						}
					}
				});
		},
		queryData() {
			// 客户查询 -- 传列表中返回的客户号即可
			this.$request
				.post({
					url: 'es/json/EsQueryBusinessInfoDetail',
					data: {
						serno: this.currentserno ? this.currentserno : ''
					}
				})
				.then(res => {
					console.log('申请信息详情', res);
					if (res.response.header.returnCode == '00000000') {
						this.notQueryinterestRateQuery = false;
						var content = res.response.content;
						// 个人消费贷款-综合消费额度贷款--网易贷-差额放款  不显示产品信息页签
						if (content.prd_code == '022016' && content.biz_type_sub == '022204') {
							this.$nextTick(() => {
								this.$refs.tabs.$refs.tabs1[0].$el.style.display = 'none';
							});
						}
						var lists = [
							'paramsAll',
							'applyInfo',
							'bussclassInfo',
							'assuremeansInfo',
							'rateInfo',
							'directionInfo',
							'copartnerindInfo',
							'paymentInfo',
							'invstconclInfo',
							'organizationInfo',
							'personoptInfo',
							'personvchInfo',
							'housesInfo',
							'housingFitmentInfo',
							'housingdurableInfo',
							'countrymoneyInfo',
							'countryInfo',
							'otherandCountInfo'
						];

						var returnFomatefiled = ['ruling_ir', 'cal_floating_ir', 'floating_rate', 'reality_ir_y', 'down_payment_rate', 'loan_percent'];
						var returnFomatefiled1 = ['reality_ir_m', 'overdue_ir', 'default_ir'];
						// 执行月利率,逾期月利率,转移用途月利率
						for (var i = 0; i < lists.length; i++) {
							for (let key1 in this[lists[i]]) {
								if (content.hasOwnProperty(key1)) {
									if (key1 == 'List') {
									} else {
										try {
											if (returnFomatefiled.indexOf(key1) != -1) {
												if (returnFomatefiled[key1] == 'floating_rate' || returnFomatefiled[key1] == 'reality_ir_y') {
													this[lists[i]][key1] = (content[key1] * 100).toFixed(6).toString();
												} else {
													this[lists[i]][key1] = (content[key1] * 100).toString();
												}
											} else if (returnFomatefiled1.indexOf(key1) != -1) {
												this[lists[i]][key1] = (content[key1] * 1000).toString();
											} else {
												this[lists[i]][key1] = content[key1];
											}
										} catch (e) {
											//TODO handle the exception
										}
									}
								}
							}
							if (lists[i] == 'paramsAll') {
								this.originparamsAll = JSON.parse(JSON.stringify(this[lists[i]]));
								if (this.originparamsAll.investigator_id) {
									this.queryCusName(this.originparamsAll.investigator_id, 'manger1Name');
								}
								if (this.originparamsAll.examinant_id) {
									this.queryCusName(this.originparamsAll.examinant_id, 'manger2Name');
								}
							}
						}
						// 默认值
						this.applyInfo.base_type = this.applyInfo.base_type ? this.applyInfo.base_type : '02';
						this.applyInfo.apply_cur_type = 'CNY';
						this.paramsAll.apply_cur_type = 'CNY';

						this.bussclassInfo.ord_pro_category = this.bussclassInfo.ord_pro_category.replace(/,/g, ',\r\n');
						this.ord_pro_categoryname = this.bussclassInfo.ord_pro_category;
						if (this.ord_pro_categoryname) {
							var str = [];
							var str1 = [];
							var arrlist = this.ord_pro_categoryname.split(',\r\n');
							for (var i = 0; i < arrlist.length; i++) {
								var item = arrlist[i];
								var arr2 = item.split('-');
								str.push(arr2[0]);
								str1.push(arr2[1]);
							}
							var result = {};
							var item = ['pledge', 'TransactionClass', 'fixed_assets', 'policy', 'insurance', 'other_features'];
							for (var i = 0; i < str.length; i++) {
								for (var j = 0; j < item.length; j++) {
									for (var k = 0; k < this.selectdata[item[j]].length; k++) {
										if (this.selectdata[item[j]][k].value == str[i]) {
											result[item[j]] += str[i] + ',';
											break;
										}
									}
								}
							}
							console.log('3454', result);
							for (var rekey in result) {
								var items = result[rekey].replace('undefined', '');
								items = items.substr(0, items.lastIndexOf(','));
								this.procategory[rekey] = items;
							}
						}
						this.$forceUpdate();
					}
				})
				.catch(err => {});
		},
		clearprocategory() {
			var item = ['pledge', 'TransactionClass', 'fixed_assets', 'policy', 'insurance', 'other_features'];
			for (var i = 0; i < item.length; i++) {
				this.procategory[item[i]] = '';
				this.procategory[item[i] + 'name'] = '';
				this.procategory[item[i] + 'Arr'] = [];
				this.$forceUpdate();
			}
		},
		applyInfoapplyterm() {
			if (this.applyInfo.apply_term === '0') {
				uni.showToast({
					icon: 'none',
					title: '申请期限不能为0'
				});
				return;
			} else {
				// 不进行判断了
				return;
				// 网易贷-差额放款
				// 网易贷-网银自助放款
				//  期限不允许超过一年
				if (this.paramsAll.biz_type_sub == '022204' || this.paramsAll.biz_type_sub == '022241') {
					if (this.applyInfo.term_time_type === '') {
						uni.showToast({
							icon: 'none',
							title: '请选择期限类型'
						});
						return false;
					} else {
						// 01日
						if (this.applyInfo.term_time_type == '01') {
							var date = new Date();
							var n = this.applyInfo.apply_term * 1;
							date.setDate(date.getDate() + n);
							this.applyInfo.end_date = date.Format('yyyy-MM-dd');
							var dateCurrentOneYear = new Date();
							dateCurrentOneYear.setFullYear(dateCurrentOneYear.getFullYear() + 1);
							dateCurrentOneYear = dateCurrentOneYear.Format('yyyy-MM-dd');
							if (this.applyInfo.end_date <= dateCurrentOneYear) {
								// 在一年以内
							} else {
								uni.showToast({
									icon: 'none',
									title: '期限时间不能超过一年'
								});
								this.onBeforeSwitch = false;
								return false;
							}
						} else if (this.applyInfo.term_time_type == '02') {
							if (this.applyInfo.apply_term > 12) {
								uni.showToast({
									icon: 'none',
									title: '期限时间不能超过一年'
								});
								this.onBeforeSwitch = false;
								return false;
							}
						}
					}
				}
			}
		},
		setmanagerSelect(type) {
			this.toLink('/pages/customerMg/queryManager?type=' + type);
		},
		getdiscountList(isfirst) {
			if (isfirst) {
				this.discountListstart = 1;
				this.discountListcount = 10;
				this.discountList = [];
			}
			this.listtoEndTimes = 0;
			this.$request
				.post({
					url: 'es/json/EsQueryDiscountInfo',
					data: {
						discount_id: '', //贴息方编号
						start_count: this.discountListstart.toString(), //开始记录数
						count: this.discountListcount.toString() //查询条数
					}
					// loading: false
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List && res.response.content.List.length > 0) {
							if (res.response.content.List.length != this.discountListcount * 1) {
								this.discountListEnd = true;
							}
							this.discountList = this.discountList.concat(res.response.content.List);
							this.$forceUpdate();
						} else {
							this.discountListEnd = true;
							this.discountListstart = (this.discountListstart * 10 - 10 * 10) / 10;
						}
					} else {
						this.discountListEnd = true;
						this.discountListstart = (this.discountListstart * 10 - 10 * 10) / 10;
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {
					this.discountListEnd = true;
					this.discountListstart = (this.discountListstart * 10 - 10 * 10) / 10;
				});
		},
		selectDiscountId(index, item) {
			this.rateInfo.discount_id = item.discount_id;
			this.$refs.discountid.cancelMulti();
		},
		// 附加信息查询   合作方信息  4   支付信息 3
		queryOtherInfoList(type, listName, first) {
			this.listtoEndTimes = 0;
			if (first) {
				this[listName + 'End'] = false;
				this.otherstart = 0;
				this.othercount = 10;
			} else {
				this.otherstart = this[listName + 'start'] * 1;
				this.othercount = this[listName + 'count'] * 1;
			}
			this.$request
				.post({
					url: 'es/json/EsQueryAdditionalInfo',
					data: {
						serno: this.currentserno ? this.currentserno : '', //业务流水号
						Othertype: type, //查询类型
						start_count: this.otherstart.toString(), //开始记录数
						count: this.othercount.toString() //查询条数
					}
				})
				.then(res => {
					if (first) {
						this[listName] = [];
					}
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List && res.response.content.List.length > 0) {
							var listData = res.response.content.List;
							if (listData.length != this.othercount * 1) {
								this[listName + 'End'] = true;
							}
							this[listName] = this[listName].concat(listData);
							requestParams['basic' + listName] = this[listName];
							console.log('request', requestParams);
							this.$forceUpdate();
						} else {
							this[listName + 'End'] = true;
							this[listName + 'start'] = this[listName + 'start'] * 1 - 10;
						}
					} else {
						this[listName + 'End'] = true;
						this[listName + 'start'] = this[listName + 'start'] * 1 - 10;
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {
					this[listName + 'End'] = true;
					this[listName + 'start'] = this[listName + 'start'] * 1 - 10;
				});
		},
		//附加信息删除
		delAssList(item, type, listName, index, isNotsaveDel) {
			uni.showModal({
				content: '是否删除本条信息?',
				success: e => {
					if (e.confirm) {
						var param = JSON.parse(JSON.stringify(item));
						delete param.Othertype;
						param.AppFlag = '2';
						this.$request
							.post({
								url: 'es/json/EsAdditionalInfoModify',
								data: {
									serno: this.currentserno, //	流水号
									Othertype: type, //	新增类型
									other_list: [param]
								},
								loading: isNotsaveDel ? false : true
							})
							.then(res => {
								if (res.response.header.returnCode == '00000000') {
									if (isNotsaveDel === true) {
									} else {
										this[listName].splice(index, 1);
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1500
										});
									}
									this.$forceUpdate();
								} else {
									if (isNotsaveDel === true) {
									} else {
										uni.showToast({
											title: res.response.header.returnMsg,
											icon: 'none',
											duration: 1500
										});
									}
								}
							})
							.catch(err => {});
					} else {
						uni.showToast({
							title: '删除失败',
							icon: 'none',
							duration: 1500
						});
					}
				},
				fail: () => {}
			});
		},
		// 还款信息查询
		queryrepayInfoList(first) {
			this.listtoEndTimes = 0;
			if (first) {
				this.repayListEnd = false;
				this.repayListstart = 1;
				this.repayListcount = 10;
			}
			this.$request
				.post({
					url: 'es/json/EsQueryCooperationPlan',
					data: {
						serno: this.currentserno ? this.currentserno : '', //业务流水号
						StartCount: this.repayListstart.toString(), //开始记录数
						Count: this.repayListcount.toString() //查询条数
					}
				})
				.then(res => {
					if (first) {
						this.repayList = [];
					}
					if (res.response.header.returnCode == '00000000') {
						if (res.response.content.List && res.response.content.List.length > 0) {
							var listData = res.response.content.List;
							if (listData.length != this.repayListcount * 1) {
								this.repayListEnd = true;
							}
							this.repayList = this.repayList.concat(listData);
							requestParams.basicRepayList = this.repayList;
						} else {
							this.repayListEnd = true;
							this.repayListstart = this.repayListstart * 1 - 10;
						}
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
						this.repayListEnd = true;
						this.repayListstart = this.repayListstart * 1 - 10;
					}
				})
				.catch(err => {
					this.repayListEnd = true;
					this.repayListstart = this.repayListstart * 1 - 10;
				});
		},
		// 存量业务列表查询 -- 借据查询
		stockListQuery() {
			this.$request
				.post({
					url: 'es/json/EsQueryIOUInfomation',
					data: {
						bill_no: '', //	借据编号
						cont_no: '', //	合同编号
						cus_name: this.paramsAll.cus_name !== '' ? this.paramsAll.cus_name : '', //	客户名称
						cus_id: this.paramsAll.cus_id !== '' ? this.paramsAll.cus_id : '', //	客户号
						biz_type: '' //	业务品种
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);

						var listData = res.response.content.List;

						this.stock_list = listData;
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		getRatingList() {
			this.$request
				.post({
					url: 'es/json/EsQueryRatingResult',
					data: {
						cus_id: this.paramsAll.cus_id !== '' ? this.paramsAll.cus_id : '', //	申请人客户号
						serno: this.currentserno ? this.currentserno : '' //贷款编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						console.log('所有数据', res);
						var listData = res.response.content;
						listData.ccr_upminrate = listData.ccr_upminrate * 100;
						this.rating_data = listData;
						this.$forceUpdate();
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		launchRating() {
			this.$request
				.post({
					url: 'es/json/EsLaunchRating',
					data: {
						serno: this.currentserno ? this.currentserno : '' //贷款编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						if (this.canShowRate) {
							this.getRatingList();
						}
						uni.showToast({
							title: '发起成功',
							icon: 'none',
							duration: 1500
						});
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		// 征信结果列表
		creditInspectQuery() {
			this.$request
				.post({
					url: 'es/json/EsQueryCreditReference',
					data: {
						serno: this.currentserno ? this.currentserno : '' //贷款编号
					}
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000' && res.response.content.crt_list.length) {
						console.log('所有数据', res);
						var listData = res.response.content.crt_list;
						this.credit_inspect = listData;
						requestParams.basicCreditInspectResult = this.credit_inspect;
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		loadList(listName) {
			if (this[listName + 'End']) {
				return;
			}
			console.log('lower');
			this.listtoEndTimes += 1;
			if (this.listtoEndTimes == 1) {
				console.log('实际触发执行');
				this[listName + 'start'] = this[listName + 'start'] * 1 + this[listName + 'count'] * 1;
				this[listName + 'count'] = 10;
				if (listName == 'repayList') {
					this.queryrepayInfoList();
				} else if (listName == 'debtor_list') {
					this.queryOtherInfoList('1', 'debtor_list');
				} else if (listName == 'guaranty_list') {
					this.queryOtherInfoList('2', 'guaranty_list');
				} else if (listName == 'payment_list') {
					this.queryOtherInfoList('3', 'payment_list');
				} else if (listName == 'copartner_list') {
					this.queryOtherInfoList('4', 'copartner_list');
				} else if (listName == 'buss_list') {
					this.queryOtherInfoList('5', 'buss_list');
				}
			}
		},
		loadListdiscountList() {
			this.listtoEndTimes += 1;
			if (this.listtoEndTimes == 1) {
				this.discountListstart = this.discountListstart * 1 + this.discountListcount * 1;
				this.discountListcount = 10;
				this.getdiscountList(true);
			}
		},
		delrepayList(item, pk_value, listName, index) {
			uni.showModal({
				content: '是否删除本条信息?',
				success: e => {
					if (e.confirm) {
						if (index !== '') {
							this.$request
								.post({
									url: 'es/json/EsRepayMentInfoPlan',
									data: {
										serno: this.currentserno, //	流水号
										repaylist: [
											{
												pk_value: pk_value, //还款计划流水号
												AppFlag: '2', //操作类型
												repay_date: item.repay_date, //	还款日
												repay_amt: item.repay_amt, //	金额
												send_flag: item.send_flag //	金额
											}
										]
									},
									loading: false
								})
								.then(res => {
									if (res.response.header.returnCode == '00000000') {
										this.repayList.splice(index, 1);
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1500
										});
										this.$forceUpdate();
									} else {
										uni.showToast({
											title: res.response.header.returnMsg,
											icon: 'none',
											duration: 1500
										});
									}
								})
								.catch(err => {});
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'none',
								duration: 1500
							});
						}
					}
				},
				fail: () => {}
			});
		},
		//定价基准查询
		interestRateQuery(type) {
			var _this = this;
			if (this.paramsAll.biz_type_sub == '022204' || this.paramsAll.biz_type_sub == '022241') {
				// 是网易贷是，定价基准为一年期
				type = 'BB';
			}
			return new Promise((resolve, reject) => {
				_this.$request
					.post({
						url: 'es/json/EsInterestRateQuery',
						data: {
							'OPUN-COD': _this.accountInfo.orgid ? _this.accountInfo.orgid : '', //营业单位代码
							'CURR-COD': '01', //币别
							'INTR-TYP': type, //利率种类
							'MASS-AMT-RANG': '00', //大额级距
							'AVL-DT': '' //生效日期
						}
					})
					.then(res => {
						if (res.response.header.returnCode == '00000000') {
							// 返回数据是五位小数但是没有点
							var a = _this.formatNumber(res.response.content['INTR1'], 5, 6);
							_this.rateInfo.ruling_ir = a;
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
		queryCusName: function(id, filedName) {
			//客户信息列表查询 --
			this.$request
				.post({
					url: 'creditQueryUserInformation/v1/creditquery',
					data: {
						actorno: id,
						actorname: '',
						state: '', // 查全部数据
						page: '1', //	开始记录数
						count: '999' //	查询条数
					}
				})
				.then(res => {
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						console.log('所有数据', res);
						var listData = res.content.list;
						this[filedName] = listData[0].actorname;
						this.$forceUpdate();
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
		marDiscern() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var _this = this;
			try {
				Camera({ num: 4 }, function(request, respons) {
					uni.hideLoading();
					console.log('拍照返回', respons);
					_this.$request
						.post({
							url: 'es/json/EsOcrMarriageCard',
							data: {
								imgStr: respons.imgbase64, // 这个是图片base64
								channelCode: 'ocr001_ydyxpt', // 固定值ocr001_ydyxpt
								imgType: '4' //4表示产权证
							}
						})
						.then(res => {
							if (res.response.header.returnCode == '00000000' && res.response.content) {
								if (res.response.content.code === '0' && res.response.content.List.length && res.response.content.List[0].certificateNo) {
									_this.housesInfo.ownerhip_no = res.response.content.List[0].certificateNo;
									_this.housesInfo.housing_loc = res.response.content.List[0].location;
									_this.housesInfo.dsb_area = res.response.content.List[0].builtArea;
									_this.housesInfo.cif_area = res.response.content.List[0].floorArea;
									// 是二手房 回显原房屋所有权证编号
									if (_this.housesInfo.houses_nature == '2') {
										_this.housesInfo.ownerhip_no = res.response.content.List[0].certificateNo;
									}
									_this.$forceUpdate();
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
			} catch (e) {
				uni.hideLoading();
			}
		},
		topdfPage(url, index) {
			uni.setStorage({
				key: 'PdfPageNameList',
				data: {},
				success: function() {}
			});
			uni.setStorage({
				key: 'PdfPageNameList',
				data: this.checkItem[index],
				success: function() {}
			});
			this.toLink(url);
		},
		downpayment() {
			debugger;
			if (this.housesInfo.down_payment * 1 && this.housesInfo.housing_total * 1) {
				this.housesInfo.down_payment_rate = (((this.housesInfo.down_payment * 1) / (this.housesInfo.housing_total * 1)) * 100).toFixed(4);
				this.$forceUpdate();
			} else {
				return;
			}
		},
		cumputedFloatRate() {
			if (this.rateInfo.floating_rate === '') {
				uni.showToast({
					title: '不能为空',
					icon: 'none',
					duration: 1500
				});
				return;
			}
			if (this.rateInfo.floating_rate * 1 && this.rateInfo.floating_type * 1) {
				// 最终年利率
				if (this.rateInfo.floating_type == '1') {
					var ratevalue = (1 + this.rateInfo.floating_rate / 100) * this.rateInfo.ruling_ir * 1;
					this.rateInfo.reality_ir_y = ratevalue.toFixed(6).toString();
				} else if (this.rateInfo.floating_type == '2') {
					var ratevalue = this.rateInfo.floating_rate * 1 + this.rateInfo.ruling_ir * 1;
					this.rateInfo.reality_ir_y = ratevalue.toFixed(6).toString();
				}
				this.rateInforeality_ir_m = ((this.rateInfo.reality_ir_y * 1) / 12 / 100) * 1000;
				this.rateInfo.reality_ir_m = this.rateInforeality_ir_m.toFixed(6).toString(); //执行月利率
				this.rateInfo.overdue_ir = (this.rateInforeality_ir_m * 1 * 1.5).toFixed(6).toString(); //逾期月利率
				this.rateInfo.default_ir = (this.rateInforeality_ir_m * 1 * 2).toFixed(6).toString(); //转移用途月利率
			}
		},
		comparaSize(numName) {
			if (this[numName].spd_amount * 1 < this.applyInfo.apply_amount * 1) {
				uni.showToast({
					title: '消费品总价需大于等于贷款金额',
					icon: 'none',
					duration: 2000
				});
			} else {
				this[numName].loan_percent = (((this.applyInfo.apply_amount * 1) / this[numName].spd_amount) * 1 * 100).toFixed(4);
				this.$forceUpdate();
			}
		},
		formatNumber(value, pointLen, fixed) {
			var valnum = value * 1; //转为数字
			var point0 = '1';
			for (var i = 0; i < pointLen; i++) {
				point0 += '0';
			}
			var ponit0num = point0 * 1;
			var result = valnum / ponit0num;
			return result.toFixed(fixed);
		},
		changeRequireStatus(arr, paramsName, filedName, eqvalue, falgName, eqFlag) {
			var itemarr = arr;
			var indexArr = [];
			for (var i = 0; i < itemarr.length; i++) {
				if (eqFlag == 'indexof') {
				} else {
					if (this.isChange || this.isQueryDetail) {
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
			console.log('thijs.,', this[paramsName][filedName], eqvalue);
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
					console.log('flagdatename:', this.flagdatename);
					return true;
				}
			}
			for (var i = 0; i < indexArr.length; i++) {
				this[paramsName + 'Required'][indexArr[i]].valid = false;
			}
			if (falgName) this[falgName] = false;
			return false;
		},
		arrHasObj(arr, obj, replace) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == obj.name) {
					if (replace) arr[i] = obj;
					return i;
					break;
				}
			}
			return -1;
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
		getValuename(value, fname) {
			for (var i = 0; i < this.selectdata[fname].length; i++) {
				var item = this.selectdata[fname][i];
				if (item.value == value) {
					return item.label;
				}
			}
		}
	},
	watch: {
		currentTabIndexMain(newv, oldv) {
			console.log('currentTabIndexMain', this.currentTabIndexMain);
			// 基本信息下的二级菜单数据
			if (oldv == 0) {
				var jblists = [
					{ index: 0, value: 'applyInfo' },
					{ index: 1, value: 'bussclassInfo' },
					{ index: 2, value: 'assuremeansInfo' },
					{ index: 3, value: 'rateInfo' },
					{ index: 4, value: 'directionInfo' },
					{ index: 5, value: 'copartnerindInfo' },
					{ index: 6, value: 'paymentInfo' },
					{ index: 7, value: 'invstconclInfo' },
					{ index: 8, value: 'organizationInfo' }
				];
				this.infoSubmit(true, jblists[this.currentTabIndexSub].value, true);
			} else if (oldv == 1) {
				var lists = [
					{ index: 'cpgrjy', value: 'personoptInfo' },
					{ index: 'cpxqyqc', value: 'personvchInfo' },
					{ index: 'cpzf', value: 'housesInfo' },
					{ index: 'cpzfzx', value: 'housingFitmentInfo' },
					{ index: 'cpnyp', value: 'housingdurableInfo' },
					{ index: 'cplxbzj', value: 'countrymoneyInfo' },
					{ index: 'cplx', value: 'countryInfo' },
					{ index: 'cpgrjy', value: 'otherandCountInfo' }
				];
				console.log('eeeeeeeee', this.$refs.tabstwodk);
				for (var i = 0; i < lists.length; i++) {
					var ref = 'tabs' + this.currentTabIndexSubCp;
					if (this.$refs.tabscptwo.$refs[ref][0].$attrs.id == lists[i].index) {
						this.infoSubmit(true, lists[i].value, true);
						break;
					}
				}
			} else if (oldv == 8) {
				this.canUploadimage(false);
			}
			if (newv == 9) {
				// 评分结果在修改和回显时进入页签就调用-能展示评分结果的产品才调用
				if ((this.isChange || this.isQueryDetail) && this.canShowRate) {
					this.getRatingList();
				}
			}
			if (this.$refs.tabs.scrollInto == 'hkjh') {
				//进入此页面时加载数据，目前由点击查询按钮触发
				// this.queryrepayInfoList(true);
			} else if (this.$refs.tabs.scrollInto == 'gtzwr') {
				//进入此页面时加载数据，目前由点击查询按钮触发
				// this.queryOtherInfoList('1', 'debtor_list',true);
			} else if (this.$refs.tabs.scrollInto == 'clyw') {
				this.stockListQuery();
			} else if (this.$refs.tabs.scrollInto == 'zxjl') {
				this.creditInspectQuery();
			}
		},
		currentTabIndexSub(newv, oldv) {
			console.log('currentTabIndexSub', this.currentTabIndexSub);
			var lists = [
				{ index: 0, value: 'applyInfo' },
				{ index: 1, value: 'bussclassInfo' },
				{ index: 2, value: 'assuremeansInfo' },
				{ index: 3, value: 'rateInfo' },
				{ index: 4, value: 'directionInfo' },
				{ index: 5, value: 'copartnerindInfo' },
				{ index: 6, value: 'paymentInfo' },
				{ index: 7, value: 'invstconclInfo' },
				{ index: 8, value: 'organizationInfo' }
			];
			if (this.$refs.tabstwodk.scrollInto == 'dklvxx') {
				if (this.isChange || this.isAdd) {
					if (this.applyInfo.term_time_type && this.applyInfo.apply_term) {
						var y = new Date().getFullYear();
						var isLeap = (0 === y % 4 && 0 === y % 100) || 0 === y % 400;
						var days = isLeap ? 366 : 365;
						// 日
						if (this.notQueryinterestRateQuery) {
							if (this.applyInfo.term_time_type == '01') {
								if (this.applyInfo.apply_term <= days) {
									this.interestRateQuery('BB');
								} else if (this.applyInfo.apply_term > days) {
									this.interestRateQuery('BF');
								}
							} else if (this.applyInfo.term_time_type == '02') {
								if (this.applyInfo.apply_term <= 12) {
									this.interestRateQuery('BB');
								} else if (this.applyInfo.apply_term > 12) {
									this.interestRateQuery('BF');
								}
							}
						}
					}
				}
			} else if (this.$refs.tabstwodk.scrollInto == 'dkzfxx') {
				//进入此页面时加载数据，目前由点击查询按钮触发
				// this.queryOtherInfoList('3', 'payment_list', true)
			} else if (this.$refs.tabstwodk.scrollInto == 'dkhzfxx') {
				//进入此页面时加载数据，目前由点击查询按钮触发
				// this.queryOtherInfoList('4', 'copartner_list', true)
			}
			// 合作方信息和支付信息时不调用保存
			for (var i = 0; i < lists.length; i++) {
				if (lists[i].index == oldv) {
					this.infoSubmit(true, lists[i].value, true);
					break;
				}
			}
			// this.tabMain[a].show = true;
		},
		currentTabIndexSubCp(newv, oldv) {
			console.log('eee', this.currentTabIndexSubCp);
			var lists = [
				{ index: 'cpgrjy', value: 'personoptInfo' },
				{ index: 'cpxqyqc', value: 'personvchInfo' },
				{ index: 'cpzf', value: 'housesInfo' },
				{ index: 'cpzfzx', value: 'housingFitmentInfo' },
				{ index: 'cpnyp', value: 'housingdurableInfo' },
				{ index: 'cplxbzj', value: 'countrymoneyInfo' },
				{ index: 'cplx', value: 'countryInfo' },
				{ index: 'cpgrjy', value: 'otherandCountInfo' }
			];
			console.log('eeeeeeeee', this.$refs.tabstwodk);
			for (var i = 0; i < lists.length; i++) {
				if (this.$refs.tabscptwo.$refs['tabs' + oldv][0].$attrs.id == lists[i].index) {
					this.infoSubmit(true, lists[i].value, true);
					break;
				}
			}
		},
		currentTabIndexSubCl(newv, oldv) {
			console.log('eee', this.currentTabIndexSubCl);
			this.canUploadimage(false);
		},
		'paramsAll.prd_code': {
			handler(newv, oldv) {
				if (this.paramsAll.prd_code == '022022' || this.paramsAll.prd_code == '022009') {
					this.$nextTick(() => {
						this.$refs.tabstwodk.$refs.tabs1[0].$el.style.display = 'inline-block';
					});
				} else {
					this.$nextTick(() => {
						this.$refs.tabstwodk.$refs.tabs1[0].$el.style.display = 'none';
					});
				}
				// 消费内容的选项控制
				if (newv == '022012' || newv == '022015') {
					// newv == '022012' ? '住房装修' : '耐用品'
					if (newv == '022012') {
						this.housingFitmentInfo.spd_content = '30';
					} else {
						this.housingdurableInfo.spd_content = '10';
					}
					this.$forceUpdate();
				}
				if (newv == '022020' || newv == '022016') {
					// newv == '022020' ? '其他' : '综合消费额'
					if (newv == '022020') {
						this.otherandCountInfo.spd_content = '50';
					} else {
						if (this.isChange || this.isQueryDetail) {
						} else {
							this.otherandCountInfo.spd_content = '';
						}
					}
					this.$forceUpdate();
				}

				//耐用品和住房装修
				var item1 = { name: 'fitment_place', checkType: 'notnull', errorMsg: '请输入耐用品名称' };
				var item2 = { name: 'fitment_place', checkType: 'notnull', errorMsg: '请输入装修地点' };
				this.arrHasObj(this.housingdurableInfoRequired, item1, true);
				this.arrHasObj(this.housingFitmentInfoRequired, item2, true);
				// 贷款投向必输控制
				var item = { name: 'loan_direction', checkType: 'notnull', errorMsg: '请选择贷款投向', valid: false };
				var index = this.arrHasObj(this.directionInfoRequired, item);
				if (newv == '022022') {
					this.directionInfoRequired[index].valid = true;
				} else {
					this.directionInfoRequired[index].valid = false;
				}
				// 业务品种 字段必输控制
				var item = { name: 'ord_pro_category', checkType: 'notnull', errorMsg: '请选择业务品种', valid: false };
				var index = this.arrHasObj(this.bussclassInfoRequired, item);
				if (newv == '022022' || newv == '022009') {
					this.bussclassInfoRequired[index].valid = true;
				} else {
					this.bussclassInfoRequired[index].valid = false;
				}
			}
		},
		'paramsAll.biz_type_sub': {
			handler(newv, oldv) {
				// 业务品种 字段必输控制
				var item = { name: 'ir_match_type', checkType: 'notnull', errorMsg: '请选择定价基准参照日', valid: false };
				var index = this.arrHasObj(this.rateInfoRequired, item);
				if (newv == '022204' || newv == '022241') {
					this.rateInfoRequired[index].valid = true;
				} else {
					this.rateInfoRequired[index].valid = false;
				}
			}
		},
		'paramsAll.business_entity': {
			handler(newv, oldv) {
				if (this.paramsAll.business_entity == '00') {
					this.paramsAll.ishavecom = '1';
				} else {
					this.paramsAll.ishavecom = '2';
				}
				if (this.paramsAll.business_entity == '00') {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs6[0].$el.style.display = 'inline-block';
					});
				} else {
					this.$nextTick(() => {
						this.$refs.tabs.$refs.tabs6[0].$el.style.display = 'none';
					});
				}
			}
		},
		procategory: {
			handler(newv, oldv) {
				var str = '';
				var str1 = '';
				var item = ['pledge', 'TransactionClass', 'fixed_assets', 'policy', 'insurance', 'other_features'];
				for (var i = 0; i < item.length; i++) {
					if (this.procategory[item[i]]) {
						str = str + this.procategory[item[i]] + ',';
						for (var j = 0; j < this.procategory[item[i] + 'Arr'].length; j++) {
							var onew = this.procategory[item[i] + 'Arr'][j];
							str1 = str1 + onew.value + '-' + onew.label + ',\r\n';
						}
					}
				}
				str = str.substr(0, str.lastIndexOf(','));
				str1 = str1.substr(0, str1.lastIndexOf(','));
				this.bussclassInfo.ord_pro_category = str1.replace(/\r\n/g, '');
				this.ord_pro_categoryname = str1;
			},
			deep: true
		},
		'rateInfo.rate_exe_model': {
			handler(newv, oldv) {
				if (newv == '11') {
					this.selectdatair_adjust_mode = this.selectdata.ir_adjust_mode;
					this.rateInfo.ir_adjust_mode = '0';
				} else if (newv == '12') {
					this.selectdatair_adjust_mode = this.selectdata.ir_adjust_mode.slice(1, this.selectdata.ir_adjust_mode.length);
					console.log(this.selectdatair_adjust_mode);
					if ((this.isChange || this.isQueryDetail) && oldv == '') {
					} else {
						this.rateInfo.ir_adjust_mode = '';
					}
				} else {
					this.selectdatair_adjust_mode = this.selectdata.ir_adjust_mode;
					if ((this.isChange || this.isQueryDetail) && oldv == '') {
					} else {
						this.rateInfo.ir_adjust_mode = '';
					}
				}
				this.$forceUpdate();
			}
		},
		'rateInfo.discont_ind': {
			handler(newv, oldv) {
				var item = [{ name: 'discount_id', checkType: 'intNot0', errorMsg: '请选择贴息方编号', valid: false }];
				if (newv == '1') {
					this.discountListstart = this.discountListstart * 1;
					this.discountListcount = 10;
					this.getdiscountList(true);
				}
				return this.changeRequireStatus(item, 'rateInfo', 'discont_ind', 1);
			}
		},
		'rateInfo.repayment_mode': {
			handler(newv, oldv) {
				if (newv == '101') {
					this.rateInfo.interest_acc_mode = '14';
					this.selectdatainterest_acc_mode = this.selectdata.interest_acc_mode;
				} else if (newv == '201' || newv == '202') {
					this.rateInfo.interest_acc_mode = '13';
					this.selectdatainterest_acc_mode = this.selectdata.interest_acc_mode;
				} else {
					this.selectdatainterest_acc_mode = this.selectdata.interest_acc_mode.slice(0, this.selectdata.interest_acc_mode.length - 1);
					if ((this.isChange || this.isQueryDetail) && oldv == '') {
					} else {
						this.rateInfo.interest_acc_mode = '';
					}
				}

				if (newv == '201' || newv == '202') {
					var item = [{ name: 'is_free_time', checkType: 'notnull', errorMsg: '请选择是否免息', valid: false }];
					this.changeRequireStatus(item, 'rateInfo', 'repayment_mode', newv);
				}
			}
		},
		'rateInfo.interest_acc_mode': {
			handler(newv, oldv) {
				var item = [
					{ name: 'pay_cycle', checkType: 'notnull', errorMsg: '请选择缴息周期', valid: false },
					{ name: 'pay_period', checkType: 'notnull', errorMsg: '请选择缴息日期', valid: false }
				];
				this.changeRequireStatus(item, 'rateInfo', 'interest_acc_mode', '13');
			}
		},
		'rateInfo.is_free_time': {
			handler(newv, oldv) {
				var item = [
					{ name: 'free_time', checkType: 'int', errorMsg: '请输入免息期数', valid: false },
					{ name: 'discount_typ', checkType: 'notnull', errorMsg: '请选择付息方式', valid: false }
				];
				this.changeRequireStatus(item, 'rateInfo', 'is_free_time', 1);
			}
		},
		'directionInfo.agriculture_type': {
			handler(newv, oldv) {
				if (newv !== '' && newv != '00') {
					var item = [{ name: 'agriculture_use', checkType: 'notnull', errorMsg: '请选择涉农用途', valid: false }];
					this.changeRequireStatus(item, 'directionInfo', 'agriculture_type', newv);
				} else {
					var item = [{ name: 'agriculture_use', checkType: 'notnull', errorMsg: '请选择涉农用途', valid: false }];
					this.changeRequireStatus(item, 'directionInfo', 'agriculture_type', '01');
				}
			}
		},
		'personvchInfo.if_bst_motorcade': {
			handler(newv, oldv) {
				var item = [{ name: 'motorcade_name', checkType: 'notnull', errorMsg: '请输入挂靠单位', valid: false }];
				this.changeRequireStatus(item, 'personvchInfo', 'if_bst_motorcade', 1);
			}
		},
		'housesInfo.dsb_area': {
			handler(newv, oldv) {
				if (this.housesInfo.dsb_area && this.housesInfo.housing_total) {
					if (this.housesInfo.dsb_area * 1 != 0) {
						var price = (((this.housesInfo.housing_total * 1) / this.housesInfo.dsb_area) * 1).toFixed(2);
					} else {
						var price = '0.00';
					}
					this.housesInfo.sales_price = price;
				}
			}
		},
		'housesInfo.housing_total': {
			handler(newv, oldv) {
				if (this.housesInfo.dsb_area && this.housesInfo.housing_total) {
					if (this.housesInfo.dsb_area * 1 != 0) {
						var price = (((this.housesInfo.housing_total * 1) / this.housesInfo.dsb_area) * 1).toFixed(2);
					} else {
						var price = '0.00';
					}
					this.housesInfo.sales_price = price;
				}
			}
		},
		'housesInfo.houses_nature': {
			handler(newv, oldv) {
				var item = [
					{ name: 'ownerhip_no', checkType: 'notnull', errorMsg: '请输入原房屋所有权证编号', valid: false },
					{ name: 'houses_age', checkType: 'notnull', errorMsg: '请输入房龄', valid: false },
					{ name: 'assess_value', checkType: 'notnull', errorMsg: '请输入评估价值', valid: false },
					{ name: 'assess_organ', checkType: 'notnull', errorMsg: '请输入评估机构', valid: false },
					{ name: 'medium_flag', checkType: 'notnull', errorMsg: '请输入是否中介担保', valid: false },
					{ name: 'medium_name', checkType: 'notnull', errorMsg: '请输入中介名称', valid: false }
				];
				this.changeRequireStatus(item, 'housesInfo', 'houses_nature', 2);
			}
		},
		'applyInfo.term_time_type': {
			handler(newv, oldv) {
				if ((this.isChange || this.isQueryDetail) && oldv === '') {
					return;
				}
				this.notQueryinterestRateQuery = true;
				this.applyInfo.apply_term = '';
			}
		},
		'applyInfo.apply_term': {
			handler(newv, oldv) {
				if ((this.isChange || this.isQueryDetail) && oldv === '') {
				} else {
					this.notQueryinterestRateQuery = true;
				}
				this.applyInfo.apply_term = this.applyInfo.apply_term * 1 ? this.applyInfo.apply_term : '';
				if (this.applyInfo.term_time_type && this.applyInfo.apply_term) {
					// 日
					if (this.applyInfo.term_time_type == '01') {
						var date = new Date();
						var n = this.applyInfo.apply_term * 1;
						date.setDate(date.getDate() + n);
						this.applyInfo.end_date = date.Format('yyyy-MM-dd');
					} else if (this.applyInfo.term_time_type == '02') {
						//月
						var date = new Date();
						var n = this.applyInfo.apply_term * 1;
						date.setMonth(date.getMonth() + n);
						this.applyInfo.end_date = date.Format('yyyy-MM-dd');
					}
					this.$forceUpdate();
				}
			}
		},
		'rateInfo.floating_type': {
			handler(newv, oldv) {
				if ((this.isChange || this.isQueryDetail) && oldv === '') {
					return;
				}
				this.rateInfo.reality_ir_y = '';
				this.rateInfo.floating_rate = '';
			}
		},
		'personoptInfo.reality_controler_id_type': {
			handler(newv, oldv) {
				for (var i = 0; i < this.personoptInfoRequired.length; i++) {
					var element = this.personoptInfoRequired[i];
					if (element.name == 'reality_controler_id_code') {
						if (this.personoptInfo.reality_controler_id_type == '10') {
							this.personoptInfoRequired[i].checkType = 'certcode';
						} else {
							this.personoptInfoRequired[i].checkType = 'notnull';
						}
						break;
					}
				}
			}
		},
		'applyInfo.energy_flag': {
			handler(newv, oldv) {
				var item = [
					{ name: 'loan_for_energy', checkType: 'notnull', errorMsg: '请选择十强产业', valid: false },
					{ name: 'energy_name', checkType: 'notnull', errorMsg: '请输入十强产业名称', valid: false }
				];
				this.changeRequireStatus(item, 'applyInfo', 'energy_flag', 1);
			}
		},
		'assuremeansInfo.assure_means_main': {
			handler(newv, oldv) {
				if (this.assuremeansInfo.assure_means_main == this.assuremeansInfo.assure_means2 || this.assuremeansInfo.assure_means_main == this.assuremeansInfo.assure_means3) {
					uni.showToast({
						title: '担保方式不能相同',
						icon: 'none',
						duration: 1500
					});
					this.assuremeansInfo.assure_means_main = '';
				}
			}
		},
		'assuremeansInfo.assure_means2': {
			handler(newv, oldv) {
				if (this.assuremeansInfo.assure_means_main == this.assuremeansInfo.assure_means2 || this.assuremeansInfo.assure_means2 == this.assuremeansInfo.assure_means3) {
					uni.showToast({
						title: '担保方式不能相同',
						icon: 'none',
						duration: 1500
					});
					this.assuremeansInfo.assure_means2 = '';
				}
			}
		},
		'assuremeansInfo.assure_means3': {
			handler(newv, oldv) {
				if (this.assuremeansInfo.assure_means_main == this.assuremeansInfo.assure_means3 || this.assuremeansInfo.assure_means2 == this.assuremeansInfo.assure_means3) {
					uni.showToast({
						title: '担保方式不能相同',
						icon: 'none',
						duration: 1500
					});
					this.assuremeansInfo.assure_means3 = '';
				}
			}
		},
		'housesInfo.housing_val_typ': {
			handler(newv, oldv) {
				var item = [{ name: 'cif_area', checkType: 'squaremeter', errorMsg: '请输入套内建筑面积', error: '套内建筑面积请输入数字', notrequire: true, valid: false }];
				this.changeRequireStatus(item, 'housesInfo', 'housing_val_typ', '01');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tabstwo /deep/ .uni-tab-item-title {
	font-size: 24rpx;
}
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
	width: 50%;
}
.uni-column .minHeight2 {
	line-height: 1.5;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	width: 38%;
}
.iconfont.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
.iconRight {
	height: auto;
	padding-left: 14rpx;
	padding-right: 14rpx;
	font-size: 26rpx;
	line-height: 1.7;
	margin-left: 30rpx;
}

uni-button.iconRight.disableds {
	// border: 1px solid #abaeb3;
	border-color: #abaeb3 !important;
}
.mcform .uni-form-item.onerow .uni-input.tworowText {
	height: auto;
	line-height: 48rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	word-break: break-all;
}
.placehold {
	color: #c4c7cc;
}
.hasData .mcitem .mccontent {
	margin-right: 26rpx;
}
.mcitem .mclabel {
	margin-right: 30rpx;
}
.stock .mcitem .mclabel {
	margin-right: 26rpx;
}
.stock .mcitem .mccontent {
	margin-right: 26rpx;
}
.mcitem.btnline {
	margin: 10rpx 0 14rpx;
	margin-left: 28rpx;
}
.inline-btn {
	margin-top: 40rpx;
	margin-bottom: 40rpx;
}
.line-h {
	height: 1rpx;
	background-color: $mc-division;
}
.discountList {
	margin-bottom: 30rpx;
}

.discountList:last-child > .line-h {
	display: none;
}
.tworowTextell {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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
.mc-min-btn-primary.haveBg {
	background: #f2f6ff;
	color: #5d92ff;
	border: 1px solid #5d92ff;
	margin-left: 32rpx;
}
.listWrap {
	position: relative;
	margin-top: 40rpx;
}
.listWrap .inline-btn-right {
	margin-right: 20rpx;
}
.inline-btn .mc-min-btn-waring {
	float: left;
}
.inline-btn .mc-btn-right {
	float: left;
}
.mianRadius.wrapScroll {
	display: flex;
	flex-direction: column;
}
.listbox.wrapScroll {
	height: 100%;
	overflow: auto;
}
.listbox .listWrap .mcitem .mclabel {
	margin-left: 0;
}
#pageCheckID .placeholderss {
	color: #c4c7cc;
}
.uni-input.pickerTwoRowText /deep/ .uni-input {
	height: auto;
	line-height: 1.5;
	padding: 20rpx 0;
}
.bottomGap.topGap {
	margin-top: 20rpx;
}
.bottomGap.topGap::before {
	position: absolute;
	z-index: 10;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}
.pickerWrap.height100 > ul,
.pickerWrap.height100 uni-scroll-view {
	height: 100% !important;
}
.emptyData {
	margin-top: 40rpx;
}
.pdfprealtive {
	position: relative;
}
.pdfpabsolute {
	position: absolute;
	width: 194rpx;
	z-index: 1;
	right: 40rpx;
	top: 40rpx;
	background: red;
	height: 48rpx;
	line-height: 48rpx;
	background: #3679fe;
	color: #ffffff;
	font-size: 28rpx;
	background: image-set(url('@/static/img/ptop_button.png') 1x, url('@/static/img/ptop_button@2x.png') 2x, url('@/static/img/ptop_button@3x.png') 3x) no-repeat center center;
	background-size: contain;
}
</style>
