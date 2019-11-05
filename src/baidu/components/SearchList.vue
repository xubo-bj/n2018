<template>
	<div class="search-list">
		<a class="list-container" href="http://baidu.com">
			<span class="magnifier-icon"></span>
			<button class="list-text" v-html="rawHtml"></button>
		</a>
		<span class="arrow-icon"></span>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import Component from "vue-class-component";
@Component({
	props: ["value"],
	computed: mapState(["searchKeyWord"])
})
export default class SearchList extends Vue {
	value!: string;
	searchKeyWord!: string;
	get rawHtml() {
		var regex1 = RegExp(this.searchKeyWord, "g");
		return this.value.replace(
			regex1,
			`<em style="font-style:normal;font-weight:400;color:#878787">${this.searchKeyWord}</em>`
		);
	}
}
</script>
<style lang="scss" scoped>
.search-list {
	border-bottom: 1px solid #f1f1f1;
	line-height: 24px;
	font-size: 18px;
	min-height: 45px;
	height: 46px;
	display: flex;
}
.list-container {
	display: flex;
	flex-grow: 1;
	.magnifier-icon {
		width: 15px;
		// height: 100%;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAUVBMVEUAAADNzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Q0NDb29vNzc3Nzc3MzMzMzMzMzMzNzc3Nzc3Nzc3Ozs7Pz8/Q0NDMzMzOzs7Ozs7MzMzNzc3MzMyjngBVAAAAGnRSTlMA9Vgt/Nyjjg0H4FDOw7+2rYhiQCYeFXzjewzxqiMAAAEsSURBVEjHlZVZFoMgDEUDVIRirVOd9r/QGk5TrFgw78uDF3gJkMBBatF1IURR60VBWqos1p2KMjHhpddI+nXO2lasJxKtPYHHx+dv0/WDMUPfNZ/ZjzF2fF9RlbO73VzlB+/qCAs/LOEg6RcRv/joB58GIpmnX2ZvxnrPJZyq9N53BtsIjvA25FmgDfgrNCO+edfozPynDUalKR+4k4SEJBIq+KogqSrEhRfJpWmHV+xrRNg0bQVZmbaPBjJqNmiijHQ5uqOs1NtHn6P7DaopyCFHDxQmBmBytMFU8GieE16UvAyyTmfhnTzrVvFuLO81sF4a7xWzKgSv+jAq200yqibilyvyjfBL1V4Sfq2TEH6tSwU83wFjPEhN1F0nQgPuIK+Az8DAGTS4eXZvXiowQ7wpXsEAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 15px 15px;
	}
	.list-text {
		background-color: #fff;
		border: none;
		font-weight: 700;
		font-size: 16px;
		color: #333;
		padding-left: 14px;
	}
}
.arrow-icon {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnBAMAAAB+jUwGAAAAKlBMVEUAAADR0dHMzMzPz8/Nzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Ozs7MzMzMzMwenBEEAAAADXRSTlMABNkZr/ijVTTxlX1u3UxzJQAAAI1JREFUKM+Fy7EJQkEQRdEnNmBmFSZ2YBNmvwRBOxBsxCbMLUIFg+1FBeGwO8GfZJjLmdxaP/tVkqkNc0zSZqL37378tvnLXY0bVNyi4hIVg0ZEIwaNiEZERbSLqIiK6BBRERVRERULFVERFVERFUcqoiIqomJPp2cqPbxS6fqUQp3o3YVeU+n7XOPikg+2ELMK5oFHHwAAAABJRU5ErkJggg==);
	width: 34px;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 12px 12px;
}
</style>
