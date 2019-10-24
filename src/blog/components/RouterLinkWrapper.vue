<template>
	<div @click="emit_select_tab" :data-href="to">
		<router-link class="router-link icon" :class="[linkClass]" :to="to">
			{{ linkName }}
		</router-link>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
	props: ["linkName", "to", "linkClass"],
	computed: mapState(["currentTab"])
})
export default class RouterLinkWrapper extends Vue {
	to!: string;
	linkName!: string;
	linkClass!: string;
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
	height: 50px;
	color: #999;
	font-size: 14px;
	line-height: 48px;
	border-bottom: 1px solid #434343;
}
</style>
