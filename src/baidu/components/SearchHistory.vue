<template>
	<div class="search-history">
		<a class="history-container" @click="openSearchResult(searchRecord)">
			<span class="search-history-icon"></span>
			<button class="history-text">{{ searchRecord }}</button>
		</a>
		<span class="delete-icon" @click="deleteOneRecord"></span>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import Component from "vue-class-component";
import { UPDATE_HISTORY_RECORD } from "../store/mutation-types";
import { historyRecordShape } from "../store/state";
@Component({
	props: ["searchRecord"],
	computed: mapState(["historyRecord"]),
	methods: mapMutations([UPDATE_HISTORY_RECORD])
})
export default class SearchHistory extends Vue {
	historyRecord!: string[];
	searchRecord!: string;
	UPDATE_HISTORY_RECORD!: (historyRecord: historyRecordShape) => void;
	openSearchResult(searchKeyWord: string) {
		this.$emit("open-search-result", searchKeyWord);
	}
	deleteOneRecord() {
		let index = this.historyRecord.indexOf(this.searchRecord.trim());
		if (index !== -1) {
			this.historyRecord.splice(index, 1);
			localStorage.setItem(
				"baidu_xubo_history",
				JSON.stringify(this.historyRecord)
			);
			console.log("delete one record");
		}
	}
}
</script>

<style lang="scss" scoped>
.search-history {
	padding: 0 17px;
	border-bottom: 1px solid #f1f1f1;
	line-height: 24px;
	font-size: 18px;
	min-height: 45px;
	height: 46px;
	display: flex;
}
.history-container {
	display: flex;
	flex-grow: 1;
	.search-history-icon {
		width: 15px;
		// height: 100%;
		background-image: url(/baidu/images/search_history.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 15px 15px;
	}
	.history-text {
		background-color: #fff;
		border: none;
		font-weight: 700;
		font-size: 16px;
		color: #333;
		padding-left: 14px;
	}
}
.delete-icon {
	background-image: url(/baidu/images/delete_history.png);
	width: 34px;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 12px 12px;
}
</style>
