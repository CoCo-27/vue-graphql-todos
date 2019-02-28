<template>
  <div class="todoPanel">
    <a-card :title="user.name" style="width: 260px">
      <!-- <a-icon type="user" slot="extra" /> -->
      <i slot="extra" @click="changeId(user.id)" class="change">切换</i>
      <!-- <i slot="extra"><a-icon type="user"/></i> -->
      <a-list
        :dataSource="user.todos"
        :locale="{ emptyText: 'No content!' }"
        size="small"
      >
        <a-list-item slot="renderItem" slot-scope="todo">
          <a-list-item-meta :description="todo.content"> </a-list-item-meta>
          <div class="type">{{ todo.type }}</div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    changeId(value) {
      this.$store.commit("setId", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.todoPanel {
  .change {
    cursor: pointer;
  }
  .type {
    color: #ff9300;
  }
}
</style>
