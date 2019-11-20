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
				<span class="progress-text"> </span>
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
import {
	ADD_NEWS_BEFORE_EXSITING,
	ADD_NEWS_AFTER_EXSITING
} from "../store/mutation-types";
import { newsArrayShape } from "../store/state";
const APPKEY = "a3978888f2d9f5614219a3e540b65378";
const url =
	"http://v.juhe.cn/toutiao/index?type=top&key=a3978888f2d9f5614219a3e540b65378";
/*
http://v.juhe.cn/toutiao/index?type=top&key=a3978888f2d9f5614219a3e540b65378
类型,,top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),
tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
*/
const newsType = [
	"top",
	"shehui",
	"guonei",
	"guoji",
	"yule",
	"tiyu",
	"junshi",
	"keji",
	"caijing",
	"shishang"
];
@Component({
	components: { NewsItem },
	computed: mapState(["newsArray"]),
	methods: mapMutations([ADD_NEWS_BEFORE_EXSITING, ADD_NEWS_AFTER_EXSITING])
})
export default class NewsArea extends Vue {
	ADD_NEWS_BEFORE_EXSITING!: (p: newsArrayShape) => void;
	ADD_NEWS_AFTER_EXSITING!: (p: newsArrayShape) => void;
	mounted() {
		this.$nextTick(() => {
			let newsNum = 0,
				targetElem = this.$refs.touchMoveArea as HTMLElement,
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
				fetch_news = () => {},
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
				progressBar.style.transitionDuration = "0.9s";
				targetElem.style.transitionDuration = "0s";
				loadingPrompt.style.display = "flex";
			});
			targetElem.addEventListener("touchmove", e => {
				let d = e.changedTouches[0].screenY - startPos;
				if (d > 0) {
					// let top = topBarElem.getBoundingClientRect().top;
					let top = document.body.getBoundingClientRect().top;
					if (top === 0) {
						e.preventDefault();
						translateY(zoomout(d));
					}
				}
			});
			targetElem.addEventListener("touchend", e => {
				let d = e.changedTouches[0].screenY - startPos;
				// let top = topBarElem.getBoundingClientRect().top;
				// if (d > 0 && top === 0) {
				if (d > 0) {
					let btop = document.body.getBoundingClientRect().top;
					if (btop === 0) {
						e.preventDefault();
						targetElem.style.transitionDuration = ".3s";
						translateY(30);
						startRotate();
						loadingText.textContent = "正在刷新";

						(axios as any)
							.get("/baidu/fetch_news", {
								headers: {
									"X-Requested-With": "axios"
								},
								timeout: 2000, // default is `0` (no timeout),
								responseType: "json" // default
							})
							.then((res: any) => {
								if (res.success == "no") {
									progressText.textContent =
										"暂时没有更新，休息一下吧";
								} else {
									console.log("failure ", res.data);
									try {
										this.ADD_NEWS_BEFORE_EXSITING({
											newsArray: res.data
										});
										progressText.textContent =
											"为您推荐30条更新";
									} catch (e) {
										progressText.textContent =
											"更新未成功，请再试一次";
									}
								}
							})
							.catch((err: any) => {
								console.log("err", err);
								progressText.textContent =
									"更新未成功，请再试一次";
							})
							.finally((x: any) => {
								progressBar.style.transform = "scaleX(1)";
								cancelAnimationFrame(stopRotate);
								loadingPrompt.style.display = "none";
								loadingText.textContent = "松开推荐";
								progressText.style.visibility = "visible";
							});
					}
				}
			});
			progressBar.addEventListener("transitionend", e => {
				progressText.style.visibility = "hidden";
				progressBar.style.transitionDuration = "0s";
				progressBar.style.transform = "scaleX(0)";
				translateY(0);
			});

			// let last_known_scroll_position = 0;
			let ticking = false;
			let vueInstance = this;

			function doSomething() {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						let scrollHeight =
								document.documentElement.scrollHeight,
							scrollTop = window.scrollY;
						if (scrollHeight - scrollTop < 1500) {
							(axios as any)
								.get("/baidu/fetch_news", {
									headers: {
										"X-Requested-With": "axios"
									},
									timeout: 2000, // default is `0` (no timeout),
									responseType: "json" // default
								})
								.then((res: any) => {
									if (res.success == "no") {
									} else {
										vueInstance.ADD_NEWS_AFTER_EXSITING({
											newsArray: res.data
										});
									}
								})
								.catch((err: any) => {
									console.log("err", err);
								})
								.finally(function() {
									ticking = false;
									// always executed
								});
						} else {
							ticking = false;
						}
						// last_known_scroll_position = window.scrollY;
					});

					ticking = true;
				}
			}

			window.addEventListener("scroll", doSomething);
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
		/*
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
	*/
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
	height: 30px;
	top: -30px;
	left: 16px;
	right: 16px;
	display: flex;
	justify-content: center;
	padding-top: 6px;
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
		margin: 3px;
		font-size: 13px;
		color: #666;
	}
	.progress-area {
		position: absolute;
		width: 100%;
		top: 6px;
		bottom: 0;
		text-align: center;
		line-height: 28px;
	}
	.progress-bar {
		position: absolute;
		background-color: #38f;
		opacity: 0.2;
		width: 100%;
		height: 100%;
		transform: scaleX(0);
		transition: transform 0.9s;
	}
	.progress-text {
		visibility: hidden;
		color: #38f;
		font-size: 14px;
	}
}
</style>
