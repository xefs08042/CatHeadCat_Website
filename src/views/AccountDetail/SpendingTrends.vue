<template>
    <div id="line_chart_cotainer"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

setTimeout(() => {
    init_line_chart();
}, 1);

function init_line_chart() {
    var chartDom = document.getElementById('line_chart_cotainer')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
        }
    ]
    };

    option && myChart.setOption(option);
}
</script>

<style lang="scss" scoped>
#line_chart_cotainer {
    height: 300px;
    width: 400px;
}
</style>