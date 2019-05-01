// async function ab(){
//      Promise.resolve(1).then(x=>console.log("x",x))
//      Promise.resolve(2).then(x=>console.log("y",x))
//      console.log(3)
// }

Promise.all([Promise.reject(1),Promise.reject(2)]).then(function(x){
     console.log(x)
}).catch(function(x){
     console.log(x)

})
Promise.all([Promise.resolve(1),Promise.resolve(3)]).then(function(x){
     console.log(x)
}).catch(function(x){
     console.log(x)

})