<template>
	<div class="app-container">
		<side-bar class="side-bar" />

		<div class="content">
			<tab-names class="tab-names" />
			<work-space class="work-space" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import SideBar from "./SideBar.vue";
import WorkSpace from "./WorkSpace.vue";
import TabNames from "./TabNames.vue";

export default Vue.extend({
	components: {
		SideBar,
		TabNames,
		WorkSpace
	}
});
</script>

<style lang="scss" scoped>
.app-container {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	padding-left: 235px;
}
.side-bar {
	position: absolute;
	left: 0;
	width: 235px;
	height: 100%;
	background: #323232;
	overflow-x: hidden;
	overflow-y: auto;
}
.content {
	height: 100%;
	position: relative;
	padding-top: 50px;
}
.tab-names {
	position: absolute;
	top: 0;
	height: 50px;
	width: 100%;
	border-bottom: 1px solid #d5d5d5;
	line-height: 48px;
}
.work-space {
	height: 100%;
}
</style>
