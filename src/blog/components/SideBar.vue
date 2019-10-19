<template>
	<div @click="test">this is sidebar</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { SELECT_TAB } from "../store/mutation-types.ts";
import Component from "vue-class-component";

@Component({
	methods: mapMutations([SELECT_TAB])
})
export default class SideBar extends Vue {
	SELECT_TAB!: (obj: object) => void;
	test() {
		this.SELECT_TAB({ me: "ok-2" });
	}
}

// export default Vue.extend({
// 	methods: {
// 		...mapMutations([SELECT_TAB]),
// 		test() {
// 			this.SELECT_TAB({ me: "ok" });
// 		}
// 	}
// });
</script>
