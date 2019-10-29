import Vue from "vue";
import VueRouter from "vue-router";
import {
	Dashboard,
	PostCreate,
	PostList,
	TagCreate,
	TagList,
	CategoryList,
	CategoryCreate
} from "../components/index";
Vue.use(VueRouter);

export default new VueRouter({
	// mode: "history",
	routes: [
		{ path: "/blog/dashboard", component: Dashboard },
		{ path: "/blog/post/list", component: PostList },
		{ path: "/blog/post/create", component: PostCreate },
		{ path: "/blog/category/list", component: CategoryList },
		{ path: "/blog/category/create", component: CategoryCreate },
		{ path: "/blog/tag/list", component: TagList },
		{ path: "/blog/tag/create", component: TagCreate }
	]
});
