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
    ],
    tooltip: {
        trigger: 'axis', //坐标轴触发，可设为 item 数据项图形触发
        confine: true, //将 tooltip 框限制在图表的区域内，在移动端开发时非常有用
        // position 可以自己设定 tooltip 的位置，下面例子是在老版本 echarts 不支持 confine 属性时写的一个当提示左侧超出画布时的限制函数
        // position: 'top',
        // formatter 设置提示的文字内容（需要改变样式可通过 rich 富文本实现，见文档），要在 tooltip 中显示单位，可通过函数 params 拼字符串加上如下面 % 的单位
        formatter: function(params){
            return params[0].marker + params[0].name + '<br/>' + '￥' + params[0].value
        }
    },

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