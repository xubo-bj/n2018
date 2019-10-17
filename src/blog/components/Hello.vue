<template>
  <div>
    <div class="greeting">{{message}} : {{reversedMessage}}</div>
    <ul>
      <li v-for="n in evenNumbers">{{ n }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { StringValidator } from "./v";
import { ZipCodeValidator } from "./z";
import { LettersOnlyValidator } from "./l";

let strings = ["Hello-kitty", "98052", "101"];

// Validators to use
let validators: { [s: string]: StringValidator } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
// Some samples to try

export default Vue.extend({
  data() {
    return {
      message: [1, 2, 3, 4, 5],
      numbers: [6, 7, 8, 9, 10, 11, 12]
    };
  },
  mounted() {},

  computed: {
    // 计算属性的 getter
    reversedMessage(): string {
      // `this` 指向 vm 实例
      return this.message.join();
    },
    evenNumbers: function(): number[] {
      return this.numbers.filter(function(number) {
        return number % 2 === 0;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.greeting {
  font-size: 60px;
}
</style>