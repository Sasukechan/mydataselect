<template>
<div class="grid-content">
	<el-watermark :font="font" :content="['中国工商银行', '软件研发中心广州二部实习']">
	<el-row>
	    <el-col :span="10">				
		<el-row>
<el-divider border-style="none" />
		<el-date-picker
	    v-model="value1"
	    type="daterange"
	    start-placeholder="开始时间"
	    end-placeholder="结束时间"
	    value-format="YYYY-MM-DD"
		:disabled-date="disabledDateFun"
		:default-value="timeDefaultShow"
	/></el-row>
	<el-row>
	<el-input v-model="input1" style="width: 250px" clearable @clear="clear" placeholder="请输入姓名" :prefix-icon="Search" />
	<el-divider direction="vertical" border-style="none"/>
	<el-input v-model="input2" style="width: 250px" clearable @clear="clear" placeholder="请输入卡号" :prefix-icon="Search" />
	</el-row>
	<el-row>
	<el-button :plain="true" color="#B71A21" type="primary" :icon="Search" @click="handleSearch" >查询</el-button>
	<el-button :plain="true" color="#B71A21" type="primary"  @click="handlereset" >重置</el-button>
</el-row>
</el-col>
 <el-col :span="14">
	 <el-divider border-style="none" />
	 <el-divider border-style="none" />
		<el-button :plain="true" color="#B71A21" @click="open()">一键拨号</el-button>
		<el-button :plain="true" color="#B71A21" @click="openVn()">一键短信</el-button>
		</el-col>
