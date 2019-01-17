/**
 * choose country
 */

const arrayLike = {
    0: "English (United States)",
    1: "English (United Kingdom)",
    2: "繁體中文 (香港)",
    3: "한국어",
    4: "日本語",
    5: "English (Singapore)",
    6: "Français",
    7: "Deutsch",
    8: "Español",
    9: "Italiano",
    10: "Русский",
    11: "English (Malaysia)",
    12: "ภาษาไทย",
    13: "Bahasa Indonesia",
    length: 14
}

class chooseCountry {
    constructor(countries) {
        this.countries = countries
        this.showBtn = this.$("#footer .pop-country")
        this.popBox = this.$("#choose-country")
        this.mask = this.$("#mask")
        this.closeBtn = this.$("#choose-country .close-btn")
        this.ul = this.$("#choose-country .country-ul")
        this.ulHeight= null
        this.ulContainer = this.$("#choose-country .country-container")
        this.ulContainerHeight = null
        this.canBeScrolled= false
        this.startPosY = null
        this.transformY = 0
    }
    init() {
        this.createList()
        this.addMaskTransition()
        this.showBtn.onclick = () => {
            this.show()
        }
        this.closeBtn.onclick=()=>{
            this.hide()
        }
        this.mask.onclick =()=>{
            this.hide()
        }
        this.ulContainer.addEventListener("touchstart",e=>{
            this.startPosY = e.changedTouches[0].screenY
            this.ulHeight = this.ul.offsetHeight
            this.ulContainerHeight = this.ulContainer.offsetHeight
            this.canBeScrolled = true
        })
        document.body.addEventListener("touchend",e=>{
            if(this.canBeScrolled){
                let d = e.changedTouches[0].screenY - this.startPosY
                if(d + this.transformY >= 0){
                    this.translateY(this.ul,0)
                    this.transformY = 0
                } else if (-1 * (d + this.transformY) >= this.ulHeight) {
                    let t = this.ulContainerHeight -this.ulHeight
                    this.translateY(this.ul,t+"px")
                    this.transform = t
                }else{
                    this.translateY(this.ul,d + this.transformY + "px")
                    this.transformY += d
                }
                this.canBeScrolled = false
            }
        })
    }
    moveEventFunc(e){
        console.log('scroll',this.canBeScrolled);
        
            if(this.canBeScrolled){
            console.log('body move');
                let d  = e.changedTouches[0].screenY - this.startPosY
                this.translateY(this.ul,d + this.transformY +"px")
            }
    }
    show() {
        this.translateY(this.popBox,0)
        this.mask.style.display = "block"
        this.mask.style.opacity = "0.5"
        document.body.addEventListener("touchmove",this.moveEventFunc.bind(this))
    }
    hide() {
        this.translateY(this.popBox,"100%")
        this.mask.style.opacity = "0"
        document.body.removeEventListener("touchmove",this.moveEventFunc.bind(this))
    }
    translateY(obj,distance){
            if (CSS && CSS.supports("transform-style", "preserve-3d")) {
                obj.style.transform = `translate3d(0,${distance},0)`
            } else {
                obj.style.transform = `translateY(${distance})`
            }
    }
    $(s) {
        return document.querySelector(s)
    }
    createList() {
        let template = (element, index) =>
            `<li class="country-li">
                <i class="country-icon country-icon-${index}"></i>
                <span class="country-name">${element}</span>
            </li>`
        const countries = [].slice.call(this.countries)
        let htmlStr = ""
        countries.forEach((element, index) => {
            htmlStr += template(element, index)
        });
        let ul = document.querySelector("#choose-country .country-ul")
        ul.innerHTML = htmlStr
    }
    addMaskTransition(){
        this.mask.addEventListener("transitionend",()=>{
            let opacity = getComputedStyle(this.mask).getPropertyValue("opacity")
            if(opacity == 0){
                this.mask.style.display = "none"
            }
        })
    }
}
(new chooseCountry(arrayLike)).init()