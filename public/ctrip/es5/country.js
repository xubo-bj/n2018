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
  function chooseCountry() {
    _classCallCheck(this, chooseCountry);
  }

  _createClass(chooseCountry, [{
    key: "init",
    value: function init() {
      this.createList();
    }
  }, {
    key: "createList",
    value: function createList() {
      var template = function template(element, index) {
        return "<li class=\"country-li\">\n                <i class=\"country-icon country-icon-".concat(index, "\"></i>\n                <span class=\"country-name\">").concat(element, "</span>\n            </li>");
      };

      var countries = [].slice.call(arrayLike);
      var htmlStr = "";
      countries.forEach(function (element, index) {
        htmlStr += template(element, index);
      });
      var ul = document.querySelector("#choose-country .country-ul");
      console.log('ul', ul);
      ul.innerHTML = htmlStr;
    }
  }]);

  return chooseCountry;
}();

new chooseCountry().init();
//# sourceMappingURL=country.js.map
