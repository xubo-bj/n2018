<template>
	<div class="container">
		<top-bar />
		<logo />
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar";
import Logo from "./Logo";
import Component from "vue-class-component";
@Component({
	components: { TopBar, Logo }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped></style>
