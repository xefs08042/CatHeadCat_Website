<template>
    <div>

        <el-steps :active="0" finish-status="success" simple style="margin-top: 20px">
            <el-step title="类型选择" />
            <el-step title="参数设置" />
            <el-step title="爬虫执行" />
        </el-steps>
        <el-progress :percentage="percentage" :color="customColors" />
        <el-button plain @click="test">Return Progress</el-button>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, reactive, watch } from 'vue'

var eventSource;
const percentage = ref(0);
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

watch(percentage, (newVal, oldVal) => {
    console.log(newVal);
    if (newVal >= 100) {
        percentage.value = 100;
        console.log('stop');
        eventSource.close();
    };
});

const test =()=> {
    percentage.value = 0
    axios.get('/api/init_crawler/').then(res => {
        console.log(res.data);
    }).catch(err => {
        // do something with err
        console.log('request error!');
        console.log(err);
    });
    eventSource = new EventSource('/api/rtn_crawler_pgs/');
    // 监听 message 事件，处理服务器发送的数据
    eventSource.addEventListener('message', (event) => {
        // 更新 responseData，显示服务器发送的数据
        percentage.value = parseInt(event.data);
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
}
</script>

<style lang="scss" scoped>

</style>