import Vue from "vue";
import { stateShape } from "./state";
import { SELECT_TAB } from "./mutation-types";

export default {
	[SELECT_TAB](state: stateShape, payload: any) {
		console.log("payload", payload);
		state.currentTab = payload.currentTab;
	}
};
