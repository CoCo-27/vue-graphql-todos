<template>
  <div class="nav">
    <h1>Todos</h1>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "（昵称）"
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  height: 200px;
  color: #a0522d;
  h1 {
    color: #a0522d;
    font-size: 40px;
    line-height: 200px;
    text-align: center;
  }
  .name {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
