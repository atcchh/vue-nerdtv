<template>
  <div class="card">
    <figure class="video">
      <div class="video__inner-container">
        <iframe
          class="video__iframe"
          :src="embed_url"
          allowfullscreen=""
          width="560"
          height="315"
          frameborder="0"
        />
      </div>
    </figure>
    <figcaption class="video__caption">
      <div class="video__title card-title">
        <a :href="link_url"><strong>{{ title }}</strong></a>
      </div>
      <div class="video__data">
        <p>{{ publishedAt }}</p>
        <p>{{ duration }}</p>
      </div>
    </figcaption>
  </div>
</template>

<script>
import moment from 'moment';
import secondsFormat from './seconds-format';

export default {
  props: ['video'],
  computed: {
    title() {
      return this.video.attributes.title;
    },

    duration() {
      return secondsFormat(this.video.attributes.duration);
    },

    publishedAt() {
      return moment(this.video.attributes['published-at']).format('MMM DD, YYYY');
    },

    id() {
      return this.video.attributes['original-id'];
    },

    link_url() {
      return `https://www.youtube.com/watch?v=${this.id}`;
    },

    embed_url() {
      return `https://www.youtube.com/embed/${this.id}`;
    },
  },
};
</script>
