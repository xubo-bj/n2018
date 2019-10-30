const router = require("koa-router")();
const path = require("path");
const ejsPath = "blog/";
const mysql = require("mysql");

function createMysqlConn() {
	return mysql.createConnection({
		host: "localhost",
		user: "xubo",
		password: "",
		database: "blog"
	});
}
router.prefix("/blog");

router.get("/", async (ctx, next) => {
	await ctx.render(path.join(ejsPath, "index"));
});
router.post("/tag/create", async (ctx, next) => {
	try {
		let mysqlConn = createMysqlConn();
		mysqlConn.connect();
		const post = { name: ctx.request.body.tagName };
		let results = await new Promise(function(resolve, reject) {
			mysqlConn.query("INSERT INTO tags SET ?", post, function(
				error,
				results,
				fields
			) {
				if (error) {
					reject(error);
				}
				resolve(results);
			});
		});
		ctx.body = {
			success: "yes",
			insertId: results.insertId
		};
		mysqlConn.end();
	} catch (e) {
		console.log("/tag/create", e);
	}
});
router.get("/tag/list", async (ctx, next) => {
	try {
		let mysqlConn = createMysqlConn();
		mysqlConn.connect();
		let results = await new Promise((resolve, reject) => {
			mysqlConn.query("select * from tags", function(
				error,
				results,
				fields
			) {
				if (error) {
					reject(error);
				}
				console.log("results", results);
				resolve(results);
			});
		});
		ctx.body = results;
		mysqlConn.end();
	} catch (e) {
		ctx.body = { success: "no" };
		console.log("/tag/list", e);
	}
});

/*
router.post("/tag/create", async (ctx, next) => {
	mysqlConn.connect(function(err) {
		if (err) {
			console.error("error connecting: " + err.stack);
			return;
		}
		// console.log("tagName", ctx.request.body.tagName);
		const post = { name: ctx.request.body.tagName };
		mysqlConn.query("INSERT INTO tags SET ?", post, function(
			error,
			results,
			fields
		) {
			if (error) {
				console.log(error);
				return;
			}
			console.log("results", results.insertId);
			ctx.body = {
				success: "yes"
				// insertId: results.insertId
			};
			console.log("final");
			// mysqlConn.end();
		});
	});
});
*/

module.exports = router;
