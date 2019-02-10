"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * choose country
 */
var arrayLike = {
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
  14: "Tiếng Viê",
  15: "Nederlands",
  16: "Polski",
  17: "Ελληνικά",
  18: "Türkçe",
  19: "Português (Brasil)",
  length: 20
};

(function createCountryLists(arrayLike) {
  var template = function template(element, index) {
    return "<li class=\"country-li\">\n                <i class=\"country-icon country-icon-".concat(parseInt(index) + 1, "\"></i>\n                <span class=\"country-name\">").concat(element, "</span>\n            </li>");
  };

  var countries = [].slice.call(arrayLike);
  var htmlStr = "";
  countries.forEach(function (element, index) {
    htmlStr += template(element, index);
  });
  var ul = document.querySelector("#choose-country .country-ul");
  ul.innerHTML = htmlStr;
})(arrayLike);

new (
/*#__PURE__*/
function () {
  function ShowOrHideCountryLists() {
    _classCallCheck(this, ShowOrHideCountryLists);

    this.showBtn = this.$("#footer .pop-country");
    this.popBox = this.$("#choose-country");
    this.mask = this.$("#mask");
    this.closeBtn = this.$("#choose-country .close-btn");
    this.ul = this.$("#choose-country .country-ul");
    this.init();
  }

  _createClass(ShowOrHideCountryLists, [{
    key: "$",
    value: function $(s) {
      return document.querySelector(s);
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.addMaskTransition();

      this.showBtn.onclick = function () {
        _this.show();
      };

      this.closeBtn.onclick = function () {
        _this.hide();
      };

      this.mask.onclick = function () {
        _this.hide();
      };
    }
  }, {
    key: "show",
    value: function show() {
      this.translateY(this.popBox, 0);
      this.mask.style.display = "block";
      this.mask.style.opacity = "0.5"; // document.body.addEventListener("touchmove",this.moveEventFunc.bind(this))
    }
  }, {
    key: "hide",
    value: function hide() {
      this.translateY(this.popBox, "100%");
      this.mask.style.opacity = "0"; // document.body.removeEventListener("touchmove",this.moveEventFunc.bind(this))
    }
  }, {
    key: "addMaskTransition",
    value: function addMaskTransition() {
      var _this2 = this;

      this.mask.addEventListener("transitionend", function () {
        var opacity = getComputedStyle(_this2.mask).getPropertyValue("opacity");

        if (opacity == 0) {
          _this2.mask.style.display = "none";
        }
      });
    }
  }, {
    key: "translateY",
    value: function translateY(obj, distance) {
      if (CSS && CSS.supports("transform-style", "preserve-3d")) {
        obj.style.transform = "translate3d(0,".concat(distance, ",0)");
      } else {
        obj.style.transform = "translateY(".concat(distance, ")");
      }
    }
  }]);

  return ShowOrHideCountryLists;
}())();

