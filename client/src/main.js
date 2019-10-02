import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css';

import FormAlert from './components/Shared/FormAlert';

// Register a global component
Vue.component('form-alert', FormAlert);

Vue.config.productionTip = false;

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4500/graphql',
  // include the auth token with requests to the backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // if no token in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    // operation adds the token to the auth header
    // which is sent to the backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('networkError', networkError);
    }
    if (graphQLErrors) {
      console.error('[graphqlErrors]');
      for (let err of graphQLErrors) {
        if (err.name === 'AuthenticationError') {
          // set auth error in state (to show in snackbar)
          store.commit('setAuthError', err);
          store.dispatch('signoutUser');
        } else {
          console.dir(err);
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

new Vue({
  apolloProvider: apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
