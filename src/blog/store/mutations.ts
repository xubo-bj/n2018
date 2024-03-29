import Vue from "vue";
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
