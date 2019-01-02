"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Carousel =
/*#__PURE__*/
function () {
  function Carousel() {
    _classCallCheck(this, Carousel);

    this.inner = document.querySelector("#carousel .inner");
    this.next = 2;
    this.timer = null;
  }

  _createClass(Carousel, [{
    key: "init",
    value: function init() {
      this.onTransitionEnd();
      this.cycle();
      this.addSlideControl();
    }
  }, {
    key: "addSlideControl",
    value: function addSlideControl() {
      var _this = this;

      this.inner.addEventListener("touchstart", function (e) {
        _this.pause();
      });
      this.inner.addEventListener("touchmove", function (e) {});
      this.inner.addEventListener("touchend", function (e) {});
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd() {
      var _this2 = this;

      this.inner.addEventListener("transitionend", function () {
        if (_this2.next === 8) {
          _this2.inner.style.transitionDuration = "0s";

          _this2.translate("head"); // force browser reflow


          _this2.inner.offsetHeight;
          _this2.inner.style.transitionDuration = "0.3s";
          _this2.next = 2;
        }

        if (_this2.next === 0) {
          _this2.inner.style.transitionDuration = "0s";

          _this2.translate("tail"); // force browser reflow


          _this2.inner.offsetHeight;
          _this2.inner.style.transitionDuration = "0.3s";
          _this2.next = 7;
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

      if (direction == null) {
        translate("".concat(-12.5 * this.next, "%"));
      }

      if (direction === "head") {
        translate("-12.5%");
      }

      if (direction === "tail") {
        translate("-75%");
      }
    }
  }, {
    key: "cycle",
    value: function cycle() {
      var _this4 = this;

      this.timer = setInterval(function () {
        _this4.translate();

        _this4.next++;
      }, 1000);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.timer);
    }
  }]);

  return Carousel;
}();

var carouselInstance = new Carousel();
carouselInstance.init();
//# sourceMappingURL=all.js.map