<el-divider border-style="none" />
	  </el-row>
	<el-table ref="tableRef"
	:data="handleData" stripe style="width: 100%" height="700" 
	@selection-change="handleSelectionChange">
	   <el-table-column fixed="left"  type="selection" width="50" />
		<el-table-column
	      prop="time" label="日期"
	      width="130" align="center" column-key="createTime"/>
		<el-table-column prop="uuid" label="干预批号" width="300" align="center" />
	    <el-table-column prop="name" label="客户姓名" width="80" align="center"/>
		<el-table-column prop="cardId" label="银行卡号" width="180" align="center">
				<template #default="scope">
			{{scope.row.cardId.toString().replace(scope.row.cardId.toString().substr(5,8),"********")}}
			</template>
			</el-table-column>
		<el-table-column prop="vipType" label="银行卡类型" width="130"  align="center"
		:filters="[
		  { text:'商务专用卡', value: 5 },
		  { text:'普通卡', value: 4 },
		  { text:'银卡', value: 3 },
		  { text:'金卡', value: 2 },
		  { text:'白金卡', value: 1 },
		  { text:'白金牡丹卡', value: 0 },
		]"
		:filter-method="filterHandler">
			<template #default="scope">
				<div v-if="scope.row.vipType===0">白金牡丹卡</div>
				<div v-if="scope.row.vipType===1">白金卡</div>
				<div v-if="scope.row.vipType===2">金卡</div>
				<div v-if="scope.row.vipType===3">银卡</div>
				<div v-if="scope.row.vipType===4">普通卡</div>
				<div v-if="scope.row.vipType===5">商务专用卡</div></template>
		</el-table-column>
		<el-table-column prop="provId" label="所在省份" width="80" align="center">
			<template #default="scope">
				<div v-if="scope.row.provId===1">山东</div>
				<div v-if="scope.row.provId===2">广东</div>
				<div v-if="scope.row.provId===3">河北</div>
				<div v-if="scope.row.provId===4">辽宁</div>
				<div v-if="scope.row.provId===5">吉林</div>
				<div v-if="scope.row.provId===6">黑龙江</div>
				<div v-if="scope.row.provId===7">甘肃</div>
				<div v-if="scope.row.provId===8">陕西</div>
				<div v-if="scope.row.provId===9">山西</div>
				<div v-if="scope.row.provId===10">海南</div>
				<div v-if="scope.row.provId===11">贵州</div>
				<div v-if="scope.row.provId===12">西藏</div>
				<div v-if="scope.row.provId===13">青海</div>
				<div v-if="scope.row.provId===14">新疆</div>
				<div v-if="scope.row.provId===15">内蒙古</div>
				<div v-if="scope.row.provId===16">北京</div>
				<div v-if="scope.row.provId===17">上海</div>
				<div v-if="scope.row.provId===18">福建</div>
				<div v-if="scope.row.provId===19">重庆</div>
				<div v-if="scope.row.provId===20">湖北</div>
				<div v-if="scope.row.provId===21">湖南</div>
				<div v-if="scope.row.provId===22">江西</div>
				<div v-if="scope.row.provId===23">江苏</div>
				<div v-if="scope.row.provId===24">浙江</div>
				<div v-if="scope.row.provId===25">广西</div>
				<div v-if="scope.row.provId===26">台湾</div>
				<div v-if="scope.row.provId===27">香港</div>
				<div v-if="scope.row.provId===28">澳门</div>
				<div v-if="scope.row.provId===29">云南</div>
				<div v-if="scope.row.provId===30">四川</div>
				<div v-if="scope.row.provId===31">海南</div>
				<div v-if="scope.row.provId===32">河南</div>
				<div v-if="scope.row.provId===33">河北</div>
				<div v-if="scope.row.provId===0">安徽</div></template>
		</el-table-column>
		<el-table-column prop="tele" label="联系电话" width="180" align="center">
		<template #default="scope">
		{{scope.row.tele.replace(scope.row.tele.substr(3,5),'*****')}}</template>
		</el-table-column>
		<el-table-column prop="email" label="电子邮箱" width="180" align="center">
		<template #default="scope">
		{{scope.row.email.replace(scope.row.email.substr(4,7),'*******')}}</template>
		</el-table-column>
		<el-table-column prop="amount" label="交易金额" width="180" align="center"/>
	    <el-table-column prop="errState" label="错误原因"  width="320" align="center">
			<template #default="scope">
				<div v-if="scope.row.errState===0">交易正常</div>
				<div v-if="scope.row.errState===1">超过信用额度</div>
				<div v-if="scope.row.errState===2">单笔或单日交易限额</div>
				<div v-if="scope.row.errState===3">风险控制</div>
				<div v-if="scope.row.errState===4">逾期还款</div>
				<div v-if="scope.row.errState===5">密码错误</div>
				<div v-if="scope.row.errState===6">卡片损坏或消磁</div>
				<div v-if="scope.row.errState===7">存在盗刷风险</div>
				<div v-if="scope.row.errState===8">银行系统维护</div>
				<div v-if="scope.row.errState===9">网络问题</div>
				<div v-if="scope.row.errState===10">商家拒绝</div>
				<div v-if="scope.row.errState===11">用户账户问题</div>
				<div v-if="scope.row.errState===12">未授权交易</div>
				</template></el-table-column>
<el-table-column fixed="right" prop="dealWay" label="处理状态" width="100"
      :filters="[
        { text: '已处理', value: 1},
        { text: '待处理', value: 0 },
      ]"
      :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.dealWay === 1 ? 'success' : 'danger'" 
		 disable-transitions
          >{{ (scope.row.dealWay===1?'已处理':'待处理') }}</el-tag>
      </template>
    </el-table-column>
