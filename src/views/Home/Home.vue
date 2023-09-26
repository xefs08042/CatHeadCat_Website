<template>
    <div class="largeBox">
        <h1 style="text-align: center;">CatHeadCat's Home</h1>
        <div class="subBox">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
                <div class="el-col-box">
                    <el-card class="box-card">
                        <template #header>
                        <div class="card-header">
                            <span>ZRX Resume</span>
                        </div>
                        </template>
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="el-col-box">
                    <el-card class="box-card" @click="toTaskLog">
                        <template #header>
                        <div class="card-header">
                            <span>Work Logs</span>
                        </div>
                        </template>
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="el-col-box">
                    <el-card class="box-card" @click="toCHCLog">
                        <template #header>
                        <div class="card-header">
                            <span>Lift Logs</span>
                        </div>
                        </template>
                        <div class="text_item">Create New Log</div>
                        <div class="text_item">Visit Historical Logs</div>
                        <div class="text_item">......</div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="el-col-box">
                    <el-card class="box-card" @click="toKnowledgeGraph">
                        <template #header>
                        <div class="card-header">
                            <span>KG visualization</span>
                        </div>
                        </template>
                        <div class="text_item">Web Map</div>
                        <div class="text_item">KnowledgeGraph</div>
                        <div class="text_item">......</div>
                    </el-card>
                </div>
            </el-col>
        </el-row><br>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
                <div class="el-col-box">
                    <el-card class="box-card" @click="toAccountDetail">
                        <template #header>
                        <div class="card-header">
                            <span>Account Detail</span>
                        </div>
                        </template>
                        <div class="text_item">Create New Row</div>
                        <div class="text_item">History Account</div>
                        <div class="text_item">Spending Trend</div>
                        <div class="text_item">Spending Ratio</div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router = useRouter()
// 登录成功，页面跳转
const toCHCLog = () => {
  router.push('/CHCLog')
}
const toTaskLog = () => {
  router.push('/TaskLog')
}
const toKnowledgeGraph = () => {
  router.push('/KnowledgeGraph')
}
const toAccountDetail = () => {
  router.push('/AccountDetail')
}
</script>

<style lang="scss" scoped>
.largeBox {
    // margin: 0 20px;
    // text-align: center;
    overflow-x: hidden;
}

h1 {
    padding: 5% 0;
    // color: #fff;
    // background-color: #3498db;
}

.box-card {
    height: 200px;
    width: 400px;
}

.card-header {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
}

.el-col-box {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s linear;
}

.el-col-box :hover {
    cursor: pointer;
    color: #fff;
    background-color: #3498db;
}

.subBox {
    margin: 20px;
}

.text_item{
    margin-bottom: 5px;
}
</style>