"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Carousel =
/*#__PURE__*/
function () {
  function Carousel(selector) {
    _classCallCheck(this, Carousel);

    this._elem = [].slice.call(document.querySelector(selector).children);
    this.active = this.getActive();
    this.next = null;
    this.prev = null;
  }

  _createClass(Carousel, [{
    key: "getActive",
    value: function getActive() {
      var active = document.querySelector("#carousel .active");
      return this._elem.indexOf(active);
    }
  }]);

  return Carousel;
}();

var xy = new Carousel("#carousel");
console.log('xy', xy.active);
//# sourceMappingURL=all.js.map
