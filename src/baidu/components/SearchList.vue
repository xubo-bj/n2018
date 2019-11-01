<template>
	<div class="search-list">
		<button>
			<span class="magnifier-icon"></span>
			<span class="text"><em>工<em>商银行</span>
		</button>
        <span class="arrow-icon"></span>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class SearchList extends Vue {}
</script>

<style lang="scss" scoped>
.search-list {
	border-bottom: 1px solid #f1f1f1;
	color: #333;
	line-height: 24px;
	font-size: 18px;
	font-weight: 400;
	min-height: 45px;
	height: 46px;
}
.magnifier{
    width: 34px;
    height: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAUVBMVEUAAADNzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Q0NDb29vNzc3Nzc3MzMzMzMzMzMzNzc3Nzc3Nzc3Ozs7Pz8/Q0NDMzMzOzs7Ozs7MzMzNzc3MzMyjngBVAAAAGnRSTlMA9Vgt/Nyjjg0H4FDOw7+2rYhiQCYeFXzjewzxqiMAAAEsSURBVEjHlZVZFoMgDEUDVIRirVOd9r/QGk5TrFgw78uDF3gJkMBBatF1IURR60VBWqos1p2KMjHhpddI+nXO2lasJxKtPYHHx+dv0/WDMUPfNZ/ZjzF2fF9RlbO73VzlB+/qCAs/LOEg6RcRv/joB58GIpmnX2ZvxnrPJZyq9N53BtsIjvA25FmgDfgrNCO+edfozPynDUalKR+4k4SEJBIq+KogqSrEhRfJpWmHV+xrRNg0bQVZmbaPBjJqNmiijHQ5uqOs1NtHn6P7DaopyCFHDxQmBmBytMFU8GieE16UvAyyTmfhnTzrVvFuLO81sF4a7xWzKgSv+jAq200yqibilyvyjfBL1V4Sfq2TEH6tSwU83wFjPEhN1F0nQgPuIK+Az8DAGTS4eXZvXiowQ7wpXsEAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 15px 15px;
}
.arrow-icon{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnBAMAAAB+jUwGAAAAKlBMVEUAAADR0dHMzMzPz8/Nzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Ozs7MzMzMzMwenBEEAAAADXRSTlMABNkZr/ijVTTxlX1u3UxzJQAAAI1JREFUKM+Fy7EJQkEQRdEnNmBmFSZ2YBNmvwRBOxBsxCbMLUIFg+1FBeGwO8GfZJjLmdxaP/tVkqkNc0zSZqL37378tvnLXY0bVNyi4hIVg0ZEIwaNiEZERbSLqIiK6BBRERVRERULFVERFVERFUcqoiIqomJPp2cqPbxS6fqUQp3o3YVeU+n7XOPikg+2ELMK5oFHHwAAAABJRU5ErkJggg==);
}
</style>
