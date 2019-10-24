import Vue from 'vue';
import VueRouter from 'vue-router';
import login from './components/login/login.vue';
import largeScreen from './components/screen/largeScreen.vue';
import layout from './components/layout/layout.vue';
import home from './components/main-page/home.vue'
import webList from './components/main-page/webList.vue'
import report from './components/main-page/report.vue'
import report1 from './components/main-page/report1.vue'
import changepwd from './components/main-page/changepwd.vue'
import ttt from './components/main-page/ttt.vue'
import application from './components/main-page/application.vue'
import appDetail from './components/main-page/appdetail.vue'
// import certificate from './components/main-page/certificate.vue'
// import certificateDetail from './components/main-page/certificateDetail.vue'
import waf from './components/main-page/waf.vue'
import cc from './components/main-page/cc.vue'
import tactics from './components/main-page/tactics.vue'
import waflogs from './components/main-page/waflogs.vue'
import cclogs from './components/main-page/cclogs.vue'
import scanlogs from './components/main-page/scanlogs.vue'
import logsdetail from './components/main-page/logsdetail.vue'
import accesslogs from './components/main-page/accesslogs.vue'
import nodes from './components/main-page/nodes.vue'
import nodesdetail from './components/main-page/nodesdetail.vue'
import users from './components/main-page/users.vue'
import usersdetail from './components/main-page/usersdetail.vue'
import notfound from './components/main-page/notfound.vue'
Vue.use(VueRouter);
var router = new VueRouter({
    scrollBehavior(to, from, savedPosition) { //跳转后滚动条回顶部
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: [{
        path: '/login',
        name: '登录',
        component: login
    }, {
        path: '/large/:site',
        name: '大屏',
        component: largeScreen,
        meta: { requireAuth: true, roles: ['0'] }
    }, {
        path: '/',
        component: layout,
        redirect: '/home',
        children: [{
            path: '/home',
            component: home,
            meta: { requireAuth: true, roles: ['2'] },
            name: '首页',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/webList',
            component: webList,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'web',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/report/:domain/:date',
            component: report,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'report',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            // path: '/report1',
            path: '/report1/:domain/:date',
            component: report1,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'report1',
            menuShow: true
        }]
    },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/changepwd',
            component: changepwd,
            meta: { requireAuth: true, roles: ['1', '2'] },
            name: 'changepwd',
            menuShow: true
        }]
    },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/application',
            component: application,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'app',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/application/:id',
            component: appDetail,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'appDetail',
            menuShow: true
        }]
    },
    // {
    //     path: '/',
    //     component: layout,
    //     children: [{
    //         path: '/certificate',
    //         component: certificate,
    //         meta: { requireAuth: true, roles: ['1'] },
    //         name: 'certificate',
    //         menuShow: true
    //     }]
    // },
    // {
    //     path: '/',
    //     component: layout,
    //     children: [{
    //         path: '/certificate/:id',
    //         component: certificateDetail,
    //         meta: { requireAuth: true, roles: ['1'] },
    //         name: 'certificateDetail',
    //         menuShow: true
    //     }]
    // },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/waf',
            component: waf,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'waf',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/cc',
            component: cc,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'cc',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/tactics/:id',
            component: tactics,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'tactics',
            menuShow: true
        }]
    },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/waflogs',
            component: waflogs,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'waflogs',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/cclogs',
            component: cclogs,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'cclogs',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/scanlogs',
            component: scanlogs,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'scanlogs',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/accesslogs',
            component: accesslogs,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'accesslogs',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/logsdetail/:type/:id',
            component: logsdetail,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'logsdetail',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/nodes',
            component: nodes,
            meta: { requireAuth: true, roles: ['2'] },
            name: 'nodes',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/nodes/:id',
            component: nodesdetail,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'nodesdetail',
            menuShow: true
        }]
    }, {
        path: '/',
        component: layout,
        children: [{
            path: '/users',
            component: users,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'users',
            menuShow: true
        }]
    },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/users/:id',
            component: usersdetail,
            meta: { requireAuth: true, roles: ['1'] },
            name: 'usersdetail',
            menuShow: true
        }]
    },
    {
        path: '/',
        component: layout,
        children: [{
            path: '/ttt',
            component: ttt,
            meta: { requireAuth: true, roles: ['1', '2'] },
            name: 'ttt',
            menuShow: true
        }]
    },
    {
        path: '/notfound',
        name: '404',
        component: notfound
    },
    { path: '/*', redirect: '/notfound' }
    ],
    linkActiveClass: 'van-tabbar-item--active'
});

router.beforeEach((to, from, next) => {
    // if (to.path.startsWith('/login')) {
    //     window.localStorage.removeItem('access-user')
    //     window.localStorage.removeItem('user')
    //     next()
    // } else {
    //     let user = JSON.parse(window.localStorage.getItem('user'))
    //     let user1 = JSON.parse(window.localStorage.getItem('access-user'))
    //     if (!user && !user1) {
    //         next({
    //             path: '/login'
    //         })
    //     } else {
    //         next()
    //     }
    // }

    if (to.path.startsWith('/login')) {
        localStorage.removeItem('user')
        localStorage.removeItem('access-user')
        localStorage.removeItem('role')

        next()
    } else {
        let token = localStorage.getItem('access-user')
        let role = localStorage.getItem('role')
        if (token === null || token === '' || role === '') {
            next('/login')
        } else {
            if (to.meta.roles) {
                if (to.meta.roles.length !== 0) {
                    for (let i = 0; i < to.meta.roles.length; i++) {
                        if (role === to.meta.roles[i]) {
                            next()
                            break
                        } else {
                            if (from.path === '/' && role === '1') {
                                next('/application')
                            } else if (from.path === '/' && role === '2') {
                                next('/home')
                            } else {
                                next()
                            }
                        }
                    }
                }
            } else {
                next()
            }
        }
    }
})

export default router;