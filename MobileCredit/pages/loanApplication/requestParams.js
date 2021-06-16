export const requestParams = {
	// 所有参数
	paramsAll: {
		SaveFlag: "", //标志位
		AppFlag: "", //标志位
		resourceid: "YDYX", //来源系统
		prd_code: "", //产品编号
		prd_name: "", //产品名称
		business_entity: "", //是否有经营实体
		biz_type_sub: "", //业务品种细分
		bal_loan_sub_prd: "",//差额放款细分产品
		cus_id: "", //客户号
		cus_name: "", //客户名称
		loan_form: "", //贷款形式
		old_bill_no: "", //原借据号
		limit_ind: "", //授信额度使用标识
		limit_ma_no: "", //授信协议编号
		limit_acc_no: "", //授信台账编号
		floating_rate: "", //贷款利率幅度 (%)
		pt_ar_flag: "", //是否小微企业管理口径
		serno: "", //业务流水号
		apply_date: "", //申请日期
		//申请信息-开始
		contry_limit_flag: "", //是否国家限制行业
		authorize_flag: "", //是否授权内
		immediate_loan_flag: "", //即时续贷贷款
		indiv_loan_mout: "", //	本次申请贷款月债务支出
		capital_amt: "0", //	本金月分摊额
		coltis_uses: "", //	主担保下押品是否存在二次抵质押情况
		loan_start_date: "", //能源类型
		loan_record_int_flag: "", //	人行征信系统查询后该户有无贷款记录
		is_epidemic: "", //	是否防疫贷
		is_agricult: "", //	是否农易贷
		is_multiplex: "", //	是否复工贷
		//申请信息-结束
		//业务分类-开始
		cytd: "", //	创业通达
		pro_mode: "", //	业务模式
		ord_pro_category: "", //	业务品种
		//业务分类-结束
		//申请信息-开始
		energy_flag: "", //是否新旧动能转换十强产业
		loan_for_energy: "", //十强产业
		energy_name: "", //十强产业名称
		//申请信息-结束
		//担保方式-开始
		assure_means_main: "", //	主要担保方式
		assure_means2: "", //	担保方式2
		assure_means3: "", //	担保方式3
		//担保方式-结束
		//申请信息-开始
		apply_cur_type: "CNY", //	申请币种
		apply_amount: "", //	申请金额(元)
		apply_amount_init: "", //	初始申请金额(元)
		base_type: "02", //利率定价类型
		term_time_type: "", //	期限时间类型
		apply_term: "", //	申请期限
		end_date: "", //到期日
		//申请信息-结束
		//利率信息-开始
		ruling_ir: "", //	定价基准（年）
		cal_floating_ir: "", //审批利率上浮比例
		cal_floating_rate: "", //测算利率上浮比例
		floating_type: "", //利率浮动类型
		floating_rate: "", //利率浮动比/点数
		floating_rate_init: "", //初始利率浮动比/点数
		reality_ir_y: "", //执行年利率
		//利率信息-结束
		reality_ir_m: "", //执行月利率
		overdue_ir: "", //逾期月利率
		overdue_rate: "0.5", //逾期加罚比例
		default_ir: "", //转移用途月利率
		default_rate: "1", //转移用途加罚比例
		//利率信息-开始
		rate_exe_model: "", //	利率调整模式
		ir_adjust_mode: "", //利率调整方式
		ir_match_type:"", //定价基准参照日	
		intr_adj_strt_dt1: "", //利率调整起始日期
		ir_adjust_days: "", //定期周期(月)
		repayment_mode: "", //	还款方式
		is_free_time: "", //是否免息
		free_time: "", //免息期数
		discount_typ: "", //	付息方式
		discont_ind: "", //是否贴息
		discount_id: "", //	贴息方编号
		interest_acc_mode: "", //	结息方式
		pay_cycle: "", //缴息周期
		pay_period: "", //缴息日期
		//利率信息-结束
		//投向信息-开始
		loan_direction: "", //贷款投向
		direction_name: "", //投向名称
		agriculture_type: "", //涉农类型
		agriculture_use: "", //涉农用途
		use_dec: "", //申请借款用途
		repayment_src_dec: "", //还款来源
		//投向信息-结束
		//合作方信息-开始
		copartner_ind: "", //合作方标志
		//合作方信息-结束
		//支付信息-开始
		payment_type: "", //支付方式
		//支付信息-结束
		//意见信息-开始
		invst_concl: "", //调查人意见
		cla_result: "", //风险分类初分意见
		ten_result: "", //十级分类
		cla_suggestion: "", //分类理由
		//意见信息-结束
		//机构信息-开始
		remarks: "", //备注
		input_date: "", //登记日期
		investigator_id: "", //	营销人
		examinant_id: "", //协办客户经理
		//机构信息-结束
		input_id: "", //受理客户经理   用户码
		input_br_id: "", //	受理机构  机构码
		//经营贷-开始
		com_id: "", //单位代码
		com_name: "", //单位名称
		com_kind: "", //经济性质
		opt_dt: "", //经营期限
		reg_code: "", //登记注册号
		loan_card_id: "", //贷款卡编号
		reg_cap_amt: "", //注册资本
		reg_addr: "", //注册登记地址
		nat_tax_reg_code: "", //国税税务登记代码
		reality_controler_no: "", //实际控制人客户码
		reality_controler_name: "", //实际控制人姓名
		reality_controler_id_type: "", //实际控制人证件类型
		reality_controler_id_code: "", //实际控制人证件号码
		post_addr: "", //通讯地址
		com_main_opt_scp: "", //主营范围
		com_part_opt_scp: "", //兼营范围
		//经营贷-结束
		ishavecom: "", //个人经营是否有企业实体
		//住房、商品房-开始
		isselfhouse: "", //	是否以所购房产作为押品
		houses_nature: "", //	房屋属性
		housing_cont_id: "", //	购房合同编号
		booking_id: "", //	预售许可证编号
		buy_flag: "", //	是否首套房
		pledge_flag: "", //	是否预抵押
		housing_purpose: "", //房屋用途
		housing_status: "", //房屋状况
		housing_type: "", //	房屋类型
		housing_val_typ: "", //	房屋计价方式
		housing_loc: "", //房屋座落位置
		dsb_area: "", //	建筑面积(平方米)
		cif_area: "", //	套内建筑面积(平方米)
		sales_price: "", //	单位售价(元)
		housing_total: "", //房屋总价(元)
		down_payment: "", //	首付款金额(元)
		down_payment_rate: "", //	首付款比例
		pay_date: "", //	交房日期
		parce_name: "", //小区名称
		housing_arc: "", //	房屋结构
		land_use_way: "", //	土地使用方式
		land_remain_use_y: "", //	土地剩余使用年限
		mark_name: "", //售房人姓名
		ownerhip_no: "", //	原房屋所有权证编号
		houses_age: "", //	房龄(年)
		assess_value: "", //	评估价值(元)
		assess_organ: "", //	评估机构
		medium_flag: "", //	是否中介担保
		medium_name: "", //中介名称
		monthfee: "0", //	月物业管理费
		housing_position: "", //	房屋区位
		//住房、商品房-结束
		//个人消费贷款-汽车消费、个人经营贷-小微企业汽车贷款 -开始
		vch_cont_no: "", //购车合同编号
		vch_brand_name: "", //	购车品牌名称
		vch_model: "", //	车辆型号
		vch_price: "", //	车辆售价(不含税费和保险)
		production_date: "", //出厂日期
		vch_place: "", //	车辆产地
		vch_color: "", //	机动车交强险保单号
		insuance_no: "", //	机动车保险单号
		if_bst_motorcade: "", //	是否挂靠
		motorcade_name: "", //	挂靠单位
		if_sales_guatantee: "", //	是否销售商担保
		init_pay_amount: "", //	首付款金额
		buy_purpose: "", //	购买用途
		operating_way: "", //	营运路线
		carinfo: "", //	车况
		//个人消费贷款-汽车消费、个人经营贷-小微企业汽车贷款 -结束
		//个人消费贷款-住房装修/耐用品/留学/留学保证金/其他-开始
		spd_content: "", //	消费内容
		spd_amount: "", //	消费品总价(元)
		loan_percent: "", //	贷款成数(%)
		fitment_unit: "", //	装修单位/销售单位
		fitment_place: "", //装修地点/耐用品名称
		market_unit: "", //	销售单位
		durable_name: "", //耐用品名称
		country: "", //	留学国家
		country_money: "", //	所需资金证明金额
		//个人消费贷款-住房装修/耐用品/留学/留学保证金/其他-结束
	},
	//申请信息
	applyInfo:{
		bal_loan_sub_prd:"",
		cus_name: "", //客户名称
		contry_limit_flag: "", //是否国家限制行业
		authorize_flag: "", //是否授权内
		loan_start_date: "", //能源类型
		immediate_loan_flag: "", //即时续贷贷款
		indiv_loan_mout: "", //	本次申请贷款月债务支出--月债务支出
		capital_amt: "0", //	本金月分摊额
		coltis_uses: "", //	主担保下押品是否存在二次抵质押情况
		energy_flag: "", //是否新旧动能转换十强产业
		loan_for_energy: "", //十强产业
		energy_name: "", //十强产业名称
		loan_record_int_flag: "", //	人行征信系统查询后该户有无贷款记录
		is_epidemic: "", //	是否防疫贷
		is_agricult: "", //	是否农易贷
		is_multiplex: "", //	是否复工贷
		apply_cur_type: "CNY", //	申请币种
		apply_amount: "", //	申请金额(元)
		apply_amount_init: "", //	初始申请金额(元)
		base_type: "02", //利率定价类型
		term_time_type: "", //	期限时间类型
		apply_term: "", //	申请期限
		end_date: "", //到期日
	},
	applyInfoRequired:[
		{name:"cus_name",checkType:"notnull",errorMsg:"请输入客户名称"},
		{name:"contry_limit_flag",checkType:"notnull",errorMsg:"请选择是否国家限制行业"},
		{name:"authorize_flag",checkType:"notnull",errorMsg:"请选择是否授权内"},
		{name:"loan_start_date",checkType:"notnull",errorMsg:"请选择能源类型",valid:false},
		{name:"immediate_loan_flag",checkType:"notnull",errorMsg:"请选择即时续贷贷款"},
		{name:"indiv_loan_mout",checkType:"money",errorMsg:"请输入月债务支出",error:'月债务支出格式错误'},
		{name:"capital_amt",checkType:"money",errorMsg:"请输入本金月分摊额",error:'本金月分摊额格式错误',notrequire:true},
		{name:"coltis_uses",checkType:"notnull",errorMsg:"请选择主担保下押品是否存在二次抵质押情况"},
		{name:"energy_flag",checkType:"notnull",errorMsg:"请选择是否新旧动能转换十强产业"},
		{name:"loan_for_energy",checkType:"notnull",errorMsg:"请选择十强产业",valid:false},
		{name:"energy_name",checkType:"notnull",errorMsg:"请输入十强产业名称",valid:false},
		{name:"loan_record_int_flag",checkType:"notnull",errorMsg:"人行征信系统查询后该户有无贷款记录",valid:false},
		{name:"is_epidemic",checkType:"notnull",errorMsg:"请选择是否防疫贷",valid:false},
		{name:"is_agricult",checkType:"notnull",errorMsg:"请选择是否农易贷",valid:false},
		{name:"is_multiplex",checkType:"notnull",errorMsg:"请选择是否复工贷",valid:false},
		{name:"apply_cur_type",checkType:"notnull",errorMsg:"请选择申请币种"},
		{name:"apply_amount",checkType:"money",errorMsg:"请输入申请金额(元)",error:'申请金额格式错误'},
		// {name:"apply_amount_init",checkType:"money",errorMsg:"请输入初始申请金额(元)",error:'初始申请金额格式错误'},
		{name:"base_type",checkType:"notnull",errorMsg:"请选择利率定价类型",save:true},
		{name:"term_time_type",checkType:"notnull",errorMsg:"请选择期限时间类型",save:true},
		{name:"apply_term",checkType:"int",errorMsg:"请输入申请期限",save:true},
		{name:"end_date",checkType:"notnull",errorMsg:"请选择到期日",save:true},
		
	],
	bussclassInfo:{
		cytd: "", //	创业通达
		pro_mode: "", //	业务模式
		ord_pro_category: "", //	业务品种
	},
	bussclassInfoRequired:[
		{name:"pro_mode",checkType:"notnull",errorMsg:"请选择业务模式"},
		{name:"ord_pro_category",checkType:"notnull",errorMsg:"请选择业务品种",valid:false},
	],
	// 担保方式
	assuremeansInfo:{
		assure_means_main: "", //	主要担保方式
		assure_means2: "", //	担保方式2
		assure_means3: "", //	担保方式3
	},
	assuremeansInfoRequired:[
		{name:"assure_means_main",checkType:"notnull",errorMsg:"请选择主要担保方式"},
	],
	//利率信息
	rateInfo:{
		ruling_ir: "", //	定价基准（年）
		cal_floating_ir: "", //审批利率上浮比例
		floating_type: "", //利率浮动类型
		floating_rate: "", //利率浮动比/点数
		floating_rate_init: "", //初始利率浮动比/点数
		reality_ir_y: "", //执行年利率
		reality_ir_m: "", //执行月利率
		overdue_ir: "", //逾期月利率
		default_ir: "", //转移用途月利率
		rate_exe_model: "", //	利率调整模式
		ir_adjust_mode: "", //利率调整方式
		ir_match_type:"", //定价基准参照日	
		intr_adj_strt_dt1: "", //利率调整起始日期
		ir_adjust_days: "", //定期周期(月)
		discont_ind: "", //是否贴息
		discount_id: "", //	贴息方编号
		repayment_mode: "", //	还款方式
		is_free_time: "", //是否免息
		free_time: "", //免息期数
		discount_typ: "", //	付息方式
		interest_acc_mode: "", //	结息方式
		pay_cycle: "", //缴息周期
		pay_period: "", //缴息日期
	},
	rateInfoRequired:[
		{name:"cal_floating_ir",checkType:"percent",error:'审批利率上浮比例需输入大于或等于零的数值',notrequire:true},
		{name:"floating_type",checkType:"notnull",errorMsg:"请选择利率浮动类型"},
		{name:"floating_rate",checkType:"percent",errorMsg:"请输入利率浮动比/点数",error:'利率浮动比/点数需输入大于或等于的数值'},
		{name:"reality_ir_y",checkType:"percent",error:'执行年利率需输入大于或等于零的数值',notrequire:true},
		{name:"reality_ir_m",checkType:"percent",error:'执行月利率需输入大于零的数值'},
		{name:"overdue_ir",checkType:"percent",error:'逾期月利率需输入大于零的数值'},
		{name:"default_ir",checkType:"percent",error:'转移用途月利率需输入大于零的数值'},
		{name:"rate_exe_model",checkType:"notnull",errorMsg:"请选择利率调整模式"},
		{name:"ir_adjust_mode",checkType:"notnull",errorMsg:"请选择利率调整方式"},
		{name:"ir_match_type",checkType:"notnull",errorMsg:"请选择定价基准参照日",valid:false},
		{name:"intr_adj_strt_dt1",checkType:"notnull",errorMsg:"请选择利率调整起始日期",valid:false},
		{name:"ir_adjust_days",checkType:"intNot0",errorMsg:"请输入定期周期",error:"定期周期为大于零的整数",valid:false},
		{name:"discont_ind",checkType:"notnull",errorMsg:"请选择是否贴息"},
		{name:"discount_id",checkType:"notnull",errorMsg:"请选择贴息方编号",valid:false},
		{name:"repayment_mode",checkType:"notnull",errorMsg:"请选择还款方式"},
		{name:"is_free_time",checkType:"notnull",errorMsg:"请选择是否免息",valid:false},
		{name:"free_time",checkType:"int",errorMsg:"请输入免息期数",valid:false},
		{name:"discount_typ",checkType:"notnull",errorMsg:"请选择付息方式",valid:false},
		{name:"interest_acc_mode",checkType:"notnull",errorMsg:"请选择结息方式"},
		{name:"pay_cycle",checkType:"notnull",errorMsg:"请选择缴息周期",valid:false},
		{name:"pay_period",checkType:"notnull",errorMsg:"请选择缴息日期",valid:false},
	],
	directionInfo:{
		loan_direction: "", //贷款投向
		direction_name: "", //投向名称
		agriculture_type: "", //涉农类型
		agriculture_use: "", //涉农用途
		use_dec: "", //申请借款用途
		repayment_src_dec: "", //还款来源
	},
	directionInfoRequired:[
		{name:"loan_direction",checkType:"notnull",errorMsg:"请选择贷款投向",valid:false},
		{name:"agriculture_type",checkType:"notnull",errorMsg:"请选择涉农类型"},
		{name:"agriculture_use",checkType:"notnull",errorMsg:"请选择涉农用途",valid:false},
		{name:"use_dec",checkType:"notnull",errorMsg:"请输入申请借款用途"},
		{name:"repayment_src_dec",checkType:"notnull",errorMsg:"请输入还款来源"},
	],
	//合作方标志
	copartnerindInfo:{
		copartner_ind: "", //合作方标志
	},
	copartnerindInfoRequired:[
		{name:"copartner_ind",checkType:"notnull",errorMsg:"请选择合作方标志"},
	],
	
	// //支付方式
	paymentInfo:{
		payment_type: "", //支付方式
	},
	paymentInfoRequired:[
		{name:"payment_type",checkType:"notnull",errorMsg:"请选择支付方式"},
	],
	//意见信息
	invstconclInfo:{	
		invst_concl: "", //调查人意见
		cla_result: "", //风险分类初分意见
		ten_result: "", //十级分类
		cla_suggestion: "", //分类理由
	},
	invstconclInfoRequired:[
		{name:"invst_concl",checkType:"notnull",errorMsg:"请输入调查人意见"},
		{name:"cla_result",checkType:"notnull",errorMsg:"请选择风险分类初分意见"},
		{name:"ten_result",checkType:"notnull",errorMsg:"请选择十级分类"},
		{name:"cla_suggestion",checkType:"notnull",errorMsg:"请输入分类理由"},
	],
	//机构信息
	organizationInfo:{
		input_date: "", //登记日期
		investigator_id: "", //	营销人
		examinant_id: "", //协办客户经理
	},
	organizationInfoRequired:[
		{name:"input_date",checkType:"notnull",errorMsg:"请选择登记日期"},
		{name:"investigator_id",checkType:"notnull",errorMsg:"请选择营销人"},
		{name:"examinant_id",checkType:"notnull",errorMsg:"请选择协办客户经理"},
	],
	
	// 经营贷
	personoptInfo:{
		com_id: "", //单位代码
		com_name: "", //单位名称
		com_kind: "", //经济性质
		opt_dt: "", //经营期限
		reg_code: "", //登记注册号
		reg_cap_amt: "", //注册资本
		reg_addr: "", //注册登记地址
		nat_tax_reg_code: "", //国税税务登记代码
		reality_controler_no: "", //实际控制人客户码
		reality_controler_id_type: "", //实际控制人证件类型
		reality_controler_id_code: "", //实际控制人证件号码
		reality_controler_name: "", //实际控制人姓名
		post_addr: "", //通讯地址
		com_main_opt_scp: "", //主营范围
		com_part_opt_scp: "", //兼营范围
		// loan_card_id: "", //贷款卡编号
	},
	personoptInfoRequired:[
		{name:"com_id",checkType:"notnull",checkRule:'1,30',errorMsg:"请输入单位代码",error:'单位代码1-30个字符',notrequire:true},
		// {name:"com_name",checkType:"notnull",errorMsg:"请输入单位名称",valid:false},
		// {name:"com_kind",checkType:"notnull",errorMsg:"请输入经济性质",valid:false},
		{name:"opt_dt",checkType:"int",errorMsg:"请输入经营期限",error:'经营期限为数字' ,notrequire:true},
		// {name:"reg_code",checkType:"notnull",errorMsg:"请输入登记注册号",valid:false},
		{name:"reg_cap_amt",checkType:"money",errorMsg:"请输入注册资本",error:'注册资本请输入正确的金额',notrequire:true},
		// {name:"reg_addr",checkType:"notnull",errorMsg:"请输入注册登记地址",valid:false},
		// {name:"nat_tax_reg_code",checkType:"notnull",errorMsg:"请输入国税税务登记代码",valid:false},
		// {name:"reality_controler_no",checkType:"notnull",errorMsg:"请输入实际控制人客户码",valid:false},
		// {name:"reality_controler_id_type",checkType:"notnull",errorMsg:"请选择实际控制人证件类型",valid:false},
		{name:"reality_controler_id_code",checkType:"notnull",errorMsg:"请输入实际控制人证件号码",error:"实际控制人证件号码格式错误",notrequire:true},
		// {name:"reality_controler_name",checkType:"notnull",errorMsg:"请输入实际控制人姓名",valid:false},
		// {name:"post_addr",checkType:"notnull",errorMsg:"请输入通讯地址",valid:false},
		// {name:"com_main_opt_scp",checkType:"notnull",errorMsg:"请输入主营范围",valid:false},
		// {name:"com_part_opt_scp",checkType:"notnull",errorMsg:"请输入兼营范围",valid:false},
	],
	//个人消费贷款-汽车消费、个人经营贷-小微企业汽车贷款
	personvchInfo:{
		vch_cont_no: "", //购车合同编号
		vch_brand_name: "", //	购车品牌名称
		vch_model: "", //	车辆型号
		vch_price: "", //	车辆售价(不含税费和保险)
		production_date: "", //出厂日期
		vch_place: "", //	车辆产地
		vch_color: "", //	机动车交强险保单号
		insuance_no: "", //	机动车保险单号
		if_bst_motorcade: "", //	是否挂靠
		motorcade_name: "", //	挂靠单位
		if_sales_guatantee: "", //	是否销售商担保
		init_pay_amount: "", //	首付款金额
		buy_purpose: "", //	购买用途
		operating_way: "", //	营运路线
		carinfo: "", //	车况
	},
	personvchInfoRequired:[
		// {name:"vch_cont_no",checkType:"notnull",errorMsg:"请输入购车合同编号"},
		{name:"vch_brand_name",checkType:"notnull",errorMsg:"请输入购车品牌名称"},
		{name:"vch_model",checkType:"notnull",errorMsg:"请输入车辆型号"},
		{name:"vch_price",checkType:"money",errorMsg:"请输入车辆售价(不含税费和保险)",error:"车辆售价格式错误"},
		{name:"if_bst_motorcade",checkType:"notnull",errorMsg:"请选择是否挂靠"},
		{name:"motorcade_name",checkType:"notnull",errorMsg:"请输入挂靠单位",valid:false},
		{name:"if_sales_guatantee",checkType:"notnull",errorMsg:"请选择是否销售商担保"},
		{name:"init_pay_amount",checkType:"money",errorMsg:"请输入首付款金额",error:"首付款金额格式错误"},
		{name:"buy_purpose",checkType:"notnull",errorMsg:"请选择购买用途"},
		{name:"carinfo",checkType:"notnull",errorMsg:"请选择车况"},
	],
	//住房、商品房
	housesInfo:{
		isselfhouse: "", //	是否以所购房产作为押品
		houses_nature: "", //	房屋属性
		housing_cont_id: "", //	购房合同编号
		booking_id: "", //	预售许可证编号
		buy_flag: "", //	是否首套房
		pledge_flag: "", //	是否预抵押
		housing_purpose: "", //房屋用途
		housing_status: "", //房屋状况
		housing_type: "", //	房屋类型
		housing_val_typ: "", //	房屋计价方式
		housing_loc: "", //房屋座落位置
		dsb_area: "", //	建筑面积(平方米)
		cif_area: "", //	套内建筑面积(平方米)
		housing_total: "", //房屋总价(元)
		sales_price: "", //	单位售价(元)
		down_payment: "", //	首付款金额(元)
		down_payment_rate: "", //	首付款比例
		pay_date: "", //	交房日期
		parce_name: "", //小区名称
		housing_arc: "", //	房屋结构
		land_use_way: "", //	土地使用方式
		land_remain_use_y: "", //	土地剩余使用年限
		mark_name: "", //售房人姓名
		ownerhip_no: "", //	原房屋所有权证编号
		houses_age: "", //	房龄(年)
		assess_value: "", //	评估价值(元)
		assess_organ: "", //	评估机构
		medium_flag: "", //	是否中介担保
		medium_name: "", //中介名称
		monthfee: "0", //	月物业管理费
		housing_position: "", //	房屋区位
	},
	housesInfoRequired:[
		{name:"isselfhouse",checkType:"notnull",errorMsg:"请选择是否以所购房产作为押品"},
		{name:"houses_nature",checkType:"notnull",errorMsg:"请选择房屋属性"},
		{name:"buy_flag",checkType:"notnull",errorMsg:"请选择是否首套房"},
		{name:"pledge_flag",checkType:"notnull",errorMsg:"请选择是否预抵押"},
		{name:"housing_status",checkType:"notnull",errorMsg:"请选择房屋状况"},
		{name:"housing_type",checkType:"notnull",errorMsg:"请选择房屋类型"},
		{name:"housing_val_typ",checkType:"notnull",errorMsg:"请选择房屋计价方式"},
		{name:"housing_loc",checkType:"notnull",errorMsg:"请输入房屋座落位置"},
		{name:'dsb_area',checkType:'squaremeter',errorMsg:'请输入建筑面积',error:'建筑面积请输入数字',notrequire:true},
		{name:'cif_area',checkType:'squaremeter',errorMsg:'请输入套内建筑面积',error:'套内建筑面积请输入数字',notrequire:true,valid:false},
		{name:"housing_total",checkType:"money",errorMsg:"请输入房屋总价",error:"房屋总价金额格式错误"},
		{name:"down_payment",checkType:"money",errorMsg:"请输入首付款金额",error:"首付款金额格式错误"},
		{name:"down_payment_rate",checkType:"notnull",errorMsg:"请输入首付款比例"},
		{name:"parce_name",checkType:"notnull",errorMsg:"请输入小区名称"},
		{name:"housing_arc",checkType:"notnull",errorMsg:"请选择房屋结构"},
		{name:"land_use_way",checkType:"notnull",errorMsg:"请选择土地使用方式"},
		{name:'land_remain_use_y',checkType:'int',errorMsg:'请输入土地剩余使用年限',error:'土地剩余使用年限请输入数字',notrequire:true},
		{name:"ownerhip_no",checkType:"notnull",errorMsg:"请输入原房屋所有权证编号",valid:false},
		{name:"houses_age",checkType:"int",errorMsg:"请输入房龄",error:'房龄请输入数字',valid:false},
		{name:"assess_value",checkType:"money",errorMsg:"请输入评估价值",error:"评估价值格式错误",valid:false},
		{name:"assess_organ",checkType:"notnull",errorMsg:"请输入评估机构",valid:false},
		{name:"medium_flag",checkType:"notnull",errorMsg:"请输入是否中介担保",valid:false},
		{name:"medium_name",checkType:"notnull",errorMsg:"请输入中介名称",valid:false},
		{name:"monthfee",checkType:"money",errorMsg:"请输入月物业管理费",error:"月物业管理费格式错误",notrequire:true},
		{name:"housing_position",checkType:"notnull",errorMsg:"请选择房屋区位"},
	],
	//个人消费贷款-住房装修
	housingFitmentInfo:{
		spd_amount: "", //	消费品总价(元)
		loan_percent: "", //	贷款成数(%)
		fitment_unit: "", //	装修单位
		fitment_place: "", //装修地点
	},
	housingFitmentInfoRequired:[
		{name:"spd_amount",checkType:"money",errorMsg:"请输入消费品总价",error:'消费品总价格式错误'},
		{name:"loan_percent",checkType:"percent",errorMsg:"请输入贷款成数",error:'贷款成数需输入大于或等于零的数值'},
		{name:"fitment_place",checkType:"notnull",errorMsg:"请输入装修地点"},
	],
	//个人消费贷款-耐用品
	housingdurableInfo:{
		spd_amount: "", //	消费品总价(元)
		loan_percent: "", //	贷款成数(%)
		market_unit: "", //	销售单位
		durable_name: "", //耐用品名称
	},
	housingdurableInfoRequired:[
		{name:"spd_amount",checkType:"money",errorMsg:"请输入消费品总价",error:'消费品总价格式错误'},
		{name:"loan_percent",checkType:"percent",errorMsg:"请输入贷款成数",error:'贷款成数需输入大于或等于零的数值'},
		{name:"durable_name",checkType:"notnull",errorMsg:"请输入耐用品名称"},
	],
	// 留学保证金
	countrymoneyInfo:{
		spd_content: "", //	消费内容
		country: "", //	留学国家
		country_money: "", //	所需资金证明金额
	},
	countrymoneyInfoRequired:[
		{name:"spd_content",checkType:"notnull",errorMsg:"请选择消费内容"},
	],
	// /留学
	countryInfo:{
		spd_content: "20", //	消费内容
		spd_amount: "", //	消费品总价(元)
		loan_percent: "", //	贷款成数(%)
	},
	countryInfoRequired:[
		{name:"spd_content",checkType:"notnull",errorMsg:"请选择消费内容"},
		{name:"spd_amount",checkType:"money",errorMsg:"请输入消费品总价",error:'消费品总价格式错误'},
		{name:"loan_percent",checkType:"percent",errorMsg:"请输入贷款成数",error:'贷款成数需输入大于或等于零的数值'},
	],
	//其他
	otherandCountInfo:{
		spd_content: "", //	消费内容
		spd_amount: "", //	消费品总价(元)
		loan_percent: "", //	贷款成数(%)
		market_unit: "", //	销售单位
	},
	otherandCountInfoRequired:[
		{name:"spd_content",checkType:"notnull",errorMsg:"请选择消费内容"},
		{name:"spd_amount",checkType:"money",errorMsg:"请输入消费品总价",error:'消费品总价格式错误'},
		{name:"loan_percent",checkType:"percent",errorMsg:"请输入贷款成数",error:'贷款成数需输入大于或等于零的数值'},
	],
	
	
	
	
	
	addachInfoAll: {
		AppFlag: "", //	操作类型
		cus_id: "", //	客户号
		cus_name: "", //	客户名称
		cert_code: "", //	证件号
		cert_type: "", //	证件类型
		remarks: "", //	描述信息
		cus_typ: "", //	保证人类型
		guaranty_type: "", //	保证担保形式
		guarantee_type: "", //	保证方式
		max_guarantee_capa: "", //	保证人能力（元）
		amount: "", //	金额
		is_loc: "", //	受托支付是否行内标志
		benifit_acc: "", //	账号
		benifit_acc_bef: "", // 原账号
		benifit_name: "", //	账号户名
		benifit_bank_id: "", //	行号
		benifit_bank: "", //	行名
		etp_in_tx_typ: "", //	行内模式
		etp_out_tx_typ: "", //	行外模式
		cop_cont_no: "", //	合作方协议编号
		cop_acc_no: "", //	合作方台账编号
		lmt_balance: "", //	合作方占用金额
		cop_use_amt: "", //	本次占用金额
		guaranty_id: "", //	押品编号

	},
	//新增合作方信息
	basiccopartner_list:[],
	basicCollaboratoraddInfo:{
		cus_id:"",//	客户号
		cus_name:"",//	客户名称
		amount:"",//	金额
		cop_acc_no:"",//	合作方台账编号
		lmt_balance	:"",//合作方占用金额
		cop_cont_no: "", //	合作方协议编号
		cop_use_amt: "", //	本次业务占用金额（元）
	},
	basicCollaboratoraddInfoRequired:[
		{name:"cop_cont_no",checkType:"notnull",errorMsg:"请选择合作方协议编号"},
		{name:"cop_use_amt",checkType:"money",errorMsg:"请输入本次业务占用金额",error:"本次业务占用金额格式错误"},
	],
	// 支付信息数据
	basicpayment_list:[],
	basicPayaddInfo: {
		is_loc: "", //	受托支付是否行内标志
		benifit_acc: "", //	账号
		benifit_name: "", //	账号户名
		benifit_bank_id: "", //行号
		benifit_acc_bef: "", // 原账号
		benifit_bank: "", //	行名
		amount: "", //	金额 Y：支付总金额等于业务申请金额
		etp_in_tx_typ: "", //	行内模式 is_loc为1时 必输 受托支付行内转账模式
		etp_out_tx_typ: "", //	行外模式 is_loc为2时 必输 受托支付行外转账模式
		pay_date: "", //	描述信息 -支付时间
		remarks: "", //	描述信息 -用途
	
	},
	basicPayaddInfoRequired:[
		{name:"is_loc",checkType:"notnull",errorMsg:"请选择受托支付是否行内标志"},
		{name:"benifit_acc",checkType:"notnull",errorMsg:"请输入账号"},
		{name:"benifit_name",checkType:"notnull",errorMsg:"请输入账号户名"},
		{name:"benifit_bank_id",checkType:"reg",checkRule:'([0-9]{14})|([0-9]{12})',errorMsg:"请输入开户行行号",error:"开户行行号为12或14位",notrequire:true},
		{name:"benifit_bank",checkType:"notnull",errorMsg:"请输入开户行行名"},
		{name:"amount",checkType:"money",errorMsg:"请输入付款金额"},
		{name:"etp_in_tx_typ",checkType:"notnull",errorMsg:"请选择受托支付行内转账模式",valid:false},
		{name:"etp_out_tx_typ",checkType:"notnull",errorMsg:"请选择受托支付行外转账模式",valid:false},
		{name:"remarks",checkType:"notnull",errorMsg:"请输入用途"},
	],
	// 还款计划信息
	basicRepayList:[
		//用来存储页面列表数据-去修改中通过index来确定回显数据
	],
	basicRepayInfo: {
		AppFlag:"",	//操作类型
		pk_value:"",	//还款信息标识
		repay_amt:"",	//金额
		repay_date:"",	//还款日
		send_flag:"2",//是否发送核心
	},
	basicRepayInfoRequired:[
		{name:"repay_amt",checkType:"money",errorMsg:"请输入还款金额"},
		{name:"repay_date",checkType:"notnull",errorMsg:"请选择还款日期"},
		{name:"send_flag",checkType:"notnull",errorMsg:"请选择是否成功发送核心"},
	],
	//共债人信息
	basicdebtor_list:[],
	basicDebtoraddInfo: {
		cus_id: "", //	客户号
		cus_name: "", //	客户名称
		cert_type: "", //	证件类型
		cert_code: "", //	证件号

	},
	basicDebtoraddInfoRequired:[
		{name:"cus_id",checkType:"notnull",errorMsg:"请选择客户号"},
		{name:"cus_name",checkType:"notnull",errorMsg:"请输入客户名称"},
		{name:"cert_type",checkType:"notnull",errorMsg:"请选择证件类型"},
		{name:"cert_code",checkType:"certcode",errorMsg:"请输入证件号"},
	],
	//担保人信息
	basicguaranty_list:[],
	baseguarantoraddInfo: {
		cus_id: "", //	客户号
		cus_typ: "", //保证人类型
		cus_name: "", //	客户名称
		cert_code: "", //	证件号
		cert_type: "", //	证件类型
		guaranty_type: "", //	保证担保形式
		guarantee_type: "", //	保证方式
		max_guarantee_capa: "", //	保证人能力（元）
		amount: "", //	金额  Y:担保金额小于保证人能力 
		guaranty_id: "", //	押品编号  修改，删除时为Y

	},
	baseguarantoraddInfoRequired:[
		{name:"cus_id",checkType:"notnull",errorMsg:"请选择保证人客户号"},
		{name:"cus_typ",checkType:"notnull",errorMsg:"请选保证人类型"},
		{name:"cus_name",checkType:"notnull",errorMsg:"请输入保证人名称"},
		{name:"cert_type",checkType:"notnull",errorMsg:"请选择证件类型"},
		{name:"cert_code",checkType:"certcode",errorMsg:"请输入证件号"},
		{name:"guaranty_type",checkType:"notnull",errorMsg:"请选择保证担保形式"},
		{name:"guarantee_type",checkType:"notnull",errorMsg:"请选择保证方式"},
		{name:"amount",checkType:"money",errorMsg:"请输入担保金额",error:'担保金额格式错误'},
		{name:"max_guarantee_capa",checkType:"money",errorMsg:"请输入保证人保证能力上限",error:'保证人保证能力上限格式错误'},
	],
	// 经营实体
	basicbuss_list:[],
	basicbusinessaddInfo: {
		cert_type: "", //	证件类型
		cert_code: "", //	证件号
		cus_id: "", //	客户号
		cus_name: "", //	客户名称
	
	},
	basicbusinessaddInfoRequired:[
		{name:"cert_type",checkType:"notnull",errorMsg:"请选择证件类型"},
		{name:"cert_code",checkType:"notnull",errorMsg:"请输入证件号"},
		{name:"cus_id",checkType:"notnull",errorMsg:"请选择客户号"},
		{name:"cus_name",checkType:"notnull",errorMsg:"请输入客户名称"},
	],
	basicCreditInspectResult:[],
	CreditInspectResult:{
		number:"",//	记录编号
		cus_id:"",//	客户号
		cus_name:"",//	客户名称
		cert_code:"",//	证件号
		cert_type:"",//	证件类型
		result_code:"",//	绑定结果标识
		result_msg:"",//	绑定结果描述
		query_date:"",//	查询日期
		serial_number:"",//	征信绑定流水号
		cus_type:"",//	客户类型
	},
	CreditInspectResultRequired:[
		{name:"serial_number",checkType:"notnull",errorMsg:"请输入征信绑定流水号"},
	]
}
