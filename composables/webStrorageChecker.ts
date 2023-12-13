/**
 * @function isLocalStorageAvailable - Confirmation of available for the browser's "local storage" use
 * @returns {boolean}
 */
export function isLocalStorageAvailable(){
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('dummy', '1');
      if (localStorage.getItem('dummy') === '1') {
        localStorage.removeItem('dummy');
        return true;
      } else {
        return false;
      }
    } catch(e) {
      return false;
    }
  } else {
    return false;
  }
}


/**
 * @function isSessionStorageAvailable - Confirmation of available for the browser's "local storage" use
 * @returns {boolean}
 */
export function isSessionStorageAvailable(){
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem('dummy', '1');
      if (sessionStorage.getItem('dummy') === '1') {
        sessionStorage.removeItem('dummy');
        return true;
      } else {
        return false;
      }
    } catch(e) {
      return false;
    }
  } else {
    return false;
  }
}