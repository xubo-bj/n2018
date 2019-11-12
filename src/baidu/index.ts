/// <reference path="./types/index.d.ts" />
import Vue from "vue";
import store from "./store";
import axios from "axios";
import {
	UPDATE_SEARCH_RESULT,
	UPDATE_HISTORY_RECORD,
	UPDATE_SEARCH_INPUT,
	ADD_NEWS
} from "./store/mutation-types";
import App from "./components/App.vue";

let vueApp = new Vue({
	el: "#app",
	store,
	beforeMount() {
		(function getStorage() {
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
		})();
		(function fetch_news() {
			axios
				.get("/baidu/fetch_news", {
					headers: {
						"X-Requested-With": "axios"
					},
					timeout: 1000, // default is `0` (no timeout),
					responseType: "json" // default
				})
				.then((res: any) => {
					if (res.success == "no") {
					} else {
						store.commit(ADD_NEWS, { newsArray: res.data });
					}
				})
				.catch(err => {
					console.log("err", err);
				});
		})();
	},
	// router,
	render: h => h(App)
});

window.global_jsonp = function(res) {
	console.log(res.s);
	let r = res.s != null ? res.s : [];
	vueApp.$store.commit(UPDATE_SEARCH_RESULT, { searchResult: r });
};
