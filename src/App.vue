<template>
  <div id="app">
    <Header />
    <section class="container-fluid u-tac">
      <GoogleAuth />
    </section>
  </div>
</template>

<script>
import Header from './components/Header';
import GoogleAuth from './components/GoogleAuth';
import './styles/app.scss';

export default {
  name: 'App',
  components: {
    Header,
    GoogleAuth,
  },
};
</script>
