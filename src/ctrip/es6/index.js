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
           this.inner.style.transitionDuration = "0s"
           this.inner.offsetHeight
            
        })
        this.inner.addEventListener("touchmove", (e) => {
            if (this.canBeMoved) {
                let distance = e.changedTouches[0].screenX - this.start
                this.translate(distance)
            }
        })
        this.inner.addEventListener("touchend", (e) => {
            let distance = e.changedTouches[0].screenX - this.start
            if (distance > 70) {
                this.current--
                this.next = this.current + 1
            } else if (distance < -70) {
                this.current++
                this.next = this.current + 1
            } else {}

            this.addTransition()
            this.translate("current")
           this.inner.style.transitionDuration = "0.2s"
           this.inner.offsetHeight
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
        this.result = this.$("#search-page .search-result")
        this.hotList = this.$("#search-page .hot-list")
        this.visitBtn = this.$(".search-box .visit")
        this.compositionFlag = true
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
        this.input.addEventListener("compositionstart", () => {
            this.compositionFlag = false
        })
        this.input.addEventListener("compositionend", () => {
            this.compositionFlag = true
        })
        this.input.addEventListener("keyup", (e) => {
            let value = e.target.value.trim()
            if (value.length === 0 && /\s/.test(e.target.value)) {
                if (this.lastValue.length === 1 && this.lastValue.trim().length === 0) {
                    return
                }
                this.fetchContent(" ")
            }
            if (this.lastValue === value) {
                return
            }
            if (this.compositionFlag) {
                //ctrl+v ，激活两次keyup,一次ctrlKey为true，keyCode为86,一次ctrlKey为false,keyCode为ctrl的１７
                if (e.ctrlKey && e.keyCode == 86) {
                    return
                }
                this.fetchContent(value)
            }
            //汉字输入法输入一半时复制，firefox不支持，chrome支持
            if ((!this.compositionFlag) && (e.ctrlKey && e.keyCode == 86)) {
                this.fetchContent(value)
            }
        })
        let clickOnLi = e => {
            let elem = e.target
            if (/item-btn|li-btn/.test(elem.className)) {
                let value = elem.dataset.title
                this.fetch(value)
                    .then(() => {
                        this.input.value = value
                    })
                return
            }
            if (/item-btn|li-btn/.test(elem.parentElement.className)) {
                let value = elem.parentElement.dataset.title
                this.fetch(value)
                    .then(() => {
                        this.input.value = value
                    })
                return
            }
            while (elem !== e.currentTarget) {
                if (elem.tagName.toLowerCase() === "li") {
                    location.href = elem.dataset.url
                    return
                }
                elem = elem.parentElement
            }
        }

        this.result.addEventListener("click", clickOnLi)
        this.hotList.addEventListener("click", clickOnLi)

        this.visitBtn.addEventListener("click",()=>{
            let hotListDisplay = getComputedStyle(this.noInput).getPropertyValue("display")
            let searchResultDisplay = getComputedStyle(this.inputExist).getPropertyValue("display")

            if(hotListDisplay === "block"){
                location.href  = this.hotList.firstElementChild.dataset.url
                return
            }
            if(searchResultDisplay === "block"){
                location.href = this.result.firstElementChild.dataset.url
            }
        })
    }
    fetch(value) {
        console.log('fetch', value);
        let htmlStr = ""

        return fetch(`${this.url}${value}`)
            .then(res => res.json())
            .then(res => {

                let d = res.data
                console.log('d', d);

                for (let i = 0; i < d.length; i++) {
                    if (d[i].price != null) {
                        htmlStr +=
                            `<li class="result-item" data-url=${d[i].url}>
                     <i class="result-icon ${d[i].type}"></i>
                     <p class="title">
                             <span class="main-title">${d[i].word}</span>
                        <span class="sub-title">${d[i].districtname}<em>${d[i].zonename}</em></span>
                     </p>
                     <p class="price">
                         <span class="detailed">${d[i].price}</span>
                         <span class="level">${d[i].star}</span>
                     </p>
                     <span class="item-btn" data-title=${d[i].word}></span>
                 </li>`
                    } else {
                        htmlStr +=
                            `<li class="result-item" data-url=${d[i].url}>
                         <i class="result-icon ${d[i].type}"></i>
                         <div class="title">
                             <span class="main-title">${d[i].word}</span>
                             <span class="sub-title">${d[i].districtname}</span>
                         </div>
                     <span class="item-btn" data-title=${d[i].word}></span>
                     </li>`
                    }
                }
                this.result.innerHTML = htmlStr
                this.noInput.style.display = "none"
                this.inputExist.style.display = "block"
            })
            .then(r => {
                this.lastValue = value
            }).catch(e => {
                console.log('e', e);
            })
    }

    fetchContent(value) {
        if (typeof (value) === "string" && value.length === 0) {
            this.noInput.style.display = "block"
            this.inputExist.style.display = "none"
            this.lastValue = value
        } else {
            this.fetch(value)
        }
    }
}
(new Search()).init()