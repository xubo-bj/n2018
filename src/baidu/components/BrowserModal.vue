<template>
	<div class="browser-modal" v-if="browserModal">
		<div class="modal-box">
			<div class="modal-head">
				<div class="btn" @click="HIDE_BROWSER_MODAL">×</div>
			</div>
			<div class="modal-body">请使用移动浏览器，获取更佳的浏览效果</div>
			<div class="modal-foot"></div>
		</div>
		<div class="modal-mask" @click="HIDE_BROWSER_MODAL"></div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import { HIDE_BROWSER_MODAL } from "../store/mutation-types";
@Component({
	computed: mapState(["browserModal"]),
	methods: mapMutations([HIDE_BROWSER_MODAL])
})
export default class BrowserModal extends Vue {}
</script>

<style lang="scss" scoped>
.browser-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: flex;
	justify-content: center;
}

.modal-box {
	align-self: start;
	position: relative;
	z-index: 1;
	margin-top: 150px;
	width: 400px;
	background-color: #fff;
	.modal-head {
		position: relative;
		height: 70px;
		border-bottom: 1px solid #dee2e6;
		.btn {
			position: absolute;
			right: 0;
			padding: 16px;
			// font-size: 1.5rem;
			font-size: 30px;
			font-weight: 700;
			line-height: 1;
			color: #000;
			opacity: 0.5;
			text-shadow: 0 1px 0 #fff;
		}
	}
	.modal-body {
		padding: 20px 0;
		border-bottom: 1px solid #dee2e6;
		text-align: center;
	}
	.modal-foot {
		height: 70px;
	}
}

.modal-mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.5;
}
</style>
