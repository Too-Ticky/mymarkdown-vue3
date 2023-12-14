import { onMounted, watch, } from 'vue';
import { storeToRefs } from 'pinia';
/**
 * @module piniaMemoStore - The Global data Store Which stores the Memo Sentences.
 * @see module: @/stores/poniaMemoStore
 */
import { useMemoStore } from '@/stores/poniaMemoStore';  /* Stores for Memo Sentences */

/**
 * ----------------------------------------
 * The Memo Data Synchronizer 
 * ----------------------------------------
 * @function memoSynchronizer - To synchronize between global data and browser's Session Storage to use simple resume
 */ 
export function memoSynchronizer() {
  /* The pinia composable for the Memo data  */ 
  const memoStore = useMemoStore(); 
  const { memos, } = storeToRefs(memoStore);  /* State */

  /* Mount of Momos Data observer. 
    To Save memos to Session Storage whenever it changes */
  onMounted(() => {
    getSessionMemos();
    watch(memos, () => {
      sessionStorage.setItem('memos', JSON.stringify(memoStore.memos.markdown.repace('"','')));
    }, { deep: true });
  });
    /** If the sessionStrage data exists, the data will restore to resume. */
    function getSessionMemos() {
      const sessionMemos = sessionStorage.getItem("memos");
      if(sessionMemos) {
        memoStore.memos.markdown.shift();
        sessionMemos.split(',').forEach((value) => {
          memoStore.memos.markdown.push(value);
        });
      }
    }

}





    