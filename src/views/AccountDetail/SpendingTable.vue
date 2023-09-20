<template>
    <el-row>
        <el-col :span="8"><el-card class="spending-card">
            <div id="form-cotainer">
                <p>Create New Row</p><br>
                <el-form :model="form" ref="resetFormData">
                    <el-form-item label="Date" prop="date">
                        <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%"/>
                    </el-form-item>                    
                    <el-form-item label="Type" prop="type">
                        <el-select v-model="form.type" placeholder="Please Select">
                            <el-option label="Clothes" value="Clothes" />
                            <el-option label="Food" value="Food" />
                            <el-option label="Transport" value="Transport" />
                            <el-option label="Lodging" value="Lodging" />
                            <el-option label="Education" value="Education" />
                            <el-option label="Entertainment" value="Entertainment" />
                            <el-option label="Hobby" value="Hobby" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Method" prop="method">
                        <el-radio-group v-model="form.method">
                            <el-radio label="WeChat" />
                            <el-radio label="AliPay" />
                            <el-radio label="BankCard" />
                            <el-radio label="Cash" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Payee" prop="payee">
                        <el-input v-model="form.payee" />
                    </el-form-item>
                    <el-form-item label="Amount" prop="amount">
                        <el-input-number v-model="form.amount" :precision="2" :step="0.1" :max="10000" />
                    </el-form-item>
                    <el-form-item label="Note" prop="note">
                        <el-input v-model="form.note" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit_spending_info">Submit</el-button>
                        <el-button @click="reset_spending_info">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card></el-col>
        <el-col :span="16"><el-card class="spending-card">
            <div id="table_container">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
        </el-card></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, nextTick, ref } from 'vue'
//消费日期（具体到日即可），消费类型（衣食住行等），支付方式（微信/支付宝/银行卡/现金等），
//收款方（简要说明，有位置信息额外说明），具体金额，备注等；
const resetFormData = ref()
const form = reactive({
    'date': '',
    'type': '',
    'method': '',
    'payee': '',
    'amount': 0,
    'note': '',
})

function submit_spending_info() {
    console.log(form)
}

function reset_spending_info() {
    resetFormData.value.resetFields();
    console.log(form)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>
.spending-card {
    margin: 5px;
    text-align: center;
    max-height: 300px;
    overflow-y: auto;
}
</style>