var addScroll =
/*#__PURE__*/
function () {
  function addScroll(el, options) {
    _classCallCheck(this, addScroll);

    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
    this.scroller = this.wrapper.children[0]; // cache style for better performance

    this.scrollerStyle = this.scroller.style; // this.enableScroll = false

    this.options = {
      bounce: true,
      bounceTime: 600,
      bounceEasing: "cubic-bezier(0.1, 0.57, 0.1, 1)",
      quadraticEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      momentum: true
    };
    this.startY = 0;
    this.y = 0;

    if (options !== undefined) {
      for (var i in options) {
        this.options[i] = options[i];
      }
    }

    this.translateY = this.useGpuOrNot();
    this.refresh();
    this.init();
  }

  _createClass(addScroll, [{
    key: "resize",
    value: function resize() {}
  }, {
    key: "refresh",
    value: function refresh() {
      // Force reflow
      this.wrapper.getBoundingClientRect();
      this.wrapperHeight = this.wrapper.clientHeight;
      this.scrollerHeight = this.scroller.getBoundingClientRect().height;
      this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
    }
  }, {
    key: "init",
    value: function init() {
      this.scroller.addEventListener("touchstart", this.start.bind(this));
      this.scroller.addEventListener("touchmove", this.move.bind(this));
      this.scroller.addEventListener("touchend", this.end.bind(this));
      this.scroller.addEventListener("transitionend", function (e) {
        this.scrollerStyle.transitionDuration = "0s";

        if (!this.beyondBoundary(this.options.bounceTime)) {
          this.isInTransition = false;
        }
      }.bind(this)); //绑定 resize事件
    }
  }, {
    key: "start",
    value: function start(e) {
      // this.enableScroll = true
      this.startY = this.y;
      this.pointY = e.touches[0].clientY;
      this.startTime = this.getTime();

      if (this.isInTransition) {
        this.scrollerStyle.transitionDuration = "0s";
        this.isInTransition = false;
        var newY = getComputedStyle(this.scroller).getPropertyValue("transform").split(')')[0].split(', ')[5];
        newY = parseInt(newY);
        this.translateY(newY);
        this.y = newY;
      }
    }
  }, {
    key: "move",
    value: function move(e) {
      var deltaY = e.touches[0].clientY - this.pointY,
          newY = this.y + deltaY,
          timestamp = this.getTime();
      this.pointY = e.touches[0].clientY;

      if (newY > 0 || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
      }

      newY = Math.round(newY);
      this.translateY(newY);
      this.y = newY;

      if (timestamp - this.startTime > 300) {
        this.startTime = timestamp;
        this.startY = newY;
      }
    }
  }, {
    key: "end",
    value: function end(e) {
      var deltaY = e.changedTouches[0].clientY - this.pointY,
          newY = this.y + deltaY,
          duration = this.getTime() - this.startTime;

      if (this.beyondBoundary(this.options.bounceTime)) {
        return;
      }

      this.translateY(newY);
      this.y = newY;
      var time = 0;

      if (this.options.momentum) {
        var momentumY = this.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration);
        newY = momentumY.destination;
        time = momentumY.duration;
        this.isInTransition = true;
      }

      if (newY != this.y) {
        // change easing function when scroller goes out of the boundaries
        if (newY > 0 || newY < this.maxScrollY) {
          this.scrollerStyle.transitionTimingFunction = this.options.quadratic;
        }

        this.scrollerStyle.transitionDuration = time + "ms";
        this.translateY(newY);
        this.y = newY;
        return;
      }
    }
  }, {
    key: "beyondBoundary",
    value: function beyondBoundary(time) {
      var y = this.y;
      time = time || 0;

      if (this.y > 0) {
        y = 0;
      } else if (this.y < this.maxScrollY) {
        y = this.maxScrollY;
      }

      if (y == this.y) {
        return false;
      } // ???


      this.isInTransition = time > 0;
      this.scrollerStyle.transitionTimingFunction = this.options.bounceEasing;
      this.scrollerStyle.transitionDuration = time + "ms";
      this.translateY(y);
      this.y = y;
      return true;
    }
  }, {
    key: "useGpuOrNot",
    value: function useGpuOrNot() {
      var _this3 = this;

      if (CSS && CSS.supports("transform-style", "preserve-3d")) {
        console.log("func");
        return function (distance) {
          _this3.scroller.style.transform = "translate3d(0,".concat(distance, "px,0)");
        };
      } else {
        return function (distance) {
          _this3.scroller.style.transform = "translateY(".concat(distance, "px)");
        };
      }
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return Date.now ? Date.now() : new Date().getTime();
    }
  }, {
    key: "momentum",
    value: function momentum(current, start, time, lowerMargin, wrapperSize, deceleration) {
      var distance = current - start,
          speed = Math.abs(distance) / time,
          destination,
          duration;
      deceleration = deceleration === undefined ? 0.0006 : deceleration;
      destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
      duration = speed / deceleration;

      if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }

      return {
        destination: Math.round(destination),
        duration: duration
      };
    }
  }]);

  return addScroll;
}();

new addScroll(".country-container");
/*
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
        this.beginTime = null
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
            this.beginTime = Date.now()
            this.startPosY = e.changedTouches[0].screenY
            this.ul.style.transitionDuration = "0s"
            this.ulHeight = this.ul.offsetHeight
            this.ulContainerHeight = this.ulContainer.offsetHeight
            this.canBeScrolled = true
        })
        document.body.addEventListener("touchend",e=>{
            if(this.canBeScrolled){
                let d = e.changedTouches[0].screenY - this.startPosY

                if(d + this.transformY >= 0){
                    this.ul.style.transitionDuration = "0.2s"
                    this.ul.offsetHeight
                    this.translateY(this.ul,0)
                    this.transformY = 0
                } else if (-1 * (d + this.transformY) >= this.ulHeight-this.ulContainerHeight) {
                    this.ul.style.transitionDuration = "0.2s"
                    this.ul.offsetHeight
                    let t = this.ulContainerHeight -this.ulHeight
                    this.translateY(this.ul,t+"px")
                    this.transform = t
                }else{

let touchDuration = Date.now() - this.beginTime
console.log('tD',touchDuration);
let velocity = d/touchDuration
console.log('v',velocity);

                    this.translateY(this.ul,d + this.transformY + "px")
                    this.transformY += d
                }
                this.canBeScrolled = false
            }
        })

        this.popBox.addEventListener("wheel",e=>{e.preventDefault()})
        this.mask.addEventListener("wheel",e=>{e.preventDefault()})
    }
    moveEventFunc(e){
            if(this.canBeScrolled){
                console.log('inner');
                let d  = e.changedTouches[0].screenY - this.startPosY
                if (d + this.transformY >= 0){
                    this.translateY(this.ul, (d + this.transformY) / 3 + "px")
                }else if(-1 * (d + this.transformY) >= this.ulHeight-this.ulContainerHeight){
                    let t  = this.ulContainerHeight - this.ulHeight
                    this.translateY(this.ul, t + (d + this.transformY - t) /3  + "px")
                }else{
                this.translateY(this.ul,d + this.transformY +"px")
                }
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
                <i class="country-icon country-icon-${parseInt(index)+1}"></i>
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
*/
//# sourceMappingURL=country.js.map
