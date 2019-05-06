
let i =1
class A{
     static tri(){
          return i++
     }
     constructor(){
          this.n1 = 'f'+ A.tri()
          this.n = A.tri()
     }
     init(){
          console.log(this.n1)
          console.log(this.n)
     }
}

let a1 = new A()
a1.init()




(function addScrollbarEvent() {
            let scrollbar = this.$scrollbar,
                wrapper = this.$wrapper,
                scrollbarHeight = null,
                startWrapperScrollTop = null,
                startClientY = null,
                wrapperHeight = null,
                wrapperScrollHeight = null,
                flag = false,
                inside= false,
                dragMoveCenterScrollbar = function (e) {
                    if (flag) {
                        let distance = e.clientY - startClientY,
                            scrollTop = Math.round(startWrapperScrollTop + distance * wrapperScrollHeight / wrapperHeight)
                        if (scrollTop >= 0 && scrollTop + wrapperHeight <= wrapperScrollHeight) {
                            wrapper.scrollTop = scrollTop
                            scrollbar.style.top = Math.round(scrollTop + scrollTop * wrapperHeight / wrapperScrollHeight) + 'px'
                        } else if (scrollTop < 0) {
                            wrapper.scrollTop = 0
                            scrollbar.style.top = "0px"
                        } else {
                            wrapper.scrollTop = wrapperScrollHeight - wrapperHeight
                            scrollbar.style.top = wrapperScrollHeight - scrollbarHeight +"px"
                        }
                    }
                }

            scrollbar.style.height = Math.round(wrapper.offsetHeight * wrapper.offsetHeight / wrapper.scrollHeight) + "px"

            scrollbar.addEventListener("mousedown", e => {
                flag = true
                startClientY = e.clientY
                startWrapperScrollTop = wrapper.scrollTop
                wrapperHeight = wrapper.offsetHeight
                wrapperScrollHeight = wrapper.scrollHeight
                scrollbarHeight = scrollbar.offsetHeight
                document.body.addEventListener("mousemove", dragMoveCenterScrollbar)
            })
            document.body.addEventListener("mouseup", e => {
                if (flag) {
                    flag = false
                    document.body.removeEventListener("mousemove", dragMoveCenterScrollbar)
                    if(!inside){
                    scrollbar.style.display = "none"
                    }
                }
            })
            wrapper.addEventListener("mouseenter",e=>{
                scrollbar.style.display = "block"
                inside = true
            })
            wrapper.addEventListener("mouseleave",e=>{
                inside = false
                if (!flag) {
                    scrollbar.style.display = "none"
                }
            })

          }

