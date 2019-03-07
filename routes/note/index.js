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

    // Connection URL

    // Use connect method to connect to the Server
let result  =     await client.connect()
let userdirs = result.db(dbName).collection("userdirs")
console.log('_id',typeof ctx.request.body);
console.log('_id',ctx.request.body.dirId);

let r = await userdirs.findOne({_id:ctx.request.body.dirId})
console.log("r'",r);


ctx.body = ctx.request.body

    // client.connect(function (err) {
    //     assert.equal(null, err);
    //     console.log("Connected successfully to server");

    //     const db = client.db(dbName);

    //     client.close();
    // });

})

module.exports = router
