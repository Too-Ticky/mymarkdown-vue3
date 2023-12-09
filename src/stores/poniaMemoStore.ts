/*
This Pinia store is selected 'setup function' syntax that is similar to the Vue Composition API.
*/
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useMemoStore = defineStore('memoStore', () => {
  
  /*
  The following variables with ref() or reactive() correspond to "state" in "Option Object" syntax that is similar to the vue Options API. 
  */
  const memos :any = reactive({
    markdown :["No Title"] as string[],
  });
  const selectedIndex = ref<number>(0);

  /*
  The following functions correspond to "actions" in "Option Object" syntax. 
  */
  function addMemo(){ 
    memos.markdown.push("New");
    console.log("fn(addMemo):",memos.markdown)
  }

  function deleteMemo(){
    console.log(memos.markdown[selectedIndex.value])
    memos.markdown.splice(selectedIndex.value,1)
    if(selectedIndex.value > 0) {
      selectedIndex.value--;
    }
  }

  function selectMemo(index:number){ 
    selectedIndex.value = index; 
  }

  return { memos, selectedIndex, addMemo, deleteMemo, selectMemo, };
});

