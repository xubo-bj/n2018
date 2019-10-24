<template>
	<div>
		<router-link-wrapper
			to="/blog/dashboard"
			link-name="概述"
			link-class="icon-home"
			@select_tab="select_tab"
		/>
		<router-link-wrapper
			to="/blog/post/list"
			link-name="文章管理"
			link-class="icon-topic"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'post'">
				<router-link-wrapper
					to="/blog/post/list"
					link-name="文章列表"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/post/create"
					link-name="添加文章"
					@select_tab="select_tab"
				/>
			</div>
		</transition>
		<router-link-wrapper
			to="/blog/page/list"
			link-name="页面管理"
			link-class="icon-reply"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'page'">
				<router-link-wrapper
					to="/blog/page/list"
					link-name="页面列表"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/page/create"
					link-name="添加页面"
					@select_tab="select_tab"
				/>
			</div>
		</transition>
		<router-link-wrapper
			to="/blog/category/list"
			link-name="分类管理"
			link-class="icon-report"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'category'">
				<router-link-wrapper
					to="/blog/category/list"
					link-name="分类列表"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/category/create"
					link-name="添加分类"
					@select_tab="select_tab"
				/>
			</div>
		</transition>
		<router-link-wrapper
			to="/blog/tag/list"
			link-name="标签管理"
			link-class="icon-report"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'tag'">
				<router-link-wrapper
					to="/blog/tag/list"
					link-name="标签列表"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/tag/create"
					link-name="添加标签"
					@select_tab="select_tab"
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
import { stateShape } from "../store/state";

@Component({
	computed: mapState(["currentTab"]),
	methods: mapActions([SELECT_TAB]),
	components: { RouterLinkWrapper }
})
export default class SideBar extends Vue {
	SELECT_TAB!: (obj: object) => void;
	currentTab!: (state: stateShape) => string[];
	select_tab(obj: any) {
		console.log("obj  :", obj);
		this.SELECT_TAB(obj);
	}
	updated() {
		console.log("updated", this.currentTab);
	}
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
	transition: height 0.4s;
}
.v-enter,
.v-leave-to {
	height: 0px;
}
.v-leave,
.v-enter-to {
	height: 100px;
}
.trans-elem {
	overflow: hidden;
}
</style>
