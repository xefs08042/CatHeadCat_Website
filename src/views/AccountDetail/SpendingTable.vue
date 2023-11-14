<template>
    <el-row>
        <el-col :span="8"><el-card class="spending-card">
            <div id="form-cotainer">
                <h3>Create New Row</h3><br>
                <el-form :model="form" ref="resetFormData">
                    <el-form-item label="Date" prop="date">
                        <el-date-picker v-model="form.date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DDTHH:mm:ss.000Z" placeholder="Pick a date" style="width: 100%"/>
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
            <h3>History Account</h3><br>
            <div id="table_container">
                <el-form>
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="Year">
                                <el-select v-model="time_range.year" placeholder="Please Select" @change="get_history_account_by_time">
                                    <el-option v-for="year in time_range.year_list" :label=year :value=year />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="Month">
                                <el-select v-model="time_range.month" placeholder="Please Select" @change="get_history_account_by_time">
                                    <el-option v-for="month in time_range.month_dict[time_range.year]" :label=month :value=month />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" style="text-align: center; font-size: 16px; font-weight: bold;">
                            <div style="height: 32px; line-height: 32px;"><span>Total: </span><span style="color: red;">￥{{ time_range.total }}</span></div>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :cell-style="cellStyle" :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="Date">
                        <!-- <template v-slot="{ row }">
                            <div :style="{ color: getBackgrandcolor(row.date) }">{{ row.date }}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="type" label="Type" />
                    <el-table-column prop="method" label="Method" />
                    <el-table-column prop="payee" label="Payee" />
                    <el-table-column prop="amount" label="Amount" />
                    <el-table-column prop="note" label="Note" />
                </el-table>
            </div>
        </el-card></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'

const instance = getCurrentInstance()
const resetFormData = ref();
const form = reactive({
    'date': '',
    'type': '',
    'method': '',
    'payee': '',
    'amount': 0,
    'note': '',
});
const tableData = ref([]);

const time_range = reactive({
    month_dict: {},
    year_list: [],
    year: '',
    month: '',
    total: 0
});

init_account();

function init_account() {
    axios.get('/api/get_history_account/').then(res => {
        // do something with res
        console.log(res.data);
        tableData.value = res.data.account_data;
        time_range.month_dict = res.data.month_dict;
        time_range.year_list = Object.keys(time_range.month_dict);
        time_range.year = time_range.year_list[0];
        time_range.month = time_range.month_dict[time_range.year_list[0]][0];
        time_range.total = res.data.total_amount_month.toFixed(2);
        instance?.proxy?.$bus.emit('onSendMsg', res.data)
    }).catch(err => {
        // do something with err
        console.log('request error!');
    });
}


function get_history_account_by_time() {
    if (time_range.year != '' && time_range.month != '') {
        if (!time_range.month_dict[time_range.year].includes(time_range.month)) {
            time_range.month = time_range.month_dict[time_range.year][0]
        }
        // 发送请求
        const post_data = {'year_month': time_range.year + '-' + time_range.month }
        axios.post('/api/get_history_account/', post_data).then(res => {
            // do something with res
            console.log(res.data);
            tableData.value = res.data.account_data;
            time_range.total = res.data.total_amount_month.toFixed(2);
            instance?.proxy?.$bus.emit('onSendMsg', res.data)
        }).catch(err => {
            // do something with err
            console.log('request error!');
            console.log(err);
        });
    }
}

function submit_spending_info() {
    console.log(form)
    if (form.date == '' || form.type == '' || form.method == '' || form.payee == '' || form.amount == 0) {
        ElNotification({
            title: 'Warning',
            message: 'please input essential info',
            type: 'warning'
        });
    } else {
        axios.post("/api/upload/spending_info/", form, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            // do something with res
            console.log(res.data);
            init_account();
            ElNotification({
                title: 'Success',
                message: 'upload spending_info success',
                type: 'success'
            });
        }).catch(err => {
            // do something with err
            console.log('request error!');
        });
    }
}

function reset_spending_info() {
    resetFormData.value.resetFields();
    console.log(form)
}

// 根据单元格值修改样式（字体颜色）
function getBackgrandcolor(date) {
    const day = Number(date.slice(-2));
    if (day % 2 == 0) {
        return 'red'
    } else {
        return 'green'
    }
}

// 通过table的cell-style属性，可以根据设置条件，更改所有的单元格样式
const cellStyle = (data) => {
    let borderRadius = {};
    if (data.column.label == 'Note') {
        borderRadius = {borderRadius: '0 10px 10px 0'}
    } 
    if (data.column.label == 'Date') {
        borderRadius = {borderRadius: '10px 0 0 10px'}
    } 
    const day = Number(data.row.date.slice(-2))
    let color = {}
    if (day % 2 == 0) {
        color = {color: 'white', background: '#bdc3c7'}
    } else {
        color = {background: '#ecf0f1'}
    }
    return {...borderRadius, ...color}
}
</script>

<style lang="scss" scoped>
.spending-card {
    margin: 5px;
    height: 50vh;
    overflow-y: auto;
}

/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px; 
}
/**滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
</style>