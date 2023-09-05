<template>
    <el-container style="height: 100%;">
        <el-aside width="200px">
            <div>
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>2023</template>
                        <el-menu-item index="1-1">3</el-menu-item>
                        <el-menu-item index="1-2">2</el-menu-item>
                        <el-menu-item index="1-3">1</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>2022</template>
                        <el-menu-item index="2-1">12</el-menu-item>
                        <el-menu-item index="2-2">11</el-menu-item>
                        <el-menu-item index="2-3">10</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </el-aside>
        <el-main>
            <div style="height: calc(100vh - 190px);">
                <el-scrollbar height="100%">
                    <el-card class="box-card" v-for="log in logs">
                        <template #header>
                        <div class="card-header">
                            <el-row :gutter="20">
                                <el-col :span="18"><div class="grid-content ep-bg-purple"><h1>{{ log.theme }}</h1></div></el-col>
                                <el-col :span="6"><div class="grid-content ep-bg-purple" style="text-align: right;"><span>{{ log.upload_time }}</span></div></el-col>
                            </el-row>
                        </div>
                        </template>
                        <el-tag v-for="tag in log.tags" :key="tag" class="mx-1" effect="dark" size="large" style="margin: 0 5px;">
                                {{ tag }}
                            </el-tag>
                        <div v-for="content in log.content" :key="content" class="text item" style="margin: 5px 5px;">
                            {{ content }}
                        </div>
                        <div class="demo-image__lazy">
                            <el-image v-for="image in log.images_url" :key="image" :src="image" lazy />
                        </div>
                    </el-card>
                </el-scrollbar>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { reactive, nextTick, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElInput, UploadProps, UploadUserFile } from 'element-plus'
import { toRaw } from '@vue/reactivity'     // toRaw(Proxy) 将Proxy对象转为一般格式

let logs = ref([])
// 预加载数据库中用户所有日志
axios.get('/api/get_history_data/').then(function(ret){
    console.log(ret.data)
    logs.value = ret.data
})

// 控制左侧手风琴目录选项的开关
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.box-card {
    margin: 10px 0;
    width: 99%;
}
.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>