export const requestParams = {
	// 所有参数
	paramsAll: {
		AppFlag: '0', //	标志位 新增客户传：0新增；修改客户传：1修改
		SaveFlag: '1', //	标志位 页面点击保存，传：0暂存  页面点击提交，传：1提交
		cus_status: '', //	客户状态 提交时传： 01临时客户 05担保客户 20正式客户   保存时传： 00 草稿客户(正式)  01 临时客户  02 草稿客户(担保)
		// cust_mgr: '', //	主管客户经理
		// main_br_id: '', //	主管机构
		// cus_id: '', //	客户号  修改时必须要送；信贷系统返回的客户号，非核心客户号
		// trans_cus_id: '', //	核心客户号  正式客户提交时必传
		//客户基本信息
		// cus_type: '', //	客户类型
		cert_type: '', //	证件类型
		cert_code: '', //	证件号码
		long_flag: '', //	证件是否长期有效 
		// indiv_id_sta_dt: '', //	证件开始日
		indiv_id_exp_dt: '', //	证件到期日
		cus_name: '', //	姓名
		// en_name: '', //	英文名称
		indiv_dt_of_birth: '', //	出生日期
		// agri_flg: '', //	是否农户
		// is_farming: '', //	是否农业专业大户
		// is_farmcoop: '', //	是否家庭农场
		// cus_bank_rel: '', //	与我行关系
		// is_bank_stk: '', //	是否我行股东
		// com_hold_stk_amt: '', //	拥有我行股份金额(元)
		// bank_duty: '', //	在我行职务
		// blist_flag: '', //	上本行黑名单标志
		// blist_date: '', //	上黑名单日期
		// blist_reason: '', //	上黑名单原因
		// walk_dt: '', //	最近走访日期
		// check_dt: '', //	最近稽查日期
		// is_tax: '', //	渠道来源
		// new_cus: '', //	是否新客户
		// undertake_cus: '', //	是否承接类客户
		// integstatus: '', //	诚信状况
		// transparency: '', //	信息透明度
		// isretaliate: '', //	是否进入全国法院失信被执行人名单
		// isexecuted: '', //	是否在全国法院被执行人信息查询中有记录且正在执行中
		//客户基本信息-结束
		//经营情况
		/* reg_flag: '', //	是否有营业执照
		reg_code: '', //	登记注册号
		word_name: '', //	单位名称
		reg_org: '', //	发照机关
		reg_type: '', //	组成形式
		oper_place: '', //	经营场所
		oper_range_way: '', //	经营范围及方式
		reg_start_date: '', //	营业执照起始日
		reg_end_date: '', //	营业执照到期日
		ins_code_flag: '', //	是否有组织机构代码
		indiv_ins_code: '', //	组织机构代码
		ins_code_date: '', //	组织机构代码有效期
		operator_name: '', //	经营者姓名
		reg_desc: '', *///	备注
		//经营情况-结束
		//客户基本信息
		indiv_country: '', //	国别
		// indiv_brt_place: '', //	籍贯
		indiv_houh_reg_add: '', //	户籍地址
		now_address: '', //	现住地址
		indiv_sex: '', //	性别
		indiv_ntn: '', //	民族
		// now_hous_type: '', //	现住房类别
		// now_property_nature: '', //	现住房产权类别
		// indiv_pol_st: '', //	政治面貌
		// indiv_edt: '', //	最高学历
		// edt_remark: '', //	学位说明
		// indiv_dgr: '', //	最高学位
		// indiv_heal_st: '', //	健康状况
		// is_business_owner: '2', //	是否为企业主
		// com_str_date: '', //	企业成立年月(格式:yyyy-mm)
		// startworkdate: '', //	经营起始年份
		// yearlamt: '', //	最近一个完整年度营业收入（元）
		// com_opt_owner: '', //	经营场地所有权
		// indiv_soc_scr: '', //	社会保障情况
		// localflag: '', //	是否本地人
		// islocalcom: '', //	工作单位是否本地
		// residencecompliancedflag: '', //	是否在经营地有固定住所
		// ishaveloacalhourse: '', //	是否拥有本地房产
		// localresidenceyear: '', //	本地居住年限
		// careeryear: '', //	工作年限
		// familymonthincome: '', //	家庭月收入(元)
		// familysum: '', //	家庭人数
		// childrensum: '', //	家庭子女人数
		// supportnumber: '', //	供养人数（没有独立经济能力的配偶或子女）
		// termyear: '', //	借款人从事当前经营行业起始年份 - 从事当前经营行业起始年份
		// postcodetax: '', //	居住邮编
		//客户基本信息-结束
		//婚姻状况
		/* indiv_mar_st: '', //	婚姻状况
		indiv_sps_id_typ: '', //	配偶证件类型
		indiv_sps_id_code: '', //	配偶证件号码
		cus_id_rel: '', //	配偶客户号
		indiv_sps_name: '', //	配偶姓名
		indiv_sps_mar_code: '', //	结婚证号(户口簿号)
		indiv_sps_occ: '', //	职业
		indiv_scom_name: '', //	工作单位
		indiv_sps_duty: '', //	职务
		indiv_psp_crtfctn: '', //	职称
		indiv_sps_mphn: '', //	手机号码
		indiv_sps_phn: '', //	单位电话
		indiv_sps_mincm: '', //	配偶月收入(元)
		indiv_sps_job_dt: '', //	参加工作年份
		indiv_sps_out: '', *///	配偶月债务支出
		//婚姻状况-结束
		//财务资产
		/* indiv_ann_mouth: '', //	个人月收入(元)
		on_debt_payments: '', //	月债务支出(元)
		indiv_dept_rate: '', //	家庭支出收入比例
		liquidity: '', //	其他流动资产(元)
		debt_amt: '', //	负债总额(元)
		fixed: '', //	固定资产(元)
		fixed_desc: '', */ //	固定资产说明(请输入房产、汽车、有价证劵等信息)
		//财务资产-结束
		//其他
		/* loan_card_flg: '', //	有无中征码（原贷款卡）
		loan_card_id: '', //	中征码(原贷款卡号)
		loan_card_eff_flg: '', //	中征码（原贷款卡）状态
		com_init_loan_date: '', //	建立信贷关系时间
		indiv_hld_acnt: '', //	在我行开立账户情况
		hold_card: '', *///	持卡情况
		//其他-结束
		/* crd_grade: '00', //	信用等级（内部）
		crd_date: '', //	评定日期内部（内部）
		crd_end_dt: '', *///	评定到期日期内部（内部）
		// remark: '', //	备注
		//联系信息
		same_curadd_flg:'',// 是否与现住地址相同
		post_addr: '', //	通讯地址
		post_code: '', //	邮政编码
		/* indiv_rsd_st: '', //	居住状况
		indiv_lcl_flg: '', *///	是否异地
		area_code: '', //	区域编号
		area_name: '', //	区域名称
		// fphone: '', //	住宅电话
		mobile: '', //	手机号码
		mobile2: '', //	备用手机号
		phone: '', //	短信通知号
		// fax_code: '', //	传真
		email: '', //	Email地址
		//联系信息-结束
		//单位信息
		/* indiv_occ: '', //	职业
		indiv_com_name: '', //	工作单位
		indiv_com_typ: '', //	单位性质
		indiv_com_fld: '', //	单位所属行业
		indiv_com_fld_name: '', //	单位所属行业名称
		indiv_com_addr: '', //	单位地址
		indiv_com_zip_code: '', //	单位邮编
		indiv_com_phn: '', //	单位电话
		indiv_com_fax: '', //	单位传真
		indiv_com_cnt_name: '', //	单位联系人
		indiv_work_job_y: '', //	单位工作起始年月(格式:yyyy-mm)  参加工作年月
		indiv_com_job_ttl: '', //	职务
		indiv_crtfctn: '', //	职称
		work_resume: '', //	个人简历
		employeenumber: '', //	企业职工人数
		officeadd: '', //	企业办公地址
		officezip: '', //	企业邮政编码
		hasieright: '', //	企业有无进出口经营权
		workfieldfee: '', //	企业经营场地所有权
		enviromenteriendlyflag: '', //	企业是否环境达标 */
		//单位信息-结束
		//其他
		/* market_id: '', //	营销人
		market_br_id: '', //	营销机构 */
		//其他-结束
		/* input_date: '', //	登记日期
		last_upd_date: '', //	更新日期 */
		// last_upd_id: '', //更新人
		// 家庭资产--部分
		// ass_list:[]
		// 家庭资产--部分结束
	},
	/* setRequrieAssListData:[
		{
			indiv_ass_flag: '', //	新增/修改标识
			indiv_ass_id: '', //	资产编号
			indiv_ass_type: '', //	资产类别
			indiv_ass_name: '', //	资产名称
			indiv_ass_plr: '', //	资产单位
			indiv_ass_num: '', //	资产数量
			indiv_ass: '', //	资产估价(元)
			com_ass_status: '', //	抵押状况
			indiv_ass_des: '', //	资产描述
			remark_indiv: '', //	备注
		}
	], */
	// paramsAllAssList:[],
	paramsAllSave:{},
	paramsAllRequired:[],
	// 临时客户参数
	temporary: {
		cus_name: '', //	姓名
		// cus_type: '', //	客户类型
		cert_type: '10', //	证件类型
		cert_code: '', //	证件号码
		indiv_sex: '', //	性别
		indiv_dt_of_birth: '', //	出生日期
		indiv_country: 'CHN', //	国别
		/* indiv_edt: '', //	最高学历
		indiv_dgr: '', //	最高学位 */
		// edt_remark: '', //	学位说明  最高学历为硕士研究生、最高学位为其他、学士、未知时必输  最高学历为大学本科、最高学位不为学士时必输
		// indiv_work_job_y: '', //	单位工作起始年月(格式:yyyy-mm)  参加工作年月
		/* indiv_ann_mouth: '', //	个人月收入(元)
		on_debt_payments: '', //	月债务支出(元) */
		// isretaliate: '', //	是否进入全国法院失信被执行人名单
		// isexecuted: '', //	是否在全国法院被执行人信息查询中有记录且正在执行中
		// integstatus: '', //	诚信状况
		/* termyear: '', //	借款人从事当前经营行业起始年份 - 从事当前经营行业起始年份
		indiv_mar_st: '', //	婚姻状况
		supportnumber: '', //	供养人数（没有独立经济能力的配偶或子女）
		childrensum: '', //	家庭子女人数 */
		// indiv_occ: '', //	职业
		/* indiv_com_job_ttl: '', //	职务
		indiv_crtfctn: '', //	职称 */
		// indiv_com_name: '', //	工作单位
		post_addr: '', //	通讯地址
		post_code: '', //	邮政编码
		// area_name: '', //	区域名称
		// area_code: '', //	区域编号
		// indiv_com_phn: '', //	单位电话
		// fphone: '', //	住宅电话
		mobile: '', //	手机号码
		// phone: '', //	短信通知号
		/* work_resume: '', //	个人简历
		last_upd_id: '', //更新人 */
		last_upd_date: '' ,//	更新日期
		input_date: '', //	登记日期
	},
	notAllowInAppFlag1:[
		{name:'cert_type'},
		{name:'cert_code'},
		{name:'post_addr'},
		{name:'mobile'},
		// {name:'indiv_sex'}, // 临时客户新增及修改操作都可修改该字段
		// {name:'indiv_dt_of_birth'}, // 临时客户可修改
	],
	// 临时客户必填项
	temporaryRequired: [
		// {name:'cus_type',checkType:'notnull',errorMsg:'请选择客户类型',save:true,},
		{name:'cus_name',checkType:'notnull',errorMsg:'请输入姓名',save:true},
		{name:'cert_type',checkType:'notnull',errorMsg:'请选择证件类型',save:true},
		{name:'cert_code',checkType:'certcode',errorMsg:'请输入证件号码',error:'证件号码格式错误',save:true},
		{name:'indiv_sex',checkType:'notnull',errorMsg:'请选择性别'},
		{name:'indiv_country',checkType:'notnull',errorMsg:'请选择国别'},
		// {name: 'edt_remark',checkType: 'string',checkRule: '1,200',errorMsg: '请输入学位说明',error: '学位说明最多为200个字符',notrequire:true},
		// {name:'indiv_ann_mouth',checkType:'money',errorMsg:'请输入个人月收入',error:'个人月收入格式错误'},
		// {name:'on_debt_payments',checkType:'money',errorMsg:'请输入月债务支出',error:'月债务支出格式错误'},
		// {name:'termyear',checkType:'year',errorMsg:'请输入从事当前经营行业起始年份'},
		// {name:'indiv_mar_st',checkType:'notnull',errorMsg:'请选择婚姻状况'},
		// {name:'supportnumber',checkType:'int',errorMsg:'请输入供养人数',error:'供养人数为数字'},
		// {name:'childrensum',checkType:'int',errorMsg:'请输入家庭子女人数',error:'家庭子女人数为数字'},
		// {name:'indiv_com_name',checkType:'notnull',errorMsg:'请输入工作单位'},
		// {name:'post_code',checkType:'postcode',errorMsg:'请输入邮政编码',error:'邮政编码格式错误'},
		// {name:'area_name',checkType:'notnull',errorMsg:'请选择区域名称'},
		// {name:'area_code',checkType:'notnull',errorMsg:'请输入区域编号'},
		// {name:'indiv_com_phn',checkType:'notnull',errorMsg:'请输入单位电话'},
		{name:'mobile',checkType:'phoneno',errorMsg:'请输入手机号码',error:'手机号码格式错误'},
	],
	// 客户基本信息
	userBaseInfo:{
		cus_name: '', //	姓名
		indiv_sex: '', //	性别
		// cus_type: '', //	客户类型
		cert_type: '10', //	证件类型
		cert_code: '', //	证件号码
		indiv_country: 'CHN', //	国别
		indiv_ntn: '01', //	民族
		indiv_dt_of_birth: '', //	出生日期
		indiv_houh_reg_add: '', //	户籍地址
		now_address: '', //	现住地址
		long_flag: '', //	证件是否长期有效
		indiv_id_sta_dt: '', //	证件开始日
		indiv_id_exp_dt: '', //	证件到期日  证件是否长期有效为2时必填
		// en_name: '', //	英文名称
		agri_flg: '', //	是否农户
		// is_farming: '', //	是否农业专业大户
		// is_farmcoop: '', //	是否家庭农场
		// cus_bank_rel: '', //	与我行关系
		/* is_bank_stk: '', //	是否我行股东
		com_hold_stk_amt: '', //	拥有我行股份金额(元)
		bank_duty: '', //	在我行职务
		blist_flag: '', //	上本行黑名单标志
		blist_date: '', //	上黑名单日期
		blist_reason: '', //	上黑名单原因
		walk_dt: '', //	最近走访日期
		check_dt: '', //	最近稽查日期
		is_tax: '', //	渠道来源 */
		// new_cus: '', //	是否新客户
		// undertake_cus: '', //	是否承接类客户
		// integstatus: '', //	诚信状况
		// transparency: '', //	信息透明度
		// isretaliate: '', //	是否进入全国法院失信被执行人名单
		// isexecuted: '', //	是否在全国法院被执行人信息查询中有记录且正在执行中
	},
	// 客户基本信息必填项
	userBaseInfoRequired:[
		// {name:'cus_type',checkType:'notnull',errorMsg:'请选择客户类型',save:true},
		{name:'cus_name',checkType:'notnull',errorMsg:'请输入姓名',save:true},
		{name:'indiv_sex',checkType:'notnull',errorMsg:'请选择性别'},
		{name:'cert_type',checkType:'notnull',errorMsg:'请选择证件类型',save:true},
		{name:'cert_code',checkType:'certcode',errorMsg:'请输入证件号码',error:'证件号码格式错误',save:true},
		{name:'indiv_country',checkType:'notnull',errorMsg:'请选择国别'},
		{name:'indiv_ntn',checkType:'notnull',errorMsg:'请选择民族'},
		// {name:'indiv_dt_of_birth',checkType:'notnull',errorMsg:'请选择出生日期'},
		// {name:'indiv_houh_reg_add',checkType:'notnull',errorMsg:'请输入户籍地址'},
		{name:'now_address',checkType:'notnull',errorMsg:'请输入现住地址'},
		{name:'long_flag',checkType:'notnull',errorMsg:'请选择证件是否长期有效'},
		{name:'indiv_id_exp_dt',checkType:'notnull',errorMsg:'请选择证件到期日',valid:false},
		// {name:'agri_flg',checkType:'notnull',errorMsg:'请选择是否农户'},
		// {name:'is_farming',checkType:'notnull',errorMsg:'请选择是否农业专业大户',valid:false},
		// {name:'is_farmcoop',checkType:'notnull',errorMsg:'请选择是否家庭农场',valid:false},
		// {name:'is_bank_stk',checkType:'notnull',errorMsg:'请选择是否我行股东'},
		// {name:'cus_bank_rel',checkType:'notnull',errorMsg:'请选择与我行关系'},
		// {name:'com_hold_stk_amt',checkType:'money',errorMsg:'请输入拥有我行股份金额',error:'拥有我行股份金额格式错误',valid:false},
		// {name:'is_tax',checkType:'notnull',errorMsg:'请选择渠道来源'},
		// {name:'new_cus',checkType:'notnull',errorMsg:'请选择是否新客户'},
		// {name:'undertake_cus',checkType:'notnull',errorMsg:'请选择是否承接类客户'},
	],
	// 经营情况
	/* businessInfo:{
		reg_flag: '', //	是否有营业执照
		reg_code: '', //	登记注册号
		word_name: '', //	单位名称
		reg_org: '', //	发证机关
		reg_type: '', //	组成形式
		oper_place: '', //	经营场所
		oper_range_way: '', //	经营范围及方式
		reg_start_date: '', //	营业执照起始日
		reg_end_date: '', //	营业执照到期日
		ins_code_flag: '', //	是否有组织机构代码
		indiv_ins_code: '', //	组织机构代码  ins_code_flag为是时必填
		ins_code_date: '', //	组织机构代码有效期 ins_code_flag为是时必填
		operator_name: '', //	经营者姓名
		reg_desc: '', //	备注
	}, */
	// 经营情况必填项
	/* businessInfoRequired:[
		{name:'reg_flag',checkType:'notnull',errorMsg:'请选择是否有营业执照'},
		{name:'reg_code',checkType:'notnull',errorMsg:'请输入登记注册号',valid:false},
		{name:'word_name',checkType:'notnull',errorMsg:'请输入单位名称',valid:false},
		{name:'reg_org',checkType:'notnull',errorMsg:'请输入发证机关',valid:false},
		{name:'reg_type',checkType:'notnull',errorMsg:'请选择组成形式',valid:false,valid:false},
		{name:'oper_place',checkType:'notnull',errorMsg:'请输入经营场所',valid:false},
		{name:'oper_range_way',checkType:'notnull',errorMsg:'请输入经营范围及方式',valid:false},
		{name:'reg_start_date',checkType:'notnull',errorMsg:'请选择营业执照起始日',valid:false},
		{name:'reg_end_date',checkType:'notnull',errorMsg:'请选择营业执照到期日',valid:false},
		{name:'ins_code_flag',checkType:'notnull',errorMsg:'请选择是否有组织机构代码',valid:false},
		{name:'indiv_ins_code',checkType:'string',checkRule:'10', errorMsg:'请输入组织机构代码',error:'组织机构代码为10位',valid:false},
		{name:'ins_code_date',checkType:'notnull',errorMsg:'请输入组织机构代码有效期',valid:false},
		{name:'operator_name',checkType:'notnull',errorMsg:'请输入经营者姓名',valid:false},
		{name:'reg_desc',checkType:'notnull',errorMsg:'请输入备注'},
	], */
	//个人基本信息
	indivInfo:{
		// indiv_country: 'CHN', //	国别
		// indiv_brt_place: '', //	籍贯
		// now_hous_type: '', //	现住房类别
		// now_property_nature: '', //	现住房产权类别
		// indiv_pol_st: '', //	政治面貌
		/* indiv_edt: '', //	最高学历
		indiv_dgr: '', //	最高学位
		edt_remark: '', *///	学位说明  最高学历为硕士研究生/大学本科且最高学位为学士、未知时必输
		// indiv_heal_st: '', //	健康状况
		/* is_business_owner: '2', //	是否为企业主  
		com_str_date: '', //	企业成立年月(格式:yyyy-mm)  是否企业主选择是，则必输；反之，不显示
		startworkdate: '', //	经营起始年份 是否企业主选择是，则必输；反之，不显示
		yearlamt: '', //	最近一个完整年度营业收入（元） 是否企业主选择是，则必输；反之，不显示
		com_opt_owner: '', //	经营场地所有权
		indiv_soc_scr: '', *///	社会保障情况
		// localflag: '', //	是否本地人
		// islocalcom: '', //	工作单位是否本地
		/* residencecompliancedflag: '', //	是否在经营地有固定住所
		ishaveloacalhourse: '', //	是否拥有本地房产
		localresidenceyear: '', //	本地居住年限
		careeryear: '', //	工作年限
		familymonthincome: '', //	家庭月收入(元)
		familysum: '', //	家庭人数
		childrensum: '', //	家庭子女人数
		supportnumber: '', //	供养人数（没有独立经济能力的配偶或子女）
		termyear: '', *///	借款人从事当前经营行业起始年份 - 从事当前经营行业起始年份
		// postcodetax: '', //	居住邮编
	},
	//个人基本信息必填项
	indivInfoRequired:[
		// {name:'indiv_country',checkType:'notnull',errorMsg:'请选择国别'},
		// {name:'indiv_edt',checkType:'notnull',errorMsg:'请选择最高学历'},
		// {name: 'edt_remark',checkType: 'string',checkRule: '1,200',errorMsg: '请输入学位说明',error: '学位说明最多为200个字符',notrequire:true},
		// {name:'indiv_heal_st',checkType:'notnull',errorMsg:'请选择健康状况'},
		// {name:'is_business_owner',checkType:'notnull',errorMsg:'请选择是否为企业主'},
		// {name:'com_str_date',checkType:'notnull',errorMsg:'请选择企业成立年月(格式:yyyy-mm)',valid:false},
		// {name:'startworkdate',checkType:'notnull',errorMsg:'请选择经营起始年份',valid:false},
		// {name:'yearlamt',checkType:'money',errorMsg:'请输入最近一个完整年度营业收入（元）',error:'最近一个完整年度营业收入格式错误',valid:false},
		// {name:'com_opt_owner',checkType:'notnull',errorMsg:'请选择经营场地所有权',valid:false},
		// {name:'localflag',checkType:'notnull',errorMsg:'请选择是否本地人'},
		// {name:'islocalcom',checkType:'notnull',errorMsg:'请选择工作单位是否本地'},
		// {name:'localresidenceyear',checkType:'int',errorMsg:'请输入本地居住年限',error:'本地居住年限为数字',notrequire:true}, // 不是必填但是校验格式
		// {name:'ishaveloacalhourse',checkType:'notnull',errorMsg:'请选择是否拥有本地房产'},
		// {name:'careeryear',checkType:'int',errorMsg:'请输入工作年限',error:'工作年限为数字',notrequire:true}, // 不是必填但是校验格式
		// {name:'familymonthincome',checkType:'money',errorMsg:'请输入家庭月收入',checkRule:'1,6',error:'家庭月收入格式错误',notrequire:true}, // 不是必填但是校验格式
		// {name:'familysum',checkType:'int',errorMsg:'请输入家庭人数',error:'家庭人数为数字',notrequire:true}, // 不是必填但是校验格式
		// {name:'childrensum',checkType:'int',errorMsg:'请输入家庭子女人数',error:'家庭子女人数为数字'},
		// {name:'supportnumber',checkType:'int',errorMsg:'请输入供养人数',error:'供养人数为数字'},//（没有独立经济能力的配偶或子女）
		// {name:'termyear',checkType:'int',checkRule:'4',errorMsg:'请输入借款人从事当前经营行业起始年份',error:'借款人从事当前经营行业起始年份为4位数字'},//借款人从事当前经营行业起始年份 - 
		// {name:'postcodetax',checkType:'postcode',errorMsg:'请输入居住邮编',error:'邮政编码格式错误',notrequire:true},
	],
	//婚姻状况
	/* maritalStatus:{
		indiv_mar_st: '', //	婚姻状况
		indiv_sps_id_typ: '', //	配偶证件类型
		indiv_sps_id_code: '', //	配偶证件号码
		indiv_sps_mar_code: '', //	结婚证号(户口簿号)
		indiv_sps_name: '', //	配偶姓名
		cus_id_rel: '', //	配偶客户号
		indiv_sps_occ: '', //	职业
		indiv_scom_name: '', //	工作单位
		indiv_sps_duty: '', //	职务
		indiv_psp_crtfctn: '', //	职称
		indiv_sps_mphn: '', //	手机号码
		indiv_sps_phn: '', //	单位电话
		indiv_sps_mincm: '', //	配偶月收入(元)
		indiv_sps_job_dt: '', //	参加工作年份
		indiv_sps_out: '', //	配偶月债务支出
	}, */
	//婚姻状况必填项
	/* maritalStatusRequired:[
		{name:'indiv_mar_st',checkType:'notnull',errorMsg:'请选择婚姻状况'},
		{name:'indiv_sps_id_typ',checkType:'notnull',errorMsg:'配偶证件类型',valid:false},
		{name:'indiv_sps_id_code',checkType:'certcode',errorMsg:'请输入配偶证件号码',error:'证件号码格式错误',valid:false},
		{name:'indiv_sps_mar_code',checkType:'notnull',errorMsg:'请输入结婚证号',valid:false},
		{name:'indiv_sps_name',checkType:'notnull',errorMsg:'请输入配偶姓名',valid:false},
		{name:'cus_id_rel',checkType:'notnull',errorMsg:'请输入配偶客户号',valid:false},
		{name:'indiv_scom_name',checkType:'notnull',errorMsg:'请输入工作单位',valid:false},
		{name:'indiv_sps_mphn',checkType:'phoneno',errorMsg:'请输入手机号码',error:'手机号码格式错误',valid:false},
		{name:'indiv_sps_phn',checkType:'notnull',errorMsg:'请输入单位电话',valid:false},
		{name:'indiv_sps_mincm',checkType:'money',errorMsg:'请输入配偶月收入(元)',error:'配偶月收入格式错误',valid:false},
		{name:'indiv_sps_job_dt',checkType:'int',errorMsg:'请输入参加工作年份',error:'参加工作年份为数字',notrequire:true},
		{name:'indiv_sps_out',checkType:'money',errorMsg:'请输入配偶月债务支出',error:'配偶月债务支出格式错误',valid:false},
	], */
	//联系信息
	relationInfo:{
		same_curadd_flg:'',//是否与现住地址相同
		post_addr: '', //	通讯地址
		post_code: '', //	邮政编码
		// indiv_rsd_st: '', //	居住状况
		// indiv_lcl_flg: '', //	是否异地
		area_name: '', //	区域名称
		area_code: '', //	区域编号
		// fphone: '', //	住宅电话
		mobile: '', //	手机号码
		mobile2: '', //	备用手机号
		phone: '', //	短信通知号
		// fax_code: '', //	传真
		email: '', //	Email地址
	},
	// 联系信息必填项
	relationInfoRequired:[
		{name:'same_curadd_flg',checkType:'notnull',errorMsg:'请选择是否与现住地址相同'},
		{name:'post_addr',checkType:'notnull',errorMsg:'请输入通讯地址'},
		{name:'post_code',checkType:'postcode',errorMsg:'请输入邮政编码',error:'邮政编码格式错误'},
		// {name:'indiv_rsd_st',checkType:'notnull',errorMsg:'请选择居住状况'},
		// {name:'indiv_lcl_flg',checkType:'notnull',errorMsg:'请选择是否异地'},
		{name:'area_code',checkType:'notnull',errorMsg:'请选择区域编号'},
		{name:'area_name',checkType:'notnull',errorMsg:'请输入区域名称'},
		// {name:'fphone',checkType:'notnull',errorMsg:'请输入住宅电话'},
		{name:'mobile',checkType:'phoneno',errorMsg:'请输入手机号码',error:'手机号码格式错误'},
		{name:'mobile2',checkType:'phoneno',errorMsg:'请输入备用手机号',error:'备用手机号格式错误',notrequire:true},
		{name:'phone',checkType:'int',errorMsg:'请输入短信通知号',error:'短信通知号为数字',notrequire:true},
		{name:'email',checkType:'email',errorMsg:'请输入Email地址',error:'Email格式错误',notrequire:true},
	],
	//单位信息
	/* companyInfo:{
		indiv_occ: '', //	职业
		indiv_com_name: '', //	工作单位
		indiv_com_typ: '', //	单位性质
		indiv_com_fld: '', //	单位所属行业
		indiv_com_fld_name: '', //	单位所属行业名称
		indiv_com_addr: '', //	单位地址
		indiv_com_zip_code: '', //	单位邮编
		indiv_com_phn: '', //	单位电话
		indiv_com_fax: '', //	单位传真
		indiv_com_cnt_name: '', //	单位联系人
		indiv_work_job_y: '', //	单位工作起始年月(格式:yyyy-mm)  参加工作年月
		indiv_com_job_ttl: '', //	职务
		indiv_crtfctn: '', //	职称
		work_resume: '', //	个人简历
		employeenumber: '', //	企业职工人数
		officeadd: '', //	企业办公地址
		officezip: '', //	企业邮政编码
		hasieright: '', //	企业有无进出口经营权
		workfieldfee: '', //	企业经营场地所有权
		enviromenteriendlyflag: '', //	企业是否环境达标
	},
	companyInfoRequired:[
		{name:'indiv_occ',checkType:'notnull',errorMsg:'请选择职业'},
		{name:'indiv_com_name',checkType:'notnull',errorMsg:'请输入工作单位'},
		{name:'indiv_com_typ',checkType:'notnull',errorMsg:'请选择单位性质'},
		{name:'indiv_com_fld_name',checkType:'notnull',errorMsg:'请输入单位所属行业名称'},
		{name:'indiv_com_addr',checkType:'notnull',errorMsg:'请输入单位地址'},
		{name:'indiv_com_zip_code',checkType:'postcode',errorMsg:'请输入单位邮编',error:'邮政编码格式错误',notrequire:true},
		{name:'indiv_com_phn',checkType:'notnull',errorMsg:'请输入单位电话'},
		{name:'indiv_work_job_y',checkType:'notnull',errorMsg:'参加工作年月'},//单位工作起始年月(格式:yyyy-mm)  
		{name:'indiv_com_job_ttl',checkType:'notnull',errorMsg:'请选择职务'},
		{name:'indiv_crtfctn',checkType:'notnull',errorMsg:'请选择职称'},
		{name:'employeenumber',checkType:'int',errorMsg:'请输入企业职工人数',error:'企业职工人数为数字',notrequire:true},
		{name:'officezip',checkType:'postcode',errorMsg:'请输入企业邮政编码',error:'企业邮政编码格式错误',notrequire:true},
	], */
	//财务资产
	/* financialAssets:{
		indiv_ann_mouth: '', //	个人月收入(元)
		on_debt_payments: '', //	月债务支出(元)
		indiv_dept_rate: '', //	家庭支出收入比例
		liquidity: '', //	其他流动资产(元)
		debt_amt: '', //	负债总额(元)
		fixed: '', //	固定资产(元)
		fixed_desc: '', //	固定资产说明(请输入房产、汽车、有价证劵等信息)
	},
	financialAssetsRequired:[
		{name:'indiv_ann_mouth',checkType:'money',errorMsg:'请输入个人月收入(元)',error:'个人月收入格式错误'},
		{name:'on_debt_payments',checkType:'money',errorMsg:'请输入月债务支出(元)',error:'月债务支出格式错误'},
		{name:'liquidity',checkType:'money',errorMsg:'请输入其他流动资产(元)',error:'其他流动资产格式错误',notrequire:true},
		{name:'debt_amt',checkType:'money',errorMsg:'请输入负债总额(元)',error:'负债总额格式错误',notrequire:true},
		{name:'fixed',checkType:'money',errorMsg:'请输入固定资产(元)',error:'固定资产格式错误',notrequire:true},
	], */
	//其他信息
	otherInfo:{
		/* loan_card_flg: '2', //	有无中征码（原贷款卡）
		loan_card_id: '', //	中征码(原贷款卡号)
		loan_card_eff_flg: '', //	中征码（原贷款卡）状态
		com_init_loan_date: '', //	建立信贷关系时间
		indiv_hld_acnt: '', //	在我行开立账户情况
		hold_card: '', //	持卡情况
		market_id: '', //	营销人
		market_br_id: '', //	营销机构 */
	},
	otherInfoRequired:[
		/* {name:'loan_card_flg',checkType:'notnull',errorMsg:'请选择有无中征码（原贷款卡）'},
		{name:'loan_card_id',checkType:'int',checkRule:'16',errorMsg:'请输入中征码(原贷款卡号)',error:'中征码为16位数字',valid:false},
		{name:'loan_card_eff_flg',checkType:'notnull',errorMsg:'请选择中征码（原贷款卡）状态',valid:false},
		{name:'com_init_loan_date',checkType:'notnull',errorMsg:'请选择建立信贷关系时间'},
		{name:'market_id',checkType:'notnull',errorMsg:'请选择营销人'},
		{name:'market_br_id',checkType:'notnull',errorMsg:'请输入营销机构'}, */
	],
	// familyAssets:{
		/* indiv_ass_flag: '', //	新增/修改标识
		indiv_ass_id: '', //	资产编号
		indiv_ass_type: '', //	资产类别
		indiv_ass_name: '', //	资产名称
		indiv_ass_plr: '', //	资产单位
		indiv_ass_num: '', //	资产数量
		indiv_ass: '', //	资产估价(元)
		com_ass_status: '', //	抵押状况
		indiv_ass_des: '', //	资产描述
		remark_indiv: '', //	备注 */
	// },
	// familyAssetsRequired:[
		/* {name:'indiv_ass_type',checkType:'notnull',errorMsg:'请选择资产类别'},
		{name:'indiv_ass_num',checkType:'money',errorMsg:'请输入资产数量',error:'资产数量为数字',notrequire:true},
		{name:'indiv_ass',checkType:'money',errorMsg:'请输入资产估价(元)',error:'资产估价格式错误'},
		{name:'com_ass_status',checkType:'notnull',errorMsg:'请选择抵押状况'}, */
	// ]
}
