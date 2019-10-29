<template>
	<div>
		<span>标签名称：</span>
		<input type="text" v-model="tagName" />
		<button class="btn" @click="showContent">提交</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { UPDATE_TAGNAME } from "../store/mutation-types.ts";

@Component({
	computed: {
		tagName: {
			get() {
				return this.$store.state.tagName;
			},
			set(value) {
				this.$store.commit(UPDATE_TAGNAME, { tagName: value });
			}
		}
	}
})
export default class TagCreate extends Vue {
	showContent() {
		console.log(this.$store.state.tagName);
	}
}
</script>

<style lang="scss" scoped></style>
