<template>
  <div>
    <h1 class="u-tac">All Videos</h1>
    <div v-if="loading">
      Loading…
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
    <div v-else>
      <VideoList :videos="videos" />
    </div>
  </div>
</template>

<script>
import VideoList from './VideoList';

export default {
  components: { VideoList },
  props: ['token'],
  data() {
    return {
      loading: true,
      videos: [],
      error: null,
    };
  },
  mounted() {
    this.loadVideos();
  },
  methods: {
    async loadVideos() {
      try {
        const options = {
          headers: { Authorization: this.token },
        };
        console.log(options);
        const url = `${process.env.VIDEO_API_BASE_URL}/videos`;
        const response = await fetch(url, options);
        const json = await response.json();

        this.videos = json.data.reverse();
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
  },
};
</script>
