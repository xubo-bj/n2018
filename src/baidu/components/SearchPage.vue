<template>
  <div class="search-page">
    <div class="search-box">
      <router-link class="return-homepage" to="/baidu"></router-link>
      <div class="search-form">
        <span class="bear-paw-icon" />
        <span class="input-wrapper">
          <input class="search-input" type="text" v-model="keyword" v-focus />
        </span>
        <span class="clear-btn" @click="UPDATE_SEARCH_INPUT({ searchKeyWord: '' })"></span>
        <span class="confirm-btn">百度一下</span>
      </div>
    </div>
    <div class="search-result">
      <search-list />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import Component from "vue-class-component";
import { UPDATE_SEARCH_INPUT } from "../store/mutation-types";
import axios from "axios";
import { searchKeyWordShape } from "../store/mutations";
import SearchList from "./SearchList";

@Component({
  components: { SearchList },
  computed: mapState(["searchKeyWord"]),
  methods: mapMutations([UPDATE_SEARCH_INPUT]),
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
})
export default class SearchPage extends Vue {
  searchKeyWord!: string;
  UPDATE_SEARCH_INPUT!: (searchKeyWord: searchKeyWordShape) => void;
  get keyword() {
    return this.searchKeyWord;
  }
  set keyword(value) {
    if (value !== this.searchKeyWord) {
      console.log("value   :", value);
      this.UPDATE_SEARCH_INPUT({ searchKeyWord: value });
    }
  }
  get src() {
    let w = this.searchKeyWord.trim();
    return w.length > 0
      ? "https://www.baidu.com/su?&wd=" + encodeURI(w) + "&p=3&cb=jsonp"
      : "";
  }
  updated() {
    let body = document.querySelector("body");
    var newScriptNode = document.createElement("script");
    newScriptNode.className = "target-script";
    newScriptNode.src = this.src;
    if (body != null) {
      let oldScriptNode = document.querySelector(".target-script");
      if (oldScriptNode != null) {
        body.replaceChild(newScriptNode, oldScriptNode);
      } else {
        body.appendChild(newScriptNode);
      }
    } else {
      console.log("can't find a body element");
    }

    // Replace existing node sp2 with the new span element sp1
    // parentDiv.replaceChild(sp1, sp2);
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
}
.search-box {
  height: 64px;
  width: 100%;
  padding-right: 17px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.return-homepage {
  width: 45px;
  height: 44px;
  position: relative;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -7px 0 0 -6px;
    content: "";
    width: 12px;
    height: 12px;
    border-left: 2px solid #38f;
    border-top: 2px solid #38f;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
.search-form {
  flex-grow: 1;
  border: 1px solid #000;
  height: 46px;
  display: flex;
  padding-left: 12px;
}
.bear-paw-icon {
  width: 18px;
  height: 20px;
  // margin-left: 12px;
  // margin-top: 13px;
  background-image: url(/baidu/images/bear_paw.png);
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
}
.input-wrapper {
  flex-grow: 1;
  position: relative;
  .search-input {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 0 10px;
    font-size: 18px;
  }
}
.clear-btn {
  width: 42px;
  background-image: url(/baidu/images/clear.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
}
.confirm-btn {
  width: 80px;
  text-align: center;
  align-self: center;
  border-left: 1px solid #cbcbcb;
  color: #38f;
  font-weight: 700;
}
.search-result {
  padding: 0 17px;
}
</style>
