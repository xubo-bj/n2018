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

module.exports = router;
