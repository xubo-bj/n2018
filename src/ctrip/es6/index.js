class Carousel{
    constructor(selector){
        this._elem = [].slice.call(document.querySelector(selector).children)
        this.active= this._elem.indexOf()
        this.next =null
        this.prev = null
    }
    getActive(){
        for(let i of this._elem){
            console.log('i',i);
            
            console.log('t',this._elem);
            
            if(this._elem[i].classList.contains("active")){
                return i
            }
        }
    }
}

var xy = new Carousel("#carousel")
console.log('xy',xy.active);
