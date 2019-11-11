<template>
	<div
		class="user-mask"
		@click="HIDE_USER_INFO"
		:class="{ show: displayUserInfo }"
	></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import { HIDE_USER_INFO } from "../store/mutation-types";
@Component({
	computed: mapState(["displayUserInfo"]),
	methods: mapMutations(["HIDE_USER_INFO"])
})
export default class UserMask extends Vue {}
</script>

<style lang="scss" scoped>
.user-mask {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	transition: opacity 0.1s;
	transform: translateX(-100%);
	background-color: #000;
	opacity: 0;
	z-index: 19;
}
.show {
	opacity: 0.5;
	transform: translateX(0);
}
</style>
