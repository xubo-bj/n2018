/// <reference path="./types/index.d.ts" />
import Vue from "vue";
import store from "./store";
// import router from "./router";
import {
	UPDATE_SEARCH_RESULT,
	UPDATE_HISTORY_RECORD,
	UPDATE_SEARCH_INPUT
} from "./store/mutation-types";
import App from "./components/App.vue";

let vueApp = new Vue({
	el: "#app",
	store,
	beforeMount() {
		let historyRecord = localStorage.getItem("baidu_xubo_history");
		if (historyRecord != null) {
			store.commit(UPDATE_HISTORY_RECORD, {
				historyRecord: JSON.parse(historyRecord)
			});
		}
		let searchKeyWord = sessionStorage.getItem("baidu_xubo_word");
		if (searchKeyWord != null) {
			store.commit(UPDATE_SEARCH_INPUT, { searchKeyWord });
		}
	},
	// router,
	render: h => h(App)
});

window.global_jsonp = function(res) {
	console.log(res.s);
	let r = res.s != null ? res.s : [];
	vueApp.$store.commit(UPDATE_SEARCH_RESULT, { searchResult: r });
};
