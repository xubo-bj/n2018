<template>
<div class="greeting">{{message}} : {{reversedMessage}}</div>
</template>

<script lang="ts">

import Vue from "vue"
export default Vue.extend({
    data(){
        return{
            message:"this is ok"
        }
    },

    computed: {
    // 计算属性的 getter
    reversedMessage():string{
      // `this` 指向 vm 实例
      console.log("this",this.message)
      return this.message + "123"
    }
  }
});



</script>

<style lang="scss" scoped>
.greeting {
    font-size: 60px;
}
</style>