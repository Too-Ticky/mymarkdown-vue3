
<script setup lang="ts">
  import { ref } from 'vue';
  import { useGooglelSignIn } from '@/composables/firebaseAuthentication';
  const msg = ref<string>('Welcome to MyMarkdown');
  const googleLogin = useGooglelSignIn;
</script>


<template>
  <div class="home" id="home">
    <h1><img alt="MyMarkdown" src="../assets/imgs/logo.png"></h1>
    <hi>{{ msg }}</hi>
    <button @click="googleLogin">Googleアカウントでログイン</button>
  </div>
</template>


<style>
  .home {
      margin-top: 60px;
  }
</style>