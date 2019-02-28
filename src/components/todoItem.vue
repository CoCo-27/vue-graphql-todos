<template>
  <div class="todoItem">{{ todo.content }}</div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object
    }
  }
};
</script>

<style scoped></style>
