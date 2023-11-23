<template>
    <div class="common-layout">
        <el-container style="height: 100vh;" direction="vertical">
            <el-header style="padding: 0; height: 150px;">
                <h1 style="padding: 20px;">CatHeadCat's Piano</h1>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1"><router-link to="simulator">Piano Simulator</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="animenz">Animenz Piano</router-link></el-menu-item>
                    <el-menu-item index="3" @click="toHome">Back</el-menu-item>
                </el-menu>
            </el-header>
            <div class="chc_piano_container">
                <router-view v-slot="{ Component }">
                    <keep-alive include="PianoSimulator, AnimenzPiano">
                        <component :is="Component" v-if="$route.meta.keepAlive" :key='$route.name'></component>
                    </keep-alive>
                </router-view>
            </div>
        </el-container>
    </div>
        
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const activeIndex = ref('1')
const router = useRouter();
const toHome = () => {
  router.push('/home')
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