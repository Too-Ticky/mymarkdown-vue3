<script setup lang="ts">
  /* pinia for the State controll for Authentication */ 
  import { storeToRefs } from 'pinia';
  import { useAuthState } from '@/stores/poniaAuthState';
  const authStore = useAuthState();
  const { currentUser, } = storeToRefs(authStore);

  // firebase/Auth composables 
  import { authStateListener } from './composables/firebaseAuthentication';
  authStateListener();  // Start of the Firebase Authentication State Observation. 

  /* Vue Page Components */
  import Home from './components/Home.vue';
  import Editor from './components/Editor.vue';
</script>


<template>
  <div id="app">
    <Home v-if="!currentUser"></Home>
    <Editor v-if="currentUser"></Editor>
  </div>
</template>


<style scoped lang="css">
</style>
