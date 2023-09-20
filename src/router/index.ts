import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import Home from "../views/Home/Home.vue"
import Login from "../views/Login/Login.vue"
import CHCLog from "../views/CHCLog/CHCLog.vue"
import TaskLog from "../views/TaskLog/TaskLog.vue"
import KnowledgeGraph from '../views/KnowledgeGraph/KG.vue'
import AccountDetail from '../views/AccountDetail/AccountDetail.vue'
const routes:RouteRecordRaw[] = [
    {
        path:'/',
        name:'Login',
        component:Login
    },
    {
        path:'/home',
        name:'Home',
        component:Home
    },
    {
        path:'/CHCLog',
        name:'CHCLog',
        component:CHCLog,
        redirect: to => {
            return '/CHCLog/create'
        },
        children:[
            {
                path:'/CHCLog/create',
                name:'CreateNewLog',
                component:()=>import('../views/CHCLog/CreateNewLog.vue'),
                meta: {
                    keepAlive:true
                }
            },
            {
                path:'/CHCLog/visit',
                name:'VisitHistoricalLogs',
                component:()=>import('../views/CHCLog/VisitHistoricalLogs.vue'),
                meta: {
                    keepAlive:true
                }
            },
        ]
    },
    {
        path:'/TaskLog',
        name:'TaskLog',
        component:TaskLog,
        redirect: '/TaskLog/create',
        children:[
            {
                path:'/TaskLog/create',
                name:'CreateNewLogT',
                component:()=>import('../views/TaskLog/CreateNewLog.vue'),
                meta: {
                    keepAlive:true
                }
            },
            {
                path:'/TaskLog/visit',
                name:'VisitHistoricalLogsT',
                component:()=>import('../views/TaskLog/VisitHistoricalLogs.vue'),
                meta: {
                    keepAlive:true
                }
            },
        ]
    },
    {
        path:'/KnowledgeGraph',
        name:'KnowledgeGraph',
        component:KnowledgeGraph,
    },
    {
        path:'/AccountDetail',
        name:'AccountDetail',
        component:AccountDetail,
    },
]
const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router