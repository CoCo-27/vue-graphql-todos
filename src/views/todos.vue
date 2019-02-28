<template>
  <div class="todos">
    <a-input
      size="large"
      placeholder="what needs to be done?"
      v-model="content"
      @pressEnter="addTodo"
    />
    <a-list
      bordered
      :dataSource="todos"
      :locale="{ emptyText: 'Create your first todo!' }"
    >
      <a-list-item slot="renderItem" slot-scope="todo">
        <a-list-item-meta :description="todo.content"> </a-list-item-meta>
        <div class="type">{{ todo.type }}</div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { mapState } from "vuex";

export default {
  data() {
    return {
      content: ""
    };
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(["id"])
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
              content: this.content
            }
          }
        })
        .catch(e => {
          console.log(e);
          alert(e.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.todos {
  width: 50%;
  margin: 0 auto;
  .ant-list {
    background-color: #fff !important;
    border: 1px solid #d9d9d9;
    border-top: none;
    .type {
      color: #ff9300;
    }
  }
}
</style>
