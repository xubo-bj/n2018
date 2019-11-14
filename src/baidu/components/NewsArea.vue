<template>
	<div class="news-area" ref="touchMoveArea">
		<div class="pull-down-loading-bar">
			<div class="loading-prompt">
				<img
					ref="loadingIcon"
					class="loading-icon"
					src="/baidu/images/fetching.png"
					alt=""
				/>
				<span class="loading-text">松开推荐</span>
			</div>
			<div class="progress-area">
				<div class="progress-bar"></div>
				<span class="progress-text"> 为您推荐30条更新</span>
			</div>
		</div>
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
	mounted() {
		console.log("newsArea  mounted  only once");
		this.$nextTick(() => {
			let targetElem = this.$refs.touchMoveArea as HTMLElement,
				topBarElem = document.querySelector(".top-bar") as HTMLElement,
				loadingText = document.querySelector(
					".loading-text"
				) as HTMLElement,
				loadingPrompt = document.querySelector(
					".loading-prompt"
				) as HTMLElement,
				loadingIcon = document.querySelector(
					".loading-icon"
				) as HTMLElement,
				progressBar = document.querySelector(
					".progress-bar"
				) as HTMLElement,
				progressText = document.querySelector(
					".progress-text"
				) as HTMLElement,
				zoomout = (x: number) => Math.pow(x, 16 / 20),
				translateY = (distance: number) => {
					if (CSS && CSS.supports("transform-style", "preserve-3d")) {
						targetElem.style.transform = `translate3d(0,${distance}px,0)`;
					} else {
						targetElem.style.transform = `translateY(${distance}px)`;
					}
				},
				stopRotate: number,
				degV = 0,
				startRotate = () => {
					degV += 15;
					loadingIcon.style.transform = `rotate(${degV}deg)`;
					stopRotate = requestAnimationFrame(startRotate);
				};
			let startPos = 0;
			targetElem.addEventListener("touchstart", e => {
				console.log("touchstart");
				startPos = e.changedTouches[0].screenY;
				progressBar.style.transitionDuration = "0.5s";
				targetElem.style.transitionDuration = "0s";
			});
			targetElem.addEventListener("touchmove", e => {
				let d = e.changedTouches[0].screenY - startPos;
				let top = topBarElem.getBoundingClientRect().top;
				if (d > 0 && top === 0) {
					e.preventDefault();
					translateY(zoomout(d));
				}
			});
			targetElem.addEventListener("touchend", e => {
				let d = e.changedTouches[0].screenY - startPos;
				let top = topBarElem.getBoundingClientRect().top;
				if (d > 0 && top === 0) {
					e.preventDefault();
					translateY(22);
					startRotate();
					loadingText.textContent = "正在刷新";
					setTimeout(() => {
						cancelAnimationFrame(stopRotate);
						loadingPrompt.style.display = "none";
						loadingText.textContent = "松开推荐";
						progressText.style.visibility = "visible";
						progressBar.style.transform = "scaleX(1)";
					}, 1500);
				}
			});
			progressBar.addEventListener("transitionend", e => {
				progressText.style.visibility = "hidden";
				progressBar.style.transitionDuration = "0s";
				targetElem.style.transitionDuration = ".3s";
				progressBar.style.transform = "scaleX(0)";
				loadingPrompt.style.display = "flex";
				translateY(0);
			});
		});
	}

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
	position: relative;
	padding-left: 16px;
	padding-right: 16px;
	background-color: #fff;
	transition-property: transform;
}
.pull-down-loading-bar {
	position: absolute;
	height: 24px;
	top: -24px;
	left: 16px;
	right: 16px;
	display: flex;
	justify-content: center;
	.loading-prompt {
		align-self: center;
		display: flex;
		align-items: center;
	}
	.loading-icon {
		width: 16px;
		height: 16px;
		// position: absolute;
		// left: 50%;
		// top: 3px;
	}
	.loading-text {
		font-size: 12px;
	}
	.progress-area {
		position: absolute;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.progress-bar {
		// display: block;
		position: absolute;
		background-color: rgba(0, 0, 255, 0.2);
		width: 100%;
		height: 100%;
		transform: scaleX(0);
		transition: transform 0.5s;
	}
	.progress-text {
		visibility: hidden;
	}
}
</style>
