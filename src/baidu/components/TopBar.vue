<template>
	<div class="top-bar">
		<a class="user btn"><span class="user-icon"></span></a>
		<a class="menu btn" href="https://m.baidu.com/usrprofile?action=square"
			><span class="menu-icon"></span
		></a>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
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
