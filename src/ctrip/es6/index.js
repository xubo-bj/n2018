class Carousel{
    constructor(selector){
        this._elem = [].slice.call(document.querySelector(selector).children)
        this.active= this.getActive()
        this.next =null
        this.prev = null
    }
    getActive(){
        let active = document.querySelector("#carousel .active")
        return this._elem.indexOf(active)
    }
}

var xy = new Carousel("#carousel")
console.log('xy',xy.active);
