Promise.resolve(3).then(function(r){
    console.log(r)
})
console.log("1")
Promise.resolve(4).then(function(r){
    console.log(r)
})
console.log("2")