<el-table-column fixed="right" label="操作" min-width="88" align="center" >
			  <template #default="scope">
				<el-button type="primary" color="#B71A21" size="small"
				  plain @click="handledetail(scope.row)">
				      查看详情
				</el-button>
		      </template>
		    </el-table-column>
	</el-table>
	</el-watermark>
	<el-dialog v-model="dialogVisible" title="客户详细信息" :modal="false" width="800">
		<el-watermark :font="font" :content="['中国工商银行', '软件研发中心广州二部实习']">
			<el-form :inline="true" :model="formInline" class="demo-form-inline details">
			      <el-form-item label="时间">
			        <el-input v-model="detail.time" placeholder="" disabled></el-input>
			      </el-form-item>
				  <el-form-item label="干预批号">
				    <el-input v-model="detail.uuid" with=280 placeholder="" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="卡号">
				    <el-input v-model="cardid" placeholder="" disabled oncut="return false" onpaste="return false" oncopy="return false"></el-input>
				  </el-form-item>
				  <el-form-item label="姓名">
			        <el-input v-model="detail.name" placeholder="" disabled></el-input>
			      </el-form-item>
				  <el-form-item label="所在省份">
				    <el-input v-model="prov" placeholder="" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="银行卡类型">
				    <el-input v-model="type" placeholder="" disabled></el-input>
				  </el-form-item>
			      <el-form-item label="联系电话">
			        <el-input v-model="te" placeholder="" disabled oncut="return false" onpaste="return false" oncopy="return false"></el-input>
			      </el-form-item>
				  <el-form-item label="电子邮箱">
				    <el-input v-model="eemail" placeholder="" disabled oncut="return false" onpaste="return false" oncopy="return false"></el-input>
				  </el-form-item>
				  <el-form-item label="交易金额">
				    <el-input v-model="detail.amount" placeholder="" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="错误原因">
				    <el-input v-model="reason" placeholder="" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="处理状态">
				    <el-input v-model="state" placeholder="" disabled></el-input>
				  </el-form-item>
			    </el-form>
			</el-watermark>
	</el-dialog>
</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { h } from 'vue'
	import { ElMessage,ElCheckbox } from 'element-plus'
import { defineComponent, reactive, toRefs } from "vue"
import dayjs from 'dayjs'
import axios from 'axios'
//按tag查看
const filterTag= (value, row) => {
	    return row.dealWay === value;
}
const tableRef = ref()
//查看详情
let prov=ref()
let state=ref()
let cardid=ref()
let reason=ref()
let type=ref()
let te=ref()
let eemail=ref()
let detail= ref(null)
const dialogVisible = ref(false)
const handledetail = (row) =>{
	dialogVisible.value= true
	detail.value=row
	cardid.value=row.cardId.toString().replace(row.cardId.toString().substr(5,8),'********')
	te.value=row.tele.replace(row.tele.substr(3,5),'*****')
	eemail.value=row.email.replace(row.email.substr(4,7),'*******')
	state.value=(row.dealWay===1?'已处理':'待处理')
	if(row.vipType===0) type.value='白金牡丹卡'
	else if(row.vipType===1) type.value='白金卡'
	else if(row.vipType===2) type.value='金卡'
	else if(row.vipType===3) type.value='银卡'
	else if(row.vipType===4) type.value='普通卡'
	else if(row.vipType===5) type.value='商务专用卡'
	if(row.errState===0) reason.value='交易正常'
	else if(row.errState===1)reason.value='超过信用额度'
	else if(row.errState===2)reason.value='单笔或单日交易限额'
	else if(row.errState===3) reason.value='风险控制'
	else if(row.errState===4) reason.value='逾期还款'
	else if(row.errState===5) reason.value='密码错误'
	else if(row.errState===6) reason.value='卡片损坏或消磁'
	else if(row.errState===7) reason.value='存在盗刷风险'
	else if(row.errState===8) reason.value='银行系统维护'
	else if(row.errState===9) reason.value='网络问题'
	else if(row.errState===10) reason.value='商家拒绝'
	else if(row.errState===11) reason.value='用户账户问题'
	else if(row.errState===12) reason.value='未授权交易'
	if(row.provId===1) prov.value='山东'
	else if(row.provId===2) prov.value='广东'
	else if(row.provId===3) prov.value='河北'
	else if(row.provId===4) prov.value='辽宁'
	else if(row.provId===5) prov.value='吉林'
	else if(row.provId===6) prov.value='黑龙江'
	else if(row.provId===7) prov.value='甘肃'
	else if(row.provId===8) prov.value='陕西'
	else if(row.provId===9) prov.value='山西'
	else if(row.provId===10) prov.value='海南 '
	else if(row.provId===11) prov.value='贵州'
	else if(row.provId===12) prov.value='西藏'
	else if(row.provId===13) prov.value='青海'
	else if(row.provId===14) prov.value='新疆'
	else if(row.provId===15) prov.value='内蒙古'
	else if(row.provId===16) prov.value='北京'
	else if(row.provId===17) prov.value='上海'
	else if(row.provId===18) prov.value='福建'
	else if(row.provId===19) prov.value='重庆'
	else if(row.provId===20) prov.value='湖北'
	else if(row.provId===21) prov.value='湖南'
	else if(row.provId===22) prov.value='江西'
	else if(row.provId===23) prov.value='江苏'
	else if(row.provId===24) prov.value='浙江'
	else if(row.provId===25) prov.value='广西'
	else if(row.provId===26) prov.value='台湾'
	else if(row.provId===27) prov.value='香港'
	else if(row.provId===28) prov.value='澳门'
	else if(row.provId===29) prov.value='云南'
	else if(row.provId===30) prov.value='四川'
	else if(row.provId===31) prov.value='海南'
	else if(row.provId===32) prov.value='河南'
	else if(row.provId===33) prov.value='河北'
	else if(row.provId===0) prov.value='安徽'
}
//拨号按钮
const changeData = async(id) => {
	const param=new	URLSearchParams()
	param.append('cardid',id)
    await axios.put('/api/intervene/intervene_service',param)
}
const multipleSelection = ref([])
//获得选中数据
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const open = () => {
	if(multipleSelection.value!=''){
	  ElMessage('拨号成功.')
	  multipleSelection.value.forEach((item) => {
	      item.dealWay = 1
		changeData(item.uuid)
		  //修改
	    })
	tableRef.value.clearSelection()}
	}
	const openVn = () => {
		if(multipleSelection.value!=''){
	   ElMessage('发送成功.')
	   multipleSelection.value.forEach((item) => {
			item.dealWay = 1
		   changeData(item.uuid)
		   //发请求修改
	     })
	   tableRef.value.clearSelection()}
	}
