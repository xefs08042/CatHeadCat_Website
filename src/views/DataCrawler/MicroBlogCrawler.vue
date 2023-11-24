<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Mblog Crawler</span>
                    <el-button class="button" text>Cancel</el-button>
                </div>
            </template>
            <div>
                <el-form :model="form" label-width="120px">
                    <el-form-item label="Time Range" class="block">
                        <el-date-picker
                        v-model="form.time"
                        type="datetimerange"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        :default-time="defaultTime"
                        />
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="Key Word">
                                <el-input v-model="form.keyword" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Storage Name">
                                <el-input v-model="form.storage_name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="start_mblog_crawler">Start</el-button>
                    </el-form-item>
                    <el-form-item label="Progress">
                        <el-progress :percentage="percentage" :color="customColors" />
                    </el-form-item>
                    <el-form-item label="Description">
                        <el-input v-model="crawler_description" type="textarea" :rows="5" readonly/>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, reactive, watch } from 'vue'

const form = reactive({
    time: '',
    keyword: '',
    storage_name: ''
});
const defaultTime: [Date, Date] = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 1, 2, 0, 0, 0),
]; // '12:00:00', '08:00:00'

const percentage = ref(0);
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];
const crawler_description = ref('');
watch(percentage, (newVal, oldVal) => {
    if (newVal >= 100) {
        percentage.value = 100;
        console.log('stop');
        eventSource.close();
    };
});

var eventSource;
const start_mblog_crawler =()=> {
    eventSource = new EventSource('/api/rtn_crawler_pgs/');
    // 监听 message 事件，处理服务器发送的数据
    eventSource.addEventListener('message', (event) => {
        const jsonData = JSON.parse(event.data);
        // 更新 responseData，显示服务器发送的数据
        percentage.value = parseFloat(jsonData.mblog_crawler_progress_ratio);
        crawler_description.value = jsonData.description_string;
        console.log(percentage.value);
    });
    // 监听 error 事件，处理连接错误
    // eventSource.addEventListener('error', (error) => {
    //     console.error('Error:', error);
    //     eventSource.close(); // 关闭 EventSource 连接
    // });
    // 在组件销毁时关闭 EventSource 连接
    //     this.$once('hook:beforeDestroy', () => {
    //     eventSource.close();
    // });
    axios.post("/api/mblog_crawler/", form, {
        headers: {
            "content-type": "application/json"
        }
    }).then(res => {
        // do something with res
        console.log(res.data);
    }).catch(err => {
        // do something with err
    });
};

</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
    margin: 0 20px;
    // width: 480px;
}

.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.el-progress--line {
  width: 100%;
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