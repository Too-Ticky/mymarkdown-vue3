/*
 * ----------------------------------------
 * Firebase/Auth Functions' composables
 * ----------------------------------------
*/

import { onMounted, onUnmounted } from 'vue';

import * as firebaseAuth from 'firebase/auth';
import { auth } from './firebaseConfig'; // Conposable for Firebase connection

import { storeToRefs } from 'pinia';
import { useAuthState } from '@/stores/poniaAuthState' // pinia composable to use for authentication state management 

// import { xml2json } from 'xml-js';
// const convertOp = { ignoreComment: true, alwaysChildren: true };

/** 
 * ----------------------------------------
 * Firebase/Auth State Listener
 * ----------------------------------------
*/
export function  authStateListener ()  {
  const authState = useAuthState();
  const { currentUser, isLoading, } = storeToRefs(authState);
  const { clearState, } = authState;

  clearState();
  onMounted(() => {
    isLoading.value = true;
    // isLogin.value = true;
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      // Set state observer. It gets 'user' data in case of Login state.
      if (user != null) {
        // User is signed in
        currentUser.value = user;
        console.log('(func authStateListener) Current User is: ', currentUser.value);
      } else {
        // User is signed out
        currentUser.value = null;
        console.log('(func authStateListener) User is not login: ', currentUser.value);
      }
    });
    isLoading.value = false;
  });
  onUnmounted(() => {
    useSignOut();
    clearState();
  });
  // return { currentUser, isLoading };
}

/** 
 * ----------------------------------------
 * Firebase/Auth "Email & Password" Sign-Up
 * ----------------------------------------
*/
export function useEmailSignUp(email:string,password:string) {
  const authState = useAuthState();
  const { currentUser, isLoading, displayName, authError} = storeToRefs(authState);
  const { clearError} = authState;

  console.log('(firebaseAuthentication)Starting func "useEmailSignUp"')
  isLoading.value = true;

  firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    currentUser.value = userCredential.user;
    clearError();
  
    //updateProfileメソッドでemailを加工してdisplayNameに情報を登録
		firebaseAuth.updateProfile(currentUser.value, {
			displayName: currentUser.value.email.split('@')[0],
		})
			.then(() => {
				clearError();
        console.log('(useEmailSignUp)Welcome', displayName.value);
      })
      .catch((error) => {
        authError.value.code = error.code;
        authError.value.msg1 = '(useAuth.js)Incorrect profile-update Process';
        console.log('(useEmailSignUp)', authError.value.code, authError.value.msg1);
			});
  })
  .catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = 'Incorrect Sign-up Process.';
    if (authError.value.code === "auth/email-already-in-use") {
      authError.value.msg2 = "This E-mail address is already resistered.";
    }
    console.log(authError.value.code, authError.value.msg1, authError.value.msg2);
  });
  isLoading.value = false;
// return { currentUser, isLoading, authError };
}

/** 
 * ----------------------------------------
 * Firebase/Auth "Email & Password" Sign-In
 * ----------------------------------------
*/
export function useEmailSignIn(email:string,password:string) {
  const authState = useAuthState();
  const { currentUser, isLoading, displayName, authError} = storeToRefs(authState);
  const { clearError} = authState;

  console.log('(useAuth.js)Starting func "useEmailSignIn"')
  isLoading.value = true;

  firebaseAuth.signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    currentUser.value = userCredential.user;
    clearError();
    console.log('(useAuth.js)Success of func "useEmailSignIn"');
    console.log('(useAuth.js)CurrentUser:',currentUser);
  })
  .catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = '(useAuth.js)Incorrect Sign-in credentials.'
    if (authError.value.code === "auth/user-not-found") {
      authError.value.msg2 = "Unknown E-mail address or incorrect passwaord."
    } else if (authError.value.code === "auth/wrong-password") {
      authError.value.msg2 = "incorrect password."
    }
    console.log(authError.value.code, authError.value.msg1, authError.value.msg2);
  });
  isLoading.value = false;
// return { currentUser, isLoading, authError };
}
 
/** 
 * ----------------------------------------
 * Firebase/Auth Google Sign-In
 * ----------------------------------------
*/
export function useGooglelSignIn() {
  const authState = useAuthState();
  const { currentUser, isLoading, displayName, token, authError, } = storeToRefs(authState);
  const { clearError } = authState;

  const provider = new firebaseAuth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  console.log('(firebaseAuthentication)Starting func "useGppgleSignIn"')
  isLoading.value = true;

  // firebaseAuth.signInWithPopup(auth, provider)
  firebaseAuth.signInWithRedirect(auth, provider)
  .then((result) => {
    const credential = firebaseAuth.GoogleAuthProvider.credentialFromResult(result);
    if (credential !== null) {
      token.value = credential.accessToken;
      console.log('result:',result)
      // currentUser.value = result.user;
      clearError();
    }    
  }) 
  .catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = '(firebaseAuthentication)Incorrect Google Sign-in credentials in func "useGppgleSignIn"';
    authError.value.msg2 = error.message;
    authError.value.email = error.email;
    console.log(authError.value.code, authError.value.msg1, authError.value.msg2);
  });
  isLoading.value = false;
// return { currentUser, isLoading, authError };
}


/** 
 * ----------------------------------------
 * Firebase/Auth Sign-Out
 * ----------------------------------------
*/
export function useSignOut() {
  const authState = useAuthState();
  const { currentUser, isLoading, authError } = storeToRefs(authState);
  const { clearState } = authState;

  isLoading.value = true;

  firebaseAuth.signOut(auth)
  .then(() => {
    console.log('(firebaseAuthentication) func "useSignOut" was executed. See You Again.')
    clearState();


	}).catch((error) => {
    authError.value.code = error.code;
    authError.value.msg1 = '(firebaseAuthentication) Incorrect process in func "useSignOut"';
    console.log(authError.value.code, authError.value.msg1,);
	});

  isLoading.value = false;
// return { currentUser, isLoading, authError };
}


export function useStoreAuthInfo() {
  if (auth.currentUser) {
    // console.log(auth.currentUser.accessToken);
    console.log(auth.currentUser.getIdToken);
    console.log(auth.currentUser.email);
    console.log(auth.currentUser.uid);
    console.log(auth.currentUser.photoURL);
  }
  /* memo
  userCredential.user.accessToken //トークンを取得
  userCredential.user.email       //メールアドレスを取得
  userCredential.user.uid.        //ユーザーIDを取得
  userCredential.user.metadata.createdAt   //ユーザー作成日時を取得
  userCredential.user.metadata.lastLoginAt //最終ログイン日時を取得
  */
}


// firebase/Auth delete-Accunt

export function deleteAccount() {
  const authState = useAuthState();
  const { isLoading, } = storeToRefs(authState);
  const { clearState } = authState;

  isLoading.value = true;

	//引数にログイン中のユーザーデータを渡す
  if (auth.currentUser !== null){
    firebaseAuth.deleteUser(auth.currentUser).then(function () {
      //削除が成功したときの処理
      clearState();
    }).catch(function (error) {
      //削除が失敗したときの処理
      console.error(error);  //仮
    });
  }
 
  isLoading.value = false;
    
}