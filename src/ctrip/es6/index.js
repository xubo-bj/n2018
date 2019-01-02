class Carousel {
    constructor() {
        this.inner = document.querySelector("#carousel .inner")
        this.next = 2
        this.timer = null
    }
    init(){
        this.onTransitionEnd()
        this.cycle()
        this.addSlideControl()
    }
    addSlideControl(){
        this.inner.addEventListener("touchstart",(e)=>{
            this.pause()
        })
        this.inner.addEventListener("touchmove",(e)=>{})
        this.inner.addEventListener("touchend",(e)=>{})
    }
    onTransitionEnd() {
        this.inner.addEventListener("transitionend", () => {
            if (this.next === 8) {
                this.inner.style.transitionDuration = "0s"
                this.translate("head")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.3s"
                this.next = 2
            }
            if (this.next === 0) {
                this.inner.style.transitionDuration = "0s"
                this.translate("tail")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.3s"
                this.next = 7
            }
        })
    }
    translate(direction) {
        let translate = (distance) => {
            if (CSS && CSS.supports("transform-style", "preserve-3d")) {
                this.inner.style.transform = `translate3d(${distance},0,0)`
            } else {
                this.inner.style.transform = `translateX(${distance})`
            }
        }
        if (direction == null) {
                translate(`${-12.5 * this.next}%`)
        }
        if(direction === "head"){
            translate("-12.5%")
        }
        if(direction === "tail"){
            translate("-75%")
        }

    }
    cycle() {
            this.timer = setInterval(() => {
                this.translate()
                this.next++
            }, 1000)
    }
    pause(){
        clearInterval(this.timer)
    }
}


let carouselInstance = new Carousel()
carouselInstance.init()


