<template>
	<div class="search-entry">
		<router-link class="entry" to="/baidu/searchpage"> </router-link>
		<span class="mic">
			<img class="mic-icon" src="/baidu/images/mic.svg" alt="" />
		</span>
		<span class="camera">
			<img class="camera-icon" src="/baidu/images/camera.svg" alt="" />
		</span>
		<button class="btn-icon">百度一下</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import Component from "vue-class-component";

@Component({})
export default class SearchEntry extends Vue {}
</script>

<style lang="scss" scoped>
.search-entry {
	height: 46px;
	margin: 0 16px;
	border: 1px solid #363636;
	display: flex;
}
.entry {
	flex-grow: 1;
}
.mic {
	width: 40px;
	line-height: 53px;
	padding-left: 11px;
	.mic-icon {
		width: 29px;
		height: 19px;
		padding-right: 10px;
		border-right: 1px solid #e8e8e8;
	}
}
.camera {
	padding-right: 10px;
	padding-left: 16px;
	background-image: url(/baidu/images/camera.svg);
	line-height: 50px;
	.camera-icon {
		width: 17px;
		height: 17px;
	}
}
.btn-icon {
	width: 81px;
	padding: 0 10px;
	border: 0;
	border-left: 1px solid #e8e8e8;
	font-size: 16px;
	font-weight: 700;
	line-height: 46px;
	white-space: nowrap;
	letter-spacing: -1px;
	color: #38f;
	background-color: #fff;
}
</style>
