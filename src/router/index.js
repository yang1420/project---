import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },

  {
    path:'/',
    name:'home',
    component: HomeView,
    redirect: '/welcome',

    children:[
      {
        path:'welcome',
        name:'welcome',
        component:()=> import ('../views/WelcomeView.vue')
        //「懒加载（异步加载）组件」写法
    },
      {
        path:'user_list',
        name:'user_list',
        component:()=> import ('../views/UserView.vue')

    }
  
  
  
  ]

    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
