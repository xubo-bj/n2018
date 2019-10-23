import Vue from "vue";
import { SELECT_TAB } from "./mutation-types";
import { stateShape } from "./state";
import { ActionContext } from "vuex";

export default {
	[SELECT_TAB]({ commit }: ActionContext<stateShape, any>, payload: object) {
		commit(SELECT_TAB, payload);
	}
};
