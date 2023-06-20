import { useEffect } from 'react';

const useLocalStorageCheck = (localStorageKey) => {
  useEffect(() => {
    const hasLocalStorage = localStorage.getItem(localStorageKey);
    if (!hasLocalStorage) {
      // Redirect the user or perform any other action
      window.location.href = '/access-denied'; // Redirect to an access denied page
    }
  }, [localStorageKey]);
};

export default useLocalStorageCheck;
