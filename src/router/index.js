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
    path: '/force',
    name: 'Force',
    component: () => import( '../views/ForceView.vue')
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
    path: '/node/:node1',
    name: 'NodeC',
    component: () => import( '../views/NodeView.vue')
  },
  {
    path: '/node',
    name: 'Node',
    component: () => import( '../views/NodeView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
