<template>
    <el-button @click="getTest">get数据</el-button>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default {
    name: "Axios",
    methods:{
        getTest(){
            this.$http.get("/api/login/",).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style lang="ts" scoped>

</style>