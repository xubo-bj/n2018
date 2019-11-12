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
	ADD_NEWS
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
	[ADD_NEWS](state: stateShape, payload: newsArrayShape) {
		console.log(visionLine, ADD_NEWS);
		state.newsArray = [...state.newsArray, ...payload.newsArray];
	}
};
