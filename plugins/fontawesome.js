import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fas from '@fortawesome/fontawesome-free-solid'
import fab from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(fas, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
