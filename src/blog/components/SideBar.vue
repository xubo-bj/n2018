<template>
	<div>
		<div class="site-name">
			<a class="site-name-a" href="">FireKylin 系统</a>
		</div>
		<router-link-wrapper
			to="/blog/dashboard"
			link-name="概述"
			link-class="icon-home"
			:selected="currentTab[0] === 'dashboard'"
			@select_tab="select_tab"
		/>
		<router-link-wrapper
			to="/blog/post/list"
			link-name="文章管理"
			link-class="icon-topic"
			:selected="currentTab[0] === 'post'"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'post'">
				<router-link-wrapper
					to="/blog/post/list"
					link-class="icon-list"
					link-name="文章列表"
					:active="
						currentTab[0] === 'post' && currentTab[1] === 'list'
					"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/post/create"
					link-class="icon-list"
					link-name="添加文章"
					:active="
						currentTab[0] === 'post' && currentTab[1] === 'create'
					"
					@select_tab="select_tab"
				/>
			</div>
		</transition>
		<router-link-wrapper
			to="/blog/category/list"
			link-name="分类管理"
			link-class="icon-report"
			:selected="currentTab[0] === 'category'"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'category'">
				<router-link-wrapper
					to="/blog/category/list"
					link-class="icon-list"
					link-name="分类列表"
					:active="
						currentTab[0] === 'category' && currentTab[1] === 'list'
					"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/category/create"
					link-class="icon-list"
					link-name="添加分类"
					:active="
						currentTab[0] === 'category' &&
							currentTab[1] === 'create'
					"
					@select_tab="select_tab"
				/>
			</div>
		</transition>
		<router-link-wrapper
			to="/blog/tag/list"
			link-name="标签管理"
			link-class="icon-report"
			:selected="currentTab[0] === 'tag'"
			@select_tab="select_tab"
		/>
		<transition>
			<div class="trans-elem" v-if="currentTab[0] === 'tag'">
				<router-link-wrapper
					to="/blog/tag/list"
					link-class="icon-list"
					link-name="标签列表"
					:active="
						currentTab[0] === 'tag' && currentTab[1] === 'list'
					"
					@select_tab="select_tab"
				/>
				<router-link-wrapper
					to="/blog/tag/create"
					link-class="icon-list"
					link-name="添加标签"
					:active="
						currentTab[0] === 'tag' && currentTab[1] === 'create'
					"
					@select_tab="select_tab"
					@clear_tagname="clear_tagname"
				/>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { SELECT_TAB, UPDATE_TAGNAME } from "../store/mutation-types.ts";
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
	UPDATE_TAGNAME!: (obj: object) => void;
	currentTab!: (state: stateShape) => string[];
	select_tab(obj: any) {
		// console.log("obj  :", obj);
		this.SELECT_TAB(obj);
	}
	clear_tagname() {
		this.UPDATE_TAGNAME({ tagName: "" });
	}
	updated() {
		console.log("updated", this.currentTab);
	}
}
</script>

<style lang="scss" scoped>
.site-name {
	height: 65px;
	line-height: 64px;
	padding-left: 35px;
	.site-name-a {
		color: #1890ff;
		font-size: 22px;
		transition: color 0.3s;
		&:hover {
			color: #48aaff;
		}
	}
}

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
