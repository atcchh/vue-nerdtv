<template>
  <div>
    <div class="row row-eq-height">
      <div v-for="video in pagedVideos" :key="video.id" class="col-md-3 col-sm-6">
        <Video :video="video" />
      </div>
    </div>
    <div class="u-tac l-margin-bottom">
      <button
        v-if="showPrevious"
        class="btn btn-skin-gray btn-shadow"
        @click="previous"
      >
        Previous
      </button>
      <button
        v-if="showNext"
        class="btn btn-skin-gray btn-shadow"
        @click="next"
      >
        Next
      </button>
      <div class="l-margin-top">
        Page {{ page }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script>
import Video from './Video';

export default {
  components: { Video },
  props: ['videos'],
  data() {
    return {
      page: 1,
      videosPerPage: 12,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.videos.length / this.videosPerPage);
    },
    pagedVideos() {
      const pageZeroIndex = this.page - 1;
      const firstVideoIndex = pageZeroIndex * this.videosPerPage;
      const indexAfterLastVideo = firstVideoIndex + this.videosPerPage;
      return this.videos.slice(firstVideoIndex, indexAfterLastVideo);
    },
    showPrevious() {
      return this.page > 1;
    },
    showNext() {
      return this.page < this.totalPages;
    }
  },
  methods: {
    previous() {
      if (this.page > 1) {
        this.page--;
      }
    },
    next() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },
  },
};
</script>
