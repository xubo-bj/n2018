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
    key: "show",
    value: function show() {
      this.translateＹ(0);
      this.mask.style.display = "block";
      this.mask.style.opacity = "0.5";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.translateＹ("100%");
      this.mask.style.opacity = "0";
    }
  }, {
    key: "translate\uFF39",
    value: function translate(distance) {
      if (CSS && CSS.supports("transform-style", "preserve-3d")) {
        this.popBox.style.transform = "translate3d(0,".concat(distance, ",0)");
      } else {
        this.popBox.style.transform = "translateY(".concat(distance, ")");
      }
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
