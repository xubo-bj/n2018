import Vue from "vue";
import { SELECT_TAB } from "./mutation-types";

export default {
	[SELECT_TAB](state: any, payload: any) {
		console.log("state", state);
		console.log("payload", payload);
	}
};
