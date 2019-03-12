// Request method aliases
// For convenience aliases have been provided for all supported request methods.

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])


const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});



axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');

/*
let test = {
        _id: shinelonId,
        dirs: [{
                _id: 1,
                name: "编程指南"
            },
            {
                _id: 2,
                name: "编程指南新编"
            }
        ],
        docs: [],
        folded: false
    },
    t1 = {
        _id: 1,
        name: "编程指南",
        folded: false,
        dirs: [{
                _id: 3,
                name: "编程指南3"
            },
            {
                _id: 4,
                name: "编程指南新编4"
            }
        ]

    }
    */