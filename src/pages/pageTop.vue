<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div id="terms">
    <h1>利用規約</h1>
    <p>ここに利用規約の文章が入ります。</p>
    <router-link :to="{ name: 'top' }">TOPに戻る</router-link>
    <!-- <router-link :to="{ path:'/' }">Topに戻る</router-link> -->
  </div>
</template>
  