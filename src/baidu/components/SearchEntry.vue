<template>
	<div class="search-area">
		<div class="search-entry">
			<span class="entry" @click="showSearchPage">{{
				searchKeyWord
			}}</span>
			<span class="mic">
				<img class="mic-icon" src="/baidu/images/mic.svg" alt="" />
			</span>
			<span class="camera">
				<img
					class="camera-icon"
					src="/baidu/images/camera.svg"
					alt=""
				/>
			</span>
			<button
				class="btn-icon"
				@click="openSearchResult(keyWordSearchedBefore)"
			>
				百度一下
			</button>
		</div>
		<div class="division-bar"></div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import Component from "vue-class-component";
import { searchKeyWordShape, historyRecordShape } from "../store/state";
import {
	SHOW_SEARCH_PAGE,
	UPDATE_SEARCH_INPUT,
	UPDATE_HISTORY_RECORD
} from "../store/mutation-types";

@Component({
	computed: mapState(["searchKeyWord", "historyRecord"]),
	methods: mapMutations([SHOW_SEARCH_PAGE, UPDATE_HISTORY_RECORD])
})
export default class SearchEntry extends Vue {
	historyRecord!: string[];
	searchKeyWord!: string;
	SHOW_SEARCH_PAGE!: () => void;
	UPDATE_HISTORY_RECORD!: (historyRecord: historyRecordShape) => void;
	showSearchPage() {
		this.SHOW_SEARCH_PAGE();
		let value = this.searchKeyWord.trim();
		if (value.length > 0) {
			let src = `https://www.baidu.com/su?&wd=${encodeURI(
				value
			)}&p=3&cb=global_jsonp`;
			let body = document.querySelector("body");
			var newScriptNode = document.createElement("script");
			newScriptNode.className = "target-script";
			newScriptNode.src = src;
			if (body != null) {
				let oldScriptNode = document.querySelector(".target-script");
				if (oldScriptNode != null) {
					body.replaceChild(newScriptNode, oldScriptNode);
				} else {
					body.appendChild(newScriptNode);
				}
			} else {
				console.log("can't find a body element");
			}
			this.searchKeyWord.trim();
		}
	}
	openSearchResult(searchKeyWord: string) {
		sessionStorage.setItem("baidu_xubo_word", searchKeyWord);
		let s = searchKeyWord.trim();
		let index = this.historyRecord.indexOf(s);
		if (index !== -1) {
			let historyRecordCopy = [...this.historyRecord];
			historyRecordCopy.splice(index, 1);
			historyRecordCopy.unshift(s);
			this.UPDATE_HISTORY_RECORD({ historyRecord: historyRecordCopy });
			localStorage.setItem(
				"baidu_xubo_history",
				JSON.stringify(historyRecordCopy)
			);
		} else {
			if (this.historyRecord.length >= 10) {
				let newHistoryRecord = this.historyRecord.slice(0, 8);
				newHistoryRecord.unshift(s);
				this.UPDATE_HISTORY_RECORD({ historyRecord: newHistoryRecord });
				localStorage.setItem(
					"baidu_xubo_history",
					JSON.stringify(newHistoryRecord)
				);
			} else {
				let historyRecordCopy = [...this.historyRecord];
				historyRecordCopy.unshift(s);
				this.UPDATE_HISTORY_RECORD({
					historyRecord: historyRecordCopy
				});
				localStorage.setItem(
					"baidu_xubo_history",
					JSON.stringify(historyRecordCopy)
				);
			}
		}

		window.location.href = `https://m.baidu.com/s?word=${encodeURI(
			searchKeyWord
		)}`;
	}
}
</script>

<style lang="scss" scoped>
.search-area {
	position: relative;
	z-index: 10;
	background-color: #fff;
}
.search-entry {
	height: 46px;
	margin: 0 16px;
	border: 1px solid #363636;
	display: flex;
}
.entry {
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-left: 15px;
	font-size: 18px;
	color: #333;
	font-weight: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
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
	outline: none;
}
.division-bar {
	height: 10px;
	margin-top: 20px;
	background-color: #f8f8f8;
}
</style>
