<template>
  <a-spin :spinning="$apollo.queries.user.loading">
    <div class="home">
      <navbar :name="user.name"></navbar>
      <todos :todos="user.todos"></todos>
      <partners :partners="user.partners"></partners>
    </div>
  </a-spin>
</template>

<script>
// @ is an alias to /src
import navbar from "./navbar";
import todos from "./todos";
import partners from "./partners";
import gql from "graphql-tag";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      user: {}
      // id: "1"
    };
  },
  components: {
    navbar,
    todos,
    partners
  },
  computed: {
    ...mapState(["id"])
  },
  apollo: {
    user: {
      // gql 查询
      query: gql`
        query user($id: ID!) {
          user(id: $id) {
            name
            todos {
              id
              type
              content
            }
            partners {
              id
              name
              todos {
                id
                type
                content
              }
            }
          }
        }
      `,
      // 静态参数
      variables() {
        return {
          id: this.id
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #fffaf0;
}
</style>
