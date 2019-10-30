<template>
	<div @click="emit_select_tab" :data-href="to">
		<router-link
			class="router-link icon"
			:class="[linkClass, { selected, active }]"
			:to="to"
		>
			{{ linkName }}
		</router-link>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
	props: ["linkName", "to", "linkClass", "selected", "active"],
	computed: mapState(["currentTab"])
})
export default class RouterLinkWrapper extends Vue {
	to!: string;
	linkName!: string;
	linkClass!: string;
	selected!: boolean;
	active!: boolean;
	get newTab() {
		return this.to.slice(6).split("/");
	}
	emit_select_tab() {
		this.$emit("select_tab", { currentTab: this.newTab });
	}
}
</script>
<style lang="scss" scoped>
.router-link {
	display: block;
	height: 50px;
	color: #999;
	background: #3f3f3f;
	font-size: 14px;
	line-height: 48px;
	border-bottom: 1px solid #434343;
	padding-left: 40px;
	transition: color 0.3s;
	&:hover {
		background: #323232;
		color: #fff;
	}
	&.selected {
		// border-color: #207fbd;
		background: #3695d5;
		color: #fff;
	}
	&.active {
		color: #fff;
		background: #323232;
	}
	&.icon::before {
		font-size: 16px;
	}
	&.icon-list::before {
		visibility: hidden;
	}
}
</style>
