import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/Index.vue'
import Layout from '@/components/layout/Layout.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    component: Layout,
    children:[
      {
        path:'/',
        component:()=>import("../views/Index.vue")
      },
      {
        path:'/film',
        component:()=>import("../views/Film.vue")
      },
      {
        path:'/activity',
        component:()=>import("../views/Activity.vue")
      },
      {
        path:'/message',
        component:()=>import("../views/Message.vue")
      },
      {
        path:'/filmindex',
        component:()=>import("../views/films/Filmindex.vue"),
        children:[
          {
            path:'/details',
            component:()=>import("../views/films/Details.vue"),
          },
          {
            path:'/ticket',
            component:()=>import("../views/films/Ticket.vue"),
          }
        ]
      },
      {
        path:'/Seat',
        component:()=>import("../views/Seat.vue")
      },
      {
        path:'/meindex',
        component:()=>import("../views/me/Meindex"),
        children:[
          {
            path:'/cart',
            component:()=>import("../views/me/Cart")
          },
          {
            path:'/order',
            component:()=>import("../views/me/Order")
          },
          {
            path:'/setting',
            component:()=>import("../views/me/Setting")}
        ]
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
