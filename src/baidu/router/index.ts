import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue";
import SearchPage from "../components/SearchPage.vue";
Vue.use(VueRouter);

export default new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/baidu",
			component: HomePage
		},
		{
			path: "/baidu/searchpage",
			component: SearchPage
		}
	]
});
