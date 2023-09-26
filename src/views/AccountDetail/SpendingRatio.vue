<template>
    <h3>Spending Ratio</h3>
    <div id="pie_chart_cotainer"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { reactive, ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
type EChartsOption = echarts.EChartsOption;

const pie_chart_data = reactive({
    data: [],
})

function init_pie_chart() {
    var chartDom = document.getElementById('pie_chart_cotainer')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            // emphasis: {
            //     label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold'
            //     }
            // },
            labelLine: {
                show: false
            },
            data: pie_chart_data.data
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
    pie_chart_data.data = val['spending_ratio'];
    setTimeout(() => {
        init_pie_chart();
    }, 1);
}
</script>

<style lang="scss" scoped>
#pie_chart_cotainer {
    height: 300px;
    width: 400px;
}
</style>