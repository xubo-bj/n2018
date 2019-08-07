<template>
<div>{{message}} : {{reversedMessage}}</div>
</template>

<script lang="ts">

import Vue from "vue"

export default Vue.extend({
    data(){
        return{
            message:"this is success"
        }
    },

    computed: {
    // 计算属性的 getter
    reversedMessage:function():string{
      // `this` 指向 vm 实例
      console.log("output" ,this.message)
      return this.message + "abc"
    }
  }
});

</script>

<style lang="scss" scoped>
.greeting {
    font-size: 40px;
}
</style>