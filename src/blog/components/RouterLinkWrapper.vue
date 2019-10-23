<template>
	<div @click="emit_select_tab" :data-href="to">
		<router-link class="router-link" :to="to">
			{{ linkName }}
		</router-link>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
	props: ["linkName", "to"],
	computed: mapState(["currentTab"])
})
export default class RouterLinkWrapper extends Vue {
	to!: string;
	linkName!: string;
	get newTab() {
		return this.to.slice(6).split("/");
	}
	emit_select_tab(e: any) {
		this.$emit("select_tab", { currentTab: this.newTab });
	}
}
</script>
<style lang="scss" scoped>
.router-link {
	display: block;
	// color: rgba(255, 255, 255, 0.5);
	height: 50px;
	border: 1px solid #000;
}
</style>
