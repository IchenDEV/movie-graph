import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Reg',

    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommunityView.vue')
  },
  {
    path: '/community/:id1',
    name: 'Community',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommunityView.vue')
  },
  {
    path: '/community/:id1/:id2/',
    name: 'Community',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommunityView.vue')
  },
  {
    path: '/community/:id1/:id2/:id3',
    name: 'Community',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommunityView.vue')
  },
  {
    path: '/relation/:node1/:node2',
    name: 'Relation',
    component: () => import( '../views/RelationshipView.vue')
  },
  {
    path: '/relation',
    name: 'Relation2',
    component: () => import( '../views/RelationshipView.vue')
  },
  {
    path: '/PersonNode/:node1',
    name: 'Node',
    component: () => import( '../views/PersonNodeView.vue')
  },
  {
    path: '/PersonNode/',
    name: 'NodeC',
    component: () => import( '../views/PersonNodeView.vue')
  },
  {
    path: '/MovieNode',
    name: 'MovieNode',
    component: () => import( '../views/MovieNodeView.vue')
  },
  {
    path: '/Node/:type/:id',
    name: 'Node',
    component: () => import( '../views/NodeView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
