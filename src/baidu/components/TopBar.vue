<template>
	<div class="top-bar">
		<a class="user btn" @click="SHOW_USER_INFO"
			><span class="user-icon"></span
		></a>
		<a class="menu btn" href="https://m.baidu.com/usrprofile?action=square"
			><span class="menu-icon"></span
		></a>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapMutations } from "vuex";
import { SHOW_USER_INFO } from "../store/mutation-types";
@Component({
	methods: mapMutations([SHOW_USER_INFO])
})
export default class TopBar extends Vue {}
</script>

<style lang="scss" scoped>
.top-bar {
	display: flex;
	justify-content: space-between;
	height: 52px;
	margin-bottom: 9px;
}
.btn {
	flex-basis: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	.user-icon {
		width: 20px;
		height: 20px;
		background-image: url(/baidu/images/btn_icon_1.png);
		background-size: contain;
	}
	.menu-icon {
		width: 16px;
		height: 16px;
		background-image: url(/baidu/images/btn_icon_2.png);
		background-size: contain;
	}
}
</style>
