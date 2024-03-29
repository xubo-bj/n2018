const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const index = require("./routes/homepage");
const ctrip = require("./routes/ctrip");
const note = require("./routes/note/note.js");
const baidu = require("./routes/baidu/baidu.js");
const blog = require("./routes/blog/blog.js");
const d3 = require("./routes/d3");

// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"]
	})
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
	views(__dirname + "/views", {
		extension: "ejs"
	})
);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(ctrip.routes(), ctrip.allowedMethods());
app.use(note.routes(), note.allowedMethods());
app.use(baidu.routes(), baidu.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(d3.routes(), d3.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
