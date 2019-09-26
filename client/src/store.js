import Vue from 'vue';
import Vuex from 'vuex';

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
                description
                likes
              }
            }
          `
        })
        .then(({ data }) => {
          // Get data from actions and pass it to the state via a mutation
          // commit will pass the data from actions to our mutation function
          commit('setPosts', data.getPosts);
          // console.log(data.getPosts);
        })
        .catch(err => {
          console.error(err);
        });
      // use ApolloClient to fire getPosts query
    }
  },
  getters: {
    posts: state => state.posts
  }
});
