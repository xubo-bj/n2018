<template>
	<div class="news-area">
		<news-item
			v-for="news in newsArray"
			:key="news.uniquekey"
			v-bind="news"
		/>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import NewsItem from "./NewsItem";
import axios from "axios";
const APPKEY = "a3978888f2d9f5614219a3e540b65378";
const url =
	"http://v.juhe.cn/toutiao/index?type=top&key=a3978888f2d9f5614219a3e540b65378";
/*
http://v.juhe.cn/toutiao/index?type=top&key=a3978888f2d9f5614219a3e540b65378
类型,,top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),
tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
*/
@Component({ components: { NewsItem }, computed: mapState(["newsArray"]) })
export default class NewsArea extends Vue {
	fetchNews() {
		/*
        //  server code
		axios
			.get(`http://v.juhe.cn/toutiao/index?type=top&key=${APPKEY}`, {
				headers: {
					"X-Requested-With": "axios"
				},
				timeout: 1000, // default is `0` (no timeout),
				responseType: "json" // default
			})
			.then(res => {
				console.log("res", res);
			})
			.catch(err => {
				console.log("err", err);
            });
            */

		axios
			.get("/baidu/fetch_news", {
				headers: {
					"X-Requested-With": "axios"
				},
				timeout: 1000, // default is `0` (no timeout),
				responseType: "json" // default
			})
			.then((res: any) => {
				if (res.success == "no") {
				} else {
					console.log("res", res.data);
				}
			})
			.catch(err => {
				console.log("err", err);
			});
	}
}
</script>

<style lang="scss" scoped>
.news-area {
	padding-left: 16px;
	padding-right: 16px;
}
</style>
