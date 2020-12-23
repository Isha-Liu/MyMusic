import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#B8EAC9',
        secondary: '#b0bec5',
        accent: '#C9FFDB',
        error: '#C95252'
      },
      dark: {
        primary: '#B8EAC9',
        secondary: '#b0bec5',
        accent: '#C9FFDB',
        error: '#C95252'
      }
    }
  }
})

export default vuetify

// export default new Vuetify({})
