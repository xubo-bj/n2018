require("@babel/register");
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID
const Binary = require("mongodb").Binary
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
const userimages = mongodb.collections.userimages
const getRawBody = require('raw-body')


const ejsPath = 'note/'
const router = require('koa-router')()
router.prefix('/note')

const {
    EditorState,
    convertToRaw,
    CompositeDecorator
} = require("draft-js")

const React = require("react")

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

function Link(props) {
    const {
        url
    } = props.contentState.getEntity(props.entityKey).getData();
    return React.createElement("a", {
        href: url,
        ["data-href"]: "draftjs",
        style: {
            color: '#3b5998',
            textDecoration: 'underline'
        }
    }, props.children)
}

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
        initialState.fileId = d0.files[0]._id
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
        name,
        ancestors
    } = ctx.request.body

    let d = new Date()
    let r = await u.insertOne({
        name,
        ctime: d,
        mtime: d,
        dirs: [],
        files: [],
        parentId: dirId,
        ancestors
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
        name,
        ancestors
    } = ctx.request.body

    let d = new Date()
    const decorator = new CompositeDecorator([{
        strategy: findLinkEntities,
        component: Link
    }]);

    let r = await userfilesCollection.insertOne({
        name,
        ctime: d,
        mtime: d,
        content: convertToRaw(EditorState.createEmpty(decorator).getCurrentContent()),
        ownerFolderId: dirId,
        ancestors
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
    if (file != null) {
        ctx.body = {
            success: "ok",
            content: file.content,
            name: file.name
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
        if (newDisplayFileId != null) {
            let file = await userfilesCol.findOne({
                _id: new ObjectID(newDisplayFileId)
            })
            content = file.content
        }
        ctx.body = {
            success: "ok",
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
    let z = await userdirs.insertOne({
        _id: new ObjectID(shinelonId),
        desc: "rootDir",
        ctime: new Date(),
        mtime: new Date(),
        parentId: null,
        dirs: [],
        files: [],
        ancestors: []
    })
    let userfiles = r.db(dbName).collection("userfiles")
    let y = await userfiles.drop()

    ctx.body = {
        "drop collection": x,
        "create new root ": z,
        "drop userfiles": y
    }
})
router.put('/update-folder', async (ctx, next) => {
    let connection = await client.connect()
    let userdirsCollection = connection.db(dbName).collection(userdirs)
    let mtime = new Date()
    let {
        name,
        parentId,
        currentDirId,
    } = ctx.request.body
    let updateDirsResult = await userdirsCollection.updateOne({
        _id: new ObjectID(currentDirId)
    }, {
        $set: {
            name,
            mtime,
        }
    })
    if (updateDirsResult.modifiedCount === 1) {
        let updateDirsResult_2 = await userdirsCollection.updateOne({
            _id: new ObjectID(parentId),
            "dirs._id": new ObjectID(currentDirId)
        }, {
            $set: {
                "dirs.$.name": name,
                "dirs.$.mtime": mtime
            }
        })

        if (updateDirsResult_2.modifiedCount === 1) {
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

router.delete("/delete-folder", async (ctx, next) => {
    let {
        currentDirId,
        parentId
    } = ctx.query

    let dbConn = await client.connect()
    let userdirsCol = dbConn.db(dbName).collection(userdirs)
    let userfilesCol = dbConn.db(dbName).collection(userfiles)
    let findResult = await userdirsCol.findOne({
        _id: new ObjectID(currentDirId)
    })
    let arr = findResult.files.map(x => new ObjectID(x._id))


    let p1 = userdirsCol.deleteMany({
        ancestors: currentDirId
    })
    let p2 = userfilesCol.deleteMany({
        ancestors: currentDirId
    })
    let p3 = null

    if (arr.length > 0) {
        p3 = userfilesCol.deleteMany({
            _id: {
                $in: arr
            }
        })
    }
    let p4 = userdirsCol.deleteOne({
        _id: new ObjectID(currentDirId)
    })
    let p5 = userdirsCol.updateOne({
        _id: new ObjectID(parentId)
    }, {
        $pull: {
            dirs: {
                _id: new ObjectID(currentDirId)
            }
        }
    })
    let pall = null
    if (p3 != null) {
        pall = [p1, p2, p3, p4, p5]
    } else {
        pall = [p1, p2, p4, p5]
    }
    let r = await Promise.all(pall)
    for (let i = 0; i < r.length - 1; i++) {
        console.log(i, " :", r[i].deletedCount)
    }
    console.log(r.length - 1, " :", r[r.length - 1].modifiedCount)
    ctx.body = {
        success: "ok"
    }

})

router.post("/upload-image", async (ctx, next) => {
    console.log("there is -------------------------------")
    ctx.rawBody = await getRawBody(ctx.req, {
        length: ctx.req.headers['content-length'],
        limit: '1mb'
    })

    let dbConn = await client.connect()
    let userImagesColl = dbConn.db(dbName).collection(userimages)
    let r0 = await userImagesColl.insertOne({
        binData: new Binary(ctx.rawBody)
    })
    if (r0.insertedCount === 1) {
        ctx.body = r0.insertedId
    } else {
        ctx.body = "failure"
    }
})

router.get("/image/:id", async (ctx, next) => {
    console.log("_id ===============    :",ctx.params.id)
    let dbConn = await client.connect()
    let userImagesColl = dbConn.db(dbName).collection(userimages)
    let r = await userImagesColl.findOne({
        _id: new ObjectID(ctx.params.id)
    })
    ctx.type = 'image/jpg'
    ctx.body = r.binData.buffer
})






module.exports = router
