const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID
const assert = require('assert');
const dbName = 'note';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const ejsPath = 'note/'

const router = require('koa-router')()
router.prefix('/note')

router.get('/', async (ctx, next) => {
    await ctx.render(path.join(ejsPath, 'index'))
})
router.post('/create-folder', async (ctx, next) => {

    let result = await client.connect()
    let userdirs = result.db(dbName).collection("userdirs")

    let {
        dirId,
        name
    } = ctx.request.body
    let d = new Date()
    let r = await userdirs.insertOne({
        name,
        ctime: d,
        mtime: d,
        dirs: [],
        files: []
    })
    if (r.insertedCount === 1) {
        let r2 = await userdirs.updateOne({
            _id: dirId
        }, {
            dirs: {
                $push: {
                    _id: r.insertedId,
                    name
                }
            }
        })
        if (r2.modifiedCount === 1) {
            ctx.body = {
                parentId: dirId,
                newId: r.insertedId,
                name,
                success: "ok"
            }
        } else {
            ctx.body = {
                success: "no"
            }
        }
    } else {
        ctx.body = {
            success: "no"
        }
    }
})

let i = 0
router.get('/test', async (ctx, next) => {
    let r = await client.connect()
    let test = r.db(dbName).collection("test")
    let x = await test.updateOne({
        dir: "name_0"
    }, {
        $set: {
            a: 1
        }
    })
    console.log("x", x.modifiedCount)
    ctx.body = x
})

module.exports = router
