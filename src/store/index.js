import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    the_New_userName: '',
    copy_list: []
  },
  mutations: {
    init_list(state, data) {
      state.list = data
      state.copy_list = state.list
    },
    change_the_New_userName(state, text) {
      state.the_New_userName = text
    },
    add_a_user_fun(state) {
      const obj = {
        name: state.the_New_userName,
        index: false
      }
      state.list.push(obj)
      state.copy_list = state.list
    },
    delete_a_user(state, userName) {
      var index = state.list.indexOf(userName)
      state.list.splice(index, 1)
      state.copy_list = state.list
    },
    delete_the_index_user(state) {
      state.list = state.list.filter(x => x.index === false)
      // for (var i = 0; i < state.list.length; i++) {
      //   if (state.list[i].index) {
      //     var index = state.list.indexOf(state.list[i])
      //     state.list.splice(index, 1)
      //   }
      // }
      state.copy_list = state.list
    },
    update(state, i) {
      // var table = []
      if (i === 1) {
        state.list = state.copy_list
      } else if (i === 2) {
        state.list = state.copy_list.filter(x => x.index === true)
        // for (i = 0; i < state.copy_list.length; i++) {
        //   if (state.copy_list[i].index === true) {
        //     table.push(state.copy_list[i])
        //   }
        // }
        // state.list = table
      } else if (i === 3) {
        state.list = state.copy_list.filter(x => x.index === false)
        // for (i = 0; i < state.copy_list.length; i++) {
        //   if (state.copy_list[i].index === false) {
        //     table.push(state.copy_list[i])
        //   }
        // }
        // state.list = table
      }
    }
  },
  actions: {
    getList(content) {
      axios.get('/list.json').then(function (data) {
        content.commit('init_list', data.data)
      })
    }
  },
  modules: {
  }
})
