import Vue from "vue";
import HelloComponent from "./components/Hello.vue";

let v = new Vue({
    el: "#app",
    template: `
    <hello-component/>
    `,
    data: { name: "World" },
    components: {
        HelloComponent
    }
});