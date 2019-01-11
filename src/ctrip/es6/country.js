/**
 * choose country
 */

const arrayLike = {
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
}

class chooseCountry {
    constructor(countries) {
        this.countries = countries
        this.showBtn = this.$("#footer .pop-country")
        this.popBox = this.$("#choose-country")
    }
    init() {
        this.createList()
        this.showBtn.onclick = () => {
            this.show()
        }

    }
    $(s) {
        return document.querySelector(s)
    }
    createList() {
        let template = (element, index) =>
            `<li class="country-li">
                <i class="country-icon country-icon-${index}"></i>
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
    show() {
        this.translateＹ(0)
    }
    hide() {
        this.translateＹ("100%")

    }
    translateＹ(distance) {
        if (CSS && CSS.supports("transform-style", "preserve-3d")) {
            this.popBox.style.transform = `translate3d(0,${distance},0)`
        } else {
            this.popBox.style.transform = `translateY(${distance})`
        }
    }
}
(new chooseCountry(arrayLike)).init()