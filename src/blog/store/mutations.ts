import Vue from "vue";
import { stateShape } from "./state";
import { SELECT_TAB, UPDATE_TAGNAME } from "./mutation-types";

export default {
	[SELECT_TAB](state: stateShape, payload: any) {
		console.log(SELECT_TAB, payload);
		state.currentTab = payload.currentTab;
	},
	[UPDATE_TAGNAME](state: stateShape, payload: any) {
		console.log(UPDATE_TAGNAME, payload);
		state.tagName = payload.tagName;
	}
};
