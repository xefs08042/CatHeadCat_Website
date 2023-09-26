<template>
    <h3>Spending Trend</h3>
    <div id="line_chart_cotainer"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { reactive, ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
type EChartsOption = echarts.EChartsOption;

const line_chart_data = reactive({
    date: [],
    amount: []
})
function init_line_chart() {
    var chartDom = document.getElementById('line_chart_cotainer')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
    xAxis: {
        type: 'category',
        data: line_chart_data.date
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: line_chart_data.amount,
        type: 'line'
        }
    ]
    };

    option && myChart.setOption(option);
}

// 获取兄弟组件的传值
const instance = getCurrentInstance()
onMounted(() => {
    instance?.proxy?.$bus.on('onSendMsg', receiveMsg)
})
 
onUnmounted(() => {
    instance?.proxy?.$bus.off('onSendMsg', receiveMsg)
})
 
function receiveMsg(val:unknown) {
    line_chart_data.date = val['spending_trend']['date'];
    line_chart_data.amount = val['spending_trend']['amount'];
    setTimeout(() => {
        init_line_chart();
    }, 1);
}
</script>

<style lang="scss" scoped>
#line_chart_cotainer {
    height: 300px;
    width: 400px;
}
</style>