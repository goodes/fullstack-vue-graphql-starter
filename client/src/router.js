import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

import AddPost from './components/Posts/AddPost.vue';
import Posts from './components/Posts/Posts.vue';

import Profile from './components/Auth/Profile.vue';
import Signin from './components/Auth/Signin.vue';
import Signup from './components/Auth/Signup.vue';

import AuthGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/add',
      name: 'AddPosts',
      component: AddPost
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
});
