<script setup lang="ts">
  import { computed, } from 'vue';
  
  import { storeToRefs } from 'pinia';
  import { useAuthState } from '@/stores/poniaAuthState'; /* Stores for Authentication State */
  import { useMemoStore } from '@/stores/poniaMemoStore';  /* Stores for Memo Sentences */
  import { useSignOut } from '@/composables/firebaseAuthentication'; /* Composables for FirebaseAuthentication */
  
  import { Marked } from "marked";
  const marked = new Marked();

  /* The pinia composable for the Authentication State controll */ 
  const authState = useAuthState();  
  const { currentUser } = storeToRefs(authState);  /* State */

  /* The pinia composable for the Memo data  */ 
  const memoStore = useMemoStore(); 
  const { memos, selectedIndex, } = storeToRefs(memoStore);  /* State */
  const { addMemo, deleteMemo, selectMemo, } = memoStore  /* Actions */
  const preview = computed(() => marked.parse(memos.value.markdown[selectedIndex.value])); /* correspond to Getters */
  const displayTitle = (text: string | null) => text ? text.split('\n')[0] : undefined; /* correspond to Getters */
  
  const signOut = useSignOut;   /* UseSignOut is the composable's function using Firebase/Auth  */
  
</script>


<template>
  <div class="editor">

    <h1>エディター画面</h1>
    <span>{{ currentUser.email }}</span>
    <button @click="signOut">ログアウト</button>

    <div class="editorWrapper">

      <div class="memolistWrapper">
        <div class="memoList" 
          v-for="(memo, index) in memos.markdown" :key="index"
          @click="selectMemo(index)" :data-selected="index == selectedIndex"
        >
          <p class="memoTitle"> {{ displayTitle(memo) }} </p>

        </div>
          <button class="addmemoBtn" @click="addMemo">メモの追加</button>
          <button class="deleteMemoBtn" v-if="memos.markdown.length > 1" @click="deleteMemo">選択中のメモを削除</button>
      </div>

      <!-- <textarea class="markdown" v-model="markdown" -->
      <textarea class="markdown" v-model="memos.markdown[selectedIndex]"
        placeholder="Input any sentences to convert."
        required
        name="Markdown Sentences Area"
      ></textarea>

      <div class="preview markdown-body" v-html="preview"
        name="Converted Markdown Sentences Area"
      ></div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.editorWrapper {
  display: flex;
}
.memoListWrapper {
  width: 20%;
  border-top: 1px solid #000;
}
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:nth-child(even) {
    background-color: #ccc;
  }
  &[data-selected="true"] {
    background-color: #ccf;
  }
}
.memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.addMemoBtn {
  margin-top: 20px;
}
.deleteMemoBtn {
  margin: 10px;
}
.markdown {
  width: 40%;
  height: 500px;
}
.preview {
  width: 40%;
  text-align: left;
  color: #000;
  background-color: #ccc;
}
</style>