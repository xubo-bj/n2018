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
const client = new MongoClient(url, {
    useNewUrlParser: true
});
const mongodb = require("../../config").note.mongodb
const shinelonId = mongodb.shinelonId
const userdirs = mongodb.collections.userdirs
const userfiles = mongodb.collections.userfiles


const ejsPath = 'note/'
const router = require('koa-router')()
router.prefix('/note')

const {
    EditorState,
    convertToRaw,
    convertFromRaw
} = require("draft-js")

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
    let initialState = {}
    initialState.tree = treeObj
    if (d0.files.length > 0) {
        let fileId = d0.files[0]._id
        initialState.fileId = fileId
        // let userfilesCollection = dbConn.db(dbName).collection(userfiles)
        // let file = await userfilesCollection.findOne({
        //     _id: new ObjectID(fileId)
        // })
        // initialState.editorState = EditorState.createWithContent(convertFromRaw(file.content)) 
    }

    const store = createStore(reducer, initialState)
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
        files: [],
        parentId: dirId
    })


    if (r.insertedCount === 1) {
        let r2 = await u.updateOne({
            _id: new ObjectID(dirId)
        }, {
            $push: {
                dirs: {
                    _id: new ObjectID(r.insertedId),
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
    ctx.body = partialDirTree
})


router.post('/create-file', async (ctx, next) => {

    let result = await client.connect()
    let userfilesCollection = result.db(dbName).collection(userfiles)

    let {
        dirId,
        name
    } = ctx.request.body

    let d = new Date()
    let r = await userfilesCollection.insertOne({
        name,
        ctime: d,
        mtime: d,
        content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        ownerFolderId: dirId
    })

    let userdirsCollection = result.db(dbName).collection(userdirs)

    if (r.insertedCount === 1) {
        let r2 = await userdirsCollection.updateOne({
            _id: new ObjectID(dirId)
        }, {
            $push: {
                files: {
                    _id: r.insertedId,
                    name,
                    ctime: d,
                    mtime: d,
                }
            }
        })

        if (r2.modifiedCount === 1) {
            ctx.body = {
                success: "ok",
                newFileId: r.insertedId,
                name,
                time: d
            }
        } else {
            await userfilesCollection.deleteOne({
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

router.put('/update-file', async (ctx, next) => {
    let connection = await client.connect()
    let userfilesCollection = connection.db(dbName).collection(userfiles)
    let mtime = new Date()
    let {
        name,
        content,
        fileId,
        dirId,
    } = ctx.request.body
    let updateFilesResult = await userfilesCollection.updateOne({
        _id: new ObjectID(fileId)
    }, {
        $set: {
            name,
            content,
            mtime,
        }
    })
    if (updateFilesResult.modifiedCount === 1) {
        let userdirsCollection = connection.db(dbName).collection(userdirs)
        let updateDirsResult = await userdirsCollection.updateOne({
            _id: new ObjectID(dirId),
            "files._id": new ObjectID(fileId)
        }, {
            $set: {
                "files.$.name": name,
                "files.$.mtime": mtime
            }
        })

        if (updateDirsResult.modifiedCount === 1) {
            ctx.body = {
                success: "ok",
                mtime
            }
        } else {
            ctx.body = {
                success: "no",
                error: "update folder that file locates in failure"
            }
        }
    } else {
        ctx.body = {
            success: "no",
            error: "update file failure"
        }
    }
})

router.get("/get-file", async (ctx, next) => {
    let fileId = ctx.query.selectedFileId
    let connection = await client.connect()
    let userfilesCollection = connection.db(dbName).collection(userfiles)
    let file = await userfilesCollection.findOne({
        _id: new ObjectID(fileId)
    })
    console.log("fileId",fileId)
    console.log("file",file)
    if (file != null) {
        ctx.body = {
            success: "ok",
            content: file.content
        }
    } else {
        ctx.body = {
            success: "no",
            info: "no such file"
        }
    }
})

router.delete("/delete-file", async (ctx, next) => {
    let {
        deletedFileId,
        dirId,
        newDisplayFileId
    } = ctx.query

    let dbConn = await client.connect()
    let userdirsCol = dbConn.db(dbName).collection(userdirs)
    let updateDirsResult = await userdirsCol.updateOne({
        _id: new ObjectID(dirId)
    }, {
        $pull: {
            files: {
                _id: new ObjectID(deletedFileId)
            }
        }
    })

    if (updateDirsResult.modifiedCount === 1) {
        let userfilesCol = dbConn.db(dbName).collection(userfiles)
        let deleteFileResult = await userfilesCol.deleteOne({
            _id: new ObjectID(deletedFileId)
        })
        //  如果删除userfiles中的document失败了也不影响使用，以后每隔一段时间清理一下userfiles就可以了。
        let content = null
        if(newDisplayFileId != null){
           let file = await userfilesCol.findOne({
                _id: new ObjectID(newDisplayFileId)
            })
            content = file.content
        }
        ctx.body = {
            success:"ok",
            content
        }
    } else {
        ctx.body = {
            success: "no",
            error: "delete file in folder fail"
        }
    }
})

router.get('/test', async (ctx, next) => {
    let r = await client.connect()
    let userdirs = r.db(dbName).collection("userdirs")
    let x = await userdirs.drop()
    // console.log("drop collection", x);
    let z = await userdirs.insertOne({
        _id: new ObjectID(shinelonId),
        desc: "rootDir",
        ctime: new Date(),
        mtime: new Date(),
        parentId: null,
        dirs: [],
        files: []
    })
    // console.log("create new root",z)
    let userfiles = r.db(dbName).collection("userfiles")
    let y = await userfiles.drop()
    // console.log("drop userfiles",y)

    ctx.body = {
        "drop collection": x,
        "create new root ": z,
        "drop userfiles": y
    }
})

router.get('/unload', async (ctx, next) => {
    console.log("unload =========================================>")
})
module.exports = router
