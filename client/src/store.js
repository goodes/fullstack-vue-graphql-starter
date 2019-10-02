import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import { defaultClient as apolloClient } from './main';
import {
  GET_POSTS,
  SIGNIN_USER,
  GET_CURRENT_USER,
  SIGNUP_USER
} from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    error: null,
    loading: false,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    clearUser: state => (state.user = null),
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    clearError: state => (state.error = null),
    setError: (state, payload) => {
      state.error = payload;
    },
    clearAuthError: state => (state.authError = null),
    setAuthError: (state, payload) => {
      state.authError = payload;
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit('setLoading', false);
          // add user data to state
          commit('setUser', data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        // console.log(data.signinUser);
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setPosts', data.getPosts);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
      // use ApolloClient to fire getPosts query
    },
    signupUser: ({ commit }, payload) => {
      // reset any existing errors
      commit('clearError');
      // incase token is bad
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);

          localStorage.setItem('token', data.signupUser.token);
          // to make sure that cereated method is run we will refresh the page
          router.go(); // this will refresh the page
        })
        .catch(err => {
          commit('setLoading', false);

          commit('setError', err);
          // console.error(err);
        });
    },
    signinUser: ({ commit }, payload) => {
      // reset any existing errors
      commit('clearError');
      // incase token is bad
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);

          localStorage.setItem('token', data.signinUser.token);
          // to make sure that cereated method is run we will refresh the page
          router.go(); // this will refresh the page
        })
        .catch(err => {
          commit('setLoading', false);

          commit('setError', err);
          // console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser');

      // remove token from localStorage
      localStorage.setItem('token', '');

      // end session
      apolloClient.resetStore();

      // redirect home - kick user out of current page
      router.push('/');
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authError: state => state.authError
  }
});
