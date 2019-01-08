/**
 *  implement carousel
 */
class Carousel {
    constructor() {
        this.outer = document.querySelector("#carousel")
        this.inner = document.querySelector("#carousel .inner")
        this.current = 1
        this.next = 2
        this.timer = null
        this.start = null
        this.picWidth = null
        this.canBeMoved = true
        this.transitionEvent = () => {
            if (this.current >= 7) {
                this.inner.style.transitionDuration = "0s"
                this.translate("head")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.2s"
                this.next = 2
                this.current = 1
            }
            if (this.current <= 0) {
                this.inner.style.transitionDuration = "0s"
                this.translate("tail")
                // force browser reflow
                this.inner.offsetHeight
                this.inner.style.transitionDuration = "0.2s"
                this.next = 7
                this.current = 6
            }
            this.canBeMoved = true
        }
    }
    init() {
        this.addTransition()
        this.cycle()
        this.addSlideControl()
    }
    addTransition() {
        this.inner.addEventListener("transitionend", this.transitionEvent)
    }
    removeTransition() {
        this.inner.removeEventListener("transitionend", this.transitionEvent)
    }
    addSlideControl() {
        this.inner.addEventListener("touchstart", (e) => {
            this.pause()
            this.start = e.changedTouches[0].screenX
            this.picWidth = this.outer.offsetWidth
            this.removeTransition()
        })
        this.inner.addEventListener("touchmove", (e) => {
            if (this.canBeMoved) {
                let distance = e.changedTouches[0].screenX - this.start
                this.translate(distance)
            }
        })
        this.inner.addEventListener("touchend", (e) => {
            let distance = e.changedTouches[0].screenX - this.start
            if (distance > 100) {
                this.current--
                this.next = this.current + 1
            } else if (distance < -100) {
                this.current++
                this.next = this.current + 1
            } else {}

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
        switch (direction) {
            case "next":
                {
                    translate(`${-12.5 * this.next}%`)
                    this.canBeMoved = false
                    break
                }
            case "current":
                {
                    translate(`${-12.5 * this.current}%`)
                    break
                }
            case "head":
                {
                    translate("-12.5%")
                    this.canBeMoved = false
                    break
                }
            case "tail":
                {
                    translate("-75%")
                    this.canBeMoved = false
                    break
                }
            default:
                {
                    let location = -1 * this.current * this.picWidth + direction
                    translate(`${location}px`)

                }
        }
    }
    cycle() {
        this.timer = setInterval(() => {
            this.translate('next')
            this.current = this.next
            this.next++
        }, 3000)
    }
    pause() {
        clearInterval(this.timer)
    }
}

(new Carousel()).init()

/*
 ** fetch inform
 */

class Search {
    constructor() {
        this.$ = (s) => document.querySelector(s)
        this.indexPage = this.$("#index-page")
        this.searchPage = this.$("#search-page")
        this.searchBtn = this.$("#header .search")
        this.input = this.$("#search-page .input")
        this.url = 'https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword='
        this.noInput = this.$("#search-page .no-input")
        this.inputExist = this.$("#search-page .input-exist")
        this.back = this.$("#search-page .back")
        this.clear = this.$("#search-page .clear")
        this.compositionFlag =true 
        this.lastValue = null
    }
    init() {
        this.searchBtn.onclick = () => {
            this.indexPage.style.display = "none"
            this.searchPage.style.display = "block"
            this.input.focus()
        }
        this.back.onclick = () => {
            this.indexPage.style.display = "block"
            this.searchPage.style.display = "none"
        }
        this.clear.onclick = () => {
            if (this.input.value.length !== 0) {
                this.input.value = ""
                this.noInput.style.display = "block"
                this.inputExist.style.display = "none"
            }
        }
        this.input.addEventListener("keyup", (e) => {
            // console.log('flag',this.compositionFlag);
            
            let value = e.target.value.trim()
            if (this.lastValue === value) {
                return
            }

            // //响应复制
            // if (e.ctrlKey && e.keyCode == 86) {
            //     // console.log('up false',e.target.value);
            //     this.fetchContent(value)
            // }
            if (this.compositionFlag) {
                console.log('compos :',value);
                //防止再次响应复制
                if (!e.ctrlKey && e.keyCode == 17) {
                    return
                }
                // if (e.ctrlKey && e.keyCode == 86) {
                //     return
                // }else{

                // }
                this.fetchContent(value)

            }
        })
        this.input.addEventListener("compositionstart", () => {
            // console.log('start');
            this.compositionFlag = false
        })
        this.input.addEventListener("compositionend", () => {
            // console.log('end');
            
            this.compositionFlag = true
        })
        this.input.addEventListener("input",(e)=>{
            if(this.compositionFlag){
                let value = e.target.value.trim()
                console.log('input',e.target.value);
                this.lastValue =value
            }
        })
    }

        /*
                                 `
                     <li class="result-item">
                         <i class="result-icon"></i>
                         <div class="title">
                             <span class="main-title">大阪的全部旅游产品</span>
                             <span class="sub-title">大阪</span>
                         </div>
                         <em class="item-btn"></em>
                     </li>
                     <li class="result-item">
                         <i class="result-icon"></i>
                         <p class="title">
                             <span class="main-title">北京东直门雅辰悦居酒店</span>
                             <span class="sub-title">  北京 东直门/工体/雍和宫 </span>
                         </p>
                         <p class="price">
                             <span class="detailed">实时计价</span>
                             <span class="level">高档型</span>
                         </p>
                         <em class="item-btn"></em>
                     </li>
                             `
             */

    fetchContent(value) {
        if (typeof (value) === "string" && value.length === 0) {
            this.noInput.style.display = "block"
            this.inputExist.style.display = "none"
        } else {
            // console.log('fetch');
            
            fetch(`${this.url}${value}`)
                .then(res => res.json())
                .then(res => {
                    // console.log('res', res.data);

                    this.lastValue = value
                })
        }
    }
}
(new Search()).init()



//  https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=a
        /*
                                $('input').on({
            keyup : function(e){        
                var flag = e.target.isNeedPrevent;
                if(flag)  return;     
                response() ;
                e.target.keyEvent = false ;
                
            },
            keydown : function(e){
                e.target.keyEvent = true ; 
            },
            input : function(e){
                if(!e.target.keyEvent){
                    response()
                }        
            },
            compositionstart : function(e){
                e.target.isNeedPrevent = true ;
            },
            compositionend : function(e){
                e.target.isNeedPrevent = false;
                
            }
            */