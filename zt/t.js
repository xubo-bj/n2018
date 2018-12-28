class MyClass {

    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }

}

let instance = new MyClass();
let iterator = instance.createIterator();

var a1 = iterator.next()
console.log('a',a1);
var a1 = iterator.next()
console.log('a',a1);
