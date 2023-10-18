import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Main from '../components/Main'
import AsideMenu from '../components/AsideMenu'
import Employee from '../components/Employee'
import Department from '../components/Department'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'      //redirect是重定向, 将根路径重定向到/login的路径下
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/main',
            name: 'Main',
            component: Main,
            children: [
                {
                    path: '/asideMenu',
                    name: 'AsideMenu',
                    component: AsideMenu
                },
                {
                    path: '/employee',
                    name: 'Employee',
                    component: Employee
                },
                {
                    path: '/department',
                    name: 'Department',
                    component: Department
                }
            ]
        },        
    ],
    mode: "history"
})