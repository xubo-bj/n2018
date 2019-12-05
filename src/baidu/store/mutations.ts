import {
	stateShape,
	searchKeyWordShape,
	searchResultShape,
	historyRecordShape,
	newsArrayShape
} from "./state";
import {
	UPDATE_SEARCH_INPUT,
	SHOW_SEARCH_PAGE,
	HIDE_SEARCH_PAGE,
	UPDATE_SEARCH_RESULT,
	UPDATE_HISTORY_RECORD,
	SHOW_USER_INFO,
	HIDE_USER_INFO,
	ADD_NEWS_BEFORE_EXSITING,
	ADD_NEWS_AFTER_EXSITING,
	DELETE_NEWS,
	SHOW_BROWSER_MODAL,
	HIDE_BROWSER_MODAL
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
	[HIDE_SEARCH_PAGE](state: stateShape) {
		console.log(visionLine, HIDE_SEARCH_PAGE);
		state.displaySearchPage = false;
	},
	[UPDATE_SEARCH_RESULT](state: stateShape, payload: searchResultShape) {
		console.log(visionLine, UPDATE_SEARCH_RESULT);
		state.searchResult = payload.searchResult;
	},
	[UPDATE_HISTORY_RECORD](state: stateShape, payload: historyRecordShape) {
		console.log(visionLine, UPDATE_HISTORY_RECORD);
		state.historyRecord = payload.historyRecord;
	},
	[HIDE_USER_INFO](state: stateShape) {
		console.log(visionLine, HIDE_USER_INFO);
		state.displayUserInfo = false;
	},
	[SHOW_USER_INFO](state: stateShape) {
		console.log(visionLine, SHOW_USER_INFO);
		state.displayUserInfo = true;
	},
	[ADD_NEWS_AFTER_EXSITING](state: stateShape, payload: newsArrayShape) {
		console.log(visionLine, ADD_NEWS_AFTER_EXSITING);
		state.newsArray = [...state.newsArray, ...payload.newsArray];
	},
	[ADD_NEWS_BEFORE_EXSITING](state: stateShape, payload: newsArrayShape) {
		console.log(visionLine, ADD_NEWS_BEFORE_EXSITING);
		state.newsArray = [...payload.newsArray, ...state.newsArray];
	},
	[DELETE_NEWS](state: stateShape, payload: string) {
		console.log(visionLine, DELETE_NEWS);
		let newsArray = state.newsArray.filter(
			(elem: any) => elem.uniquekey != payload
		);
		state.newsArray = newsArray;
	},
	[SHOW_BROWSER_MODAL](state: stateShape) {
		console.log(visionLine, SHOW_BROWSER_MODAL);
		state.browserModal = true;
	},
	[HIDE_BROWSER_MODAL](state: stateShape) {
		console.log(visionLine, HIDE_BROWSER_MODAL);
		state.browserModal = false;
	}
};
