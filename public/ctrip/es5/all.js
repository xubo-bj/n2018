"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *  implement carousel
 */
var Carousel =
/*#__PURE__*/
function () {
  function Carousel() {
    var _this = this;

    _classCallCheck(this, Carousel);

    this.outer = document.querySelector("#carousel");
    this.inner = document.querySelector("#carousel .inner");
    this.current = 1;
    this.next = 2;
    this.timer = null;
    this.start = null;
    this.picWidth = null;
    this.canBeMoved = true;

    this.transitionEvent = function () {
      if (_this.current >= 7) {
        _this.inner.style.transitionDuration = "0s";

        _this.translate("head"); // force browser reflow


        _this.inner.offsetHeight;
        _this.inner.style.transitionDuration = "0.2s";
        _this.next = 2;
        _this.current = 1;
      }

      if (_this.current <= 0) {
        _this.inner.style.transitionDuration = "0s";

        _this.translate("tail"); // force browser reflow


        _this.inner.offsetHeight;
        _this.inner.style.transitionDuration = "0.2s";
        _this.next = 7;
        _this.current = 6;
      }

      _this.canBeMoved = true;
    };
  }

  _createClass(Carousel, [{
    key: "init",
    value: function init() {
      this.addTransition();
      this.cycle();
      this.addSlideControl();
    }
  }, {
    key: "addTransition",
    value: function addTransition() {
      this.inner.addEventListener("transitionend", this.transitionEvent);
    }
  }, {
    key: "removeTransition",
    value: function removeTransition() {
      this.inner.removeEventListener("transitionend", this.transitionEvent);
    }
  }, {
    key: "addSlideControl",
    value: function addSlideControl() {
      var _this2 = this;

      this.inner.addEventListener("touchstart", function (e) {
        _this2.pause();

        _this2.start = e.changedTouches[0].screenX;
        _this2.picWidth = _this2.outer.offsetWidth;

        _this2.removeTransition();
      });
      this.inner.addEventListener("touchmove", function (e) {
        if (_this2.canBeMoved) {
          var distance = e.changedTouches[0].screenX - _this2.start;

          _this2.translate(distance);
        }
      });
      this.inner.addEventListener("touchend", function (e) {
        var distance = e.changedTouches[0].screenX - _this2.start;

        if (distance > 100) {
          _this2.current--;
          _this2.next = _this2.current + 1;
        } else if (distance < -100) {
          _this2.current++;
          _this2.next = _this2.current + 1;
        } else {}

        _this2.addTransition();

        _this2.translate("current");

        _this2.cycle();
      });
    }
  }, {
    key: "translate",
    value: function translate(direction) {
      var _this3 = this;

      var translate = function translate(distance) {
        if (CSS && CSS.supports("transform-style", "preserve-3d")) {
          _this3.inner.style.transform = "translate3d(".concat(distance, ",0,0)");
        } else {
          _this3.inner.style.transform = "translateX(".concat(distance, ")");
        }
      };

      switch (direction) {
        case "next":
          {
            translate("".concat(-12.5 * this.next, "%"));
            this.canBeMoved = false;
            break;
          }

        case "current":
          {
            translate("".concat(-12.5 * this.current, "%"));
            break;
          }

        case "head":
          {
            translate("-12.5%");
            this.canBeMoved = false;
            break;
          }

        case "tail":
          {
            translate("-75%");
            this.canBeMoved = false;
            break;
          }

        default:
          {
            var location = -1 * this.current * this.picWidth + direction;
            translate("".concat(location, "px"));
          }
      }
    }
  }, {
    key: "cycle",
    value: function cycle() {
      var _this4 = this;

      this.timer = setInterval(function () {
        _this4.translate('next');

        _this4.current = _this4.next;
        _this4.next++;
      }, 3000);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.timer);
    }
  }]);

  return Carousel;
}();

new Carousel().init();
/*
 ** fetch inform
 */

var Search =
/*#__PURE__*/
function () {
  function Search() {
    _classCallCheck(this, Search);

    this.$ = function (s) {
      return document.querySelector(s);
    };

    this.indexPage = this.$("#index-page");
    this.searchPage = this.$("#search-page");
    this.searchBtn = this.$("#header .search");
    this.input = this.$("#search-page .input");
    this.url = 'https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=';
    this.noInput = this.$("#search-page .no-input");
    this.inputExist = this.$("#search-page .input-exist");
    this.back = this.$("#search-page .back");
    this.clear = this.$("#search-page .clear");
    this.compositionFlag = true;
    this.lastValue = null;
  }

  _createClass(Search, [{
    key: "init",
    value: function init() {
      var _this5 = this;

      this.searchBtn.onclick = function () {
        _this5.indexPage.style.display = "none";
        _this5.searchPage.style.display = "block";

        _this5.input.focus();
      };

      this.back.onclick = function () {
        _this5.indexPage.style.display = "block";
        _this5.searchPage.style.display = "none";
      };

      this.clear.onclick = function () {
        if (_this5.input.value.length !== 0) {
          _this5.input.value = "";
          _this5.noInput.style.display = "block";
          _this5.inputExist.style.display = "none";
        }
      };

      this.input.addEventListener("keyup", function (e) {
        // console.log('flag',this.compositionFlag);
        var value = e.target.value.trim();

        if (_this5.lastValue === value) {
          return;
        } // //响应复制
        // if (e.ctrlKey && e.keyCode == 86) {
        //     // console.log('up false',e.target.value);
        //     this.fetchContent(value)
        // }


        if (_this5.compositionFlag) {
          console.log('compos :', value); //防止再次响应复制

          if (!e.ctrlKey && e.keyCode == 17) {
            return;
          } // if (e.ctrlKey && e.keyCode == 86) {
          //     return
          // }else{
          // }


          _this5.fetchContent(value);
        }
      });
      this.input.addEventListener("compositionstart", function () {
        // console.log('start');
        _this5.compositionFlag = false;
      });
      this.input.addEventListener("compositionend", function () {
        // console.log('end');
        _this5.compositionFlag = true;
      });
      this.input.addEventListener("input", function (e) {
        if (_this5.compositionFlag) {
          var value = e.target.value.trim();
          console.log('input', e.target.value);
          _this5.lastValue = value;
        }
      });
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

  }, {
    key: "fetchContent",
    value: function fetchContent(value) {
      var _this6 = this;

      if (typeof value === "string" && value.length === 0) {
        this.noInput.style.display = "block";
        this.inputExist.style.display = "none";
      } else {
        // console.log('fetch');
        fetch("".concat(this.url).concat(value)).then(function (res) {
          return res.json();
        }).then(function (res) {
          // console.log('res', res.data);
          _this6.lastValue = value;
        });
      }
    }
  }]);

  return Search;
}();

new Search().init(); //  https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=a

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
//# sourceMappingURL=all.js.map
