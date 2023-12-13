/*
This Pinia store is selected 'setup function' syntax that is similar to the Vue Composition API.
*/
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

interface typeError {
  code: Number|string|null,
  msg1: String|null,
  msg2: String|null,
  email: String|null,
 }

export const useAuthState = defineStore('authState', () => {
  
  /*
  The following variables with ref() or reactive() correspond to "state" in "Option Object" syntax that is similar to the vue Options API. 
  */
 
  const currentUser = ref<any|null|undefined>(null);
  const displayName = ref<string|null|undefined>(null);
  const isLoading = ref<boolean>(false);
  const token = ref<string|number|null|undefined>('');
  const authError: typeError = reactive(
    {
      code: '',
      msg1: '',
      msg2: '',
      email: '',
    }
  );

  /*
  The following functions correspond to "actions" in "Option Object" syntax. 
  */
  
  /*  Even '$reset()' method is good, but ... */
  function clearState() {
    currentUser.value = null;
    displayName.value = null;
    isLoading.value = false;
    token.value = '';
    authError.code = '';
    authError.msg1 = '';
    authError.msg2 = '';
    authError.email = '';
  }

  function clearError() {
    authError.code = '';
    authError.msg1 = '';
    authError.msg2 = '';
    authError.email = '';
  }

  /* Show of state for debugging */
  function showState() {
    if(currentUser.value !== null) {console.log('currentUser:\n', currentUser.value);}
    if(displayName.value !== null) {console.log('displayName:', displayName.value);  }
    if(isLoading.value !== null)   {console.log('isLoading:  ', isLoading.value);    }
    if(token.value !== null)       {console.log('token:\n  ', token.value);          }
    if(authError.code !== null)    {console.log('authError.code:', authError.code);  }
    if(authError.msg1 !== null)    {console.log('authError.code:', authError.msg1);  }
    if(authError.msg2 !== null)    {console.log('authError.code:', authError.msg2);  }
    if(authError.email !== null)   {console.log('authError.code:', authError.email); }
  }

  return { currentUser, displayName, isLoading, authError, token, clearState, clearError, showState};
});

