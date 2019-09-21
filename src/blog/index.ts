import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
import NavBar from "./components/NavBar.vue"




let v = new Vue({
    el: "#app",
    template: `
    <div>
    <nav-bar/>
    <hello-component/>

    </div>
    `,
    components: {
      NavBar,
      HelloComponent
    }
});