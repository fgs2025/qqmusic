import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const mod = require.context('./modules', true, /\.js$/)
const modules = mod.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')// set './app.js' => 'app'
  const value = mod(modulePath)
  modules[moduleName] = value.default//{'app':文件内容}
  return modules
}, {})

export default new Vuex.Store({
  modules,
  getters,
})
