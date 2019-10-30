<template>
	<div>{{ tagLists.lenght > 0 ? tagLists[0].name : "bc" }}</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	computed: {
		tagLists() {
			return this.$store.state.tagLists;
		}
	},
	updated() {
		console.log("udpated");
		console.log(this.$store.state.tagLists);
	}
});
</script>
