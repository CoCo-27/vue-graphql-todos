<template>
  <div class="todos">
    <a-input-group size="large">
      <a-select v-model="type">
        <a-select-option value="normal">normal</a-select-option>
        <a-select-option value="life">life</a-select-option>
        <a-select-option value="work">work</a-select-option>
      </a-select>
      <a-input
        width="50%"
        placeholder="what needs to be done?"
        v-model="content"
        @pressEnter="addTodo"
      />
    </a-input-group>
    <a-spin :spinning="$apollo.queries.pTodos.loading">
      <a-list
        bordered
        :dataSource="realTodos"
        :locale="{ emptyText: 'Create your first todo!' }"
      >
        <a-list-item slot="renderItem" slot-scope="todo">
          <a-list-item-meta :description="todo.content">
            <a-button
              size="small"
              shape="circle"
              icon="check"
              slot="avatar"
              @click="removeTodo(todo.id)"
            ></a-button>
          </a-list-item-meta>
          <div class="type">{{ todo.type }}</div>
        </a-list-item>
        <!-- <div slot="footer">
          <a-pagination
            size="small"
            :total="50"
            :showTotal="total => `Remain ${total} todos`"
          />
        </div> -->
      </a-list>
    </a-spin>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { mapState } from "vuex";
// import { debug } from "util";

export default {
  data() {
    return {
      type: "normal",
      content: "",
      pTodos: null,
      skipQueryPtodos: true,
      pageSize: 5
    };
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(["id"]),
    realTodos() {
      return this.pTodos || this.todos;
    }
  },
  apollo: {
    pTodos: {
      // gql 查询
      query: gql`
        query todos($owner: String!) {
          pTodos: todos(owner: $owner) {
            id
            type
            content
          }
        }
      `,
      // 响应式参数
      variables() {
        return {
          owner: this.id
        };
      },
      // 设置初始跳过查询
      skip() {
        return this.skipQueryPtodos;
      }
    }
  },
  methods: {
    async addTodo() {
      this.result = await this.$apollo
        .mutate({
          // 查询语句
          mutation: gql`
            mutation($todo: PostTodo) {
              addTodo(todo: $todo) {
                type
                content
              }
            }
          `,
          // 参数
          variables: {
            todo: {
              owner: this.id,
              content: this.content,
              type: this.type
            }
          }
        })
        .catch(e => {
          console.log(e);
          alert(e.message);
        });
      this.getPersonnalTodos(this.id);
    },
    async getPersonnalTodos() {
      // 取消跳过
      this.skipQueryPtodos = false;
      // 触发查询
      this.$apollo.queries.pTodos.refetch();
      this.content = "";
    },
    async removeTodo(id) {
      this.result = await this.$apollo
        .mutate({
          // 查询语句
          mutation: gql`
            mutation($id: ID!) {
              deleteTodo(id: $id) {
                content
                type
              }
            }
          `,
          // 参数
          variables: {
            id
          }
        })
        .catch(e => {
          console.log(e);
          alert(e.message);
        });
      this.getPersonnalTodos(this.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.todos {
  width: 50%;
  margin: 0 auto;
  .ant-input-group {
    display: flex;
    align-items: stretch;
  }
  .ant-list {
    background-color: #fff !important;
    border: 1px solid #d9d9d9;
    border-top: none;
    max-height: 250px;
    overflow: auto;
    .type {
      color: #ff9300;
    }
  }
}
</style>
<style>
.ant-select-selection__rendered {
  line-height: 40px;
}
</style>
