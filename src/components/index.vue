<template>
  <div id="box">
    <div id="up_div">
      <el-input
        placeholder="请输入用户名称"
        v-model="inputText"
        @input="inputTextChange"
        clearable
      >
      </el-input>
      <el-button type="primary" @click="addUser_click">添加用户</el-button>
    </div>
    <div id="bottom_div">
      <el-table
        ref="multipleTable"
        :data="this.$store.state.list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
        stripe
        :show-header="false"
      >
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.index"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="名字" width="300">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column id="edit_table_column" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div id="bottom_edit">
        <span>{{ this.$store.state.list.length }}条剩余</span>
        <el-radio-group v-model="isCollapse" @change="radio_change">
          <el-radio-button :label="1">全部</el-radio-button>
          <el-radio-button :label="2">已经完成</el-radio-button>
          <el-radio-button :label="3">未完成</el-radio-button>
        </el-radio-group>
        <el-button type="text" @click="handleDelete_index()"
          >删除已完成</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      multipleSelection: [],
      isCollapse: 1
    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  mounted() {},
  methods: {
    update_fun() {
      this.$store.commit('update', this.isCollapse)
    },
    radio_change(e) {
      this.update_fun()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete_index() {
      this.$store.commit('delete_the_index_user')
    },
    handleDelete(u) {
      this.$store.commit('delete_a_user', u)
    },
    inputTextChange(e) {
      this.$store.commit('change_the_New_userName', e)
    },
    addUser_click() {
      this.$store.commit('add_a_user_fun')
    }
  }
}
</script>

<style lang="scss" scoped>
#box {
  margin-left: 20px;
  width: 500px;
  #up_div {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-input {
      width: 300px;
    }
  }
  #bottom_div {
    margin-top: 20px;
    #bottom_edit {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #767779;
        margin-left: 5px;
      }
      .el-button {
        margin-right: 5px;
      }
    }
  }
}
</style>
