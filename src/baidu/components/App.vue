<template>
	<div class="container">
		<top-bar />
		<logo />
		<search-entry />
		<search-page />
		<user-info />
		<user-mask />
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
import Component from "vue-class-component";
@Component({
	components: { TopBar, Logo, SearchEntry, SearchPage, UserInfo, UserMask }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
}
</style>