//取数据函数
let handleData = ref([])
let tableData = ref([])
const initData = async() => {
  let re= await axios.get('/api/intervene/intervene_service')
  console.log(re)
  handleData.value=re.data
  tableData.value=re.data
  console.log(handleData)
}
initData()
//按地区用户种类筛选
const filterHandler = (value,row,column) => {
  const property = column['property']
  return row[property] === value
}
//不可选择日期
const timeDefaultShow = new Date()
timeDefaultShow.setMonth(new Date().getMonth() - 1);

const disabledDateFun = (time) => {
  if (time.getTime() > new Date().getTime()) {
    return time.getTime() >= new Date().getTime(); //时间范围必须是时间戳
  } else {
    return time.getTime() < Date.now() - 30 * 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000 
  }
}
//按姓名he日期he卡号搜索
const input1=ref()//name
const input2=ref()//卡号
const value1 = ref()//date
const arr = ref([]);
const handleSearch= () =>{
	if(input1.value!==''||value1.value!==''||input2.value!==''){
		console.log(input2)
	arr.value = tableData.value.filter(item => 
		(!value1.value ||(value1.value[0] <= item.time && item.time <= value1.value[1]))&&
		(!input1.value ||(item.name.indexOf(input1.value) !== -1))&&
		(!input2.value ||(item.cardId.toString().indexOf(input2.value)!==-1)))}
	if (arr.value) {
		handleData.value = arr.value
			}
}
//重置
const handlereset = () =>{
	handleData.value = tableData.value
	input2.value=''
	input1.value=''
	value1.value=''
}
</script>
<style>
	.el-row {
		margin-left:25px;
	  margin-bottom: 15px;
	}
	.el-row:last-child {
	  margin-bottom: 0;
	}
	.el-col {
	  border-radius: 4px;
	}
	.grid-content {
	background-color:white;
	 border-radius: 4px;
	   min-height: 36px;
	}
</style>

