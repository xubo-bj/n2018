<template>
    <div class="browser-modal" v-if="browserModal">
        <div class="modal-box">
            <div class="hide-btn" @click="HIDE_BROWSER_MODAL">×</div>
            <div class="modal-content">
                请使用移动浏览器，获取良好的浏览效果
            </div>
        </div>
        <div class="modal-mask" @click="HIDE_BROWSER_MODAL"></div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import { HIDE_BROWSER_MODAL } from "../store/mutation-types";
@Component({
    computed: mapState(["browserModal"]),
    methods: mapMutations([HIDE_BROWSER_MODAL])
})
export default class BrowserModal extends Vue {}
</script>

<style lang="scss" scoped>
.browser-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    display: flex;
    justify-content: center;
}

.modal-box {
    align-self: start;
    position: relative;
    z-index: 1;
    margin-top: 150px;
    width: 500px;
    background-color: #fff;
    .hide-btn {
        position: absolute;
        right: 0px;
        padding: 0 7px;
        font-size: 24px;
        font-weight: 700;
        color: #000;
        opacity: 0.5;
        text-shadow: 0 1px 0 #fff;
    }
    .modal-content {
        padding: 40px 0;
        border-bottom: 1px solid #dee2e6;
        text-align: center;
        font-size: 20px;
    }
    .modal-foot {
        height: 70px;
    }
}

.modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
}
</style>
