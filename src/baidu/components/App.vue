<template>
  <div class="container">
    <top-bar />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar";
import Component from "vue-class-component";
@Component({
  components: { TopBar }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid #000;
}
</style>