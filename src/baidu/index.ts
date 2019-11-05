/// <reference path="./types/index.d.ts" />
import Vue from "vue";
import store from "./store";
// import router from "./router";
import { UPDATE_SEARCH_RESULT } from "./store/mutation-types";
import App from "./components/App.vue";

let vueApp = new Vue({
	el: "#app",
	store,
	// router,
	render: h => h(App)
});
vueApp.$store;

window.global_jsonp = function(res) {
	console.log(res.s);
	let r = res.s != null ? res.s : [];
	vueApp.$store.commit(UPDATE_SEARCH_RESULT, { searchResult: r });
};
