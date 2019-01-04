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

      if (direction == null) {
        translate("".concat(-12.5 * this.next, "%"));
        this.canBeMoved = false;
      }

      if (direction == "current") {
        translate("".concat(-12.5 * this.current, "%"));
      }

      if (direction === "head") {
        translate("-12.5%");
        this.canBeMoved = false;
      }

      if (direction === "tail") {
        translate("-75%");
        this.canBeMoved = false;
      }

      if (typeof direction === "number") {
        var location = -1 * this.current * this.picWidth + direction;
        translate("".concat(location, "px"));
      }
    }
  }, {
    key: "cycle",
    value: function cycle() {
      var _this4 = this;

      this.timer = setInterval(function () {
        _this4.translate();

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
  }

  _createClass(Search, [{
    key: "init",
    value: function init() {
      var _this5 = this;

      this.searchBtn.onclick = function () {
        _this5.indexPage.style.display = "none";
        _this5.searchPage.style.display = "block";
      };
    }
  }]);

  return Search;
}();

new Search().init(); // https://m.ctrip.com/restapi/h5api/searchapp/search?source=mobileweb&action=autocomplete&contentType=json&keyword=a
//# sourceMappingURL=all.js.map
