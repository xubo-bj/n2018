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
    let arr = []
    let r = await userdirsCol.findOne({
        _id: new ObjectID(shinelonId)
    })
    r.folded = false
    arr.push(r)
    for(let i =0;i<r.dirs.length;i++){
        let dir = await userdirsCol.findOne({_id:r.dirs[i]._id})
        dir.folded = true
        arr.push(dir)
    }
    const store = createStore(reducer, {
        tree: arr
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
                success: "no"
            }
        }
    } else {
        ctx.body = {
            success: "no"
        }
    }
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
