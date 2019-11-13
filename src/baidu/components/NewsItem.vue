<template>
  <a :href="url" class="no-pic news-item" v-if="thumbnail_pic_s == null">
    <div class="news-title">{{ title }}</div>
    <div class="news-origin">
      <span class="author-name">{{ author_name }}</span>
      <span class="delete-btn" @click.prevent="DELETE_NEWS(uniquekey)">
        <i class="delete-btn-icon" />
      </span>
    </div>
  </a>
  <a
    :href="url"
    class="one-pic news-item"
    v-else-if="thumbnail_pic_s02 == null && thumbnail_pic_s != null"
  >
    <img :src="thumbnail_pic_s" alt class="left-area" />
    <div class="right-area">
      <div class="news-title">{{ title }}</div>
      <div class="news-origin">
        <span class="author-name">{{ author_name }}</span>

        <span class="delete-btn" @click.prevent="DELETE_NEWS(uniquekey)">
          <i class="delete-btn-icon" />
        </span>
      </div>
    </div>
  </a>
  <a :href="url" class="three-pics news-item" v-else>
    <div class="news-title">{{ title }}</div>
    <div class="news-pics">
      <img class="pic" :src="thumbnail_pic_s" alt />
      <img class="pic" :src="thumbnail_pic_s02" alt />
      <img class="pic" :src="thumbnail_pic_s03" alt />
    </div>
    <div class="news-origin">
      <span class="author-name">{{ author_name }}</span>
      <span class="delete-btn" v-on:click.prevent="DELETE_NEWS(uniquekey)">
        <!-- <span class="delete-btn" v-on:click="deleteNews(uniquekey,$event)"> -->
        <i class="delete-btn-icon" />
      </span>
    </div>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DELETE_NEWS } from "../store/mutation-types";
import { mapMutations } from "vuex";
@Component({
  props: [
    "title",
    "author_name",
    "url",
    "thumbnail_pic_s",
    "thumbnail_pic_s02",
    "thumbnail_pic_s03",
    "uniquekey"
  ],
  methods: mapMutations([DELETE_NEWS])
})
export default class NewsItem extends Vue {}
</script>
<style lang="scss" scoped>
.news-item {
  border-bottom: 1px solid rgb(240, 240, 240);
}
.no-pic {
  display: block;
  .news-title {
    color: #333;
    font-size: 18px;
    line-height: 25px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-top: 12px;
    padding-bottom: 4px;
  }
  .news-origin {
    // display: flex;
    // align-items: flex-start;
    padding: 10px 0;
    position: relative;
  }
  .author-name {
    color: #999;
    font-size: 13px;
    margin-right: auto;
  }
  .delete-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -13px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delete-btn-icon {
    width: 12px;
    height: 12px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAaVBMVEVHcEzS0tLf39/S0tLS0tLX19fS0tLS0tLf39/W1tba2trS0tLS0tLT09PS0tLS0tLT09PV1dXU1NTS0tLS0tLS0tL////c3Nz////T09Pd3d3S0tLd3d3X19fS0tLS0tLV1dXV1dXS0tI5jnSuAAAAInRSTlMA5wjmyie48RA4B7coy5v8NT0ehM6qAhYFtQ/4Fy398ERWNLNV6AAAALFJREFUOE+9z0kSwiAQBdBONAaTmDjPI/c/pAG0BHra2Rt+0a+oD8C/p+8bdnfebfy5L2xbMsZM7TakeW1b+q3RTCqQVWw4lRpa5YZS2GBFmVzRJlWciRVvvJo1igmqVExQV8V49dAMwHOwl5tixj5310sxxauWlTPV54+yAVF9jaR+hlex4VRqaOVMl9xghQ1WZoFNrmiTKs7E6kj0idTJh443Tg3Gh9WBNQDrpbBM5g1/aw71fFEmsAAAAABJRU5ErkJggg==);
    background-size: contain;
  }
}
.one-pic {
  display: flex;
  padding: 14px 0;
  .left-area {
    width: 33%;
    align-self: flex-start;
  }
  .right-area {
    flex-grow: 1;
    padding-left: 14px;
    // padding-top: 4px;
    .news-title {
      color: #333;
      font-size: 18px;
      line-height: 25px;
      height: 50px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      // padding-top: 5px;
      // padding-bottom: 5px;
      margin: 5px 0;
    }
    .news-origin {
      // display: flex;
      // align-items: flex-start;
      padding: 10px 0;
      position: relative;
    }
    .author-name {
      color: #999;
      font-size: 13px;
      margin-right: auto;
    }
    .delete-btn {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -13px;
      width: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-btn-icon {
      width: 12px;
      height: 12px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAaVBMVEVHcEzS0tLf39/S0tLS0tLX19fS0tLS0tLf39/W1tba2trS0tLS0tLT09PS0tLS0tLT09PV1dXU1NTS0tLS0tLS0tL////c3Nz////T09Pd3d3S0tLd3d3X19fS0tLS0tLV1dXV1dXS0tI5jnSuAAAAInRSTlMA5wjmyie48RA4B7coy5v8NT0ehM6qAhYFtQ/4Fy398ERWNLNV6AAAALFJREFUOE+9z0kSwiAQBdBONAaTmDjPI/c/pAG0BHra2Rt+0a+oD8C/p+8bdnfebfy5L2xbMsZM7TakeW1b+q3RTCqQVWw4lRpa5YZS2GBFmVzRJlWciRVvvJo1igmqVExQV8V49dAMwHOwl5tixj5310sxxauWlTPV54+yAVF9jaR+hlex4VRqaOVMl9xghQ1WZoFNrmiTKs7E6kj0idTJh443Tg3Gh9WBNQDrpbBM5g1/aw71fFEmsAAAAABJRU5ErkJggg==);
      background-size: contain;
    }
  }
}
.three-pics {
  display: block;
  .news-title {
    color: #333;
    font-size: 18px;
    line-height: 25px;
    // height: 50px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 12px;
    margin-bottom: 4px;
  }
  .news-pics {
    display: flex;
    // align-items: flex-start;
    .pic {
      width: 33%;
      align-self: flex-start;
    }
    .pic + .pic {
      margin-left: 2px;
    }
  }
  .news-origin {
    // display: flex;
    // align-items: flex-start;
    padding: 10px 0;
    position: relative;
  }
  .author-name {
    color: #999;
    font-size: 13px;
    margin-right: auto;
  }
  .delete-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -13px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delete-btn-icon {
    width: 12px;
    height: 12px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAaVBMVEVHcEzS0tLf39/S0tLS0tLX19fS0tLS0tLf39/W1tba2trS0tLS0tLT09PS0tLS0tLT09PV1dXU1NTS0tLS0tLS0tL////c3Nz////T09Pd3d3S0tLd3d3X19fS0tLS0tLV1dXV1dXS0tI5jnSuAAAAInRSTlMA5wjmyie48RA4B7coy5v8NT0ehM6qAhYFtQ/4Fy398ERWNLNV6AAAALFJREFUOE+9z0kSwiAQBdBONAaTmDjPI/c/pAG0BHra2Rt+0a+oD8C/p+8bdnfebfy5L2xbMsZM7TakeW1b+q3RTCqQVWw4lRpa5YZS2GBFmVzRJlWciRVvvJo1igmqVExQV8V49dAMwHOwl5tixj5310sxxauWlTPV54+yAVF9jaR+hlex4VRqaOVMl9xghQ1WZoFNrmiTKs7E6kj0idTJh443Tg3Gh9WBNQDrpbBM5g1/aw71fFEmsAAAAABJRU5ErkJggg==);
    background-size: contain;
  }
}
</style>
