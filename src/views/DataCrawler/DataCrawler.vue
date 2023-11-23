<template>
    <div class="common-layout">
        <el-container style="height: 100vh;" direction="vertical">
            <el-header style="padding: 0; height: 150px;">
                <h1 style="padding: 20px;">Data Crawler</h1>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1"><router-link to="microblog">MicroBlog Crawler</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="games">Games Crawler</router-link></el-menu-item>
                    <el-menu-item index="3" @click="toHome">Back</el-menu-item>
                </el-menu>
            </el-header>
            <div class="crawler_container">
                <router-view v-slot="{ Component }">
                    <keep-alive include="MicroBlogCrawler, GamesCrawler">
                        <component :is="Component" v-if="$route.meta.keepAlive" :key='$route.name'></component>
                    </keep-alive>
                </router-view>
            </div>
        </el-container>
    </div>

    <div>
        <el-button plain @click="test">Return Progress</el-button>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, watch } from 'vue'
import { useRouter } from "vue-router";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const activeIndex = ref('1')
const router = useRouter();
const toHome = () => {
  router.push('/home')
}

const number = ref(0);
var eventSource;
watch(number, (newVal, oldVal) => {
    console.log(newVal);
    if (newVal >= 9) {
        console.log('stop');
        eventSource.close();
    };
});

const test =()=> {
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
        number.value = event.data;
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
a{
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
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