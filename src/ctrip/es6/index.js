class Carousel {
    constructor() {
        this.outer = document.querySelector("#carousel")
        this.inner = document.querySelector("#carousel .inner")
        this.current =1 
        this.next = 2
        this.timer = null
        this.start = null
        this.picWidth = null
        this.canBeMoved =true 
        this.transitionEvent =()=>{
            if (this.current>= 7) {
                this.inner.style.transitionDuration = "0s"
                this.translate("head")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.2s"
                this.next = 2
                this.current = 1
            }
            if (this.current<= 0) {
                this.inner.style.transitionDuration = "0s"
                this.translate("tail")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.2s"
                this.next = 7
                this.current = 6
            }
            this.canBeMoved = true
            console.log('okok');
            
        }
    }
    init(){
        this.addTransition()
        this.cycle()
        this.addSlideControl()
    }
    addTransition() {
        this.inner.addEventListener("transitionend",this.transitionEvent)
    }
    removeTransition(){
        this.inner.removeEventListener("transitionend",this.transitionEvent)
    }
    addSlideControl(){
        this.inner.addEventListener("touchstart",(e)=>{
            this.pause()
            this.start = e.changedTouches[0].screenX
            this.picWidth = this.outer.offsetWidth
            this.removeTransition()
        })
        this.inner.addEventListener("touchmove",(e)=>{
            if(this.canBeMoved){
                let distance  =e.changedTouches[0].screenX - this.start
                this.translate(distance)
            }
        })
        this.inner.addEventListener("touchend", (e) => {
            let distance = e.changedTouches[0].screenX - this.start
            if (distance > 150) {
                this.current--
                this.next = this.current + 1
            } else if (distance < -150) {
                this.current++
                this.next = this.current + 1
            } else {
            }

            this.addTransition()
            this.translate("current")
            this.cycle()

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
            this.canBeMoved = false
        }
        if(direction == "current"){
            translate(`${-12.5*this.current}%`)
        }
        if(direction === "head"){
            translate("-12.5%")
        this.canBeMoved = false
        }
        if(direction === "tail"){
            translate("-75%")
        this.canBeMoved = false
        }
        if(typeof direction === "number"){
            translate(`${-1 *this.current*this.picWidth+direction}px`)
        this.canBeMoved = false
        }
    }
    cycle() {
            this.timer = setInterval(() => {
                this.translate()
                this.current = this.next
                this.next++
            }, 13000)
    }
    pause(){
        clearInterval(this.timer)
    }
}


let carouselInstance = new Carousel()
carouselInstance.init()


