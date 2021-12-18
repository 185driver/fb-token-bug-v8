<template>
  <div class="home">
    <div>
      <button
        type="button"
        @click="signOutUser"
      >
        Sign out
      </button>
    </div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      width="64"
      style="margin-top: 32px;"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import * as fb from '@/firebase.config';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',

  components: { HelloWorld },

  methods: {
    async signOutUser() {
      try {
        fb.auth.signOut();
        this.$router.push('/login');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
