<script setup lang="ts">
  /* pinia Stores  */ 
  import { storeToRefs } from 'pinia';
  /*    The store for Firebase Authentication */
  import { useAuthState } from '@/stores/poniaAuthState';
  const authStore = useAuthState();
  const { currentUser, } = storeToRefs(authStore);
  /*    The store for Momo Sentences */
  import { memoSynchronizer } from '@/composables/memoSessionStorage'
  memoSynchronizer(); /* Mount of Memos Synchronizer between Browzer's Session Storage and Pinia Store. */
  
  /*  Auth State Listener */
  import { authStateListener } from '@/composables/firebaseAuthentication';
  authStateListener();  /* Mount of the Firebase Auth State Observer */
  
  /* The Browser's Web Storage Cheker */
  import { isLocalStorageAvailable, isSessionStorageAvailable } from '@/composables/webStrorageChecker';
  console.log("This Browser's localStorage is enable ",isLocalStorageAvailable())
  console.log("This Browser's sessionStorage is enable ",isSessionStorageAvailable())

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