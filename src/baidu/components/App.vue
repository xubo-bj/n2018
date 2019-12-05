<template>
	<div class="app-container">
		<top-bar />
		<logo />
		<search-entry />
		<news-area />
		<search-page />
		<user-info />
		<user-mask />
		<browser-modal />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar";
import Logo from "./Logo";
import SearchEntry from "./SearchEntry";
import SearchPage from "./SearchPage";
import UserInfo from "./UserInfo";
import UserMask from "./UserMask";
import NewsArea from "./NewsArea";
import BrowserModal from "./BrowserModal";
import Component from "vue-class-component";
@Component({
	components: {
		TopBar,
		Logo,
		SearchEntry,
		SearchPage,
		UserInfo,
		UserMask,
		NewsArea,
		BrowserModal
	}
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.app-container {
	position: relative;
}
</style>
