<template>
    <el-container style="height: 100%;">
        <el-aside width="200px">
            <div>
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-sub-menu :index=year v-for="year in time_range.year_list">
                        <template #title>{{ year }}</template>
                        <el-menu-item :index="year+'-'+month" v-for="month in time_range.month_dict[year]" @click="handleMenuSelect">{{ month }}</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </el-aside>
        <el-main>
            <div style="height: calc(100vh - 190px);">
                
                <el-scrollbar height="100%">
                    <el-row>
                    <el-col :span="12" v-for="log in logs">
                    <el-card class="box-card">
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
                    </el-col>
                    </el-row>
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

const logs = ref([])
const time_range = reactive({
    month_dict: {},
    year_list: [],
    year: '',
    month: ''
})
// 预加载数据库中用户所有日志
axios.get('/api/get_history_data/').then(function(res){
    console.log(res.data);
    logs.value = res.data.logs;
    time_range.month_dict = res.data.month_dict;
    time_range.year_list = Object.keys(time_range.month_dict);
    time_range.year = time_range.year_list[0];
    time_range.month = time_range.month_dict[time_range.year_list[0]][0];
})

// 控制左侧手风琴目录选项的开关
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleMenuSelect = (item: any) => {
    console.log(item.index);
    const post_data = {'year_month': item.index}
    axios.post('/api/get_history_data/', post_data).then(res => {
        // do something with res
        console.log(res.data);
        logs.value = res.data.logs;
        time_range.year = time_range.year_list[0];
        time_range.month = time_range.month_dict[time_range.year_list[0]][0];
    }).catch(err => {
        // do something with err
        console.log('request error!');
        console.log(err);
    });
}
</script>

<style lang="scss" scoped>
.box-card {
    margin: 10px 0;
    width: 95%;
    max-height: 500px;
    overflow-y: auto;
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