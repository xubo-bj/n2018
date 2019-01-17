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
  length: 14
};

var chooseCountry =
/*#__PURE__*/
function () {
  function chooseCountry(countries) {
    _classCallCheck(this, chooseCountry);

    this.countries = countries;
    this.showBtn = this.$("#footer .pop-country");
    this.popBox = this.$("#choose-country");
    this.mask = this.$("#mask");
    this.closeBtn = this.$("#choose-country .close-btn");
    this.ul = this.$("#choose-country .country-ul");
    this.ulHeight = null;
    this.ulContainer = this.$("#choose-country .country-container");
    this.ulContainerHeight = null;
    this.canBeScrolled = false;
    this.startPosY = null;
    this.transformY = 0;
  }

  _createClass(chooseCountry, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.createList();
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

      this.ulContainer.addEventListener("touchstart", function (e) {
        _this.startPosY = e.changedTouches[0].screenY;
        _this.ul.style.transitionDuration = "0s";
        _this.ulHeight = _this.ul.offsetHeight;
        _this.ulContainerHeight = _this.ulContainer.offsetHeight;
        _this.canBeScrolled = true;
      });
      document.body.addEventListener("touchend", function (e) {
        if (_this.canBeScrolled) {
          var d = e.changedTouches[0].screenY - _this.startPosY;

          if (d + _this.transformY >= 0) {
            _this.ul.style.transitionDuration = "0.2s";
            _this.ul.offsetHeight;

            _this.translateY(_this.ul, 0);

            _this.transformY = 0;
          } else if (-1 * (d + _this.transformY) >= _this.ulHeight - _this.ulContainerHeight) {
            _this.ul.style.transitionDuration = "0.2s";
            _this.ul.offsetHeight;
            var t = _this.ulContainerHeight - _this.ulHeight;

            _this.translateY(_this.ul, t + "px");

            _this.transform = t;
          } else {
            _this.translateY(_this.ul, d + _this.transformY + "px");

            _this.transformY += d;
          }

          _this.canBeScrolled = false;
        }
      });
      this.popBox.addEventListener("wheel", function (e) {
        e.preventDefault();
      });
      this.mask.addEventListener("wheel", function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: "moveEventFunc",
    value: function moveEventFunc(e) {
      if (this.canBeScrolled) {
        var d = e.changedTouches[0].screenY - this.startPosY;

        if (d + this.transformY >= 0) {
          this.translateY(this.ul, (d + this.transformY) / 3 + "px");
        } else if (-1 * (d + this.transformY) >= this.ulHeight - this.ulContainerHeight) {
          var t = this.ulContainerHeight - this.ulHeight;
          this.translateY(this.ul, t + (d + this.transformY - t) / 3 + "px");
        } else {
          this.translateY(this.ul, d + this.transformY + "px");
        }
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.translateY(this.popBox, 0);
      this.mask.style.display = "block";
      this.mask.style.opacity = "0.5";
      document.body.addEventListener("touchmove", this.moveEventFunc.bind(this));
    }
  }, {
    key: "hide",
    value: function hide() {
      this.translateY(this.popBox, "100%");
      this.mask.style.opacity = "0";
      document.body.removeEventListener("touchmove", this.moveEventFunc.bind(this));
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
  }, {
    key: "$",
    value: function $(s) {
      return document.querySelector(s);
    }
  }, {
    key: "createList",
    value: function createList() {
      var template = function template(element, index) {
        return "<li class=\"country-li\">\n                <i class=\"country-icon country-icon-".concat(index, "\"></i>\n                <span class=\"country-name\">").concat(element, "</span>\n            </li>");
      };

      var countries = [].slice.call(this.countries);
      var htmlStr = "";
      countries.forEach(function (element, index) {
        htmlStr += template(element, index);
      });
      var ul = document.querySelector("#choose-country .country-ul");
      ul.innerHTML = htmlStr;
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
  }]);

  return chooseCountry;
}();

new chooseCountry(arrayLike).init();
//# sourceMappingURL=country.js.map
