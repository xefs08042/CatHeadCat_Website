<template>
    <div class="common-layout">
        <el-container style="height: 100vh;" direction="vertical">
            <el-header style="padding: 0; height: 150px;">
                <h1>CatHeadCat's Account Detail</h1>
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">Item 1</el-menu-item>
                    <el-menu-item index="2">Item 2</el-menu-item>
                    <el-menu-item index="3" @click="toHome">Back</el-menu-item>
                </el-menu>
            </el-header>
            <div class="account_detail_container">
                <SpendingTable></SpendingTable>
                <el-row>
                    <el-col :span="12"><el-card class="spending-card"><SpendingTrends></SpendingTrends></el-card></el-col>
                    <el-col :span="12"><el-card class="spending-card"><SpendingRatio></SpendingRatio></el-card></el-col>
                </el-row>
            </div>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import SpendingTable from './SpendingTable.vue'
import SpendingTrends from './SpendingTrends.vue'
import SpendingRatio from './SpendingRatio.vue'
const router = useRouter();
const toHome = () => {
  router.push('/home')
}
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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

.account_detail_container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    text-align: center;
}

.spending-card {
    margin: 5px;
    text-align: center;
    max-height: 300px;
    overflow-y: auto;
}
</style>