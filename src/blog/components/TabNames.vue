<template>
	<div class="container">
		<span class="text">首页</span>
		<span class="separator">/</span>
		<span
			class="text"
			:class="{ current: currentTab[0] === 'dashboard' }"
			>{{ tab_names[0] }}</span
		>
		<span class="separator">{{ tab_names[1] != null ? "/" : null }}</span>
		<span class="text current">{{ tab_names[1] }}</span>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Component from "vue-class-component";
import { stateShape } from "../store/state";

@Component({
	computed: mapState(["currentTab"])
})
export default class TabNames extends Vue {
	currentTab!: (state: stateShape) => string[];
	get tab_names(this: any) {
		let name_1 = null,
			name_2 = null;
		switch (this.currentTab[0]) {
			case "dashboard": {
				name_1 = "概述";
				name_2 = null;
				break;
			}
			case "post": {
				name_1 = "文章管理";
				if (this.currentTab[1] === "list") {
					name_2 = "文章列表";
				} else {
					name_2 = "添加文章";
				}
				break;
			}
			case "category": {
				name_1 = "分类管理";
				if (this.currentTab[1] === "list") {
					name_2 = "分类列表";
				} else {
					name_2 = "添加分类";
				}
				break;
			}
			case "tag": {
				name_1 = "标签管理";
				if (this.currentTab[1] === "list") {
					name_2 = "标签列表";
				} else {
					name_2 = "添加标签";
				}
				break;
			}
			default: {
			}
		}
		return [name_1, name_2];
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding-left: 20px;
}
.separator {
	margin: 0 4px;
	color: #ccc;
}
.text {
	color: #1890ff;
	font-size: 14px;
	&.current {
		color: #777;
	}
}
</style>
