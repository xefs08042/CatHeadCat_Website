<template>
  <div class="common-layout">
    <el-container style="height: 100vh;" direction="vertical">
      <el-header style="padding: 0; height: 150px;">
        <h1>CatHeadCat's Life Logs</h1>
        <div class="navigation-bar">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to="create">Create New Log</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="visit">Visit Historical Logs</router-link></el-menu-item>
            <el-sub-menu index="3">
              <template #title>else</template>
              <el-menu-item index="3-1">item one</el-menu-item>
              <el-menu-item index="3-2">item two</el-menu-item>
              <el-menu-item index="3-3">item three</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4" @click="toHome">Back</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <div class="CHCLog-main-box">
        <router-view v-slot="{ Component }">
          <keep-alive include="CreateNewLog, VisitHistoricalLogs">
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
const router = useRouter();
// router.push('/CHCLog/create')
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const toHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

h1 {
  padding: 20px;
}

a{
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.CHCLog-main-box {
  height: 100%;
}
</style>