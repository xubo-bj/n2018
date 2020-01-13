const router = require("koa-router")();
const path = require("path");
const ejsPath = "baidu/";
const axios = require("axios");
const APPKEY = "a3978888f2d9f5614219a3e540b65378";
router.prefix("/baidu");

router.get("/", async (ctx, next) => {
	await ctx.render(path.join(ejsPath, "index"));
});

const newsType = [
	// "top",
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

let newsCache = (function() {
	let obj = {};
	for (let i = 0; i < newsType.length; i++) {
		obj[newsType[i]] = { arr: [], index: 0 };
	}
	return obj;
})();

const maxNewsNum = 90;
function fetch_news() {
	for (let i = 0; i < newsType.length; i++) {
		setTimeout(() => {
			axios
				.get(
					`http://v.juhe.cn/toutiao/index?type=${newsType[i]}&key=${APPKEY}`,
					{
						headers: {
							"X-Requested-With": "axios"
						},
						timeout: 2500, // default is `0` (no timeout),
						responseType: "json" // default
					}
				)
				.then(res => {
					if (res.data.error_code == 0) {
						let data = res.data.result.data;
						if (data) {
							for (let j = 0; j < data.length; j++) {
								newsCache[newsType[i]].arr.push(data[j]);
							}
						}
						let startSliceIndex =
							newsCache[newsType[i]].arr.length - maxNewsNum;
						if (startSliceIndex > 0) {
							newsCache[newsType[i]].arr = newsCache[
								newsType[i]
							].arr.slice(startSliceIndex);
						}
					}
				});
		}, i * 500);
	}
	setTimeout(() => {
		fetch_news();
	}, 1000 * 60 * 60 * 3);
}
// fetch_news();

let nextData = null;
function generateNextData() {
	let dataArr = [];
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < newsType.length; j++) {
			let someCategoryNews = newsCache[newsType[j]];
			if (someCategoryNews.index < someCategoryNews.arr.length) {
				dataArr.push(someCategoryNews.arr[someCategoryNews.index]);
			} else {
				someCategoryNews.index = 0;
				dataArr.push(someCategoryNews.arr[someCategoryNews.index]);
			}
			someCategoryNews.index++;
		}
	}
	return dataArr;
}

router.get("/fetch_news", async (ctx, next) => {
	if (nextData === null) {
		ctx.body = generateNextData();
	} else {
		ctx.body = nextData;
	}
	nextData = generateNextData();
});

/*
let newsNum = 0;
router.get("/fetch_news", async (ctx, next) => {
	try {
		let res = await axios.get(
			`http://v.juhe.cn/toutiao/index?type=${
				newsNum < 9 ? newsType[newsNum++] : newsType[newsNum - 9]
			}&key=${APPKEY}`,
			{
				headers: {
					"X-Requested-With": "axios"
				},
				timeout: 1500, // default is `0` (no timeout),
				responseType: "json" // default
			}
		);
		console.log("res null", res);
		// console.log("res legnth", res.data.result.data.length);
		ctx.body = res.data.result.data;
	} catch (e) {
		console.log("err this is ", e);
		ctx.body = { success: "no" };
	}
});
*/

module.exports = router;
