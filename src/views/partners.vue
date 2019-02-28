<template>
  <div class="partners">
    <todoPanel v-for="user in partners" :key="user.id" :user="user"></todoPanel>
  </div>
</template>

<script>
import todoPanel from "@/components/todoPanel";
export default {
  components: { todoPanel },
  props: {
    partners: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.partners {
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 400px;
  padding: 0 15%;
  justify-content: space-between;
}
</style>
