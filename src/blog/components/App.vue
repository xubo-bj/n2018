<template>
	<div class="app-container">
		<side-bar class="side-bar" />
		<work-space class="work-space" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import SideBar from "./SideBar.vue";
import WorkSpace from "./WorkSpace.vue";

export default Vue.extend({
	components: {
		SideBar,
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
.work-space {
	border: 1px solid #00f;
	height: 100%;
}
</style>
