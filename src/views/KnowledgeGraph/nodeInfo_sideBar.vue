<template>
    <div class="nodeInfo_siderBar">
        <div id="info" class="info">
            <div v-show="nodeInfo">
                <br><h3>基本信息</h3><br>
                <el-table :data="nodeInfo" style="width: 100%" height="80vh">
                    <el-table-column prop="key" label="Key" width="auto" align="center" />
                    <el-table-column prop="value" label="Value" width="auto" align="center" />
                </el-table>
                <br><el-button type="primary" @click="reqClick">Primary</el-button>
            </div>
        </div>
        <div id="btn-info" class="btn-info" @click="nodeInfo_siderBar_display">
            <el-icon><InfoFilled /></el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

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
    z-index: 1000;
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
}
</style>