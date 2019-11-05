// import Vue from "vue";
import {
	stateShape,
	searchKeyWordShape,
	searchResultShape,
	keyWordInSearchShape
} from "./state";
import {
	UPDATE_SEARCH_INPUT,
	SHOW_SEARCH_PAGE,
	HIDE_SEARCH_PAGE,
	UPDATE_SEARCH_RESULT,
	START_SEARCH
} from "./mutation-types";
const visionLine = "------------------:  ";
export default {
	[UPDATE_SEARCH_INPUT](state: stateShape, payload: searchKeyWordShape) {
		console.log(visionLine, UPDATE_SEARCH_INPUT);
		state.searchKeyWord = payload.searchKeyWord;
	},
	[SHOW_SEARCH_PAGE](state: stateShape) {
		console.log(visionLine, SHOW_SEARCH_PAGE);
		state.displaySearchPage = true;
	},
	[HIDE_SEARCH_PAGE](state: stateShape, payload: searchKeyWordShape) {
		console.log(visionLine, HIDE_SEARCH_PAGE);
		state.displaySearchPage = false;
		state.keyWordInSearch = payload.searchKeyWord;
	},
	[START_SEARCH](state: stateShape, payload: keyWordInSearchShape) {
		console.log(visionLine, START_SEARCH);
		state.displaySearchPage = false;
		state.keyWordInSearch = payload.keyWordInSearch;
	},
	[UPDATE_SEARCH_RESULT](state: stateShape, payload: searchResultShape) {
		console.log(visionLine, UPDATE_SEARCH_RESULT);
		state.searchResult = payload.searchResult;
	}
};

/*
import { stateShape, tagShape } from "./state";
import { SELECT_TAB, UPDATE_TAGNAME, UPDATE_TAGLISTS } from "./mutation-types";
export interface tagNameShape {
	tagName: string;
}
export interface tabShape {
	currentTab: string[];
}
export interface tagListsShape {
	tagLists: tagShape[];
}
export default {
	[SELECT_TAB](state: stateShape, payload: tabShape) {
		console.log(SELECT_TAB, payload);
		state.currentTab = payload.currentTab;
	},
	[UPDATE_TAGNAME](state: stateShape, payload: tagNameShape) {
		console.log(UPDATE_TAGNAME, payload);
		state.tagName = payload.tagName;
	},
	[UPDATE_TAGLISTS](state: stateShape, payload: tagListsShape) {
		console.log(UPDATE_TAGLISTS);
		state.tagLists = payload.tagLists;
	}
};

*/
