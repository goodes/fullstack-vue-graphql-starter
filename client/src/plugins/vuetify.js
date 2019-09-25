import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.green.base,
        secondary: colors.green.lighten4,
        accent: colors.amber.darken2,
        error: colors.red.accent1,
        warning: colors.yellow.base,
        info: colors.blue.base,
        success: colors.green.base
      }
    }
  }
});
