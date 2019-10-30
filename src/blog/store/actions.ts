import Vue from "vue";
import { tabShape, tagNameShape, tagListsShape } from "../store/mutations";
import { SELECT_TAB, UPDATE_TAGNAME, UPDATE_TAGLISTS } from "./mutation-types";
import { stateShape } from "./state";
import { ActionContext } from "vuex";
import axios from "axios";

export default {
	[SELECT_TAB](
		{ commit }: ActionContext<stateShape, any>,
		payload: tabShape
	) {
		commit(SELECT_TAB, payload);
	},
	[UPDATE_TAGNAME](
		{ commit }: ActionContext<stateShape, any>,
		payload: tagNameShape
	) {
		commit(UPDATE_TAGNAME, payload);
	},
	[UPDATE_TAGLISTS]({ commit }: ActionContext<stateShape, any>) {
		axios
			.get("/blog/tag/list")
			.then(function(response) {
				// handle success
				console.log(response.data);
				if (response.data.success !== "no") {
					commit(UPDATE_TAGLISTS, { tagLists: response.data });
				}
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	}
};
