<template>
  <div class="hello">
    <div v-if="status === 'loggedOut'">
      <div class="u-tac l-padding-top">
        <button @click="signIn" class="btn btn-skin-white btn--logo">
          <img class="btn-logo--login" src="./g-logo.png" alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
    </div>
    <div v-if="status === 'loggingIn'">
      Logging in…
    </div>
    <div v-if="status === 'loggedIn'">
      <VideoScreen :token="token" />
    </div>
  </div>
</template>

<script>
import VideoScreen from '@/components/VideoScreen';

// This client ID is exposed to the browser anyway,
// so it's not insecure to commit it to the repo.
const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;

export default {
  name: 'GoogleAuth',
  components: {
    VideoScreen,
  },
  data() {
    return {
      authenticating: false,
      token: null,
      email: null,
      error: null,
    };
  },
  computed: {
    status() {
      if (this.authenticating) {
        return 'loggingIn';
      } else if (this.email) {
        return 'loggedIn';
      }
      return 'loggedOut';
    },
  },
  mounted() {
    this.loadAccessTokenFromHash();
  },
  methods: {
    signIn() {
      const redirect_uri =
        window.location.protocol +
        '//' + window.location.hostname +
        (window.location.port ? ':' + window.location.port: '');
      const params = {
        client_id: clientID,
        redirect_uri: redirect_uri,
        response_type: 'token',
        scope: 'email',
        prompt: 'consent', // prompt every time
      };
      const queryString =
        Object
          .keys(params)
          .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
          .join('&');
      const url = 'https://accounts.google.com/o/oauth2/v2/auth';
      const urlWithQueryString = `${url}?${queryString}`;
      window.location = urlWithQueryString;
    },

    loadAccessTokenFromHash() {
      const hash = window.location.hash;
      if (!hash) {
        return;
      }

      const [, token] =
        hash
          .substring(1)
          .split('&')
          .map(pair => pair.split('='))
          .find(([key]) => key === 'access_token');

      if (token) {
        this.token = token;
        this.authenticating = true;
        this.validateAccessToken(token);
      }
    },

    async validateAccessToken(token) {
      const urlWithQueryString = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
      try {
        const response = await fetch(urlWithQueryString);
        const json = await response.json();

        const expectedClientID = json.aud;
        if (expectedClientID === clientID) {
          this.email = json.email;
          this.authenticating = false;
        } else {
          this.error = 'Incorrect client ID';
          this.authenticating = false;
        }
      } catch (error) {
        this.error = error;
        this.authenticating = false;
      }
    },

    signOut() {
      this.email = null;
      this.token = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
