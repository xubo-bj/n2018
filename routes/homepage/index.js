const router = require("koa-router")();
const useragent = require("express-useragent");

router.get("/", async (ctx, next) => {
	var source = ctx.request.headers["user-agent"],
		ua = useragent.parse(source);
	if (ua.isDesktop) {
		await ctx.render("homepage/index_desktop", {
			title: "Desktop Browser"
		});
	}
	if (ua.isMobile) {
		await ctx.render("homepage/index_mobile", {
			title: "Mobile Browser"
		});
	}
});

router.get("/string", async (ctx, next) => {
	ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
	ctx.body = {
		title: "koa2 json"
	};
});

module.exports = router;
