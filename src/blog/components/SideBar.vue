<template>
	<div>
		<router-link-wrapper
			to="/blog/dashboard"
			link-name="概述"
			@select_tab="select_tab"
		/>
		<router-link-wrapper to="/blog/post/list" link-name="文章管理" />
		<transition>
			<div>
				<router-link-wrapper
					to="/blog/post/list"
					link-name="文章列表"
				/>
				<router-link-wrapper
					to="/blog/post/create"
					link-name="添加文章"
				/>
			</div>
		</transition>
		<router-link-wrapper to="/blog/page/list" link-name="页面管理" />
		<transition>
			<div>
				<router-link-wrapper
					to="/blog/page/list"
					link-name="页面列表"
				/>
				<router-link-wrapper
					to="/blog/page/create"
					link-name="添加页面"
				/>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { SELECT_TAB } from "../store/mutation-types.ts";
import Component from "vue-class-component";
import VueRouter from "vue-router";
import RouterLinkWrapper from "./RouterLinkWrapper";

@Component({
	computed: mapState(["currentTab"]),
	methods: mapActions([SELECT_TAB]),
	components: { RouterLinkWrapper }
})
export default class SideBar extends Vue {
	SELECT_TAB!: (obj: object) => void;
	select_tab(obj: any) {
		console.log("obj  :", obj);
		this.SELECT_TAB(obj);
	}
}
</script>

<style lang="scss" scoped>
.router-link {
	display: block;
	// color: rgba(255, 255, 255, 0.5);
	height: 50px;
	border: 1px solid #000;
}
</style>
