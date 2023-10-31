<template>
    <el-backtop :right="30" :bottom="30" />
    <div class="intro_container">
        <el-card class="box-card">
            <el-row style="padding ">
                <el-col :span="20">
                    <h1>个人简介</h1>
                </el-col>
                <el-col :span="4" style="text-align: right">
                    <el-button round @click="toHome" :icon="ArrowLeft" circle />
                </el-col>
            </el-row>
            <el-card class="base_info" style="margin: 20px 0">
                <el-row style="margin: 20px 0; color: #fff; background-color: #ecf0f1; border-radius: 20px">
                    <el-col :span="4" style="padding: 10px; text-align: center; background-color: #2980b9; border-radius: 20px">
                        <h3>基本信息</h3>
                    </el-col>
                    <el-col :span="20" ></el-col>                    
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">姓 名</el-tag><span>周睿枭</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">性 别</el-tag><span>男</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">民 族</el-tag><span>汉族</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">电 话</el-tag><span>15528378367</span></div>     
                    </el-col>
                    <el-col :span="8">
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">政治面貌</el-tag><span>预备党员</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">出生年月</el-tag><span>1999.11</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">籍 贯</el-tag><span>山西运城</span></div>
                        <div><el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">邮 箱</el-tag><span>ruixiaozhou111@163.com</span></div>
                    </el-col>
                    <el-col :span="8" style="text-align: center">
                        <el-image style="width: 140px; height: 210px; border-radius: 10px" src="/public/ZRX.JPG" fit="fill" />
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="base_info" style="margin: 20px 0">
                <el-row style="margin: 20px 0; color: #fff; background-color: #ecf0f1; border-radius: 20px">
                    <el-col :span="4" style="padding: 10px; text-align: center; background-color: #2980b9; border-radius: 20px">
                        <h3>教育背景</h3>
                    </el-col>
                    <el-col :span="20" ></el-col>                    
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <h3>2017.9-2021.6</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>本科</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>西南交通大学</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>地理信息科学</h3>
                    </el-col>
                    <el-col :span="24">
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px">主修课程</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                GIS 数量分析方法与应用、WebGIS 技术与开发、三维 GIS 技术基础、GIS 应用开发、专题制图与空间信息可视化、空间数据库、数据结构等；
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <h3>2021.9-2024.6</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>硕士研究生</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>西南交通大学</h3>
                    </el-col>
                    <el-col :span="6">
                        <h3>测绘科学与技术</h3>
                    </el-col>
                    <el-col :span="24">
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">主修课程</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                时空大数据组织与管理、时空大数据分析、地图和地理信息多尺度表达与综合等；
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="base_info" style="margin: 20px 0">
                <el-row style="margin: 20px 0; color: #fff; background-color: #ecf0f1; border-radius: 20px">
                    <el-col :span="4" style="padding: 10px; text-align: center; background-color: #2980b9; border-radius: 20px">
                        <h3>在校经历</h3>
                    </el-col>
                    <el-col :span="20" ></el-col>                    
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <h3>2017.09-2021.06</h3>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">竞赛经历</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                参加校英语竞赛、“中海达”测绘技能竞赛、校数学建模竞赛等；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">任职经历</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                担任地学学院青年志愿者协会副会长，组织策划并参与消防系列、环保系列特色主题活动、地学“三下乡”暑期实践活动等；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">项目经历</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                参加校级 SRTP 项目《时序 SAR 影像统计均匀像素识别》；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">评奖评优</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                获得一等学业奖学⾦、校级明诚奖、“三好学⽣标兵”称号、“优秀共⻘团⼲部”称号、“优秀学生干部”称号、校级“五星级志愿者”称号；
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <h3>2021.09-2024.06</h3>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">课程成绩</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                学习成绩：88.38；综合成绩：91.88；综合排名：14/52；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">任职经历</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                2021-2024 学年担任团支部组宣委员；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">项目经历</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                参与国家重点研发计划项目 - 川藏铁路廊道复杂艰险山区典型地质要素与铁路重点设施遥感解译知识库构建、管理与应用系统研发；<br>
                                参与四川省自然资源科研项目 - 基于国土变更调查数据成果的知识化分析研究；<br>
                                参与某交通项目（涉密）－独立完成道路网络信息综合挖掘系统前后端的研发（主研）；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">评奖评优</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                2021 学年三等学业奖学金、2022 学年二等学业奖学金、2023 学年三等学业奖学金；2022-2023学年研究生优秀班集体、2021-2023 学年“两优一先”先进党支部；
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="base_info" style="margin: 20px 0">
                <el-row style="margin: 20px 0; color: #fff; background-color: #ecf0f1; border-radius: 20px">
                    <el-col :span="4" style="padding: 10px; text-align: center; background-color: #2980b9; border-radius: 20px">
                        <h3>证书技能</h3>
                    </el-col>
                    <el-col :span="20" ></el-col>                    
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <h3>2017.09-2021.06</h3>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">专业证书</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                英语六级证书；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">办公技能</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                熟练使用 MS Office / WPS 办公软件；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">职业技能</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                掌握 C++、C#、Matlab 等编程语言，熟练使用数据库，熟练掌握 Python 编程语言，熟练掌握 Javascript 前端编程语言，熟练掌握数据爬虫技术和基于 Vue+Flask+PostgreSQL 的框架的前后端系统开发，熟练使用 ArcGIS 软件；
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="base_info" style="margin: 20px 0">
                <el-row style="margin: 20px 0; color: #fff; background-color: #ecf0f1; border-radius: 20px">
                    <el-col :span="4" style="padding: 10px; text-align: center; background-color: #2980b9; border-radius: 20px">
                        <h3>自我评价</h3>
                    </el-col>
                    <el-col :span="20" ></el-col>                    
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <h3>2017.09-2021.06</h3>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">适应性强</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                能够快速适应全新的工作环境和团队文化，愿意发掘新的工作技能和知识，挑战未知事物；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">勤奋努力</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                工作认真负责，从不推卸责任，善于主动寻求解决问题的方案，为达成团队目标不懈奋斗；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">文字表达</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                能用清晰简洁的语言编写高质量文档、邮件和报告。善于处理细节，具备一定的写作技巧；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">团队合作</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                具有良好的沟通技巧和人际交往能力，能独立完成任务，协调各方面资源，确保按时完成；
                            </span>
                        </div>
                        <div style="margin: 10px 0;">
                            <el-tag class="mx-1" size="large" effect="dark" style="font-size: 20px; margin: 10px;">综合素质</el-tag>
                            <span style="display: inline-block; vertical-align: middle; width: 80%; word-break: break-all; white-space: normal;">
                                热爱生活、勤于探索、爱好广泛，自我管理意识较强，积极参与音乐、运动等领域的活动。
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ArrowLeft } from '@element-plus/icons-vue'
const router = useRouter();
const toHome = () => {
  router.push('/home')
}

// document.addEventListener("keydown",function(e){
//     alert("您按下的按钮的keyCode为："+e.keyCode)
// })
</script>

<style lang="scss" scoped>
.intro_container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}
</style>