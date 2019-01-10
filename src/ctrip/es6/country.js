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
    length:14
}

class chooseCountry{
    constructor(){

    }
    init(){
        this.createList()

    }
    createList(){
        let template= (element,index)=>
            `<li class="country-li">
                <i class="country-icon country-icon-${index}"></i>
                <span class="country-name">${element}</span>
            </li>`
        const countries = [].slice.call(arrayLike)
        let htmlStr= ""
        countries.forEach((element,index) => {
            htmlStr += template(element,index)
        });
        let ul = document.querySelector("#choose-country .country-ul")
        console.log('ul',ul);
        
        ul.innerHTML = htmlStr
    }
}
(new chooseCountry()).init()