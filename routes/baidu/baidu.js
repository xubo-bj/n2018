const router = require("koa-router")();
const path = require("path");
const ejsPath = "baidu/";
const axios = require("axios");
const APPKEY = "a3978888f2d9f5614219a3e540b65378";
router.prefix("/baidu");

router.get("/", async (ctx, next) => {
	await ctx.render(path.join(ejsPath, "index"));
});
router.get("/fetch_news", async (ctx, next) => {
	console.log("fetch_news 123");
	try {
		let res = await axios.get(
			`http://v.juhe.cn/toutiao/index?type=top&key=${APPKEY}`,
			{
				headers: {
					"X-Requested-With": "axios"
				},
				timeout: 2000, // default is `0` (no timeout),
				responseType: "json" // default
			}
		);
		console.log("res legnth", res.data.result.data.length);
		ctx.body = res.data.result.data;
	} catch (e) {
		console.log("err", e);
		ctx.body = { success: "no" };
	}
});

module.exports = router;
