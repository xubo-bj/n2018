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

      this.input.addEventListener("input", function (e) {
        var value = e.target.value;
        console.log('v', value);

        if (typeof value === "string" && value.length === 0) {
          _this5.noInput.style.display = "block";
          _this5.inputExist.style.display = "none";
        } else {
          fetch("".concat(_this5.url).concat(e.target.value)).then(function (res) {
            return res.json();
          }).then(function (res) {
            // let d = res.data,
            // r =""
            // console.log('d',d);
            // for(let i =0;i<d.length;i++){
            //     switch
            // }
            "\n                <li class=\"result-item\">\n                    <i class=\"result-icon\"></i>\n                    <div class=\"title\">\n                        <span class=\"main-title\">\u5927\u962A\u7684\u5168\u90E8\u65C5\u6E38\u4EA7\u54C1</span>\n                        <span class=\"sub-title\">\u5927\u962A</span>\n                    </div>\n                    <em class=\"item-btn\"></em>\n                </li>\n                <li class=\"result-item\">\n                    <i class=\"result-icon\"></i>\n                    <p class=\"title\">\n                        <span class=\"main-title\">\u5317\u4EAC\u4E1C\u76F4\u95E8\u96C5\u8FB0\u60A6\u5C45\u9152\u5E97</span>\n                        <span class=\"sub-title\">  \u5317\u4EAC \u4E1C\u76F4\u95E8/\u5DE5\u4F53/\u96CD\u548C\u5BAB </span>\n                    </p>\n                    <p class=\"price\">\n                        <span class=\"detailed\">\u5B9E\u65F6\u8BA1\u4EF7</span>\n                        <span class=\"level\">\u9AD8\u6863\u578B</span>\n                    </p>\n                    <em class=\"item-btn\"></em>\n                </li>\n                        ";
            _this5.noInput.style.display = "none";
            _this5.inputExist.style.display = "block";
          });
        }
      });
    }
  }]);

  return Search;
}();

new Search().init(); //  https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=a
//# sourceMappingURL=all.js.map
