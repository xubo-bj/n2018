require("@babel/register");
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID
const assert = require('assert');
const {
    createStore
} = require("redux")
const reducer = require("../../src/note/es6/reducers")
const url = 'mongodb://localhost:27017';
const dbName = 'note';
const userdirs = 'userdirs'
const client = new MongoClient(url, {
    useNewUrlParser: true
});
const shinelonId = require("../../config").note.mongodb.shinelonId
const ejsPath = 'note/'
const router = require('koa-router')()
router.prefix('/note')



router.get('/', async (ctx, next) => {
    let dbConn = await client.connect()
    let userdirsCol = dbConn.db(dbName).collection(userdirs)

    /**
     * 修改userdirs形状，增加一个parentId，响应到某一个具体的文档
     */
    let treeObj = {}
    let d0 = await userdirsCol.findOne({
        _id: new ObjectID(shinelonId)
    })
    d0.folded = false
    treeObj[shinelonId] = d0
    for (let i = 0; i < d0.dirs.length; i++) {
        let d1 = await userdirsCol.findOne({
            _id: d0.dirs[i]._id
        })
        d1.folded = true
        treeObj[d0.dirs[i]._id] = d1

        for (let j = 0; j < d1.dirs.length; j++) {
            let d2 = await userdirsCol.findOne({
                _id: d1.dirs[j]._id
            })
            d2.folded = true
            treeObj[d1.dirs[j]._id] = d2

        }
    }

    const store = createStore(reducer, {
        tree:treeObj 
    })
    const preloadedState = store.getState()

    await ctx.render(path.join(ejsPath, 'index'), {
        preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    })
})
router.post('/create-folder', async (ctx, next) => {

    let result = await client.connect()
    let u = result.db(dbName).collection(userdirs)

    let {
        dirId,
        name
    } = ctx.request.body
    
    let d = new Date()
    let r = await u.insertOne({
        name,
        ctime: d,
        mtime: d,
        dirs: [],
        files: []
    })


    if (r.insertedCount === 1) {
        let r2 = await u.updateOne({
            _id: new ObjectID(dirId)
        }, {
            $push: {
                dirs: {
                    _id: r.insertedId,
                    name,
                    ctime: d,
                    mtime: d
                }
            }
        })

        if (r2.modifiedCount === 1) {
            ctx.body = {
                success: "ok",
                parentId: dirId,
                newId: r.insertedId,
                name,
                time: d
            }
        } else {
            await u.deleteOne({
                _id: r.insertedId
            })
            ctx.body = {
                success: "no",
                msg: "modify failure"
            }
        }
    } else {
        ctx.body = {
            success: "no",
            msg: "insert failure"
        }
    }
})
router.get("/get-folders", async (ctx, next) => {
    let dbConn = await client.connect()
    let userdirsCol = dbConn.db(dbName).collection(userdirs)
    let ids = JSON.parse(ctx.query.ids)
    let partialDirTree = {}
    for (let i = 0; i < ids.length; i++) {
        let dir = await userdirsCol.findOne({
            _id: new ObjectID(ids[i])
        })
        dir.folded = true
        partialDirTree[ids[i]] = dir
    }
    ctx.body =partialDirTree 
})


/*
** test

let i = 0
router.get('/test', async (ctx, next) => {
    let r = await client.connect()
    let test = r.db(dbName).collection("userdirs")
    console.log("test", test);

    let x = await test.find({})
    console.log("x", x);


    ctx.body = "success"
})
*/

module.exports = router
