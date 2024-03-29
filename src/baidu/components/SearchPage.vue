<template>
	<div class="search-page" v-show="displaySearchPage">
		<div class="search-box">
			<span
				class="return-homepage"
				@click="HIDE_SEARCH_PAGE({ searchKeyWord })"
			></span>
			<div class="search-form">
				<span class="bear-paw-icon" />
				<span class="input-wrapper">
					<input
						class="search-input"
						type="text"
						v-model="keyword"
						v-focus
					/>
				</span>
				<span
					v-show="searchKeyWord && searchKeyWord.length !== 0"
					class="clear-btn"
					@click="UPDATE_SEARCH_INPUT({ searchKeyWord: '' })"
				></span>
				<span
					v-show="searchKeyWord && searchKeyWord.length !== 0"
					class="confirm-btn"
					@click="openSearchResult(searchKeyWord)"
					>百度一下
				</span>
				<span
					class="return-homepage-2"
					v-show="searchKeyWord.length === 0"
					@click="HIDE_SEARCH_PAGE({ searchKeyWord: '' })"
					>取消
				</span>
			</div>
		</div>
		<div
			class="search-result"
			v-show="searchKeyWord && searchKeyWord.length > 0"
		>
			<search-list
				v-for="item in searchResult"
				:key="item"
				:value="item"
				v-on:open-search-result="openSearchResult"
			/>
		</div>
		<div v-show="keyword.trim().length == 0">
			<search-history
				v-on:open-search-result="openSearchResult"
				v-for="record in historyRecord"
				:key="record"
				:searchRecord="record"
			/>
			<div
				class="clear-history"
				v-show="historyRecord.length > 0"
				@click="clearHistory"
			>
				清空历史
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import Component from "vue-class-component";
import {
	UPDATE_SEARCH_INPUT,
	HIDE_SEARCH_PAGE,
	UPDATE_SEARCH_RESULT,
	UPDATE_HISTORY_RECORD
	// START_SEARCH
} from "../store/mutation-types";
import axios from "axios";
import {
	searchKeyWordShape,
	searchResultShape,
	historyRecordShape
} from "../store/state";
import SearchList from "./SearchList";
import SearchHistory from "./SearchHistory";
import Test from "./Test";

@Component({
	components: { SearchList, SearchHistory, Test },
	computed: mapState([
		"searchKeyWord",
		"displaySearchPage",
		"searchResult",
		"historyRecord"
	]),
	methods: mapMutations([
		UPDATE_SEARCH_INPUT,
		HIDE_SEARCH_PAGE,
		UPDATE_SEARCH_RESULT,
		UPDATE_HISTORY_RECORD
		// START_SEARCH
	]),
	directives: {
		focus: {
			update: function(el) {
				el.focus();
			}
		}
	}
})
export default class SearchPage extends Vue {
	searchKeyWord!: string;
	historyRecord!: string[];
	UPDATE_SEARCH_INPUT!: (searchKeyWord: searchKeyWordShape) => void;
	UPDATE_SEARCH_RESULT!: (searchResult: searchResultShape) => void;
	// START_SEARCH!: (keyWordInSearch: keyWordInSearchShape) => void;
	HIDE_SEARCH_PAGE!: (searchKeyWord: searchKeyWordShape) => void;
	UPDATE_HISTORY_RECORD!: (historyRecord: historyRecordShape) => void;
	clearHistory() {
		this.UPDATE_HISTORY_RECORD({ historyRecord: [] });
		localStorage.setItem("baidu_xubo_history", JSON.stringify([]));
	}

	get keyword() {
		return this.searchKeyWord;
	}
	set keyword(value) {
		if (value !== this.searchKeyWord) {
			console.log("set keyword:", value);
			this.UPDATE_SEARCH_INPUT({ searchKeyWord: value });
			if (value.trim().length > 0) {
				let src = `https://www.baidu.com/su?&wd=${encodeURI(
					value
				)}&p=3&cb=global_jsonp`;
				let body = document.querySelector("body");
				var newScriptNode = document.createElement("script");
				newScriptNode.className = "target-script";
				newScriptNode.src = src;
				if (body != null) {
					let oldScriptNode = document.querySelector(
						".target-script"
					);
					if (oldScriptNode != null) {
						body.replaceChild(newScriptNode, oldScriptNode);
					} else {
						body.appendChild(newScriptNode);
					}
				} else {
					console.log("can't find a body element");
				}
			} else {
				this.UPDATE_SEARCH_RESULT({ searchResult: [] });
			}
		}
	}
	openSearchResult(searchKeyWord: string) {
		// this.START_SEARCH({ keyWordInSearch: searchKeyWord });
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

		window.location.href = `https://m.baidu.com/s?word=${encodeURI(s)}`;
	}
}
</script>

<style lang="scss" scoped>
.search-page {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
	background-color: #fff;
}
.search-box {
	height: 64px;
	width: 100%;
	padding-right: 17px;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
}
.return-homepage {
	width: 45px;
	height: 44px;
	position: relative;
	&::after {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -7px 0 0 -6px;
		content: "";
		width: 12px;
		height: 12px;
		border-left: 2px solid #38f;
		border-top: 2px solid #38f;
		-webkit-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
}
.search-form {
	flex-grow: 1;
	border: 1px solid #000;
	height: 46px;
	display: flex;
	padding-left: 12px;
}
.bear-paw-icon {
	width: 18px;
	height: 20px;
	// margin-left: 12px;
	// margin-top: 13px;
	background-image: url(/baidu/images/bear_paw.png);
	background-repeat: no-repeat;
	background-size: contain;
	align-self: center;
}
.input-wrapper {
	flex-grow: 1;
	position: relative;
	.search-input {
		position: absolute;
		width: 100%;
		height: 100%;
		outline: none;
		border: none;
		padding: 0 10px;
		font-size: 18px;
	}
}
.clear-btn {
	width: 42px;
	background-image: url(/baidu/images/clear.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 14px;
}
.confirm-btn {
	width: 80px;
	text-align: center;
	align-self: center;
	border-left: 1px solid #cbcbcb;
	color: #38f;
	font-weight: 700;
}
.search-result,
.search-history-record {
	padding: 0 17px;
}
.clear-history {
	height: 42px;
	font-size: 14px;
	line-height: 42px;
	color: #555;
	text-align: center;
}
.return-homepage-2 {
	padding: 0 10px;
	border-left: 1px solid #ccc;
	align-self: center;
	color: #666;
}
</style>
