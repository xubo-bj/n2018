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
      if (_this.current == 7) {
        _this.inner.style.transitionDuration = "0s";

        _this.translate("head"); // force browser reflow


        _this.inner.offsetHeight;
        _this.inner.style.transitionDuration = "0.2s";
        _this.next = 2;
        _this.current = 1;
      }

      if (_this.current == 0) {
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
      this.addTransitionEnd();
      this.cycle();
      this.addSlideControl();
    }
  }, {
    key: "addTransitionEnd",
    value: function addTransitionEnd() {
      this.inner.addEventListener("transitionend", this.transitionEvent);
    }
  }, {
    key: "removeTransitionEnd",
    value: function removeTransitionEnd() {
      this.inner.removeEventListener("transitionend", this.transitionEvent);
    }
  }, {
    key: "addSlideControl",
    value: function addSlideControl() {
      var _this2 = this;

      this.inner.addEventListener("touchstart", function (e) {
        _this2.pause();

        if (_this2.current !== 7 && _this2.current !== 0) {
          _this2.start = e.changedTouches[0].screenX;
          _this2.picWidth = _this2.outer.offsetWidth;

          _this2.removeTransitionEnd();

          _this2.inner.style.transitionDuration = "0s";
          _this2.inner.offsetHeight;
        }
      });
      this.inner.addEventListener("touchmove", function (e) {
        if (_this2.current !== 7 && _this2.current !== 0) {
          if (_this2.canBeMoved) {
            var distance = e.changedTouches[0].screenX - _this2.start;

            _this2.translate(distance);
          }
        }
      });
      this.inner.addEventListener("touchend", function (e) {
        if (_this2.current !== 7 && _this2.current !== 0) {
          var distance = e.changedTouches[0].screenX - _this2.start;

          if (distance > 70) {
            _this2.current--;
            _this2.next = _this2.current + 1;
          } else if (distance < -70) {
            _this2.current++;
            _this2.next = _this2.current + 1;
          }

          _this2.addTransitionEnd();

          _this2.translate("current");

          _this2.inner.style.transitionDuration = "0.2s";
          _this2.inner.offsetHeight;

          _this2.cycle();
        }
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
            this.canBeMoved = false;
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
            var _location = -1 * this.current * this.picWidth + direction;

            translate("".concat(_location, "px"));
          }
      }
    }
  }, {
    key: "cycle",
    value: function cycle() {
      var _this4 = this;

      this.timer = setInterval(function () {
        _this4.translate("next");

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
    this.url = "https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=";
    this.noInput = this.$("#search-page .no-input");
    this.inputExist = this.$("#search-page .input-exist");
    this.back = this.$("#search-page .back");
    this.clear = this.$("#search-page .clear");
    this.result = this.$("#search-page .search-result");
    this.hotList = this.$("#search-page .hot-list");
    this.visitBtn = this.$(".search-box .visit");
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

      this.input.addEventListener("compositionstart", function () {
        _this5.compositionFlag = false;
      });
      this.input.addEventListener("compositionend", function () {
        _this5.compositionFlag = true;
      });
      this.input.addEventListener("keyup", function (e) {
        var value = e.target.value.trim();

        if (value.length === 0 && /\s/.test(e.target.value)) {
          if (_this5.lastValue.length === 1 && _this5.lastValue.trim().length === 0) {
            return;
          }

          _this5.fetchContent(" ");
        }

        if (_this5.lastValue === value) {
          return;
        }

        if (_this5.compositionFlag) {
          //ctrl+v ，激活两次keyup,一次ctrlKey为true，keyCode为86,一次ctrlKey为false,keyCode为ctrl的１７
          if (e.ctrlKey && e.keyCode == 86) {
            return;
          }

          _this5.fetchContent(value);
        } //汉字输入法输入一半时复制，firefox不支持，chrome支持


        if (!_this5.compositionFlag && e.ctrlKey && e.keyCode == 86) {
          _this5.fetchContent(value);
        }
      });

      var clickOnLi = function clickOnLi(e) {
        var elem = e.target;

        if (/item-btn|li-btn/.test(elem.className)) {
          var value = elem.dataset.title;

          _this5.fetch(value).then(function () {
            _this5.input.value = value;
          });

          return;
        }

        if (/item-btn|li-btn/.test(elem.parentElement.className)) {
          var _value = elem.parentElement.dataset.title;

          _this5.fetch(_value).then(function () {
            _this5.input.value = _value;
          });

          return;
        }

        while (elem !== e.currentTarget) {
          if (elem.tagName.toLowerCase() === "li") {
            location.href = elem.dataset.url;
            return;
          }

          elem = elem.parentElement;
        }
      };

      this.result.addEventListener("click", clickOnLi);
      this.hotList.addEventListener("click", clickOnLi);
      this.visitBtn.addEventListener("click", function () {
        var hotListDisplay = getComputedStyle(_this5.noInput).getPropertyValue("display");
        var searchResultDisplay = getComputedStyle(_this5.inputExist).getPropertyValue("display");

        if (hotListDisplay === "block") {
          location.href = _this5.hotList.firstElementChild.dataset.url;
          return;
        }

        if (searchResultDisplay === "block") {
          location.href = _this5.result.firstElementChild.dataset.url;
        }
      });
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (value) {
      var _this6 = this;

      console.log("fetch", value);
      var htmlStr = "";
      return fetch("".concat(this.url).concat(value)).then(function (res) {
        return res.json();
      }).then(function (res) {
        var d = res.data;
        console.log("d", d);

        for (var i = 0; i < d.length; i++) {
          if (d[i].price != null) {
            htmlStr += "<li class=\"result-item\" data-url=".concat(d[i].url, ">\n                     <i class=\"result-icon ").concat(d[i].type, "\"></i>\n                     <p class=\"title\">\n                             <span class=\"main-title\">").concat(d[i].word, "</span>\n                        <span class=\"sub-title\">").concat(d[i].districtname, "<em>").concat(d[i].zonename, "</em></span>\n                     </p>\n                     <p class=\"price\">\n                         <span class=\"detailed\">").concat(d[i].price, "</span>\n                         <span class=\"level\">").concat(d[i].star, "</span>\n                     </p>\n                     <span class=\"item-btn\" data-title=").concat(d[i].word, "></span>\n                 </li>");
          } else {
            htmlStr += "<li class=\"result-item\" data-url=".concat(d[i].url, ">\n                         <i class=\"result-icon ").concat(d[i].type, "\"></i>\n                         <div class=\"title\">\n                             <span class=\"main-title\">").concat(d[i].word, "</span>\n                             <span class=\"sub-title\">").concat(d[i].districtname, "</span>\n                         </div>\n                     <span class=\"item-btn\" data-title=").concat(d[i].word, "></span>\n                     </li>");
          }
        }

        _this6.result.innerHTML = htmlStr;
        _this6.noInput.style.display = "none";
        _this6.inputExist.style.display = "block";
      }).then(function (r) {
        _this6.lastValue = value;
      }).catch(function (e) {
        console.log("e", e);
      });
    })
  }, {
    key: "fetchContent",
    value: function fetchContent(value) {
      if (typeof value === "string" && value.length === 0) {
        this.noInput.style.display = "block";
        this.inputExist.style.display = "none";
        this.lastValue = value;
      } else {
        this.fetch(value);
      }
    }
  }]);

  return Search;
}();

new Search().init();
//# sourceMappingURL=index.js.map
