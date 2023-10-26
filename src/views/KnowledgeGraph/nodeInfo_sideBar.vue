<template>
    <div class="nodeInfo_siderBar">
        <div id="info" class="info">
            <div v-show="nodeInfo">
                <br><h3>基本信息</h3><br>
                <el-table :data="nodeInfo" style="width: 100%" height="70vh">
                    <el-table-column prop="key" label="Key" width="auto" align="center" />
                    <el-table-column prop="value" label="Value" width="auto" align="center" />
                </el-table>
                <!-- <br><el-button type="primary" @click="reqClick">Commit</el-button> -->
            </div>
        </div>
        <div id="btn-info" class="btn-info" @click="nodeInfo_siderBar_display">
            <el-icon><InfoFilled /></el-icon>
        </div>
        <transition name="fade">
            <el-card class="legend-card" v-show="legend_status">
                <h3 style="width: 300px; margin-bottom: 5px;">Legend</h3>
                <el-row>
                    <el-col :span="12">
                        <h4 style="margin-bottom: 5px;">Nodes</h4>
                        <div>
                            <span class="lengend-point" style="background-color: #ff7f0e; "></span>
                            <p style="display: inline-block;">Location</p>
                        </div>
                        <div>
                            <span class="lengend-point" style="background-color: #2ca02c;"></span>
                            <p style="display: inline-block;">Mblog</p>
                        </div>
                        <div>
                            <span class="lengend-point" style="background-color: #d62728;"></span>
                            <p style="display: inline-block;">User</p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <h4 style="margin-bottom: 5px;">Links</h4>
                        <div>
                            <div style="margin: 0 5px; width: 50px; border: 1px solid #8c564b; vertical-align: middle; display: inline-block;"></div>
                            <p style="display: inline-block;">Include</p>
                        </div>
                        <div>
                            <div style="margin: 0 5px; width: 50px; border: 1px solid #1f77b4; vertical-align: middle; display: inline-block;"></div>
                            <p style="display: inline-block;">Post In</p>
                        </div>
                        <div>
                            <div style="margin: 0 5px; width: 50px; border: 1px solid #9467bd; vertical-align: middle; display: inline-block;"></div>
                            <p style="display: inline-block;">Upload</p>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </transition>
        <div id="btn-legend" class="btn-legend" @click="show_legend">
            <el-icon><MoreFilled /></el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

// const props = defineProps(['nodeInfo']);
const props = defineProps<{
    nodeInfo: any,
}>();
const emit = defineEmits<{
    (event: 'childFun', val: any): void
}>();
const reqClick = () => {
    emit('childFun', 'success');
}

var status = false;
function nodeInfo_siderBar_display() {
    var oInfo: any = document.getElementById('info');
    var oBtn2: any = document.getElementById('btn-info');
    if (status) {
        status = false;
        oInfo.style.right = '-320px';
        oBtn2.style.right = '-320px';
        oBtn2.style.color = '#fff';
        oBtn2.style.background = '#2c3e50';
    }
    else {
        status = true;
        oInfo.style.right = '0px';
        oBtn2.style.right = '0px';
        oBtn2.style.color = '#000';
        oBtn2.style.background = 'aqua';
    }
};

const legend_status = ref(false);
const show_legend = () => {
    legend_status.value = !legend_status.value;
    const btn_legend = document.getElementById('btn-legend')
    if(legend_status.value) {
        btn_legend.style.color = '#000';
        btn_legend.style.background = 'aqua';
    } else {
        btn_legend.style.color = '#fff';
        btn_legend.style.background = '#2c3e50';
    }
    
}
</script>

<style lang="scss" scoped>
.info {
    position: relative;
    float: right;
    padding: 0 10px;
    right: -320px;
    width: 300px;
    height: 100vh;
    text-align: center;
    background-color: #ecf0f1;
    opacity: 0.9;
    z-index: 100;
    transition: .7s;
}

#info p {
    color: #000;
    font-size: 14px;
    margin-top: 0px;
    margin-bottom: 5px;
}

#info p span {
    color: #000;
    font-weight: bold;
    margin-right: 0px;
}

.btn-info {
    position: relative;
    float: right;
    right: -320px;
    margin: 10px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    border-radius: 10px;
    background-color: #2c3e50;
    opacity: 0.9;
    z-index: 20;
    transition: .7s;
    cursor: pointer;
}

.legend-card {
    position: absolute;
    right: 70px;
    bottom: 0px;
    margin: 10px;
    max-width: 300px;
    max-height: 200px;
    z-index: 200;
    overflow-y: auto;
    transition: opacity .7s;
}

//小圆点
.lengend-point {
    margin: 5px;
    width: 10px;      
    height: 10px;
    vertical-align: middle;
    display: inline-block;
    border-radius: 50%;
}

.btn-legend {
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin: 10px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    border-radius: 10px;
    background-color: #2c3e50;
    opacity: 0.9;
    z-index: 200;
    transition: .7s;
    cursor: pointer;
}

// v-show动画效果
.fade-leave, .fade-enter-to {     // 离开前,进入后透明度是1
  opacity: 1;
}
.fade-leave-active .fade-enter-active {
  transition: all .7s; //过度是2秒
}
.fade-leave-to, .fade-enter {
  opacity: 0;
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